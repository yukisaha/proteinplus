import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBrPuVXR1cYRTgjtuf9fiXdVY-Z7NLorqY",
  authDomain: "proteinplus-1f358.firebaseapp.com",
  projectId: "proteinplus-1f358",
  storageBucket: "proteinplus-1f358.appspot.com",
  messagingSenderId: "861353459685",
  appId: "1:861353459685:web:cab1efc955478e939ff90c",
  measurementId: "G-BTW0VZEW1E"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);