# ThunderFit 🏃‍♂️⚡

A premium full-stack fitness tracking application inspired by Strava, built with **React**, **FastAPI**, and **SQLite**.

## ✨ Features

### 🏠 Activity Feed
- Real-time activity updates fetched from the **Python backend**.
- Interactive activity cards with detailed stats.
- Like, comment, and share functionality.
- **Interactive maps** powered by OpenStreetMap.
- Multiple map view types (Map, Satellite, Terrain).

### ⭐ My Segments & Routes
- Track your performance on favorite routes and segments.
- View all your saved segments with key metrics.
- **Add activities to segments** with real-time database persistence.
- **My Routes** view for exploring paths with interactive maps.

### 📅 Training Log
- Complete statistical dashboard showing performance trends.
- Tracks **Weekly Distance**, **Active Time**, and **Total Volume**.
- Visualized recent training history stored in SQL.

### 👕 Clubs & Social
- Browse and join performance-focused clubs.
- Real-time member count updates and club creation.
- Dynamic club suggestions based on your interests.

### 🎨 Premium Design
- Clean, modern Strava-inspired UI with **Glassmorphism** effects.
- **Dark Mode** support with persistent user preferences.
- Fully responsive layout for mobile and desktop.

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **Python** (3.9 or higher)
- **pip** and a virtual environment tool

### Installation

#### 1. Setup Backend
```bash
# Navigate to project root
cd Thunderfit

# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install Python dependencies
pip install -r backend/requirements.txt

# Start FastAPI server
python3 -m uvicorn backend.main:app --reload --port 8000
```
Backend will be available at `http://localhost:8000` with interactive docs at `/docs`.

#### 2. Setup Frontend
```bash
# In a new terminal
# Install Node dependencies
npm install

# Start Vite development server
npm run dev
```
Frontend will be available at `http://localhost:5173/`.

## 📁 Project Structure

```
Thunderfit/
├── backend/            # Python FastAPI Backend
│   ├── main.py         # API entry point & routes
│   ├── models.py       # SQLAlchemy database models
│   ├── schemas.py      # Pydantic data validation
│   └── database.py     # Database connection setup
├── src/                # React Frontend
│   ├── components/     # Modular UI components
│   ├── assets/         # Static assets & logo
│   ├── App.jsx         # Main application logic
│   ├── MapView.jsx     # Reusable Map component
│   └── index.css       # Design system & global styles
├── thunderfit.db       # SQLite Database (Auto-generated)
└── package.json        # Node dependencies
```

## 🛠️ Technologies Used

- **Frontend**: [React](https://reactjs.org/), [Vite](https://vitejs.dev/), [OpenStreetMap](https://www.openstreetmap.org/)
- **Backend**: [FastAPI](https://fastapi.tiangolo.com/), [SQLAlchemy](https://www.sqlalchemy.org/)
- **Database**: [SQLite](https://www.sqlite.org/)
- **Styling**: Modern CSS3 with Custom Properties (Vanilla)

## 🎨 Design System

The app utilizes a premium design system featuring:
- **Primary Color**: Strava Orange (`#fc4c02`)
- **Accent Color**: Thunderbolt Blue (`#00A4EF`)
- **Typography**: Inter / System UI
- **Components**: Rounded corners (`12px`), subtle box shadows, and glassmorphism.

## 📄 License

This project is open-source and available under the MIT License.

---

Built with ⚡ by ThunderFit Team
