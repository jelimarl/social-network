/* eslint-disable import/no-unresolved */
// importamos la funcion que vamos a testear

import { showSection } from '../src/router.js';

jest.mock('../src/lib/firebaseServices.js');

describe('Router', () => {
  it('Tiene que llamar a la función login', () => {
    // eslint-disable-next-line quotes
    document.body.innerHTML = `<div id="root"></div>`; // Creación del root

    window.location.hash = '#login';

    // Ejecutar la función
    showSection();

    expect(document.querySelector('h2.register__title').textContent).toBe('Log in');
  });

  it('Tiene que llamar a la función register', () => {
    // eslint-disable-next-line quotes
    document.body.innerHTML = `<div id="root"></div>`; // Creación del root

    window.location.hash = '#register';

    // Ejecutar la función
    showSection();

    expect(document.querySelector('h2.register__title').textContent).toBe('Create account');
  });
});
