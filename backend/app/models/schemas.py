from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserProfileBase(BaseModel):
    name: str
    age: int
    weight: float
    height: float
    gender: str
    activity_level: str
    fitness_goal: str
    diet_preference: str

class UserProfileCreate(UserProfileBase):
    pass

class UserProfileResponse(UserProfileBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class DietPlanBase(BaseModel):
    breakfast: str
    lunch: str
    dinner: str
    snacks: str
    calories: float
    protein: float
    carbs: float
    fats: float

class DietPlanCreate(DietPlanBase):
    user_id: int

class DietPlanResponse(DietPlanBase):
    id: int
    user_id: int
    created_at: datetime | None = None
    
    class Config:
        from_attributes = True

class DietRecommendationRequest(UserProfileBase):
    pass