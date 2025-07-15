import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  MapPin,
  Phone,
  Mail,
  Calendar,
  Shield,
  AlertTriangle,
  CheckCircle,
  User,
  FileText
} from 'lucide-react';

export const InstitutionCitizens: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCitizen, setSelectedCitizen] = useState<string | null>(null);

  const mockCitizens = [
    {
      id: '1',
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@email.com',
      phone: '0123456789',
      birthDate: '1985-03-15',
      address: {
        street: '123 Rue de la République',
        city: 'Paris',
        postalCode: '75001'
      },
      nationalId: '1850315123456',
      isVerified: true,
      profileCompleteness: 95,
      lastUpdated: '2024-01-15',
      emergencyContacts: [
        { name: 'Marie Dupont', phone: '0987654321', relationship: 'Épouse' }
      ],
      medicalInfo: {
        bloodType: 'A+',
        allergies: ['Pénicilline'],
        conditions: ['Diabète type 2']
      }
    },
    {
      id: '2',
      firstName: 'Marie',
      lastName: 'Martin',
      email: 'marie.martin@email.com',
      phone: '0987654321',
      birthDate: '1990-07-22',
      address: {
        street: '456 Avenue des Champs',
        city: 'Lyon',
        postalCode: '69001'
      },
      nationalId: '2900722654321',
      isVerified: true,
      profileCompleteness: 88,
      lastUpdated: '2024-01-14',
      emergencyContacts: [
        { name: 'Paul Martin', phone: '0156789012', relationship: 'Époux' }
      ],
      medicalInfo: {
        bloodType: 'B+',
        allergies: ['Arachides', 'Lactose'],
        conditions: []
      }
    },
    {
      id: '3',
      firstName: 'Pierre',
      lastName: 'Durand',
      email: 'pierre.durand@email.com',
      phone: '0156789012',
      birthDate: '1978-11-08',
      address: {
        street: '789 Boulevard Central',
        city: 'Marseille',
        postalCode: '13001'
      },
      nationalId: '1781108987654',
      isVerified: false,
      profileCompleteness: 65,
      lastUpdated: '2024-01-13',
      emergencyContacts: [],
      medicalInfo: {
        bloodType: 'O-',
        allergies: [],
        conditions: ['Hypertension']
      }
    }
  ];

  const filteredCitizens = mockCitizens.filter(citizen => {
    const matchesSearch = citizen.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         citizen.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         citizen.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         citizen.nationalId.includes(searchTerm);
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'verified' && citizen.isVerified) ||
                         (selectedFilter === 'unverified' && !citizen.isVerified) ||
                         (selectedFilter === 'incomplete' && citizen.profileCompleteness < 80);
    
    return matchesSearch && matchesFilter;
  });

  const handleExport = () => {
    // Simulate export functionality
    const data = filteredCitizens.map(citizen => ({
      nom: `${citizen.firstName} ${citizen.lastName}`,
      email: citizen.email,
      telephone: citizen.phone,
      adresse: `${citizen.address.street}, ${citizen.address.postalCode} ${citizen.address.city}`,
      verification: citizen.isVerified ? 'Vérifié' : 'Non vérifié',
      completude: `${citizen.profileCompleteness}%`
    }));
    
    console.log('Export data:', data);
    alert('Export en cours... (fonctionnalité simulée)');
  };

  const getVerificationStatus = (citizen: any) => {
    if (citizen.isVerified && citizen.profileCompleteness >= 80) {
      return { status: 'verified', color: 'green', text: 'Vérifié' };
    } else if (citizen.isVerified) {
      return { status: 'partial', color: 'yellow', text: 'Partiellement vérifié' };
    } else {
      return { status: 'unverified', color: 'red', text: 'Non vérifié' };
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Base de Données Citoyens
            </h1>
            <p className="text-gray-600 mt-2">
              Accès sécurisé aux profils citoyens pour votre institution
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {filteredCitizens.length}
              </div>
              <div className="text-sm text-gray-600">Citoyens trouvés</div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExport}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Exporter</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, email, ou numéro d'identité..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les profils</option>
            <option value="verified">Vérifiés uniquement</option>
            <option value="unverified">Non vérifiés</option>
            <option value="incomplete">Profils incomplets</option>
          </select>
        </div>
      </motion.div>

      {/* Citizens List */}
      <div className="space-y-4">
        {filteredCitizens.length > 0 ? (
          filteredCitizens.map((citizen, index) => {
            const verification = getVerificationStatus(citizen);
            
            return (
              <motion.div
                key={citizen.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {citizen.firstName} {citizen.lastName}
                        </h3>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            verification.color === 'green' ? 'bg-green-100 text-green-800' :
                            verification.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {verification.text}
                          </span>
                          <span className="text-sm text-gray-600">
                            Profil complété à {citizen.profileCompleteness}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Mail className="h-4 w-4" />
                          <span>{citizen.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Phone className="h-4 w-4" />
                          <span>{citizen.phone}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>Né le {new Date(citizen.birthDate).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Shield className="h-4 w-4" />
                          <span>ID: {citizen.nationalId}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{citizen.address.city} ({citizen.address.postalCode})</span>
                        </div>
                        <div className="text-gray-500 text-xs">
                          Mis à jour le {new Date(citizen.lastUpdated).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCitizen(selectedCitizen === citizen.id ? null : citizen.id)}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Voir détails</span>
                    </motion.button>
                    
                    <button className="flex items-center space-x-2 text-green-600 hover:text-green-800 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>Localiser</span>
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedCitizen === citizen.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="border-t pt-6 mt-6"
                  >
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          Adresse Complète
                        </h4>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-700">
                            {citizen.address.street}<br />
                            {citizen.address.postalCode} {citizen.address.city}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          Contacts d'Urgence
                        </h4>
                        <div className="space-y-2">
                          {citizen.emergencyContacts.length > 0 ? (
                            citizen.emergencyContacts.map((contact, idx) => (
                              <div key={idx} className="bg-green-50 rounded-lg p-3 border border-green-200">
                                <p className="font-medium text-green-900">{contact.name}</p>
                                <p className="text-green-700 text-sm">{contact.relationship}</p>
                                <p className="text-green-600 text-sm">{contact.phone}</p>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 text-sm">Aucun contact d'urgence</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Informations Médicales
                        </h4>
                        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                          <div className="space-y-2">
                            <div>
                              <span className="font-medium text-red-900">Groupe sanguin:</span>
                              <span className="ml-2 text-red-800">{citizen.medicalInfo.bloodType}</span>
                            </div>
                            
                            {citizen.medicalInfo.allergies.length > 0 && (
                              <div>
                                <span className="font-medium text-red-900">Allergies:</span>
                                <div className="mt-1">
                                  {citizen.medicalInfo.allergies.map((allergy, idx) => (
                                    <span key={idx} className="inline-block bg-red-200 text-red-800 px-2 py-1 rounded text-xs mr-1">
                                      {allergy}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {citizen.medicalInfo.conditions.length > 0 && (
                              <div>
                                <span className="font-medium text-red-900">Conditions:</span>
                                <ul className="mt-1 text-red-800 text-sm">
                                  {citizen.medicalInfo.conditions.map((condition, idx) => (
                                    <li key={idx}>• {condition}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center"
          >
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucun citoyen trouvé
            </h3>
            <p className="text-gray-600">
              Aucun citoyen ne correspond à vos critères de recherche
            </p>
          </motion.div>
        )}
      </div>

      {/* API Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-blue-50 border border-blue-200 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Informations d'Accès API
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-2">
            <p><strong>Endpoint de recherche:</strong></p>
            <code className="block bg-blue-100 p-2 rounded text-blue-800">
              GET /api/v1/citizens/search?q={searchTerm}
            </code>
            <p><strong>Authentification:</strong> Bearer Token requis</p>
          </div>
          <div className="space-y-2">
            <p><strong>Limite de requêtes:</strong> 1000/heure</p>
            <p><strong>Formats supportés:</strong> JSON, XML, CSV</p>
            <p><strong>Chiffrement:</strong> TLS 1.3</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};