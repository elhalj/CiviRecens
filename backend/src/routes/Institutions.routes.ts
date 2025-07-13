import express from 'express';
import { InstitutionController } from '../controllers/Institution.controller.js';
import { authenticateToken, authorizeAdmin } from '../middleware/auth.middleware.js';

const institution = new InstitutionController()

export const routerInstitutions = express.Router();

routerInstitutions.post('/institutions', authenticateToken, authorizeAdmin, institution.createInstitution);
routerInstitutions.get('/institutions', authenticateToken, authorizeAdmin, institution.getAllInstitutions);
routerInstitutions.get('/institutions/:id', authenticateToken, authorizeAdmin, institution.getInstitutionById);
routerInstitutions.put('/institutions/:id', authenticateToken, authorizeAdmin, institution.updateInstitution);
routerInstitutions.delete('/institutions/:id', authenticateToken, authorizeAdmin, institution.deleteInstitution);
