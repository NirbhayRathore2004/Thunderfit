import { useState, useEffect } from 'react'
import logo from './assets/logo.png'
import Sidebar from './components/Sidebar'
import ActivityFeed from './components/ActivityFeed'
import MySegments from './components/MySegments'
import Clubs from './components/Clubs'
import Settings from './components/Settings'
import TrainingLog from './components/TrainingLog'
import MyRoutes from './components/MyRoutes'
import RightPanel from './components/RightPanel'

const INITIAL_ACTIVITIES = [
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
];

const INITIAL_CLUBS = [
  { id: 1, name: 'SF Runners', members: 12400, type: 'Running', joined: false, description: 'The largest running community in San Francisco.', color: '#333' },
  { id: 2, name: 'ThunderFit Pro', members: 5200, type: 'Multi-sport', joined: true, description: 'Elite performance and triathlon training group.', color: '#00A4EF' },
  { id: 3, name: 'Bay Area Cyclists', members: 8500, type: 'Cycling', joined: false, description: 'Weekend rides and social events for all levels.', color: '#fc4c02' },
  { id: 4, name: 'Trail Blazers', members: 3100, type: 'Hiking', joined: false, description: 'Exploring the best trails in the beautiful Bay Area.', color: '#4caf50' },
];

const INITIAL_SEGMENTS = [
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
];

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:8000');

