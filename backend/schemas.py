from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class UserBase(BaseModel):
    name: str
    email: str
    avatar: str
    avatar_color: str
    weekly_distance: float = 0.0
    weekly_goal: float = 50.0
    total_distance: float = 0.0
    total_time: str = "0h 0m"

class UserCreate(UserBase):
    pass

class ChallengeBase(BaseModel):
    title: str
    days_left: int
    progress: int
    joined: bool = False

class ChallengeCreate(ChallengeBase):
    pass

class Challenge(ChallengeBase):
    id: int

    class Config:
        from_attributes = True

class ActivityBase(BaseModel):
    time: str
    location: str
    type: str
    icon: str
    title: str
    desc: Optional[str] = None
    stats: List[Dict[str, str]]
    map: bool = False
    map_coordinates: Optional[Dict[str, Any]] = None
    kudos: int = 0
    comments: int = 0

class ActivityCreate(ActivityBase):
    pass

class Activity(ActivityBase):
    id: int
    user_id: int
    owner: UserBase # This will match the SQLAlchemy 'owner' relationship

    class Config:
        from_attributes = True

class User(UserBase):
    id: int
    activities: List[Activity] = []

    class Config:
        from_attributes = True

class ClubBase(BaseModel):
    name: str
    members: int
    type: str
    joined: bool = False
    description: str
    color: str

class ClubCreate(ClubBase):
    pass

class Club(BaseModel):
    id: int
    name: str
    members: int
    type: str
    joined: bool
    description: str
    color: str

    class Config:
        from_attributes = True

class SegmentBase(BaseModel):
    name: str
    type: str
    icon: str
    distance: str
    elevation: str
    best_time: str
    attempts: int

class SegmentCreate(SegmentBase):
    pass

class Segment(SegmentBase):
    id: int

    class Config:
        orm_mode = True
