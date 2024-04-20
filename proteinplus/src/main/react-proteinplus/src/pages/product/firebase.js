import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

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

export const deleteImage = async (imageUrl) => {
    try {
        // 이미지 URL에서 파일명 추출
        const fileName = imageUrl.split('%2F').pop().split('?')[0];

        // 파일이름으로 참조 생성
        const imageRef = ref(storage, `product_images/${fileName}`);

        // 파일 삭제
        await deleteObject(imageRef);

        console.log('이미지 삭제 완료:', imageUrl);
    } catch (error) {
        console.error('이미지 삭제 실패:', error);
        throw error;
    }
};
