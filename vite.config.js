import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      // Specify all HTML entry points for multi-page application
      input: {
        main: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "login/index.html"),
        register: resolve(__dirname, "register/index.html"),
        feed: resolve(__dirname, "feed/index.html"),
        profile: resolve(__dirname, "profile/index.html"),
        createListing: resolve(__dirname, "create_listing/index.html"),
        updateListing: resolve(__dirname, "update_listing/index.html"),
        singlePage: resolve(__dirname, "single_page/index.html"),
      },
    },
  },
});
