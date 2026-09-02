# Photographer Portfolio

A modern portfolio website for a photographer built with React, Vite, and a modular architecture for galleries, journal posts, testimonials, and contact flows.

## Overview

This project is designed to showcase photography work with:

- a homepage and editorial-style landing experience
- gallery and collection pages with filtered categories
- a journal/news-style blog section
- testimonial and about sections
- contact form integration
- dynamic data support via Sanity and a mock data layer
- smooth animation and scroll-based presentation

## Tech Stack

- React 19
- Vite
- React Router
- Framer Motion
- Tailwind CSS
- Sanity CMS integration
- React Query
- Vite environment configuration

## Features

- Responsive portfolio layout
- Category-based gallery filtering
- Client gallery detail pages
- Journal article listing and individual post pages
- Lightbox support for image viewing
- Reusable UI and layout components
- Clean modular architecture for data, services, views, and routes

## Project Structure

```bash
web/
├── public/
├── src/
│   ├── config/
│   ├── controllers/
│   │   ├── hooks/
│   │   └── services/
│   ├── models/
│   │   ├── datasources/
│   │   ├── entities/
│   │   ├── mappers/
│   │   └── repositories/
│   ├── routes/
│   ├── utils/
│   ├── views/
│   │   ├── components/
│   │   └── pages/
│   ├── index.css
│   ├── main.jsx
│   └── ...
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm or pnpm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The app will run in development mode and is typically available at:

```bash
http://localhost:5173
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Environment Variables

Create a `.env` file in the `web` folder and add the required values for your CMS and contact form setup.

Example:

```bash
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
VITE_DATA_SOURCE=sanity
VITE_WEB3FORMS_KEY=your_web3forms_key
```

These values are read in `src/config/env.js`.

## Data Sources

The app supports a modular data source setup:

- `mockDataSource.js` for local/mock data
- `sanityClient.js` for Sanity CMS communication
- repository and mapper layers for abstraction between data and UI

## Routing

Main routes are configured in `src/routes/index.jsx` and include:

- `/`
- `/gallery`
- `/gallery/:slug`
- `/about`
- `/journal`
- `/journal/:slug`
- `/contact`

## Linting

```bash
npm run lint
```

## Deployment

This project includes a `vercel.json` configuration for deployment to Vercel.

## Notes

This project is structured as a clean frontend architecture with a separation between:

- routes
- pages
- components
- services and hooks
- domain/entity models
- repositories and data access

This makes it easier to swap data sources or extend content features without rewriting the UI layer.

## License

This project is for portfolio/demo use unless otherwise specified by the owner.

