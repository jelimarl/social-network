import { register } from '../../src/components/register.js';
import { googleSignIn, createUser, saveDisplayName } from '../../src/lib/firebaseServices.js';

jest.mock('../../src/lib/firebaseServices.js');

describe('register', () => {
  it('Comprueba que funciona el evento click de Google', () => {
    const view = register();
    const googleButton = view.querySelector('.register__button-google');
    googleButton.click();
    expect(googleSignIn).toBeCalled();
  });

  it('Comprueba que funciona el evento submit de crear cuenta', () => {
    const view = register();
    const buttonCreate = view.querySelector('#register__form-id');
    buttonCreate.submit();
    expect(createUser).toBeCalled();
  });

  it('Comprueba que se cree el usuario correctamente', () => {
    const view = register();
    const buttonCreate = view.querySelector('#register__form-id');
    buttonCreate.submit();
    expect(saveDisplayName).toBeCalled();
  });

  it('Comprueba si el email ingresado es invalido', (done) => {
    const view = register();
    const buttonCreate = view.querySelector('#register__form-id');
    // eslint-disable-next-line consistent-return
    createUser.mockImplementation((email) => {
      if (email === 'ana@gm') {
        // eslint-disable-next-line prefer-promise-reject-errors
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
        return Promise.reject({ code: 'auth/email-already-in-use' });
      }
    });

    view.querySelector('#register__email').value = 'emailalreadyregistered@gmail.com';
    buttonCreate.submit();
    setTimeout(() => {
      expect(view.querySelector('#register__already-in-use-email').style.display).toBe('block');
      done();
    }, 1000);
  });
});
