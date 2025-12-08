import { searchPosts, getListings } from "../api/auth-service.mjs";
import { renderListings } from "../listings/render-listings.mjs";
import { listingSkeleton } from "./loading.mjs";

const container = document.getElementById("listingsSectionContainer");
const searchPostsEl = document.getElementById("searchForPosts");

export function initSearchPosts() {
  if (!searchPostsEl || !container) return;

  searchPostsEl.addEventListener("input", async (event) => {
    console.log(event.target.value);
    let target = event.target.value.trim();

    container.innerHTML = listingSkeleton(6);

    if (target.length === 0) {
      const { data } = await getListings();
      renderListings(container, data);
      return;
    }
    const { data } = await searchPosts(target);

    renderListings(container, data);
  });
}
