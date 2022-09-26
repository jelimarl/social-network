/* eslint-disable import/no-unresolved */
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider,
  signInWithPopup,
} from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js';
import {
  addDoc, collection, getFirestore, onSnapshot,
} from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js';
import { app } from './configFirebase.js';
import { currentUser } from './currentUser.js';

// Initialize Firebase
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);
const firestoreConnection = getFirestore(app);

// Authentication
// eslint-disable-next-line max-len
export const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

// Authentication with Google
// Popup
export const googleSignIn = () => signInWithPopup(auth, provider);

// Save data
export const savePost = (contentPost) => {
  if (currentUser) {
    const name = currentUser.displayName;
    const email = currentUser.email;
    const uid = currentUser.uid;
    const photo = currentUser.photoURL;

    addDoc(collection(firestoreConnection, 'Posts'), {
      contentPost, name, email, uid, photo,
    });
  }
};

// Get posts
export const onGetPost = (callback) => { onSnapshot(collection(firestoreConnection, 'Posts'), callback); };
