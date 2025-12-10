import { toDatetimeLocal, getTimeRemaining } from "../utils/date-time.mjs";
import { bidHistoryMarkup } from "./bid-history.mjs";
import { isAuthenticated } from "../utils/auth.mjs";

export function listingProfileCardMarkup(listing) {
  const imageUrl =
    listing.media?.[0]?.url ?? "https://placehold.co/600x400?text=No+Image";
  const imageAlt = listing.media?.[0]?.alt ?? "No alt text provided";

  const latestBid = listing.bids?.length
    ? listing.bids[listing.bids.length - 1]
    : null;

  const currentBidAmount = latestBid?.amount ?? "0";
  const bidderName = latestBid?.bidder?.name ?? "No bidder yet";
  const bidderAvatar =
    latestBid?.bidder?.avatar?.url ?? "https://placehold.co/32x32?text=?";
  const timeRemaining = getTimeRemaining(listing.endsAt);

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
              <span>${timeRemaining}</span>
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

  const currentBidAmount = latestBid?.amount ?? "0";
  const bidderName = latestBid?.bidder?.name ?? "No bidder yet";
  const bidderAvatar =
    latestBid?.bidder?.avatar?.url ?? "https://placehold.co/32x32?text=?";
  const timeRemaining = getTimeRemaining(listing.endsAt);

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
                 <span>${timeRemaining}</span>
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

export function listingBidCardMarkup(listing, userBidAmount) {
  const imageUrl =
    listing.media?.[0]?.url ?? "https://placehold.co/600x400?text=No+Image";
  const imageAlt = listing.media?.[0]?.alt ?? "No alt text provided";

  const latestBid = listing.bids?.length
    ? listing.bids[listing.bids.length - 1]
    : null;

  const currentBidAmount = latestBid?.amount ?? "0";
  const bidderName = latestBid?.bidder?.name ?? "No bidder yet";
  const bidderAvatar =
    latestBid?.bidder?.avatar?.url ?? "https://placehold.co/32x32?text=?";

  const sellerImg =
    listing.seller?.avatar?.url ?? "https://placehold.co/32x32?text=S";
  const sellerName = listing.seller?.name ?? "Unknown seller";

  const timeRemaining = getTimeRemaining(listing.endsAt);

  return `
    <div class="profile-page__bid-card">
      <div class="listing-card__bid-badge">Your bid: ${userBidAmount}</div>
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
              <span>${timeRemaining}</span>
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

  const currentBidAmount = latestBid?.amount ?? "0";
  const sellerImg =
    listing.seller?.avatar?.url ?? "https://placehold.co/32x32?text=S";
  const sellerName = listing.seller?.name ?? "Unknown seller";

  const timeRemaining = getTimeRemaining(listing.endsAt);

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
              <span>${timeRemaining}</span>
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

  // For won auctions, always show "Auction ended"
  const timeRemaining = "Auction ended";

  return `
    <div class="profile-page__bid-card">
      <div class="listing-card__bid-badge listing-card__bid-badge--won">Won</div>
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
              <span>${timeRemaining}</span>
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
  const media = listing.media ?? [];
  const hasImages = media.length > 0;
  const firstImage = hasImages
    ? media[0]
    : {
        url: "https://placehold.co/600x400?text=No+Image",
        alt: "No image available",
      };

  const primaryImageMarkup = `
    <div class="listing-detail__main-image" id="mainImageContainer">
      <img
        src="${firstImage.url}"
        alt="${firstImage.alt}"
        id="mainImage"
      />
    </div>
  `;

  let thumbnailsMarkup = "";
  if (hasImages) {
    thumbnailsMarkup = `
      <div class="listing-detail__thumbnails" id="thumbnailsContainer">
        ${media
          .map(
            (item, index) => `
          <button
            type="button"
            class="listing-detail__thumbnail ${
              index === 0 ? "listing-detail__thumbnail--active" : ""
            }"
            data-image-index="${index}"
            aria-label="View image ${index + 1}"
          >
            <img
              src="${item.url}"
              alt="${item.alt || "Listing image"}"
            />
          </button>
        `
          )
          .join("")}
      </div>
    `;
  }

  //  BIDS
  const bids = listing.bids ?? [];
  const latestBid = bids.length > 0 ? bids[bids.length - 1] : null;

  const currentBidAmount = latestBid?.amount ?? "0";
  const bidderName = latestBid?.bidder?.name ?? "No bid yet";
  const bidderAvatar =
    latestBid?.bidder?.avatar?.url ?? "https://placehold.co/32x32?text=?";

  const latestBidTime = toDatetimeLocal(latestBid?.created) ?? "";

  // SELLER
  const sellerImg =
    listing.seller?.avatar?.url ?? "https://placehold.co/48x48?text=S";
  const sellerImgAlt = listing.seller?.avatar?.alt ?? "Seller avatar";
  const sellerName = listing.seller?.name ?? "Unknown seller";
  const timeRemaining = getTimeRemaining(listing.endsAt);

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
      <a href="../feed/index.html" class="btn btn-outline-secondary btn-sm mb-3 listing-detail__back">
        <i class="bi bi-arrow-left"></i>
        Back to Listings
      </a>

      <div class="listing-detail__grid">
        <div class="listing-detail__gallery">
          ${primaryImageMarkup}
          ${thumbnailsMarkup}
        </div>

        <div class="listing-detail__details">
          <div class="listing-detail__header">
            <h1 class="listing-detail__title">${listing.title}</h1>
          </div>

          <p class="listing-detail__description">${listing.description}</p>

          ${
            listing.tags
              ? `
            <div class="listing-detail__tags">
              <span class="badge bg-secondary">${listing.tags}</span>
            </div>
          `
              : ""
          }

          <div class="listing-detail__seller">
            <img
              src="${sellerImg}"
              alt="${sellerImgAlt}"
              class="listing-detail__seller-avatar"
            />
            <div class="listing-detail__seller-info">
              <div class="label">Seller</div>
              <div class="name">${sellerName}</div>
            </div>
          </div>

          <div class="listing-detail__bidding">
            <div class="listing-detail__bid-info">
              <div class="listing-detail__bid-current">
                <div class="label">Current Bid</div>
                <div class="value">${currentBidAmount} Credits</div>
              </div>
              <div class="listing-detail__bid-time">
                <div class="label">Time Remaining</div>
                <div class="value">
                  <i class="bi bi-clock"></i> ${timeRemaining}
                </div>
              </div>
            </div>

            ${bidFormHtml}
          </div>

          <h4 class="listing-detail__history-title">Bid History (${
            listing._count?.bids ?? 0
          })</h4>
          ${bidHistoryMarkup(listing.bids)}
        </div>
      </div>
    </div>
  `;
}
