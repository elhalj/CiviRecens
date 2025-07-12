import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, CheckCircle, AlertCircle } from 'lucide-react';

export const AppointmentSystem: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const services = [
    { id: 'carte-identite', name: 'Carte d\'identité', duration: '30 min', icon: '🆔' },
    { id: 'passeport', name: 'Passeport', duration: '45 min', icon: '📘' },
    { id: 'permis-conduire', name: 'Permis de conduire', duration: '60 min', icon: '🚗' },
    { id: 'acte-naissance', name: 'Acte de naissance', duration: '15 min', icon: '📜' },
    { id: 'certificat-residence', name: 'Certificat de résidence', duration: '20 min', icon: '🏠' },
    { id: 'mariage', name: 'Mariage civil', duration: '30 min', icon: '💒' }
  ];

  const locations = [
    { id: 'mairie-1', name: 'Mairie du 1er arrondissement', address: '4 Place du Louvre, 75001 Paris' },
    { id: 'mairie-2', name: 'Mairie du 2ème arrondissement', address: '8 Rue de la Banque, 75002 Paris' },
    { id: 'prefecture', name: 'Préfecture de Police', address: '9 Boulevard du Palais, 75004 Paris' },
    { id: 'sous-prefecture', name: 'Sous-préfecture de Boulogne', address: '26 Avenue André Morizet, 92100 Boulogne' }
  ];

  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const [appointments, setAppointments] = useState([
    {
      id: '1',
      service: 'Carte d\'identité',
      date: '2024-02-15',
      time: '10:00',
      location: 'Mairie du 1er arrondissement',
      status: 'confirmed'
    },
    {
      id: '2',
      service: 'Passeport',
      date: '2024-02-20',
      time: '14:30',
      location: 'Préfecture de Police',
      status: 'pending'
    }
  ]);

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime || !selectedService || !selectedLocation) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const newAppointment = {
      id: Date.now().toString(),
      service: services.find(s => s.id === selectedService)?.name || '',
      date: selectedDate,
      time: selectedTime,
      location: locations.find(l => l.id === selectedLocation)?.name || '',
      status: 'confirmed'
    };

    setAppointments([...appointments, newAppointment]);
    
    // Reset form
    setSelectedDate('');
    setSelectedTime('');
    setSelectedService('');
    setSelectedLocation('');
    
    alert('Rendez-vous confirmé !');
  };

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
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3">
          <Calendar className="h-8 w-8 text-green-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Système de Rendez-vous
            </h1>
            <p className="text-gray-600 mt-2">
              Planifiez vos démarches administratives sans file d'attente
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Booking Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Réserver un nouveau rendez-vous
            </h2>

            <div className="space-y-6">
              {/* Service Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Type de démarche
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-colors ${
                        selectedService === service.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{service.icon}</span>
                        <div>
                          <h3 className="font-medium text-gray-900">{service.name}</h3>
                          <p className="text-sm text-gray-600">{service.duration}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Lieu
                </label>
                <div className="space-y-2">
                  {locations.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => setSelectedLocation(location.id)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
                        selectedLocation === location.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-gray-600" />
                        <div>
                          <h3 className="font-medium text-gray-900">{location.name}</h3>
                          <p className="text-sm text-gray-600">{location.address}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date and Time Selection */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={getMinDate()}
                    max={getMaxDate()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heure
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Sélectionner une heure</option>
                    {availableTimes.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleBookAppointment}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Confirmer le rendez-vous
              </button>
            </div>
          </div>
        </div>

        {/* My Appointments */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Mes rendez-vous
            </h3>
            
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">
                      {appointment.service}
                    </h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      appointment.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {appointment.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {appointment.location}
                    </div>
                  </div>
                </div>
              ))}
              
              {appointments.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  Aucun rendez-vous planifié
                </p>
              )}
            </div>
          </div>

          {/* Quick Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Informations importantes
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Arrivez 15 minutes avant votre rendez-vous</li>
              <li>• Munissez-vous de vos documents d'identité</li>
              <li>• Possibilité d'annuler jusqu'à 24h avant</li>
              <li>• Confirmation par email automatique</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};