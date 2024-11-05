import React, { createContext, useContext, useState } from 'react';
import { User, Briefcase, Code } from 'lucide-react';
import { UserRole } from '../types';

interface RoleContextType {
  showRoleSwitcher: boolean;
  setShowRoleSwitcher: (show: boolean) => void;
  roles: {
    id: UserRole;
    name: string;
    description: string;
    icon: typeof User;
    color: string;
  }[];
}

const RoleContext = createContext<RoleContextType>({
  showRoleSwitcher: false,
  setShowRoleSwitcher: () => {},
  roles: []
});

export const useRole = () => useContext(RoleContext);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  const roles = [
    {
      id: 'client' as UserRole,
      name: 'Клиент',
      description: 'Поиск юристов и консультации',
      icon: User,
      color: 'blue'
    },
    {
      id: 'lawyer' as UserRole,
      name: 'Юрист',
      description: 'Оказание юридических услуг',
      icon: Briefcase,
      color: 'purple'
    },
    {
      id: 'developer' as UserRole,
      name: 'Разработчик',
      description: 'Доступ к API платформы',
      icon: Code,
      color: 'green'
    }
  ];

  return (
    <RoleContext.Provider value={{ showRoleSwitcher, setShowRoleSwitcher, roles }}>
      {children}
    </RoleContext.Provider>
  );
};