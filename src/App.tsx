import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppLayout } from './components/Layout/AppLayout';
import { HomePage } from './pages/HomePage';
import { CitizenDashboard } from './pages/Citizen/Dashboard';
import { CitizenProfile } from './pages/Citizen/Profile';
import { CitizenAppointments } from './pages/Citizen/Appointments';
import { CitizenRequests } from './pages/Citizen/Requests';
import { EmergencyIdentification } from './pages/Emergency/EmergencyIdentification';
import { InstitutionDashboard } from './pages/Institution/Dashboard';
import { InstitutionCitizens } from './pages/Institution/Citizens';
import { InstitutionRequests } from './pages/Institution/Requests';
import { AdminDashboard } from './pages/Admin/Dashboard';
import { LoginPage } from './pages/Auth/LoginPage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { useAuthStore } from './stores/authStore';

function App() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<AppLayout><HomePage /></AppLayout>} />
          <Route path="/login" element={<AppLayout><LoginPage /></AppLayout>} />
          <Route path="/register" element={<AppLayout><RegisterPage /></AppLayout>} />
          <Route path="/emergency" element={<AppLayout><EmergencyIdentification /></AppLayout>} />

          {/* Routes citoyens */}
          <Route path="/citizen/*" element={
            <ProtectedRoute allowedRoles={['citizen']}>
              <AppLayout showSidebar>
                <Routes>
                  <Route path="dashboard" element={<CitizenDashboard />} />
                  <Route path="profile" element={<CitizenProfile />} />
                  <Route path="appointments" element={<CitizenAppointments />} />
                  <Route path="requests" element={<CitizenRequests />} />
                  <Route path="" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </AppLayout>
            </ProtectedRoute>
          } />

          {/* Routes institutions */}
          <Route path="/institution/*" element={
            <ProtectedRoute allowedRoles={['institution']}>
              <AppLayout showSidebar>
                <Routes>
                  <Route path="dashboard" element={<InstitutionDashboard />} />
                  <Route path="citizens" element={<InstitutionCitizens />} />
                  <Route path="requests" element={<InstitutionRequests />} />
                  <Route path="" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </AppLayout>
            </ProtectedRoute>
          } />

          {/* Routes admin */}
          <Route path="/admin/*" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AppLayout showSidebar>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </AppLayout>
            </ProtectedRoute>
          } />

          {/* Redirection par défaut */}
          <Route path="*" element={
            isAuthenticated && user ? (
              <Navigate to={`/${user.role}`} replace />
            ) : (
              <Navigate to="/" replace />
            )
          } />
        </Routes>

        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#374151',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }
          }}
        />
      </div>
    </Router>
  );
}

export default App;