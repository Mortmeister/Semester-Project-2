# Auction House

A responsive auction platform built as part of my frontend development studies exam. Users can create listings, place bids, and manage their profiles. Visitors can browse and search through active auctions.

## Description

This is a semester project for my frontend development course. It's an auction platform where users can create listings with multiple images, place bids on items, and view their bidding history. The platform uses the Noroff Auction API for backend functionality.

The project focuses on working with REST APIs, handling authentication, and building a responsive user interface with vanilla JavaScript.

## Features

- **User Authentication**: Login and registration with @stud.noroff.no email addresses
- **Listings**: Create, view, update, and delete auction listings
- **Bidding**: Place bids on active auctions with real-time credit tracking
- **Profile Management**: View and edit your profile, including avatar and bio
- **Profile Pages**: See your own listings, bids, and won auctions, or browse other users' profiles
- **Multiple Images**: Add multiple images to each listing with alt text
- **Search & Filter**: Search for listings and users, filter by tags, and sort by date or ending time
- **Dynamic tags**: Tags are generated dynamically based of the top 10 most popular tags in the API.
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **HTML** - Structure and markup
- **SCSS** - Styling with variables and nesting (compiled to CSS)
- **Vanilla JavaScript** - All functionality without frameworks
- **Noroff Auction API** - Backend API for authentication, listings, and bids
- **Vite** - Build tool and development server
- **Netlify** - Deployment platform

## Getting Started

### Installation

1. Clone the repository or download the project files
2. Open a terminal in the project folder
3. Install dependencies:

   ```bash
   npm install
   ```

### Running the Project

1. Start the development server:

   ```bash
   npm run dev
   ```

2. The project will open in your browser, usually at `http://localhost:5173`

3. To compile SCSS while developing (in a separate terminal):

   ```bash
   npm run sass:watch
   ```

4. To build for production:

   ```bash
   npm run build
   ```

## Environment Variables

The project uses a `.env` file to store the API key. Create a `.env` file in the root directory with:

```env
VITE_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual Noroff API key. The `VITE_` prefix is required for Vite to expose the variable to your JavaScript code.

## Deployment

The project is deployed on Netlify. To deploy:

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Add the `VITE_API_KEY` environment variable in Netlify's site settings

Netlify will automatically build and deploy when you push to your main branch if you connect it to your repository.

## Limitations / Future Improvements

There are a few things I'd like to improve if I had more time:

- **Better Error Handling**: Currently using `alert()` for errors. Would like to implement a toast notification system or inline error messages
- **Pagination**: The pagination works but could be improved with better loading states and page number display
- ** Tags**: Make tags clickable to show all listings with the selected tag
- **Testing**: No automated tests yet. Would like to add Playwright for E2E testing.
- **Code Organization**: Some duplicate code exists (like the storage utilities). Would refactor to remove duplication
- **Design & Visual Identity**: The design is intentionally minimal and functional, but with more time I would like to personalize it further. This could include stronger branding, more refined typography choices, improved spacing, and small UI details that give the application more character while still keeping it professional.

## Author

Morten Lillehaug
