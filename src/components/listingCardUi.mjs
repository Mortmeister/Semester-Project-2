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

  return `
    <div class="profile-page__bid-card">
      <div class="listing-card__actions">
        <button class="listing-card__actions-btn" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="bi bi-three-dots-vertical"></i>
        </button>

    <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <a class="dropdown-item" href="edit-listing.html?id=${listing.id}">
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

      <a href="listing.html?id=${listing.id}" class="listing-card">

        
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
              <span>${listing.endsAt}</span>
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

  return `
       <a href="listing.html?id=${listing.id}" class="listing-card col text-decoration-none">
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
                 <span>${listing.endsAt}</span>
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
