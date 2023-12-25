import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCRgiuKS4YAKubO85Ca7dh7i-a1hP0MMeQ",
  authDomain: "tastytrack-34638.firebaseapp.com",
  projectId: "tastytrack-34638",
  storageBucket: "tastytrack-34638.appspot.com",
  messagingSenderId: "320879453783",
  appId: "1:320879453783:web:2da52e088e538d081f6512",
  measurementId: "G-YBDFV566T3"
};

const app = initializeApp(firebaseConfig);
const FIRESTORE_DB = getFirestore(app);
const STORAGE = getStorage(app);
const analytics = getAnalytics(app);

export default {
  app,
  analytics,
};

export {
    app,
    analytics,
    FIRESTORE_DB,
    STORAGE
}