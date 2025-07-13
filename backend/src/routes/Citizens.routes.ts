import express from "express";
import { authenticateToken, authorizeAdmin, authorizeCitizen } from "../middleware/auth.middleware";
import { CitizensController } from "../controllers/Citizens.controller";

const citizen = new CitizensController()

export const routerCitizens = express.Router()
routerCitizens.post('/citizens', authenticateToken, authorizeCitizen, citizen.createCitizen);
// routerCitizens.get('/citizens/me', authenticateToken, authorizeCitizen, citizen.getCitizenProfile);
routerCitizens.put('/citizens/:id', authenticateToken, authorizeCitizen, citizen.updateCitizen);
routerCitizens.get('/citizens/:id', authenticateToken, authorizeAdmin, citizen.getCitizenById);