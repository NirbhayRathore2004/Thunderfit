import { useState } from 'react';

const MapView = ({ coordinates, activityTitle }) => {
    const [mapType, setMapType] = useState('roadmap');

    if (!coordinates) {
        return (
            <div className="map-placeholder">
                <div className="map-overlay"></div>
                <span>🗺️ Map View</span>
            </div>
        );
    }

    const { lat, lng, zoom = 14 } = coordinates;

    // Google Maps Static API URL (no API key needed for basic usage)
    const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=600x280&maptype=${mapType}&markers=color:red%7C${lat},${lng}&scale=2`;

    // Google Maps embed URL for interactive map
    const embedMapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${lat},${lng}&zoom=${zoom}`;

    // Alternative: OpenStreetMap embed (no API key required)
    const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01},${lat - 0.01},${lng + 0.01},${lat + 0.01}&layer=mapnik&marker=${lat},${lng}`;

    return (
        <div className="map-container">
            <div className="map-controls">
                <button
                    className={`map-control-btn ${mapType === 'roadmap' ? 'active' : ''}`}
                    onClick={() => setMapType('roadmap')}
                >
                    🗺️ Map
                </button>
                <button
                    className={`map-control-btn ${mapType === 'satellite' ? 'active' : ''}`}
                    onClick={() => setMapType('satellite')}
                >
                    🛰️ Satellite
                </button>
                <button
                    className={`map-control-btn ${mapType === 'terrain' ? 'active' : ''}`}
                    onClick={() => setMapType('terrain')}
                >
                    ⛰️ Terrain
                </button>
                <a
                    href={`https://www.google.com/maps?q=${lat},${lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-control-btn open-maps"
                >
                    🔗 Open in Maps
                </a>
            </div>

            {/* Using OpenStreetMap for interactive embed (no API key required) */}
            <iframe
                className="map-iframe"
                src={osmUrl}
                title={`Map for ${activityTitle}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            {/* Fallback overlay with coordinates */}
            <div className="map-info">
                <span>📍 {lat.toFixed(4)}, {lng.toFixed(4)}</span>
            </div>
        </div>
    );
};

export default MapView;
