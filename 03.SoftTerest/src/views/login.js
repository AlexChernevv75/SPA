import { login } from "../api/user.js"
const section = document.getElementById("loginView");
const form = section.querySelector("form");
form.addEventListener("submit", onSubmit);

let ctx = 0;
export function showLogin(context){
    ctx = context;
    context.showSection(section);
}

async function onSubmit(ev){
    ev.preventDefault();
    const formData = new FormData(form);
    const { email, password } = Object.fromEntries(formData);

    await login(email, password);
    ctx.updateNav();
    ctx.goTo("/catalog")
}