import React from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useAuthStore } from '../../stores/authStore';

interface AppLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  showSidebar = false 
}) => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Header />
      
      <div className="flex">
        {showSidebar && user && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-64 bg-white shadow-lg border-r border-gray-200 min-h-screen"
          >
            <Sidebar />
          </motion.div>
        )}
        
        <main className={`flex-1 ${showSidebar ? 'ml-0' : ''}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="container mx-auto px-4 py-8"
          >
            {children}
          </motion.div>
        </main>
      </div>
      
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
  );
};