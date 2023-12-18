import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
const analytics = getAnalytics(app);

export default {
  app,
  analytics
};