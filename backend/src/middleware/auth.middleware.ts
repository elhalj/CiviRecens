import { Request, Response, NextFunction } from 'express';
import { TokenPayload } from '../utils/token';
import TokenService from '../utils/token';

/**
 * Middleware to authenticate and authorize requests
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const authenticateToken = async (req: Request & { citizen?: TokenPayload }, res: Response, next: NextFunction) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }


    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = TokenService.verifyToken(token);
    
    // Attach user data to request
    req.citizen = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

/**
 * Middleware to check if user has admin role
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

/**
 * Middleware to check if user has institution role
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const authorizeInstitution = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'institution') {
    return res.status(403).json({ error: 'Institution access required' });
  }
  next();
};

/**
 * Middleware to check if user has citizen role
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const authorizeCitizen = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'citizen') {
    return res.status(403).json({ error: 'Citizen access required' });
  }
  next();
};
