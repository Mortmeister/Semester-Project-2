import { updateListing } from "../api/authService.mjs";

const listingEl = document.getElementById("myListings");

export async function initUpdateDelegation() {
  listingEl.addEventListener("click", async (event) => {
    const btn = event.target.closest("[data-action='update-listing']");
    if (!btn) return;

    const listingId = btn.dataset.listingId;
    if (!listingId) return;
    const confirmUpdate = confirm(
      "Are you sure you want to update this listing?"
    );
    if (!confirmUpdate) return;

    try {
      await updateListing(listingId);
      location.reload();

      alert("Listing Updated successfully.");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to Update listing.");
    }
  });
}
