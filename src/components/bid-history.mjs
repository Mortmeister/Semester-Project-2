import { toDatetimeLocal } from "../utils/date-time.mjs";

export function bidHistoryMarkup(bids = []) {
  if (!Array.isArray(bids) || bids.length === 0) {
    return `
      <div class="list-group">
        <div class="list-group-item">
          <div class="text-muted">No bids yet</div>
        </div>
      </div>
    `;
  }

  const bidHistory = bids
    .map((bid) => {
      const amount = bid.amount ?? "Unknown amount";
      const created = bid.created
        ? toDatetimeLocal(new Date(bid.created))
        : "Unknown time";

      const bidderName = bid.bidder?.name ?? "Unknown bidder";
      const bidderAvatar =
        bid.bidder?.avatar?.url ?? "https://placehold.co/32x32?text=?";

      return `
        <div class="list-group-item d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center gap-2">
            <img
              src="${bidderAvatar}"
              alt="${bidderName}"
              width="24"
              height="24"
              class="rounded-circle"
            />
            <span>${bidderName}</span>
          </div>

          <div>${amount} Credits · ${created}</div>
        </div>
      `;
    })
    .join("");

  return `
    <div class="list-group">
      ${bidHistory}
    </div>
  `;
}
