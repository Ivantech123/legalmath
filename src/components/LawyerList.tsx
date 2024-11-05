import React from 'react';
import { Lawyer } from '../types';
import LawyerCard from './LawyerCard';

interface LawyerListProps {
  lawyers: Lawyer[];
  onViewProfile: (lawyer: Lawyer) => void;
}

const LawyerList: React.FC<LawyerListProps> = ({ lawyers, onViewProfile }) => {
  if (lawyers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Юристы не найдены</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {lawyers.map((lawyer, index) => (
        <LawyerCard
          key={lawyer.id}
          lawyer={lawyer}
          onViewProfile={() => onViewProfile(lawyer)}
          index={index}
        />
      ))}
    </div>
  );
};

export default LawyerList;