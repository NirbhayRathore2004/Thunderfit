import React from 'react';
import MapView from '../MapView';

const ActivityCard = ({ activity, likedActivities, toggleLike }) => {
    const displayUser = activity.user || (activity.owner ? activity.owner.name : 'Unknown');
    const displayAvatar = activity.avatar || (activity.owner ? activity.owner.avatar : '?');
    const displayColor = activity.avatarColor || (activity.owner ? activity.owner.avatar_color : '#ccc');
    const mapCoords = activity.mapCoordinates || activity.map_coordinates;

    return (
        <div className="feed-card" key={activity.id}>
            <div className="feed-header">
                <div className="user-avatar" style={{ backgroundColor: displayColor }}>{displayAvatar}</div>
                <div className="user-info">
                    <h4>{displayUser}</h4>
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
                {activity.map && (
                    <MapView
                        coordinates={mapCoords}
                        activityTitle={activity.title}
                    />
                )}
            </div>
            <div className="feed-actions">
                <button
                    className={`action-btn kudos ${likedActivities[activity.id] ? 'active' : ''}`}
                    onClick={() => toggleLike(activity.id)}
                >
                    {likedActivities[activity.id] ? '🧡' : '👍'} {activity.kudos + (likedActivities[activity.id] ? 1 : 0)}
                </button>
                <button className="action-btn">💬 {activity.comments > 0 ? `${activity.comments} Comments` : 'Comment'}</button>
                <button className="action-btn">🔗 Share</button>
            </div>
        </div>
    );
};

export default ActivityCard;
