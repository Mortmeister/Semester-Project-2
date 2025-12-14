import { getListings } from "../api/auth-service.mjs";
import { renderListings } from "../listings/render-listings.mjs";
import { listingSkeleton } from "./loading.mjs";

const container = document.getElementById("listingsSectionContainer");
const sortPostsEl = document.getElementById("sortPostsEl");
const sortByTagsEl = document.getElementById("sortByTagsEl");

export async function initSortByTags() {
  try {
    const { data: listings } = await getListings({
      limit: 100,
      includeSeller: false,
      includeBids: false,
    });

    if (!sortByTagsEl) return;

    const resetOption = document.createElement("option");
    resetOption.value = "";
    resetOption.textContent = "Sort by tags";
    sortByTagsEl.appendChild(resetOption);

    const tagCount = {};

    listings.forEach((listing) => {
      listing.tags?.forEach((tag) => {
        const normalized = tag.trim().toLowerCase();
        tagCount[normalized] = (tagCount[normalized] || 0) + 1;
      });
    });

    const sortedTags = Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    sortedTags.forEach(([tag]) => {
      const option = document.createElement("option");
      const formatted = tag.charAt(0).toUpperCase() + tag.slice(1);

      option.value = tag;
      option.textContent = formatted;
      sortByTagsEl.appendChild(option);
    });

    sortByTagsEl.addEventListener("change", async (event) => {
      const selectedTag = event.target.value;

      container.innerHTML = listingSkeleton(6);

      if (selectedTag === "") {
        const { data } = await getListings({
          limit: 18,
          sort: "created",
          sortOrder: "desc",
        });
        renderListings(container, data);
        return;
      }

      const { data } = await getListings({
        limit: 100,
        includeSeller: true,
        includeBids: true,
        tag: selectedTag,
      });
      renderListings(container, data);
    });
  } catch (error) {
    console.error("Failed to load tags:", error);
  }
}

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
      case "newest":
        sort = "created";
        sortOrder = "desc";
        break;

      case "oldest":
        sort = "created";
        sortOrder = "asc";
        break;
    }

    container.innerHTML = listingSkeleton(6);

    const { data } = await getListings({ sort, sortOrder });
    renderListings(container, data);
  });
}
