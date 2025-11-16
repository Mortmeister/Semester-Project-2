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
  debugger;
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
