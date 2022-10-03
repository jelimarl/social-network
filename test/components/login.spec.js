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

  it('Entra al 1er catch', (done) => {
    const view = login();
    const buttonLogin = view.querySelector('#login__form-id');

    loginUser.mockImplementation((email) => {
      if (email === 'ana@gm') {
        return Promise.reject({ code: 'auth/user-not-found' });
      }
    });

    view.querySelector('#login__email').value = 'ana@gm';
    buttonLogin.submit();
    setTimeout(() => {
      expect(view.querySelector('#login__email-not-found').style.display).toBe('block');
      done();
    }, 1000);
  });

  it('Entra al 2do catch', (done) => {
    const view = login();
    const buttonLogin = view.querySelector('#login__form-id');

    loginUser.mockImplementation((email, password) => {
      if (email === 'ana@gmail.com' && password === '123456789') {
        return Promise.reject({ code: 'auth/wrong-password' });
      }
    });

    view.querySelector('#login__email').value = 'ana@gmail.com';
    view.querySelector('#login__password').value = '123456789';
    buttonLogin.submit();
    setTimeout(() => {
      expect(view.querySelector('#login__wrong-password').style.display).toBe('block');
      done();
    }, 1000);
  });
});
