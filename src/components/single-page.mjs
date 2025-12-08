import { renderSingleListing } from "../listings/render-listings.mjs";
import { getSingleListing } from "../api/auth-service.mjs";
import { getParam } from "../utils/get-params.mjs";
import { initBidForm } from "../listings/bid-on-listing.mjs";
import { isAuthenticated } from "../utils/auth.mjs";

export async function loadSinglePage() {
  const id = getParam("id");
  if (!id) {
    console.error("No ID found in URL");
    return;
  }
  const container = document.getElementById("singlePageContainer");
  const { data } = await getSingleListing(id);
  await renderSingleListing(container, data);

  if (isAuthenticated()) {
    initBidForm(id);
  } else {
    const bidForm = document.getElementById("bidOnAuctionForm");
    if (bidForm) {
      bidForm.style.display = "none";
    }
  }
}
