from datetime import datetime
from bson import ObjectId
from bson.errors import InvalidId
from app.database.connection import database
from app.schemas.request import RequestCreate, RequestUpdate

requests_collection = database["requests"]


def create_request(data: RequestCreate, teacher_id: str) -> dict:
    request_document = {
        "teacher_id": teacher_id,
        "title": data.title,
        "description": data.description,
        "category": data.category,
        "quantity": data.quantity,
        "urgency": data.urgency,
        "status": "open",
        "organization_name": data.organization_name,
        "city": data.city,
        "state": data.state,
        "created_at": datetime.utcnow(),
    }

    result = requests_collection.insert_one(request_document)
    request_document["_id"] = result.inserted_id
    return request_document


def get_all_requests(
    status: str | None = None,
    category: str | None = None,
    city: str | None = None,
    state: str | None = None,
    urgency: str | None = None,
) -> list[dict]:
    query = {}
    if status:
        query["status"] = status
    if category:
        query["category"] = category
    if city:
        query["city"] = city
    if state:
        query["state"] = state
    if urgency:
        query["urgency"] = urgency

    return list(requests_collection.find(query))


def get_request_by_id(request_id: str) -> dict | None:
    try:
        return requests_collection.find_one({"_id": ObjectId(request_id)})
    except InvalidId:
        return None


def update_request(request_id: str, data: RequestUpdate, teacher_id: str) -> dict | None:
    existing = get_request_by_id(request_id)
    if existing is None:
        return None

    if existing["teacher_id"] != teacher_id:
        raise PermissionError("You do not have permission to edit this request.")

    update_fields = {k: v for k, v in data.model_dump().items() if v is not None}
    if update_fields:
        requests_collection.update_one(
            {"_id": ObjectId(request_id)}, {"$set": update_fields}
        )

    return get_request_by_id(request_id)


def delete_request(request_id: str, teacher_id: str) -> bool:
    existing = get_request_by_id(request_id)
    if existing is None:
        return False

    if existing["teacher_id"] != teacher_id:
        raise PermissionError("You do not have permission to delete this request.")

    requests_collection.delete_one({"_id": ObjectId(request_id)})
    return True

def fulfill_request(request_id: str, donor_id: str) -> dict:
    existing = get_request_by_id(request_id)
    if existing is None:
        return None

    if existing["status"] != "open":
        raise ValueError("This request is not open for fulfillment.")

    if existing["teacher_id"] == donor_id:
        raise PermissionError("You cannot fulfill your own request.")
    
    update_fields = {"status": "fulfilled","fulfilled_by": donor_id}
    
    requests_collection.update_one(
        {"_id": ObjectId(request_id)}, {"$set": update_fields}
    )

    return get_request_by_id(request_id)