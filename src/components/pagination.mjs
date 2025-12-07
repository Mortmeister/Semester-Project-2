import { getListings } from "../api/auth-service.mjs";
import { renderListings } from "../listings/render-listings.mjs";

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

  const { data, meta } = await getListings({ page: currentPage });

  await renderListings(container, data);

  updatePaginationButtons(meta);
}

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadListings();
  }
});

nextBtn.addEventListener("click", () => {
  currentPage++;
  loadListings();
});
