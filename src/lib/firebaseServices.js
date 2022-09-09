/* eslint-disable import/no-unresolved */
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js';
import { firebaseConfig } from './configFirebase.js';

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();

// Authentication
// eslint-disable-next-line max-len
export const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);
