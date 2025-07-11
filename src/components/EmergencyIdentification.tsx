import React, { useState, useRef } from 'react';
import { Camera, AlertTriangle, User, Phone, MapPin,  Upload } from 'lucide-react';

interface EmergencyIdentificationProps {
  userId: string | undefined;
}

export const EmergencyIdentification: React.FC<EmergencyIdentificationProps> = ({ userId }) => {
  const [isScanning, setIsScanning] = useState(false);
  interface IdentificationResult {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    address: string;
    phone: string;
    emergencyContact: string;
    medicalInfo: string;
    bloodType: string;
    confidence: number;
  }

  const [identificationResult, setIdentificationResult] = useState<IdentificationResult | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mockIdentificationResult = {
    id: '1',
    firstName: 'Jean',
    lastName: 'Dupont',
    birthDate: '1985-03-15',
    address: '123 Rue de la République, 75001 Paris',
    phone: '0123456789',
    emergencyContact: 'Marie Dupont - 0987654321',
    medicalInfo: 'Allergique à la pénicilline, diabétique',
    bloodType: 'A+',
    confidence: 95
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
    setTimeout(() => {
      setIsScanning(false);
      setIdentificationResult(mockIdentificationResult);
    }, 3000);
  };

  const handleCameraAccess = () => {
    // Simulate camera access
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIdentificationResult(mockIdentificationResult);
    }, 3000);
  };

  const resetIdentification = () => {
    setIdentificationResult(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="h-8 w-8 text-red-600" />
          <div>
            <h1 className="text-2xl font-bold text-red-900">
              Identification d'Urgence
            </h1>
            <p className="text-red-700 mt-1">
              Système de reconnaissance faciale pour les situations d'urgence médicale
            </p>
          </div>
        </div>
      </div>

      {!identificationResult ? (
        <div className="space-y-6">
          {/* Camera Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Identification par Caméra
            </h2>
            
            <div className="flex flex-col items-center space-y-4">
              <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                {isScanning ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Analyse en cours...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Camera className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Caméra inactive</p>
                  </div>
                )}
              </div>
              
              <button
                onClick={handleCameraAccess}
                disabled={isScanning}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Camera className="h-5 w-5" />
                <span>{isScanning ? 'Analyse en cours...' : 'Activer la caméra'}</span>
              </button>
            </div>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Upload d'Image
            </h2>
            
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-full max-w-md h-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-400 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Cliquer pour sélectionner une image</p>
                </div>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                aria-label="Sélectionner une image pour l'identification d'urgence"
                title="Cliquez pour sélectionner une image"
              />
              
              {imageFile && (
                <p className="text-sm text-gray-600">
                  Image sélectionnée: {imageFile.name}
                </p>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-3">
              Instructions d'utilisation
            </h3>
            <ul className="space-y-2 text-yellow-800">
              <li>• Assurez-vous que le visage est bien visible et éclairé</li>
              <li>• Évitez les reflets et les ombres importantes</li>
              <li>• La personne doit regarder directement la caméra</li>
              <li>• En cas d'échec, essayez sous un angle différent</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Results */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Résultat de l'identification
              </h2>
              <div className="flex items-center space-x-2">
                <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Confiance: {identificationResult.confidence}%
                </div>
                <button
                  onClick={resetIdentification}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Nouvelle identification
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Informations Personnelles
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nom complet
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      {identificationResult.firstName} {identificationResult.lastName}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date de naissance
                    </label>
                    <p className="text-gray-900">{identificationResult.birthDate}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Adresse
                    </label>
                    <p className="text-gray-900">{identificationResult.address}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Contacts d'Urgence
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Téléphone personnel
                    </label>
                    <p className="text-gray-900">{identificationResult.phone}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Contact d'urgence
                    </label>
                    <p className="text-gray-900">{identificationResult.emergencyContact}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Groupe sanguin
                    </label>
                    <p className="text-gray-900 font-semibold">{identificationResult.bloodType}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-red-900 mb-3 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Informations Médicales Importantes
            </h3>
            <p className="text-red-800 text-lg">
              {identificationResult.medicalInfo}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>Contacter les secours</span>
            </button>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Localiser l'hôpital le plus proche</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};