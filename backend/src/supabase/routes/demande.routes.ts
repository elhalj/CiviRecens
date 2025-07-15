import express from 'express';
import { 
    createDemande, 
    deleteDemande, 
    getDemandeById, 
    getDemandes,
    getDemandesByCitizenId,
    getDemandesByInstitutionId,
    updateDemande 
} from "../controllers/demande.Controller.js";

export const routerDemandes = express.Router();

// Create a new demand
routerDemandes.post('/demandes', createDemande);

// Get all demands
routerDemandes.get('/demandes', getDemandes);

// Get demand by ID
routerDemandes.get('/demandes/:id', getDemandeById);

// Update demand
routerDemandes.put('/demandes/:id', updateDemande);

// Delete demand
routerDemandes.delete('/demandes/:id', deleteDemande);

// Get demands by citizen ID
routerDemandes.get('/citizens/:citizenId/demandes', getDemandesByCitizenId);

// Get demands by institution ID
routerDemandes.get('/institutions/:institutionId/demandes', getDemandesByInstitutionId);
