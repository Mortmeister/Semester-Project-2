import { initRegisterForm } from "./components/registerForm.mjs";
import { initLoginForm } from "./components/loginForm.mjs";
import { getUserProfile } from "./api/authService.mjs";

initRegisterForm();
getUserProfile();
initLoginForm();
