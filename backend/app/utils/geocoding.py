import requests

NOMINATIM_URL = "https://nominatim.openstreetmap.org/search"


def geocode_address(address: str, city: str, state: str) -> tuple[float, float] | None:
    """Converts a street address into (latitude, longitude). Returns None if not found."""
    query = f"{address}, {city}, {state}"
    params = {"q": query, "format": "json", "limit": 1}
    # Nominatim requires a descriptive User-Agent, or it will block the request
    headers = {"User-Agent": "Donarium-StudentProject/1.0"}

    response = requests.get(NOMINATIM_URL, params=params, headers=headers, timeout=5)
    response.raise_for_status()
    results = response.json()

    if not results:
        return None

    return float(results[0]["lat"]), float(results[0]["lon"])