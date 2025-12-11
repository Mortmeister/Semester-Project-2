export function createUserCard(user) {
  const avatarUrl =
    user.avatar?.url ?? "https://placehold.co/200x200?text=User";
  const avatarAlt = user.avatar?.alt ?? `${user.name} avatar`;
  const username = user.name ?? "Unknown user";
  const email = user.email ?? "No email";
  const bio = user.bio ?? "No bio available";
  const credits = user.credits ?? 0;
  const listingCount = user._count?.listings ?? 0;

  return `
    <div class="profile-page__bid-card">
      <a href="../profile/index.html?user=${username}" class="listing-card">
        <div class="listing-card__image">
          <img src="${avatarUrl}" alt="${avatarAlt}" />
        </div>

        <div class="listing-card__body">
          <div class="listing-card__header">
            <h3 class="listing-card__title">${username}</h3>
          </div>

          <p class="listing-card__description">${bio}</p>

          <div class="listing-card__info">
            <div class="listing-card__bid">
              <div class="listing-card__bid-label">Credits</div>
              <div class="listing-card__bid-amount">${credits} Credits</div>
            </div>

            <div class="listing-card__time">
              <i class="bi bi-list-ul"></i>
              <span>${listingCount} Listings</span>
            </div>
          </div>

          <div class="listing-card__seller">
            <img
              src="${avatarUrl}"
              alt="${username}"
              class="listing-card__seller-avatar"
            />
            <div class="listing-card__seller-info">
              <div class="listing-card__seller-name">${username}</div>
              <div class="listing-card__seller-detail">
                <i class="bi bi-envelope"></i>
                <span>${email}</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  `;
}
