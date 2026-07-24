from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.connection import database

app = FastAPI(title="Donarium API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    database.command("ping")
    print("✅ Connected to MongoDB")


@app.get("/health")
def health_check():
    return {"status": "ok"}