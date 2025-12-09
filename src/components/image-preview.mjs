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
    imageURLPreview.style.display = "block";
  } else {
    imageURLPreview.style.display = "none";
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
