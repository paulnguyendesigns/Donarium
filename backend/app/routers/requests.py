from fastapi import APIRouter, HTTPException, status, Depends
from app.schemas.request import RequestCreate, RequestUpdate, RequestOut
from app.services.request_service import (
    create_request,
    get_all_requests,
    get_request_by_id,
    update_request,
    delete_request,
)
from app.utils.dependencies import get_current_user

router = APIRouter(prefix="/requests", tags=["requests"])


def to_request_out(doc: dict) -> RequestOut:
    return RequestOut(
        id=str(doc["_id"]),
        teacher_id=doc["teacher_id"],
        title=doc["title"],
        description=doc["description"],
        category=doc["category"],
        quantity=doc["quantity"],
        urgency=doc["urgency"],
        status=doc["status"],
        organization_name=doc["organization_name"],
        city=doc["city"],
        state=doc["state"],
        created_at=doc["created_at"],
    )


@router.post("/", response_model=RequestOut, status_code=status.HTTP_201_CREATED)
def create(data: RequestCreate, current_user: dict = Depends(get_current_user)):
    if current_user["role"] not in ("teacher", "organization"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only teachers or organizations can create requests.",
        )

    doc = create_request(data, teacher_id=str(current_user["_id"]))
    return to_request_out(doc)


@router.get("/", response_model=list[RequestOut])
def list_requests():
    docs = get_all_requests()
    return [to_request_out(doc) for doc in docs]


@router.get("/{request_id}", response_model=RequestOut)
def get_one(request_id: str):
    doc = get_request_by_id(request_id)
    if doc is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Request not found.")
    return to_request_out(doc)


@router.put("/{request_id}", response_model=RequestOut)
def update(
    request_id: str,
    data: RequestUpdate,
    current_user: dict = Depends(get_current_user),
):
    try:
        doc = update_request(request_id, data, teacher_id=str(current_user["_id"]))
    except PermissionError as e:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=str(e))

    if doc is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Request not found.")

    return to_request_out(doc)


@router.delete("/{request_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete(request_id: str, current_user: dict = Depends(get_current_user)):
    try:
        deleted = delete_request(request_id, teacher_id=str(current_user["_id"]))
    except PermissionError as e:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=str(e))

    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Request not found.")