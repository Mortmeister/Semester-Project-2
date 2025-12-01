import { getUserProfile, getUserListings } from "../api/authService.mjs";
import { renderProfileListings } from "../listings/renderListings.mjs";
import { initDeleteDelegation } from "../listings/deleteListing.mjs";
import { initHeaderDropdown } from "../components/header.mjs";

const container = document.querySelectorAll(["profile-page__bid-card"]);

initHeaderDropdown();

const tabButtons = document.querySelectorAll(".nav-link");
const tabPanes = document.querySelectorAll(".tab-pane");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const tabId = button.dataset.tab;

    tabButtons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");

    tabPanes.forEach((pane) => pane.classList.remove("active"));
    document.getElementById(tabId).classList.add("active");
  });
});

// Profile edit
const editBtn = document.getElementById("editProfileBtn");
const editForm = document.getElementById("editForm");
const cancelBtn = document.getElementById("cancelEditBtn");

editBtn.addEventListener("click", () => {
  editForm.style.display = "block";
  editBtn.style.display = "none";
});

cancelBtn.addEventListener("click", () => {
  editForm.style.display = "none";
  editBtn.style.display = "block";
});

async function loadAvatar() {
  const avatarImage = document.getElementById("avatarImage");
  const avatarImage2 = document.getElementById("avatarImage2");
  const creditsEl = document.getElementById("creditsEl");
  const myListingsCountEl = document.getElementById("myListingsCount");

  try {
    const { data } = await getUserProfile();
    avatarImage.src = data.avatar.url;
    avatarImage2.src = data.avatar.url;
    creditsEl.textContent = data.credits;
    myListingsCountEl.textContent = `My Listings (${data._count.listings})`;
  } catch (error) {
    console.log(error);
  }
}
export async function loadListings() {
  const container = document.getElementById("myListings");
  const { data } = await getUserListings();
  await renderProfileListings(container, data);
}

loadAvatar();
loadListings();
initDeleteDelegation(container);
