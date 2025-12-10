import { renderSingleListing } from "../listings/render-listings.mjs";
import { getSingleListing } from "../api/auth-service.mjs";
import { getParam } from "../utils/get-params.mjs";
import { initBidForm } from "../listings/bid-on-listing.mjs";
import { isAuthenticated } from "../utils/auth.mjs";
import { loadingSpinner } from "./loading.mjs";

export async function loadSinglePage() {
  const id = getParam("id");
  if (!id) {
    console.error("No ID found in URL");
    return;
  }
  const container = document.getElementById("singlePageContainer");
  if (!container) return;

  container.innerHTML = loadingSpinner();

  try {
    const { data } = await getSingleListing(id);
    await renderSingleListing(container, data);

    setTimeout(() => {
      initImageGallery(data);
    }, 0);

    if (isAuthenticated()) {
      initBidForm(id);
    } else {
      const bidForm = document.getElementById("bidOnAuctionForm");
      if (bidForm) {
        bidForm.classList.add("d-none");
      }
    }
  } catch (error) {
    console.error("Failed to load listing:", error);
    container.innerHTML = `<p class="text-danger">Failed to load listing. Please try again.</p>`;
  }
}

function initImageGallery(listing) {
  const media = listing?.media ?? [];
  if (!media || media.length <= 1) return;

  const thumbnails = document.querySelectorAll(".listing-detail__thumbnail");
  const mainImage = document.getElementById("mainImage");

  if (!thumbnails.length || !mainImage) return;

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
      const imageData = media[index];
      if (!imageData) return;

      mainImage.src = imageData.url;
      mainImage.alt = imageData.alt || "Listing image";

      thumbnails.forEach((thumb) => {
        thumb.classList.remove("listing-detail__thumbnail--active");
      });
      thumbnail.classList.add("listing-detail__thumbnail--active");
    });
  });
}
