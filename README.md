# Task Management & Cryptocurrency Dashboard

A web application that combines task management capabilities with real-time cryptocurrency data visualization, built with modern web technologies.

## Features

### Task Management
- Create, track, and manage tasks
- Mark tasks as complete or incomplete
- Filter tasks by status (All/Completed/Incomplete)
- Data persistence using Redux store
- Initial task data fetched from JSONPlaceholder API

### Cryptocurrency Dashboard
- Real-time cryptocurrency data visualization using Chart.js
- Displays data for Ethereum (ETH), Tether (USDT), and USD Coin (USDC)
- Interactive doughnut chart showing price distribution
- Detailed coin information including:
  - Current price
  - Market cap
  - 24h volume
  - 24h percentage change

## Tech Stack

- **Frontend Framework**: Next.js (App Router)
- **State Management**: Redux with @reduxjs/toolkit
- **UI Framework**: Material UI
- **Styling**: SCSS (compiled with Gulp.js)
- **Charts**: Chart.js
- **Language**: TypeScript
- **API Integration**: Native Fetch API

## Prerequisites

Before running this project, make sure you have:
- Node.js (v20.17.0 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone git@github.com:syahbes/todo-and-crypto.git
cd todo-and-crypto
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Creates a production build
- `npm start` - Runs the production server
- `npm run lint` - Runs ESLint
- `npm run sass` - Compiles SCSS files to CSS

## Project Structure

```
src/
├── components/    # React components
├── app/           # Next.js app
├── styles/        # SCSS styles
├── lib/           # Redux store, actions, and reducers
└── types/         # TypeScript type definitions
```

## API Routes

The application uses Next.js API routes to handle external API calls:
- `/api/todos` - Handles task-related operations
- `/api/crypto` - Fetches cryptocurrency data

