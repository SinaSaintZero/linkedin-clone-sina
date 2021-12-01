import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
require('firebase/auth');

const firebaseConfig = {
    apiKey: "AIzaSyA6ShF80Ny4PEDqKxys7fe3-4w7F-dpPSs",
    authDomain: "linkedin-clone-9c487.firebaseapp.com",
    projectId: "linkedin-clone-9c487",
    storageBucket: "linkedin-clone-9c487.appspot.com",
    messagingSenderId: "40209616727",
    appId: "1:40209616727:web:a461a35e254b3d8fc4b812",
    measurementId:  "G-JVNE722067"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth() ;
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;