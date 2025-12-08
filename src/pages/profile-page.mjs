import { loadHeader } from "../components/header.mjs";
import {
  prefillForm,
  initUpdateProfileForm,
} from "../components/edit-profile.mjs";
import {
  initTabSwitching,
  initProfileEditToggle,
  loadProfilePage,
} from "../components/profile-page.mjs";
import { isAuthenticated, handleUnauthorizedAccess } from "../utils/auth.mjs";

if (!isAuthenticated()) {
  handleUnauthorizedAccess("You must be logged in to view your profile.");
} else {
  loadHeader();
  initTabSwitching();
  initProfileEditToggle();
  loadProfilePage();
  prefillForm();
  initUpdateProfileForm();
}
