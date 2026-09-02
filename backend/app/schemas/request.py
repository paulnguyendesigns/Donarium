from enum import Enum
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class RequestCategory(str, Enum):
    school_supplies = "school_supplies"
    food_assistance = "food_assistance"
    hygiene_products = "hygiene_products"
    basic_necessities = "basic_necessities"


class RequestUrgency(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"


class RequestStatus(str, Enum):
    open = "open"
    fulfilled = "fulfilled"
    closed = "closed"


class RequestCreate(BaseModel):
    """What the teacher/org sends when creating a request."""
    title: str
    description: str
    category: RequestCategory
    quantity: int = Field(gt=0)
    urgency: RequestUrgency
    organization_name: str
    city: str
    state: str


class RequestUpdate(BaseModel):
    """What the teacher/org can edit. All fields optional — partial updates."""
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[RequestCategory] = None
    quantity: Optional[int] = Field(default=None, gt=0)
    urgency: Optional[RequestUrgency] = None
    status: Optional[RequestStatus] = None


class RequestOut(BaseModel):
    """What the API returns."""
    id: str
    teacher_id: str
    title: str
    description: str
    category: RequestCategory
    quantity: int
    urgency: RequestUrgency
    status: RequestStatus
    organization_name: str
    city: str
    state: str
    created_at: datetime
    fulfilled_by: Optional[str] = None