import React from 'react';
import { useAuthStore } from '../../stores/authStore';
import { EmergencyIdentification } from '../../components/EmergencyIdentification';
import { ProtectedRoute } from '../../components/Auth/ProtectedRoute';

export const EmergencyIdentificationPage = () => {
  const { user } = useAuthStore();

  return (
    <ProtectedRoute allowedRoles={['citizen', 'institution', 'admin']}>
      <EmergencyIdentification userId={user?.id} />
    </ProtectedRoute>
  );
};
