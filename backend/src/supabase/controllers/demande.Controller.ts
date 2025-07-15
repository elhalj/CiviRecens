import supabase from "../config/supabase.js";
import { Request, Response } from "express";
import { AppError } from "../../utils/AppError.js";

// Create a new demand
export const createDemande = async (req: Request, res: Response) => {
    const {
        citizen_id,
        institution_id,
        service_id,
        type,
        title,
        description,
        status = 'pending',
        admin_id = null,
        admin_name = null,
        admin_email = null
    } = req.body;

    try {
        const { data, error } = await supabase
            .from('demandes')
            .insert([{
                citizen_id,
                institution_id,
                service_id,
                type,
                title,
                description,
                status,
                admin_id,
                admin_name,
                admin_email
            }])
            .select()
            .single();

        if (error) throw error;
        if (!data) {
            throw new AppError('Failed to create demand', 400);
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

// Get all demands
export const getDemandes = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('demandes')
            .select(`
                *,
                citizen:citizen_id(*),
                institution:institution_id(*),
                service:service_id(*)
            `);

        if (error) throw error;
        res.json(data || []);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get demand by ID
export const getDemandeById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .from('demandes')
            .select(`
                *,
                citizen:citizen_id(*),
                institution:institution_id(*),
                service:service_id(*)
            `)
            .eq('id', id)
            .single();

        if (error) throw error;
        if (!data) {
            throw new AppError('Demand not found', 404);
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

// Update demand
export const updateDemande = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const { data, error } = await supabase
            .from('demandes')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        if (!data) {
            throw new AppError('Demand not found', 404);
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

// Delete demand
export const deleteDemande = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const { error } = await supabase
            .from('demandes')
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

// Get demands by citizen ID
export const getDemandesByCitizenId = async (req: Request, res: Response) => {
    const { citizenId } = req.params;

    try {
        const { data, error } = await supabase
            .from('demandes')
            .select(`
                *,
                institution:institution_id(*),
                service:service_id(*)
            `)
            .eq('citizen_id', citizenId);

        if (error) throw error;
        res.json(data || []);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get demands by institution ID
export const getDemandesByInstitutionId = async (req: Request, res: Response) => {
    const { institutionId } = req.params;

    try {
        const { data, error } = await supabase
            .from('demandes')
            .select(`
                *,
                citizen:citizen_id(*),
                service:service_id(*)
            `)
            .eq('institution_id', institutionId);

        if (error) throw error;
        res.json(data || []);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
