import { welcome } from "./components/welcome.js"
import { register } from "./components/register.js"
import { wall } from "./components/wall.js"

// Routing events
const root = document.getElementById('root');

const template = {
    '': welcome(),
    '#register': register(),
    '#wall': wall(),
}

const showSection = () => {
    let hash = window.location.hash;
    root.replaceChildren(template[hash]);
}

window.addEventListener('hashchange', showSection)
window.addEventListener('load', showSection)


const registerForm = sectionRegister.querySelector("#register__form-id");
const registerButton = sectionRegister.querySelector("#register__button-id");
const registerUsername= sectionRegister.querySelector("#register__username");
const registerEmail = sectionRegister.querySelector("#register__email");
const registerPassword = sectionRegister.querySelector("#register__password");

registerForm.addEventListener("submit", (event) => {
    createUser(registerEmail.value, registerPassword.value)
    .then(()=>{
        window.location.hash = '#wall';
        window.addEventListener('hashchange', showSection);
    })
    .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
    })
} )