function App() {
  const [activeTab, setActiveTab] = useState('Activity Feed');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [likedActivities, setLikedActivities] = useState({});
  const [selectedSport, setSelectedSport] = useState('All');
  const [showNewActivityForm, setShowNewActivityForm] = useState(false);
  const [showNewClubForm, setShowNewClubForm] = useState(false);

  const [activities, setActivities] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [mySegments, setMySegments] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [user, setUser] = useState(null);

  const [newActivity, setNewActivity] = useState({
    title: '',
    type: 'Run',
    distance: '',
    time: '',
    desc: ''
  });

  const [newClub, setNewClub] = useState({ name: '', type: 'Running', description: '' });

  // Persistence Effects
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Backend Integration
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [actRes, clubRes, segRes, challengeRes, userRes] = await Promise.all([
          fetch(`${API_URL}/activities`),
          fetch(`${API_URL}/clubs`),
          fetch(`${API_URL}/segments`),
          fetch(`${API_URL}/challenges`),
          fetch(`${API_URL}/user`)
        ]);

        if (actRes.ok) setActivities(await actRes.json());
        if (clubRes.ok) setClubs(await clubRes.json());
        if (segRes.ok) setMySegments(await segRes.json());
        if (challengeRes.ok) setChallenges(await challengeRes.json());
        if (userRes.ok) setUser(await userRes.json());
      } catch (err) {
        console.error("Failed to fetch data from backend", err);
      }
    };
    fetchData();
  }, []);

  const toggleJoinClub = async (id) => {
    try {
      const res = await fetch(`${API_URL}/clubs/${id}/toggle`, { method: 'POST' });
      if (res.ok) {
        const updatedClub = await res.json();
        setClubs(prev => prev.map(club => club.id === id ? updatedClub : club));
      }
    } catch (err) {
      console.error("Failed to toggle club", err);
    }
  };

  const handleCreateClub = async (e) => {
    e.preventDefault();
    const clubData = {
      name: newClub.name,
      type: newClub.type,
      description: newClub.description,
      members: 1,
      joined: true,
      color: '#' + Math.floor(Math.random() * 16777215).toString(16)
    };

    try {
      const res = await fetch(`${API_URL}/clubs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clubData)
      });
      if (res.ok) {
        const created = await res.json();
        setClubs(prev => [...prev, created]);
        setShowNewClubForm(false);
        setNewClub({ name: '', type: 'Running', description: '' });
      }
    } catch (err) {
      console.error("Failed to create club", err);
    }
  };

  const toggleLike = (id) => {
    setLikedActivities(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const addActivityToSegments = async (activity) => {
    const newSegment = {
      name: activity.title,
      type: activity.type,
      icon: activity.icon,
      distance: activity.stats.find(s => s.label === 'Distance' || s.label === 'Weight')?.value || 'N/A',
      elevation: '0 m',
      best_time: activity.stats.find(s => s.label === 'Time')?.value || 'N/A',
      attempts: 1
    };

    try {
      const res = await fetch(`${API_URL}/segments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSegment)
      });
      if (res.ok) {
        const created = await res.json();
        setMySegments(prev => [...prev, created]);
      }
    } catch (err) {
      console.error("Failed to create segment", err);
    }
  };

  const handleCreateActivity = async (e) => {
    e.preventDefault();
    const sportIconMap = {
      'Run': '🏃',
      'Ride': '🚴‍♀️',
      'Swim': '🏊',
      'Workout': '🏋️‍♂️',
      'Hike': '🥾',
      'Yoga': '🧘'
    };

    const activityData = {
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

    try {
      const res = await fetch(`${API_URL}/activities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activityData)
      });

      if (res.ok) {
        const created = await res.json();
        setActivities(prev => [created, ...prev]);
        setShowNewActivityForm(false);
        setNewActivity({ title: '', type: 'Run', distance: '', time: '', desc: '' });
        alert("Activity saved successfully! 🏃‍♂️");
      } else {
        const status = res.status;
        const text = await res.text().catch(() => "No response body");
        alert(`Server Error (${status}): ${text.substring(0, 100)}`);
      }
    } catch (err) {
      console.error("Failed to create activity", err);
      alert(`Network Error: ${err.message}`);
    }
  };

  const navItems = [
    { name: 'Activity Feed', icon: '🏠' },
    { name: 'My Segments', icon: '⭐' },
    { name: 'Training Log', icon: '📅' },
    { name: 'My Routes', icon: '🗺️' },
    { name: 'Clubs', icon: '👕' },
    { name: 'Settings', icon: '⚙️' },
  ];

  const sportTypes = [
    { name: 'All', icon: '🌟', color: '#6d6d78' },
    { name: 'Run', icon: '🏃', color: '#fc4c02' },
    { name: 'Ride', icon: '🚴‍♀️', color: '#00A4EF' },
    { name: 'Swim', icon: '🏊', color: '#4caf50' },
    { name: 'Workout', icon: '🏋️‍♂️', color: '#9c27b0' },
    { name: 'Hike', icon: '🥾', color: '#ff9800' },
    { name: 'Yoga', icon: '🧘', color: '#e91e63' },
  ];

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
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        navItems={navItems}
        logo={logo}
      />

      <main className="main-feed">
        {activeTab === 'Activity Feed' && (
          <ActivityFeed
            getGreeting={getGreeting}
            sportTypes={sportTypes}
            selectedSport={selectedSport}
            setSelectedSport={setSelectedSport}
            filteredActivities={filteredActivities}
            likedActivities={likedActivities}
            toggleLike={toggleLike}
          />
        )}

        {activeTab === 'My Segments' && (
          <MySegments
            mySegments={mySegments}
            activities={activities}
            showNewActivityForm={showNewActivityForm}
            setShowNewActivityForm={setShowNewActivityForm}
            newActivity={newActivity}
            setNewActivity={setNewActivity}
            handleCreateActivity={handleCreateActivity}
            addActivityToSegments={addActivityToSegments}
            sportTypes={sportTypes}
          />
        )}

        {activeTab === 'Training Log' && <TrainingLog activities={activities} user={user} />}
        {activeTab === 'My Routes' && <MyRoutes activities={activities} />}

        {activeTab === 'Clubs' && (
          <Clubs
            clubs={clubs}
            showNewClubForm={showNewClubForm}
            setShowNewClubForm={setShowNewClubForm}
            newClub={newClub}
            setNewClub={setNewClub}
            handleCreateClub={handleCreateClub}
            toggleJoinClub={toggleJoinClub}
          />
        )}

        {activeTab === 'Settings' && <Settings darkMode={darkMode} setDarkMode={setDarkMode} />}
      </main>

      <RightPanel
        clubs={clubs}
        user={user}
        challenges={challenges}
        toggleJoinClub={toggleJoinClub}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}

export default App;
