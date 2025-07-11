import React, { useState } from 'react';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { CitizenDashboard } from './components/CitizenDashboard';
import { InstitutionDashboard } from './components/InstitutionDashboard';
import { HomePage } from './components/HomePage';
import { EmergencyIdentification } from './components/EmergencyIdentification';
import { AppointmentSystem } from './components/AppointmentSystem';
import { AdminProcedures } from './components/AdminProcedures';
import { useAuth } from './contexts/AuthContext';
import { AuthProvider } from './contexts/AuthContext';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<'home' | 'citizen' | 'institution' | 'emergency' | 'appointments' | 'procedures'>('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, logout } = useAuth();

  const handleNavigation = (page: typeof currentPage) => {
    if (page === 'home') {
      setCurrentPage('home');
    } else if (user) {
      setCurrentPage(page);
    } else {
      setShowAuthModal(true);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'citizen':
        return <CitizenDashboard />;
      case 'institution':
        return <InstitutionDashboard />;
      case 'emergency':
        return <EmergencyIdentification />;
      case 'appointments':
        return <AppointmentSystem />;
      case 'procedures':
        return <AdminProcedures />;
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header 
        onNavigate={handleNavigation}
        currentPage={currentPage}
        user={user}
        onLogout={logout}
      />
      
      <main className="container mx-auto px-4 py-8">
        {renderCurrentPage()}
      </main>

      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => {
            setShowAuthModal(false);
            setCurrentPage('citizen');
          }}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;