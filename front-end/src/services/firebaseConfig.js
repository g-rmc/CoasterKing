import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_FIREBASE_API_KEY,
  authDomain: `${process.env.REACT_APP_API_FIREBASE_DOMAIN}.firebaseapp.com`,
  projectId: process.env.REACT_APP_API_FIREBASE_DOMAIN,
  storageBucket: `${process.env.REACT_APP_API_FIREBASE_DOMAIN}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_API_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_API_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_API_FIREBASE_MEASUREMENT_ID
};

export default initializeApp(firebaseConfig);
