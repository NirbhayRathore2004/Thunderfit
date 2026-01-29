# ThunderFit 🏃‍♂️⚡

A premium fitness tracking application inspired by Strava, built with React and Vite.

## ✨ Features

### 🏠 Activity Feed
- Real-time activity updates from friends and fellow athletes
- Interactive activity cards with detailed stats
- Like, comment, and share functionality
- **Interactive maps** powered by OpenStreetMap
- Multiple map view types (Map, Satellite, Terrain)

### ⭐ My Segments
- Track your performance on favorite routes
- View all your saved segments with key metrics
- **Add activities to segments** with one click
- See distance, elevation, and best times
- Available activities section for easy segment creation

### 📊 Activity Stats
- Distance tracking
- Pace/Speed monitoring
- Time duration
- Elevation gain
- Calories burned

### 🗺️ Interactive Maps
- Embedded OpenStreetMap views for each activity
- GPS coordinate display
- Switch between Map, Satellite, and Terrain views
- Direct link to open location in Google Maps
- Responsive and interactive map controls

### 🎨 Premium Design
- Clean, modern Strava-inspired UI
- Smooth animations and transitions
- Glassmorphism effects
- Gradient buttons and premium styling
- Fully responsive layout

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app will be available at `http://localhost:5173/`

## 📁 Project Structure

```
Thunderfit/
├── src/
│   ├── App.jsx          # Main application component
│   ├── MapView.jsx      # Interactive map component
│   ├── index.css        # Global styles and design system
│   ├── main.jsx         # Application entry point
│   └── assets/          # Images and static assets
├── public/              # Public assets
└── index.html           # HTML template
```

## 🎯 Key Components

### MapView Component
Displays interactive maps for activities with:
- OpenStreetMap integration (no API key required)
- Multiple view modes
- GPS coordinates
- Direct Google Maps integration

### Activity Feed
Shows real-time updates with:
- User information
- Activity details and descriptions
- Performance statistics
- Interactive maps for outdoor activities
- Social features (likes, comments, shares)

### My Segments
Personal segment tracking with:
- Saved segments list
- Performance metrics
- Available activities to add
- One-click segment creation

## 🛠️ Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **OpenStreetMap** - Interactive maps
- **CSS3** - Modern styling with custom properties
- **ESLint** - Code quality

## 🎨 Design System

The app uses a carefully crafted design system with:
- Custom color palette (Strava Orange, Thunderbolt Blue)
- Consistent spacing and typography
- Smooth animations and transitions
- Responsive breakpoints

## 📝 Future Enhancements

- [ ] Google Maps API integration (requires API key)
- [ ] Training Log functionality
- [ ] My Routes feature
- [ ] Clubs and social features
- [ ] User authentication
- [ ] Activity upload
- [ ] Performance analytics

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ⚡ by ThunderFit Team
