import { welcome } from './components/welcome.js';
import { register } from './components/register.js';
import { login } from './components/login.js';
import { wall } from './components/wall.js';
import { getCurrentUser } from './lib/firebaseServices.js';

// Routing events

const template = {
  '': welcome(),
  '#register': register(),
  '#login': login(),
  '#wall': wall(),
};

export const showSection = () => {
  getCurrentUser();
  const root = document.getElementById('root');
  const hash = window.location.hash;
  root.replaceChildren(template[hash]);
};

window.addEventListener('DOMContentLoaded', showSection);
window.addEventListener('hashchange', showSection);
