import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Database, 
  BarChart3, 
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Calendar,
  FileText,
  Shield,
  Activity,
  MapPin
} from 'lucide-react';

export const InstitutionDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Citoyens Enregistrés',
      value: '125,847',
      change: '+2.5%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Requêtes API Aujourd\'hui',
      value: '1,234',
      change: '+12%',
      trend: 'up',
      icon: Database,
      color: 'green'
    },
    {
      title: 'Demandes en Cours',
      value: '89',
      change: '-5%',
      trend: 'down',
      icon: FileText,
      color: 'orange'
    },
    {
      title: 'Taux de Réponse',
      value: '99.2%',
      change: '+0.3%',
      trend: 'up',
      icon: Activity,
      color: 'purple'
    }
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'api_access',
      title: 'Accès API - Données citoyennes',
      description: 'Consultation profil citoyen ID: 12345',
      time: '2 min',
      icon: Database,
      color: 'blue'
    },
    {
      id: '2',
      type: 'emergency',
      title: 'Identification d\'urgence',
      description: 'Accès données médicales - Hôpital Saint-Louis',
      time: '15 min',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      id: '3',
      type: 'appointment',
      title: 'Nouveau rendez-vous',
      description: 'RDV carte d\'identité - 15/02 à 10h00',
      time: '1h',
      icon: Calendar,
      color: 'green'
    },
    {
      id: '4',
      type: 'verification',
      title: 'Document vérifié',
      description: 'Justificatif de domicile validé',
      time: '2h',
      icon: CheckCircle,
      color: 'purple'
    }
  ];

  const quickActions = [
    {
      title: 'Rechercher un Citoyen',
      description: 'Accéder aux données d\'un citoyen',
      icon: Users,
      color: 'blue',
      action: () => {}
    },
    {
      title: 'Valider une Demande',
      description: 'Traiter les demandes en attente',
      icon: CheckCircle,
      color: 'green',
      action: () => {}
    },
    {
      title: 'Générer un Rapport',
      description: 'Exporter les statistiques',
      icon: BarChart3,
      color: 'purple',
      action: () => {}
    },
    {
      title: 'Configuration API',
      description: 'Gérer les accès et permissions',
      icon: Shield,
      color: 'orange',
      action: () => {}
    }
  ];

  const apiEndpoints = [
    {
      endpoint: '/api/v1/citizens/search',
      calls: 1234,
      avgResponse: '120ms',
      status: 'healthy'
    },
    {
      endpoint: '/api/v1/citizens/{id}',
      calls: 856,
      avgResponse: '95ms',
      status: 'healthy'
    },
    {
      endpoint: '/api/v1/emergency/identify',
      calls: 23,
      avgResponse: '2.1s',
      status: 'warning'
    },
    {
      endpoint: '/api/v1/appointments',
      calls: 445,
      avgResponse: '180ms',
      status: 'healthy'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 text-white',
      green: 'bg-green-500 text-white',
      orange: 'bg-orange-500 text-white',
      purple: 'bg-purple-500 text-white',
      red: 'bg-red-500 text-white'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getBgColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200',
      green: 'bg-green-50 border-green-200',
      orange: 'bg-orange-50 border-orange-200',
      purple: 'bg-purple-50 border-purple-200',
      red: 'bg-red-50 border-red-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
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
              Dashboard Institutionnel
            </h1>
            <p className="text-blue-100 text-lg">
              Accès sécurisé aux données citoyennes et services administratifs
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-300" />
                <span className="text-sm">Accès autorisé</span>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-green-300" />
                <span className="text-sm">Système opérationnel</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <Database className="h-12 w-12 text-white" />
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
              <div className={`flex items-center space-x-1 text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className={`h-4 w-4 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                <span>{stat.change}</span>
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
              <Activity className="h-5 w-5 text-gray-400" />
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

      {/* API Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            État des API
          </h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Tous les services opérationnels</span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Endpoint</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Appels (24h)</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Temps de réponse</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Statut</th>
              </tr>
            </thead>
            <tbody>
              {apiEndpoints.map((endpoint, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {endpoint.endpoint}
                    </code>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {endpoint.calls.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {endpoint.avgResponse}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-medium ${getStatusColor(endpoint.status)}`}>
                      {endpoint.status === 'healthy' ? '✓ Opérationnel' : 
                       endpoint.status === 'warning' ? '⚠ Attention' : '✗ Erreur'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* System Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-gray-50 rounded-xl p-6 border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Informations Système
        </h3>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-gray-600 mb-1">Version API</p>
            <p className="font-medium text-gray-900">v2.1.0</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Dernière mise à jour</p>
            <p className="font-medium text-gray-900">15/01/2024 14:30</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Limite de requêtes</p>
            <p className="font-medium text-gray-900">1000/heure</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};