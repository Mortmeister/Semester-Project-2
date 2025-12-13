import { initRegisterForm } from "./components/register-form.mjs";
// import { getUserProfile } from "./api/auth-service.mjs";
import { initHamburgerMenu } from "./components/header.mjs";
import { loadHeader } from "./components/header.mjs";
import { initLoginForm } from "./components/login-form.mjs";

loadHeader();
initRegisterForm();
// getUserProfile();
initLoginForm();
initHamburgerMenu();
