import { toDatetimeLocal } from "../utils/date-time.mjs";
import { bidHistoryMarkup } from "./bid-history.mjs";
import { isAuthenticated } from "../utils/auth.mjs";

export function listingProfileCardMarkup(listing) {
  const imageUrl =
    listing.media?.[0]?.url ?? "https://placehold.co/600x400?text=No+Image";
  const imageAlt = listing.media?.[0]?.alt ?? "No alt text provided";

  const latestBid = listing.bids?.length
    ? listing.bids[listing.bids.length - 1]
    : null;

  const currentBidAmount = latestBid?.amount ?? "No bids yet";
  const bidderName = latestBid?.bidder?.name ?? "Unknown bidder";
  const bidderAvatar =
    latestBid?.bidder?.avatar?.url ?? "https://placehold.co/32x32?text=?";
  const formattedDate = toDatetimeLocal(listing.endsAt);

  return `
    <div class="profile-page__bid-card">
      <div class="listing-card__actions">
        <button class="listing-card__actions-btn" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="bi bi-three-dots-vertical"></i>
        </button>

    <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <a class="dropdown-item" href="../update_listing/index.html?id=${listing.id}">
              <i class="bi bi-pencil"></i>
              Edit
            </a>
          </li>

          <li>
            <button
              class="dropdown-item text-danger d-flex align-items-center gap-2"
              type="button"
              data-action="delete-listing"
              data-listing-id="${listing.id}"
            >
              <i class="bi bi-trash"></i>
              Delete
            </button>
          </li>
        </ul>
      </div>

      <a href="../single_page/index.html?id=${listing.id}" class="listing-card">

        
        <div class="listing-card__image">
          <img src="${imageUrl}" alt="${imageAlt}" />
        </div>

        
        <div class="listing-card__body">

          <div class="listing-card__header">
            <h3 class="listing-card__title">${listing.title}</h3>
          </div>

          <p class="listing-card__description">${listing.description}</p>

          
          <div class="listing-card__info">

            <div class="listing-card__bid">
              <div class="listing-card__bid-label">Current Bid</div>
              <div class="listing-card__bid-amount">${currentBidAmount} Credits</div>
            </div>

            <div class="listing-card__time">
              <i class="bi bi-clock"></i>
              <span>${formattedDate}</span>
            </div>

          </div>

          
          <div class="listing-card__seller">
            <img
              src="${bidderAvatar}"
              alt="${bidderName}"
              class="listing-card__seller-avatar"
            />
            <span class="listing-card__seller-name">${bidderName}</span>
          </div>

        </div>
      </a>
    </div>
  `;
}

export function listingCardMarkup(listing) {
  const imageUrl =
    listing.media?.[0]?.url ?? "https://placehold.co/600x400?text=No+Image";
  const imageAlt =
    listing.media?.[0]?.alt ?? "No alt has been provided for this image";
  const latestBid = listing.bids?.length
    ? listing.bids[listing.bids.length - 1]
    : null;

  const currentBidAmount = latestBid?.amount ?? "No bids yet";
  const bidderName = latestBid?.bidder?.name ?? "Unknown bidder";
  const bidderAvatar =
    latestBid?.bidder?.avatar?.url ?? "https://placehold.co/32x32?text=?";
  const formattedDate = toDatetimeLocal(listing.endsAt);

  return `
       <a href="../single_page/index.html?id=${listing.id}" class="listing-card col text-decoration-none">
         <div class="card h-100">
           <img
             src="${imageUrl}"
             class="card-img-top"
             alt="${imageAlt}"
           />

           <div class="card-body">
             <h5 class="card-title">${listing.title}</h5>

             <p class="card-text text-muted">
               ${listing.description}
             </p>

             <div class="d-flex justify-content-between mt-3">
               <div>
                 <div class="text-muted small">Current Bid</div>
                 <strong>${currentBidAmount} Credits</strong>
               </div>

               <div class="d-flex align-items-center gap-1">
                 <i class="bi bi-clock"></i>
                 <span>${formattedDate}</span>
               </div>
             </div>

             <div class="d-flex align-items-center mt-3">
               <img
                 src="${bidderAvatar}"
                 class="rounded-circle me-2"
                 width="32"
                 height="32"
               />
               <span class="text-muted">${bidderName}</span>
             </div>
           </div>
         </div>
       </a>
       `;
}

