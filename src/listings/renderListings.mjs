// src/listings/renderListings.js
import {
  listingCardMarkup,
  listingProfileCardMarkup,
} from "../components/listingCardUi.mjs";

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

export async function renderProfileListings(container, listings) {
  try {
    container.innerHTML = listings
      .map((listing) => listingProfileCardMarkup(listing))
      .join("");
  } catch (error) {
    console.error("Error rendering listings", error);
    container.innerHTML = `<p class="text-danger">Failed to load listings.</p>`;
  }
}
