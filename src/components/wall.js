import { getCurrentUser } from '../lib/currentUser.js';
import {
  savePost, onGetPost,
} from '../lib/firebaseServices.js';

export const wall = () => {
  const sectionWall = document.createElement('section');
  sectionWall.className = 'sectionWall';
  sectionWall.innerHTML = `
  <header class="wall__header">
  <div class="wall__brand">
    <img class="wall__logo" src="http://imageshack.com/f/pncGMbEEp" alt="logo">
    <h2 class="wall__title">SysTEM</h2>
  </div>
  <div class="wall__button wall__logout">
    <p>Log out</p>
    <i class="wall__logout-icon fa-solid fa-person-walking-arrow-right"></i>
  </div>
</header>
<section class="wall__inputs">
</section>
<div class="post__container-edit-delete-modal">
  <section class="post__edit-delete-modal">
    <button class="post__edit-button  edit-delete-button-mobile"> <i class="fa-solid fa-pencil"></i></button>
    <p class="post__edit-delete-text">Edit</p>
    <button class="post__delete-button edit-delete-button-mobile"><i class="fa-solid fa-trash"></i></button>
    <p post__edit-delete-text>Delete</p>
  </section>
</div>
<div class="wall__container-add-post-modal">
  <section class="wall__add-post-modal">
    <div class="wall__modal-info-user">
      <div class="wall__modal-user">
        <img class="wall__modal-profile-picture" src="http://imageshack.com/f/posCILFZp" alt="Profile Picture">
        <h2 class="wall__modal-user-name"></h2>
      </div>
      <i class="wall__button wall__modal-exit-button fa-solid fa-xmark"></i>
    </div>
    <textarea max-length="2200" placeholder="Add something..." class="wall__modal-add-text"></textarea>
    <div class="wall__modal-buttons">
      <button class="wall__button wall__add-image-button"><i class="fa-regular fa-image"></i>Add image</button>
      <button class="wall__button wall__post-button">Post</button>
    </div>
  </section>
</div>
<footer class="wall__footer">
  <button class="wall__button wall__button-add">+</button>
</footer>
    `;

  const addPostButton = sectionWall.querySelector('.wall__button-add');
  const modalAddPost = sectionWall.querySelector('.wall__container-add-post-modal');
  const closeAddPostModal = sectionWall.querySelector('.wall__modal-exit-button');
  const postButton = sectionWall.querySelector('.wall__post-button');
  const textAreaPost = sectionWall.querySelector('.wall__modal-add-text');
  const wallInputs = sectionWall.querySelector('.wall__inputs');
  const userNameAddPost = sectionWall.querySelector('.wall__modal-user-name');

  // eslint-disable-next-line padded-blocks
  window.addEventListener('DOMContentLoaded', () => {
    onGetPost((querySnapshot) => {
      wallInputs.innerHTML = '';

      // Traer nombre de usuario
      querySnapshot.forEach((doc) => {
        const linkPhoto = 'https://imagizer.imageshack.com/img923/9210/UFd2QW.png';
        const photo = doc.data().photo ? doc.data().photo : linkPhoto;
        wallInputs.innerHTML += `
        <article class="post">
        <div class='post__user'>
          <object class='post__user-photo' data="https://imagizer.imageshack.com/img923/9210/UFd2QW.png" type="image/png">
          <img class='post__user-photo' src='${photo}' alt="profile picture">
          </object>
          <h2 class="post__username">${doc.data().name}</h2>
          <i class="post__edit-delete-button fa-solid fa-ellipsis"></i>
        </div>
        <p class="post__message">${doc.data().contentPost}</p>
        <div class="post__buttons">
        <div class="post__like-container">
          <button class="post__like-button"><i class="like-button-empty fa-regular fa-heart"></i><i class="like-button-solid fa-solid fa-heart"></i></button>
          <p class="post__like-counter"></p>
        </div>
        <div class="post__edit-delete-container">
          <button class="post__edit-button edit-delete-button-desktop"> <i class="fa-solid fa-pencil"></i></button>
          <button class="post__delete-button edit-delete-button-desktop"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
      </article>
          `;
      });
    });
  });

  addPostButton.addEventListener('click', () => {
    userNameAddPost.innerHTML = getCurrentUser();
    modalAddPost.style.display = 'flex';
    wallInputs.style.display = 'none';
  });

  closeAddPostModal.addEventListener('click', () => {
    modalAddPost.style.display = 'none';
    wallInputs.style.display = 'flex';
  });

  window.onclick = (event) => {
    if (event.target === modalAddPost) {
      modalAddPost.style.display = 'none';
      wallInputs.style.display = 'flex';
    }
  };

  postButton.addEventListener('click', () => {
    if (textAreaPost.value === '') {
      // eslint-disable-next-line no-alert
      alert('No hay mensaje');
    } else {
      savePost(textAreaPost.value);

      textAreaPost.innerHTML = '';
      modalAddPost.style.display = 'none';
      wallInputs.style.display = 'flex';
    }
  });

  return sectionWall;
};
