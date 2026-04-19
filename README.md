# Archive Toy Shop

A full-stack showcase project for a vintage toy store, featuring a charcoal and gold aesthetic.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

## Getting Started

Follow these steps to get the project running on your local machine.

### 1. Install Dependencies

Open your terminal in the project root directory and run:

```bash
npm install
```

### 2. Database Setup

The project uses Prisma with SQLite. You need to generate the Prisma client and initialize the database with mock data.

**Run these commands in your terminal:**

```bash
# Generate Prisma Client
npx prisma generate

# Create the database and run migrations
npx prisma migrate dev --name init
```

*Note: The `migrate dev` command will also automatically run the seed script (`prisma/seed.ts`) to populate your database with high-quality toy data.*

### 3. Running the Application

This project consists of two parts: the backend server and the frontend application. You need to run both.

#### Step A: Start the Backend Server
In your terminal, run:
```bash
npm run server
```
The backend server will start on `http://localhost:5001`.

#### Step B: Start the Frontend (Vite)
Open a **new terminal window/tab**, navigate to the project root, and run:
```bash
npm run dev
```
The frontend will be available at `http://localhost:5173` (or the port displayed in your terminal).

---

## Default Admin Account

To access the Admin Dashboard, use the following credentials:
- **Email:** `admin@archiveshop.com`
- **Password:** `admin123`

## Commands Summary

| Task | Command |
| :--- | :--- |
| **Install Everything** | `npm install` |
| **Init/Reset Database** | `npx prisma migrate dev --name init` |
| **Start Backend** | `npm run server` |
| **Start Frontend** | `npm run dev` |
| **Build for Production** | `npm run build` |

## Troubleshooting

### Windows Users
- If you encounter issues with `npx` commands in PowerShell, try using a standard Command Prompt (cmd) or ensure your execution policy allows running scripts.
- Make sure no other process is using ports `5001` or `5173`.

### Linux/macOS Users
- Ensure you have write permissions in the project directory for the SQLite database file (`dev.db`) to be created.

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite 8, Tailwind CSS v4
- **Backend:** Express.js 5, Node.js, tsx (for ESM support)
- **Database:** Prisma ORM, SQLite
- **Styling:** Custom "Charcoal & Gold" design system
