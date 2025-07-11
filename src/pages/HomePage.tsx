import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Shield, 
  Calendar, 
  FileText, 
  AlertTriangle, 
  Building, 
  ArrowRight,
  CheckCircle,
  Clock,
  Globe,
  Lock,
  Zap
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: 'Auto-recensement Citoyen',
      description: 'Enregistrez vos données personnelles de manière sécurisée et gardez votre profil citoyen à jour',
      color: 'blue',
      action: () => navigate('/register')
    },
    {
      icon: AlertTriangle,
      title: 'Identification d\'Urgence',
      description: 'Reconnaissance faciale pour identification rapide en cas d\'urgence médicale',
      color: 'red',
      action: () => navigate('/emergency')
    },
    {
      icon: Calendar,
      title: 'Système de Rendez-vous',
      description: 'Planifiez vos rendez-vous administratifs sans file d\'attente',
      color: 'green',
      action: () => navigate('/login')
    },
    {
      icon: FileText,
      title: 'Démarches Numériques',
      description: 'Effectuez vos démarches administratives en ligne rapidement et facilement',
      color: 'purple',
      action: () => navigate('/login')
    },
    {
      icon: Building,
      title: 'Accès Institutionnel',
      description: 'API sécurisée pour les hôpitaux, mairies et administrations',
      color: 'orange',
      action: () => navigate('/login')
    },
    {
      icon: Shield,
      title: 'Sécurité & Confidentialité',
      description: 'Vos données sont protégées par un chiffrement de niveau militaire',
      color: 'gray',
      action: () => {}
    }
  ];

  const stats = [
    { value: '125,847', label: 'Citoyens enregistrés', icon: Users },
    { value: '3,542', label: 'Institutions connectées', icon: Building },
    { value: '89,234', label: 'Démarches effectuées', icon: FileText },
    { value: '98.7%', label: 'Taux de satisfaction', icon: CheckCircle }
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Gain de temps',
      description: 'Réduisez vos démarches de plusieurs heures à quelques minutes'
    },
    {
      icon: Globe,
      title: 'Accessibilité 24/7',
      description: 'Accédez à vos services administratifs à tout moment'
    },
    {
      icon: Lock,
      title: 'Sécurité renforcée',
      description: 'Protection maximale de vos données personnelles'
    },
    {
      icon: Zap,
      title: 'Traitement rapide',
      description: 'Validation automatisée et traitement accéléré'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
      red: 'bg-red-100 text-red-600 hover:bg-red-200',
      green: 'bg-green-100 text-green-600 hover:bg-green-200',
      purple: 'bg-purple-100 text-purple-600 hover:bg-purple-200',
      orange: 'bg-orange-100 text-orange-600 hover:bg-orange-200',
      gray: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6">
            <Shield className="h-10 w-10 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            Plateforme Nationale de
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              Recensement Citoyen
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Une solution moderne et sécurisée pour l'autorecensement des citoyens, 
            l'identification d'urgence et l'accès aux services publics numériques
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            >
              <Users className="mr-2 h-5 w-5" />
              Commencer mon recensement
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="bg-white text-gray-700 border-2 border-gray-300 px-8 py-4 rounded-xl text-lg font-semibold hover:border-gray-400 transition-all duration-300 flex items-center justify-center"
            >
              <Building className="mr-2 h-5 w-5" />
              Accès Institutions
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Fonctionnalités Principales
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez comment notre plateforme révolutionne l'accès aux services publics
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={feature.action}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className={`w-16 h-16 ${getColorClasses(feature.color)} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-8 w-8" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {feature.description}
              </p>
              
              <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                En savoir plus <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white rounded-3xl p-12 shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Pourquoi Choisir Notre Plateforme ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une digitalisation complète pour une administration plus efficace
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            Statistiques de la Plateforme
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Des chiffres qui témoignent de notre impact sur la digitalisation des services publics
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <stat.icon className="h-8 w-8 text-blue-200 mx-auto mb-3" />
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-blue-100 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Prêt à Digitaliser Vos Démarches ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Rejoignez les milliers de citoyens qui ont déjà simplifié leur vie administrative
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/register')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-xl text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Commencer Maintenant
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};