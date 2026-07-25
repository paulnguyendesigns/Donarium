from fastapi import APIRouter, HTTPException, status
from app.schemas.user import UserCreate, UserOut
from app.services.user_service import create_user

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register(user_data: UserCreate):
    try:
        user_document = create_user(user_data)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e))

    return UserOut(
        id=str(user_document["_id"]),
        first_name=user_document["first_name"],
        last_name=user_document["last_name"],
        email=user_document["email"],
        role=user_document["role"],
        created_at=user_document["created_at"],
    )
