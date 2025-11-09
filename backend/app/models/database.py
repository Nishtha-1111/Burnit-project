from sqlalchemy import create_engine, Column, Integer, String, Float, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from urllib.parse import quote_plus
from app.config import settings  # Correct import
import mysql.connector  # Add this import

Base = declarative_base()

class UserProfile(Base):
    __tablename__ = "user_profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    age = Column(Integer, nullable=False)
    weight = Column(Float, nullable=False)
    height = Column(Float, nullable=False)
    gender = Column(String(10), nullable=False)
    activity_level = Column(String(20), nullable=False)
    fitness_goal = Column(String(50), nullable=False)
    diet_preference = Column(String(50), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class DietPlan(Base):
    __tablename__ = "diet_plans"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    breakfast = Column(Text, nullable=False)
    lunch = Column(Text, nullable=False)
    dinner = Column(Text, nullable=False)
    snacks = Column(Text, nullable=False)
    calories = Column(Float, nullable=False)
    protein = Column(Float, nullable=False)
    carbs = Column(Float, nullable=False)
    fats = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

# SQLAlchemy setup (recommended approach)
engine = create_engine(settings.database_url, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create tables
def create_tables():
    Base.metadata.create_all(bind=engine)

# Legacy mysql.connector function (if needed elsewhere)
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="root@000",
        database="diet_planner"
    )

# DELETE EVERYTHING BELOW THIS LINE - it's duplicate code