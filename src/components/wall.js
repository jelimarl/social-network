/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import {
  savePost, onGetPost, getCurrentUser, currentUser, deletePost, getPost, editPost, logOut,
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
    <p class="wall__logout-text">Log out</p>
    <i class="wall__logout-icon fa-solid fa-person-walking-arrow-right"></i>
  </div>
</header>
<section class="wall__inputs">
</section>
<div class="post__container-edit-delete-modal">
<section class="post__edit-delete-modal">
  <div class='edit__button'>
    <button class="post__edit-button  edit-delete-button-mobile"><div><i class="fa-solid fa-pencil"></i></div></button>
    <p class="post__edit-delete-text">Edit</p>
  </div>
  <div class='delete__button'>
    <button class="post__delete-button edit-delete-button-mobile"><div><i class="fa-solid fa-trash"></i></div></button>
    <p class="post__edit-delete-text">Delete</p>
  </div>
</section>
</div>
<div class="wall__container-add-post-modal">
  <section class="wall__add-post-modal">
    <div class="wall__modal-info-user">
      <div class="wall__modal-user">
      </div>
      <i class="wall__button wall__modal-exit-button fa-solid fa-xmark"></i>
    </div>
    <textarea max-length="2200" placeholder="Add something..." class="wall__modal-add-text"></textarea>
    <div class="wall__modal-buttons">
      <!--<button class="wall__button wall__add-image-button"><i class="fa-regular fa-image"></i>Add image</button>-->
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
  const userInfoAddPostModal = sectionWall.querySelector('.wall__modal-user');
  const logOutButtonIcon = sectionWall.querySelector('.wall__logout-icon');
  const logOutButtonText = sectionWall.querySelector('.wall__logout-text');
  let editStatus = false;
  let docID = '';

  // eslint-disable-next-line padded-blocks
  window.addEventListener('DOMContentLoaded', () => {
    getCurrentUser();
    onGetPost((querySnapshot) => {
      wallInputs.innerHTML = '';

      // Traer nombre de usuario
      querySnapshot.forEach((doc) => {
        const linkPhoto = 'https://imagizer.imageshack.com/img923/9210/UFd2QW.png';
        const photo = doc.data().photo ? doc.data().photo : linkPhoto;
        wallInputs.innerHTML += `
        <article class="post">
        <div class='post__user'>
          <div class='post__user-info'>
            <object class='post__user-photo' data="https://imagizer.imageshack.com/img923/9210/UFd2QW.png" type="image/png">
            <img class='post__user-photo' src='${photo}' alt="profile picture">
            </object>
            <h2 class="post__username">${doc.data().name}</h2>
          </div>
          <i class="post__edit-delete-button fa-solid fa-ellipsis"></i>
        </div>
        <p class="post__message">${doc.data().contentPost}</p>
        <div class="post__buttons">
        <div class="post__like-container">
          <button class="post__like-button"><i class="like-button-empty fa-regular fa-heart"></i><i class="like-button-solid fa-solid fa-heart"></i></button>
          <p class="post__like-counter"></p>
        </div>
        <div class="post__edit-delete-container">
          <button class="post__edit-button edit-delete-button-desktop"><i class="fa-regular fa-pen-to-square" data-id='${doc.id}'></i>
          </button>
          <button class="post__delete-button edit-delete-button-desktop"><i class="fa-regular fa-trash-can" data-id='${doc.id}'></i>
          </button>
        </div>
        </div>
        </article>
        `;

        // Like & dislike
        // const likeButton = wallInputs.querySelectorAll('.like-button-empty');
        // const unlikeButton = wallInputs.querySelectorAll('.like-button-solid');
        // console.log('like', likeButton)
        // console.log('unlike', unlikeButton)
        // likeButton.forEach((like) => {
        //   like.addEventListener('click', () => {
        //     like.style.display = 'none';
        //     // unlikeButton.style.display = 'block';
        //   });
        // });

        // unlikeButton.forEach((unlike) => {
        //   unlike.addEventListener('click', () => {
        //     unlikeButton.style.display = 'none';
        //     likeButton.style.display = 'block';
        //   });
        // });

        // modal esit & delete
        // const buttonModalDeleteEdit = wallInputs.querySelectorAll('.post__edit-delete-button');
        // eslint-disable-next-line max-len
        // const modalDeleteEditeContainer = sectionWall.querySelector('.post__container-edit-delete-modal');
        // const buttonDelete = sectionWall.querySelector('.delete__button');

        // wallInputs.addEventListener('click', (event) => {
        //   if (event.target.dataset.id) {
        //     modalDeleteEditeContainer.style.display = 'flex';
        //     wallInputs.style.display = 'none';
        //   }
        // });

        // buttonDelete.addEventListener('click', (event) => {
        //   console.log(event.target.dataset.id)
        // });
        // buttonModalDeleteEdit.forEach((button) => {
        //   button.addEventListener('click', (event) => {
        //     modalDeleteEditeContainer.style.display = 'flex';
        //     wallInputs.style.display = 'none';
        //     buttonDelete.addEventListener('click', () => {
        //       const dataID = event.target.dataset.id;
        //       if (confirm('Do you want delete the message?')) {
        //         deletePost(dataID);
        //         modalDeleteEditeContainer.style.display = 'none';
        //         wallInputs.style.display = 'flex';
        //       }
        //     });
        //     console.log(buttonDelete);
        //   });
        // });

        const deleteButton = wallInputs.querySelectorAll('.post__delete-button');
        const editButton = wallInputs.querySelectorAll('.post__edit-button');

        // Delete post
        deleteButton.forEach((button) => {
          button.addEventListener('click', (event) => {
            const dataID = event.target.dataset.id;
            if (confirm('Do you want to delete the post?')) {
              deletePost(dataID);
            }
          });
        });

        // Edit post
        editButton.forEach((button) => {
          button.addEventListener('click', (event) => {
            docID = event.target.dataset.id;
            editStatus = true;

            modalAddPost.style.display = 'flex';
            postButton.innerText = 'Update';
            wallInputs.style.display = 'none';

            getPost(docID)
              .then((document) => {
                const post = document.data();

                userInfoAddPostModal.innerHTML = `
                <object class='wall__modal-profile-picture' data="https://imagizer.imageshack.com/img923/9210/UFd2QW.png" type="image/png">
                <img class="wall__modal-profile-picture" src="${post.photo}" alt="Profile Picture">
                </object>
                <h2 class="wall__modal-user-name">${post.name}</h2>
                `;

                textAreaPost.value = `${post.contentPost}`;
              });
          });
        });

        // close modals
        window.onclick = (event) => {
          if (event.target === modalAddPost) {
            modalAddPost.style.display = 'none';
            wallInputs.style.display = 'flex';
          }
        };
      });
    });
  });

  addPostButton.addEventListener('click', () => {
    userInfoAddPostModal.innerHTML = `
    <object class='wall__modal-profile-picture' data="https://imagizer.imageshack.com/img923/9210/UFd2QW.png" type="image/png">
    <img class="wall__modal-profile-picture" src="${currentUser.photoURL}" alt="Profile Picture">
    </object>
    <h2 class="wall__modal-user-name">${currentUser.displayName}</h2>
    `;
    textAreaPost.value = '';
    modalAddPost.style.display = 'flex';
    postButton.innerText = 'Post';
    wallInputs.style.display = 'none';
  });

  closeAddPostModal.addEventListener('click', () => {
    modalAddPost.style.display = 'none';
    wallInputs.style.display = 'flex';
  });

  postButton.addEventListener('click', () => {
    if (textAreaPost.value === '') {
      // eslint-disable-next-line no-alert
      alert('No hay mensaje');
    } else {
      if (!editStatus) {
        const date = Date.now();
        savePost(textAreaPost.value, date);
      } else {
        editPost(docID, { contentPost: textAreaPost.value });
        editStatus = false;
      }

      modalAddPost.style.display = 'none';
      wallInputs.style.display = 'flex';
    }
  });

  logOutButtonIcon.addEventListener('click', () => {
    if (confirm('Are you sure you want to leave?')) {
      logOut()
        .then(() => {
          // console.log('Hola');
          window.location.hash = '';
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  logOutButtonText.addEventListener('click', () => {
    if (confirm('Are you sure you want to leave?')) {
      logOut()
        .then(() => {
          // console.log('Hola');
          window.location.hash = '';
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  return sectionWall;
};
