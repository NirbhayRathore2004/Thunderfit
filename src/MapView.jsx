import { useState } from 'react';

const MapView = ({ coordinates, activityTitle, height = '320px' }) => {
    const [mapType, setMapType] = useState('roadmap');

    if (!coordinates) {
        return (
            <div className="map-placeholder" style={{ height }}>
                <div className="map-overlay"></div>
                <span>🗺️ Map View Not Available</span>
            </div>
        );
    }

    const { lat, lng, zoom = 14 } = coordinates;

    // Use OpenStreetMap embed (no API key required)
    const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01},${lat - 0.01},${lng + 0.01},${lat + 0.01}&layer=mapnik&marker=${lat},${lng}`;

    return (
        <div className="map-container" style={{ height }}>
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

            <iframe
                className="map-iframe"
                src={osmUrl}
                title={`Map for ${activityTitle}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            <div className="map-info">
                <span>📍 {lat.toFixed(4)}, {lng.toFixed(4)}</span>
            </div>
        </div>
    );
};

export default MapView;
