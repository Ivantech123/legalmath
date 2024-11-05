import React from 'react';
import { Star } from 'lucide-react';
import { Lawyer } from '../../types';

const mockLawyers: Lawyer[] = [
  {
    id: '1',
    name: 'Анна Сергеева',
    specialization: 'Семейное право',
    experience: 8,
    rating: 4.9,
    cases: 150,
    consultationPrice: 3000,
    image: 'https://i.pravatar.cc/150?img=10',
    reviewCount: 45,
    bio: 'Специализируюсь на семейных спорах и разводах'
  },
  {
    id: '2',
    name: 'Дмитрий Волков',
    specialization: 'Корпоративное право',
    experience: 12,
    rating: 4.8,
    cases: 200,
    consultationPrice: 5000,
    image: 'https://i.pravatar.cc/150?img=11',
    reviewCount: 67,
    bio: 'Эксперт в области корпоративного права'
  }
];

const LawyerCard: React.FC<{ lawyer: Lawyer }> = ({ lawyer }) => (
  <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200 space-y-4">
    <div className="flex items-center gap-3">
      <img 
        src={lawyer.image} 
        alt={lawyer.name}
        className="w-12 h-12 rounded-lg object-cover"
      />
      <div>
        <h4 className="text-white font-medium">{lawyer.name}</h4>
        <p className="text-gray-400 text-sm">{lawyer.specialization}</p>
      </div>
    </div>
    
    <div className="grid grid-cols-3 gap-2 text-center">
      <div className="bg-gray-900/50 rounded-lg p-2">
        <div className="text-blue-400 font-medium">{lawyer.experience}</div>
        <div className="text-xs text-gray-500">лет опыта</div>
      </div>
      <div className="bg-gray-900/50 rounded-lg p-2">
        <div className="text-yellow-400 font-medium flex items-center justify-center gap-1">
          <Star className="w-4 h-4" />
          {lawyer.rating}
        </div>
        <div className="text-xs text-gray-500">рейтинг</div>
      </div>
      <div className="bg-gray-900/50 rounded-lg p-2">
        <div className="text-green-400 font-medium">{lawyer.cases}+</div>
        <div className="text-xs text-gray-500">дел</div>
      </div>
    </div>

    <div className="flex justify-between items-center pt-3 border-t border-gray-700/50">
      <div>
        <div className="text-sm text-gray-400">Консультация</div>
        <div className="text-lg font-medium text-white">{lawyer.consultationPrice}₽</div>
      </div>
      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
        Подробнее
      </button>
    </div>
  </div>
);

const LawyerRecommendations: React.FC = () => {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-blue-400">Рекомендуемые юристы:</h4>
      <div className="grid gap-4">
        {mockLawyers.map(lawyer => (
          <LawyerCard key={lawyer.id} lawyer={lawyer} />
        ))}
      </div>
    </div>
  );
};

export default LawyerRecommendations;