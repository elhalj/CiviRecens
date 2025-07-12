import React from 'react';
import { Users, Shield, Calendar, FileText, AlertTriangle, Building, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: 'citizen' | 'institution' | 'emergency' | 'appointments' | 'procedures') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <Shield className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Plateforme de Recensement
          <span className="text-blue-600"> Citoyen</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Une solution moderne et sécurisée pour l'autorecensement des citoyens et l'accès aux services publics numériques
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('citizen')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <Users className="mr-2 h-5 w-5" />
            Espace Citoyen
          </button>
          <button
            onClick={() => onNavigate('institution')}
            className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center"
          >
            <Building className="mr-2 h-5 w-5" />
            Accès Institutions
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => onNavigate('citizen')}
        >
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Autorecensement</h3>
          <p className="text-gray-600 mb-4">
            Enregistrez vos données personnelles de manière sécurisée et gardez votre profil citoyen à jour
          </p>
          <div className="flex items-center text-blue-600 font-medium">
            Commencer <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </div>

        <div 
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => onNavigate('emergency')}
        >
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Identification d'Urgence</h3>
          <p className="text-gray-600 mb-4">
            Reconnaissance faciale pour identification rapide en cas d'urgence médicale
          </p>
          <div className="flex items-center text-red-600 font-medium">
            Accéder <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </div>

        <div 
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => onNavigate('appointments')}
        >
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <Calendar className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Rendez-vous</h3>
          <p className="text-gray-600 mb-4">
            Planifiez vos rendez-vous administratifs sans file d'attente
          </p>
          <div className="flex items-center text-green-600 font-medium">
            Réserver <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </div>

        <div 
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => onNavigate('procedures')}
        >
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <FileText className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Démarches Administratives</h3>
          <p className="text-gray-600 mb-4">
            Effectuez vos démarches en ligne rapidement et facilement
          </p>
          <div className="flex items-center text-purple-600 font-medium">
            Explorer <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </div>

        <div 
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => onNavigate('institution')}
        >
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
            <Building className="h-6 w-6 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Accès Institutionnel</h3>
          <p className="text-gray-600 mb-4">
            API sécurisée pour les hôpitaux, mairies et administrations
          </p>
          <div className="flex items-center text-orange-600 font-medium">
            Se connecter <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Sécurité & Confidentialité</h3>
          <p className="text-gray-600 mb-4">
            Vos données sont protégées par un chiffrement de niveau militaire
          </p>
          <div className="flex items-center text-gray-600 font-medium">
            En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Statistiques de la Plateforme
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">125,847</div>
            <div className="text-gray-600">Citoyens enregistrés</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">3,542</div>
            <div className="text-gray-600">Institutions connectées</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">89,234</div>
            <div className="text-gray-600">Démarches effectuées</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">98.7%</div>
            <div className="text-gray-600">Taux de satisfaction</div>
          </div>
        </div>
      </section>
    </div>
  );
};