from datetime import datetime
from bson import ObjectId
from app.database.connection import database
from app.schemas.user import UserCreate, UserUpdate
from app.utils.security import hash_password, verify_password
from app.utils.geocoding import geocode_address

users_collection = database["users"]


def create_user(user_data: UserCreate) -> dict:
    existing_user = users_collection.find_one({"email": user_data.email})
    if existing_user:
        raise ValueError("A user with this email already exists.")

    latitude = None
    longitude = None

    if user_data.role in ("teacher", "organization"):
        if not (user_data.address and user_data.city and user_data.state):
            raise ValueError("Teachers and organizations must provide an address, city, and state.")

        coordinates = geocode_address(user_data.address, user_data.city, user_data.state)
        if coordinates is None:
            raise ValueError("Could not find that address. Please check it and try again.")
        latitude, longitude = coordinates

    user_document = {
        "first_name": user_data.first_name,
        "last_name": user_data.last_name,
        "email": user_data.email,
        "password_hash": hash_password(user_data.password),
        "role": user_data.role,
        "address": user_data.address,
        "city": user_data.city,
        "state": user_data.state,
        "latitude": latitude,
        "longitude": longitude,
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


def update_user(user_id: str, data: UserUpdate, role: str) -> dict:
    update_fields = {k: v for k, v in data.model_dump().items() if v is not None}

    if not update_fields:
        return users_collection.find_one({"_id": ObjectId(user_id)})

    location_fields_changed = any(k in update_fields for k in ("address", "city", "state"))

    if role in ("teacher", "organization") and location_fields_changed:
        existing = users_collection.find_one({"_id": ObjectId(user_id)})
        address = update_fields.get("address", existing.get("address"))
        city = update_fields.get("city", existing.get("city"))
        state = update_fields.get("state", existing.get("state"))

        if address and city and state:
            coordinates = geocode_address(address, city, state)
            if coordinates is None:
                raise ValueError("Could not find that address. Please check it and try again.")
            update_fields["latitude"], update_fields["longitude"] = coordinates

    users_collection.update_one({"_id": ObjectId(user_id)}, {"$set": update_fields})
    return users_collection.find_one({"_id": ObjectId(user_id)})