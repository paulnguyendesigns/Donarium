# Donarium

Donarium is a community resource platform that connects people and organizations with unused resources to people who need them — starting with schools, teachers, and low-income communities needing supplies, food assistance, hygiene products, and other basic necessities.

## Problem

Communities often have unused supplies and organizations willing to help, but the people who need those resources don't know where to find them. Donarium creates a centralized platform where organizations can post resource needs and donors can discover and fulfill them.

## Tech Stack

**Frontend:** React (Vite), JavaScript, React Router, Axios

**Backend:** Python, FastAPI

**Database:** MongoDB (Atlas), PyMongo

**Auth:** JWT (python-jose), bcrypt password hashing, role-based authorization

## Features (current)

- User registration and login (roles: teacher/organization, donor)
- JWT-based authentication with protected routes
- Resource request CRUD (create, read, update, delete) with ownership checks
- Role-based authorization (only teachers/organizations can create requests)

## Planned

- Donor browsing, search, filtering, and claiming requests
- Map-based discovery (OpenStreetMap + React Leaflet)
- Dashboards with real data
- Deployment (Vercel + Render)

## Project Structure

```
donarium/
├── backend/
│   ├── requirements.txt
│   └── app/
│       ├── main.py
│       ├── routers/       # route definitions
│       ├── schemas/       # Pydantic request/response models
│       ├── services/      # business logic
│       ├── database/      # MongoDB connection
│       └── utils/         # security, auth dependencies
└── frontend/
    └── src/
        ├── pages/          # Login, Register, Dashboard
        ├── components/     # ProtectedRoute, reusable UI
        ├── context/        # AuthContext (global auth state)
        └── services/       # Axios API client
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

## Status

🚧 In active development — MVP phase.
