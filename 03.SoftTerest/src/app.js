import { showHome } from "./views/home.js";
import { showDashboard } from "./views/catallog.js";
import { showRegister } from "./views/register.js";
import { showLogin } from "./views/login.js";
import { showDetails } from "./views/details.js";
import { showCreate } from "./views/create.js";
import { init } from "./router.js";

// const homeView = document.getElementById("homeView");
// const registerView = document.getElementById("registerView");
// const loginView = document.getElementById("loginView");
// const dashboard = document.getElementById("dashboard-holder")
// const detailsView = document.getElementById("detailsView");
// const createView = document.getElementById("createView");
const defaultSection = document.getElementById("defaultSection");
defaultSection.remove();

const links = {
    "/": showHome,
    "/catalog": showDashboard,
    "/register": showRegister,
    "/login": showLogin,
    "/details": showDetails,
    "/create": showCreate
}

const router = init(links);

router.updateNav();
router.goTo("/");

