# NeoConnect

NeoConnect is a full-stack internal platform for employee complaints, case handling, transparency reporting, polling, and analytics.

It supports role-based workflows across staff, secretariat, case managers, and admin users.

## Project Structure

- neoconnect-backend: Node.js + Express + MongoDB API
- neoconnect-frontend: Next.js (App Router) + React + Tailwind UI

## Feature Summary

### Authentication and Access

- Cookie-based JWT authentication
- Session-aware routing:
	- / redirects to /dashboard when logged in
	- / redirects to /login when not logged in
- Registration and login pages
- Role-based access control for protected modules

### Complaint Management

- Staff can submit complaints with:
	- title, description, category, department, location, severity
	- anonymous submission option
	- file attachment
- Tracking ID format: NEO-YYYY-XXX
- Atomic, year-based tracking sequence to avoid collisions under concurrent requests
- Secretariat can view all complaints and assign case managers
- Case managers can view assigned cases and update status

### Escalation Automation

- Daily cron job checks unresolved complaints
- Escalates complaints based on working-day aging logic

### Public Hub and Transparency

- Public Hub overview with live impact metrics
- Impact Tracking page with:
	- resolved totals
	- resolved-in-last-90-days summary
	- open escalated count
	- top resolved impact areas by department/category
	- recent resolved case feed
- Minutes Archive:
	- upload meeting minutes (secretariat/admin)
	- searchable minutes list for authenticated users

### Polls and Analytics

- Secretariat can create polls
- Staff can vote once per poll
- Analytics dashboard includes complaint trends by:
	- status
	- department
	- category
	- hotspot clusters

### Admin Module

- Admin user management page
- View users and update roles

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
- JWT
- Multer
- node-cron

## Prerequisites

- Node.js 18+
- npm
- MongoDB (local or Atlas)

## Environment Setup

Create a .env file inside neoconnect-backend with:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/neoconnect
JWT_SECRET=your_jwt_secret_here
```

## Installation

From project root:

```bash
cd neoconnect-backend
npm install

cd ../neoconnect-frontend
npm install
```

## Run the App

Use two terminals.

### Terminal 1 (Backend)

```bash
cd neoconnect-backend
npm run dev
```

Backend URL: http://localhost:5000

### Terminal 2 (Frontend)

```bash
cd neoconnect-frontend
npm run dev
```

Frontend URL: http://localhost:3000

## Scripts

### Backend

- npm run dev: start with nodemon
- npm start: start with node

### Frontend

- npm run dev: start Next.js dev server
- npm run build: create production build
- npm run start: run production build
- npm run lint: run ESLint

## Important Notes

- Uploaded files are served from the backend uploads directory.
- Backend CORS is configured for http://localhost:3000.
- Ensure MongoDB is running before starting the backend.
