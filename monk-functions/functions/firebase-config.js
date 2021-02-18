const firebase = require('firebase');

const firebaseConfig = {
  apiKey: "AIzaSyCJj9bax7HoEmS8Y-o-fan5_1g_rTeF0Wo",
  authDomain: "monk-d7a80.firebaseapp.com",
  projectId: "monk-d7a80",
  storageBucket: "monk-d7a80.appspot.com",
  messagingSenderId: "1055413883431",
  appId: "1:1055413883431:web:885e21f2156c047a9ff402",
  measurementId: "G-437YV274DW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

module.exports = { firebase, firebaseConfig };
