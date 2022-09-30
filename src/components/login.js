import {
  loginUser, googleSignIn, getCurrentUser,
} from '../lib/firebaseServices.js';

export const login = () => {
  const sectionLogin = document.createElement('section');
  sectionLogin.className = 'sectionLogin';
  sectionLogin.innerHTML = `
        <figure class="register__figure">
            <!--<img src="https://imagizer.imageshack.com/img922/3091/JEOR6i.png" alt="illustration" class="register__illustration">-->
            <img src="https://imagizer.imageshack.com/img923/4224/CKf4zk.png" alt="illustration" class="register__illustration">
        </figure>
        <div class="register__container">
            <img src="https://imagizer.imageshack.com/img924/341/OKd1u8.png
            " alt="logo" class="register__logo">
            <h2 class="register__title">Log in</h2>
            <form action="" class="register__form" id="login__form-id">
            <label for="login__email">Email</label>
            <input id="login__email" type="email" required>
            <p class="error login__message-error" id="login__email-not-found">Email not found</p>
            <label for="login__password">Password</label>
            <input id="login__password" type="password" required minlength='8'>
            <p class="error login__message-error" id="login__wrong-password">Wrong Password</p>
            <button id="login__button-id" class="button register__button" type="submit">Log in</button>
            </form>
            <p class="register__text">or</p>
            <button class="button register__button-google">
            <img class="register__logo-google" src="https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png
                " alt="logo-google">Sign in with Google
            </button>
            <p  class="register__text">Don't you have an account yet?<br><a href="#register">Create account</a></p>
        </div>
        `;

  const loginForm = sectionLogin.querySelector('#login__form-id');
  const loginEmail = sectionLogin.querySelector('#login__email');
  const loginPassword = sectionLogin.querySelector('#login__password');
  const loginErrorEmailNotFound = sectionLogin.querySelector('#login__email-not-found');
  const loginErrorWrongPassword = sectionLogin.querySelector('#login__wrong-password');

  loginForm.addEventListener('submit', (event) => {
    loginUser(loginEmail.value, loginPassword.value)
      .then(() => {
        window.location.hash = '#wall';
        getCurrentUser();
        loginForm.reset();
        loginErrorEmailNotFound.style.display = 'none';
        loginErrorWrongPassword.style.display = 'none';
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case 'auth/user-not-found':
            loginErrorEmailNotFound.style.display = 'block';
            loginErrorWrongPassword.style.display = 'none';
            break;
          case 'auth/wrong-password':
            loginErrorWrongPassword.style.display = 'block';
            loginErrorEmailNotFound.style.display = 'none';
            break;
          default:
            break;
        }
      });
    event.preventDefault();
  });

  const googleButton = sectionLogin.querySelector('.register__button-google');
  googleButton.addEventListener('click', () => {
    googleSignIn()
      .then(() => {
        window.location.hash = '#wall';
        getCurrentUser();
      })
      .catch(() => {
      });
  });

  return sectionLogin;
};
