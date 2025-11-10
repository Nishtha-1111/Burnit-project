from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas import WorkoutRequest
from crud import get_recommendations

app = FastAPI(
    title="Workout Recommendation API",
    description="Personalized workout recommendations based on user profile.",
    version="1.0.0"
)

# Enable CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow requests from any origin
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Workout Recommendation API is running. Use /recommendation to get workouts."}

@app.post("/recommendation")
def recommend(workout: WorkoutRequest):
    """
    Receives user workout profile and returns up to 5 recommended exercises:
    - 4 bodyweight exercises
    - 1 equipment exercise (if equipment selected)
    """
    data = workout.dict()
    exercises = get_recommendations(data)

    if not exercises:
        return {"exercises": [], "message": "No exercises found matching your criteria."}

    return {"exercises": exercises}
