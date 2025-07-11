import { create } from 'zustand';
import { CitizenProfile, Appointment, AdminRequest } from '../types';

interface CitizenState {
  profile: CitizenProfile | null;
  appointments: Appointment[];
  requests: AdminRequest[];
  isLoading: boolean;
  
  // Actions
  loadProfile: (userId: string) => Promise<void>;
  updateProfile: (profileData: Partial<CitizenProfile>) => Promise<boolean>;
  createAppointment: (appointmentData: any) => Promise<boolean>;
  cancelAppointment: (appointmentId: string) => Promise<boolean>;
  submitRequest: (requestData: any) => Promise<boolean>;
  uploadDocument: (file: File, requestId: string) => Promise<boolean>;
}

export const useCitizenStore = create<CitizenState>((set, get) => ({
  profile: null,
  appointments: [],
  requests: [],
  isLoading: false,

  loadProfile: async (userId: string) => {
    set({ isLoading: true });
    
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock profile
      const mockProfile: CitizenProfile = {
        id: '1',
        userId,
        firstName: 'Jean',
        lastName: 'Dupont',
        birthDate: '1985-03-15',
        birthPlace: 'Paris, France',
        nationality: 'Française',
        gender: 'M',
        email: 'jean.dupont@email.com',
        phone: '0123456789',
        address: {
          street: '123 Rue de la République',
          city: 'Paris',
          postalCode: '75001',
          department: 'Paris',
          region: 'Île-de-France',
          country: 'France'
        },
        nationalId: '1850315123456',
        socialSecurityNumber: '1850315123456789',
        bloodType: 'A+',
        allergies: ['Pénicilline', 'Arachides'],
        medicalConditions: ['Diabète type 2'],
        emergencyContacts: [
          {
            id: '1',
            name: 'Marie Dupont',
            relationship: 'Épouse',
            phone: '0987654321',
            email: 'marie.dupont@email.com',
            isPrimary: true
          }
        ],
        biometricConsent: true,
        profileCompleteness: 85,
        lastUpdated: new Date().toISOString(),
        verificationStatus: 'verified',
        consentGiven: true,
        consentDate: '2024-01-01'
      };

      // Mock appointments
      const mockAppointments: Appointment[] = [
        {
          id: '1',
          citizenId: userId,
          institutionId: '1',
          serviceId: '1',
          date: '2024-02-15',
          time: '10:00',
          status: 'confirmed',
          qrCode: 'QR123456',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15'
        }
      ];

      // Mock requests
      const mockRequests: AdminRequest[] = [
        {
          id: '1',
          citizenId: userId,
          institutionId: '1',
          serviceId: '1',
          type: 'carte-identite',
          title: 'Renouvellement carte d\'identité',
          description: 'Demande de renouvellement de carte d\'identité expirée',
          status: 'in_review',
          priority: 'medium',
          documents: [],
          createdAt: '2024-01-10',
          updatedAt: '2024-01-12'
        }
      ];

      set({ 
        profile: mockProfile,
        appointments: mockAppointments,
        requests: mockRequests,
        isLoading: false 
      });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  updateProfile: async (profileData: Partial<CitizenProfile>) => {
    set({ isLoading: true });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const currentProfile = get().profile;
      if (currentProfile) {
        const updatedProfile = {
          ...currentProfile,
          ...profileData,
          lastUpdated: new Date().toISOString()
        };
        
        set({ 
          profile: updatedProfile,
          isLoading: false 
        });
        return true;
      }
      
      set({ isLoading: false });
      return false;
    } catch (error) {
      set({ isLoading: false });
      return false;
    }
  },

  createAppointment: async (appointmentData: any) => {
    set({ isLoading: true });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        ...appointmentData,
        status: 'scheduled',
        qrCode: `QR${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const currentAppointments = get().appointments;
      set({ 
        appointments: [...currentAppointments, newAppointment],
        isLoading: false 
      });
      return true;
    } catch (error) {
      set({ isLoading: false });
      return false;
    }
  },

  cancelAppointment: async (appointmentId: string) => {
    set({ isLoading: true });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const currentAppointments = get().appointments;
      const updatedAppointments = currentAppointments.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: 'cancelled' as const, updatedAt: new Date().toISOString() }
          : apt
      );
      
      set({ 
        appointments: updatedAppointments,
        isLoading: false 
      });
      return true;
    } catch (error) {
      set({ isLoading: false });
      return false;
    }
  },

  submitRequest: async (requestData: any) => {
    set({ isLoading: true });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newRequest: AdminRequest = {
        id: Date.now().toString(),
        ...requestData,
        status: 'submitted',
        documents: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const currentRequests = get().requests;
      set({ 
        requests: [...currentRequests, newRequest],
        isLoading: false 
      });
      return true;
    } catch (error) {
      set({ isLoading: false });
      return false;
    }
  },

  uploadDocument: async (file: File, requestId: string) => {
    set({ isLoading: true });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulation d'upload et OCR
      const newDocument = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
        uploadedAt: new Date().toISOString(),
        isVerified: false
      };
      
      const currentRequests = get().requests;
      const updatedRequests = currentRequests.map(req => 
        req.id === requestId 
          ? { 
              ...req, 
              documents: [...req.documents, newDocument],
              updatedAt: new Date().toISOString()
            }
          : req
      );
      
      set({ 
        requests: updatedRequests,
        isLoading: false 
      });
      return true;
    } catch (error) {
      set({ isLoading: false });
      return false;
    }
  }
}));