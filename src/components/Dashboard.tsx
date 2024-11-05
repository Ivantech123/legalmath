import React from 'react';
import { useAuth } from '../context/AuthContext';
import ClientDashboard from './dashboard/ClientDashboard';
import LawyerDashboard from './dashboard/LawyerDashboard';
import DeveloperDashboard from './dashboard/DeveloperDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'lawyer':
      return <LawyerDashboard />;
    case 'developer':
      return <DeveloperDashboard />;
    default:
      return <ClientDashboard />;
  }
};

export default Dashboard;