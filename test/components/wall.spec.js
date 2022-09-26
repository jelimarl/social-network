import { wall } from '../../src/components/wall.js';
import { getUserInfo, onGetPost } from '../../src/lib/firebaseServices.js';

jest.mock('../../src/lib/firebaseServices.js');

describe('welcome', () => {
  it('Comprueba que funciona el evento click de Google', () => {
    wall();
    window.dispatchEvent(new Event('DOMContentLoaded'));
    expect(getUserInfo).toBeCalled();
  });

  it('Comprueba que funciona el evento click de Google2', () => {
    wall();
    window.dispatchEvent(new Event('DOMContentLoaded'));
    expect(onGetPost).toBeCalled();
  });
});
