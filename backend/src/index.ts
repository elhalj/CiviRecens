import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import {routerDemandes} from './routes/Demandes.routes.js';
import {routerInstitutions} from './routes/Institutions.routes.js';
import {routerStaff} from './routes/Staff.routes.js';
import { routerAppointment } from './routes/Appointment.routes.js';
import { routerCitizens } from './routes/Citizens.routes.js';

dotenv.config();

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Middleware for parsing JSON bodies
app.use(express.json());

// Set up routes
app.use('/api/appointments', routerAppointment);
app.use('/api/citizens', routerCitizens);
app.use('/api/demandes', routerDemandes);
app.use('/api/institutions', routerInstitutions);
app.use('/api/staff', routerStaff);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
