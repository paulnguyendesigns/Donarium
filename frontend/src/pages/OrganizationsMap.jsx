import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { getOrganizations } from "../services/organizations";

// Leaflet's default marker icons don't load correctly with Vite's bundler
// unless we manually point it to the icon images like this.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function FitBounds({ organizations }) {
  const map = useMap();

  useEffect(() => {
    if (organizations.length === 0) return;
    const bounds = L.latLngBounds(
      organizations.map((org) => [org.latitude, org.longitude])
    );
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [organizations, map]);

  return null;
}

function OrganizationsMap() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getOrganizations()
      .then((response) => setOrganizations(response.data))
      .catch(() => setError("Couldn't load organization locations."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Organizations</h1>
      <p className="page-subtitle">
        See where classrooms and organizations on Donarium are located.
      </p>

      {loading && <p className="page-subtitle">Loading map…</p>}
      {error && <div className="error-banner">{error}</div>}

      {!loading && !error && organizations.length === 0 && (
        <div className="empty-state">
          <p>No organizations with a saved address yet.</p>
        </div>
      )}

      {!loading && !error && organizations.length > 0 && (
        <div className="map-container">
          <MapContainer center={[38.5449, -121.7405]} zoom={6} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FitBounds organizations={organizations} />
            {organizations.map((org) => (
              <Marker key={org.id} position={[org.latitude, org.longitude]}>
                <Popup>
                  <strong>{org.first_name} {org.last_name}</strong>
                  <br />
                  {org.city}, {org.state}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
    </div>
  );
}

export default OrganizationsMap;