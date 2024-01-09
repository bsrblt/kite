import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCpNtYbjZu3ebbZdFtW6y-rnyp_-SRqe8E",
  authDomain: "kite-session-tracker.firebaseapp.com",
  databaseURL:
    "https://kite-session-tracker-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kite-session-tracker",
  storageBucket: "kite-session-tracker.appspot.com",
  messagingSenderId: "926109669302",
  appId: "1:926109669302:web:d29de3bdaee8eac3559317",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
