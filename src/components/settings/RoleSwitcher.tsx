import React, { useState } from 'react';
import { User, Briefcase, Code, AlertCircle, Bot, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import LawyerVerificationForm from '../registration/LawyerVerificationForm';
import DeveloperVerificationForm from '../registration/DeveloperVerificationForm';

const RoleSwitcher: React.FC = () => {
  const { user, updateRole } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showVerificationForm, setShowVerificationForm] = useState(false);

  const roles = [
    { 
      id: 'client', 
      name: 'Клиент', 
      icon: User, 
      description: 'Поиск юристов и консультации',
      requiresVerification: false
    },
    { 
      id: 'lawyer', 
      name: 'Юрист', 
      icon: Briefcase, 
      description: 'Оказание юридических услуг',
      requiresVerification: true
    },
    { 
      id: 'developer', 
      name: 'Разработчик', 
      icon: Code, 
      description: 'Доступ к API платформы',
      requiresVerification: true
    }
  ] as const;

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (roles.find(r => r.id === role)?.requiresVerification) {
      setShowVerificationForm(true);
    } else {
      handleRoleChange(role);
    }
  };

  const handleVerificationComplete = async (verificationData: any) => {
    if (!selectedRole) return;
    
    try {
      await updateRole(selectedRole, verificationData);
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка смены роли');
    }
  };

  const handleRoleChange = async (role: UserRole) => {
    setLoading(true);
    setError(null);

    try {
      await updateRole(role);
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка смены роли');
    } finally {
      setLoading(false);
    }
  };

  if (showVerificationForm) {
    return selectedRole === 'lawyer' ? (
      <LawyerVerificationForm onComplete={handleVerificationComplete} />
    ) : (
      <DeveloperVerificationForm onComplete={handleVerificationComplete} />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
        <div className="p-3 bg-blue-500/20 rounded-full">
          <Shield className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-blue-400">Смена роли</h3>
          <p className="text-sm text-gray-400">
            Текущая роль: {user?.role === 'lawyer' ? 'Юрист' : user?.role === 'developer' ? 'Разработчик' : 'Клиент'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map(({ id, name, icon: Icon, description, requiresVerification }) => (
          <button
            key={id}
            onClick={() => handleRoleSelect(id as UserRole)}
            disabled={id === user?.role || loading}
            className={`
              relative p-6 rounded-xl border transition-all duration-300
              ${id === user?.role
                ? 'bg-gray-800 border-gray-700 cursor-not-allowed opacity-50'
                : 'bg-gray-800 border-gray-700 hover:border-blue-500 hover:shadow-lg hover:-translate-y-1'
              }
            `}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="p-4 bg-gray-700 rounded-xl">
                <Icon className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">{name}</h3>
                <p className="text-gray-400 mb-4">{description}</p>
              </div>
              {requiresVerification && (
                <div className="flex items-center gap-2 text-sm text-yellow-400">
                  <Shield className="w-4 h-4" />
                  <span>Требуется верификация</span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-500/10 text-red-400 rounded-lg animate-shake">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default RoleSwitcher;