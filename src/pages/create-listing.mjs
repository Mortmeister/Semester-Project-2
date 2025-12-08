import { initCreateListingForm } from "../components/create-listing-form.mjs";
import { isAuthenticated, handleUnauthorizedAccess } from "../utils/auth.mjs";

if (!isAuthenticated()) {
  handleUnauthorizedAccess("You must be logged in to create a listing.");
} else {
  initCreateListingForm();
}
