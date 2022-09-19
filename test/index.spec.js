/* eslint-disable import/no-unresolved */
// importamos la funcion que vamos a testear
import { register } from '../src/components/register.js';
import { showSection } from '../src/router.js';
import { googleSignIn } from '../src/lib/firebaseServices.js';

jest.mock('../src/lib/firebaseServices.js', () => ({
  googleSignIn: jest.fn(),
}));

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

describe('register', () => {
  it('Comprueba que funciona el evento click de Google', () => {
    const view = register();

    googleSignIn.mockImplementation(() => Promise.resolve('works'));

    const googleButton = view.querySelector('.register__button-google');

    googleButton.dispatchEvent(new Event('click'));

    expect(googleSignIn).toBeCalled();
  });
});
