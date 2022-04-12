import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const app = firebase.initializeApp({
    apiKey: "AIzaSyBSlC9KII1qUbRhhff5h5jJQ9rrOOvKITQ",
    authDomain: "hjemmetjeneste-59f9e.firebaseapp.com",
    projectId: "hjemmetjeneste-59f9e",
    storageBucket: "hjemmetjeneste-59f9e.appspot.com",
    messagingSenderId: "939562505544",
    appId: "1:939562505544:web:181c438f68a7ddea358f7d",
    measurementId: "G-WGTT2YCST4"
})

export const auth = app.auth()
export default app