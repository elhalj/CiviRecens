import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Camera,
  Upload,
  Save,
  Edit3,
  CheckCircle,
  AlertTriangle,
  Heart,
  Users as UsersIcon
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useCitizenStore } from '../../stores/citizenStore';
import toast from 'react-hot-toast';

export const CitizenProfile: React.FC = () => {
  const { user } = useAuthStore();
  const { profile, loadProfile, updateProfile, isLoading } = useCitizenStore();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    birthPlace: '',
    nationality: 'Française',
    gender: 'M' as 'M' | 'F' | 'Other',
    address: {
      street: '',
      city: '',
      postalCode: '',
      department: '',
      region: '',
      country: 'France'
    },
    nationalId: '',
    passportNumber: '',
    socialSecurityNumber: '',
    bloodType: '',
    allergies: [] as string[],
    medicalConditions: [] as string[],
    emergencyContacts: [] as any[]
  });

  useEffect(() => {
    if (user?.id) {
      loadProfile(user.id);
    }
  }, [user?.id, loadProfile]);

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        phone: profile.phone || '',
        birthDate: profile.birthDate || '',
        birthPlace: profile.birthPlace || '',
        nationality: profile.nationality || 'Française',
        gender: profile.gender || 'M',
        address: profile.address || {
          street: '',
          city: '',
          postalCode: '',
          department: '',
          region: '',
          country: 'France'
        },
        nationalId: profile.nationalId || '',
        passportNumber: profile.passportNumber || '',
        socialSecurityNumber: profile.socialSecurityNumber || '',
        bloodType: profile.bloodType || '',
        allergies: profile.allergies || [],
        medicalConditions: profile.medicalConditions || [],
        emergencyContacts: profile.emergencyContacts || []
      });
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      const success = await updateProfile(formData);
      if (success) {
        toast.success('Profil mis à jour avec succès !');
        setIsEditing(false);
      } else {
        toast.error('Erreur lors de la mise à jour');
      }
    } catch (error) {
      toast.error('Une erreur est survenue');
    }
  };

  const addEmergencyContact = () => {
    setFormData({
      ...formData,
      emergencyContacts: [
        ...formData.emergencyContacts,
        {
          id: Date.now().toString(),
          name: '',
          relationship: '',
          phone: '',
          email: '',
          isPrimary: formData.emergencyContacts.length === 0
        }
      ]
    });
  };

  const updateEmergencyContact = (index: number, field: string, value: string) => {
    const updatedContacts = [...formData.emergencyContacts];
    updatedContacts[index] = { ...updatedContacts[index], [field]: value };
    setFormData({ ...formData, emergencyContacts: updatedContacts });
  };

  const removeEmergencyContact = (index: number) => {
    const updatedContacts = formData.emergencyContacts.filter((_, i) => i !== index);
    setFormData({ ...formData, emergencyContacts: updatedContacts });
  };

  const addAllergy = (allergy: string) => {
    if (allergy && !formData.allergies.includes(allergy)) {
      setFormData({
        ...formData,
        allergies: [...formData.allergies, allergy]
      });
    }
  };

  const removeAllergy = (allergy: string) => {
    setFormData({
      ...formData,
      allergies: formData.allergies.filter(a => a !== allergy)
    });
  };

  const tabs = [
    { id: 'personal', label: 'Informations Personnelles', icon: User },
    { id: 'contact', label: 'Contact & Adresse', icon: MapPin },
    { id: 'documents', label: 'Documents Officiels', icon: Shield },
    { id: 'medical', label: 'Données Médicales', icon: Heart },
    { id: 'emergency', label: 'Contacts d\'Urgence', icon: UsersIcon }
  ];

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prénom *
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-gray-900 py-3">{formData.firstName || 'Non renseigné'}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom *
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-gray-900 py-3">{formData.lastName || 'Non renseigné'}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date de naissance *
          </label>
          {isEditing ? (
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-gray-900 py-3">{formData.birthDate || 'Non renseigné'}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lieu de naissance
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.birthPlace}
              onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paris, France"
            />
          ) : (
            <p className="text-gray-900 py-3">{formData.birthPlace || 'Non renseigné'}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nationalité
          </label>
          {isEditing ? (
            <select
              value={formData.nationality}
              onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Française">Française</option>
              <option value="Européenne">Européenne</option>
              <option value="Autre">Autre</option>
            </select>
          ) : (
            <p className="text-gray-900 py-3">{formData.nationality}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Genre
          </label>
          {isEditing ? (
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'M' | 'F' | 'Other' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="M">Masculin</option>
              <option value="F">Féminin</option>
              <option value="Other">Autre</option>
            </select>
          ) : (
            <p className="text-gray-900 py-3">
              {formData.gender === 'M' ? 'Masculin' : formData.gender === 'F' ? 'Féminin' : 'Autre'}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderContactInfo = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          {isEditing ? (
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-gray-900 py-3">{formData.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Téléphone
          </label>
          {isEditing ? (
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0123456789"
            />
          ) : (
            <p className="text-gray-900 py-3">{formData.phone || 'Non renseigné'}</p>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Adresse</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rue et numéro
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.address.street}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  address: { ...formData.address, street: e.target.value }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123 Rue de la République"
              />
            ) : (
              <p className="text-gray-900 py-3">{formData.address.street || 'Non renseigné'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Code postal
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.address.postalCode}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  address: { ...formData.address, postalCode: e.target.value }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="75001"
              />
            ) : (
              <p className="text-gray-900 py-3">{formData.address.postalCode || 'Non renseigné'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ville
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.address.city}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  address: { ...formData.address, city: e.target.value }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Paris"
              />
            ) : (
              <p className="text-gray-900 py-3">{formData.address.city || 'Non renseigné'}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Numéro de carte d'identité
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.nationalId}
              onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123456789"
            />
          ) : (
            <p className="text-gray-900 py-3">{formData.nationalId || 'Non renseigné'}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Numéro de passeport
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.passportNumber}
              onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="12AB34567"
            />
          ) : (
            <p className="text-gray-900 py-3">{formData.passportNumber || 'Non renseigné'}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Numéro de sécurité sociale
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.socialSecurityNumber}
              onChange={(e) => setFormData({ ...formData, socialSecurityNumber: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1234567890123"
            />
          ) : (
            <p className="text-gray-900 py-3">{formData.socialSecurityNumber || 'Non renseigné'}</p>
          )}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Camera className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-900">
            Données Biométriques
          </h3>
        </div>
        <p className="text-blue-800 mb-4">
          Enregistrez vos données biométriques pour l'identification d'urgence
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Configurer la reconnaissance faciale
        </button>
      </div>
    </div>
  );

  const renderMedicalInfo = () => (
    <div className="space-y-6">
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <AlertTriangle className="h-6 w-6 text-red-600" />
          <h3 className="text-lg font-semibold text-red-900">
            Informations Médicales d'Urgence
          </h3>
        </div>
        <p className="text-red-800 text-sm">
          Ces informations sont cruciales en cas d'urgence médicale
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Groupe sanguin
        </label>
        {isEditing ? (
          <select
            value={formData.bloodType}
            onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sélectionner</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        ) : (
          <p className="text-gray-900 py-3">{formData.bloodType || 'Non renseigné'}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Allergies
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {formData.allergies.map((allergy, index) => (
            <span
              key={index}
              className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
            >
              <span>{allergy}</span>
              {isEditing && (
                <button
                  onClick={() => removeAllergy(allergy)}
                  className="text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>
        {isEditing && (
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Ajouter une allergie"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addAllergy((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = '';
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderEmergencyContacts = () => (
    <div className="space-y-6">
      {formData.emergencyContacts.map((contact, index) => (
        <div key={contact.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Contact {index + 1} {contact.isPrimary && '(Principal)'}
            </h3>
            {isEditing && (
              <button
                onClick={() => removeEmergencyContact(index)}
                className="text-red-600 hover:text-red-800"
              >
                Supprimer
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={contact.name}
                  onChange={(e) => updateEmergencyContact(index, 'name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Marie Dupont"
                />
              ) : (
                <p className="text-gray-900 py-3">{contact.name || 'Non renseigné'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relation
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={contact.relationship}
                  onChange={(e) => updateEmergencyContact(index, 'relationship', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Épouse, Frère, Ami..."
                />
              ) : (
                <p className="text-gray-900 py-3">{contact.relationship || 'Non renseigné'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={contact.phone}
                  onChange={(e) => updateEmergencyContact(index, 'phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0123456789"
                />
              ) : (
                <p className="text-gray-900 py-3">{contact.phone || 'Non renseigné'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => updateEmergencyContact(index, 'email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="marie@email.com"
                />
              ) : (
                <p className="text-gray-900 py-3">{contact.email || 'Non renseigné'}</p>
              )}
            </div>
          </div>
        </div>
      ))}

      {isEditing && (
        <button
          onClick={addEmergencyContact}
          className="w-full border-2 border-dashed border-gray-300 rounded-xl p-6 text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors"
        >
          + Ajouter un contact d'urgence
        </button>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return renderPersonalInfo();
      case 'contact':
        return renderContactInfo();
      case 'documents':
        return renderDocuments();
      case 'medical':
        return renderMedicalInfo();
      case 'emergency':
        return renderEmergencyContacts();
      default:
        return renderPersonalInfo();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold text-gray-900">Mon Profil Citoyen</h1>
            <p className="text-gray-600 mt-2">
              Gérez vos informations personnelles et vos données d'urgence
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {profile?.profileCompleteness || 0}%
              </div>
              <div className="text-sm text-gray-600">Complété</div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              disabled={isLoading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4" />
                  <span>Enregistrer</span>
                </>
              ) : (
                <>
                  <Edit3 className="h-4 w-4" />
                  <span>Modifier</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200"
      >
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </motion.div>
    </div>
  );
};