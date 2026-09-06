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
