from datetime import datetime
from app.database.connection import database
from app.schemas.user import UserCreate
from app.utils.security import hash_password

users_collection = database["users"]


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
