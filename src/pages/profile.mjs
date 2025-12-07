import {
  getUserProfile,
  getUserListings,
  getUserBids,
  getSingleListing,
} from "../api/authService.mjs";
import {
  renderProfileListings,
  renderBidListings,
} from "../listings/renderListings.mjs";
import { initDeleteDelegation } from "../listings/deleteListing.mjs";
import { loadHeader } from "../components/header.mjs";
import {
  prefillForm,
  initUpdateProfileForm,
} from "../components/editProfile.mjs";
import { getUsername } from "../storage/index.mjs";

loadHeader();

// Tab switching function
function initTabSwitching() {
  const tabButtons = document.querySelectorAll(".nav-link");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.dataset.tab;

      tabButtons.forEach((b) => b.classList.remove("active"));
      button.classList.add("active");

      tabPanes.forEach((pane) => pane.classList.remove("active"));
      const targetPane = document.getElementById(tabId);
      if (targetPane) {
        targetPane.classList.add("active");
      }
    });
  });
}

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

// Main init function to load all profile data
async function initProfilePage() {
  try {
    // Get profile data
    const { data: profileData } = await getUserProfile();
    const currentUsername = getUsername();

    // Populate profile header
    const avatarImage = document.getElementById("avatarImage");
    const avatarImage2 = document.getElementById("avatarImage2");
    const profileBanner = document.getElementById("profileBanner");
    const profileUsername = document.getElementById("profileUsername");
    const profileEmail = document.getElementById("profileEmail");
    const profileBio = document.getElementById("profileBio");
    const creditsEl = document.getElementById("creditsEl");
    const myListingsCountEl = document.getElementById("myListingsCount");
    const myBidsCountEl = document.getElementById("myBidsCount");

    if (avatarImage && profileData.avatar?.url) {
      avatarImage.src = profileData.avatar.url;
      avatarImage.alt = profileData.name || "User avatar";
    }
    if (avatarImage2 && profileData.avatar?.url) {
      avatarImage2.src = profileData.avatar.url;
      avatarImage2.alt = profileData.name || "User avatar";
    }

    if (profileBanner && profileData.banner?.url) {
      profileBanner.src = profileData.banner.url;
      profileBanner.alt = "Profile banner";
    }

    if (profileUsername) {
      profileUsername.textContent = profileData.name || "User";
    }

    if (profileEmail) {
      profileEmail.textContent = profileData.email || "";
    }

    if (profileBio) {
      profileBio.textContent = profileData.bio || "";
    }

    if (creditsEl) {
      creditsEl.textContent = profileData.credits ?? 0;
    }

    const listingsContainer = document.getElementById("myListings");
    if (listingsContainer) {
      try {
        const { data: listings } = await getUserListings();
        await renderProfileListings(listingsContainer, listings || []);
        initDeleteDelegation(listingsContainer);

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

initTabSwitching();
initProfilePage();
prefillForm();
initUpdateProfileForm();
