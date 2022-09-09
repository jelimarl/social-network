import { welcome } from './components/welcome.js';
import { register } from './components/register.js';
import { wall } from './components/wall.js';

// Routing events
const root = document.getElementById('root');

const template = {
  '': welcome(),
  '#register': register(),
  '#wall': wall(),
};

export const showSection = () => {
  const hash = window.location.hash;
  root.replaceChildren(template[hash]);
};

window.addEventListener('load', showSection);
window.addEventListener('hashchange', showSection);
