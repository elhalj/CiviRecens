import { Request, Response } from 'express';
import { NewStaff } from '../models/Staff.model';
import { validateObjectId } from '../utils/validation';
import { AppError } from '../utils/AppError';

export class StaffController {
  // Create a new staff member
  async createStaff(req: Request, res: Response) {
    try {
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        institution,
        role,
        department,
        schedule,
        availability,
        permissions,
        credentials,
        emergencyAccess
      } = req.body;

      // Validate required fields
      if (!firstName || !lastName || !email || !phoneNumber || !institution || !role || !department) {
        throw new AppError('Missing required fields', 400);
      }

      // Validate institution ID
      if (!validateObjectId(institution)) {
        throw new AppError('Invalid institution ID', 400);
      }

     

      // Validate email format
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new AppError('Invalid email format', 400);
      }

      // Validate phone number format
      if (!/^\+?[1-9]\d{1,14}$/.test(phoneNumber)) {
        throw new AppError('Invalid phone number format', 400);
      }

      // Validate schedule
      if (schedule) {
        if (!schedule.start || !schedule.end || !schedule.days) {
          throw new AppError('Schedule must include start, end, and days', 400);
        }
        if (schedule.start >= schedule.end) {
          throw new AppError('Schedule end must be after start', 400);
        }
      }

      const staffData = {
        firstName,
        lastName,
        email,
        phoneNumber,
        institution,
        role,
        department,
        schedule,
        availability,
        permissions,
        credentials,
        emergencyAccess
      };

      const staff = new NewStaff(staffData);
      await staff.save();
      res.status(201).json(staff);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  // Get all staff members
  async getAllStaff(req: Request, res: Response) {
    try {
      const staff = await NewStaff.find()
        .populate('institution')
        .sort({ createdAt: -1 });
      res.json(staff);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Get a single staff member by ID
  async getStaffById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!validateObjectId(id)) {
        throw new AppError('Invalid staff ID', 400);
      }

      const staff = await NewStaff.findById(id)
        .populate('institution');
      
      if (!staff) {
        return res.status(404).json({ message: 'NewStaff member not found' });
      }

      res.json(staff);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  // Update a staff member
  async updateStaff(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!validateObjectId(id)) {
        throw new AppError('Invalid staff ID', 400);
      }

      const updates = req.body;
      const allowedUpdates = [
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
        'institution',
        'role',
        'department',
        'schedule',
        'availability',
        'permissions',
        'credentials',
        'emergencyAccess'
      ];
      
      // Validate updates
      Object.keys(updates).forEach(key => {
        if (!allowedUpdates.includes(key)) {
          throw new AppError(`Cannot update field: ${key}`, 400);
        }
      });

      // Validate institution ID if provided
      if (updates.institution && !validateObjectId(updates.institution)) {
        throw new AppError('Invalid institution ID', 400);
      }

      const staff = await NewStaff.findByIdAndUpdate(
        id,
        updates,
        { new: true, runValidators: true }
      ).populate('institution');

      if (!staff) {
        return res.status(404).json({ message: 'NewStaff member not found' });
      }

      res.json(staff);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  // Delete a staff member
  async deleteStaff(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!validateObjectId(id)) {
        throw new AppError('Invalid staff ID', 400);
      }

      const staff = await NewStaff.findByIdAndDelete(id);
      if (!staff) {
        return res.status(404).json({ message: 'NewStaff member not found' });
      }

      res.json({ message: 'NewStaff member deleted successfully' });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  // Get staff by role
  async getStaffByRole(req: Request, res: Response) {
    try {
      const role = req.params.role;

      const staff = await NewStaff.find({ role })
        .populate('institution')
        .sort({ createdAt: -1 });
      res.json(staff);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  // Get staff by institution
  async getStaffByInstitution(req: Request, res: Response) {
    try {
      const institutionId = req.params.institution;
      if (!validateObjectId(institutionId)) {
        throw new AppError('Invalid institution ID', 400);
      }

      const staff = await NewStaff.find({ institution: institutionId })
        .populate('institution')
        .sort({ createdAt: -1 });
      res.json(staff);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
}
