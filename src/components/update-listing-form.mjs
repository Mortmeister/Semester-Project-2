import { getSingleListing, updateListing } from "../api/auth-service.mjs";
import { getParam } from "../utils/get-params.mjs";
import { toDatetimeLocal } from "../utils/date-time.mjs";
import { isAuthenticated, handleUnauthorizedAccess } from "../utils/auth.mjs";

async function prefillForm() {
  const id = getParam("id");
  if (!id) {
    console.error("No ID found in URL");
    return;
  }

  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const imageUrl = document.getElementById("imageUrl");
  const imageAlt = document.getElementById("imageAlt");
  const endsAt = document.getElementById("deadline");

  const { data } = await getSingleListing(id);

  title.value = data.title ?? "";
  description.value = data.description ?? "";
  imageUrl.value = data.media?.[0]?.url ?? "";
  imageAlt.value = data.media?.[0]?.alt ?? "";
  endsAt.value = toDatetimeLocal(data.endsAt) ?? "";
}

export function initUpdateListingForm() {
  if (!isAuthenticated()) {
    handleUnauthorizedAccess("You must be logged in to update a listing.");
    return;
  }

  const updateListingFormEl = document.getElementById("updateListingForm");
  if (!updateListingFormEl) return;
  const id = getParam("id");
  updateListingFormEl.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(updateListingFormEl);
    const payload = {
      title: formData.get("title"),
      description: formData.get("description"),
      media: [
        {
          url: formData.get("imageUrl"),
          alt: formData.get("imageAlt"),
        },
      ],
      endsAt: formData.get("endsAt"),
    };

    try {
      await updateListing(payload, id);
      window.location.href = "../profile/index.html";
    } catch (error) {
      console.error("Update listing error:", error);
      alert("Failed to update listing. Check your input.");
    }
  });
}

prefillForm();
initUpdateListingForm();
