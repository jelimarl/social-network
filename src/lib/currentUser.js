import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js';
import { app } from './configFirebase.js';

export const currentUser = {};

window.addEventListener('load', () => {
  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser.displayName = user.displayName;
      currentUser.email = user.email;
      currentUser.uid = user.uid;
      currentUser.photoURL = user.photoURL;
    }
    console.log('Current User Actualizado');
  });
});