importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyBO-UGpyBD55KeTUJsOGbxI4ttmUXJ5ybY",
    authDomain: "comerciantes-restrepo.firebaseapp.com",
    databaseURL: "https://comerciantes-restrepo-default-rtdb.firebaseio.com",
    projectId: "comerciantes-restrepo",
    storageBucket: "comerciantes-restrepo.appspot.com",
    messagingSenderId: "982260572909",
    appId: "1:982260572909:web:194b521e51612314bde2e4",
    measurementId: "G-Z2N2R93WZ4"
});

const messaging = firebase.messaging()