from pydantic import BaseModel

class WorkoutRequest(BaseModel):
    age: int
    height: int
    weight: float
    gender: str
    level: str
    purpose: str
    equipment: str
