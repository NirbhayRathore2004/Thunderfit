import React from 'react';
import ActivityCard from './ActivityCard';

const ActivityFeed = ({
    getGreeting,
    sportTypes,
    selectedSport,
    setSelectedSport,
    filteredActivities,
    likedActivities,
    toggleLike
}) => {
    return (
        <>
            {/* Greeting Header */}
            <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                    {getGreeting()}, Athlete! 👋
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    Here's what your friends have been up to.
                </p>
            </div>

            {/* Sport Type Filter */}
            <div className="sport-filter-container">
                <h3 className="sport-filter-title">Filter by Sport</h3>
                <div className="sport-filter-buttons">
                    {sportTypes.map((sport) => (
                        <button
                            key={sport.name}
                            className={`sport-filter-btn ${selectedSport === sport.name ? 'active' : ''}`}
                            onClick={() => setSelectedSport(sport.name)}
                            style={{
                                '--sport-color': sport.color,
                                borderColor: selectedSport === sport.name ? sport.color : 'var(--border-color)',
                                backgroundColor: selectedSport === sport.name ? `${sport.color}15` : 'var(--bg-card)'
                            }}
                        >
                            <span className="sport-icon">{sport.icon}</span>
                            <span className="sport-name">{sport.name}</span>
                            {selectedSport === sport.name && (
                                <span className="sport-check">✓</span>
                            )}
                        </button>
                    ))}
                </div>
                {selectedSport !== 'All' && (
                    <div className="filter-info">
                        <span>Showing {filteredActivities.length} {selectedSport} {filteredActivities.length === 1 ? 'activity' : 'activities'}</span>
                        <button
                            className="clear-filter-btn"
                            onClick={() => setSelectedSport('All')}
                        >
                            ✕ Clear Filter
                        </button>
                    </div>
                )}
            </div>

            {filteredActivities.map(activity => (
                <ActivityCard
                    key={activity.id}
                    activity={activity}
                    likedActivities={likedActivities}
                    toggleLike={toggleLike}
                />
            ))}
        </>
    );
};

export default ActivityFeed;
