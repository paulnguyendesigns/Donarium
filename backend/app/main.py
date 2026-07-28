from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.connection import database
from app.routers import auth
from app.routers import auth, requests


@asynccontextmanager
async def lifespan(app: FastAPI):
    database.command("ping")
    print("✅ Connected to MongoDB")

    yield

    print("🛑 Server closed")


app = FastAPI(title="Donarium API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(requests.router)


@app.get("/health")
def health_check():
    return {"status": "ok"}