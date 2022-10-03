import { wall } from '../../src/components/wall.js';
import {
  editPost, onGetPost, savePost, logOut,
} from '../../src/lib/firebaseServices.js';

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

  // A este caso no se ha podido acceder, ya que depende de que editStatus sea true
  it('Comprueba que al dar click al boton de post el text area tenga contenido y edit status sea true', () => {
    const view = wall();
    const postButton = view.querySelector('.wall__post-button');
    const textArea = view.querySelector('.wall__modal-add-text');
    textArea.value = 'hola';
    postButton.click();
    expect(savePost).not.toBeCalled();
    expect(editPost).toBeCalled();
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
