import React from 'react';
import MapView from '../MapView';

const MyRoutes = ({
    activities,
    routes = [],
    showNewRouteForm,
    setShowNewRouteForm,
    newRoute,
    setNewRoute,
    handleCreateRoute
}) => {
    // Combine activities with map and custom routes
    const activityRoutes = activities.filter(a => a.map).map(a => ({
        id: `act-${a.id}`,
        name: a.title,
        distance: a.stats.find(s => s.label === 'Distance')?.value || 'Unknown',
        coords: a.mapCoordinates,
        location: a.location,
        type: 'Activity'
    }));

    const customRoutes = routes.map(r => ({
        id: `route-${r.id}`,
        name: r.name,
        distance: r.distance,
        coords: r.coordinates,
        location: r.location,
        type: 'Custom'
    }));

    const allRoutes = [...customRoutes, ...activityRoutes];

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
                <button
                    className="action-btn add-to-segment"
                    onClick={() => setShowNewRouteForm(true)}
                >
                    ➕ Create New Route
                </button>
            </div>

            {/* New Route Form */}
            {showNewRouteForm && (
                <div className="new-activity-card animate-slide-down" style={{ marginBottom: '2rem' }}>
                    <div className="card-header">
                        <h3>Build Custom Route 🎨</h3>
                        <button className="close-btn" onClick={() => setShowNewRouteForm(false)}>✕</button>
                    </div>
                    <form onSubmit={handleCreateRoute}>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label>Route Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Sunset Loop, Hill Climb..."
                                    value={newRoute.name}
                                    onChange={e => setNewRoute({ ...newRoute, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Distance (km)</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 5.2 km"
                                    value={newRoute.distance}
                                    onChange={e => setNewRoute({ ...newRoute, distance: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Location Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. San Francisco, CA"
                                    value={newRoute.location}
                                    onChange={e => setNewRoute({ ...newRoute, location: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Latitude</label>
                                <input
                                    type="number"
                                    step="0.0001"
                                    placeholder="37.7749"
                                    value={newRoute.coordinates.lat}
                                    onChange={e => setNewRoute({
                                        ...newRoute,
                                        coordinates: { ...newRoute.coordinates, lat: parseFloat(e.target.value) }
                                    })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Longitude</label>
                                <input
                                    type="number"
                                    step="0.0001"
                                    placeholder="-122.4194"
                                    value={newRoute.coordinates.lng}
                                    onChange={e => setNewRoute({
                                        ...newRoute,
                                        coordinates: { ...newRoute.coordinates, lng: parseFloat(e.target.value) }
                                    })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-actions">
                            <button type="button" className="action-btn" onClick={() => setShowNewRouteForm(false)}>Cancel</button>
                            <button type="submit" className="action-btn add-to-segment">Save Route</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="routes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                {allRoutes.length > 0 ? (
                    allRoutes.map(route => (
                        <div key={route.id} className="feed-card" style={{ overflow: 'hidden', height: 'fit-content' }}>
                            <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{route.name}</h3>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                        {route.distance} • {route.location}
                                    </span>
                                </div>
                                <span style={{
                                    fontSize: '0.7rem',
                                    padding: '2px 8px',
                                    backgroundColor: route.type === 'Custom' ? 'var(--primary-light)' : 'rgba(0,0,0,0.05)',
                                    color: route.type === 'Custom' ? 'var(--primary)' : 'inherit',
                                    borderRadius: '12px',
                                    fontWeight: 600
                                }}>
                                    {route.type}
                                </span>
                            </div>
                            <div style={{ height: '200px', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
                                <MapView
                                    coordinates={route.coords}
                                    activityTitle={route.name}
                                    height="200px"
                                />
                            </div>
                            <div className="feed-actions">
                                <button className="action-btn" style={{ flex: 1 }} onClick={() => alert(`Starting ${route.name}... 👟`)}>Use Route</button>
                                <button className="action-btn" onClick={() => alert("Edit functionality coming soon! ✏️")}>Edit</button>
                                <button className="action-btn" onClick={() => alert("Share functionality coming soon! 🔗")}>Share</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="widget-card" style={{ textAlign: 'center', padding: '4rem 2rem', borderStyle: 'dashed', gridColumn: '1 / -1' }}>
                        <span style={{ fontSize: '3rem' }}>📍</span>
                        <h3 style={{ marginTop: '1rem' }}>No routes found</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Start creating your first custom route to see it here!</p>
                        <button
                            className="action-btn add-to-segment"
                            onClick={() => setShowNewRouteForm(true)}
                        >
                            Build a Route
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyRoutes;
