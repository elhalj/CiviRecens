import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import {routerCitizens} from './routes/Citizens.routes';
import {routerDemandes} from './routes/Demandes.routes';
import {routerInstitutions} from './routes/Institutions.routes';
import {routerStaff} from './routes/Staff.routes';
import { routerAppointment } from './routes/Appointment.routes';

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
