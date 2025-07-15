import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter,
  Upload,
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Download,
  MessageSquare
} from 'lucide-react';
import { useCitizenStore } from '../../stores/citizenStore';
import toast from 'react-hot-toast';

export const CitizenRequests: React.FC = () => {
  const { requests, submitRequest, uploadDocument, isLoading } = useCitizenStore();
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

  const [requestData, setRequestData] = useState({
    type: '',
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    serviceId: '',
    institutionId: ''
  });

  const requestTypes = [
    { id: 'carte-identite', name: 'Carte d\'identité', category: 'Identité' },
    { id: 'passeport', name: 'Passeport', category: 'Identité' },
    { id: 'permis-conduire', name: 'Permis de conduire', category: 'Transport' },
    { id: 'acte-naissance', name: 'Acte de naissance', category: 'État civil' },
    { id: 'certificat-residence', name: 'Certificat de résidence', category: 'Logement' },
    { id: 'mariage', name: 'Mariage civil', category: 'État civil' },
    { id: 'divorce', name: 'Divorce', category: 'État civil' },
    { id: 'changement-nom', name: 'Changement de nom', category: 'État civil' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <FileText className="h-5 w-5 text-gray-500" />;
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
      case 'draft':
        return 'Brouillon';
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
      case 'draft':
        return 'bg-gray-100 text-gray-800';
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

  const handleSubmitRequest = async () => {
    if (!requestData.type || !requestData.title || !requestData.description) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      const success = await submitRequest({
        ...requestData,
        citizenId: '1', // Mock user ID
        serviceId: requestData.type,
        institutionId: '1' // Mock institution ID
      });

      if (success) {
        toast.success('Demande soumise avec succès !');
        setShowNewRequestModal(false);
        setRequestData({
          type: '',
          title: '',
          description: '',
          priority: 'medium',
          serviceId: '',
          institutionId: ''
        });
      }
    } catch (error) {
      toast.error('Erreur lors de la soumission');
    }
  };

  const handleFileUpload = async (requestId: string, file: File) => {
    try {
      const success = await uploadDocument(file, requestId);
      if (success) {
        toast.success('Document téléchargé avec succès !');
      }
    } catch (error) {
      toast.error('Erreur lors du téléchargement');
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesFilter = selectedFilter === 'all' || request.status === selectedFilter;
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
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
            <h1 className="text-3xl font-bold text-gray-900">Mes Démarches</h1>
            <p className="text-gray-600 mt-2">
              Suivez l'avancement de vos demandes administratives
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNewRequestModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Nouvelle demande</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Filters and Search */}
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
            <option value="draft">Brouillons</option>
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

                  <p className="text-gray-600 mb-3">{request.description}</p>

                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span>Créée le {new Date(request.createdAt).toLocaleDateString('fr-FR')}</span>
                    <span>Mise à jour le {new Date(request.updatedAt).toLocaleDateString('fr-FR')}</span>
                    {request.dueDate && (
                      <span>Échéance: {new Date(request.dueDate).toLocaleDateString('fr-FR')}</span>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedRequest(selectedRequest === request.id ? null : request.id)}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Détails</span>
                  </button>
                  
                  {request.status === 'completed' && (
                    <button className="flex items-center space-x-2 text-green-600 hover:text-green-800 text-sm">
                      <Download className="h-4 w-4" />
                      <span>Télécharger</span>
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
                  className="border-t pt-4 mt-4"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Documents</h4>
                      <div className="space-y-2">
                        {request.documents.length > 0 ? (
                          request.documents.map((doc, docIndex) => (
                            <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <FileText className="h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-700">{doc.name}</span>
                                {doc.isVerified && (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                )}
                              </div>
                              <button className="text-blue-600 hover:text-blue-800 text-sm">
                                Voir
                              </button>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm">Aucun document téléchargé</p>
                        )}
                        
                        {request.status === 'draft' || request.status === 'submitted' ? (
                          <label className="flex items-center justify-center p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                            <Upload className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm text-gray-600">Ajouter un document</span>
                            <input
                              type="file"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleFileUpload(request.id, file);
                                }
                              }}
                            />
                          </label>
                        ) : null}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Historique</h4>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Demande créée</p>
                            <p className="text-xs text-gray-500">
                              {new Date(request.createdAt).toLocaleString('fr-FR')}
                            </p>
                          </div>
                        </div>
                        
                        {request.status !== 'draft' && (
                          <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Demande soumise</p>
                              <p className="text-xs text-gray-500">
                                {new Date(request.updatedAt).toLocaleString('fr-FR')}
                              </p>
                            </div>
                          </div>
                        )}

                        {request.rejectionReason && (
                          <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Demande rejetée</p>
                              <p className="text-xs text-gray-600 mt-1">{request.rejectionReason}</p>
                            </div>
                          </div>
                        )}
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
            <p className="text-gray-600 mb-6">
              Vous n'avez pas encore de demandes administratives
            </p>
            <button
              onClick={() => setShowNewRequestModal(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Créer ma première demande
            </button>
          </motion.div>
        )}
      </div>

      {/* New Request Modal */}
      {showNewRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                Nouvelle demande administrative
              </h2>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de demande *
                </label>
                <select
                  value={requestData.type}
                  onChange={(e) => setRequestData({ ...requestData, type: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionner un type</option>
                  {requestTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name} ({type.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre de la demande *
                </label>
                <input
                  type="text"
                  value={requestData.title}
                  onChange={(e) => setRequestData({ ...requestData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Renouvellement de carte d'identité"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={requestData.description}
                  onChange={(e) => setRequestData({ ...requestData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Décrivez votre demande en détail..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priorité
                </label>
                <select
                  value={requestData.priority}
                  onChange={(e) => setRequestData({ ...requestData, priority: e.target.value as any })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Faible</option>
                  <option value="medium">Moyenne</option>
                  <option value="high">Élevée</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Prochaines étapes
                </h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>1. Soumission de votre demande</li>
                  <li>2. Examen par les services compétents</li>
                  <li>3. Demande de documents complémentaires si nécessaire</li>
                  <li>4. Traitement et validation</li>
                  <li>5. Notification de la décision</li>
                </ul>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setShowNewRequestModal(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSubmitRequest}
                disabled={isLoading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {isLoading ? 'Soumission...' : 'Soumettre la demande'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};