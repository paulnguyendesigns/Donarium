from fastapi import APIRouter, HTTPException, status, Depends
from app.schemas.user import UserCreate, UserOut, UserLogin
from app.services.user_service import create_user, authenticate_user
from app.utils.security import create_access_token
from app.utils.dependencies import get_current_user

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

@router.post("/login")
def login(credentials: UserLogin):
    try:
        user = authenticate_user(credentials.email, credentials.password)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))

    access_token = create_access_token(data={"sub": str(user["_id"])})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": UserOut(
            id=str(user["_id"]),
            first_name=user["first_name"],
            last_name=user["last_name"],
            email=user["email"],
            role=user["role"],
            created_at=user["created_at"],
        ),
    }

@router.get("/me", response_model=UserOut)
def get_me(current_user: dict = Depends(get_current_user)):
    return UserOut(
        id=str(current_user["_id"]),
        first_name=current_user["first_name"],
        last_name=current_user["last_name"],
        email=current_user["email"],
        role=current_user["role"],
        created_at=current_user["created_at"],
    )