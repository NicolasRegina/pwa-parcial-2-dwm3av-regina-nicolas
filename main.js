// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyAISRqC75mWLE-e9tSDwiXkZZDKvQ8kaxQ",
authDomain: "nintendofirebase.firebaseapp.com",
projectId: "nintendofirebase",
storageBucket: "nintendofirebase.appspot.com",
messagingSenderId: "548790770216",
appId: "1:548790770216:web:cc7f4e2f66f6314881b31d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Autenticación Firebase
const auth = getAuth(app);

//Service Worker
if ('serviceWorker' in navigator) {
    console.log('Puedes usar los serviceWorker en tu navegador');
    navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('Registro de SW exitoso', reg))
        .catch(err => console.warn('Error al tratar de registrar el sw', err))
}

document.addEventListener('DOMContentLoaded', () => {
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        //const uid = user.uid;
        // ...
      } else {
        // User is signed out
        window.location.replace('home.html');
      }
    });

});