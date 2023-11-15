import { register } from "../api/user.js";

const section = document.getElementById("registerView");
const form = section.querySelector("form");
form.addEventListener("submit", onSubmit);

let ctx = 0;

export function showRegister(context){
    ctx = context;
    context.showSection(section);
}

async function onSubmit(ev){
    ev.preventDefault();
    const formData = new FormData(form);
    const { email, password, repeatPassword } = Object.fromEntries(formData);

    if (password != repeatPassword){
        alert("passwords do not match");
    } else{
       await register(email, password);
       ctx.updateNav();
       ctx.goTo("/catalog");
    }
}