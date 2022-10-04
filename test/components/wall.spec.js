import { wall } from '../../src/components/wall.js';
import {
  editPost, onGetPost, savePost, logOut, getPost, likePost, deletePost,
} from '../../src/lib/firebaseServices.js';

jest.mock('../../src/lib/firebaseServices.js');

describe('welcome', () => {
  it('Check onGetPost is called', () => {
    wall();
    window.dispatchEvent(new Event('hashchange'));
    expect(onGetPost).toBeCalled();
  });

  it('Check onGetPost is called b', () => {
    wall();
    window.dispatchEvent(new Event('DOMContentLoaded'));
    expect(onGetPost).toBeCalled();
  });

  it('Check the posts are correctly Laid out', () => {
    const view = wall();
    const wallInputs = view.querySelector('.wall__inputs');
    window.dispatchEvent(new Event('hashchange'));
    expect(wallInputs.querySelector('.post__username').textContent).toBe('Nunito');
  });

  it('Check the add post button opens the add post modal', () => {
    const view = wall();
    const addPostButton = view.querySelector('.wall__button-add');
    addPostButton.dispatchEvent(new Event('click'));
    expect(view.querySelector('.wall__modal-add-text').value).toBe('');
  });

  it('Checks the exit modal button closes the add post modal', () => {
    const view = wall();
    const modal = view.querySelector('.wall__container-add-post-modal');
    const closeModal = view.querySelector('.wall__modal-exit-button');
    closeModal.click();
    expect(modal.style.display).toBe('none');
  });

  it('Check the text area is empty when the post button is clicked', () => {
    window.alert = jest.fn();
    const view = wall();
    const postButton = view.querySelector('.wall__post-button');
    const textArea = view.querySelector('.wall__modal-add-text');
    textArea.value = '';
    postButton.click();
    expect(window.alert).toBeCalled();
  });

  it('Check the text area has content and edit status is false when the post button is clicked', () => {
    const view = wall();
    const postButton = view.querySelector('.wall__post-button');
    const textArea = view.querySelector('.wall__modal-add-text');
    textArea.value = 'hola';
    postButton.click();
    expect(savePost).toBeCalled();
    expect(editPost).not.toBeCalled();
  });

  it('Check logout icon button event works', () => {
    window.confirm = () => true;

    const view = wall();
    const iconLogOut = view.querySelector('.wall__logout-icon');
    iconLogOut.click();

    expect(logOut).toBeCalled();
  });

  it('Check logout text button event works', () => {
    window.confirm = () => true;
    const view = wall();
    const textLogOut = view.querySelector('.wall__logout-text');
    textLogOut.click();

    expect(logOut).toBeCalled();
  });

  it('Check modal add post is closed when window is clicked', () => {
    const view = wall();
    const modalContainer = view.querySelector('.wall__container-add-post-modal');
    const wallInputs = view.querySelector('.wall__inputs');
    Event.target = modalContainer;
    window.onclick(Event);
    expect(wallInputs.style.display).toBe('flex');
  });

  it('Check like button works', () => {
    const view = wall();
    window.dispatchEvent(new Event('DOMContentLoaded'));
    const likeButton = view.querySelector('.like-button-empty');
    likeButton.click();
    expect(getPost).toBeCalled();
    expect(likePost).toBeCalled();
  });

  it('Check edit button works', () => {
    const view = wall();
    window.dispatchEvent(new Event('DOMContentLoaded'));
    const editButton = view.querySelector('.post__edit-button');
    editButton.click();
    expect(getPost).toBeCalled();
  });

  it('Check delete button works', () => {
    const view = wall();
    window.dispatchEvent(new Event('DOMContentLoaded'));
    const deleteButton = view.querySelector('.post__delete-button');
    deleteButton.click();
    window.confirm = () => true;
    expect(deletePost).toBeCalled();
  });

  // A este caso no se ha podido acceder, ya que depende de que editStatus sea true
  it('Check the text area has content and edit status is true when the post button is clicked', () => {
    const view = wall();
    window.dispatchEvent(new Event('DOMContentLoaded'));
    const editButton = view.querySelector('.post__edit-button');
    editButton.click();
    const postButton = view.querySelector('.wall__post-button');
    const textArea = view.querySelector('.wall__modal-add-text');
    textArea.value = 'hola';
    postButton.click();
    expect(editPost).toBeCalled();
  });
});
