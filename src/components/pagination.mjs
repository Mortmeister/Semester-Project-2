import { getListings } from "../api/auth-service.mjs";
import { renderListings } from "../listings/render-listings.mjs";
import { listingSkeleton } from "./loading.mjs";

let currentPage = 1;

function updatePaginationButtons(data) {
  const pageIndicator = document.getElementById("pageIndicator");
  pageIndicator.textContent = `Page ${currentPage}`;

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  prevBtn.disabled = currentPage === 1;

  if (data?.nextPage) {
    nextBtn.disabled = false;
  } else {
    nextBtn.disabled = true;
  }
}

export async function loadListings() {
  const container = document.getElementById("listingsSectionContainer");
  if (!container) return;

  // Show loading skeleton
  container.innerHTML = listingSkeleton(6);

  try {
    const { data, meta } = await getListings({ page: currentPage });
    await renderListings(container, data);
    updatePaginationButtons(meta);

    // Update listings count
    const listingsCountEl = document.getElementById("listingsCount");
    if (listingsCountEl) {
      const count = data?.length ?? 0;
      listingsCountEl.textContent = `${count} listing${
        count !== 1 ? "s" : ""
      } available`;
    }
  } catch (error) {
    console.error("Failed to load listings:", error);
    container.innerHTML = `<p class="text-danger">Failed to load listings. Please try again.</p>`;
  }
}

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      loadListings();
    }
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    currentPage++;
    loadListings();
  });
}
