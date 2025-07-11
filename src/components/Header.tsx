import React from 'react';
import { User, Settings, LogOut, Shield, Calendar, FileText, AlertTriangle } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: 'home' | 'citizen' | 'institution' | 'emergency' | 'appointments' | 'procedures') => void;
  currentPage: string;
  user: any;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage, user, onLogout }) => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">CitizenHub</span>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              <button
                onClick={() => onNavigate('citizen')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'citizen' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Espace Citoyen
              </button>
              
              <button
                onClick={() => onNavigate('institution')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'institution' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Institutions
              </button>
              
              <button
                onClick={() => onNavigate('emergency')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'emergency' 
                    ? 'bg-red-100 text-red-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <AlertTriangle className="inline h-4 w-4 mr-1" />
                Urgence
              </button>
              
              <button
                onClick={() => onNavigate('appointments')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'appointments' 
                    ? 'bg-green-100 text-green-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Calendar className="inline h-4 w-4 mr-1" />
                Rendez-vous
              </button>
              
              <button
                onClick={() => onNavigate('procedures')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'procedures' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FileText className="inline h-4 w-4 mr-1" />
                Démarches
              </button>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user.firstName} {user.lastName}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('citizen')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Se connecter
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};