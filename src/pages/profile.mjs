import { getUserProfile, getUserListings } from "../api/authService.mjs";
import { renderListings } from "../listings/renderListings.mjs";

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

  await renderListings(container, data);
}

loadAvatar();
loadListings();
getUserListings();
