import supabase from "../config/supabase.js";
import { Request, Response } from "express";
import { AppError } from "../../utils/AppError.js";

// Create a new appointment
export const createAppointment = async (req: Request, res: Response) => {
    const {
        citizen_id,
        institution_id,
        staff_id,
        type,
        status,
        scheduled_time,
        duration,
        location,
        notes
    } = req.body;

    try {
        const { data, error } = await supabase
            .from('appointments')
            .insert([{
                citizen_id,
                institution_id,
                staff_id,
                type,
                status: status || 'pending', // Default to 'pending' if not provided
                scheduled_time: new Date(scheduled_time).toISOString(),
                duration: duration || 30, // Default to 30 minutes
                location,
                notes: notes || null
            }])
            .select()
            .single();

        if (error) throw error;
        if (!data) {
            throw new AppError('Failed to create appointment', 400);
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

// Get all appointments
export const getAppointments = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('appointments')
            .select(`
                *,
                citizen:citizen_id(*),
                institution:institution_id(*),
                staff:staff_id(*)
            `);

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get appointment by ID
export const getAppointmentById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .from('appointments')
            .select(`
                *,
                citizen:citizen_id(*),
                institution:institution_id(*),
                staff:staff_id(*)
            `)
            .eq('id', id)
            .single();

        if (error) throw error;
        if (!data) {
            throw new AppError('Appointment not found', 404);
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

// Update appointment
export const updateAppointment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        // If updating scheduled_time, convert to ISO string
        if (updates.scheduled_time) {
            updates.scheduled_time = new Date(updates.scheduled_time).toISOString();
        }

        const { data, error } = await supabase
            .from('appointments')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        if (!data) {
            throw new AppError('Appointment not found', 404);
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

// Delete appointment
export const deleteAppointment = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const { error } = await supabase
            .from('appointments')
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

// Get appointments by citizen ID
export const getAppointmentsByCitizenId = async (req: Request, res: Response) => {
    const { citizenId } = req.params;

    try {
        const { data, error } = await supabase
            .from('appointments')
            .select(`
                *,
                institution:institution_id(*),
                staff:staff_id(*)
            `)
            .eq('citizen_id', citizenId);

        if (error) throw error;
        res.json(data || []);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get appointments by staff ID
export const getAppointmentsByStaffId = async (req: Request, res: Response) => {
    const { staffId } = req.params;

    try {
        const { data, error } = await supabase
            .from('appointments')
            .select(`
                *,
                citizen:citizen_id(*),
                institution:institution_id(*)
            `)
            .eq('staff_id', staffId);

        if (error) throw error;
        res.json(data || []);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
