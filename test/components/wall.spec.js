import { wall } from '../../src/components/wall.js';
import { editPost, onGetPost, savePost } from '../../src/lib/firebaseServices.js';

jest.mock('../../src/lib/firebaseServices.js');

describe('welcome', () => {
  it('Comprueba que funciona el evento click de Google2', () => {
    wall();
    window.dispatchEvent(new Event('hashchange'));
    expect(onGetPost).toBeCalled();
  });

  it('Comprueba que al darle a la x del modal de postear se cierre', () => {
    const view = wall();
    const modal = view.querySelector('.wall__container-add-post-modal');
    const closeModal = view.querySelector('.wall__modal-exit-button');
    closeModal.click();
    expect(modal.style.display).toBe('none');
  });

  it('Comprueba que al dar click al boton de post el text area esta vacio', () => {
    // jest.spyOn(window, 'alert').mockImplementation(() => {});
    window.alert = jest.fn();
    const view = wall();
    const postButton = view.querySelector('.wall__post-button');
    const textArea = view.querySelector('.wall__modal-add-text');
    textArea.value = '';
    postButton.click();

    expect(window.alert).toBeCalled();
  });

  it('Comprueba que al dar click al boton de post el text area tenga contenido y edit status sea false', () => {
    const view = wall();
    const postButton = view.querySelector('.wall__post-button');
    const textArea = view.querySelector('.wall__modal-add-text');
    textArea.value = 'hola';
    postButton.click();
    expect(savePost).toBeCalled();
    expect(editPost).not.toBeCalled();
  });

  it('Comprueba que al dar click al boton de post el text area tenga contenido y edit status sea true', () => {
    const view = wall();
    const postButton = view.querySelector('.wall__post-button');
    const textArea = view.querySelector('.wall__modal-add-text');
    textArea.value = 'hola';
    postButton.click();
    expect(savePost).not.toBeCalled();
    expect(editPost).toBeCalled();
  });
});