export function bidCardMarkup(bid) {
  const listing = bid.listing;
  if (!listing) {
    return "";
  }

  const imageUrl =
    listing.media?.[0]?.url ?? "https://placehold.co/600x400?text=No+Image";
  const imageAlt = listing.media?.[0]?.alt ?? "No alt text provided";

  const latestBid = listing.bids?.length
    ? listing.bids[listing.bids.length - 1]
    : null;

  const currentBidAmount = latestBid?.amount ?? "No bids yet";
  const sellerImg =
    listing.seller?.avatar?.url ?? "https://placehold.co/32x32?text=S";
  const sellerName = listing.seller?.name ?? "Unknown seller";

  const formattedDate = listing.endsAt
    ? toDatetimeLocal(listing.endsAt)
    : "No end date";

  return `
    <div class="profile-page__bid-card">
      <div class="listing-card__bid-badge">Your bid: ${bid.amount}</div>
      <a href="../single_page/index.html?id=${listing.id}" class="listing-card">
        <div class="listing-card__image">
          <img src="${imageUrl}" alt="${imageAlt}" />
        </div>

        <div class="listing-card__body">
          <div class="listing-card__header">
            <h3 class="listing-card__title">${listing.title}</h3>
          </div>

          <p class="listing-card__description">${listing.description}</p>

          <div class="listing-card__info">
            <div class="listing-card__bid">
              <div class="listing-card__bid-label">Current Bid</div>
              <div class="listing-card__bid-amount">${currentBidAmount} Credits</div>
            </div>

            <div class="listing-card__time">
              <i class="bi bi-clock"></i>
              <span>${formattedDate}</span>
            </div>
          </div>

          <div class="listing-card__seller">
            <img
              src="${sellerImg}"
              alt="${sellerName}"
              class="listing-card__seller-avatar"
            />
            <span class="listing-card__seller-name">${sellerName}</span>
          </div>
        </div>
      </a>
    </div>
  `;
}

