export function init(links){
    const main = document.getElementById("main");
    document.querySelector("nav").addEventListener("click", onNav);

    const context = {
        showSection,
        goTo,
        updateNav
    }

    return context;

    function onNav(ev){
        ev.preventDefault();
        let target = ev.target;
        if (target.tagName === "IMG"){
            target = target.parentElement;
        }
        if (target.tagName === "A"){
            const url = new URL(target.href);
            goTo(url.pathname)
        }
    }

    function goTo(name){
        const handler = links[name];
        if (typeof(handler) === "function"){
            handler(context)
        }
    }

    function showSection(section){
        main.replaceChildren(section);
    }

    function updateNav(){
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (user){
            document.querySelectorAll(".user").forEach( e => e.style.display = "block");
            document.querySelectorAll(".guest").forEach( e => e.style.display = "none");
        }
        else{
            document.querySelectorAll(".user").forEach( e => e.style.display = "none");
            document.querySelectorAll(".guest").forEach( e => e.style.display = "block");
        }
    }

}