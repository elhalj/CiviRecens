import express from 'express';
import { StaffController } from '../controllers/Staff.controller';
import { authenticateToken, authorizeAdmin } from '../middleware/auth.middleware';

const staff = new StaffController();

export const routerStaff = express.Router();

routerStaff.post('/staff', authenticateToken, authorizeAdmin, staff.createStaff);
routerStaff.get('/staff', authenticateToken, authorizeAdmin, staff.getAllStaff);
routerStaff.get('/staff/:id', authenticateToken, authorizeAdmin, staff.getStaffById);
routerStaff.put('/staff/:id', authenticateToken, authorizeAdmin, staff.updateStaff);
routerStaff.delete('/staff/:id', authenticateToken, authorizeAdmin, staff.deleteStaff);