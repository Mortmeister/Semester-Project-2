import { getUserProfile } from "../api/auth-service.mjs";
import { isAuthenticated } from "../utils/auth.mjs";
import { logout } from "../utils/auth.mjs";

export function initLogoutHandler() {
  const logoutLink = document.getElementById("logoutLink");
  if (!logoutLink) return;
  console.log("herro?");
  logoutLink.addEventListener("click", (event) => {
    event.preventDefault();
    logout();
  });
}

export function initHeaderDropdown() {
  const menuBtn = document.getElementById("userMenuButton");
  const menu = document.getElementById("userMenu");

  if (!menuBtn || !menu) return;

  menuBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    menu.classList.toggle("show");
  });

  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && event.target !== menuBtn) {
      menu.classList.remove("show");
    }
  });
}

export function initHeaderEl(user, isAuth) {
  if (isAuth && user?.data) {
    const { data } = user;
    const credits = data?.credits ?? 0;
    const name = data?.name ?? "Unknown User";
    const avatarImg = data?.avatar?.url ?? "https://placehold.co/32x32?text=?";
    const avatarAlt = data?.avatar?.alt ?? "No alt provided";

    return `
      <div class="container d-flex justify-content-between align-items-center">
        <a href="../feed/index.html" class="main-header__brand d-flex align-items-center">
          <div class="main-header__logo">AH</div>
          <span class="ms-2">Auction House</span>
        </a>

        <nav class="main-header__nav d-flex align-items-center gap-3">
          <div class="main-header__credits d-flex align-items-center gap-1">
            <i class="bi bi-coin"></i>
            <span>${credits} Credits</span>
          </div>

          <a href="../create_listing/index.html"
             class="btn btn-primary btn-sm d-flex align-items-center gap-1">
            <i class="bi bi-plus-lg"></i> Create Listing
          </a>

          <div class="user-dropdown">
            <button class="main-header__user" id="userMenuButton">
              <img src="${avatarImg}" alt="${avatarAlt}" class="main-header__avatar" id="avatarImage">
              <span class="main-header__username">${name}</span>
              <i class="bi bi-chevron-down"></i>
            </button>

            <div id="userMenu" class="user-dropdown__menu">            
              <div class="user-dropdown__credits-mobile d-flex align-items-center gap-1">
                <i class="bi bi-coin"></i>
                <span>${credits} Credits</span>
              </div>

              <a href="../profile/index.html" class="user-dropdown__item">
                <i class="bi bi-person"></i> Profile
              </a>

              <div class="user-dropdown__divider"></div>

              <a class="user-dropdown__item user-dropdown__item--danger" id="logoutLink">
                <i class="bi bi-box-arrow-right"></i> Logout
              </a>
            </div>
          </div>
        </nav>
      </div>
    `;
  } else {
    return `
      <div class="container d-flex justify-content-between align-items-center">
        <a href="../feed/index.html" class="main-header__brand d-flex align-items-center">
          <div class="main-header__logo">AH</div>
          <span class="ms-2">Auction House</span>
        </a>

        <nav class="main-header__nav d-flex align-items-center gap-3">
          <a href="../login/index.html" class="btn btn-outline-primary btn-sm">
            <i class="bi bi-box-arrow-in-right"></i> Login
          </a>
          <a href="../register/index.html" class="btn btn-primary btn-sm">
            <i class="bi bi-person-plus"></i> Register
          </a>
        </nav>
      </div>
    `;
  }
}

export async function loadHeader() {
  const headerContainer = document.getElementById("header");
  if (!headerContainer) return;

  const isAuth = isAuthenticated();

  if (isAuth) {
    try {
      const user = await getUserProfile();
      headerContainer.innerHTML = initHeaderEl(user, true);
      initHeaderDropdown();
      initLogoutHandler();
      debugger;
    } catch (error) {
      console.error("Failed to load user profile:", error);
      headerContainer.innerHTML = initHeaderEl(null, false);
    }
  } else {
    headerContainer.innerHTML = initHeaderEl(null, false);
  }
}
