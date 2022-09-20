/* eslint-disable import/no-unresolved */
// importamos la funcion que vamos a testear
// import { loginUser } from '../src/lib/firebaseServices.js';
import { welcome } from '../src/components/welcome.js';
import { register } from '../src/components/register.js';
import { login } from '../src/components/login.js';
import { showSection } from '../src/router.js';
import { googleSignIn, loginUser, createUser } from '../src/lib/firebaseServices.js';

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

describe('welcome', () => {
  it('Comprueba que funciona el evento click de Google', () => {
    const view = welcome();
    const googleButton = view.querySelector('.welcome__button-google');
    googleButton.dispatchEvent(new Event('click'));
    expect(googleSignIn).toBeCalled();
  });
});

describe('login', () => {
  it('Comprueba que funciona el evento click de Google', () => {
    const view = login();
    const googleButton = view.querySelector('.register__button-google');
    googleButton.dispatchEvent(new Event('click'));
    expect(googleSignIn).toBeCalled();
  });

  it('Comprueba que funciona el evento submit de Loguearse', () => {
    const view = login();
    const buttonLogin = view.querySelector('#login__form-id');
    buttonLogin.dispatchEvent(new Event('submit'));
    expect(loginUser).toBeCalled();
  });

  it('El log in falla', () => {
    const view = login();
    const buttonLogin = view.querySelector('#login__form-id');
    loginUser.mockRejectedValueOnce('auth/user-not-found');
    buttonLogin.dispatchEvent(new Event('submit'));
    expect(loginUser).toBeCalled();
  });
});

describe('register', () => {
  it('Comprueba que funciona el evento click de Google', () => {
    const view = register();
    const googleButton = view.querySelector('.register__button-google');
    googleButton.dispatchEvent(new Event('click'));
    expect(googleSignIn).toBeCalled();
  });

  it('Comprueba que funciona el evento submit de crear cuenta', () => {
    const view = register();
    const buttonCreate = view.querySelector('#register__form-id');
    buttonCreate.dispatchEvent(new Event('submit'));
    expect(createUser).toBeCalled();
  });
});
