from enum import Enum
from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime


class UserRole(str, Enum):
    teacher = "teacher"
    organization = "organization"
    donor = "donor"
    admin = "admin"


class UserCreate(BaseModel):
    # what the client sends
    first_name: str
    last_name: str
    email: EmailStr
    password: str = Field(min_length=8)
    role: UserRole
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None


class UserOut(BaseModel):
    # safely secures password
    id: str
    first_name: str
    last_name: str
    email: EmailStr
    role: UserRole
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    created_at: datetime


class UserLogin(BaseModel):
    email: EmailStr
    password: str

class OrganizationOut(BaseModel):
    id: str
    first_name: str
    last_name: str
    city: Optional[str] = None
    state: Optional[str] = None
    latitude: float
    longitude: float

class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None