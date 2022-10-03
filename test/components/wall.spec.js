import { wall } from '../../src/components/wall.js';
import { onGetPost, logOut } from '../../src/lib/firebaseServices.js';

jest.mock('../../src/lib/firebaseServices.js');

describe('welcome', () => {
  // it('Comprueba que funciona el evento click de Google', () => {
  //   wall();
  //   window.dispatchEvent(new Event('hashchange'));
  //   expect(getCurrentUser).toBeCalled();
  // });

  it('Comprueba que funciona el evento click de Google2', () => {
    wall();
    window.dispatchEvent(new Event('hashchange'));
    expect(onGetPost).toBeCalled();
  });

  it('Comprueba que funciona el evento click de Log out con ícono', () => {
    window.confirm = () => true; // provide an implementation for window.confirm

    const view = wall();
    const iconLogOut = view.querySelector('.wall__logout-icon');
    iconLogOut.click();

    expect(logOut).toBeCalled();
  });

  it('Comprueba que funciona el evento click de Log out con texto', () => {
    window.confirm = () => true; // provide an implementation for window.confirm

    const view = wall();
    const textLogOut = view.querySelector('.wall__logout-text');
    textLogOut.click();

    expect(logOut).toBeCalled();
  });
});
