export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'citizen' | 'institution';
  isRegistered: boolean;
  phone?: string;
  address?: string;
  birthDate?: string;
  nationalId?: string;
  emergencyContact?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
}