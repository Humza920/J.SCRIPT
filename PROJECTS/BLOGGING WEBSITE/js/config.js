import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDJQ02Hu4oryboA3KNYvs3uUaTBJBOzbrI",
  authDomain: "fire-blog-fa706.firebaseapp.com",
  projectId: "fire-blog-fa706",
  storageBucket: "fire-blog-fa706.firebasestorage.app",
  messagingSenderId: "341912771465",
  appId: "1:341912771465:web:c4ca018d67f282b97edf58",
  measurementId: "G-J2RTZ2DV5Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
