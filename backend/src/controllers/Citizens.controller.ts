import { Request, Response } from 'express';
import { NewCitizen } from '../models/Citizens.model.js';
import { validateObjectId } from '../utils/validation.js';
import { AppError } from '../utils/AppError.js';
import TokenService from '../utils/token.js';
import bcrypt from 'bcryptjs';

export class CitizensController {
  // Create a new citizen
  async createCitizen(req: Request, res: Response) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        birthDate,
        phoneNumber,
        address,
        emergencyProfile,
        appointments,
        requests,
        administrativeRequests,
        biometricData
      } = req.body;

      // Validate required fields
      if (!firstName || !lastName || !email || !password || !birthDate || !phoneNumber || !address || !emergencyProfile) {
        throw new AppError('Missing required fields', 400);
      }

      // Validate name fields
      if (!/^[a-zA-Z\s]+$/.test(firstName) || !/^[a-zA-Z\s]+$/.test(lastName)) {
        throw new AppError('Invalid name format', 400);
      }

      // Validate email format
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new AppError('Invalid email format', 400);
      }
      // Validate password
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(password)) {
        throw new AppError('Password must contain at least 8 characters, with one lowercase, one uppercase and one number', 400);
      }

      // Validate phone number format
      if (!/^\+?[1-9]\d{1,14}$/.test(phoneNumber)) {
        throw new AppError('Invalid phone number format', 400);
      }

      // Validate birth date
      if (birthDate >= new Date()) {
        throw new AppError('Birth date must be in the past', 400);
      }
      const BloodType = Object.freeze({
        'A+': 'A+',
        'A-': 'A-',
        'B+': 'B+',
        'B-': 'B-',
        'AB+': 'AB+',
        'AB-': 'AB-',
        'O+': 'O+',
        'O-': 'O-'
      } as const);

      // Validate emergency profile
      if (!emergencyProfile.bloodType || !Object.values(BloodType).includes(emergencyProfile.bloodType)) {
        throw new AppError('Invalid blood type', 400);
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const citizenData = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        birthDate,
        phoneNumber,
        address,
        emergencyProfile,
        appointments,
        requests,
        administrativeRequests,
        biometricData
      };

      const citizen = new NewCitizen(citizenData);
      await citizen.save();
      const token = TokenService.generateToken(citizen.id)
      res.status(201).json({ data: citizen, token: token });
    } catch (error: unknown) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
  
  
  // Login a citizen
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const citizen = await NewCitizen.findOne({ email });
      if (!citizen) {
        throw new AppError('Invalid email or password', 401);
      }
      const isMatch = await bcrypt.compare(password, citizen.password);
      if (!isMatch) {
        throw new AppError('Invalid email or password', 401);
      }
      const token = TokenService.generateToken(citizen.id)
      res.json({ data: citizen, token: token });
    } catch (error: unknown) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
  
  // Register a new citizen
  async register(req: Request, res: Response) {
    const {
      firstName,
      lastName,
      email,
      password,
      birthDate,
      phoneNumber,
      address,
      emergencyProfile,
      appointments,
      requests,
      administrativeRequests,
      biometricData
    } = req.body;
    try {
      // Validate email
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new AppError('Invalid email format', 400);
      }
      // Validate password
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(password)) {
        throw new AppError('Password must contain at least 8 characters, with one lowercase, one uppercase and one number', 400);
      }
      const hashedPassword = await bcrypt.hash(password, 12)
      const citizenData = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        birthDate,
        phoneNumber,
        address,
        emergencyProfile,
        appointments,
        requests,
        administrativeRequests,
        biometricData
      };
      const citizen = new NewCitizen(citizenData);
      await citizen.save();
      const token = TokenService.generateToken(citizen.id)
      res.status(201).json({ data: citizen, token: token });
    } catch (error: unknown) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }


  // Get all citizens
  async getAllCitizens(req: Request, res: Response) {
    try {
      const citizens = await NewCitizen.find()
        .populate('appointments')
        .populate('requests')
        .populate('administrativeRequests')
        .sort({ createdAt: -1 });
      res.json(citizens);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Get a single citizen by ID
  async getCitizenById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!validateObjectId(id)) {
        throw new AppError('Invalid citizen ID', 400);
      }

      const citizen = await NewCitizen.findById(id)
        .populate('appointments')
        .populate('requests')
        .populate('administrativeRequests');
      
      if (!citizen) {
        return res.status(404).json({ message: 'NewCitizen not found' });
      }

      res.json(citizen);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  // Update a citizen
  async updateCitizen(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!validateObjectId(id)) {
        throw new AppError('Invalid citizen ID', 400);
      }

      const updates = req.body;
      const allowedUpdates = [
        'firstName',
        'lastName',
        'email',
        'birthDate',
        'phoneNumber',
        'address',
        'emergencyProfile',
        'appointments',
        'requests',
        'administrativeRequests',
        'biometricData'
      ];
      
      // Validate updates
      Object.keys(updates).forEach(key => {
        if (!allowedUpdates.includes(key)) {
          throw new AppError(`Cannot update field: ${key}`, 400);
        }
      });
      const BloodType = Object.freeze({
        'A+': 'A+',
        'A-': 'A-',
        'B+': 'B+',
        'B-': 'B-',
        'AB+': 'AB+',
        'AB-': 'AB-',
        'O+': 'O+',
        'O-': 'O-'
      } as const );
      

      // Validate emergency profile if provided
      if (updates.emergencyProfile) {
        if (!updates.emergencyProfile.bloodType || !Object.values(BloodType).includes(updates.emergencyProfile.bloodType)) {
          throw new AppError('Invalid blood type', 400);
        }
      }

      const citizen = await NewCitizen.findByIdAndUpdate(
        id,
        updates,
        { new: true, runValidators: true }
      ).populate('appointments').populate('requests').populate('administrativeRequests');

      if (!citizen) {
        return res.status(404).json({ message: 'NewCitizen not found' });
      }

      res.json(citizen);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  // Delete a citizen
  async deleteCitizen(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!validateObjectId(id)) {
        throw new AppError('Invalid citizen ID', 400);
      }

      const citizen = await NewCitizen.findByIdAndDelete(id);
      if (!citizen) {
        return res.status(404).json({ message: 'NewCitizen not found' });
      }

      res.json({ message: 'NewCitizen deleted successfully' });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  // Get citizens by blood type
  async getCitizensByBloodType(req: Request, res: Response) {
    try {
      const bloodType = req.params.bloodType;
      
      const citizens = await NewCitizen.find({
        'emergencyProfile.bloodType': bloodType
      }).populate('appointments').populate('requests').populate('administrativeRequests')
        .sort({ createdAt: -1 });

      res.json(citizens);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  // Get citizens with specific allergies
  async getCitizensByAllergies(req: Request, res: Response) {
    try {
      const { allergy } = req.params;
      const citizens = await NewCitizen.find({
        'emergencyProfile.allergies': allergy
      }).populate('appointments').populate('requests').populate('administrativeRequests')
        .sort({ createdAt: -1 });
      res.json(citizens);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
}
