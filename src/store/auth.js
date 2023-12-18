// store/auth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseConfig from '@/store/firebaseConfig';

const app = firebaseConfig.app;
const auth = getAuth(app);

export const registerWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Successfully registered!', user);
    return user;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Successfully logged in!', user);
    return user;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};
