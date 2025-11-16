import { initRegisterForm } from "./components/registerForm.mjs";
import { initLoginForm } from "./components/loginForm.mjs";

import { renderListings } from "./listings/renderListings.mjs";

// Run on page load
renderListings("#listingsSectionContainer");

initRegisterForm();
initLoginForm();
