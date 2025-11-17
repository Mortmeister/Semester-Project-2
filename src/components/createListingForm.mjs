import { createListing } from "../api/authService.mjs";

export function initCreateListingForm() {
  const createListingFormEl = document.getElementById("createListingForm");
  // if (!createListingFormEl) return;

  createListingFormEl.addEventListener("submit", async (event) => {
    event.preventDefault();
    debugger;

    const formData = new FormData(createListingFormEl);
    const payload = {
      title: formData.get("title"),
      description: formData.get("description"),
      media: [
        {
          url: formData.get("imageUrl"),
          alt: formData.get("imageAlt"),
        },
      ],
      endsAt: formData.get("endsAt"),
    };
    console.log(payload);

    try {
      const { data } = await createListing(payload);
      console.log("User registered:", data);
      // maybe redirect to login page
    } catch (error) {
      console.error("Register error:", error);
      alert("Registration failed. Check your input.");
    }
  });
}
