import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        try {
          // Simulation d'appel API
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock users pour la démo
          const mockUsers = {
            'citoyen@test.fr': {
              id: '1',
              email: 'citoyen@test.fr',
              firstName: 'Jean',
              lastName: 'Dupont',
              role: 'citizen' as const,
              isVerified: true,
              createdAt: '2024-01-01',
              lastLogin: new Date().toISOString()
            },
            'institution@gov.fr': {
              id: '2',
              email: 'institution@gov.fr',
              firstName: 'Service',
              lastName: 'Public',
              role: 'institution' as const,
              isVerified: true,
              createdAt: '2024-01-01',
              lastLogin: new Date().toISOString()
            },
            'admin@system.fr': {
              id: '3',
              email: 'admin@system.fr',
              firstName: 'Admin',
              lastName: 'System',
              role: 'admin' as const,
              isVerified: true,
              createdAt: '2024-01-01',
              lastLogin: new Date().toISOString()
            }
          };

          const user = mockUsers[email as keyof typeof mockUsers];
          
          if (user && password) {
            set({ 
              user, 
              isAuthenticated: true, 
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

      register: async (userData: any) => {
        set({ isLoading: true });
        
        try {
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          const newUser: User = {
            id: Date.now().toString(),
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: 'citizen',
            isVerified: false,
            createdAt: new Date().toISOString()
          };
          
          set({ 
            user: newUser, 
            isAuthenticated: true, 
            isLoading: false 
          });
          return true;
        } catch (error) {
          set({ isLoading: false });
          return false;
        }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false 
        });
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ 
            user: { ...currentUser, ...userData } 
          });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
);