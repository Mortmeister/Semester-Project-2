// components/deleteHandler.mjs
import { deleteListing } from "../api/authService.mjs";
const listingEl = document.getElementById("myListings");

export async function initDeleteDelegation() {
  listingEl.addEventListener("click", async (event) => {
    const btn = event.target.closest("[data-action='delete-listing']");
    if (!btn) return;

    const listingId = btn.dataset.listingId;
    if (!listingId) return;
    const confirmDelete = confirm(
      "Are you sure you want to delete this listing?"
    );
    if (!confirmDelete) return;

    try {
      await deleteListing(listingId);
      location.reload();

      alert("Listing deleted successfully.");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete listing.");
    }
  });
}
