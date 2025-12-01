import { renderSingleListing } from "../listings/renderListings.mjs";
import { getSingleListing } from "../api/authService.mjs";
import { getParam } from "../helpers/getParams.mjs";
import { initBidForm } from "../listings/bidOnListing.mjs";

export async function loadListings() {
  const id = getParam("id");
  if (!id) {
    console.error("No ID found in URL");
    return;
  }
  const container = document.getElementById("singlePageContainer");
  const { data } = await getSingleListing(id);
  await renderSingleListing(container, data);
  await initBidForm(id);
}

loadListings();
