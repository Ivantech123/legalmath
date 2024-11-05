import React from 'react';
import { useAuth } from '../context/AuthContext';
import LawyerFeed from './feeds/LawyerFeed';
import ClientFeed from './feeds/ClientFeed';
import DeveloperFeed from './feeds/DeveloperFeed';

const Feed: React.FC = () => {
  const { user } = useAuth();

  switch (user?.role) {
    case 'lawyer':
      return <LawyerFeed />;
    case 'developer':
      return <DeveloperFeed />;
    default:
      return <ClientFeed />;
  }
};

export default Feed;