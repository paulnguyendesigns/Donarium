from enum import Enum
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime


class UserRole(str, Enum):
    teacher = "teacher"
    organization = "organization"
    donor = "donor"
    admin = "admin"


class UserCreate(BaseModel):
    """What the client sends when registering."""
    first_name: str
    last_name: str
    email: EmailStr
    password: str = Field(min_length=8)
    role: UserRole


class UserOut(BaseModel):
    """What the API returns — notice password_hash is never included."""
    id: str
    first_name: str
    last_name: str
    email: EmailStr
    role: UserRole
    created_at: datetime

class UserLogin(BaseModel):
    email: EmailStr
    password: str

