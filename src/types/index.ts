export type UserRole = 'client' | 'lawyer' | 'developer';

export interface BaseUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  verified: boolean;
  createdAt: string;
  updatedAt?: string;
  profileCompleted?: boolean;
  image?: string;
}

export interface Client extends BaseUser {
  role: 'client';
  interests: string[];
  company?: string;
  position?: string;
  consultations: Consultation[];
  documents: Document[];
  cases: Case[];
  notifications: Notification[];
}

export interface Lawyer extends BaseUser {
  role: 'lawyer';
  specialization: string;
  experience: number;
  rating: number;
  reviewCount: number;
  location: string;
  bio: string;
  hourlyRate: number;
  consultationPrice: number;
  phone: string;
  tags: string[];
  education: Education[];
  services: Service[];
  geography: Geography;
  courtCases: CourtCase[];
  schedule: Schedule;
  languages: string[];
  verificationStatus: 'pending' | 'verified' | 'rejected';
  responseRate: number;
  socialMedia: SocialMedia[];
  statistics: LawyerStatistics;
}

export interface Developer extends BaseUser {
  role: 'developer';
  company: string;
  apiKeys: ApiKey[];
  endpoints: Endpoint[];
  webhooks: Webhook[];
  statistics: DeveloperStatistics;
}

export interface LawyerStatistics {
  activeClients: number;
  monthlyIncome: number;
  successRate: number;
  consultationsToday: number;
  totalCases: number;
  averageRating: number;
  responseRate: number;
  newLeads: number;
}

export interface DeveloperStatistics {
  apiCalls: number;
  activeTokens: number;
  errorRate: number;
  averageResponseTime: number;
}

export interface Education {
  institution: string;
  degree: string;
  year: string;
  specialization?: string;
}

export interface Service {
  name: string;
  price: number;
  description?: string;
}

export interface Geography {
  city: string;
  region: string;
  courts: string[];
  remoteWork: boolean;
}

export interface CourtCase {
  title: string;
  description: string;
  court: string;
  date: string;
  result: string;
  category: string;
}

export interface Schedule {
  workDays: string[];
  workHours: {
    start: string;
    end: string;
  };
  consultationDuration: number;
  breakTime: {
    start: string;
    end: string;
  };
}

export interface SocialMedia {
  type: 'telegram' | 'whatsapp' | 'vk' | 'instagram';
  username: string;
  url: string;
}

export interface Consultation {
  id: string;
  lawyerId: string;
  clientId: string;
  scheduledAt: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'online' | 'offline';
  price: number;
  notes?: string;
}

export interface Case {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'cancelled';
  category: string;
  court?: string;
  nextHearing?: string;
  documents: Document[];
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  type: 'text' | 'file';
  timestamp: string;
  read: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  type: 'test' | 'production';
  createdAt: string;
  lastUsed?: string;
}

export interface Endpoint {
  id: string;
  name: string;
  enabled: boolean;
  quota: number;
  usage: number;
}

export interface Webhook {
  id: string;
  url: string;
  events: string[];
  active: boolean;
  createdAt: string;
  lastTriggered?: string;
}