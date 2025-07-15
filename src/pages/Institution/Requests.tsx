import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  User,
  Calendar,
  MessageSquare,
  Download,
  Upload
} from 'lucide-react';

export const InstitutionRequests: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

  const mockRequests = [
    {
      id: '1',
      citizenId: '1',
      citizenName: 'Jean Dupont',
      type: 'carte-identite',
      title: 'Renouvellement carte d\'identité',
      description: 'Demande de renouvellement de carte d\'identité expirée',
      status: 'submitted',
      priority: 'medium',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      dueDate: '2024-02-15T23:59:59Z',
      documents: [
        { id: '1', name: 'Ancienne carte d\'identité.pdf', isVerified: false },
        { id: '2', name: 'Justificatif de domicile.pdf', isVerified: true }
      ],
      assignedTo: null,
      notes: []
    },
    {
      id: '2',
      citizenId: '2',
      citizenName: 'Marie Martin',
      type: 'passeport',
      title: 'Première demande de passeport',
      description: 'Demande de premier passeport pour voyage professionnel',
      status: 'in_review',
      priority: 'high',
      createdAt: '2024-01-14T14:20:00Z',
      updatedAt: '2024-01-16T09:15:00Z',
      dueDate: '2024-02-14T23:59:59Z',
      documents: [
        { id: '3', name: 'Carte d\'identité.pdf', isVerified: true },
        { id: '4', name: 'Photo d\'identité.jpg', isVerified: true },
        { id: '5', name: 'Justificatif de voyage.pdf', isVerified: false }
      ],
      assignedTo: 'Agent Martin',
      notes: [
        { id: '1', author: 'Agent Martin', content: 'Documents reçus, vérification en cours', timestamp: '2024-01-16T09:15:00Z' }
      ]
    },
    {
      id: '3',
      citizenId: '3',
      citizenName: 'Pierre Durand',
      type: 'certificat-residence',
      title: 'Certificat de résidence',
      description: 'Demande de certificat de résidence pour démarches bancaires',
      status: 'approved',
      priority: 'low',
      createdAt: '2024-01-10T16:45:00Z',
      updatedAt: '2024-01-18T11:30:00Z',
      dueDate: '2024-01-25T23:59:59Z',
      documents: [
        { id: '6', name: 'Justificatif de domicile.pdf', isVerified: true }
      ],
      assignedTo: 'Agent Dubois',
      notes: [
        { id: '2', author: 'Agent Dubois', content: 'Demande approuvée, certificat généré', timestamp: '2024-01-18T11:30:00Z' }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'in_review':
        return <Eye className="h-5 w-5 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-gray-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'Soumise';
      case 'in_review':
        return 'En cours d\'examen';
      case 'approved':
        return 'Approuvée';
      case 'rejected':
        return 'Rejetée';
      case 'completed':
        return 'Terminée';
      default:
        return 'Statut inconnu';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'in_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'Faible';
      case 'medium':
        return 'Moyenne';
      case 'high':
        return 'Élevée';
      case 'urgent':
        return 'Urgente';
      default:
        return 'Non définie';
    }
  };

  const handleApprove = (requestId: string) => {
    console.log('Approving request:', requestId);
    alert('Demande approuvée (fonctionnalité simulée)');
  };

  const handleReject = (requestId: string) => {
    const reason = prompt('Raison du rejet:');
    if (reason) {
      console.log('Rejecting request:', requestId, 'Reason:', reason);
      alert('Demande rejetée (fonctionnalité simulée)');
    }
  };

  const handleAssign = (requestId: string) => {
    const agent = prompt('Assigner à l\'agent:');
    if (agent) {
      console.log('Assigning request:', requestId, 'to:', agent);
      alert(`Demande assignée à ${agent} (fonctionnalité simulée)`);
    }
  };

  const filteredRequests = mockRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.citizenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || request.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

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
              Gestion des Demandes
            </h1>
            <p className="text-gray-600 mt-2">
              Traitement et validation des demandes administratives
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {filteredRequests.length}
              </div>
              <div className="text-sm text-gray-600">Demandes</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'En attente', count: mockRequests.filter(r => r.status === 'submitted').length, color: 'blue' },
          { label: 'En cours', count: mockRequests.filter(r => r.status === 'in_review').length, color: 'yellow' },
          { label: 'Approuvées', count: mockRequests.filter(r => r.status === 'approved').length, color: 'green' },
          { label: 'Rejetées', count: mockRequests.filter(r => r.status === 'rejected').length, color: 'red' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
          >
            <div className="text-center">
              <div className={`text-3xl font-bold ${
                stat.color === 'blue' ? 'text-blue-600' :
                stat.color === 'yellow' ? 'text-yellow-600' :
                stat.color === 'green' ? 'text-green-600' :
                'text-red-600'
              }`}>
                {stat.count}
              </div>
              <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une demande..."
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
            <option value="all">Tous les statuts</option>
            <option value="submitted">Soumises</option>
            <option value="in_review">En examen</option>
            <option value="approved">Approuvées</option>
            <option value="rejected">Rejetées</option>
            <option value="completed">Terminées</option>
          </select>
        </div>
      </motion.div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(request.status)}
                    <h3 className="text-xl font-semibold text-gray-900">
                      {request.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                      {getStatusText(request.status)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(request.priority)}`}>
                      {getPriorityText(request.priority)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{request.citizenName}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Créée le {new Date(request.createdAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                    {request.dueDate && (
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Échéance: {new Date(request.dueDate).toLocaleDateString('fr-FR')}</span>
                      </div>
                    )}
                    {request.assignedTo && (
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>Assignée à: {request.assignedTo}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 mb-4">{request.description}</p>
                </div>

                <div className="flex flex-col space-y-2 ml-6">
                  <button
                    onClick={() => setSelectedRequest(selectedRequest === request.id ? null : request.id)}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Détails</span>
                  </button>
                  
                  {request.status === 'submitted' || request.status === 'in_review' ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="flex items-center space-x-1 text-green-600 hover:text-green-800 text-sm"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>Approuver</span>
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="flex items-center space-x-1 text-red-600 hover:text-red-800 text-sm"
                      >
                        <XCircle className="h-4 w-4" />
                        <span>Rejeter</span>
                      </button>
                    </div>
                  ) : null}
                  
                  {!request.assignedTo && (
                    <button
                      onClick={() => handleAssign(request.id)}
                      className="text-purple-600 hover:text-purple-800 text-sm"
                    >
                      Assigner
                    </button>
                  )}
                </div>
              </div>

              {/* Expanded Details */}
              {selectedRequest === request.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="border-t pt-6 mt-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        Documents
                      </h4>
                      <div className="space-y-2">
                        {request.documents.map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <FileText className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-700">{doc.name}</span>
                              {doc.isVerified ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                              )}
                            </div>
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800 text-sm">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-800 text-sm">
                                <Download className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Notes et Commentaires
                      </h4>
                      <div className="space-y-3">
                        {request.notes.length > 0 ? (
                          request.notes.map((note) => (
                            <div key={note.id} className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-medium text-blue-900">{note.author}</span>
                                <span className="text-xs text-blue-600">
                                  {new Date(note.timestamp).toLocaleString('fr-FR')}
                                </span>
                              </div>
                              <p className="text-blue-800 text-sm">{note.content}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm">Aucune note</p>
                        )}
                        
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            placeholder="Ajouter une note..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                            Ajouter
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center"
          >
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucune demande trouvée
            </h3>
            <p className="text-gray-600">
              Aucune demande ne correspond à vos critères de recherche
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};