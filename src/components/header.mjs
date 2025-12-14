import { getUserProfile } from "../api/auth-service.mjs";
import { isAuthenticated } from "../utils/auth.mjs";
import { logout } from "../utils/auth.mjs";

/*
This function makes the logout buttons work. We have two logout buttons: one for desktop and one for mobile. 
Both buttons need to call the logout() function when clicked.
 */
export function initLogoutHandler() {
  const desktopLogout = document.getElementById("logoutLink");
  const mobileLogout = document.getElementById("mobileLogoutLink");

  if (desktopLogout) {
    desktopLogout.addEventListener("click", (event) => {
      event.preventDefault();
      logout();
    });
  }

  if (mobileLogout) {
    mobileLogout.addEventListener("click", (event) => {
      event.preventDefault();
      logout();
    });
  }
}

/*
The function can safely run on any page only activates when the required elements exist. 
It makes the hamburger menu work on mobile. When you click the hamburger button, it shows 
or hides the navigation menu. 
 */
export function initHeaderDropdown() {
  const menuBtn = document.getElementById("userMenuButton");
  const menu = document.getElementById("userMenu");

  if (!menuBtn || !menu) return;

  const isMobile = window.innerWidth <= 768;
  if (isMobile) return;

  menuBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    menu.classList.toggle("show");
  });

  document.addEventListener("click", (event) => {
    if (
      !menu.contains(event.target) &&
      event.target !== menuBtn &&
      !menuBtn.contains(event.target)
    ) {
      menu.classList.remove("show");
    }
  });
}
/*
 */
export function initHamburgerMenu() {
  const hamburgerBtn = document.getElementById("hamburgerButton");
  const mainNav = document.getElementById("mainNav");
  const mobileUserMenu = document.getElementById("mobileUserMenu");

  if (!hamburgerBtn || !mainNav) return;

  hamburgerBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    const isMobile = window.innerWidth <= 768;

    const navIsOpen = mainNav.classList.contains("show");

    if (navIsOpen) {
      mainNav.classList.remove("show");
      hamburgerBtn.classList.remove("active");
      if (mobileUserMenu) {
        mobileUserMenu.classList.remove("show");
      }
    } else {
      mainNav.classList.add("show");
      hamburgerBtn.classList.add("active");
      if (mobileUserMenu && isMobile) {
        mobileUserMenu.classList.add("show");
      }
    }
  });

  document.addEventListener("click", (event) => {
    const isMobile = window.innerWidth <= 768;
    const clickedInsideNav = mainNav.contains(event.target);
    const clickedHamburger =
      event.target === hamburgerBtn || hamburgerBtn.contains(event.target);
    const clickedMobileMenu =
      mobileUserMenu && mobileUserMenu.contains(event.target);

    if (!clickedInsideNav && !clickedHamburger && !clickedMobileMenu) {
      mainNav.classList.remove("show");
      hamburgerBtn.classList.remove("active");
      if (mobileUserMenu) {
        mobileUserMenu.classList.remove("show");
      }
    }
  });
}
/* 
This function creates the HTML for the header, it shows different content if the user is logged in or not
// If logged in, it shows the user's name, avatar, and credits,  otherwise it shows login and register user. 
*/
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

        <button class="main-header__hamburger" id="hamburgerButton" aria-label="Toggle menu">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>

        <nav class="main-header__nav d-flex align-items-center gap-3" id="mainNav">
        <div class="main-header__credits d-flex align-items-center gap-1">
          <i class="bi bi-coin"></i>
          <span>${credits} Credits</span>
        </div>

        <a href="../create_listing/index.html"
           class="btn btn-primary btn-sm d-flex align-items-center gap-1">
          <i class="bi bi-plus-lg"></i> Create Listing
        </a>

          <div id="mobileUserMenu" class="mobile-user-menu">
            <a href="../profile/index.html" class="mobile-user-menu__item">
              <i class="bi bi-person"></i> Profile
            </a>
            <div class="mobile-user-menu__divider"></div>
            <a class="mobile-user-menu__item mobile-user-menu__item--danger" id="mobileLogoutLink">
              <i class="bi bi-box-arrow-right"></i> Logout
            </a>
          </div>


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

        <button class="main-header__hamburger" id="hamburgerButton" aria-label="Toggle menu">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>

        <nav class="main-header__nav d-flex align-items-center gap-3" id="mainNav">
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
/* 
 This  loads the header into the page. It checks if the user is logged in and shows the right header content
 It also sets up all the header interactions like dropdowns and menus. 
*/
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
      initHamburgerMenu();
    } catch (error) {
      console.error("Failed to load user profile:", error);
      headerContainer.innerHTML = initHeaderEl(null, false);
      initHamburgerMenu();
    }
  } else {
    headerContainer.innerHTML = initHeaderEl(null, false);
    initHamburgerMenu();
  }
}
