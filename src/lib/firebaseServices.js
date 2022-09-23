/* eslint-disable import/no-unresolved */
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider,
  signInWithPopup, onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js';
import {
  addDoc, collection, getFirestore, getDocs, onSnapshot,
} from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js';
import { firebaseConfig } from './configFirebase.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);
const firestoreConnection = getFirestore(app);
export const currentUser = auth.currentUser;

// Auth State
export const getAuthState = () => {
  onAuthStateChanged(auth, (user) => {
    const userInfo = {};
    if (user) {
      userInfo.name = user.displayName;
      userInfo.email = user.email;
      userInfo.uid = user.uid;
      userInfo.profilePicture = user.photoURL;
    }

    return userInfo;
  });
};

// Authentication
// eslint-disable-next-line max-len
export const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

// Authentication with Google
// Popup
export const googleSignIn = () => signInWithPopup(auth, provider);

// Save data
export const savePost = (contentPost) => {
  addDoc(collection(firestoreConnection, 'Posts'), { contentPost });
};

// Save user info

export const saveUserInfo = (userName, userEmail, userID) => {
  addDoc(collection(firestoreConnection, 'UserInfo'), { userName, userEmail, userID });
};

export const getUserInfo = () => getDocs(collection(firestoreConnection, 'UserInfo'));

// export const getPost = () => getDocs(collection(firestoreConnection, 'Posts'));

export const onGetPost = (callback) => { onSnapshot(collection(firestoreConnection, 'Posts'), callback); };
