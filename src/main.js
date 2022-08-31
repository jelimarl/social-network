import { welcome } from "./components/welcome.js"
import {register} from "./components/register.js"

const root = document.getElementById('root');

const routes = {
    '/': welcome,
    '/register': register
}

root.appendChild(welcome());