import { getListings } from "../api/auth-service.mjs";
import { renderListings } from "../listings/render-listings.mjs";
import { listingSkeleton } from "./loading.mjs";

const container = document.getElementById("listingsSectionContainer");
const sortPostsEl = document.getElementById("sortPostsEl");

export function initSortPosts() {
  if (!sortPostsEl || !container) return;

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
    }

    container.innerHTML = listingSkeleton(6);

    const { data } = await getListings({ sort, sortOrder });
    renderListings(container, data);
  });
}
