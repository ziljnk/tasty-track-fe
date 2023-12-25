// store/auth.js
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import firebaseConfig from "@/store/firebaseConfig";
import {
    getFirestore,
    doc,
    setDoc,
    collection,
    getDoc,
} from "firebase/firestore";

const app = firebaseConfig.app;
const auth = getAuth(app);
const db = getFirestore(app);

export const registerWithEmailAndPassword = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (!userDocSnapshot.exists()) {
            await setDoc(userDocRef, {
                email: user.email,
                name: "",
                age: 0,
                gender: "",
                height: 0,
                weight: 0,
                activityLevel: "",
                bmi: 0,
                calories: 0,
                image: "https://firebasestorage.googleapis.com/v0/b/tastytrack-34638.appspot.com/o/images%2Fdefault.jpg?alt=media&token=73fdb17f-51bd-4efd-b313-26ae123b7ddd",
                health:'undefined',
            });
        }

        console.log("Successfully registered!", user);
        return user;
    } catch (error) {
        console.error("Error during registration:", error);
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
        console.log("Successfully logged out!");
        return true;
    } catch (error) {
        console.error("Error during logout:", error);
        throw error;
    }
};

export const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        localStorage.setItem('userId', result.user.uid);
        const user = result.user;
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (!userDocSnapshot.exists()) {
            await setDoc(userDocRef, {
                email: user.email,
                name: "",
                age: 0,
                gender: "",
                height: 0,
                weight: 0,
                activityLevel: "",
                bmi: 0,
                calories: 0,
                image: "https://firebasestorage.googleapis.com/v0/b/tastytrack-34638.appspot.com/o/images%2Fdefault.jpg?alt=media&token=73fdb17f-51bd-4efd-b313-26ae123b7ddd",
                health:'undefined',
            });
        }

        console.log("Successfully logged in with Google!", result);
    } catch (error) {
        console.error("Error during Google login:", error);
    }
};

export const fetchUserData = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        console.log("User data retrieved successfully!", userData);
        return userData;
      } else {
        console.error('User data does not exist!');
        return null;
      }
    } catch (error) {
      console.error("Error getting user document:", error);
      throw error;
    }
  };