import supabase from "../config/supabase.js";
import { Request, Response } from "express";
import { AppError } from "../../utils/AppError.js";

// Create a new institution
export const createInstitution = async (req: Request, res: Response) => {
    const {
        name,
        type,
        address,
        contact,
        emergency_access = {
            enabled: false,
            facial_recognition: false,
            emergency_contacts: []
        },
        services = []
    } = req.body;

    try {
        const { data, error } = await supabase
            .from('institutions')
            .insert([{
                name,
                type,
                address,
                contact: {
                    phone: contact?.phone || null,
                    email: contact?.email || null,
                    website: contact?.website || null
                },
                emergency_access,
                services,
                statistics: {
                    total_requests: 0,
                    average_processing_time: 0,
                    satisfaction_score: 0,
                    last_updated: new Date().toISOString()
                }
            }])
            .select()
            .single();

        if (error) throw error;
        if (!data) {
            throw new AppError('Failed to create institution', 400);
        }

        res.status(201).json(data);
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

// Get all institutions
export const getInstitutions = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('institutions')
            .select('*');

        if (error) throw error;
        res.json(data || []);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get institution by ID
export const getInstitutionById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .from('institutions')
            .select(`
                *,
                staff:staff(*),
                appointments:appointments(*),
                requests:requests(*)
            `)
            .eq('id', id)
            .single();

        if (error) throw error;
        if (!data) {
            throw new AppError('Institution not found', 404);
        }

        res.json(data);
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

// Update institution
export const updateInstitution = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        // If updating statistics, ensure last_updated is current time
        if (updates.statistics) {
            updates.statistics.last_updated = new Date().toISOString();
        }

        const { data, error } = await supabase
            .from('institutions')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        if (!data) {
            throw new AppError('Institution not found', 404);
        }

        res.json(data);
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

// Delete institution
export const deleteInstitution = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // First, check if the institution has any associated records
        const { data: hasDependencies, error: checkError } = await supabase
            .from('institutions')
            .select('id, staff, appointments, requests')
            .eq('id', id)
            .single();

        if (checkError) throw checkError;
        
        if (hasDependencies?.staff?.length > 0 || 
            hasDependencies?.appointments?.length > 0 || 
            hasDependencies?.requests?.length > 0) {
            throw new AppError('Cannot delete institution with associated records', 400);
        }

        const { error } = await supabase
            .from('institutions')
            .delete()
            .eq('id', id);

        if (error) throw error;
        res.status(204).send();
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

// Get institutions by type
export const getInstitutionsByType = async (req: Request, res: Response) => {
    const { type } = req.params;

    try {
        const { data, error } = await supabase
            .from('institutions')
            .select('*')
            .eq('type', type);

        if (error) throw error;
        res.json(data || []);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get institution statistics
export const getInstitutionStatistics = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .from('institutions')
            .select('statistics')
            .eq('id', id)
            .single();

        if (error) throw error;
        if (!data) {
            throw new AppError('Institution not found', 404);
        }

        res.json(data.statistics || {});
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
