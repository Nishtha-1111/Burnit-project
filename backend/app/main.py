from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.diet import router as diet_router

app = FastAPI(
    title="Diet Recommendation API",
    description="ML-powered Personalized Diet Plan Generator",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(diet_router, prefix="/api/v1", tags=["diet"])

@app.get("/")
async def root():
    return {"message": "Diet Recommendation API is running!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)