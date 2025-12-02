import { getListings } from "../api/authService.mjs";
import { renderListings } from "../listings/renderListings.mjs";

const container = document.getElementById("listingsSectionContainer");
const sortPostsEl = document.getElementById("sortPostsEl");

export function initSortPosts() {
  sortPostsEl.addEventListener("input", async (event) => {
    const value = event.target.value;
    let { data } = await getListings();

    switch (value) {
      case "ending-soon":
        data = data.sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt));

        break;

      case "most-bids":
        data = data.sort((a, b) => b._count.bids - a._count.bids);
        break;

      case "newest":
        data = data.sort((a, b) => new Date(b.created) - new Date(a.created));
        break;

      default:
        data = data.sort((a, b) => new Date(b.created) - new Date(a.created));
    }

    renderListings(container, data);
  });
}
