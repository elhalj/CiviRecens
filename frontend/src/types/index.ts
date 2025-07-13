// Types principaux de l'application
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'citizen' | 'institution' | 'admin';
  isVerified: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface CitizenProfile {
  id: string;
  userId: string;
  // Données personnelles
  firstName: string;
  lastName: string;
  birthDate: string;
  birthPlace: string;
  nationality: string;
  gender: 'M' | 'F' | 'Other';
  
  // Contact
  email: string;
  phone: string;
  address: Address;
  
  // Documents officiels
  nationalId: string;
  passportNumber?: string;
  socialSecurityNumber: string;
  
  // Données médicales d'urgence
  bloodType?: string;
  allergies?: string[];
  medicalConditions?: string[];
  emergencyContacts: EmergencyContact[];
  
  // Biométrie
  faceEncodingId?: string;
  biometricConsent: boolean;
  
  // Métadonnées
  profileCompleteness: number;
  lastUpdated: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  consentGiven: boolean;
  consentDate?: string;
}

export interface Address {
  street: string;
  city: string;
  postalCode: string;
  department: string;
  region: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  isPrimary: boolean;
}

export interface Institution {
  id: string;
  name: string;
  type: 'hospital' | 'city_hall' | 'prefecture' | 'administration';
  address: Address;
  phone: string;
  email: string;
  website?: string;
  services: InstitutionService[];
  openingHours: OpeningHours[];
  apiKey: string;
  isActive: boolean;
}

export interface InstitutionService {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: number; // en minutes
  price?: number;
  requiredDocuments: string[];
  isOnline: boolean;
  maxAdvanceBooking: number; // jours
}

export interface OpeningHours {
  dayOfWeek: number; // 0-6 (dimanche-samedi)
  openTime: string;
  closeTime: string;
  isOpen: boolean;
}

export interface Appointment {
  id: string;
  citizenId: string;
  institutionId: string;
  serviceId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  qrCode?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminRequest {
  id: string;
  citizenId: string;
  institutionId: string;
  serviceId: string;
  type: string;
  title: string;
  description: string;
  status: 'draft' | 'submitted' | 'in_review' | 'approved' | 'rejected' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  documents: Document[];
  assignedTo?: string;
  dueDate?: string;
  completedAt?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: string;
  isVerified: boolean;
  ocrData?: any;
}

export interface EmergencyIdentification {
  id: string;
  citizenId: string;
  timestamp: string;
  location?: {
    lat: number;
    lng: number;
  };
  confidence: number;
  accessedBy: string; // ID de l'institution/personne
  reason: string;
  medicalData: {
    bloodType?: string;
    allergies: string[];
    medicalConditions: string[];
    emergencyContacts: EmergencyContact[];
    medications?: string[];
  };
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  details: any;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
}

export interface ApiAccess {
  id: string;
  institutionId: string;
  endpoint: string;
  method: string;
  citizenId?: string;
  timestamp: string;
  responseTime: number;
  statusCode: number;
  rateLimitRemaining: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface Statistics {
  totalCitizens: number;
  verifiedProfiles: number;
  pendingRequests: number;
  completedRequests: number;
  emergencyAccess: number;
  apiCalls: number;
  institutionsConnected: number;
  averageResponseTime: number;
}