import express from "express";
import { authenticateToken, authorizeAdmin, authorizeCitizen } from "../middleware/auth.middleware.js";
import { CitizensController } from "../controllers/Citizens.controller.js";

const citizen = new CitizensController()

export const routerCitizens = express.Router()
routerCitizens.post("/register/citizens", citizen.register);
routerCitizens.post("/login/citizens", citizen.login);
routerCitizens.post('/add/citizens', authenticateToken, authorizeCitizen, citizen.createCitizen);
// routerCitizens.get('/citizens/me', authenticateToken, authorizeCitizen, citizen.getCitizenProfile);
routerCitizens.put('/citizens/:id', authenticateToken, authorizeCitizen, citizen.updateCitizen);
routerCitizens.get('/citizens/:id', authenticateToken, authorizeAdmin, citizen.getCitizenById);