import { Request, Response } from 'express';
import { NewAppointment} from '../models/Appointment.model';
import { validateObjectId } from '../utils/validation';
import { AppError } from '../utils/AppError';

export class AppointmentController {
  // Create a new appointment
  async createAppointment(req: Request, res: Response) {
    try {
      const { citizen, institution, staff, type, status, scheduledTime, duration, location, notes } = req.body;

      // Validate required fields
      if (!citizen || !institution || !staff || !type || !status || !scheduledTime || !duration || !location) {
        throw new AppError('Missing required fields', 400);
      }

      // Validate IDs
      if (!validateObjectId(citizen) || !validateObjectId(institution) || !validateObjectId(staff)) {
        throw new AppError('Invalid ID format', 400);
      }
      const AppointmentType = Object.freeze({
        consultation: 'consultation',
        document_request: 'document_request',
        emergency: 'emergency',
        other: 'other'
      });
      const AppointmentStatus = Object.freeze({
        pending: 'pending',
        confirmed: 'confirmed',
        completed: 'completed',
        cancelled: 'cancelled'
      });
      
      // Validate type and status
      if (!Object.values(AppointmentType).includes(type)) {
        throw new AppError('Invalid appointment type', 400);
      }
      if (!Object.values(AppointmentStatus).includes(status)) {
        throw new AppError('Invalid appointment status', 400);
      }

      // Validate scheduled time
      if (scheduledTime <= new Date()) {
        throw new AppError('Scheduled time must be in the future', 400);
      }

      // Validate duration
      if (duration < 15 || duration > 360) {
        throw new AppError('Duration must be between 15 and 360 minutes', 400);
      }

      // Validate location
      if (!location.room || !location.floor) {
        throw new AppError('Location must include room and floor', 400);
      }

      const appointmentData = {
        citizen,
        institution,
        staff,
        type,
        status,
        scheduledTime,
        duration,
        location,
        notes
      };

      const appointment = new NewAppointment(appointmentData);
      await appointment.save();
      res.status(201).json(appointment);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  // Get all appointments
  async getAllAppointments(req: Request, res: Response) {
    try {
      const appointments = await NewAppointment.find()
        .populate('citizen')
        .populate('institution')
        .populate('staff')
        .sort({ scheduledTime: -1 });
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Get a single appointment by ID
  async getAppointmentById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!validateObjectId(id)) {
        throw new AppError('Invalid appointment ID', 400);
      }

      const appointment = await NewAppointment.findById(id)
        .populate('citizen')
        .populate('institution')
        .populate('staff');
      
      if (!appointment) {
        return res.status(404).json({ message: 'NewAppointment not found' });
      }

      res.json(appointment);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  // Update an appointment
  async updateAppointment(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!validateObjectId(id)) {
        throw new AppError('Invalid appointment ID', 400);
      }

      const updates = req.body;
      const allowedUpdates = ['type', 'status', 'scheduledTime', 'duration', 'location', 'notes'];
      
      // Validate updates
      Object.keys(updates).forEach(key => {
        if (!allowedUpdates.includes(key)) {
          throw new AppError(`Cannot update field: ${key}`, 400);
        }
      });

      const appointment = await NewAppointment.findByIdAndUpdate(
        id,
        updates,
        { new: true, runValidators: true }
      ).populate('citizen').populate('institution').populate('staff');

      if (!appointment) {
        return res.status(404).json({ message: 'NewAppointment not found' });
      }

      res.json(appointment);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  // Delete an appointment
  async deleteAppointment(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!validateObjectId(id)) {
        throw new AppError('Invalid appointment ID', 400);
      }

      const appointment = await NewAppointment.findByIdAndDelete(id);
      if (!appointment) {
        return res.status(404).json({ message: 'NewAppointment not found' });
      }

      res.json({ message: 'NewAppointment deleted successfully' });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  // Get appointments by type
  async getAppointmentsByType(req: Request, res: Response) {
    try {
      const type = req.params.type;

      const appointments = await NewAppointment.find({ type })
        .populate('citizen')
        .populate('institution')
        .populate('staff')
        .sort({ scheduledTime: -1 });

      res.json(appointments);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  // Get appointments by status
  async getAppointmentsByStatus(req: Request, res: Response) {
    try {
      const status = req.params.status;

      const appointments = await NewAppointment.find({ status })
        .populate('citizen')
        .populate('institution')
        .populate('staff')
        .sort({ scheduledTime: -1 });

      res.json(appointments);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  // Get appointments by institution
  async getAppointmentsByInstitution(req: Request, res: Response) {
    try {
      const institutionId = req.params.institutionId;
      if (!validateObjectId(institutionId)) {
        throw new AppError('Invalid institution ID', 400);
      }

      const appointments = await NewAppointment.find({ institution: institutionId })
        .populate('citizen')
        .populate('institution')
        .populate('staff')
        .sort({ scheduledTime: -1 });

      res.json(appointments);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
}
