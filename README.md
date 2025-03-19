# BilliMD Skill Test

A minimalistic modern React application built with TypeScript, Vite, React Router, and TailwindCSS.

## Project Overview

This project is a web application that includes:

- A simple dashboard with API data
- A dynamic form builder
- A paginated and searchable data table

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd billimd-skill-test

# Install dependencies
pnpm install
# or with npm
npm install
```

### Running the Development Server

```bash
# Start the development server
pnpm dev
# or with npm
npm run dev
```

Navigate to `http://localhost:5173` in your browser to view the application.

### Building for Production

```bash
# Build the project
pnpm build
# or with npm
npm run build

# Preview the production build locally
pnpm preview
# or with npm
npm run preview
```

## Design Choices

- **React 19**: Using the latest React version for improved performance and features
- **TypeScript**: For type safety and better developer experience
- **Vite**: Fast development environment and optimized production builds
- **TailwindCSS**: Utility-first CSS framework for rapid UI development
- **React Router**: For client-side routing with nested routes
- **React Query**: For efficient data fetching and state management
- **Radix UI**: For accessible and composable UI components
- **Dark/Light Theme**: Implemented using next-themes with system preference detection

## Project Structure

- `src/components`: Reusable UI components
- `src/pages`: Application pages corresponding to routes
- `src/lib`: Utility functions and custom hooks
- `src/assets`: Static assets like images and icons

## Deployment

This project is configured for deployment on Vercel, with configuration in `vercel.json`.
