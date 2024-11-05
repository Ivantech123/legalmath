import { 
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  addDoc,
  deleteDoc,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Lawyer, Case, Consultation, Message, Document, Review } from '../../types';

// Lawyers
export const getLawyers = async (): Promise<Lawyer[]> => {
  const lawyersRef = collection(db, 'lawyers');
  const snapshot = await getDocs(lawyersRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lawyer));
};

export const getLawyerById = async (id: string): Promise<Lawyer | null> => {
  const docRef = doc(db, 'lawyers', id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Lawyer : null;
};

export const updateLawyer = async (id: string, data: Partial<Lawyer>): Promise<void> => {
  const docRef = doc(db, 'lawyers', id);
  await updateDoc(docRef, { ...data, updatedAt: new Date().toISOString() });
};

// Cases
export const getCases = async (userId: string): Promise<Case[]> => {
  const casesRef = collection(db, 'cases');
  const q = query(casesRef, where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Case));
};

// Consultations
export const getConsultations = async (userId: string): Promise<Consultation[]> => {
  const consultationsRef = collection(db, 'consultations');
  const q = query(consultationsRef, 
    where('participantIds', 'array-contains', userId),
    orderBy('scheduledAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Consultation));
};

// Messages
export const getMessages = async (consultationId: string): Promise<Message[]> => {
  const messagesRef = collection(db, 'messages');
  const q = query(messagesRef, 
    where('consultationId', '==', consultationId),
    orderBy('timestamp', 'asc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
};

// Documents
export const getDocuments = async (userId: string): Promise<Document[]> => {
  const documentsRef = collection(db, 'documents');
  const q = query(documentsRef, where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Document));
};

// Reviews
export const getReviews = async (lawyerId: string): Promise<Review[]> => {
  const reviewsRef = collection(db, 'reviews');
  const q = query(reviewsRef, 
    where('lawyerId', '==', lawyerId),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review));
};