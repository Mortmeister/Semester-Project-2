import { searchPosts, getListings, searchUsers } from "../api/auth-service.mjs";
import { renderListings } from "../listings/render-listings.mjs";
import { listingSkeleton } from "./loading.mjs";
import { createUserCard } from "./user-card-ui.mjs";
import { updatePaginationButtons } from "./pagination.mjs";

const container = document.getElementById("listingsSectionContainer");
const usersContainer = document.getElementById("usersSectionContainer");
const searchInput = document.getElementById("searchInput");
const searchIcon = document.getElementById("searchIcon");
const toggleButtons = document.querySelectorAll(".search-mode-toggle__btn");
const sectionTitle = document.getElementById("sectionTitle");
const sortSelect = document.getElementById("sortPostsEl");
const tagsSelect = document.getElementById("sortByTagsEl");
const pagination = document.querySelector(".pagination");

let currentMode = "listings";

export function initSearchPosts() {
  if (!searchInput || !container || !usersContainer) return;

  // Toggle between listings and users
  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.getAttribute("data-mode");
      switchSearchMode(mode);
    });
  });

  // Search input handler
  searchInput.addEventListener("input", async (event) => {
    const query = event.target.value.trim();

    if (currentMode === "listings") {
      await handleListingsSearch(query);
    } else {
      await handleUsersSearch(query);
    }
  });
}

function switchSearchMode(mode) {
  currentMode = mode;

  // Update toggle buttons
  toggleButtons.forEach((btn) => {
    if (btn.getAttribute("data-mode") === mode) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Update search icon
  if (mode === "users") {
    searchIcon.className = "bi bi-person search-bar__icon";
    searchInput.placeholder = "Search users by name or email...";
  } else {
    searchIcon.className = "bi bi-search search-bar__icon";
    searchInput.placeholder =
      "Search listings by title, description, or tags...";
  }

  // Update section title
  if (sectionTitle) {
    if (mode === "users") {
      sectionTitle.textContent = "Users";
    } else {
      sectionTitle.textContent = "Active Listings";
    }
  }

  // Show/hide containers and related elements
  if (mode === "users") {
    container.style.display = "none";
    usersContainer.style.display = "grid";
    if (sortSelect) sortSelect.style.display = "none";
    if (tagsSelect) tagsSelect.style.display = "none";
    if (pagination) pagination.style.display = "none";
    updatePaginationButtons(null, 0);
  } else {
    container.style.display = "grid";
    usersContainer.style.display = "none";
    if (sortSelect) sortSelect.style.display = "block";
    if (pagination) pagination.style.display = "flex";
  }

  // Clear and reset search
  searchInput.value = "";
  if (mode === "listings") {
    handleListingsSearch("");
  } else {
    handleUsersSearch("");
  }
}

async function handleListingsSearch(query) {
  container.innerHTML = listingSkeleton(6);

  if (query.length === 0) {
    const { data } = await getListings();
    renderListings(container, data);
    return;
  }

  const { data } = await searchPosts(query);
  renderListings(container, data);
}

async function handleUsersSearch(query) {
  usersContainer.innerHTML = listingSkeleton(6);

  if (query.length === 0) {
    usersContainer.innerHTML = "";
    return;
  }

  try {
    const { data } = await searchUsers(query);
    renderUsers(usersContainer, data);
  } catch (error) {
    console.error("Error searching users:", error);
    usersContainer.innerHTML =
      "<p class='text-center text-muted'>Error loading users. Please try again.</p>";
  }
}

export function renderUsers(container, users) {
  if (!users || users.length === 0) {
    container.innerHTML =
      "<p class='text-center text-muted'>No users found.</p>";
    return;
  }

  let html = "";
  for (let i = 0; i < users.length; i++) {
    html += createUserCard(users[i]);
  }
  container.innerHTML = html;
}

export function renderFilteredUsers(container, users, query) {
  if (!query || query.trim().length === 0) {
    container.innerHTML = "";
    return;
  }

  const filtered = users.filter((user) => {
    const name = (user.name || "").toLowerCase();
    const email = (user.email || "").toLowerCase();
    const searchTerm = query.toLowerCase();
    return name.includes(searchTerm) || email.includes(searchTerm);
  });

  renderUsers(container, filtered);
}
