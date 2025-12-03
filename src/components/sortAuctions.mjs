import { getListings } from "../api/authService.mjs";
import { renderListings } from "../listings/renderListings.mjs";

const container = document.getElementById("listingsSectionContainer");
const sortPostsEl = document.getElementById("sortPostsEl");

export function initSortPosts() {
  sortPostsEl.addEventListener("input", async (event) => {
    const value = event.target.value;

    let sort = "created";
    let sortOrder = "desc";

    switch (value) {
      case "ending-soon":
        sort = "endsAt";
        sortOrder = "asc";
        break;
      case "ending-last":
        sort = "endsAt";
        sortOrder = "desc";
        break;
      case "most-bids":
        sort = "_count.bids";
        sortOrder = "desc";
        break;
      case "newest":
        sort = "created";
        sortOrder = "asc";
        break;

      case "oldest":
        sort = "created";
        sortOrder = "desc";
        break;

      // etc.
    }
    const { data } = await getListings({ sort, sortOrder });
    renderListings(container, data);
  });
}
