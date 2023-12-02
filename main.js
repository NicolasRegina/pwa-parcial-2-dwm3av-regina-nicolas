// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

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
// Initialize Storage
const storage = getStorage(app);

//Service Worker
if ('serviceWorker' in navigator) {
    console.log('Puedes usar los serviceWorker en tu navegador');
    navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('Registro de SW exitoso', reg))
        .catch(err => console.warn('Error al tratar de registrar el sw', err))
}

// Función para hacer la solicitud el GET a la API y cargar las características
async function cargarCaracteristicas() {
  try {
      const response = await fetch('https://nintendofirebase-default-rtdb.firebaseio.com/switchCharacteristics.json');
      const data = await response.json();

      if (!response.ok) {
          throw new Error(data.message || 'Error al obtener los datos de la API');
      }

      const characteristicsContainer = document.getElementById('caracteristicasContainer');

      // Iterar sobre los datos y crear elementos <article> dinámicamente
      for (const idCharacteristics in data) {
          const characteristics = data[idCharacteristics];

          const article = document.createElement('article');
          article.className = 'card';

          const titulo = document.createElement('h3');
          titulo.className = 'card-title';
          titulo.textContent = characteristics.title;

          const imgContainer = document.createElement('div');
          imgContainer.className = 'img-container';

          const imgCaracteristica = document.createElement('img');
          imgCaracteristica.className = 'img';
          imgCaracteristica.src = characteristics.imgPortrait;
          imgCaracteristica.alt = 'Imagen de la característica: ' + characteristics.title;

          imgContainer.appendChild(imgCaracteristica);

          const parrafo = document.createElement('p');
          parrafo.className = 'contenedor-texto';
          parrafo.innerHTML = characteristics.description;

          article.appendChild(titulo);
          article.appendChild(imgContainer);
          article.appendChild(parrafo);

          characteristicsContainer.appendChild(article);
      }
  } catch (error) {
      console.error('Error:', error.message || error);
  }
}

// Función para hacer la solicitud el GET a la API y cargar los juegos 
async function cargarJuegos() {
  try {
      const response = await fetch('https://nintendofirebase-default-rtdb.firebaseio.com/Switchgames.json');
      const data = await response.json();

      if (!response.ok) {
          throw new Error(data.message || 'Error al obtener los datos de la API');
      }

      const cardContainer = document.getElementById('cardContainer');

      // Iterar sobre los datos y crear elementos <article> dinámicamente
      for (const idGame in data) {
          const juego = data[idGame];

          const article = document.createElement('article');
          article.className = 'card';
          article.setAttribute('onclick', `getGame('${idGame}')`);

          const topDiv = document.createElement('div');
          topDiv.className = 'top';

          const iconoSwitch = document.createElement('img');
          iconoSwitch.src = 'img/icon-white.png';
          iconoSwitch.alt = 'Icono Switch';

          const titulo = document.createElement('h3');
          titulo.className = 'card-title';
          titulo.textContent = juego.name;

          topDiv.appendChild(iconoSwitch);
          topDiv.appendChild(titulo);

          const imgContainer = document.createElement('div');
          imgContainer.className = 'img-container';

          const imgJuego = document.createElement('img');
          imgJuego.className = 'img';
          imgJuego.src = juego.imgPortrait;
          imgJuego.alt = 'Portada juego ' + juego.name;

          imgContainer.appendChild(imgJuego);

          article.appendChild(topDiv);
          article.appendChild(imgContainer);

          cardContainer.appendChild(article);
      }
  } catch (error) {
      console.error('Error:', error.message || error);
  }
}

// function getGame(idGame) {
//   fetch(`https://nintendofirebase-default-rtdb.firebaseio.com/Switchgames/${idGame}.json`)
//       .then(response => response.json())
//       .then(data => {
//           const modalContent = `
//               <article class="card-modal">
//                   <h2 class="card-title-modal">${data.name}</h2>
//                   <div class="img-container-modal">
//                       <img class="img-modal" src="${data.imgPortrait}" alt="Imagen de ${data.name}">
//                       <p>Género: ${data.genre}</p>
//                       <p>Desarrollador: ${data.developer}</p>
//                       <p>Fecha de lanzamiento: ${data.releaseDate}</p>
//                   </div>
//                   <span style="margin:0" class="close" onclick="closeModal()">&times;</span>
//               </article>`;

//           document.getElementById('gameModal').innerHTML = modalContent;
          
//           openModal();

//           return data;
//       });
// }

// function closeModal() {
//   const modal = document.getElementById('gameModal');
//   modal.style.display = 'none';
// }

// function openModal() {
//   const modal = document.getElementById('gameModal');
//   modal.style.display = 'block';
// }

const getImageData = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
      const imgPreview = document.getElementById('imgPreview');
      console.log(imgPreview);
      imgPreview.src = reader.result;
      imgPreview.style.display = 'block';
  }
}

const uploadImage = () => {
  const storageRef = storage.ref().child("img/juegos");
  const folderRef = storageRef.child(fileName);
  const uploadtask = folderRef.put(file);
  uploadtask.on(
    "state_changed",
    (snapshot) => {
      console.log("Snapshot", snapshot.ref.name);
      progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progress = Math.round(progress);
      progressbar.style.width = progress + "%";
      progressbar.innerHTML = progress + "%";
      uploadedFileName = snapshot.ref.name;
    },
    (error) => {
      console.log(error);
    },
    () => {
      storage
        .ref("img/juegos")
        .child(uploadedFileName)
        .getDownloadURL()
        .then((url) => {
          console.log("URL", url);
          if (!url) {
            img.style.display = "none";
          } else {
            img.style.display = "block";
            loading.style.display = "none";
          }
          img.setAttribute("src", url);
        });
      console.log("File Uploaded Successfully");
    }
  );
};

document.addEventListener('DOMContentLoaded', () => {

  onAuthStateChanged(auth, (user) => {
      if (user) {
          // Llamar a la función para cargar las características y los juegos al cargar la página
          cargarCaracteristicas();
          cargarJuegos();
          //getGame(1);
      } else {
          // User is signed out
          window.location.replace('home.html');
      }
  });
});

