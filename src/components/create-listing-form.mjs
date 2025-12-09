import { createListing } from "../api/auth-service.mjs";
import { isAuthenticated, handleUnauthorizedAccess } from "../utils/auth.mjs";
import { initImagePreview } from "./image-preview.mjs";

export function initCreateListingForm() {
  const createListingFormEl = document.getElementById("createListingForm");
  if (!createListingFormEl) return;

  initImagePreview();

  createListingFormEl.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!isAuthenticated()) {
      handleUnauthorizedAccess("You must be logged in to create a listing.");
      return;
    }

    const formData = new FormData(createListingFormEl);
    const payload = {
      title: formData.get("title"),
      description: formData.get("description"),
      media: [
        {
          url: formData.get("imageUrl"),
          alt: formData.get("imageAlt"),
        },
      ],
      endsAt: formData.get("endsAt"),
    };

    try {
      const { data } = await createListing(payload);
      console.log("Listing created:", data);
      window.location.href = "../profile/index.html";
    } catch (error) {
      console.error("Create listing error:", error);
      alert("Failed to create listing. Check your input.");
    }
  });
}
