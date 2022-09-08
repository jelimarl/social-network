import { createUser } from "./lib/firebaseServices.js";

export const registerUsers = ()=>{
    const registerForm = sectionRegister.querySelector("#register__form-id");
    const registerEmail = sectionRegister.querySelector("#register__email");
    const registerPassword = sectionRegister.querySelector("#register__password");
    const registerErrorInvalid = sectionRegister.querySelector("#register__invalid-email");
    const registerErrorInUse = sectionRegister.querySelector("#register__already-in-use-email");

    registerForm.addEventListener("submit", (event) => {
        createUser(registerEmail.value, registerPassword.value)
            .then(() => {
                window.location.hash = "#wall";
            })
            .catch((error) => {
                const errorCode = error.code;
                switch (errorCode) {
                    case "auth/email-already-in-use":
                        registerErrorInUse.style.display = "block";
                        registerErrorInvalid.style.display = "none";
                        break;
                    case "auth/invalid-email":
                        registerErrorInvalid.style.display = "block";
                        registerErrorInUse.style.display = "none";
                        break;
                    default:
                        break;
                }
            });
        event.preventDefault();
    });
}
