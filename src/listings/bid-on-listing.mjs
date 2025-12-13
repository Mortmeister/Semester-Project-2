import { makeBid } from "../api/auth-service.mjs";
import { isAuthenticated, handleUnauthorizedAccess } from "../utils/auth.mjs";

export function initBidForm(id) {
  const form = document.getElementById("bidOnAuctionForm");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!isAuthenticated()) {
      handleUnauthorizedAccess("You must be logged in to place a bid.");
      return;
    }

    const formData = new FormData(form);
    const amount = Number(formData.get("bidAmount"));
    const payload = { amount: amount };
    try {
      await makeBid(id, payload);
      location.reload();
    } catch (error) {
      const errorMessage = error.errors[0].message;

      alert(errorMessage);
    }
  });
}
