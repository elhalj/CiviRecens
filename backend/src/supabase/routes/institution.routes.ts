import express from 'express';
import { 
    createInstitution, 
    deleteInstitution, 
    getInstitutionById, 
    getInstitutions,
    getInstitutionsByType,
    getInstitutionStatistics,
    updateInstitution 
} from "../controllers/institution.Controller.js";

export const routerInstitutions = express.Router();

// Create a new institution
routerInstitutions.post('/institutions', createInstitution);

// Get all institutions
routerInstitutions.get('/institutions', getInstitutions);

// Get institution by ID
routerInstitutions.get('/institutions/:id', getInstitutionById);

// Update institution
routerInstitutions.put('/institutions/:id', updateInstitution);

// Delete institution
routerInstitutions.delete('/institutions/:id', deleteInstitution);

// Get institutions by type
routerInstitutions.get('/institutions/type/:type', getInstitutionsByType);

// Get institution statistics
routerInstitutions.get('/institutions/:id/statistics', getInstitutionStatistics);
