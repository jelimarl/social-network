export const wall = () => {
  const sectionWall = document.createElement('section');
  sectionWall.className = 'sectionWall';
  sectionWall.innerHTML = `
   <header class="wall__header">
   <div class="wall__brand">    
     <img class="wall__logo" src="https://imagizer.imageshack.com/img924/341/OKd1u8.png" alt="logo">
     <h2 class="wall__title">SysTEM</h2>
   </div>
   <div class="wall__logout">
     <p>Log out</p>
   </div>
 </header>
 <section class="wall__inputs">
 </section>
 <footer class="wall__footer">
   <span class="wall__button-add">+</span>
 </footer>
   `;
  return sectionWall;
};
