import { makeBid } from "../api/authService.mjs";

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
      console.alert(error);
    }
  });
}
