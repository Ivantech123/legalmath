import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { User, UserRole } from '../../types';

export const registerUser = async (
  email: string,
  password: string,
  name: string,
  role: UserRole,
  additionalData?: any
): Promise<User> => {
  try {
    const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
    
    await updateProfile(firebaseUser, { displayName: name });
    
    const userData: User = {
      id: firebaseUser.uid,
      email,
      name,
      role,
      verified: role === 'developer',
      createdAt: new Date().toISOString(),
      ...additionalData
    };

    // Save user data to Firestore
    await setDoc(doc(db, 'users', firebaseUser.uid), userData);

    return userData;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
    
    // Get additional user data from Firestore
    const userDoc = await doc(db, 'users', firebaseUser.uid).get();
    const userData = userDoc.data() as User;

    return {
      ...userData,
      id: firebaseUser.uid,
      email: firebaseUser.email!,
      name: firebaseUser.displayName!
    };
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      unsubscribe();
      
      if (firebaseUser) {
        try {
          const userDoc = await doc(db, 'users', firebaseUser.uid).get();
          const userData = userDoc.data() as User;
          
          resolve({
            ...userData,
            id: firebaseUser.uid,
            email: firebaseUser.email!,
            name: firebaseUser.displayName!
          });
        } catch (error) {
          reject(error);
        }
      } else {
        resolve(null);
      }
    }, reject);
  });
};