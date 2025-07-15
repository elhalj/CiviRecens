import bcrypt from "bcryptjs";
import supabase from "../config/supabase.js";
import { Request, Response } from "express";
import { AppError } from "../../utils/AppError.js";

// Créer un citoyen
export const createCitizen = async (req: Request, res: Response) => {
    const {
        first_name,
        last_name,
        email,
        birth_date,
        phone_number,
        address,
        facial_vector,
        blood_type,
        allergies,
        password,
    } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const { data, error } = await supabase.from("citizens").insert([
            {
                first_name,
                last_name,
                email,
                birth_date,
                phone_number,
                address,
                facial_vector,
                blood_type,
                allergies,
                password: hashedPassword,
            },
        ]);

        if (error) throw error;
        if (!data) {
            throw new Error("Data is null or undefined");
        }
        // Now TypeScript knows data is not null
        res.status(201).json(data[0]);
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
// Récupérer tous les citoyens
export const getCitizens = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase.from("citizens").select();

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Lire un citoyen
export const getCitizenById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .from("citizens")
            .select(
                `
                *,
                emergency_contacts:emergency_contacts(*)
            `
            )
            .eq("id", id)
            .single();

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(404).json({ error: "Citizen not found" });
    }
};

// Mettre à jour un citoyen
export const updateCitizen = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 10);
    }

    try {
        const { data, error } = await supabase
            .from("citizens")
            .update(updates)
            .eq("id", id);

        if (error) throw error;
        res.json(data);
    } catch (error) {
        if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
};

// Supprimer un citoyen
export const deleteCitizen = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const { error } = await supabase.from("citizens").delete().eq("id", id);

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

// Authentification
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const { data: citizen, error } = await supabase
            .from("citizens")
            .select("*")
            .eq("email", email)
            .single();

        if (error || !citizen) throw new Error("Invalid credentials");

        const validPassword = await bcrypt.compare(password, citizen.password);
        if (!validPassword) throw new Error("Invalid credentials");

        res.json({ message: "Login successful", citizenId: citizen.id });
    } catch (error) {
         if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
};
