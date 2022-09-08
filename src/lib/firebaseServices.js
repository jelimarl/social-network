/* eslint-disable import/no-unresolved */
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js';
import { firebaseConfig } from './configFirebase.js';

// Initialize Firebase
initializeApp(firebaseConfig);

// Authentication
export function createUser(email, password) {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password);
}
