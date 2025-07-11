import React, { useState } from 'react';
import { Search, Filter, Download, Users, Eye, Database, BarChart3, MapPin } from 'lucide-react';

export const InstitutionDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const mockCitizens = [
    {
      id: '1',
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@email.com',
      phone: '0123456789',
      address: '123 Rue de la République, 75001 Paris',
      birthDate: '1985-03-15',
      nationalId: '1850315123456',
      lastUpdated: '2024-01-15',
      verified: true
    },
    {
      id: '2',
      firstName: 'Marie',
      lastName: 'Martin',
      email: 'marie.martin@email.com',
      phone: '0987654321',
      address: '456 Avenue des Champs, 69001 Lyon',
      birthDate: '1990-07-22',
      nationalId: '2900722654321',
      lastUpdated: '2024-01-14',
      verified: true
    },
    {
      id: '3',
      firstName: 'Pierre',
      lastName: 'Durand',
      email: 'pierre.durand@email.com',
      phone: '0156789012',
      address: '789 Boulevard Central, 13001 Marseille',
      birthDate: '1978-11-08',
      nationalId: '1781108987654',
      lastUpdated: '2024-01-13',
      verified: false
    }
  ];

  const filteredCitizens = mockCitizens.filter(citizen => {
    const matchesSearch = citizen.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         citizen.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         citizen.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'verified' && citizen.verified) ||
                         (selectedFilter === 'unverified' && !citizen.verified);
    
    return matchesSearch && matchesFilter;
  });

  const handleExport = () => {
    alert('Export en cours... (fonctionnalité simulée)');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard Institutionnel
            </h1>
            <p className="text-gray-600 mt-2">
              Accès sécurisé aux données citoyennes pour les institutions autorisées
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleExport}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Exporter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Citoyens</p>
              <p className="text-2xl font-bold text-blue-600">125,847</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Profils Vérifiés</p>
              <p className="text-2xl font-bold text-green-600">98,234</p>
            </div>
            <Eye className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Requêtes API</p>
              <p className="text-2xl font-bold text-purple-600">45,123</p>
            </div>
            <Database className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Taux de Réponse</p>
              <p className="text-2xl font-bold text-orange-600">99.2%</p>
            </div>
            <BarChart3 className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, prénom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les profils</option>
            <option value="verified">Vérifiés uniquement</option>
            <option value="unverified">Non vérifiés</option>
          </select>
        </div>

        {/* Citizens Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Nom complet</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Téléphone</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Adresse</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date de naissance</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Statut</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCitizens.map((citizen) => (
                <tr key={citizen.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">
                      {citizen.firstName} {citizen.lastName}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{citizen.email}</td>
                  <td className="py-3 px-4 text-gray-600">{citizen.phone}</td>
                  <td className="py-3 px-4 text-gray-600 max-w-xs truncate">
                    {citizen.address}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{citizen.birthDate}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      citizen.verified 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {citizen.verified ? 'Vérifié' : 'En attente'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <MapPin className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCitizens.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Aucun citoyen trouvé avec ces critères</p>
          </div>
        )}
      </div>

      {/* API Information */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations API</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Endpoint:</strong> https://api.citizenhub.gov.fr/v1/citizens
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Authentification:</strong> Bearer Token requis
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Rate Limit:</strong> 1000 requêtes/heure
          </p>
          <p className="text-sm text-gray-600">
            <strong>Formats supportés:</strong> JSON, XML, CSV
          </p>
        </div>
      </div>
    </div>
  );
};