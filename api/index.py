from fastapi import FastAPI, Depends, HTTPException, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from api import models, schemas
from api.database import SessionLocal, engine, get_db

try:
    models.Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"Error creating tables: {e}")

app = FastAPI(title="ThunderFit API")
router = APIRouter(prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def seed_data():
    try:
        db = SessionLocal()
        if db.query(models.User).first():
            db.close()
            return

        user = models.User(
            name="John Doe", 
            email="john@example.com", 
            avatar="JD", 
            avatar_color="#e34402",
            weekly_distance=42.5,
            weekly_goal=50.0,
            total_distance=1240.2,
            total_time="145h 20m"
        )
        db.add(user)
        db.commit()
        db.refresh(user)

        activities = [
            models.Activity(
                user_id=user.id,
                time="Yesterday at 6:30 PM",
                location="San Francisco",
                type="Run",
                icon="🏃",
                title="Evening Run - Golden Gate Park",
                desc="Felt great today! Pushed the pace on the last mile.",
                stats=[{"label": "Distance", "value": "8.52 km"}, {"label": "Pace", "value": "5:12 /km"}, {"label": "Time", "value": "45m 10s"}],
                map=True,
                map_coordinates={"lat": 37.7694, "lng": -122.4862, "zoom": 14},
                kudos=24,
                comments=3
            ),
            models.Activity(
                user_id=user.id,
                time="Today at 7:00 AM",
                location="Bay Area",
                type="Ride",
                icon="🚴‍♀️",
                title="Morning Commute ☕",
                desc="Beautiful sunrise ride along the bay!",
                stats=[{"label": "Distance", "value": "12.4 km"}, {"label": "Speed", "value": "22.5 km/h"}, {"label": "Time", "value": "33m 5s"}],
                map=True,
                map_coordinates={"lat": 37.8199, "lng": -122.4783, "zoom": 13},
                kudos=12,
                comments=0
            )
        ]
        db.add_all(activities)

        clubs = [
            models.Club(name="SF Runners", members=12400, type="Running", joined=False, description="The largest running community in San Francisco.", color="#333"),
            models.Club(name="ThunderFit Pro", members=5200, type="Multi-sport", joined=True, description="Elite performance and triathlon training group.", color="#00A4EF"),
            models.Club(name="Bay Area Cyclists", members=8500, type="Cycling", joined=False, description="Weekend rides and social events for all levels.", color="#fc4c02"),
        ]
        db.add_all(clubs)

        segments = [
            models.Segment(name="Golden Gate Climb", type="Run", icon="🏃", distance="2.3 km", elevation="120 m", best_time="12:45", attempts=8),
        ]
        db.add_all(segments)

        challenges = [
            models.Challenge(title="June 10k Challenge", days_left=8, progress=60, joined=True),
            models.Challenge(title="Morning Motivation", days_left=12, progress=30, joined=False),
        ]
        db.add_all(challenges)

        db.commit()
    except Exception as e:
        print(f"Seeding error: {e}")
    finally:
        db.close()

@app.on_event("startup")
def on_startup():
    seed_data()

@router.get("/activities", response_model=List[schemas.Activity])
def read_activities(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Activity).order_by(models.Activity.id.desc()).offset(skip).limit(limit).all()

@router.post("/activities", response_model=schemas.Activity)
def create_activity(activity: schemas.ActivityCreate, db: Session = Depends(get_db)):
    try:
        user = db.query(models.User).first()
        if not user:
            user = models.User(name="Default User", email="user@example.com", avatar="DU")
            db.add(user)
            db.commit()
            db.refresh(user)
        
        data = activity.model_dump() if hasattr(activity, "model_dump") else activity.dict()
        db_activity = models.Activity(**data, user_id=user.id)
        db.add(db_activity)
        db.commit()
        db.refresh(db_activity)
        return db_activity
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database Error: {str(e)}")

@router.get("/clubs", response_model=List[schemas.Club])
def read_clubs(db: Session = Depends(get_db)):
    return db.query(models.Club).all()

@router.post("/clubs", response_model=schemas.Club)
def create_club(club: schemas.ClubCreate, db: Session = Depends(get_db)):
    db_club = models.Club(**club.dict())
    db.add(db_club)
    db.commit()
    db.refresh(db_club)
    return db_club

@router.post("/clubs/{club_id}/toggle", response_model=schemas.Club)
def toggle_club(club_id: int, db: Session = Depends(get_db)):
    db_club = db.query(models.Club).filter(models.Club.id == club_id).first()
    if not db_club:
        raise HTTPException(status_code=404, detail="Club not found")
    db_club.joined = not db_club.joined
    db_club.members = db_club.members + 1 if db_club.joined else db_club.members - 1
    db.commit()
    db.refresh(db_club)
    return db_club

@router.get("/segments", response_model=List[schemas.Segment])
def read_segments(db: Session = Depends(get_db)):
    return db.query(models.Segment).all()

@router.post("/segments", response_model=schemas.Segment)
def create_segment(segment: schemas.SegmentCreate, db: Session = Depends(get_db)):
    db_segment = models.Segment(**segment.dict())
    db.add(db_segment)
    db.commit()
    db.refresh(db_segment)
    return db_segment

@router.get("/challenges", response_model=List[schemas.Challenge])
def read_challenges(db: Session = Depends(get_db)):
    return db.query(models.Challenge).all()

@router.get("/user", response_model=schemas.User)
def get_user(db: Session = Depends(get_db)):
    user = db.query(models.User).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

app.include_router(router)
