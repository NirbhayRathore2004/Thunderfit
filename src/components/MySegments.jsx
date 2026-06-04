import React from 'react';

const MySegments = ({
    mySegments,
    activities,
    showNewActivityForm,
    setShowNewActivityForm,
    newActivity,
    setNewActivity,
    handleCreateActivity,
    addActivityToSegments,
    sportTypes
}) => {
    return (
        <>
            {/* My Segments Header */}
            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                        My Segments ⭐
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                        Track your performance on your favorite routes and segments.
                    </p>
                </div>
                <button
                    className="action-btn add-to-segment"
                    onClick={() => setShowNewActivityForm(true)}
                    style={{ padding: '0.6rem 1.25rem' }}
                >
                    ➕ Create Activity
                </button>
            </div>

            {/* New Activity Form */}
            {showNewActivityForm && (
                <div className="new-activity-card animate-slide-down">
                    <div className="card-header">
                        <h3>Record New Activity ⚡</h3>
                        <button className="close-btn" onClick={() => setShowNewActivityForm(false)}>✕</button>
                    </div>
                    <form onSubmit={handleCreateActivity}>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label>Activity Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Morning Blast, Coastal Ride..."
                                    value={newActivity.title}
                                    onChange={e => setNewActivity({ ...newActivity, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Sport Type</label>
                                <select
                                    value={newActivity.type}
                                    onChange={e => setNewActivity({ ...newActivity, type: e.target.value })}
                                >
                                    {sportTypes.filter(s => s.name !== 'All').map(s => (
                                        <option key={s.name} value={s.name}>{s.icon} {s.name}</option>
                                    ))}
                                </select>
                            </div>
                            {newActivity.type !== 'Yoga' && (
                                <div className="form-group">
                                    <label>{newActivity.type === 'Workout' ? 'Weight (kg)' : 'Distance (km)'}</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        value={newActivity.distance}
                                        onChange={e => setNewActivity({ ...newActivity, distance: e.target.value })}
                                        required={newActivity.type !== 'Yoga'}
                                    />
                                </div>
                            )}
                            <div className="form-group">
                                <label>Time (HH:MM:SS)</label>
                                <input
                                    type="text"
                                    placeholder="00:00:00"
                                    value={newActivity.time}
                                    onChange={e => setNewActivity({ ...newActivity, time: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group full-width">
                                <label>Description (Optional)</label>
                                <textarea
                                    placeholder="How did it feel?"
                                    value={newActivity.desc}
                                    onChange={e => setNewActivity({ ...newActivity, desc: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="form-actions">
                            <button type="button" className="action-btn" onClick={() => setShowNewActivityForm(false)}>Cancel</button>
                            <button type="submit" className="action-btn add-to-segment">Save Activity</button>
                        </div>
                    </form>
                </div>
            )}

            {/* My Segments List */}
            <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                    Your Segments ({mySegments.length})
                </h3>
                {mySegments.map(segment => (
                    <div className="feed-card segment-card" key={segment.id}>
                        <div className="feed-header">
                            <div className="activity-icon" style={{ marginLeft: 0 }}>{segment.icon}</div>
                            <div className="user-info" style={{ flex: 1 }}>
                                <h4>{segment.name}</h4>
                                <span>{segment.type} • {segment.attempts} attempts</span>
                            </div>
                        </div>
                        <div className="feed-content">
                            <div className="feed-stats">
                                <div className="stat-item">
                                    <label>Distance</label>
                                    <span>{segment.distance}</span>
                                </div>
                                <div className="stat-item">
                                    <label>Elevation</label>
                                    <span>{segment.elevation}</span>
                                </div>
                                <div className="stat-item">
                                    <label>Best Time</label>
                                    <span>{segment.best_time}</span>
                                </div>
                            </div>
                        </div>
                        <div className="feed-actions">
                            <button className="action-btn" onClick={() => alert(`Analyzing details for ${segment.name}... 📊`)}>📊 View Details</button>
                            <button className="action-btn" onClick={() => alert(`Opening leaderboard for ${segment.name}... 🏆`)}>🏆 Leaderboard</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Available Activities Section */}
            <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                    Available Activities
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    Add activities to your segments to track your progress.
                </p>
                {activities.map(activity => (
                    <div className="feed-card" key={activity.id}>
                        <div className="feed-header">
                            <div className="user-avatar" style={{ backgroundColor: activity.avatarColor }}>{activity.avatar}</div>
                            <div className="user-info">
                                <h4>{activity.user}</h4>
                                <span>{activity.time} • {activity.location}</span>
                            </div>
                            <div className="activity-icon">{activity.icon}</div>
                        </div>
                        <div className="feed-content">
                            <h3>{activity.title}</h3>
                            {activity.desc && <p className="feed-desc">{activity.desc}</p>}
                            <div className="feed-stats">
                                {activity.stats.map((stat, index) => (
                                    <div className="stat-item" key={index}>
                                        <label>{stat.label}</label>
                                        <span>{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="feed-actions">
                            <button
                                className="action-btn add-to-segment"
                                onClick={() => addActivityToSegments(activity)}
                            >
                                ➕ Add to Segments
                            </button>
                            <button className="action-btn" onClick={() => alert(`Viewing details for ${activity.title}... 👁️`)}>👁️ View Details</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default MySegments;
