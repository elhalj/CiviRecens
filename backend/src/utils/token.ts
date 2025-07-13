import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

// Load environment variables
config();

export interface TokenPayload {
  id: string;
  role: string;
  [key: string]: any; // Allow for additional custom claims
}

export class TokenService {
  private static readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
  private static readonly JWT_EXPIRES_IN = '24h';

  /**
   * Generate a JWT token
   * @param payload - The payload to encode in the token
   * @returns The generated JWT token
   */
  static generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, TokenService.JWT_SECRET, {
      expiresIn: TokenService.JWT_EXPIRES_IN,
    });
  }

  /**
   * Verify a JWT token
   * @param token - The token to verify
   * @returns The decoded token payload
   * @throws If token is invalid or expired
   */
  static verifyToken(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, TokenService.JWT_SECRET) as TokenPayload;
      return decoded;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  /**
   * Generate a refresh token
   * @returns The refresh token
   */
  static generateRefreshToken(): string {
    return jwt.sign({}, TokenService.JWT_SECRET, {
      expiresIn: '7d',
    });
  }
}

export default TokenService;
