# NeoConnect - Staff Feedback and Complaint Management Platform

NeoConnect is a full-stack web application built for internal staff feedback and complaint management.

It allows employees to submit complaints safely, enables role-based case handling, supports polling, and provides analytics for management visibility.

## Project Structure

`neoconnect-backend/` - Node.js + Express + MongoDB API

`neoconnect-frontend/` - Next.js + React + Tailwind CSS UI

## Core Features

- Staff complaint submission with unique tracking ID (`NEO-YYYY-001` format)
- File upload support for complaint attachments
- Role-based access (`staff`, `secretariat`, `case_manager`, `admin`)
- Complaint assignment and status updates
- Poll creation and voting flow
- Analytics dashboard with complaint stats
- JWT cookie-based authentication
- Home route redirect behavior:
	- If logged in -> opens dashboard
	- If not logged in -> opens login page

## Tech Stack

### Frontend

- Next.js
- React
- Tailwind CSS
- shadcn/ui
- Axios

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (file upload)
- node-cron (scheduled escalation job)

## Prerequisites

- Node.js 18+ (recommended)
- npm
- MongoDB running locally or a MongoDB Atlas connection string

## Environment Setup

Create a `.env` file inside `neoconnect-backend/` with the following values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/neoconnect
JWT_SECRET=your_jwt_secret_here
```

## Installation

From the project root (`Project_Neostats`), install dependencies for both apps.

### Backend

```bash
cd neoconnect-backend
npm install
```

### Frontend

```bash
cd ../neoconnect-frontend
npm install
```

## Running the Project

Use two terminals.

### Terminal 1 - Start Backend

```bash
cd neoconnect-backend
npm run dev
```

Backend runs at: `http://localhost:5000`

### Terminal 2 - Start Frontend

```bash
cd neoconnect-frontend
npm run dev
```

Frontend runs at: `http://localhost:3000`

## How Authentication Routing Works

- Open `http://localhost:3000/`
- App checks login session:
	- Valid session -> redirects to `/dashboard`
	- No session -> redirects to `/login`

## Default Scripts

### Backend Scripts

- `npm run dev` - start backend with nodemon
- `npm start` - start backend normally

### Frontend Scripts

- `npm run dev` - start Next.js dev server
- `npm run build` - production build
- `npm run start` - start production build
- `npm run lint` - run ESLint

## Notes

- Uploaded files are stored in `neoconnect-backend/uploads/`.
- Backend CORS is configured for frontend URL `http://localhost:3000`.
- Make sure MongoDB is running before starting backend.
