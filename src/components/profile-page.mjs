// Import functions we need from other files
import {
  getUserProfile,
  getUserListings,
  getUserBids,
  getUserWins,
  getUserProfileByUsername,
  getUserListingsByUsername,
  getUserBidsByUsername,
  getUserWinsByUsername,
} from "../api/auth-service.mjs";
import {
  renderProfileListings,
  renderBidListings,
  renderWinListings,
} from "../listings/render-listings.mjs";
import { initDeleteDelegation } from "../listings/delete-listing.mjs";
import { loadingSpinner } from "./loading.mjs";
import { getParam } from "../utils/get-params.mjs";

// This function handles switching between tabs (Listings, Bids, Wins)
export function initTabSwitching() {
  // Get all the tab buttons and tab content areas
  const allTabButtons = document.querySelectorAll(".nav-link");
  const allTabPanes = document.querySelectorAll(".tab-pane");

  // Add click listener to each tab button
  allTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabToShow = button.dataset.tab;

      allTabButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      allTabPanes.forEach((pane) => {
        pane.classList.remove("active");
      });

      const tabPaneToShow = document.getElementById(tabToShow);
      if (tabPaneToShow) {
        tabPaneToShow.classList.add("active");
      }
    });
  });
}

// This function handles showing/hiding the edit profile form
export function initProfileEditToggle() {
  // Get the edit button, form, and cancel button from the page
  const editButton = document.getElementById("editProfileBtn");
  const editFormElement = document.getElementById("editForm");
  const cancelButton = document.getElementById("cancelEditBtn");

  // If any of these elements don't exist, stop here
  if (!editButton || !editFormElement || !cancelButton) {
    return;
  }

  // When edit button is clicked, show the form and hide the button
  editButton.addEventListener("click", () => {
    editFormElement.classList.remove("profile-page__edit-form--hidden");
    editButton.classList.add("d-none");
  });

  // When cancel button is clicked, hide the form and show the edit button again
  cancelButton.addEventListener("click", () => {
    editFormElement.classList.add("profile-page__edit-form--hidden");
    editButton.classList.remove("d-none");
  });
}

