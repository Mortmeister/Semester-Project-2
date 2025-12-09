import { initCreateListingForm } from "../components/create-listing-form.mjs";
import { isAuthenticated, handleUnauthorizedAccess } from "../utils/auth.mjs";
import { loadHeader } from "../components/header.mjs";

if (!isAuthenticated()) {
  handleUnauthorizedAccess("You must be logged in to create a listing.");
} else {
  loadHeader();
  initCreateListingForm();
}
