// eslint-disable-next-line import/no-unresolved
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js';
import { app } from './configFirebase.js';

export const currentUser = {};

export const getCurrentUser = () => {
  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser.displayName = user.displayName;
      currentUser.email = user.email;
      currentUser.uid = user.uid;
      currentUser.photoURL = user.photoURL;
    }
  });
};