export function singlePageCardMarkup(listing) {
  const imageUrl =
    listing.media?.[0]?.url ?? "https://placehold.co/600x400?text=No+Image";
  const imageAlt = listing.media?.[0]?.alt ?? "No alt text provided";

  //  BIDS
  const bids = listing.bids ?? [];
  const latestBid = bids.length > 0 ? bids[bids.length - 1] : null;

  const currentBidAmount = latestBid?.amount ?? "No bids yet";
  const bidderName = latestBid?.bidder?.name ?? "No bids yet";
  const bidderAvatar =
    latestBid?.bidder?.avatar?.url ?? "https://placehold.co/32x32?text=?";

  const latestBidTime = toDatetimeLocal(latestBid?.created) ?? "";

  // SELLER
  const sellerImg =
    listing.seller?.avatar?.url ?? "https://placehold.co/48x48?text=S";
  const sellerImgAlt = listing.seller?.avatar?.alt ?? "Seller avatar";
  const sellerName = listing.seller?.name ?? "Unknown seller";
  const formattedDate = toDatetimeLocal(listing.endsAt);

  const isAuth = isAuthenticated();
  const bidFormHtml = isAuth
    ? `
            <form class="d-flex gap-2 mb-2" id="bidOnAuctionForm">
              <input
                name="bidAmount"
                type="number"
                class="form-control"
                placeholder="Enter bid amount"
              />
              <button type="submit" class="btn btn-primary">
                <i class="bi bi-gavel"></i> Place Bid
              </button>
            </form>
            <p class="text-muted small">Your available credits: 1000</p>
          `
    : `
            <div class="alert alert-info">
              <i class="bi bi-info-circle"></i> You must be logged in to place a bid.
              <a href="../login/index.html" class="alert-link">Login here</a>
            </div>
          `;

  return `
    <div class="container">
      <a href="../feed/index.html" class="btn btn-outline-secondary btn-sm mb-3">
        <i class="bi bi-arrow-left"></i>
        Back to Listings
      </a>

              <div class="row g-4">
          <div class="col-lg-6">
            <div class="border rounded p-2 mb-3" id="mainImage">
              <img
                src="${imageUrl}"
                class="img-fluid rounded"
                alt="${imageAlt}"
              />
            </div>

            <div class="d-flex gap-2">
              <div
              >
                <img
                  src="${imageUrl}"
                  alt="${imageAlt}"
                  class="img-thumbnail"
                />
              </div>

              <div>
                <img
                  src="${imageUrl}"
                  alt="${imageAlt}"
                  class="img-thumbnail"
                />
              </div>
            </div>
          </div>

        <div class="col-lg-6">
          <h1 class="mb-2">${listing.title}</h1>
          <p>${listing.description}</p>

          <div class="mb-3">
            <span class="badge bg-secondary">${listing.tags}</span>
          </div>

          <div class="d-flex align-items-center gap-3 mb-4">
            <img
              src="${sellerImg}"
              alt="${sellerImgAlt}"
              class="rounded-circle"
              width="48"
              height="48"
            />
            <div>
              <div class="text-muted">Seller</div>
              <div>${sellerName}</div>
            </div>
          </div>

          <div class="border rounded p-3 mb-4">
            <div class="d-flex justify-content-between mb-3">
              <div>
                <div class="text-muted">Current Bid</div>
                <div class="fw-bold">${currentBidAmount} Credits</div>
              </div>
              <div>
                <div class="text-muted">Time Remaining</div>
                <div><i class="bi bi-clock"></i> ${formattedDate}</div>
              </div>
            </div>

            ${bidFormHtml}
          </div>

          <h4>Bid History (${listing._count?.bids ?? 0})</h4>
        ${bidHistoryMarkup(listing.bids)}
        </div>
      </div>
    </div>
  `;
}

export function winCardMarkup(listing) {
  const imageUrl =
    listing.media?.[0]?.url ?? "https://placehold.co/600x400?text=No+Image";
  const imageAlt = listing.media?.[0]?.alt ?? "No alt text provided";

  const latestBid = listing.bids?.length
    ? listing.bids[listing.bids.length - 1]
    : null;

  const winningBidAmount = latestBid?.amount ?? "No bids";
  const sellerImg =
    listing.seller?.avatar?.url ?? "https://placehold.co/32x32?text=S";
  const sellerName = listing.seller?.name ?? "Unknown seller";

  const formattedDate = listing.endsAt
    ? toDatetimeLocal(listing.endsAt)
    : "No end date";

  return `
    <div class="profile-page__bid-card">
      <div class="listing-card__bid-badge">Won</div>
      <a href="../single_page/index.html?id=${listing.id}" class="listing-card">
        <div class="listing-card__image">
          <img src="${imageUrl}" alt="${imageAlt}" />
        </div>

        <div class="listing-card__body">
          <div class="listing-card__header">
            <h3 class="listing-card__title">${listing.title}</h3>
          </div>

          <p class="listing-card__description">${listing.description}</p>

          <div class="listing-card__info">
            <div class="listing-card__bid">
              <div class="listing-card__bid-label">Winning Bid</div>
              <div class="listing-card__bid-amount">${winningBidAmount} Credits</div>
            </div>

            <div class="listing-card__time">
              <i class="bi bi-clock"></i>
              <span>Ended: ${formattedDate}</span>
            </div>
          </div>

          <div class="listing-card__seller">
            <img
              src="${sellerImg}"
              alt="${sellerName}"
              class="listing-card__seller-avatar"
            />
            <span class="listing-card__seller-name">${sellerName}</span>
          </div>
        </div>
      </a>
    </div>
  `;
}
