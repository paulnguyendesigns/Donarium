from fastapi import APIRouter, HTTPException, status, Depends
from app.schemas.user import UserCreate, UserOut, UserLogin, UserUpdate
from app.services.user_service import create_user, authenticate_user, update_user
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
        address=user_document.get("address"),
        city=user_document.get("city"),
        state=user_document.get("state"),
        latitude=user_document.get("latitude"),
        longitude=user_document.get("longitude"),
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
            address=user.get("address"),
            city=user.get("city"),
            state=user.get("state"),
            latitude=user.get("latitude"),
            longitude=user.get("longitude"),
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
        address=current_user.get("address"),
        city=current_user.get("city"),
        state=current_user.get("state"),
        latitude=current_user.get("latitude"),
        longitude=current_user.get("longitude"),
        created_at=current_user["created_at"],
    )

@router.patch("/me", response_model=UserOut)
def update_me(data: UserUpdate, current_user: dict = Depends(get_current_user)):
    try:
        updated = update_user(str(current_user["_id"]), data, role=current_user["role"])
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

    return UserOut(
        id=str(updated["_id"]),
        first_name=updated["first_name"],
        last_name=updated["last_name"],
        email=updated["email"],
        role=updated["role"],
        address=updated.get("address"),
        city=updated.get("city"),
        state=updated.get("state"),
        latitude=updated.get("latitude"),
        longitude=updated.get("longitude"),
        created_at=updated["created_at"],
    )