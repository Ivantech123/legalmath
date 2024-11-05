import React from 'react';
import { User, Briefcase, Code, Shield, Bot } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

const RoleSwitcher: React.FC = () => {
  const { user, updateRole } = useAuth();

  const roles = [
    {
      id: 'client',
      name: 'Клиент',
      description: 'Поиск юристов и консультации',
      icon: User,
      color: 'blue'
    },
    {
      id: 'lawyer',
      name: 'Юрист',
      description: 'Оказание юридических услуг',
      icon: Briefcase,
      color: 'purple'
    },
    {
      id: 'developer',
      name: 'Разработчик',
      description: 'Доступ к API платформы',
      icon: Code,
      color: 'green'
    }
  ] as const;

  const handleRoleChange = async (role: UserRole) => {
    try {
      await updateRole(role);
      window.location.reload();
    } catch (error) {
      console.error('Error changing role:', error);
    }
  };

  return (
    <div className="absolute top-16 right-4 w-80 bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-4 animate-fade-in z-50">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Shield className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-white">Сменить роль</h3>
          <p className="text-xs text-gray-400">Текущая роль: {user?.role}</p>
        </div>
      </div>

      <div className="space-y-2">
        {roles.map(role => {
          const Icon = role.icon;
          const isCurrentRole = user?.role === role.id;

          return (
            <button
              key={role.id}
              onClick={() => !isCurrentRole && handleRoleChange(role.id as UserRole)}
              disabled={isCurrentRole}
              className={`
                w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                ${isCurrentRole
                  ? 'bg-gray-700 cursor-not-allowed'
                  : 'hover:bg-gray-700'
                }
              `}
            >
              <div className={`
                p-2 rounded-lg
                ${isCurrentRole
                  ? `bg-${role.color}-500/20`
                  : 'bg-gray-700'
                }
              `}>
                <Icon className={`
                  w-4 h-4
                  ${isCurrentRole
                    ? `text-${role.color}-400`
                    : 'text-gray-400'
                  }
                `} />
              </div>
              <div className="text-left">
                <div className={`
                  font-medium
                  ${isCurrentRole ? 'text-white' : 'text-gray-300'}
                `}>
                  {role.name}
                </div>
                <div className="text-xs text-gray-400">
                  {role.description}
                </div>
              </div>
              {isCurrentRole && (
                <div className="ml-auto">
                  <div className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                    Активно
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Bot className="w-4 h-4" />
          <span>AI поможет освоиться в новой роли</span>
        </div>
      </div>
    </div>
  );
};

export default RoleSwitcher;