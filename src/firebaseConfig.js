// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuXcKZkrCnDH8epsiMnkTGVV-tBB76mjk",
  authDomain: "genxgender-hackathon.firebaseapp.com",
  projectId: "genxgender-hackathon",
  storageBucket: "genxgender-hackathon.appspot.com",
  messagingSenderId: "434152288382",
  appId: "1:434152288382:web:727c22fc48e7465cdca82f",
  measurementId: "G-2QL56ZXSLG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app; // Export the app instance