import React from 'react';
import MapView from '../MapView';

const MyRoutes = ({ activities }) => {
    const routes = activities.filter(a => a.map).map(a => ({
        id: a.id,
        name: a.title,
        distance: a.stats.find(s => s.label === 'Distance')?.value || 'Unknown',
        coords: a.mapCoordinates,
        location: a.location
    }));

    return (
        <div className="routes-container">
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                        My Routes 🗺️
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                        Discover and manage your favorite paths.
                    </p>
                </div>
                <button className="action-btn add-to-segment">➕ Create New Route</button>
            </div>

            <div className="routes-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                {routes.length > 0 ? (
                    routes.map(route => (
                        <div key={route.id} className="feed-card" style={{ overflow: 'hidden' }}>
                            <div style={{ padding: '1.25rem 1.5rem' }}>
                                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{route.name}</h3>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{route.distance} • {route.location}</span>
                            </div>
                            <div style={{ height: '200px', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
                                <MapView
                                    coordinates={route.coords}
                                    activityTitle={route.name}
                                    height="200px"
                                />
                            </div>
                            <div className="feed-actions">
                                <button className="action-btn" style={{ flex: 1 }}>Use Route</button>
                                <button className="action-btn">Edit</button>
                                <button className="action-btn">Share</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="widget-card" style={{ textAlign: 'center', padding: '4rem 2rem', borderStyle: 'dashed' }}>
                        <span style={{ fontSize: '3rem' }}>📍</span>
                        <h3 style={{ marginTop: '1rem' }}>No routes found</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Start creating your first custom route to see it here!</p>
                        <button className="action-btn add-to-segment">Build a Route</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyRoutes;
