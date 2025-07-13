import express from 'express';
import { DemandeController } from '../controllers/Demande.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const demandeController = new DemandeController();

export const routerDemandes = express.Router();

routerDemandes.post('/demandes', authenticateToken, demandeController.createRequest);
routerDemandes.get('/demandes', authenticateToken, demandeController.getAllRequests);
routerDemandes.get('/demandes/:id', authenticateToken, demandeController.getRequestById);
routerDemandes.put('/demandes/:id', authenticateToken, demandeController.updateRequest);
routerDemandes.delete('/demandes/:id', authenticateToken, demandeController.deleteRequest);