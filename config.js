import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBbskmdsgp2gY9L-krXZz9M8mPuRIVPQTs",
  authDomain: "blog-app-2024-cc78e.firebaseapp.com",
  projectId: "blog-app-2024-cc78e",
  storageBucket: "blog-app-2024-cc78e.appspot.com",
  messagingSenderId: "33354791641",
  appId: "1:33354791641:web:4378edaba98dba4a399cc8",
  measurementId: "G-BR14ZP7E0T"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
