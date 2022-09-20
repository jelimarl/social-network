import { welcome } from '../../src/components/welcome.js';
import { googleSignIn } from '../../src/lib/firebaseServices.js';

jest.mock('../../src/lib/firebaseServices.js');

describe('welcome', () => {
  it('Comprueba que funciona el evento click de Google', () => {
    const view = welcome();
    const googleButton = view.querySelector('.welcome__button-google');
    googleButton.dispatchEvent(new Event('click'));
    expect(googleSignIn).toBeCalled();
  });
});