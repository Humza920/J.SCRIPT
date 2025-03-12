import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAVybLXSzaHZ9uHA9O0vMS1eTgmjkoqRrg",
  authDomain: "buy---sells-corner.firebaseapp.com",
  projectId: "buy---sells-corner",
  storageBucket: "buy---sells-corner.firebasestorage.app",
  messagingSenderId: "431731946070",
  appId: "1:431731946070:web:34d8543f8c5868441241f7",
  measurementId: "G-PL20LENCNS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)