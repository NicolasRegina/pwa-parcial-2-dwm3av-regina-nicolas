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
            alert('Usuario logueado');
            window.location.replace('index.html');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        
            console.error('Error al loguear:', errorCode);
        
            let alertMessage = 'Error al loguear: ' + errorMessage;
        
            // Personalizar el mensaje de alerta según el tipo de error
            switch (errorCode) {
                case 'auth/invalid-email':
                    alertMessage = 'Correo electrónico no válido. Verifica el formato del correo electrónico.';
                    break;
                case 'auth/user-not-found':
                    alertMessage = 'Usuario no encontrado. Verifica el correo electrónico.';
                    break;
                case 'auth/wrong-password':
                    alertMessage = 'Contraseña incorrecta. Verifica tu contraseña.';
                    break;
            }
        
            alert(alertMessage);
        });
}

document.getElementById('loginForm').addEventListener('submit', function (event) {
    // Evita que el formulario se envíe de forma predeterminada
    event.preventDefault(); 
    login();
});