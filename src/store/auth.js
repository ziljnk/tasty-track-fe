// store/auth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
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
    console.log('Successfully logged in!', user.user.uid);
    localStorage.setItem('userId', user.user.uid);
    return user;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log('Successfully logged out!');
    return true;
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};
