import { initRegisterForm } from "./components/register-form.mjs";
import { initLoginForm } from "./components/login-form.mjs";
import { getUserProfile } from "./api/auth-service.mjs";

initRegisterForm();
getUserProfile();
initLoginForm();
