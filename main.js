//Service Worker
if ('serviceWorker' in navigator) {
    console.log('Puedes usar los serviceWorker en tu navegador');
    navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('Registro de SW exitoso', reg))
        .catch(err => console.warn('Error al tratar de registrar el sw', err))
}