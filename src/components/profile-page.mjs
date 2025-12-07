import {
  getUserProfile,
  getUserListings,
  getUserBids,
} from "../api/auth-service.mjs";
import {
  renderProfileListings,
  renderBidListings,
} from "../listings/render-listings.mjs";
import { initDeleteDelegation } from "../listings/delete-listing.mjs";
import { getUsername } from "../utils/storage.mjs";

export function initTabSwitching() {
  const tabButtons = document.querySelectorAll(".nav-link");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.dataset.tab;

      // Update button states
      tabButtons.forEach((b) => b.classList.remove("active"));
      button.classList.add("active");

      // Update pane states
      tabPanes.forEach((pane) => pane.classList.remove("active"));
      const targetPane = document.getElementById(tabId);
      if (targetPane) {
        targetPane.classList.add("active");
      }
    });
  });
}

export function initProfileEditToggle() {
  const editBtn = document.getElementById("editProfileBtn");
  const editForm = document.getElementById("editForm");
  const cancelBtn = document.getElementById("cancelEditBtn");

  if (!editBtn || !editForm || !cancelBtn) return;

  editBtn.addEventListener("click", () => {
    editForm.style.display = "block";
    editBtn.style.display = "none";
  });

  cancelBtn.addEventListener("click", () => {
    editForm.style.display = "none";
    editBtn.style.display = "block";
  });
}

export async function loadProfilePage() {
  try {
    const { data: profileData } = await getUserProfile();
    const currentUsername = getUsername();

    const avatarImage = document.getElementById("avatarImage");
    const avatarImage2 = document.getElementById("avatarImage2");
    const profileBanner = document.getElementById("profileBanner");
    const profileUsername = document.getElementById("profileUsername");
    const profileEmail = document.getElementById("profileEmail");
    const profileBio = document.getElementById("profileBio");
    const creditsEl = document.getElementById("creditsEl");
    const myListingsCountEl = document.getElementById("myListingsCount");
    const myBidsCountEl = document.getElementById("myBidsCount");

    // Avatar images
    if (avatarImage && profileData.avatar?.url) {
      avatarImage.src = profileData.avatar.url;
      avatarImage.alt = profileData.name || "User avatar";
    }
    if (avatarImage2 && profileData.avatar?.url) {
      avatarImage2.src = profileData.avatar.url;
      avatarImage2.alt = profileData.name || "User avatar";
    }

    // Banner image
    if (profileBanner && profileData.banner?.url) {
      profileBanner.src = profileData.banner.url;
      profileBanner.alt = "Profile banner";
    }

    // Username
    if (profileUsername) {
      profileUsername.textContent = profileData.name || "User";
    }

    // Email
    if (profileEmail) {
      profileEmail.textContent = profileData.email || "";
    }

    // Bio
    if (profileBio) {
      profileBio.textContent = profileData.bio || "";
    }

    // Credits
    if (creditsEl) {
      creditsEl.textContent = profileData.credits ?? 0;
    }

    // Load and render user listings
    const listingsContainer = document.getElementById("myListings");
    if (listingsContainer) {
      try {
        const { data: listings } = await getUserListings();
        await renderProfileListings(listingsContainer, listings || []);
        initDeleteDelegation(listingsContainer);

        // Update listings count
        if (myListingsCountEl) {
          const count = listings?.length ?? profileData._count?.listings ?? 0;
          myListingsCountEl.textContent = `My Listings (${count})`;
        }
      } catch (error) {
        console.error("Failed to load listings:", error);
        listingsContainer.innerHTML = `<p class="text-danger">Failed to load listings.</p>`;
      }
    }

    const bidsContainer = document.getElementById("myBids");
    if (bidsContainer) {
      try {
        const { data: bids } = await getUserBids();

        if (bids && bids.length > 0 && !bids[0].listing) {
          console.warn(
            "Bids don't include listing info - may need to fetch separately"
          );
        }

        await renderBidListings(bidsContainer, bids || []);

        if (myBidsCountEl) {
          const count = bids?.length ?? 0;
          myBidsCountEl.textContent = `My Bids (${count})`;
        }
      } catch (error) {
        console.error("Failed to load bids:", error);
        bidsContainer.innerHTML = `<p class="text-danger">Failed to load bids.</p>`;
      }
    }
  } catch (error) {
    console.error("Failed to load profile:", error);
  }
}
