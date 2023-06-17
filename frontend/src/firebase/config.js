import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDKJTKRA0nJuSZoyRelvYL1TFKk3VIhC0c",
  authDomain: "chatgpttask-8c373.firebaseapp.com",
  projectId: "chatgpttask-8c373",
  storageBucket: "chatgpttask-8c373.appspot.com",
  messagingSenderId: "361617670889",
  appId: "1:361617670889:web:c8b4883e51c8485006e678",
  measurementId: "G-ZY97X690E2",
};
export const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export default db;
