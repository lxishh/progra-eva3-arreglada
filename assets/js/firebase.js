//se importan las credenciales.
import { firebaseConfig } from "./credenciales.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

// (Lo mismo de arriba, pero, cambiando por fire-store al final.)
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration


  // Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