// This is the main function that loads all the profile page data
export async function loadProfilePage() {
  try {
    // Check if we're viewing someone else's profile by looking at the URL
    const usernameFromUrl = getParam("user");
    const loggedInUsername = localStorage.getItem("username");

    let profileDataResponse;
    let viewingOtherUser = false;

    // If there's a username in the URL and it's different from the logged in user,
    // we're viewing someone else's profile
    if (usernameFromUrl && usernameFromUrl !== loggedInUsername) {
      viewingOtherUser = true;
      // Get the other user's profile data
      profileDataResponse = await getUserProfileByUsername(usernameFromUrl);
    } else {
      // Otherwise, we're viewing our own profile
      profileDataResponse = await getUserProfile();
    }

    // Extract the profile data from the response
    const profileData = profileDataResponse.data;

    // Check if the profile we're viewing belongs to the logged in user
    const profileOwnerUsername = profileData.name;
    const isMyProfile = profileOwnerUsername === loggedInUsername;

    // Show or hide the edit button based on whether it's the user's own profile
    const editButton = document.getElementById("editProfileBtn");
    if (editButton) {
      if (isMyProfile) {
        // Show the edit button if it's their own profile
        editButton.style.display = "block";
      } else {
        // Hide the edit button if it's someone else's profile
        editButton.style.display = "none";
      }
    }

    // Get all the HTML elements we need to update with profile information

    const avatarImageLargeElement = document.getElementById("avatarImage2");
    const bannerElement = document.getElementById("profileBanner");
    const usernameElement = document.getElementById("profileUsername");
    const emailElement = document.getElementById("profileEmail");
    const bioElement = document.getElementById("profileBio");
    const creditsElement = document.getElementById("creditsEl");
    const listingsCountElement = document.getElementById("myListingsCount");
    const bidsCountElement = document.getElementById("myBidsCount");
    const winsCountElement = document.getElementById("myWinsCount");

    // Update the large avatar image
    if (avatarImageLargeElement) {
      const largeAvatarContainer = document.getElementById("avatarImage2");
      if (largeAvatarContainer) {
        if (profileData.avatar && profileData.avatar.url) {
          largeAvatarContainer.innerHTML = `<img src="${
            profileData.avatar.url
          }" alt="${
            profileData.name || "User avatar"
          }" class="profile-page__avatar profile-page__avatar--large" />`;
        }
      }
    }

    // Update the profile banner image
    if (bannerElement) {
      if (profileData.banner && profileData.banner.url) {
        bannerElement.innerHTML = `<img src="${profileData.banner.url}" alt="Profile banner" />`;
      } else {
        // If there's no banner, add a placeholder class
        bannerElement.classList.add("profile-page__banner--placeholder");
      }
    }

    // Update the username text
    if (usernameElement) {
      usernameElement.textContent = profileData.name || "User";
    }

    // Update the email text
    if (emailElement) {
      emailElement.textContent = profileData.email || "";
    }

    // Update the bio text
    if (bioElement) {
      bioElement.textContent = profileData.bio || "";
    }

    // Update the credits amount
    if (creditsElement) {
      creditsElement.textContent = profileData.credits || 0;
    }

    // Load and display the user's listings
    const listingsContainer = document.getElementById("myListings");
    if (listingsContainer) {
      // Show loading spinner while we fetch the data
      listingsContainer.innerHTML = loadingSpinner();

      try {
        let listingsResponse;
        let listingsArray;

        // Get listings from the API
        if (viewingOtherUser) {
          // If viewing someone else, get their listings by username
          listingsResponse = await getUserListingsByUsername(usernameFromUrl);
          listingsArray = listingsResponse.data || [];
        } else {
          // If viewing own profile, get own listings
          listingsResponse = await getUserListings();
          listingsArray = listingsResponse.data || [];
        }

        // Check if this is the logged in user's own profile
        const currentLoggedInUser = localStorage.getItem("username");
        const profileOwnerName = profileData.name;
        const isOwnProfile = currentLoggedInUser === profileOwnerName;

        // Render the listings (pass isOwnProfile to control edit/delete buttons)
        await renderProfileListings(
          listingsContainer,
          listingsArray,
          isOwnProfile
        );

        // Only enable delete functionality if it's the user's own profile
        if (isOwnProfile) {
          initDeleteDelegation(listingsContainer);
        }

        // Update the tab label with the count
        if (listingsCountElement) {
          const listingsCount = listingsArray.length;
          if (viewingOtherUser) {
            // If viewing someone else, just say "Listings"
            listingsCountElement.textContent = `Listings (${listingsCount})`;
          } else {
            // If viewing own profile, say "My Listings"
            listingsCountElement.textContent = `My Listings (${listingsCount})`;
          }
        }
      } catch (error) {
        console.error("Failed to load listings:", error);
        listingsContainer.innerHTML = `<p class="text-danger">Failed to load listings.</p>`;
      }
    }

    // Load and display the user's bids
    const bidsContainer = document.getElementById("myBids");
    if (bidsContainer) {
      // Show loading spinner while we fetch the data
      bidsContainer.innerHTML = loadingSpinner();

      try {
        let bidsResponse;
        let bidsArray;

        // Get bids from the API
        if (viewingOtherUser) {
          // If viewing someone else, get their bids by username
          bidsResponse = await getUserBidsByUsername(usernameFromUrl);
          bidsArray = bidsResponse.data || [];
        } else {
          // If viewing own profile, get own bids
          bidsResponse = await getUserBids();
          bidsArray = bidsResponse.data || [];
        }

        // Check if this is the logged in user's own profile
        const currentLoggedInUser = localStorage.getItem("username");
        const profileOwnerName = profileData.name;
        const isOwnProfile = currentLoggedInUser === profileOwnerName;

        // Render the bids (pass isOwnProfile to control "Your bid" vs "User's bid" text)
        await renderBidListings(bidsContainer, bidsArray, isOwnProfile);

        // Update the tab label with the count
        if (bidsCountElement) {
          const bidsCount = bidsArray.length;
          if (viewingOtherUser) {
            // If viewing someone else, just say "Bids"
            bidsCountElement.textContent = `Bids (${bidsCount})`;
          } else {
            // If viewing own profile, say "My Bids"
            bidsCountElement.textContent = `My Bids (${bidsCount})`;
          }
        }
      } catch (error) {
        console.error("Failed to load bids:", error);
        bidsContainer.innerHTML = `<p class="text-danger">Failed to load bids.</p>`;
      }
    }

    // Load and display the user's wins (auctions they won)
    const winsContainer = document.getElementById("myWins");
    if (winsContainer) {
      // Show loading spinner while we fetch the data
      winsContainer.innerHTML = loadingSpinner();

      try {
        let winsResponse;
        let winsArray;

        // Get wins from the API
        if (viewingOtherUser) {
          // If viewing someone else, get their wins by username
          winsResponse = await getUserWinsByUsername(usernameFromUrl);
          winsArray = winsResponse.data || [];
        } else {
          // If viewing own profile, get own wins
          winsResponse = await getUserWins();
          winsArray = winsResponse.data || [];
        }

        // Render the wins
        await renderWinListings(winsContainer, winsArray);

        // Update the tab label with the count
        if (winsCountElement) {
          const winsCount = winsArray.length;
          if (viewingOtherUser) {
            // If viewing someone else, just say "Wins"
            winsCountElement.textContent = `Wins (${winsCount})`;
          } else {
            // If viewing own profile, say "My Wins"
            winsCountElement.textContent = `My Wins (${winsCount})`;
          }
        }
      } catch (error) {
        console.error("Failed to load wins:", error);
        winsContainer.innerHTML = `<p class="text-danger">Failed to load wins.</p>`;
      }
    }
  } catch (error) {
    console.error("Failed to load profile:", error);
  }
}
