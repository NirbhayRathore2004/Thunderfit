import React from 'react';

const RightPanel = ({ clubs, user, challenges }) => {
    return (
        <aside className="right-sidebar">
            {/* Profile Widget */}
            <div className="widget-card">
                <div className="widget-title">
                    <span>{user ? user.name : 'Your'} Performance</span>
                    <span>⚡</span>
                </div>
                <div className="profile-stat">
                    <span>Weekly Distance</span>
                    <span>{user ? `${user.weekly_distance} km` : '0 km'}</span>
                </div>
                <div className="profile-stat">
                    <span>Activities (Week)</span>
                    <span>{user ? user.activities.length : '0'}</span>
                </div>
                <div className="profile-stat">
                    <span>Total Time</span>
                    <span>{user ? user.total_time : '0h 0m'}</span>
                </div>
                {user && (
                    <div style={{ marginTop: '1rem' }}>
                        <div className="widget-title" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>Weekly Goal</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                            <span>{user.weekly_distance} km / {user.weekly_goal} km</span>
                            <span>{Math.round((user.weekly_distance / user.weekly_goal) * 100)}%</span>
                        </div>
                        <div className="goal-progress">
                            <div className="goal-fill" style={{ width: `${(user.weekly_distance / user.weekly_goal) * 100}%` }}></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Suggested Clubs */}
            <div className="widget-card">
                <div className="widget-title">
                    <span>Suggested Clubs</span>
                    <span style={{ color: 'var(--primary)', cursor: 'pointer' }}>View All</span>
                </div>
                {clubs.filter(c => !c.joined).slice(0, 3).map(club => (
                    <div key={club.id} className="club-item">
                        <div className="club-img" style={{ backgroundColor: club.color, opacity: 0.8 }}></div>
                        <div className="club-info">
                            <div className="club-name">{club.name}</div>
                            <div className="club-members">{club.members.toLocaleString()} members</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Challenges */}
            <div className="widget-card" style={{ background: 'linear-gradient(135deg, #1e1e1e, #121212)', color: 'white', border: 'none' }}>
                <div className="widget-title" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    <span>Active Challenges</span>
                    <span>🏆</span>
                </div>
                {challenges.map(challenge => (
                    <div key={challenge.id} style={{ marginBottom: '1.25rem' }}>
                        <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{challenge.title}</div>
                        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>{challenge.days_left} days left</div>
                        <div className="goal-progress" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                            <div className="goal-fill" style={{ width: `${challenge.progress}%`, background: 'var(--primary)' }}></div>
                        </div>
                    </div>
                ))}
                <button className="action-btn" style={{ width: '100%', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white' }}>Join More</button>
            </div>
        </aside>
    );
};

export default RightPanel;
