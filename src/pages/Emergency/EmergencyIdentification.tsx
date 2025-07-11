import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  AlertTriangle, 
  User, 
  Phone, 
  MapPin, 
  Upload,
  Heart,
  Shield,
  Clock,
  CheckCircle,
  Loader2
} from 'lucide-react';

export const EmergencyIdentification: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [identificationResult, setIdentificationResult] = useState<any>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mockIdentificationResult = {
    id: '1',
    firstName: 'Jean',
    lastName: 'Dupont',
    birthDate: '1985-03-15',
    address: '123 Rue de la République, 75001 Paris',
    phone: '0123456789',
    emergencyContacts: [
      {
        name: 'Marie Dupont',
        relationship: 'Épouse',
        phone: '0987654321',
        isPrimary: true
      },
      {
        name: 'Dr. Martin',
        relationship: 'Médecin traitant',
        phone: '0156789012',
        isPrimary: false
      }
    ],
    medicalInfo: {
      bloodType: 'A+',
      allergies: ['Pénicilline', 'Arachides'],
      medicalConditions: ['Diabète type 2', 'Hypertension'],
      medications: ['Metformine 500mg', 'Lisinopril 10mg'],
      lastUpdate: '2024-01-15'
    },
    confidence: 96,
    accessLog: {
      timestamp: new Date().toISOString(),
      location: 'Hôpital Saint-Louis, Paris',
      accessedBy: 'Dr. Sophie Martin'
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      simulateIdentification();
    }
  };

  const simulateIdentification = () => {
    setIsScanning(true);
    setScanProgress(0);
    
    // Simulate progressive scanning
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setIdentificationResult(mockIdentificationResult);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleCameraAccess = () => {
    // Simulate camera access
    simulateIdentification();
  };

  const resetIdentification = () => {
    setIdentificationResult(null);
    setImageFile(null);
    setScanProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEmergencyCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Emergency Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white"
      >
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              Identification d'Urgence Médicale
            </h1>
            <p className="text-red-100 text-lg mt-2">
              Système de reconnaissance faciale pour accès rapide aux données vitales
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-red-200" />
                <span className="text-sm">Accès sécurisé</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-red-200" />
                <span className="text-sm">Identification < 5 secondes</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {!identificationResult ? (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Camera Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Camera className="h-6 w-6 mr-3 text-blue-600" />
              Identification par Caméra
            </h2>
            
            <div className="flex flex-col items-center space-y-6">
              <div className="w-80 h-80 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300 relative overflow-hidden">
                {isScanning ? (
                  <div className="text-center">
                    <div className="relative">
                      <div className="w-24 h-24 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-blue-600 font-bold">{scanProgress}%</span>
                      </div>
                    </div>
                    <p className="text-gray-700 font-medium">Analyse biométrique en cours...</p>
                    <div className="w-64 bg-gray-200 rounded-full h-2 mt-4">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-200"
                        style={{ width: `${scanProgress}%` }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Camera className="h-20 w-20 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Caméra inactive</p>
                    <p className="text-gray-500 text-sm mt-2">
                      Positionnez le visage face à la caméra
                    </p>
                  </div>
                )}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCameraAccess}
                disabled={isScanning}
                className="bg-red-600 text-white px-8 py-4 rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 text-lg font-semibold shadow-lg"
              >
                <Camera className="h-6 w-6" />
                <span>{isScanning ? 'Analyse en cours...' : 'Activer la caméra d\'urgence'}</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Upload className="h-6 w-6 mr-3 text-green-600" />
              Upload d'Image
            </h2>
            
            <div className="flex flex-col items-center space-y-6">
              <div 
                className="w-full h-64 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-400 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="text-center">
                  <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg mb-2">Cliquer pour sélectionner une image</p>
                  <p className="text-gray-500 text-sm">
                    Formats acceptés: JPG, PNG, WEBP
                  </p>
                </div>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              {imageFile && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 w-full">
                  <p className="text-sm text-blue-800">
                    <strong>Image sélectionnée:</strong> {imageFile.name}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Taille: {(imageFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Instructions d'utilisation
              </h3>
              <ul className="space-y-2 text-yellow-800 text-sm">
                <li>• Assurez-vous que le visage est bien visible et éclairé</li>
                <li>• Évitez les reflets et les ombres importantes</li>
                <li>• La personne doit regarder directement la caméra</li>
                <li>• En cas d'échec, essayez sous un angle différent</li>
                <li>• Système optimisé pour les situations d'urgence</li>
              </ul>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Identification Success */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Identification Réussie
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Confiance: {identificationResult.confidence}% • Accès autorisé
                  </p>
                </div>
              </div>
              <button
                onClick={resetIdentification}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Nouvelle identification
              </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Personal Information */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
                  <User className="h-6 w-6 mr-2" />
                  Informations Personnelles
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-blue-700">
                      Nom complet
                    </label>
                    <p className="text-xl font-bold text-blue-900">
                      {identificationResult.firstName} {identificationResult.lastName}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-blue-700">
                      Date de naissance
                    </label>
                    <p className="text-blue-900 font-medium">
                      {new Date(identificationResult.birthDate).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-blue-700">
                      Adresse
                    </label>
                    <p className="text-blue-900">{identificationResult.address}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-blue-700">
                      Téléphone
                    </label>
                    <p className="text-blue-900 font-medium">{identificationResult.phone}</p>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="bg-red-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-red-900 mb-4 flex items-center">
                  <Heart className="h-6 w-6 mr-2" />
                  Données Médicales Critiques
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-red-700">
                      Groupe sanguin
                    </label>
                    <p className="text-2xl font-bold text-red-900">
                      {identificationResult.medicalInfo.bloodType}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-red-700">
                      Allergies
                    </label>
                    <div className="space-y-1">
                      {identificationResult.medicalInfo.allergies.map((allergy: string, index: number) => (
                        <span
                          key={index}
                          className="inline-block bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm font-medium mr-2"
                        >
                          ⚠️ {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-red-700">
                      Conditions médicales
                    </label>
                    <ul className="text-red-900 space-y-1">
                      {identificationResult.medicalInfo.medicalConditions.map((condition: string, index: number) => (
                        <li key={index} className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          <span>{condition}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-red-700">
                      Médicaments actuels
                    </label>
                    <ul className="text-red-900 space-y-1">
                      {identificationResult.medicalInfo.medications.map((medication: string, index: number) => (
                        <li key={index} className="text-sm">
                          • {medication}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-green-900 mb-4 flex items-center">
                  <Phone className="h-6 w-6 mr-2" />
                  Contacts d'Urgence
                </h3>
                
                <div className="space-y-4">
                  {identificationResult.emergencyContacts.map((contact: any, index: number) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 ${
                        contact.isPrimary 
                          ? 'border-green-300 bg-green-100' 
                          : 'border-green-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-green-900">
                          {contact.name}
                          {contact.isPrimary && (
                            <span className="ml-2 text-xs bg-green-600 text-white px-2 py-1 rounded-full">
                              Principal
                            </span>
                          )}
                        </h4>
                      </div>
                      <p className="text-green-700 text-sm mb-2">{contact.relationship}</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEmergencyCall(contact.phone)}
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <Phone className="h-4 w-4" />
                        <span>{contact.phone}</span>
                      </motion.button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Emergency Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Actions d'Urgence
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleEmergencyCall('15')}
                className="bg-red-600 text-white p-6 rounded-xl hover:bg-red-700 transition-colors flex flex-col items-center space-y-3"
              >
                <Phone className="h-8 w-8" />
                <span className="font-semibold">Appeler le SAMU</span>
                <span className="text-sm opacity-90">15</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleEmergencyCall('18')}
                className="bg-orange-600 text-white p-6 rounded-xl hover:bg-orange-700 transition-colors flex flex-col items-center space-y-3"
              >
                <AlertTriangle className="h-8 w-8" />
                <span className="font-semibold">Appeler les Pompiers</span>
                <span className="text-sm opacity-90">18</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white p-6 rounded-xl hover:bg-blue-700 transition-colors flex flex-col items-center space-y-3"
              >
                <MapPin className="h-8 w-8" />
                <span className="font-semibold">Hôpital le plus proche</span>
                <span className="text-sm opacity-90">Localiser</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Access Log */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gray-50 rounded-xl p-6 border border-gray-200"
          >
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Journal d'Accès Sécurisé
            </h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>Accès le:</strong> {new Date(identificationResult.accessLog.timestamp).toLocaleString('fr-FR')}
              </p>
              <p>
                <strong>Lieu:</strong> {identificationResult.accessLog.location}
              </p>
              <p>
                <strong>Accédé par:</strong> {identificationResult.accessLog.accessedBy}
              </p>
              <p>
                <strong>Dernière mise à jour des données:</strong> {new Date(identificationResult.medicalInfo.lastUpdate).toLocaleDateString('fr-FR')}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};