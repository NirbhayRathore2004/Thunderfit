import React from 'react';

const TrainingLog = ({ activities, user }) => {
    const stats = [
        { label: 'Weekly Distance', value: user ? `${user.weekly_distance} km` : '0 km', change: '+12%', color: '#fc4c02' },
        { label: 'Active Time', value: user ? user.total_time : '0h 0m', change: '-5%', color: '#00A4EF' },
        { label: 'Total Distance', value: user ? `${user.total_distance} km` : '0 km', change: '+20%', color: '#4caf50' },
        { label: 'Activities', value: activities.length, change: 'Stable', color: '#9c27b0' },
    ];

    return (
        <div className="training-log-container">
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                    Training Log 📅
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    Analyze your progress and stay on track with your goals.
                </p>
            </div>

            <div className="training-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {stats.map((stat, i) => (
                    <div key={i} className="widget-card" style={{ borderLeft: `4px solid ${stat.color}` }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{stat.label}</span>
                        <div style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0.5rem 0' }}>{stat.value}</div>
                        <span style={{ fontSize: '0.8rem', color: stat.change.startsWith('+') ? 'var(--accent-green)' : stat.change.startsWith('-') ? '#ff6b6b' : 'var(--text-secondary)' }}>
                            {stat.change} vs last week
                        </span>
                    </div>
                ))}
            </div>

            <div className="settings-section">
                <h3 className="settings-section-title">Recent Training</h3>
                <div className="settings-group">
                    {activities.slice(0, 5).map(activity => (
                        <div key={activity.id} className="settings-item">
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ fontSize: '1.5rem' }}>{activity.icon}</div>
                                <div>
                                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{activity.title}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{activity.time} • {activity.type}</div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontWeight: 700 }}>{activity.stats.find(s => s.label === 'Distance')?.value || activity.stats[0]?.value}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{activity.stats.find(s => s.label === 'Time')?.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button className="action-btn" style={{ width: '100%' }}>View Full Training History</button>
            </div>
        </div>
    );
};

export default TrainingLog;
