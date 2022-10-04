/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable consistent-return */
import { login } from '../../src/components/login.js';
import { googleSignIn, loginUser } from '../../src/lib/firebaseServices.js';

jest.mock('../../src/lib/firebaseServices.js');

describe('login', () => {
  it('Check Google event works', () => {
    const view = login();
    const googleButton = view.querySelector('.register__button-google');
    googleButton.dispatchEvent(new Event('click'));
    expect(googleSignIn).toBeCalled();
  });

  it('Check submit event works', () => {
    const view = login();
    const buttonLogin = view.querySelector('#login__form-id');
    buttonLogin.dispatchEvent(new Event('submit'));
    expect(loginUser).toBeCalled();
  });

  it('Check Log In fails', () => {
    const view = login();
    const buttonLogin = view.querySelector('#login__form-id');
    loginUser.mockRejectedValueOnce('auth/user-not-found');
    buttonLogin.dispatchEvent(new Event('submit'));
    expect(loginUser).toBeCalled();
  });

  it('Check Log In throws user not found error', (done) => {
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

  it('Check Log In throws wrong password error', (done) => {
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
