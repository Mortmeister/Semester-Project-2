export function updateImagePreview(
  inputId = "imageUrl",
  previewId = "imageURLPreview"
) {
  const imageUrlInput = document.getElementById(inputId);
  const imageURLPreview = document.getElementById(previewId);

  if (!imageUrlInput || !imageURLPreview) return;

  const url = imageUrlInput.value.trim();
  if (url && url.startsWith("http")) {
    imageURLPreview.src = url;
    imageURLPreview.classList.add("media-preview--visible");
  } else {
    imageURLPreview.classList.remove("media-preview--visible");
  }
}

export function initImagePreview(
  inputId = "imageUrl",
  previewId = "imageURLPreview"
) {
  const imageUrlInput = document.getElementById(inputId);
  if (!imageUrlInput) return;

  imageUrlInput.addEventListener("input", () =>
    updateImagePreview(inputId, previewId)
  );
  imageUrlInput.addEventListener("paste", () => {
    setTimeout(() => updateImagePreview(inputId, previewId), 10);
  });
}

export function updateMediaPreview(urlInput) {
  const mediaGroup = urlInput.closest(".media-group");
  if (!mediaGroup) return;

  const preview = mediaGroup.querySelector(".media-preview");
  if (!preview) return;

  const url = urlInput.value.trim();
  if (url && url.startsWith("http")) {
    preview.src = url;
    preview.classList.add("media-preview--visible");
  } else {
    preview.classList.remove("media-preview--visible");
  }
}

export function initMediaPreviews() {
  const mediaInputsContainer = document.getElementById("mediaInputs");
  if (!mediaInputsContainer) return;

  const urlInputs = mediaInputsContainer.querySelectorAll(".media-url-input");
  urlInputs.forEach((input) => {
    updateMediaPreview(input);
  });
}
