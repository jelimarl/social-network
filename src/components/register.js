export const register = () => {
    const sectionRegister = document.createElement('section');
        sectionRegister.className = 'sectionRegister';
        sectionRegister.innerHTML =
        `
        <figure class="register__figure">
            <img src="https://imagizer.imageshack.com/img922/3091/JEOR6i.png" alt="illustration" class="register__illustration">
        </figure>
        <div class="register__container">
            <img src="https://imagizer.imageshack.com/img924/341/OKd1u8.png
            " alt="logo" class="register__logo">
            <h2 class="register__title">Create account</h2>
            <form action="" class="register__form">
            <label for="register__username">Username</label>
            <input id="register__username" type="text" required maxlength='20'>
            <label for="register__email">Email</label>
            <input id="register__email" type="email" required>
            <label for="register__password">Password</label>
            <input id="register__password" type="password" required minlength='8'>
            <button class="button register__button" type="submit">Create</button>
            </form>
            <p class="register__text">or</p>
            <button class="button register__button-google">
            <img class="register__logo-google" src="https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png
                " alt="logo-google">Sign in with Google
            </button>
            <p  class="register__text">Already have an account?<a href=""> Sign in</a></p>
        </div>
        `
    return sectionRegister;
}