import { Lawyer, Case, Consultation, Message, Document, Review } from '../../types';

// In-memory storage
const lawyers: Map<string, Lawyer> = new Map();
const cases: Map<string, Case> = new Map();
const consultations: Map<string, Consultation> = new Map();
const messages: Map<string, Message> = new Map();
const documents: Map<string, Document> = new Map();
const reviews: Map<string, Review> = new Map();

// Lawyers
export const getLawyers = async (): Promise<Lawyer[]> => {
  return Array.from(lawyers.values());
};

export const getLawyerById = async (id: string): Promise<Lawyer | null> => {
  return lawyers.get(id) || null;
};

export const updateLawyer = async (id: string, data: Partial<Lawyer>): Promise<void> => {
  const lawyer = lawyers.get(id);
  if (lawyer) {
    lawyers.set(id, { ...lawyer, ...data, updatedAt: new Date().toISOString() });
  }
};

// Cases
export const getCases = async (userId: string): Promise<Case[]> => {
  return Array.from(cases.values()).filter(c => c.clientId === userId || c.lawyerId === userId);
};

// Consultations
export const getConsultations = async (userId: string): Promise<Consultation[]> => {
  return Array.from(consultations.values())
    .filter(c => c.participantIds.includes(userId))
    .sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime());
};

// Messages
export const getMessages = async (consultationId: string): Promise<Message[]> => {
  return Array.from(messages.values())
    .filter(m => m.consultationId === consultationId)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
};

// Documents
export const getDocuments = async (userId: string): Promise<Document[]> => {
  return Array.from(documents.values()).filter(d => d.userId === userId);
};

// Reviews
export const getReviews = async (lawyerId: string): Promise<Review[]> => {
  return Array.from(reviews.values())
    .filter(r => r.lawyerId === lawyerId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};