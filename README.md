# Donarium

Donarium is a community donation platform that connects teachers and organizations posting supply needs with donors who can fulfill them — starting with schools and low-income communities needing school supplies, food assistance, hygiene products, and other basic necessities.

**Live demo:** [https://donarium-nine.vercel.app](https://donarium-nine.vercel.app)

**API:** [https://donarium-f8c0.onrender.com/docs](https://donarium-f8c0.onrender.com/docs)

## Problem

Classrooms and community organizations often have specific, recurring supply needs, while willing donors have no easy way to find out what's actually needed nearby. Donarium creates a centralized platform where organizations can post requests and donors can browse, filter, and fulfill them.

## Tech Stack

**Frontend:** React (Vite), JavaScript, React Router, Axios, Leaflet/React-Leaflet
**Backend:** Python, FastAPI
**Database:** MongoDB (Atlas), PyMongo
**Auth:** JWT (python-jose), bcrypt password hashing, role-based authorization
**Geocoding/Maps:** Nominatim (OpenStreetMap), Leaflet, OpenStreetMap tiles
**Deployment:** Vercel (frontend), Render (backend), MongoDB Atlas (database)

## Features

- User registration and login (roles: teacher/organization, donor) with JWT-based authentication and protected routes
- Password hashing via bcrypt, with a validated address/geocoding flow for organizations
- Resource request CRUD with ownership checks — only a request's creator can edit or delete it
- Role-based authorization — only teachers/organizations can create requests; only donors can fulfill them
- Donor fulfillment workflow — donors mark open requests as fulfilled; creators can't fulfill their own requests
- Query-based filtering on requests (status, category)
- Organization geocoding — addresses are converted to coordinates via Nominatim and stored on the user's profile
- Interactive map (Leaflet + OpenStreetMap) showing all organization locations, viewable by guests without an account
- Profile editing — update name and, for organizations, drop-off address (re-geocoded automatically on change)
- Deployed and publicly accessible (Vercel + Render + MongoDB Atlas)

## Planned

- Automated testing (pytest for backend routes)
- Admin functionality (manage users, review/remove requests)
- Saved/bookmarked requests for donors

## Project Structure

```
donarium/
├── backend/
│   ├── requirements.txt
│   └── app/
│       ├── main.py
│       ├── routers/       # auth, requests, organizations
│       ├── schemas/       # Pydantic request/response models
│       ├── services/      # business logic (users, requests)
│       ├── database/      # MongoDB connection
│       └── utils/         # security (JWT/bcrypt), geocoding, auth dependencies
└── frontend/
    └── src/
        ├── pages/          # Login, Register, Dashboard, Requests, CreateRequest, Profile, OrganizationsMap
        ├── components/     # Navbar, AppLayout, ProtectedRoute
        ├── context/        # AuthContext (global auth state)
        └── services/       # Axios API clients (api, requests, users, organizations)
```

## Local Setup

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Create `backend/.env`:
```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET_KEY=your_generated_secret
```

Run:
```bash
uvicorn app.main:app --reload
```

API docs available at `http://127.0.0.1:8000/docs`.

### Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:
```
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Run:
```bash
npm run dev
```

App available at `http://localhost:5173`.

## Deployment

- **Frontend** is deployed on [Vercel](https://vercel.com), auto-deploying from the `frontend/` directory on push to `main`.
- **Backend** is deployed on [Render](https://render.com) as a web service, auto-deploying from the `backend/` directory on push to `main`.
- **Database** is hosted on [MongoDB Atlas](https://www.mongodb.com/atlas), with network access configured to allow connections from Render.

Both deployments read their configuration (`MONGODB_URI`, `JWT_SECRET_KEY`, `VITE_API_BASE_URL`) from platform-level environment variables, not from committed `.env` files.

## Status

🚀 Deployed and functional — core donation workflow (post → browse/filter → fulfill) is complete, along with organization geocoding, map discovery, and profile management. Testing and admin features are the main remaining gaps before this is fully "done."
