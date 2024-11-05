import { User, UserRole } from '../types';

// В реальном приложении здесь будет API запрос
export const getUserData = async (userId: string): Promise<User | null> => {
  // Здесь должен быть API запрос к бэкенду
  const user = localStorage.getItem('user');
  if (!user) return null;
  
  return JSON.parse(user);
};

export const updateUserData = async (userId: string, data: Partial<User>): Promise<User> => {
  // Здесь должен быть API запрос к бэкенду
  const user = await getUserData(userId);
  if (!user) throw new Error('User not found');

  const updatedUser = {
    ...user,
    ...data,
    updatedAt: new Date().toISOString()
  };

  localStorage.setItem('user', JSON.stringify(updatedUser));
  return updatedUser;
};

export const getUserStatistics = async (userId: string) => {
  // Здесь должен быть API запрос к бэкенду
  const user = await getUserData(userId);
  if (!user) throw new Error('User not found');

  if (user.role === 'lawyer') {
    return {
      activeClients: user.statistics?.activeClients || 0,
      monthlyIncome: user.statistics?.monthlyIncome || 0,
      successRate: user.statistics?.successRate || 0,
      consultationsToday: user.statistics?.consultationsToday || 0,
      totalCases: user.statistics?.totalCases || 0,
      averageRating: user.statistics?.averageRating || 0,
      responseRate: user.statistics?.responseRate || 0,
      newLeads: user.statistics?.newLeads || 0
    };
  }

  if (user.role === 'developer') {
    return {
      apiCalls: user.statistics?.apiCalls || 0,
      activeTokens: user.statistics?.activeTokens || 0,
      errorRate: user.statistics?.errorRate || 0,
      averageResponseTime: user.statistics?.averageResponseTime || 0
    };
  }

  return {
    consultations: user.statistics?.consultations || 0,
    documents: user.statistics?.documents || 0,
    lawyers: user.statistics?.lawyers || 0,
    cases: user.statistics?.cases || 0
  };
};

export const getUserSettings = async (userId: string) => {
  // Здесь должен быть API запрос к бэкенду
  const user = await getUserData(userId);
  if (!user) throw new Error('User not found');

  return {
    notifications: user.settings?.notifications || {
      email: true,
      sms: false,
      push: true,
      marketing: false
    },
    privacy: user.settings?.privacy || {
      profileVisibility: 'public',
      showRating: true,
      showCases: true
    },
    theme: user.settings?.theme || 'dark',
    language: user.settings?.language || 'ru'
  };
};

export const updateUserSettings = async (userId: string, settings: any) => {
  // Здесь должен быть API запрос к бэкенду
  const user = await getUserData(userId);
  if (!user) throw new Error('User not found');

  const updatedUser = {
    ...user,
    settings: {
      ...user.settings,
      ...settings
    },
    updatedAt: new Date().toISOString()
  };

  localStorage.setItem('user', JSON.stringify(updatedUser));
  return updatedUser;
};

export const getUserDocuments = async (userId: string) => {
  // Здесь должен быть API запрос к бэкенду
  const user = await getUserData(userId);
  if (!user) throw new Error('User not found');

  return user.documents || [];
};

export const getUserSchedule = async (userId: string) => {
  // Здесь должен быть API запрос к бэкенду
  const user = await getUserData(userId);
  if (!user) throw new Error('User not found');

  return user.schedule || {
    workDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    workHours: { start: '09:00', end: '18:00' },
    consultationDuration: 60,
    breakTime: { start: '13:00', end: '14:00' }
  };
};

export const getUserServices = async (userId: string) => {
  // Здесь должен быть API запрос к бэкенду
  const user = await getUserData(userId);
  if (!user) throw new Error('User not found');

  return user.services || [];
};

export const getUserCases = async (userId: string) => {
  // Здесь должен быть API запрос к бэкенду
  const user = await getUserData(userId);
  if (!user) throw new Error('User not found');

  return user.cases || [];
};

export const getUserConsultations = async (userId: string) => {
  // Здесь должен быть API запрос к бэкенду
  const user = await getUserData(userId);
  if (!user) throw new Error('User not found');

  return user.consultations || [];
};

export const getUserMessages = async (userId: string) => {
  // Здесь должен быть API запрос к бэкенду
  const user = await getUserData(userId);
  if (!user) throw new Error('User not found');

  return user.messages || [];
};

export const getUserNotifications = async (userId: string) => {
  // Здесь должен быть API запрос к бэкенду
  const user = await getUserData(userId);
  if (!user) throw new Error('User not found');

  return user.notifications || [];
};

export const getUserApiKeys = async (userId: string) => {
  // Здесь должен быть API запрос к бэкенду
  const user = await getUserData(userId);
  if (!user || user.role !== 'developer') throw new Error('Access denied');

  return user.apiKeys || [];
};

export const getUserEndpoints = async (userId: string) => {
  // Здесь должен быть API запрос к бэкенду
  const user = await getUserData(userId);
  if (!user || user.role !== 'developer') throw new Error('Access denied');

  return user.endpoints || [];
};

export const getUserWebhooks = async (userId: string) => {
  // Здесь должен быть API запрос к бэкенду
  const user = await getUserData(userId);
  if (!user || user.role !== 'developer') throw new Error('Access denied');

  return user.webhooks || [];
};