import { getUserProfile, updateUserProfile } from "../api/auth-service.mjs";

/*
 This function fills the edit profile form with the user's current profile data
 It fetches the user's profile and puts their name, bio, avatar, and banner into the form
*/
export async function prefillForm() {
  const username = document.getElementById("editName");
  const bio = document.getElementById("editBio");
  const avatarUrl = document.getElementById("editAvatar");
  const bannerUrl = document.getElementById("editBanner");
  try {
    const { data } = await getUserProfile();

    username.value = data.name ?? "";
    bio.value = data.bio ?? "";
    avatarUrl.value = data.avatar?.url ?? "";
    bannerUrl.value = data.banner?.url ?? "";
  } catch (error) {
    console.error("Failed to prefill profile:", error);
  }
}
/*
 This function sets up the profile update form
 When the form is submitted, it sends updated profile data to the API
 After updating, it redirects back to the profile page
 */
export function initUpdateProfileForm() {
  const editProfileForm = document.getElementById("profileForm");
  if (!editProfileForm) return;

  editProfileForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(editProfileForm);

    const payload = {
      name: formData.get("username"),
      bio: formData.get("bio"),
      avatar: {
        url: formData.get("avatarUrl"),
        alt: "User avatar",
      },
      banner: {
        url: formData.get("bannerUrl"),
        alt: "User banner",
      },
    };

    try {
      await updateUserProfile(payload);
      window.location.href = "../profile/index.html";
    } catch (error) {
      console.error("Profile update error:", error);
      alert("Profile update failed.");
    }
  });
}
