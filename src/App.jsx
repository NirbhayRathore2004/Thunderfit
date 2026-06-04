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
import Auth from './components/Auth'

const INITIAL_ACTIVITIES = [];
const INITIAL_CLUBS = [];
const INITIAL_SEGMENTS = [];

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:8000');

function App() {
  const [activeTab, setActiveTab] = useState('Activity Feed');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [likedActivities, setLikedActivities] = useState({});
  const [selectedSport, setSelectedSport] = useState('All');
  const [activities, setActivities] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [mySegments, setMySegments] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setActiveTab('Activity Feed');
  };

  const [showNewActivityForm, setShowNewActivityForm] = useState(false);
  const [showNewClubForm, setShowNewClubForm] = useState(false);
  const [showNewRouteForm, setShowNewRouteForm] = useState(false);

  const [newActivity, setNewActivity] = useState({
    title: '',
    type: 'Run',
    distance: '',
    time: '',
    desc: '',
    map: false,
    mapCoordinates: { lat: 37.7749, lng: -122.4194, zoom: 13 }
  });
  const [newRoute, setNewRoute] = useState({
    name: '',
    distance: '',
    location: '',
    coordinates: { lat: 37.7749, lng: -122.4194, zoom: 13 }
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
        const [actRes, clubRes, segRes, chalRes, routeRes] = await Promise.all([
          fetch(`${API_URL}/activities`),
          fetch(`${API_URL}/clubs`),
          fetch(`${API_URL}/segments`),
          fetch(`${API_URL}/challenges`),
          fetch(`${API_URL}/routes`)
        ]);

        if (actRes.ok) setActivities(await actRes.json());
        if (clubRes.ok) setClubs(await clubRes.json());
        if (segRes.ok) setMySegments(await segRes.json());
        if (chalRes.ok) setChallenges(await chalRes.json());
        if (routeRes.ok) setRoutes(await routeRes.json());
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const handleCreateRoute = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/routes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRoute)
      });

      if (res.ok) {
        const created = await res.json();
        setRoutes(prev => [created, ...prev]);
        setShowNewRouteForm(false);
        setNewRoute({ name: '', distance: '', location: '', coordinates: { lat: 37.7749, lng: -122.4194, zoom: 13 } });
        alert("Route created successfully! 🗺️");
      } else {
        alert("Failed to create route.");
      }
    } catch (err) {
      alert("Network error: Could not connect to the server.");
    }
  };

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
      map: newActivity.map,
      map_coordinates: newActivity.mapCoordinates,
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
      {!user ? (
        <Auth onLogin={setUser} />
      ) : (
        <>
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            navItems={navItems}
            logo={logo}
            user={user}
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
                user={user}
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
            {activeTab === 'My Routes' && <MyRoutes
              activities={activities}
              routes={routes}
              showNewRouteForm={showNewRouteForm}
              setShowNewRouteForm={setShowNewRouteForm}
              newRoute={newRoute}
              setNewRoute={setNewRoute}
              handleCreateRoute={handleCreateRoute}
            />}

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

            {activeTab === 'Settings' && <Settings darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout} user={user} />}
          </main>

          <RightPanel
            clubs={clubs}
            user={user}
            challenges={challenges}
            toggleJoinClub={toggleJoinClub}
            setActiveTab={setActiveTab}
          />
        </>
      )}
    </div>
  );
}

export default App;
