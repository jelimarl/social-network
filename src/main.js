import { welcome } from "./components/welcome.js"
import { register } from "./components/register.js"

const root = document.getElementById('root');

///const changeRoute = (hash) => {
//window.history.replaceState({}, 'register', '/register')
//}

const showSection = () => {

    if (window.location.hash === '#register') {
        root.replaceChildren(register());
        //changeRoute(window.location.hash);

    } else {
        root.replaceChildren(welcome());
    }
}

window.addEventListener('hashchange', showSection)

window.addEventListener('load', showSection)