import { Request, Response } from 'express';
import { institution } from '../models/Institution.model.js';
import { validateObjectId } from '../utils/validation.js';
import { AppError } from '../utils/AppError.js'

export class InstitutionController {
  // Create a new institution
  async createInstitution(req: Request, res: Response) {
    try {
      const {
        name,
        type,
        address,
        contactInfo,
        services,
        staff,
        appointments,
        requests
      } = req.body;

      // Validate required fields
      if (!name || !type || !address || !contactInfo) {
        throw new AppError('Missing required fields', 400);
      }


      // Validate contact info
      if (!contactInfo.phone || !contactInfo.email) {
        throw new AppError('Contact info must include phone and email', 400);
      }

      // Validate staff IDs
      if (staff && staff.length > 0) {
        if (!staff.every((id: string) => validateObjectId(id))) {
          throw new AppError('Invalid staff ID format', 400);
        }
      }

      // Validate service IDs
      if (services && services.length > 0) {
        if (!services.every((id: string) => validateObjectId(id))) {
          throw new AppError('Invalid service ID format', 400);
        }
      }

      const institutionData = {
        name,
        type,
        address,
        contactInfo,
        services,
        staff,
        appointments,
        requests
      };

      const newIntitution = new institution(institutionData);
      await newIntitution.save();
      res.status(201).json(institution);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  // Get all institutions
  async getAllInstitutions(req: Request, res: Response) {
    try {
      const institutions = await institution.find()
        .populate('staff')
        .populate('appointments')
        .populate('requests')
        .sort({ createdAt: -1 });
      res.json(institutions);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Get a single institution by ID
  async getInstitutionById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!validateObjectId(id)) {
        throw new AppError('Invalid institution ID', 400);
      }

      const institutions = await institution.findById(id)
        .populate('staff')
        .populate('appointments')
        .populate('requests');
      
      if (!institutions) {
        return res.status(404).json({ message: 'institution not found' });
      }

      res.json(institutions);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  // Update an institution
  async updateInstitution(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!validateObjectId(id)) {
        throw new AppError('Invalid institution ID', 400);
      }

      const updates = req.body;
      const allowedUpdates = ['name', 'type', 'address', 'contactInfo', 'services'];
      
      // Validate updates
      Object.keys(updates).forEach(key => {
        if (!allowedUpdates.includes(key)) {
          throw new AppError(`Cannot update field: ${key}`, 400);
        }
      });

      const institutions = await institution.findByIdAndUpdate(
        id,
        updates,
        { new: true, runValidators: true }
      ).populate('staff').populate('appointments').populate('requests');

      if (!institutions) {
        return res.status(404).json({ message: 'institution not found' });
      }

      res.json(institutions);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  // Delete an institution
  async deleteInstitution(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!validateObjectId(id)) {
        throw new AppError('Invalid institution ID', 400);
      }

      const institutions = await institution.findByIdAndDelete(id);
      if (!institutions) {
        return res.status(404).json({ message: 'institution not found' });
      }

      res.json({ message: 'institution deleted successfully' });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  // Get institutions by type
  async getInstitutionsByType(req: Request, res: Response) {
    try {
      const type = req.params.type;

      const institutions = await institution.find({ type })
        .populate('staff')
        .populate('appointments')
        .populate('requests')
        .sort({ createdAt: -1 });

      res.json(institutions);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  // Get institution services
  async getInstitutionServices(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!validateObjectId(id)) {
        throw new AppError('Invalid institution ID', 400);
      }

      const institutions = await institution.findById(id)
        .select('services');
      
      if (!institutions) {
        return res.status(404).json({ message: 'institution not found' });
      }

      res.json(institutions.services);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  // Update institution services
  async updateInstitutionServices(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!validateObjectId(id)) {
        throw new AppError('Invalid institution ID', 400);
      }

      const { services } = req.body;
      if (!Array.isArray(services) || services.some(id => !validateObjectId(id))) {
        throw new AppError('Invalid services array', 400);
      }

      const institutions = await institution.findByIdAndUpdate(
        id,
        { services },
        { new: true }
      );

      if (!institutions) {
        return res.status(404).json({ message: 'institution not found' });
      }

      res.json(institutions.services);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  // Get institution statistics
  async getInstitutionStatistics(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!validateObjectId(id)) {
        throw new AppError('Invalid institution ID', 400);
      }

      const institutions = await institution.findById(id)
        .select('statistics');
      
      if (!institutions) {
        return res.status(404).json({ message: 'institution not found' });
      }

      res.json(institutions.statistics);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
}
