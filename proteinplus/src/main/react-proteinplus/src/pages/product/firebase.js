import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
export const storage = getStorage(app);

export const uploadImage = async (file) => {
    try{
        const storageRef = ref(storage, `product_images/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);
        return imageUrl;
    } catch (error){
        console.error('이미지 업로드 실패:', error);
        throw error;
    }
};