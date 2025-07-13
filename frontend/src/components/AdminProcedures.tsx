import React, { useState } from 'react';
import { FileText, Search, Filter, Clock, CheckCircle, AlertCircle, Plus, Eye } from 'lucide-react';

export const AdminProcedures: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProcedure, setSelectedProcedure] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'Toutes les démarches', icon: '📋' },
    { id: 'identity', name: 'Identité', icon: '🆔' },
    { id: 'family', name: 'Famille', icon: '👨‍👩‍👧‍👦' },
    { id: 'housing', name: 'Logement', icon: '🏠' },
    { id: 'transport', name: 'Transport', icon: '🚗' },
    { id: 'social', name: 'Social', icon: '🤝' },
    { id: 'business', name: 'Entreprise', icon: '💼' }
  ];

  const procedures = [
    {
      id: '1',
      title: 'Demande de carte d\'identité',
      category: 'identity',
      description: 'Première demande ou renouvellement de carte nationale d\'identité',
      duration: '3-6 semaines',
      difficulty: 'Facile',
      price: 'Gratuit',
      status: 'available',
      documents: ['Justificatif de domicile', 'Acte de naissance', 'Photo d\'identité'],
      steps: [
        'Prendre rendez-vous en mairie',
        'Rassembler les documents nécessaires',
        'Se présenter au rendez-vous',
        'Retirer la carte'
      ]
    },
    {
      id: '2',
      title: 'Demande de passeport',
      category: 'identity',
      description: 'Première demande ou renouvellement de passeport français',
      duration: '2-4 semaines',
      difficulty: 'Moyen',
      price: '86€',
      status: 'available',
      documents: ['Justificatif de domicile', 'Acte de naissance', 'Photo d\'identité', 'Timbres fiscaux'],
      steps: [
        'Prendre rendez-vous en mairie',
        'Acheter les timbres fiscaux',
        'Rassembler les documents',
        'Se présenter au rendez-vous',
        'Retirer le passeport'
      ]
    },
    {
      id: '3',
      title: 'Déclaration de naissance',
      category: 'family',
      description: 'Déclarer la naissance d\'un enfant à l\'état civil',
      duration: '3-5 jours',
      difficulty: 'Facile',
      price: 'Gratuit',
      status: 'available',
      documents: ['Certificat d\'accouchement', 'Pièce d\'identité des parents', 'Livret de famille'],
      steps: [
        'Se rendre à la mairie dans les 5 jours',
        'Présenter les documents',
        'Signer la déclaration',
        'Récupérer l\'acte de naissance'
      ]
    },
    {
      id: '4',
      title: 'Demande de logement social',
      category: 'housing',
      description: 'Faire une demande de logement social (HLM)',
      duration: '6-24 mois',
      difficulty: 'Complexe',
      price: 'Gratuit',
      status: 'available',
      documents: ['Justificatifs de revenus', 'Avis d\'imposition', 'Justificatif de domicile'],
      steps: [
        'Constituer le dossier',
        'Déposer la demande',
        'Attendre l\'attribution',
        'Visiter le logement proposé'
      ]
    }
  ];

  const filteredProcedures = procedures.filter(procedure => {
    const matchesCategory = selectedCategory === 'all' || procedure.category === selectedCategory;
    const matchesSearch = procedure.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         procedure.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const [userProcedures, setUserProcedures] = useState([
    {
      id: '1',
      title: 'Demande de carte d\'identité',
      status: 'in_progress',
      startDate: '2024-01-15',
      expectedDate: '2024-02-15',
      progress: 75
    },
    {
      id: '2',
      title: 'Demande de passeport',
      status: 'completed',
      startDate: '2024-01-01',
      completedDate: '2024-01-25',
      progress: 100
    }
  ]);

  const startProcedure = (procedureId: string) => {
    const procedure = procedures.find(p => p.id === procedureId);
    if (procedure) {
      const newUserProcedure = {
        id: Date.now().toString(),
        title: procedure.title,
        status: 'in_progress',
        startDate: new Date().toISOString().split('T')[0],
        expectedDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        progress: 0
      };
      setUserProcedures([...userProcedures, newUserProcedure]);
      alert('Démarche initiée avec succès !');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Terminée';
      case 'in_progress':
        return 'En cours';
      case 'pending':
        return 'En attente';
      default:
        return 'Inconnue';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3">
          <FileText className="h-8 w-8 text-purple-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Démarches Administratives
            </h1>
            <p className="text-gray-600 mt-2">
              Effectuez vos démarches en ligne rapidement et facilement
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Categories */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Catégories
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-purple-100 text-purple-900'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* My Procedures */}
          <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Mes démarches
            </h3>
            <div className="space-y-3">
              {userProcedures.map((procedure) => (
                <div
                  key={procedure.id}
                  className="p-3 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {procedure.title}
                    </h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(procedure.status)}`}>
                      {getStatusText(procedure.status)}
                    </span>
                  </div>
                  
                  {procedure.status === 'in_progress' && (
                    <div className="mt-2">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${procedure.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {procedure.progress}% terminé
                      </p>
                    </div>
                  )}
                </div>
              ))}
              
              {userProcedures.length === 0 && (
                <p className="text-gray-500 text-sm text-center py-4">
                  Aucune démarche en cours
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Procedures List */}
        <div className="lg:col-span-3">
          {/* Search */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une démarche..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Procedures Grid */}
          <div className="space-y-4">
            {filteredProcedures.map((procedure) => (
              <div
                key={procedure.id}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {procedure.title}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {procedure.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{procedure.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          procedure.difficulty === 'Facile' ? 'bg-green-100 text-green-800' :
                          procedure.difficulty === 'Moyen' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {procedure.difficulty}
                        </span>
                      </div>
                      <div className="font-medium text-purple-600">
                        {procedure.price}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedProcedure(selectedProcedure === procedure.id ? null : procedure.id)}
                      className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Détails</span>
                    </button>
                    <button
                      onClick={() => startProcedure(procedure.id)}
                      className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Commencer</span>
                    </button>
                  </div>
                </div>

                {selectedProcedure === procedure.id && (
                  <div className="border-t pt-4 mt-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Documents requis
                        </h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {procedure.documents.map((doc, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Étapes
                        </h4>
                        <ol className="space-y-1 text-sm text-gray-600">
                          {procedure.steps.map((step, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <span className="flex-shrink-0 w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-medium">
                                {index + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredProcedures.length === 0 && (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                Aucune démarche trouvée avec ces critères
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};