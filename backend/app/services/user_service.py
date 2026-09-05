from datetime import datetime
from app.database.connection import database
from app.schemas.user import UserCreate
from app.utils.security import hash_password, verify_password

users_collection = database["users"] # names the database "users" on MongoDB


def create_user(user_data: UserCreate) -> dict:
    existing_user = users_collection.find_one({"email": user_data.email})
    if existing_user:
        raise ValueError("A user with this email already exists.")

    user_document = {
        "first_name": user_data.first_name,
        "last_name": user_data.last_name,
        "email": user_data.email,
        "password_hash": hash_password(user_data.password),
        "role": user_data.role,
        "created_at": datetime.utcnow(),
    }

    result = users_collection.insert_one(user_document)
    user_document["_id"] = result.inserted_id
    return user_document

def authenticate_user(email: str, password: str) -> dict:
    user = users_collection.find_one({"email": email})
    if not user:
        raise ValueError("Invalid email or password.")

    if not verify_password(password, user["password_hash"]):
        raise ValueError("Invalid email or password.")

    return user

def get_organization_locations() -> list[dict]:
    return list(
        users_collection.find(
            {
                "role": {"$in": ["teacher", "organization"]},
                "latitude": {"$ne": None},
            }
        )
    )