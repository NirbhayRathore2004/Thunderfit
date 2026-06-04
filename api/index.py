from fastapi import FastAPI, Depends, HTTPException, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from api import models, schemas
from api.database import SessionLocal, engine, get_db
import hashlib
import secrets

def get_password_hash(password):
    salt = secrets.token_hex(8)
    h = hashlib.sha256((password + salt).encode()).hexdigest()
    return f"{salt}${h}"

def verify_password(plain_password, hashed_password):
    try:
        salt, h = hashed_password.split("$")
        return hashlib.sha256((plain_password + salt).encode()).hexdigest() == h
    except:
        return False

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
    # Seeding disabled for production/user-ready state
    pass

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

@router.get("/routes", response_model=List[schemas.Route])
def read_routes(db: Session = Depends(get_db)):
    return db.query(models.Route).all()

@router.post("/routes", response_model=schemas.Route)
def create_route(route: schemas.RouteCreate, db: Session = Depends(get_db)):
    db_route = models.Route(**route.dict())
    db.add(db_route)
    db.commit()
    db.refresh(db_route)
    return db_route

@router.get("/user", response_model=schemas.User)
def get_user(db: Session = Depends(get_db)):
    user = db.query(models.User).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/signup", response_model=schemas.User)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pwd = get_password_hash(user.password)
    avatar_color = '#' + ''.join([hex(ord(c)*50)[2:4] for c in user.name[:3]]).ljust(6, '0')[:6]
    
    new_user = models.User(
        name=user.name,
        email=user.email,
        hashed_password=hashed_pwd,
        avatar=user.name[:2].upper(),
        avatar_color=avatar_color,
        weekly_distance=0.0,
        weekly_goal=50.0,
        total_distance=0.0,
        total_time="0h 0m"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login", response_model=schemas.User)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    return db_user

app.include_router(router)
