import { login } from '../../src/components/login.js';
import { googleSignIn, loginUser } from '../../src/lib/firebaseServices.js';

jest.mock('../../src/lib/firebaseServices.js');

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
