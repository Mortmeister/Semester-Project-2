import { getListings } from "../api/auth-service.mjs";
import { renderListings } from "../listings/render-listings.mjs";
import { listingSkeleton } from "./loading.mjs";

export function resetPage() {
  currentPage = 1;
}

let currentPage = 1;

/*
Disable next button if no nextPage in meta or if we got fewer than 18 listings. 
*/
export function updatePaginationButtons(meta, listingsCount) {
  const pageIndicator = document.getElementById("pageIndicator");
  pageIndicator.textContent = `Page ${currentPage}`;

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!prevBtn || !nextBtn) return;

  if (pageIndicator) {
    pageIndicator.textContent = `Page ${currentPage}`;
  }

  prevBtn.disabled = currentPage === 1;

  const hasNextPage = meta?.nextPage;
  const isLastPage = listingsCount < 18;

  if (hasNextPage && !isLastPage) {
    nextBtn.disabled = false;
  } else {
    nextBtn.disabled = true;
  }
}

export async function loadListings() {
  const container = document.getElementById("listingsSectionContainer");
  if (!container) return;

  container.innerHTML = listingSkeleton(6);

  try {
    const { data, meta } = await getListings({ page: currentPage });
    await renderListings(container, data);

    const listingsCount = data?.length ?? 0;
    updatePaginationButtons(meta, listingsCount);

    const listingsCountEl = document.getElementById("listingsCount");
    if (listingsCountEl) {
      listingsCountEl.textContent = `${listingsCount} listing${
        listingsCount !== 1 ? "s" : ""
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
