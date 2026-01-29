import { useState } from 'react'
import logo from './assets/logo.png'

function App() {
  const [activeTab, setActiveTab] = useState('Activity Feed');
  const [likedActivities, setLikedActivities] = useState({});

  const toggleLike = (id) => {
    setLikedActivities(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const navItems = [
    { name: 'Activity Feed', icon: '🏠' },
    { name: 'My Segments', icon: '⭐' },
    { name: 'Training Log', icon: '📅' },
    { name: 'My Routes', icon: '🗺️' },
    { name: 'Clubs', icon: '👕' },
  ];

  const activities = [
    {
      id: 1,
      user: 'John Doe',
      avatar: 'JD',
      time: 'Yesterday at 6:30 PM',
      location: 'San Francisco',
      type: 'Run',
      icon: '🏃',
      title: 'Evening Run - Golden Gate Park',
      desc: 'Felt great today! Pushed the pace on the last mile.',
      stats: [
        { label: 'Distance', value: '8.52 km' },
        { label: 'Pace', value: '5:12 /km' },
        { label: 'Time', value: '45m 10s' },
      ],
      map: true,
      kudos: 24,
      comments: 3
    },
    {
      id: 2,
      user: 'Sarah Adams',
      avatar: 'SA',
      avatarColor: '#e91e63',
      time: 'Today at 7:00 AM',
      location: 'Morning Ride',
      type: 'Ride',
      icon: '🚴‍♀️',
      title: 'Morning Commute ☕',
      stats: [
        { label: 'Distance', value: '12.4 km' },
        { label: 'Speed', value: '22.5 km/h' },
        { label: 'Power', value: '180 W' },
      ],
      map: false,
      kudos: 12,
      comments: 0
    },
    {
      id: 3,
      user: 'Mike King',
      avatar: 'MK',
      avatarColor: '#9c27b0',
      time: '2 days ago',
      location: 'Strength Training',
      type: 'Workout',
      icon: '🏋️‍♂️',
      title: 'Upper Body Blast',
      desc: 'New PR on bench press! 100kg x 5 reps.',
      stats: [
        { label: 'Duration', value: '1h 15m' },
        { label: 'Calories', value: '450 kcal' },
      ],
      map: false,
      kudos: 45,
      comments: 8
    }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="app-container">
      {/* Left Sidebar: Navigation */}
      <aside className="left-sidebar">
        <div className="logo-container">
          <img src={logo} className="logo" alt="ThunderFit" />
          <span className="app-title">THUNDERFIT</span>
        </div>
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li
              key={item.name}
              className={`nav-item ${activeTab === item.name ? 'active' : ''}`}
              onClick={() => setActiveTab(item.name)}
            >
              <span className="icon">{item.icon}</span>
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Center Column: Activity Feed */}
      <main className="main-feed">

        {/* Greeting Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>
            {getGreeting()}, Athlete! 👋
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Here's what your friends have been up to.
          </p>
        </div>

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
              {activity.map && (
                <div className="map-placeholder">
                  <div className="map-overlay"></div>
                  <span>🗺️ Map View</span>
                </div>
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
        ))}

      </main>

      {/* Right Sidebar: Widgets */}
      <aside className="right-sidebar">

        <div className="widget-card">
          <div className="widget-title">
            <span>Weekly Goal</span>
            <span style={{ color: 'var(--primary)', cursor: 'pointer' }}>Edit</span>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.25rem' }}>
              <span>32 / 50 km</span>
              <span>64%</span>
            </div>
            <div className="goal-progress">
              <div className="goal-fill" style={{ width: '64%' }}></div>
            </div>
          </div>
        </div>

        <div className="widget-card">
          <div className="widget-title">Your Profile</div>
          <div className="profile-stat">
            <span>Last 4 Weeks</span>
            <span>12 Activities</span>
          </div>
          <div className="profile-stat">
            <span>Distance</span>
            <span>84 km</span>
          </div>
          <div className="profile-stat">
            <span>Elevation</span>
            <span>1,200 m</span>
          </div>
        </div>

        <div className="widget-card">
          <div className="widget-title">
            <span>Your Clubs</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--primary)', cursor: 'pointer' }}>View All</span>
          </div>
          <div className="club-item">
            <div className="club-img" style={{ background: '#333' }}></div>
            <div>
              <div className="club-name">SF Runners</div>
              <div className="club-members">12k Members</div>
            </div>
          </div>
          <div className="club-item">
            <div className="club-img" style={{ background: '#00A4EF' }}></div>
            <div>
              <div className="club-name">ThunderFit Pro</div>
              <div className="club-members">5k Members</div>
            </div>
          </div>
        </div>

        <div className="widget-card">
          <div className="widget-title">Suggested Athletes</div>
          <div className="club-item">
            <div className="user-avatar" style={{ width: '40px', height: '40px', fontSize: '0.9rem' }}>TR</div>
            <div>
              <div className="club-name">Tom Runner</div>
              <div className="club-members">Mutual Friend</div>
            </div>
          </div>
        </div>

      </aside>
    </div>
  )
}

export default App
