/* eslint-disable import/no-unresolved */
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider,
  signInWithPopup, onAuthStateChanged, updateProfile,
} from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js';
import {
  // eslint-disable-next-line max-len
  addDoc, collection, getFirestore, onSnapshot, query, orderBy, deleteDoc, doc, updateDoc, getDoc,
} from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js';
import { firebaseConfig } from './configFirebase.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
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

// Get current user
export const currentUser = {};

export const getCurrentUser = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser.displayName = user.displayName;
      currentUser.email = user.email;
      currentUser.uid = user.uid;
      currentUser.photoURL = user.photoURL;
    }
  });
};

// Save data
export const savePost = (contentPost, date) => {
  if (currentUser) {
    const name = currentUser.displayName;
    const email = currentUser.email;
    const uid = currentUser.uid;
    const photo = currentUser.photoURL;

    addDoc(collection(firestoreConnection, 'Posts'), {
      contentPost, name, email, uid, photo, date,
    });
  }
};

// Get posts & order posts
export const onGetPost = (callback) => {
  onSnapshot(query(collection(firestoreConnection, 'Posts'), orderBy('date', 'desc')), callback);
};

// Get one post
export const getPost = (id) => getDoc(doc(firestoreConnection, 'Posts', id));

export const saveDisplayName = (registerUsernameValue) => updateProfile(auth.currentUser, {
  displayName: registerUsernameValue,
});

// Delete post
export const deletePost = (id) => deleteDoc(doc(firestoreConnection, 'Posts', id));

// Edit post
export const editPost = (id, newContentPost) => updateDoc(doc(firestoreConnection, 'Posts', id), newContentPost);
