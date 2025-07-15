import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home,
  User,
  Calendar,
  FileText,
  AlertTriangle,
  Building,
  BarChart3,
  Settings,
  Shield,
  Users,
  Database
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

export const Sidebar: React.FC = () => {
  const { user } = useAuthStore();

  const citizenMenuItems = [
    { icon: Home, label: 'Tableau de bord', path: '/dashboard', active: true },
    { icon: User, label: 'Mon profil', path: '/profile' },
    { icon: Calendar, label: 'Mes rendez-vous', path: '/appointments' },
    { icon: FileText, label: 'Mes démarches', path: '/requests' },
    { icon: AlertTriangle, label: 'Urgence médicale', path: '/emergency' },
    { icon: Settings, label: 'Paramètres', path: '/settings' }
  ];

  const institutionMenuItems = [
    { icon: BarChart3, label: 'Tableau de bord', path: '/institution/dashboard', active: true },
    { icon: Users, label: 'Citoyens', path: '/institution/citizens' },
    { icon: Calendar, label: 'Rendez-vous', path: '/institution/appointments' },
    { icon: FileText, label: 'Demandes', path: '/institution/requests' },
    { icon: Database, label: 'API Access', path: '/institution/api' },
    { icon: Settings, label: 'Configuration', path: '/institution/settings' }
  ];

  const adminMenuItems = [
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics', active: true },
    { icon: Users, label: 'Utilisateurs', path: '/admin/users' },
    { icon: Building, label: 'Institutions', path: '/admin/institutions' },
    { icon: Shield, label: 'Sécurité', path: '/admin/security' },
    { icon: Database, label: 'Système', path: '/admin/system' },
    { icon: Settings, label: 'Configuration', path: '/admin/settings' }
  ];

  const getMenuItems = () => {
    switch (user?.role) {
      case 'citizen':
        return citizenMenuItems;
      case 'institution':
        return institutionMenuItems;
      case 'admin':
        return adminMenuItems;
      default:
        return citizenMenuItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <nav className="p-4 space-y-2">
      <div className="mb-6">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Navigation
        </h2>
      </div>

      {menuItems.map((item, index) => (
        <motion.button
          key={item.path}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
            item.active
              ? 'bg-blue-50 text-blue-700 border border-blue-200'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <item.icon className={`h-5 w-5 ${item.active ? 'text-blue-600' : 'text-gray-500'}`} />
          <span className="font-medium">{item.label}</span>
          {item.active && (
            <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
          )}
        </motion.button>
      ))}

      {/* Section rapide */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Accès rapide
        </h3>
        
        <div className="space-y-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <span>Urgence</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <FileText className="h-4 w-4 text-green-500" />
            <span>Nouvelle démarche</span>
          </motion.button>
        </div>
      </div>

      {/* Statut de connexion */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-2 px-4 py-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs text-gray-500">Connecté en sécurisé</span>
        </div>
      </div>
    </nav>
  );
};