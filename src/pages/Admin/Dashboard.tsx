import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Building, 
  Database, 
  Shield,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Globe,
  Server,
  Lock
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const systemStats = [
    {
      title: 'Utilisateurs Totaux',
      value: '129,389',
      change: '+3.2%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Institutions Actives',
      value: '3,542',
      change: '+1.8%',
      trend: 'up',
      icon: Building,
      color: 'green'
    },
    {
      title: 'Requêtes API/jour',
      value: '45,123',
      change: '+12.5%',
      trend: 'up',
      icon: Database,
      color: 'purple'
    },
    {
      title: 'Uptime Système',
      value: '99.98%',
      change: '+0.02%',
      trend: 'up',
      icon: Activity,
      color: 'emerald'
    }
  ];

  const securityMetrics = [
    { label: 'Tentatives de connexion échouées', value: '23', status: 'warning' },
    { label: 'Accès d\'urgence autorisés', value: '156', status: 'normal' },
    { label: 'Violations de sécurité détectées', value: '0', status: 'good' },
    { label: 'Certificats SSL expirés', value: '0', status: 'good' }
  ];

  const systemHealth = [
    { service: 'API Gateway', status: 'healthy', uptime: '99.99%', responseTime: '45ms' },
    { service: 'Base de données', status: 'healthy', uptime: '99.95%', responseTime: '12ms' },
    { service: 'Service d\'authentification', status: 'healthy', uptime: '99.98%', responseTime: '89ms' },
    { service: 'Reconnaissance faciale', status: 'warning', uptime: '98.2%', responseTime: '2.1s' },
    { service: 'Système de fichiers', status: 'healthy', uptime: '99.99%', responseTime: '23ms' }
  ];

  const recentAlerts = [
    {
      id: '1',
      type: 'security',
      title: 'Tentative d\'accès non autorisé',
      description: 'Détection d\'une tentative d\'accès depuis une IP suspecte',
      severity: 'high',
      timestamp: '2024-01-20T14:30:00Z',
      resolved: false
    },
    {
      id: '2',
      type: 'performance',
      title: 'Latence élevée détectée',
      description: 'Le service de reconnaissance faciale présente des temps de réponse élevés',
      severity: 'medium',
      timestamp: '2024-01-20T13:15:00Z',
      resolved: false
    },
    {
      id: '3',
      type: 'system',
      title: 'Mise à jour de sécurité appliquée',
      description: 'Patch de sécurité appliqué avec succès sur tous les serveurs',
      severity: 'info',
      timestamp: '2024-01-20T10:00:00Z',
      resolved: true
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'error':
        return 'text-red-600';
      case 'good':
        return 'text-green-600';
      case 'normal':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'info':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'security':
        return <Shield className="h-4 w-4" />;
      case 'performance':
        return <Activity className="h-4 w-4" />;
      case 'system':
        return <Server className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Administration Système
            </h1>
            <p className="text-purple-100 text-lg">
              Supervision et gestion de la plateforme nationale de recensement
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-purple-300" />
                <span className="text-sm">Sécurité maximale</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-blue-300" />
                <span className="text-sm">Couverture nationale</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <BarChart3 className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => (
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
        {/* System Health */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              État des Services
            </h2>
            
            <div className="space-y-4">
              {systemHealth.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      service.status === 'healthy' ? 'bg-green-500' :
                      service.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span className="font-medium text-gray-900">{service.service}</span>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <span>Uptime: {service.uptime}</span>
                    <span>Réponse: {service.responseTime}</span>
                    <span className={`font-medium ${getStatusColor(service.status)}`}>
                      {service.status === 'healthy' ? 'Opérationnel' : 
                       service.status === 'warning' ? 'Attention' : 'Erreur'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Security Metrics */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Lock className="h-5 w-5 mr-2" />
              Métriques de Sécurité
            </h2>
            
            <div className="space-y-4">
              {securityMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{metric.label}</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-900">{metric.value}</span>
                    <div className={`w-2 h-2 rounded-full ${
                      metric.status === 'good' ? 'bg-green-500' :
                      metric.status === 'warning' ? 'bg-yellow-500' :
                      metric.status === 'normal' ? 'bg-blue-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Recent Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Alertes Récentes
          </h2>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Voir toutes les alertes
          </button>
        </div>
        
        <div className="space-y-4">
          {recentAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)} ${
                alert.resolved ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getAlertIcon(alert.type)}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      {alert.title}
                      {alert.resolved && (
                        <CheckCircle className="inline h-4 w-4 text-green-500 ml-2" />
                      )}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                    <span className="text-xs text-gray-500">
                      {new Date(alert.timestamp).toLocaleString('fr-FR')}
                    </span>
                  </div>
                </div>
                {!alert.resolved && (
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Résoudre
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="grid md:grid-cols-3 gap-6"
      >
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Actions Rapides
          </h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <div className="font-medium text-blue-900">Générer un rapport</div>
              <div className="text-sm text-blue-700">Rapport d'activité système</div>
            </button>
            <button className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <div className="font-medium text-green-900">Sauvegarder la base</div>
              <div className="text-sm text-green-700">Sauvegarde complète</div>
            </button>
            <button className="w-full text-left p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <div className="font-medium text-purple-900">Audit de sécurité</div>
              <div className="text-sm text-purple-700">Scan complet du système</div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Ressources Système
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>CPU</span>
                <span>45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Mémoire</span>
                <span>67%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '67%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Stockage</span>
                <span>23%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '23%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Informations Système
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Version</span>
              <span className="font-medium">v2.1.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Dernière mise à jour</span>
              <span className="font-medium">20/01/2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Environnement</span>
              <span className="font-medium">Production</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Région</span>
              <span className="font-medium">Europe-West</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};