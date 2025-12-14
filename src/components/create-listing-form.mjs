import { createListing } from "../api/auth-service.mjs";
import { isAuthenticated, handleUnauthorizedAccess } from "../utils/auth.mjs";
import { initMediaPreviews, updateMediaPreview } from "./image-preview.mjs";

/*
 This function splits a comma-separated string of tags into an array
 It removes empty spaces and filters out empty tags.
*/
function splitTags(tagsString) {
  if (!tagsString) return [];

  return tagsString
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
}

/* 
// This function sets up the create listing form
// It handles adding multiple images, previewing images, and submitting the form
// When submitted, it sends the listing data to the API to create a new auction
*/
export function initCreateListingForm() {
  const createListingFormEl = document.getElementById("createListingForm");
  if (!createListingFormEl) return;

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

  createListingFormEl.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!isAuthenticated()) {
      handleUnauthorizedAccess("You must be logged in to create a listing.");
      return;
    }

    const formData = new FormData(createListingFormEl);
    const imageUrls = formData.getAll("imageUrl[]");
    const imageAlts = formData.getAll("imageAlt[]");

    // Build media array
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
      tags: splitTags(formData.get("tags")),
      media: media,
      endsAt: formData.get("endsAt"),
    };

    try {
      const { data } = await createListing(payload);
      window.location.href = "../profile/index.html";
    } catch (error) {
      const message =
        error?.errors?.[0]?.message || "Failed to create listing.";
      alert(message);
    }
  });
}

/*
 This function adds a new image input group to the form
 It is called when the user clicks the "Add Image" button.

  nextIndex is used to keep track of how many image inputs exist so far,
  so each new image group gets its own index.
*/
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

/*
 This function removes an image input group from the form
 It prevents removing the last image since at least one image is required to post an auction.
*/
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

/*
 This function shows or hides the remove buttons on image inputs
 If there's only one image, the remove button is hidden
*/
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
