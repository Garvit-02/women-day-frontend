import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { api, useAuthorizedApi } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const defaultCenter = [20.5937, 78.9629]; // Roughly center of India; adjust as needed

const iconColors = {
  police: "#3b82f6",
  hospital: "#22c55e",
  ngo: "#eab308",
  other: "#f97316"
};

const createCircleIcon = (color) =>
  L.divIcon({
    className: "",
    html: `<span style="display:inline-block;width:18px;height:18px;border-radius:9999px;background:${color};border:2px solid white;box-shadow:0 0 0 1px rgba(15,23,42,0.7)"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9]
  });

const LocationClickHandler = ({ onSelect }) => {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    }
  });
  return null;
};

const SafetyMap = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [type, setType] = useState("police");
  const [description, setDescription] = useState("");
  const [coords, setCoords] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const authorizedApi = useAuthorizedApi();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await api.get("/safety-locations");
        setLocations(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load safety locations.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleMapClick = (latlng) => {
    setCoords(latlng);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isAuthenticated) {
      setError("Please log in to submit a safe location.");
      return;
    }

    if (!name || !type || !coords) {
      setError("Please provide a name, type, and select a point on the map.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await authorizedApi.post("/safety-locations", {
        name,
        type,
        latitude: coords.lat,
        longitude: coords.lng,
        description
      });
      setLocations((prev) => [res.data, ...prev]);
      setName("");
      setType("police");
      setDescription("");
      setCoords(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit location.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Women Safety Map</p>
        <h1 className="text-2xl font-semibold text-white">Safe spaces and support around you.</h1>
        <p className="text-sm text-slate-400">
          Explore nearby police stations, hospitals, and women-focused NGOs. Logged-in users can
          suggest additional safe locations to help others.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] items-start">
        <div className="space-y-2">
          <div className="h-[360px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60">
            <MapContainer center={defaultCenter} zoom={5} scrollWheelZoom className="w-full h-full">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationClickHandler onSelect={handleMapClick} />
              {locations.map((loc) => (
                <Marker
                  key={loc._id}
                  position={[loc.latitude, loc.longitude]}
                  icon={createCircleIcon(iconColors[loc.type] || iconColors.other)}
                >
                  <Popup>
                    <div className="space-y-1">
                      <p className="font-semibold text-sm">{loc.name}</p>
                      <p className="text-xs text-slate-500 capitalize">{loc.type}</p>
                      {loc.description && (
                        <p className="text-xs text-slate-600 whitespace-pre-line">
                          {loc.description}
                        </p>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
              {coords && (
                <Marker
                  position={[coords.lat, coords.lng]}
                  icon={createCircleIcon("#ec4899")}
                >
                  <Popup>
                    <p className="text-xs text-slate-700">New location (not yet saved)</p>
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="inline-block h-3 w-3 rounded-full" style={{ background: iconColors.police }} />
              Police station
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-3 w-3 rounded-full" style={{ background: iconColors.hospital }} />
              Hospital
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-3 w-3 rounded-full" style={{ background: iconColors.ngo }} />
              Women NGO
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-3 w-3 rounded-full" style={{ background: iconColors.other }} />
              Other safe space
            </span>
          </div>
          {loading && (
            <p className="text-xs text-slate-400">Loading existing safety locations...</p>
          )}
          {error && <p className="text-xs text-red-400">{error}</p>}
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 space-y-3"
        >
          <h2 className="text-sm font-semibold text-white">Suggest a safe location</h2>
          {!isAuthenticated && (
            <p className="text-[11px] text-amber-300">
              Log in to submit locations. This helps us keep submissions accountable.
            </p>
          )}
          <div className="space-y-1">
            <label className="text-xs text-slate-300">Name</label>
            <input
              type="text"
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Eg. City Central Police Station"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-300">Type</label>
            <select
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="police">Police station</option>
              <option value="hospital">Hospital / clinic</option>
              <option value="ngo">Women NGO / support centre</option>
              <option value="other">Other safe public space</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-300">Short description (optional)</label>
            <textarea
              className="w-full min-h-[80px] rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Share why this place feels safe or what kind of support it offers."
            />
          </div>
          <div className="space-y-1 text-xs text-slate-400">
            <p>
              Click anywhere on the map to set the exact location. We use approximate coordinates to
              help others find this place.
            </p>
            <p className="text-[11px]">
              Selected point:{" "}
              {coords ? `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}` : "none yet"}
            </p>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="mt-1 px-4 py-2.5 rounded-full bg-primary text-sm font-semibold text-white hover:bg-rose-600 disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit Safe Location"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SafetyMap;

