import {
  listingCardMarkup,
  listingProfileCardMarkup,
  winCardMarkup,
  bidCardMarkup,
  singlePageCardMarkup,
} from "../components/listing-card-ui.mjs";
import { getSingleListing } from "../api/auth-service.mjs";

export async function renderListings(container, listings) {
  try {
    container.innerHTML = listings
      .map((listing) => listingCardMarkup(listing))
      .join("");
  } catch (error) {
    console.error("Error rendering listings", error);
    container.innerHTML = `<p class="text-danger">Failed to load listings.</p>`;
  }
}

export async function renderProfileListings(container, listings) {
  try {
    container.innerHTML = listings
      .map((listing) => listingProfileCardMarkup(listing))
      .join("");
  } catch (error) {
    console.error("Error rendering listings", error);
    container.innerHTML = `<p class="text-danger">Failed to load listings.</p>`;
  }
}

export async function renderSingleListing(container, listing) {
  try {
    container.innerHTML = singlePageCardMarkup(listing);
  } catch (error) {
    console.error("Error rendering single listing", error);
    container.innerHTML = `<p class="text-danger">Failed to load listing.</p>`;
  }
}

export async function renderBidListings(container, bids) {
  try {
    if (!bids || bids.length === 0) {
      container.innerHTML = `<p class="text-muted">You haven't placed any bids yet.</p>`;
      return;
    }

    const fullBidData = await Promise.all(
      bids.map(async (bid) => {
        const listingId = bid.listing?.id || bid.listingId;

        if (!listingId) {
          console.warn("Bid missing listing ID:", bid);
          return null;
        }

        try {
          const { data: fullListing } = await getSingleListing(listingId, {
            includeSeller: true,
            includeBids: true,
          });

          if (!fullListing) {
            console.warn(`No listing data returned for ID ${listingId}`);
            return null;
          }

          return {
            ...bid,
            listing: {
              ...fullListing,
              id: fullListing.id || listingId,
            },
          };
        } catch (error) {
          console.error(`Failed to fetch listing ${listingId}:`, error);
          return null;
        }
      })
    );

    const validBids = fullBidData.filter((bid) => bid !== null);

    if (validBids.length === 0) {
      container.innerHTML = `<p class="text-muted">Unable to load bid information.</p>`;
      return;
    }

    container.innerHTML = validBids
      .map((bid) => bidCardMarkup(bid))
      .filter((markup) => markup !== "")
      .join("");
  } catch (error) {
    console.error("Error rendering bid listings", error);
    container.innerHTML = `<p class="text-danger">Failed to load bids.</p>`;
  }
}

export async function renderWinListings(container, wins) {
  try {
    if (!wins || wins.length === 0) {
      container.innerHTML = `<p class="text-muted">You haven't won any auctions yet.</p>`;
      return;
    }

    container.innerHTML = wins
      .map((listing) => winCardMarkup(listing))
      .join("");
  } catch (error) {
    console.error("Error rendering win listings", error);
    container.innerHTML = `<p class="text-danger">Failed to load wins.</p>`;
  }
}
