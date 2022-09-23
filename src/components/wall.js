import {
  savePost, onGetPost, getUserInfo,
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
  <div class="wall__container-add-post-modal">
    <section class="wall__add-post-modal">
      <div class="wall__modal-info-user">
        <div class="wall__modal-user">
          <img class="wall__modal-profile-picture" src="http://imageshack.com/f/posCILFZp" alt="Profile Picture">
          <h2 class="wall__modal-user-name"> Nunito</h2>
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

  window.addEventListener('DOMContentLoaded', () => {
    const users = {};
    getUserInfo()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          users[doc.data().userEmail] = doc.data().userName;
        });
      });
    onGetPost((querySnapshot) => {
      wallInputs.innerHTML = '';

      // Traer nombre de usuario
      querySnapshot.forEach((doc) => {
        let nameUser;
        const userEntries = Object.entries(users);
        if (!doc.data().name) {
          userEntries.forEach(([key, value]) => {
            if (doc.data().email === key) {
              nameUser = value;
            }
          });
        } else {
          nameUser = doc.data().name;
        }
        // console.log(nameUser);
        const linkPhoto = 'https://imagizer.imageshack.com/img923/9210/UFd2QW.png';
        const photo = doc.data().photo ? doc.data().photo : linkPhoto;
        wallInputs.innerHTML += `
            <article class="post">
            <div class='post__user'>
              <img class='post__user-photo' src=${photo} alt="profile picture">
              <h2  class="post__username">${nameUser}</h2>
            </div>
            <p class="post__message">${doc.data().contentPost}</p>
          </article>
          `;
      });
    });
  });

  addPostButton.addEventListener('click', () => {
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
