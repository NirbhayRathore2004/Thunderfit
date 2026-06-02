from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, JSON
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    avatar = Column(String)
    avatar_color = Column(String)

    # Performance Stats
    weekly_distance = Column(Float, default=0.0)
    weekly_goal = Column(Float, default=50.0)
    total_distance = Column(Float, default=0.0)
    total_time = Column(String, default="0h 0m")

    activities = relationship("Activity", back_populates="owner")

class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    time = Column(String)
    location = Column(String)
    type = Column(String)
    icon = Column(String)
    title = Column(String)
    desc = Column(String)
    stats = Column(JSON) # List of {label, value}
    map = Column(Boolean, default=False)
    map_coordinates = Column(JSON) # {lat, lng, zoom}
    kudos = Column(Integer, default=0)
    comments = Column(Integer, default=0)

    owner = relationship("User", back_populates="activities")

class Club(Base):
    __tablename__ = "clubs"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    members = Column(Integer, default=0)
    type = Column(String)
    joined = Column(Boolean, default=False)
    description = Column(String)
    color = Column(String)

class Segment(Base):
    __tablename__ = "segments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    type = Column(String)
    icon = Column(String)
    distance = Column(String)
    elevation = Column(String)
    best_time = Column(String)
    attempts = Column(Integer, default=0)

class Challenge(Base):
    __tablename__ = "challenges"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    days_left = Column(Integer)
    progress = Column(Integer) # Percentage
    joined = Column(Boolean, default=False)
