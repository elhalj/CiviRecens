import supabase from "../config/supabase.js";
import { Request, Response } from "express";
import { AppError } from "../../utils/AppError.js";

// Create a new staff member
export const createStaff = async (req: Request, res: Response) => {
    const {
        first_name,
        last_name,
        email,
        phone_number,
        institution_id,
        role = 'other',
        department = '',
        schedule = {},
        permissions = {
            read_citizen_data: false,
            write_requests: false,
            manage_appointments: false,
            emergency_access: false
        },
        emergency_access = {
            enabled: false,
            facial_recognition: false
        }
    } = req.body;

    try {
        const { data, error } = await supabase
            .from('staff')
            .insert([{
                first_name,
                last_name,
                email,
                phone_number,
                institution_id,
                role,
                department,
                schedule: {
                    start: schedule?.start || null,
                    end: schedule?.end || null,
                    days: schedule?.days || []
                },
                current_appointments: [],
                availability: {
                    status: 'off_duty',
                    next_available: null
                },
                permissions,
                emergency_access,
                credentials: {
                    last_login: null,
                    failed_attempts: 0
                }
            }])
            .select()
            .single();

        if (error) throw error;
        if (!data) {
            throw new AppError('Failed to create staff member', 400);
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

// Get all staff members
export const getStaff = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('staff')
            .select('*');

        if (error) throw error;
        res.json(data || []);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get staff by ID
export const getStaffById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .from('staff')
            .select(`
                *,
                institution:institution_id(*)
            `)
            .eq('id', id)
            .single();

        if (error) throw error;
        if (!data) {
            throw new AppError('Staff member not found', 404);
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

// Update staff member
export const updateStaff = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        // If updating credentials, only update specific fields
        if (updates.credentials) {
            updates.credentials.last_updated = new Date().toISOString();
        }

        const { data, error } = await supabase
            .from('staff')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        if (!data) {
            throw new AppError('Staff member not found', 404);
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

// Delete staff member
export const deleteStaff = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // First, check if the staff member has any appointments
        const { data: hasAppointments, error: checkError } = await supabase
            .from('appointments')
            .select('id')
            .eq('staff_id', id)
            .limit(1);

        if (checkError) throw checkError;
        
        if (hasAppointments && hasAppointments.length > 0) {
            throw new AppError('Cannot delete staff member with assigned appointments', 400);
        }

        const { error } = await supabase
            .from('staff')
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

// Get staff by institution
export const getStaffByInstitution = async (req: Request, res: Response) => {
    const { institutionId } = req.params;

    try {
        const { data, error } = await supabase
            .from('staff')
            .select('*')
            .eq('institution_id', institutionId);

        if (error) throw error;
        res.json(data || []);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update staff availability
export const updateStaffAvailability = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, next_available } = req.body;

    try {
        const updates: any = {
            availability: {
                status: status || 'off_duty',
                updated_at: new Date().toISOString()
            }
        };

        if (next_available) {
            updates.availability.next_available = new Date(next_available).toISOString();
        }

        const { data, error } = await supabase
            .from('staff')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        if (!data) {
            throw new AppError('Staff member not found', 404);
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
