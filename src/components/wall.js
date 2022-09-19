export const wall = () => {
  const sectionWall = document.createElement('section');
  sectionWall.className = 'sectionWall';
  sectionWall.innerHTML = `
  <header class="wall__header">
  <div class="wall__brand">
    <img class="wall__logo" src="http://imageshack.com/f/pncGMbEEp" alt="logo">
    <h2 class="wall__title">SysTEM</h2>
  </div>
  <div class="wall__logout">
    <p>Log out</p>
    <i class="fa-solid fa-person-walking-arrow-right"></i>
  </div>
</header>
<section class="wall__inputs">
</section>
<div class="wall__container-add-post-modal">
  <section class="wall__add-post-modal">
    <div class="wall__modal-info-user">
      <img class="wall__modal-profile-picture" src="http://imageshack.com/f/posCILFZp" alt="Profile Picture">
      <h2 class="wall__modal-user-name">Nunito</h2>
      <i class=" wall__modal-exit-button fa-solid fa-xmark"></i>
    </div>
    <textarea class="wall__modal-add-text">Add something...</textarea>
    <div class="wall__modal-buttons">
      <button class="wall__add-image-button"><i class="fa-regular fa-image"></i> Add image</button>
      <button class="wall__post-button">Post</button>
    </div>
  </section>
</div>
<footer class="wall__footer">
  <span class="wall__button-add">+</span>
</footer>
  `;
  return sectionWall;
};
