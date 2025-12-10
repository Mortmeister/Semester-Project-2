export function loadingSpinner() {
  return `
    <div class="d-flex justify-content-center align-items-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;
}

export function listingSkeleton(count = 3) {
  const skeletons = Array(count)
    .fill(0)
    .map(
      () => `
      <div class="col">
        <div class="card h-100">
          <div class="card-img-top bg-light skeleton-image">
            <div class="spinner-border spinner-border-sm text-secondary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div class="card-body">
            <div class="placeholder-glow">
              <span class="placeholder col-7 bg-secondary"></span>
            </div>
            <div class="placeholder-glow mt-2">
              <span class="placeholder col-12 bg-secondary"></span>
              <span class="placeholder col-10 bg-secondary"></span>
            </div>
            <div class="placeholder-glow mt-3">
              <span class="placeholder col-4 bg-secondary"></span>
            </div>
          </div>
        </div>
      </div>
    `
    )
    .join("");

  return `${skeletons}`;
}
