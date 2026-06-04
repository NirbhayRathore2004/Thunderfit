import React from 'react';

const Clubs = ({
    clubs,
    showNewClubForm,
    setShowNewClubForm,
    newClub,
    setNewClub,
    handleCreateClub,
    toggleJoinClub
}) => {
    return (
        <div className="clubs-container">
            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                        Clubs 👕
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                        Join communities, share your progress, and stay motivated.
                    </p>
                </div>
                <button
                    className="action-btn add-to-segment"
                    onClick={() => setShowNewClubForm(true)}
                    style={{ padding: '0.6rem 1.25rem' }}
                >
                    ➕ Create Club
                </button>
            </div>

            {/* Create Club Form */}
            {showNewClubForm && (
                <div className="new-activity-card animate-slide-down" style={{ marginBottom: '2.5rem' }}>
                    <div className="card-header">
                        <h3>Create a New Community 🤝</h3>
                        <button className="close-btn" onClick={() => setShowNewClubForm(false)}>✕</button>
                    </div>
                    <form onSubmit={handleCreateClub}>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label>Club Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Morning Runners, City Cyclists..."
                                    value={newClub.name}
                                    onChange={e => setNewClub({ ...newClub, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group full-width">
                                <label>Primary Sport</label>
                                <select
                                    value={newClub.type}
                                    onChange={e => setNewClub({ ...newClub, type: e.target.value })}
                                >
                                    <option value="Running">🏃 Running</option>
                                    <option value="Cycling">🚴 Cycling</option>
                                    <option value="Swimming">🏊 Swimming</option>
                                    <option value="Hiking">🥾 Hiking</option>
                                    <option value="Multi-sport">⚡ Multi-sport</option>
                                </select>
                            </div>
                            <div className="form-group full-width">
                                <label>Description</label>
                                <textarea
                                    placeholder="What is this club about? (goals, location, vibes...)"
                                    value={newClub.description}
                                    onChange={e => setNewClub({ ...newClub, description: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-actions">
                            <button type="button" className="action-btn" onClick={() => setShowNewClubForm(false)}>Cancel</button>
                            <button type="submit" className="action-btn add-to-segment">Create Club</button>
                        </div>
                    </form>
                </div>
            )}

            {/* My Clubs Section */}
            <div style={{ marginBottom: '2.5rem' }}>
                <h3 className="settings-section-title" style={{ paddingLeft: 0, marginBottom: '1rem' }}>Joined Clubs</h3>
                <div className="clubs-grid">
                    {clubs.filter(c => c.joined).length > 0 ? (
                        clubs.filter(c => c.joined).map(club => (
                            <div className="feed-card club-card" key={club.id}>
                                <div className="club-card-hero" style={{ backgroundColor: club.color }}>
                                    <span className="club-card-type">{club.type}</span>
                                </div>
                                <div className="club-card-body">
                                    <h4>{club.name}</h4>
                                    <p className="club-card-desc">{club.description}</p>
                                    <div className="club-card-stats">
                                        <span>👥 {club.members < 1000 ? club.members : (club.members / 1000).toFixed(1) + 'k'} Members</span>
                                    </div>
                                </div>
                                <div className="feed-actions" style={{ padding: '1rem' }}>
                                    <button className="action-btn" style={{ flex: 1 }} onClick={() => alert(`Opening ${club.name} details... 👕`)}>View Club</button>
                                    <button className="action-btn" onClick={() => toggleJoinClub(club.id)}>Leave</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', gridColumn: 'span 2', textAlign: 'center', padding: '2rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', borderStyle: 'dashed' }}>
                            You haven't joined any clubs yet. Explore available clubs below!
                        </p>
                    )}
                </div>
            </div>

            {/* Available Clubs Section */}
            <div>
                <h3 className="settings-section-title" style={{ paddingLeft: 0, marginBottom: '1rem' }}>Find New Communities</h3>
                <div className="clubs-grid">
                    {clubs.filter(c => !c.joined).map(club => (
                        <div className="feed-card club-card" key={club.id}>
                            <div className="club-card-hero" style={{ backgroundColor: club.color }}>
                                <span className="club-card-type">{club.type}</span>
                            </div>
                            <div className="club-card-body">
                                <h4>{club.name}</h4>
                                <p className="club-card-desc">{club.description}</p>
                                <div className="club-card-stats">
                                    <span>👥 {club.members < 1000 ? club.members : (club.members / 1000).toFixed(1) + 'k'} Members</span>
                                </div>
                            </div>
                            <div className="feed-actions" style={{ padding: '1rem' }}>
                                <button className="action-btn add-to-segment" style={{ flex: 1 }} onClick={() => toggleJoinClub(club.id)}>Join Club</button>
                                <button className="action-btn" onClick={() => alert(`${club.name}: ${club.description}`)}>Info</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Clubs;
