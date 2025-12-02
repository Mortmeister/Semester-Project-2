import { loadListings } from "../components/pagination.mjs";
import { loadHeader } from "../components/header.mjs";
import { initSearchPosts } from "../components/searchPosts.mjs";
import { initSortPosts } from "../components/sortAuctions.mjs";

loadListings();
loadHeader();
initSearchPosts();
initSortPosts();
