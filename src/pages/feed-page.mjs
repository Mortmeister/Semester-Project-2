import { loadListings } from "../components/pagination.mjs";
import { loadHeader } from "../components/header.mjs";
import { initSearchPosts } from "../components/search-posts.mjs";
import { initSortPosts } from "../components/sort-auctions.mjs";

loadListings();
loadHeader();
initSearchPosts();
initSortPosts();
