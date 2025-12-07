import { makeBid } from "../api/auth-service.mjs";

export function initBidForm(id) {
  const form = document.getElementById("bidOnAuctionForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const amount = Number(formData.get("bidAmount"));
    const payload = { amount: amount };
    try {
      await makeBid(id, payload);
      location.reload();
    } catch (error) {
      console.error(error);
    }
  });
}
