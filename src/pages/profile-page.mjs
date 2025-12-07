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

loadHeader();
initTabSwitching();
initProfileEditToggle();
loadProfilePage();
prefillForm();
initUpdateProfileForm();
