// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

//Service Worker
if ('serviceWorker' in navigator) {
    console.log('Puedes usar los serviceWorker en tu navegador');
    navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('Registro de SW exitoso', reg))
        .catch(err => console.warn('Error al tratar de registrar el sw', err))
}