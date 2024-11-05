import React, { useState } from 'react';
import { User, Briefcase, Bot, Shield, ChevronRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ClientProfileForm from './ClientProfileForm';
import LawyerProfileForm from './LawyerProfileForm';
import DeveloperProfileForm from './DeveloperProfileForm';

const ProfileCompletion: React.FC = () => {
  const { user, updateUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProfileComplete = async (formData: any) => {
    setLoading(true);
    setError(null);

    try {
      await updateUserData({
        ...formData,
        profileCompleted: true
      });
      
      // Перезагрузка страницы для применения изменений
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка сохранения профиля');
      setLoading(false);
    }
  };

  const renderProfileForm = () => {
    switch (user?.role) {
      case 'lawyer':
        return <LawyerProfileForm onComplete={handleProfileComplete} />;
      case 'developer':
        return <DeveloperProfileForm onComplete={handleProfileComplete} />;
      default:
        return <ClientProfileForm onComplete={handleProfileComplete} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse"></div>
            <User className="w-24 h-24 text-blue-500 relative z-10" />
            <div className="absolute -top-2 -right-2">
              <Bot className="w-8 h-8 text-purple-400 animate-bounce" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">
            Заполните профиль
          </h1>
          <p className="text-xl text-gray-400">
            AI поможет создать привлекательный профиль
          </p>
        </div>

        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-lg animate-shake">
              {error}
            </div>
          )}
          
          {renderProfileForm()}
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletion;