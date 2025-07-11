import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  User, 
  Bell, 
  Settings, 
  LogOut, 
  Menu,
  Search,
  Globe
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

export const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: '1',
      title: 'Rendez-vous confirmé',
      message: 'Votre rendez-vous du 15/02 à 10h00 est confirmé',
      time: '2h',
      isRead: false
    },
    {
      id: '2',
      title: 'Document vérifié',
      message: 'Votre carte d\'identité a été vérifiée avec succès',
      time: '1j',
      isRead: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo et Navigation */}
          <div className="flex items-center space-x-8">
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <Shield className="h-8 w-8 text-blue-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CitizenHub</h1>
                <p className="text-xs text-gray-500">Recensement National</p>
              </div>
            </motion.div>

            {/* Barre de recherche */}
            {isAuthenticated && (
              <div className="hidden md:flex relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une démarche, un service..."
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
          </div>

          {/* Actions utilisateur */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                {/* Sélecteur de langue */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Globe className="h-5 w-5" />
                </motion.button>

                {/* Notifications */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </motion.button>

                  {/* Menu notifications */}
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                    >
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                              !notification.isRead ? 'bg-blue-50' : ''
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 text-sm">
                                  {notification.title}
                                </h4>
                                <p className="text-gray-600 text-sm mt-1">
                                  {notification.message}
                                </p>
                              </div>
                              <span className="text-xs text-gray-500 ml-2">
                                {notification.time}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 border-t border-gray-200">
                        <button className="text-blue-600 text-sm hover:text-blue-800 w-full text-center">
                          Voir toutes les notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Menu utilisateur */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {user.role === 'citizen' ? 'Citoyen' : 
                         user.role === 'institution' ? 'Institution' : 'Administrateur'}
                      </p>
                    </div>
                  </motion.button>

                  {/* Menu déroulant utilisateur */}
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                    >
                      <div className="p-4 border-b border-gray-200">
                        <p className="font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      
                      <div className="py-2">
                        <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                          <User className="h-4 w-4" />
                          <span>Mon profil</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                          <Settings className="h-4 w-4" />
                          <span>Paramètres</span>
                        </button>
                      </div>
                      
                      <div className="border-t border-gray-200 py-2">
                        <button
                          onClick={logout}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Se déconnecter</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Se connecter
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};