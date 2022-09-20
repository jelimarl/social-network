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

  addPostButton.addEventListener('click', () => {
    modalAddPost.style.display = 'flex';
  });

  closeAddPostModal.addEventListener('click', () => {
    modalAddPost.style.display = 'none';
  });

  window.onclick = (event) => {
    if (event.target === modalAddPost) {
      modalAddPost.style.display = 'none';
    }
  };

  return sectionWall;
};
