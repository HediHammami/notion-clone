import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "notion-blog-2a4c5.firebaseapp.com",
  projectId: "notion-blog-2a4c5",
  storageBucket: "notion-blog-2a4c5.appspot.com",
  messagingSenderId: "1092716886397",
  appId: "1:1092716886397:web:b04c980a50cc3bd1dcb414",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFileToFirebase(image_url: string, name: string) {
  try {
    const response = await fetch(image_url);
    const buffer = await response.arrayBuffer();
    const file_name = name.replace(" ", "") + Date.now + ".jpeg";
    const storageRef = ref(storage, file_name);
    await uploadBytes(storageRef, buffer, {
      contentType: "image/jpeg",
    });
    const firebase_url = await getDownloadURL(storageRef);
    return firebase_url;
  } catch (error) {
    console.error(error);
  }
}
