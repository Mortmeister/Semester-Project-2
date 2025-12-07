import { searchPosts, getListings } from "../api/auth-service.mjs";
import { renderListings } from "../listings/render-listings.mjs";

const container = document.getElementById("listingsSectionContainer");
const searchPostsEl = document.getElementById("searchForPosts");

export function initSearchPosts() {
  searchPostsEl.addEventListener("input", async (event) => {
    console.log(event.target.value);
    let target = event.target.value.trim();

    if (target.length === 0) {
      const { data } = await getListings();
      renderListings(container, data);
      return;
    }
    const { data } = await searchPosts(target);

    renderListings(container, data);
  });
}
