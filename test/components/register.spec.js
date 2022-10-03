import { register } from '../../src/components/register.js';
import { googleSignIn, createUser } from '../../src/lib/firebaseServices.js';

jest.mock('../../src/lib/firebaseServices.js');

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

  it('Comprueba ', (done) => {
    const view = register();
    const buttonCreate = view.querySelector('#register__form-id');
    createUser.mockImplementation((email) => {
      if (email === 'ana@gm') {
        return Promise.reject({ code: 'auth/invalid-email' });
      }
    });

    view.querySelector('#register__email').value = 'ana@gm';
    buttonCreate.submit();
    setTimeout(() => {
      expect(view.querySelector('#register__invalid-email').style.display).toBe('block');
      done();
    }, 1000);
  });

  // Amappola
  it('Comprueba que el error de email already in use se muestre', (done) => {
    const view = register();
    const buttonCreate = view.querySelector('#register__form-id');
    createUser.mockImplementation((email) => {
      if (email === 'emailalreadyregistered@gmail.com') {
        return Promise.reject({code: 'auth/email-already-in-use'});
      }

      view.querySelector('#register__email').value = 'emailalreadyregistered@gmail.com';
      buttonCreate.submit();
      setTimeout(() => {
        expect(view.querySelector('#register__already-in-use-email').style.display).toBe('block');
        done();
      }, 1000);
    });
  });
});
