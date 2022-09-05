import { welcome } from "./components/welcome.js"
import { register } from "./components/register.js"
import { createUser } from "./lib/auth.js";

// Routing events
const root = document.getElementById('root');

const showSection = () => {
    if (window.location.hash === '#register') {
        root.replaceChildren(register());

        const registerForm = document.getElementById("register__form-id");
        const registerButton = document.getElementById("register__button-id");
        const registerUsername= document.getElementById("register__username");
        const registerEmail = document.getElementById("register__email");
        const registerEmailValue = registerEmail.value;
        const registerPassword = document.getElementById("register__password");
        const registerPasswordValue = registerPassword.value;

        registerForm.addEventListener("submit", (event) => {
            createUser(registerEmail.value, registerPassword.value);
        } )
    } else {
        root.replaceChildren(welcome());
    }
}

window.addEventListener('hashchange', showSection)
window.addEventListener('load', showSection)

