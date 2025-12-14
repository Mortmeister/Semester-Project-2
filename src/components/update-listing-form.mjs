import { getSingleListing, updateListing } from "../api/auth-service.mjs";
import { getParam } from "../utils/get-params.mjs";
import { toDatetimeLocal } from "../utils/date-time.mjs";
import { isAuthenticated, handleUnauthorizedAccess } from "../utils/auth.mjs";
import { initMediaPreviews, updateMediaPreview } from "./image-preview.mjs";
import { loadHeader } from "./header.mjs";

function splitTags(tagsString) {
  if (!tagsString) return [];

  return tagsString
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
}

async function prefillForm() {
  const id = getParam("id");
  if (!id) {
    console.error("No ID found in URL");
    return;
  }

  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const endsAt = document.getElementById("deadline");
  const tags = document.getElementById("tags");
  const mediaInputsContainer = document.getElementById("mediaInputs");

  const { data } = await getSingleListing(id);

  title.value = data.title ?? "";
  description.value = data.description ?? "";
  endsAt.value = toDatetimeLocal(data.endsAt) ?? "";
  tags.value = Array.isArray(data.tags)
    ? data.tags.join(", ")
    : data.tags ?? "";

  const media = data.media ?? [];

  const firstGroup = mediaInputsContainer.querySelector(".media-group");
  const firstUrlInput = firstGroup?.querySelector(".media-url-input");
  const firstAltInput = firstGroup?.querySelector(".media-alt-input");

  if (media.length === 0) {
    if (firstUrlInput) firstUrlInput.value = "";
    if (firstAltInput) firstAltInput.value = "";
  } else {
    if (firstUrlInput) firstUrlInput.value = media[0]?.url ?? "";
    if (firstAltInput) firstAltInput.value = media[0]?.alt ?? "";

    if (firstUrlInput && media[0]?.url) {
      updateMediaPreview(firstUrlInput);
    }

    for (let i = 1; i < media.length; i++) {
      addMediaGroup();
      const mediaGroups = mediaInputsContainer.querySelectorAll(".media-group");
      const newGroup = mediaGroups[mediaGroups.length - 1];
      const urlInput = newGroup.querySelector(".media-url-input");
      const altInput = newGroup.querySelector(".media-alt-input");
      if (urlInput) urlInput.value = media[i]?.url ?? "";
      if (altInput) altInput.value = media[i]?.alt ?? "";

      if (urlInput && media[i]?.url) {
        updateMediaPreview(urlInput);
      }
    }
  }

  updateRemoveButtons();
}

/*
This function sets up the update listing form.
It prefills the form with existing data and handles form submission.
When submitted, it sends updated listing data to the API.
Supports multiple images just like the create listing form.
Redirects back to profile page after successful update.
*/
export function initUpdateListingForm() {
  if (!isAuthenticated()) {
    handleUnauthorizedAccess("You must be logged in to update a listing.");
    return;
  }

  const updateListingFormEl = document.getElementById("updateListingForm");
  if (!updateListingFormEl) return;

  const mediaInputsContainer = document.getElementById("mediaInputs");
  const addMediaBtn = document.getElementById("addMediaBtn");

  if (!mediaInputsContainer || !addMediaBtn) return;

  initMediaPreviews();

  addMediaBtn.addEventListener("click", () => {
    addMediaGroup();
  });

  mediaInputsContainer.addEventListener("click", (event) => {
    if (event.target.closest(".remove-media-btn")) {
      const mediaGroup = event.target.closest(".media-group");
      if (mediaGroup) {
        removeMediaGroup(mediaGroup);
      }
    }
  });

  mediaInputsContainer.addEventListener("input", (event) => {
    if (event.target.classList.contains("media-url-input")) {
      updateMediaPreview(event.target);
    }
  });

  updateRemoveButtons();

  const id = getParam("id");
  updateListingFormEl.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(updateListingFormEl);
    const imageUrls = formData.getAll("imageUrl[]");
    const imageAlts = formData.getAll("imageAlt[]");

    const media = [];
    for (let i = 0; i < imageUrls.length; i++) {
      if (imageUrls[i] && imageUrls[i].trim()) {
        media.push({
          url: imageUrls[i].trim(),
          alt: imageAlts[i]?.trim() || "Listing image",
        });
      }
    }

    if (media.length === 0) {
      alert("Please add at least one image.");
      return;
    }

    const payload = {
      title: formData.get("title"),
      description: formData.get("description"),
      media: media,
      endsAt: formData.get("endsAt"),
      tags: splitTags(formData.get("tags")),
    };

    try {
      await updateListing(payload, id);
      window.location.href = "../profile/index.html";
    } catch (error) {
      console.error("Update listing error:", error.errors[0].message);
      alert(error.errors[0].message);
    }
  });
}

function addMediaGroup() {
  const mediaInputsContainer = document.getElementById("mediaInputs");
  if (!mediaInputsContainer) return;

  const mediaGroups = mediaInputsContainer.querySelectorAll(".media-group");
  const nextIndex = mediaGroups.length;

  const mediaGroup = document.createElement("div");
  mediaGroup.className = "media-group mb-3";
  mediaGroup.setAttribute("data-media-index", nextIndex);

  mediaGroup.innerHTML = `
    <div class="d-flex gap-2 align-items-start mb-2">
      <div class="flex-grow-1">
        <label class="form-label form-label--small">Image URL</label>
        <input
          type="url"
          name="imageUrl[]"
          class="form-control media-url-input"
          placeholder="https://example.com/image.jpg"
          required
        />
      </div>
      <div class="flex-grow-1">
        <label class="form-label form-label--small">Image ALT Text</label>
        <input
          type="text"
          name="imageAlt[]"
          class="form-control media-alt-input"
          placeholder="Image description"
          required
        />
      </div>
      <div class="d-flex align-items-end">
        <button
          type="button"
          class="btn btn-outline-danger btn-sm remove-media-btn"
        >
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
    <div class="media-preview-container">
      <img
        class="media-preview img-thumbnail"
        src=""
        alt="Image preview"
      />
    </div>
  `;

  mediaInputsContainer.appendChild(mediaGroup);
  updateRemoveButtons();
}

function removeMediaGroup(mediaGroup) {
  const mediaInputsContainer = document.getElementById("mediaInputs");
  if (!mediaInputsContainer) return;

  const mediaGroups = mediaInputsContainer.querySelectorAll(".media-group");
  if (mediaGroups.length <= 1) {
    alert("You must have at least one image.");
    return;
  }

  mediaGroup.remove();
  updateRemoveButtons();
}

function updateRemoveButtons() {
  const mediaInputsContainer = document.getElementById("mediaInputs");
  if (!mediaInputsContainer) return;

  const mediaGroups = mediaInputsContainer.querySelectorAll(".media-group");
  const removeButtons =
    mediaInputsContainer.querySelectorAll(".remove-media-btn");

  removeButtons.forEach((btn) => {
    if (mediaGroups.length > 1) {
      btn.classList.remove("remove-media-btn--hidden");
    } else {
      btn.classList.add("remove-media-btn--hidden");
    }
  });
}

loadHeader();
prefillForm();
initUpdateListingForm();
