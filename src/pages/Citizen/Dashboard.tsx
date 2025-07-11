import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Calendar, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Shield,
  Bell,
  MapPin
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useCitizenStore } from '../../stores/citizenStore';

export const CitizenDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { profile, appointments, requests } = useCitizenStore();

  const stats = [
    {
      title: 'Profil Complété',
      value: '85%',
      icon: User,
      color: 'blue',
      trend: '+5%'
    },
    {
      title: 'Rendez-vous',
      value: '3',
      icon: Calendar,
      color: 'green',
      trend: '+2'
    },
    {
      title: 'Démarches',
      value: '2',
      icon: FileText,
      color: 'purple',
      trend: '+1'
    },
    {
      title: 'Statut Sécurité',
      value: 'Vérifié',
      icon: Shield,
      color: 'emerald',
      trend: '100%'
    }
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'appointment',
      title: 'Rendez-vous confirmé',
      description: 'Renouvellement carte d\'identité - Mairie du 1er',
      time: '2h',
      icon: Calendar,
      color: 'green'
    },
    {
      id: '2',
      type: 'document',
      title: 'Document vérifié',
      description: 'Justificatif de domicile validé',
      time: '1j',
      icon: CheckCircle,
      color: 'blue'
    },
    {
      id: '3',
      type: 'request',
      title: 'Nouvelle demande',
      description: 'Demande de passeport en cours de traitement',
      time: '3j',
      icon: FileText,
      color: 'purple'
    }
  ];

  const quickActions = [
    {
      title: 'Mettre à jour mon profil',
      description: 'Compléter les informations manquantes',
      icon: User,
      color: 'blue',
      action: () => {}
    },
    {
      title: 'Prendre un rendez-vous',
      description: 'Réserver un créneau en mairie',
      icon: Calendar,
      color: 'green',
      action: () => {}
    },
    {
      title: 'Nouvelle démarche',
      description: 'Initier une procédure administrative',
      icon: FileText,
      color: 'purple',
      action: () => {}
    },
    {
      title: 'Urgence médicale',
      description: 'Accès rapide aux données d\'urgence',
      icon: AlertTriangle,
      color: 'red',
      action: () => {}
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 text-white',
      green: 'bg-green-500 text-white',
      purple: 'bg-purple-500 text-white',
      emerald: 'bg-emerald-500 text-white',
      red: 'bg-red-500 text-white'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getBgColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200',
      green: 'bg-green-50 border-green-200',
      purple: 'bg-purple-50 border-purple-200',
      emerald: 'bg-emerald-50 border-emerald-200',
      red: 'bg-red-50 border-red-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Bienvenue, {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-blue-100 text-lg">
              Votre espace personnel CitizenHub
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span className="text-sm">Profil vérifié</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-300" />
                <span className="text-sm">Sécurisé</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <User className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(stat.color)}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="flex items-center space-x-1 text-green-600 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>{stat.trend}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Actions Rapides
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.title}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={action.action}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-md ${getBgColorClasses(action.color)}`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(action.color)}`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{action.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Activities */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Activités Récentes
              </h2>
              <Bell className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getColorClasses(activity.color)}`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {activity.title}
                    </h4>
                    <p className="text-gray-600 text-xs mt-1">
                      {activity.description}
                    </p>
                    <div className="flex items-center space-x-1 mt-2">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">Il y a {activity.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <button className="w-full mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
              Voir toutes les activités
            </button>
          </motion.div>
        </div>
      </div>

      {/* Profile Completion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Complétude du Profil
          </h2>
          <span className="text-2xl font-bold text-blue-600">85%</span>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500" style={{ width: '85%' }}></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm text-gray-700">Informations personnelles</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm text-gray-700">Contact d'urgence</span>
            </div>
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <span className="text-sm text-gray-700">Documents d'identité</span>
            </div>
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <span className="text-sm text-gray-700">Données biométriques</span>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Compléter mon profil
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};