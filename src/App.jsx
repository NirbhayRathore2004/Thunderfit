import { useState, useEffect } from 'react'
import logo from './assets/logo.png'
import MapView from './MapView'

function App() {
  const [activeTab, setActiveTab] = useState('Activity Feed');
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);
  const [likedActivities, setLikedActivities] = useState({});
  const [selectedSport, setSelectedSport] = useState('All');
  const [showNewActivityForm, setShowNewActivityForm] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: '',
    type: 'Run',
    distance: '',
    time: '',
    desc: ''
  });
  const [clubs, setClubs] = useState([
    { id: 1, name: 'SF Runners', members: 12400, type: 'Running', joined: false, description: 'The largest running community in San Francisco.', color: '#333' },
    { id: 2, name: 'ThunderFit Pro', members: 5200, type: 'Multi-sport', joined: true, description: 'Elite performance and triathlon training group.', color: '#00A4EF' },
    { id: 3, name: 'Bay Area Cyclists', members: 8500, type: 'Cycling', joined: false, description: 'Weekend rides and social events for all levels.', color: '#fc4c02' },
    { id: 4, name: 'Trail Blazers', members: 3100, type: 'Hiking', joined: false, description: 'Exploring the best trails in the beautiful Bay Area.', color: '#4caf50' },
  ]);
  const [showNewClubForm, setShowNewClubForm] = useState(false);
  const [newClub, setNewClub] = useState({ name: '', type: 'Running', description: '' });

  const toggleJoinClub = (id) => {
    setClubs(prev => prev.map(club =>
      club.id === id ? { ...club, joined: !club.joined, members: club.joined ? club.members - 1 : club.members + 1 } : club
    ));
  };

  const handleCreateClub = (e) => {
    e.preventDefault();
    const newClubObj = {
      id: clubs.length + 1,
      name: newClub.name,
      type: newClub.type,
      members: 1,
      description: newClub.description,
      joined: true,
      color: '#' + Math.floor(Math.random() * 16777215).toString(16)
    };
    setClubs([...clubs, newClubObj]);
    setShowNewClubForm(false);
    setNewClub({ name: '', type: 'Running', description: '' });
  };

  const [activities, setActivities] = useState([
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
      mapCoordinates: {
        lat: 37.7694,
        lng: -122.4862,
        zoom: 14
      },
      kudos: 24,
      comments: 3
    },
    {
      id: 2,
      user: 'Sarah Adams',
      avatar: 'SA',
      avatarColor: '#e91e63',
      time: 'Today at 7:00 AM',
      location: 'Bay Area',
      type: 'Ride',
      icon: '🚴‍♀️',
      title: 'Morning Commute ☕',
      desc: 'Beautiful sunrise ride along the bay!',
      stats: [
        { label: 'Distance', value: '12.4 km' },
        { label: 'Speed', value: '22.5 km/h' },
        { label: 'Time', value: '33m 5s' },
      ],
      map: true,
      mapCoordinates: {
        lat: 37.8199,
        lng: -122.4783,
        zoom: 13
      },
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
    },
    {
      id: 4,
      user: 'Emma Wilson',
      avatar: 'EW',
      avatarColor: '#4caf50',
      time: '3 days ago',
      location: 'Aquatic Center',
      type: 'Swim',
      icon: '🏊',
      title: 'Morning Swim Session',
      desc: 'Great pool session! Working on my freestyle technique.',
      stats: [
        { label: 'Distance', value: '2.5 km' },
        { label: 'Pace', value: '2:15 /100m' },
        { label: 'Time', value: '56m 15s' },
      ],
      map: false,
      kudos: 18,
      comments: 2
    },
    {
      id: 5,
      user: 'Alex Turner',
      avatar: 'AT',
      avatarColor: '#ff9800',
      time: '4 days ago',
      location: 'Mount Tamalpais',
      type: 'Hike',
      icon: '🥾',
      title: 'Summit Hike - Mt. Tam',
      desc: 'Amazing views from the top! Perfect weather.',
      stats: [
        { label: 'Distance', value: '15.2 km' },
        { label: 'Elevation', value: '850 m' },
        { label: 'Time', value: '3h 45m' },
      ],
      map: true,
      mapCoordinates: {
        lat: 37.9235,
        lng: -122.5965,
        zoom: 12
      },
      kudos: 32,
      comments: 5
    },
    {
      id: 6,
      user: 'Lisa Chen',
      avatar: 'LC',
      avatarColor: '#e91e63',
      time: '5 days ago',
      location: 'Yoga Studio',
      type: 'Yoga',
      icon: '🧘',
      title: 'Vinyasa Flow Class',
      desc: 'Feeling centered and refreshed after this session.',
      stats: [
        { label: 'Duration', value: '1h 0m' },
        { label: 'Calories', value: '180 kcal' },
      ],
      map: false,
      kudos: 15,
      comments: 1
    }
  ]);
  const [mySegments, setMySegments] = useState([
    {
      id: 1,
      name: 'Golden Gate Climb',
      type: 'Run',
      icon: '🏃',
      distance: '2.3 km',
      elevation: '120 m',
      bestTime: '12:45',
      attempts: 8
    },
    {
      id: 2,
      name: 'Bay Bridge Sprint',
      type: 'Ride',
      icon: '🚴‍♀️',
      distance: '5.1 km',
      elevation: '45 m',
      bestTime: '8:32',
      attempts: 12
    }
  ]);

  const toggleLike = (id) => {
    setLikedActivities(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const addActivityToSegments = (activity) => {
    const newSegment = {
      id: mySegments.length + 1,
      name: activity.title,
      type: activity.type,
      icon: activity.icon,
      distance: activity.stats.find(s => s.label === 'Distance' || s.label === 'Weight')?.value || 'N/A',
      elevation: '0 m',
      bestTime: activity.stats.find(s => s.label === 'Time')?.value || 'N/A',
      attempts: 1
    };
    setMySegments(prev => [...prev, newSegment]);
  };

  const navItems = [
    { name: 'Activity Feed', icon: '🏠' },
    { name: 'My Segments', icon: '⭐' },
    { name: 'Training Log', icon: '📅' },
    { name: 'My Routes', icon: '🗺️' },
    { name: 'Clubs', icon: '👕' },
    { name: 'Settings', icon: '⚙️' },
  ];

  const handleCreateActivity = (e) => {
    e.preventDefault();
    const sportIconMap = {
      'Run': '🏃',
      'Ride': '🚴‍♀️',
      'Swim': '🏊',
      'Workout': '🏋️‍♂️',
      'Hike': '🥾',
      'Yoga': '🧘'
    };

    const newActivityObj = {
      id: activities.length + 1,
      user: 'John Doe',
      avatar: 'JD',
      time: 'Just now',
      location: 'Local Connection',
      type: newActivity.type,
      icon: sportIconMap[newActivity.type] || '⚡',
      title: newActivity.title || 'Untitled Activity',
      desc: newActivity.desc,
      stats: [
        ...(newActivity.type !== 'Yoga' ? [
          {
            label: newActivity.type === 'Workout' ? 'Weight' : 'Distance',
            value: newActivity.type === 'Workout' ? `${newActivity.distance} kg` : `${newActivity.distance} km`
          }
        ] : []),
        { label: 'Time', value: newActivity.time },
      ],
      map: false,
      kudos: 0,
      comments: 0
    };

    setActivities(prev => [newActivityObj, ...prev]);
    setShowNewActivityForm(false);
    setNewActivity({ title: '', type: 'Run', distance: '', time: '', desc: '' });
  };

  const sportTypes = [
    { name: 'All', icon: '🌟', color: '#6d6d78' },
    { name: 'Run', icon: '🏃', color: '#fc4c02' },
    { name: 'Ride', icon: '🚴‍♀️', color: '#00A4EF' },
    { name: 'Swim', icon: '🏊', color: '#4caf50' },
    { name: 'Workout', icon: '🏋️‍♂️', color: '#9c27b0' },
    { name: 'Hike', icon: '🥾', color: '#ff9800' },
    { name: 'Yoga', icon: '🧘', color: '#e91e63' },
  ];

  // Filter activities based on selected sport
  const filteredActivities = selectedSport === 'All'
    ? activities
    : activities.filter(activity => activity.type === selectedSport);

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

        {activeTab === 'Activity Feed' && (
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
                    <MapView
                      coordinates={activity.mapCoordinates}
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
            ))}
          </>
        )}

        {activeTab === 'My Segments' && (
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
                        <span>{segment.bestTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="feed-actions">
                    <button className="action-btn">📊 View Details</button>
                    <button className="action-btn">🏆 Leaderboard</button>
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
                    <button className="action-btn">👁️ View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'Training Log' && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              Training Log 📅
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Coming soon...
            </p>
          </div>
        )}

        {activeTab === 'My Routes' && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              My Routes 🗺️
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Coming soon...
            </p>
          </div>
        )}

        {activeTab === 'Clubs' && (
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
                        <button className="action-btn" style={{ flex: 1 }}>View Club</button>
                        <button className="action-btn" onClick={() => toggleJoinClub(club.id)}>Leave</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', gridColumn: 'span 2', textAlign: 'center', padding: '2rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-color)' }}>
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
                      <button className="action-btn">Info</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Settings' && (
          <div className="settings-container">
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                Settings ⚙️
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                Manage your account preferences and application settings.
              </p>
            </div>

            <div className="settings-section">
              <h3 className="settings-section-title">Profile Settings</h3>
              <div className="settings-group">
                <div className="settings-item">
                  <div className="settings-item-info">
                    <label>Display Name</label>
                    <p>How you appear to other athletes.</p>
                  </div>
                  <input type="text" className="settings-input" defaultValue="John Doe" />
                </div>
                <div className="settings-item">
                  <div className="settings-item-info">
                    <label>Email Address</label>
                    <p>Your primary contact email.</p>
                  </div>
                  <input type="email" className="settings-input" defaultValue="john.doe@example.com" />
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h3 className="settings-section-title">Display Preferences</h3>
              <div className="settings-group">
                <label className="settings-item toggle-item">
                  <div className="settings-item-info">
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Dark Mode</div>
                    <p>Use a dark color scheme for the application.</p>
                  </div>
                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      id="dark-mode-toggle"
                      checked={darkMode}
                      onChange={() => setDarkMode(!darkMode)}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </label>
                <div className="settings-item">
                  <div className="settings-item-info">
                    <label>Units of Measure</label>
                    <p>Choose between Metric and Imperial units.</p>
                  </div>
                  <select className="settings-select">
                    <option value="metric">Metric (km, m, kg)</option>
                    <option value="imperial">Imperial (mi, ft, lb)</option>
                  </select>
                </div>
                <div className="settings-item">
                  <div className="settings-item-info">
                    <label>Default Sport</label>
                    <p>The sport selected by default when viewing feeds.</p>
                  </div>
                  <select className="settings-select">
                    <option value="all">All</option>
                    <option value="run">Run</option>
                    <option value="ride">Ride</option>
                    <option value="swim">Swim</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h3 className="settings-section-title">Privacy & Security</h3>
              <div className="settings-group">
                <div className="settings-item toggle-item">
                  <div className="settings-item-info">
                    <label>Public Profile</label>
                    <p>Allow anyone to view your activities and stats.</p>
                  </div>
                  <div className="toggle-switch">
                    <input type="checkbox" id="public-profile" defaultChecked />
                    <label htmlFor="public-profile"></label>
                  </div>
                </div>
                <div className="settings-item toggle-item">
                  <div className="settings-item-info">
                    <label>Show Flybys</label>
                    <p>Let others see when you pass them on your route.</p>
                  </div>
                  <div className="toggle-switch">
                    <input type="checkbox" id="show-flybys" />
                    <label htmlFor="show-flybys"></label>
                  </div>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h3 className="settings-section-title">Notifications</h3>
              <div className="settings-group">
                <div className="settings-item toggle-item">
                  <div className="settings-item-info">
                    <label>Email Notifications</label>
                    <p>Receive weekly summaries and kudos alerts via email.</p>
                  </div>
                  <div className="toggle-switch">
                    <input type="checkbox" id="email-notifications" defaultChecked />
                    <label htmlFor="email-notifications"></label>
                  </div>
                </div>
                <div className="settings-item toggle-item">
                  <div className="settings-item-info">
                    <label>Push Notifications</label>
                    <p>Get instant alerts on your mobile device.</p>
                  </div>
                  <div className="toggle-switch">
                    <input type="checkbox" id="push-notifications" defaultChecked />
                    <label htmlFor="push-notifications"></label>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
              <button className="action-btn add-to-segment" style={{ padding: '0.75rem 2rem' }}>Save Changes</button>
              <button className="action-btn" style={{ padding: '0.75rem 2rem' }}>Cancel</button>
            </div>
          </div>
        )}

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
            <span
              style={{ fontSize: '0.7rem', color: 'var(--primary)', cursor: 'pointer' }}
              onClick={() => setActiveTab('Clubs')}
            >
              View All
            </span>
          </div>
          {clubs.filter(c => c.joined).slice(0, 3).map(club => (
            <div className="club-item" key={club.id} onClick={() => setActiveTab('Clubs')}>
              <div className="club-img" style={{ background: club.color }}></div>
              <div>
                <div className="club-name">{club.name}</div>
                <div className="club-members">{club.members < 1000 ? club.members : (club.members / 1000).toFixed(1) + 'k'} Members</div>
              </div>
            </div>
          ))}
          {clubs.filter(c => c.joined).length === 0 && (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '1rem' }}>
              Join a club to see it here!
            </p>
          )}
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
