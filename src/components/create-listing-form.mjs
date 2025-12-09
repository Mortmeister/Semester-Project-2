import { createListing } from "../api/auth-service.mjs";
import { isAuthenticated, handleUnauthorizedAccess } from "../utils/auth.mjs";
import { initMediaPreviews, updateMediaPreview } from "./image-preview.mjs";

export function initCreateListingForm() {
  const createListingFormEl = document.getElementById("createListingForm");
  if (!createListingFormEl) return;

  const mediaInputsContainer = document.getElementById("mediaInputs");
  const addMediaBtn = document.getElementById("addMediaBtn");

  if (!mediaInputsContainer || !addMediaBtn) return;

  // Initialize image previews for existing inputs
  initMediaPreviews();

  // Handle adding new image group
  addMediaBtn.addEventListener("click", () => {
    addMediaGroup();
  });

  // Handle removing image groups
  mediaInputsContainer.addEventListener("click", (e) => {
    if (e.target.closest(".remove-media-btn")) {
      const mediaGroup = e.target.closest(".media-group");
      if (mediaGroup) {
        removeMediaGroup(mediaGroup);
      }
    }
  });

  // Handle image preview updates
  mediaInputsContainer.addEventListener("input", (e) => {
    if (e.target.classList.contains("media-url-input")) {
      updateMediaPreview(e.target);
    }
  });

  // Update remove button visibility
  updateRemoveButtons();

  // Form submission
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
      media: media,
      endsAt: formData.get("endsAt"),
    };

    try {
      const { data } = await createListing(payload);
      console.log("Listing created:", data);
      window.location.href = "../profile/index.html";
    } catch (error) {
      console.error("Create listing error:", error);
      alert("Failed to create listing. Check your input.");
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
        <label class="form-label" style="font-size: 0.875rem">Image URL</label>
        <input
          type="url"
          name="imageUrl[]"
          class="form-control media-url-input"
          placeholder="https://example.com/image.jpg"
          required
        />
      </div>
      <div class="flex-grow-1">
        <label class="form-label" style="font-size: 0.875rem">Image ALT Text</label>
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
        style="max-width: 200px; max-height: 200px; display: none;"
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
    btn.style.display = mediaGroups.length > 1 ? "block" : "none";
  });
}
