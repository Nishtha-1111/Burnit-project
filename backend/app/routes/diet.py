from fastapi import APIRouter, HTTPException
from app.models.schemas import *
from app.models.database import get_db_connection
from app.ml.model import diet_model
import mysql.connector

router = APIRouter()

@router.post("/recommend-diet", response_model=DietPlanResponse)
async def recommend_diet(request: DietRecommendationRequest):
    conn = None
    try:
        # Generate diet plan using ML model
        diet_plan = diet_model.generate_diet_plan(request.dict())
        
        # Save user profile
        conn = get_db_connection()
        
        # First cursor for INSERT operations
        cursor = conn.cursor()
        
        # Insert user profile
        cursor.execute("""
            INSERT INTO user_profiles 
            (name, age, weight, height, gender, activity_level, fitness_goal, diet_preference)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """, (request.name, request.age, request.weight, request.height, 
              request.gender, request.activity_level, request.fitness_goal, 
              request.diet_preference))
        
        user_id = cursor.lastrowid
        
        # Insert diet plan
        cursor.execute("""
            INSERT INTO diet_plans 
            (user_id, breakfast, lunch, dinner, snacks, calories, protein, carbs, fats)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (user_id, diet_plan['breakfast'], diet_plan['lunch'], 
              diet_plan['dinner'], diet_plan['snacks'], diet_plan['calories'],
              diet_plan['protein'], diet_plan['carbs'], diet_plan['fats']))
        
        plan_id = cursor.lastrowid
        conn.commit()
        
        # Second cursor (dictionary) for SELECT operation - THIS IS THE KEY FIX
        cursor_dict = conn.cursor(dictionary=True)
        cursor_dict.execute("SELECT * FROM diet_plans WHERE id = %s", (plan_id,))
        created_plan = cursor_dict.fetchone()
        
        # Return the complete diet plan
        return {
            "id": plan_id,
            "user_id": user_id,
            "breakfast": diet_plan['breakfast'],
            "lunch": diet_plan['lunch'],
            "dinner": diet_plan['dinner'],
            "snacks": diet_plan['snacks'],
            "calories": diet_plan['calories'],
            "protein": diet_plan['protein'],
            "carbs": diet_plan['carbs'],
            "fats": diet_plan['fats'],
            "created_at": created_plan['created_at'] if created_plan else None
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn and conn.is_connected():
            conn.close()

@router.get("/diet-plans/{user_id}")
async def get_user_diet_plans(user_id: int):
    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("SELECT * FROM diet_plans WHERE user_id = %s ORDER BY created_at DESC", (user_id,))
        diet_plans = cursor.fetchall()
        
        return diet_plans
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn and conn.is_connected():
            conn.close()