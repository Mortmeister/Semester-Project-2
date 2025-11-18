// src/listings/renderListings.js
// import { getListings } from "../api/authService.mjs";
import { listingCardMarkup } from "../components/listingCardUi.mjs";

export async function renderListings(container, listings) {
  try {
    container.innerHTML = listings
      .map((listing) => listingCardMarkup(listing))
      .join("");
  } catch (error) {
    console.error("Error rendering listings", error);
    container.innerHTML = `<p class="text-danger">Failed to load listings.</p>`;
  }
}
