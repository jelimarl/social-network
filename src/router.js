import { welcome } from './components/welcome.js';
import { register } from './components/register.js';
import { login } from './components/login.js';
import { wall } from './components/wall.js';
import { getCurrentUser } from './lib/currentUser.js';

// Routing events

const template = {
  '': welcome(),
  '#register': register(),
  '#login': login(),
  '#wall': wall(),
};

export const showSection = () => {
  const root = document.getElementById('root');
  const hash = window.location.hash;
  root.replaceChildren(template[hash]);
  getCurrentUser();
};

window.addEventListener('load', showSection);
window.addEventListener('hashchange', showSection);
