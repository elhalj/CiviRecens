import express from 'express';
import { 
    createAppointment, 
    deleteAppointment, 
    getAppointmentById, 
    getAppointments,
    getAppointmentsByCitizenId,
    getAppointmentsByStaffId,
    updateAppointment 
} from "../controllers/appointment.Controller.js";

export const routerAppointments = express.Router();

// Create a new appointment
routerAppointments.post('/appointments', createAppointment);

// Get all appointments
routerAppointments.get('/appointments', getAppointments);

// Get appointment by ID
routerAppointments.get('/appointments/:id', getAppointmentById);

// Update appointment
routerAppointments.put('/appointments/:id', updateAppointment);

// Delete appointment
routerAppointments.delete('/appointments/:id', deleteAppointment);

// Get appointments by citizen ID
routerAppointments.get('/citizens/:citizenId/appointments', getAppointmentsByCitizenId);

// Get appointments by staff ID
routerAppointments.get('/staff/:staffId/appointments', getAppointmentsByStaffId);
