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
});
