import { Request, Response } from 'express';
import { NewDemande} from '../models/Demande.model';
import { validateObjectId } from '../utils/validation';
import { AppError } from '../utils/AppError';

export class DemandeController {
  // Create a new request
  async createRequest(req: Request, res: Response) {
    try {
      const {
        citizenId,
        institutionId,
        serviceId,
        adminId,
        type,
        title,
        description,
        status,
        adminName,
        adminEmail,
        createdAt,
        updatedAt
      } = req.body;

      // Validate required fields
      if (!citizenId || !institutionId || !serviceId || !type || !title || !description || !status) {
        throw new AppError('Missing required fields', 400);
      }

      // Validate IDs
      if (!validateObjectId(citizenId) || !validateObjectId(institutionId) || !validateObjectId(serviceId)) {
        throw new AppError('Invalid ID format', 400);
      }

      // Validate admin details if provided
      if (adminId && (!adminName || !adminEmail)) {
        throw new AppError('Admin details must include both name and email', 400);
      }

      // Validate admin email format
      if (adminEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail)) {
        throw new AppError('Invalid admin email format', 400);
      }

      const requestData = {
        citizenId,
        institutionId,
        serviceId,
        adminId,
        type,
        title,
        description,
        status,
        adminName,
        adminEmail,
        createdAt: createdAt || new Date(),
        updatedAt: updatedAt || new Date()
      };

      const request = new NewDemande(requestData);
      await request.save();
      res.status(201).json(request);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  // Get all requests
  async getAllRequests(req: Request, res: Response) {
    try {
      const requests = await NewDemande.find()
        .sort({ createdAt: -1 });
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Get a single request by ID
  async getRequestById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!validateObjectId(id)) {
        throw new AppError('Invalid request ID', 400);
      }

      const request = await NewDemande.findById(id);
      if (!request) {
        return res.status(404).json({ message: 'Request not found' });
      }

      res.json(request);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  // Update a request
  async updateRequest(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!validateObjectId(id)) {
        throw new AppError('Invalid request ID', 400);
      }

      const updates = req.body;
      const allowedUpdates = [
        'citizenId',
        'institutionId',
        'serviceId',
        'adminId',
        'type',
        'title',
        'description',
        'status',
        'adminName',
        'adminEmail'
      ];
      
      // Validate updates
      Object.keys(updates).forEach(key => {
        if (!allowedUpdates.includes(key)) {
          throw new AppError(`Cannot update field: ${key}`, 400);
        }
      });

      const request = await NewDemande.findByIdAndUpdate(
        id,
        updates,
        { new: true, runValidators: true }
      );

      if (!request) {
        return res.status(404).json({ message: 'Request not found' });
      }

      res.json(request);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  // Delete a request
  async deleteRequest(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!validateObjectId(id)) {
        throw new AppError('Invalid request ID', 400);
      }

      const request = await NewDemande.findByIdAndDelete(id);
      if (!request) {
        return res.status(404).json({ message: 'Request not found' });
      }

      res.json({ message: 'Request deleted successfully' });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  // Get requests by citizen
  async getRequestsByCitizen(req: Request, res: Response) {
    try {
      const citizenId = req.params.citizenId;
      if (!validateObjectId(citizenId)) {
        throw new AppError('Invalid citizen ID', 400);
      }

      const requests = await NewDemande.find({ citizenId })
        .sort({ createdAt: -1 });
      res.json(requests);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  // Get requests by institution
  async getRequestsByInstitution(req: Request, res: Response) {
    try {
      const institutionId = req.params.institutionId;
      if (!validateObjectId(institutionId)) {
        throw new AppError('Invalid institution ID', 400);
      }

      const requests = await NewDemande.find({ institutionId })
        .sort({ createdAt: -1 });
      res.json(requests);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  // Get requests by type
  async getRequestsByType(req: Request, res: Response) {
    try {
      const type = req.params.type;

      const requests = await NewDemande.find({ type })
        .sort({ createdAt: -1 });
      res.json(requests);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  // Get requests by status
  async getRequestsByStatus(req: Request, res: Response) {
    try {
      const status = req.params.status;

      const requests = await NewDemande.find({ status })
        .sort({ createdAt: -1 });
      res.json(requests);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
}
