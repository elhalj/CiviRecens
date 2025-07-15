import express from 'express';
import { 
    createStaff, 
    deleteStaff, 
    getStaff, 
    getStaffById,
    getStaffByInstitution,
    updateStaff,
    updateStaffAvailability 
} from "../controllers/staff.Controller.js";

export const routerStaff = express.Router();

// Create a new staff member
routerStaff.post('/staff', createStaff);

// Get all staff members
routerStaff.get('/staff', getStaff);

// Get staff by ID
routerStaff.get('/staff/:id', getStaffById);

// Update staff member
routerStaff.put('/staff/:id', updateStaff);

// Delete staff member
routerStaff.delete('/staff/:id', deleteStaff);

// Get staff by institution
routerStaff.get('/institutions/:institutionId/staff', getStaffByInstitution);

// Update staff availability
routerStaff.patch('/staff/:id/availability', updateStaffAvailability);
