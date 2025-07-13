import express from 'express';
import { AppointmentController } from '../controllers/Appointment.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const appointment  = new AppointmentController()

export const routerAppointment = express.Router();

routerAppointment.post('/appointments', authenticateToken, appointment.createAppointment);
routerAppointment.get('/appointments', authenticateToken, appointment.getAllAppointments);
routerAppointment.get('/appointments/:id', authenticateToken, appointment.getAppointmentById);
routerAppointment.put('/appointments/:id', authenticateToken, appointment.updateAppointment);
routerAppointment.delete('/appointments/:id', authenticateToken, appointment.deleteAppointment);