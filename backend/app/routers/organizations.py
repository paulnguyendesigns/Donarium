from fastapi import APIRouter
from app.schemas.user import OrganizationOut
from app.services.user_service import get_organization_locations

router = APIRouter(prefix="/organizations", tags=["organizations"])


@router.get("/", response_model=list[OrganizationOut])
def list_organizations():
    docs = get_organization_locations()
    return [
        OrganizationOut(
            id=str(doc["_id"]),
            first_name=doc["first_name"],
            last_name=doc["last_name"],
            city=doc.get("city"),
            state=doc.get("state"),
            latitude=doc["latitude"],
            longitude=doc["longitude"],
        )
        for doc in docs
    ]