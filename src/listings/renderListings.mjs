// src/listings/renderListings.js

import { getListings } from "../api/authService.mjs";
import { listingCardMarkup } from "../components/listingCardUi.mjs";

export async function renderListings(containerSelector) {
  const container = document.querySelector(containerSelector);

  try {
    const { data } = await getListings();

    container.innerHTML = data
      .map((listing) => listingCardMarkup(listing))
      .join("");
  } catch (error) {
    console.error("Error rendering listings", error);
    container.innerHTML = `<p class="text-danger">Failed to load listings.</p>`;
  }
}
