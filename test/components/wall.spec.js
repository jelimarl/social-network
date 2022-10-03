import { wall } from '../../src/components/wall.js';
import { getCurrentUser, onGetPost, getPost } from '../../src/lib/firebaseServices.js';

jest.mock('../../src/lib/firebaseServices.js');

describe('Wall', () => {
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

  // Amappola
  // it ('', () => {
  //   const view = wall();
  //   const likeButton = view.querySelector('.like-button-empty');
  //   window.dispatchEvent(new Event('hashchange'));
  //   likeButton.dispatchEvent(new Event('click'));
  //   expect(getPost).toBeCalled();
  // });

  // Amappola
  it('Comprueba que el botón add post funcione', () => {
    const view = wall();
    const addPostButton = view.querySelector('.wall__button-add');
    addPostButton.dispatchEvent(new Event('click'));
    expect(view.querySelector('.wall__modal-add-text').value).toBe('');
  });
});
