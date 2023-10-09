import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "@firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDu3NRHrYgGY2IbOJG9HxB3s1BIVI5TGXU",
  authDomain: "culinarydelight-bc9c6.firebaseapp.com",
  projectId: "culinarydelight-bc9c6",
  storageBucket: "culinarydelight-bc9c6.appspot.com",
  messagingSenderId: "496456452307",
  appId: "1:496456452307:web:05ee8601463a6426f4ac26",
  measurementId: "G-YMPW1NQJZP",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage();
