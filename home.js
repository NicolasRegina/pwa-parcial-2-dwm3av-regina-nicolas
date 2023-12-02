// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

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

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log(email);
    console.log(password);
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('Usuario logueado', user);
            
            // TODO redirigir a index.html
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error al loguear:', errorCode, errorMessage);
        });
}

document.getElementById('loginForm').addEventListener('submit', function (event) {
    // Evita que el formulario se envíe de forma predeterminada
    event.preventDefault(); 
    login();
});