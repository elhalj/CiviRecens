import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Plus, 
  Filter,
  Search,
  CheckCircle,
  AlertCircle,
  XCircle,
  QrCode,
  Phone,
  Mail
} from 'lucide-react';
import { useCitizenStore } from '../../stores/citizenStore';
import toast from 'react-hot-toast';

export const CitizenAppointments: React.FC = () => {
  const { appointments, createAppointment, cancelAppointment, isLoading } = useCitizenStore();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [bookingData, setBookingData] = useState({
    serviceId: '',
    institutionId: '',
    date: '',
    time: '',
    notes: ''
  });

  const services = [
    { id: '1', name: 'Carte d\'identité', institution: 'Mairie du 1er', duration: 30 },
    { id: '2', name: 'Passeport', institution: 'Préfecture', duration: 45 },
    { id: '3', name: 'Permis de conduire', institution: 'Préfecture', duration: 60 },
    { id: '4', name: 'Acte de naissance', institution: 'Mairie du 1er', duration: 15 },
    { id: '5', name: 'Certificat de résidence', institution: 'Mairie du 1er', duration: 20 }
  ];

  const institutions = [
    { 
      id: '1', 
      name: 'Mairie du 1er arrondissement', 
      address: '4 Place du Louvre, 75001 Paris',
      phone: '01 42 76 40 40',
      email: 'contact@mairie01.paris.fr'
    },
    { 
      id: '2', 
      name: 'Préfecture de Police', 
      address: '9 Boulevard du Palais, 75004 Paris',
      phone: '01 53 71 53 71',
      email: 'contact@prefecturepolice.gouv.fr'
    }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'scheduled':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-gray-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmé';
      case 'scheduled':
        return 'Planifié';
      case 'cancelled':
        return 'Annulé';
      case 'completed':
        return 'Terminé';
      default:
        return 'En attente';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const handleBookAppointment = async () => {
    if (!bookingData.serviceId || !bookingData.date || !bookingData.time) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      const success = await createAppointment({
        ...bookingData,
        citizenId: '1' // Mock user ID
      });

      if (success) {
        toast.success('Rendez-vous réservé avec succès !');
        setShowBookingModal(false);
        setBookingData({
          serviceId: '',
          institutionId: '',
          date: '',
          time: '',
          notes: ''
        });
      }
    } catch (error) {
      toast.error('Erreur lors de la réservation');
    }
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir annuler ce rendez-vous ?')) {
      try {
        const success = await cancelAppointment(appointmentId);
        if (success) {
          toast.success('Rendez-vous annulé');
        }
      } catch (error) {
        toast.error('Erreur lors de l\'annulation');
      }
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesFilter = selectedFilter === 'all' || appointment.status === selectedFilter;
    const matchesSearch = appointment.serviceId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setMonth(today.getMonth() + 2);
    return maxDate.toISOString().split('T')[0];
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
            <h1 className="text-3xl font-bold text-gray-900">Mes Rendez-vous</h1>
            <p className="text-gray-600 mt-2">
              Gérez vos rendez-vous administratifs en toute simplicité
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowBookingModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Nouveau rendez-vous</span>
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
              placeholder="Rechercher un rendez-vous..."
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
            <option value="scheduled">Planifiés</option>
            <option value="confirmed">Confirmés</option>
            <option value="completed">Terminés</option>
            <option value="cancelled">Annulés</option>
          </select>
        </div>
      </motion.div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    {getStatusIcon(appointment.status)}
                    <h3 className="text-xl font-semibold text-gray-900">
                      {services.find(s => s.id === appointment.serviceId)?.name || 'Service inconnu'}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                      {getStatusText(appointment.status)}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(appointment.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{institutions.find(i => i.id === appointment.institutionId)?.name || 'Institution inconnue'}</span>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{appointment.notes}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-2 ml-6">
                  {appointment.qrCode && appointment.status === 'confirmed' && (
                    <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm">
                      <QrCode className="h-4 w-4" />
                      <span>QR Code</span>
                    </button>
                  )}
                  
                  {appointment.status === 'scheduled' || appointment.status === 'confirmed' ? (
                    <button
                      onClick={() => handleCancelAppointment(appointment.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Annuler
                    </button>
                  ) : null}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center"
          >
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucun rendez-vous trouvé
            </h3>
            <p className="text-gray-600 mb-6">
              Vous n'avez pas encore de rendez-vous planifiés
            </p>
            <button
              onClick={() => setShowBookingModal(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Réserver mon premier rendez-vous
            </button>
          </motion.div>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                Réserver un rendez-vous
              </h2>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service demandé *
                </label>
                <select
                  value={bookingData.serviceId}
                  onChange={(e) => setBookingData({ ...bookingData, serviceId: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionner un service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} - {service.institution} ({service.duration} min)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    min={getMinDate()}
                    max={getMaxDate()}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heure *
                  </label>
                  <select
                    value={bookingData.time}
                    onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sélectionner une heure</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (optionnel)
                </label>
                <textarea
                  value={bookingData.notes}
                  onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Informations complémentaires..."
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Informations importantes
                </h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Arrivez 15 minutes avant votre rendez-vous</li>
                  <li>• Munissez-vous de vos documents d'identité</li>
                  <li>• Possibilité d'annuler jusqu'à 24h avant</li>
                  <li>• Confirmation par email automatique</li>
                </ul>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setShowBookingModal(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleBookAppointment}
                disabled={isLoading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {isLoading ? 'Réservation...' : 'Confirmer le rendez-vous'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};