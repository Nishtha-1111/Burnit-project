import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
import joblib

class DietRecommendationModel:
    def __init__(self):
        self.model = None
        self.label_encoders = {}
        self.food_dataset = self._create_food_dataset()
        
    def _create_food_dataset(self):
        # Sample food database - in real project, use comprehensive dataset
        foods = {
            'breakfast': {
                'Vegetarian': ['Oatmeal with fruits', 'Vegetable Poha', 'Besan Chilla', 'Fruit Smoothie'],
                'Non-Vegetarian': ['Egg Scramble', 'Chicken Sandwich', 'Protein Shake', 'Greek Yogurt with Nuts'],
                'Vegan': ['Tofu Scramble', 'Vegan Smoothie Bowl', 'Chia Pudding', 'Avocado Toast']
            },
            'lunch': {
                'Vegetarian': ['Dal Rice with Salad', 'Vegetable Biryani', 'Paneer Curry with Roti', 'Quinoa Bowl'],
                'Non-Vegetarian': ['Grilled Chicken with Rice', 'Fish Curry', 'Chicken Salad', 'Turkey Wrap'],
                'Vegan': ['Lentil Soup', 'Vegan Buddha Bowl', 'Chickpea Curry', 'Vegetable Stir Fry']
            },
            'dinner': {
                'Vegetarian': ['Vegetable Soup', 'Stir-fried Vegetables', 'Lentil Curry', 'Grilled Paneer'],
                'Non-Vegetarian': ['Baked Salmon', 'Grilled Chicken', 'Fish Stew', 'Lean Beef Stir Fry'],
                'Vegan': ['Vegan Chili', 'Roasted Vegetables', 'Tofu Curry', 'Mushroom Risotto']
            }
        }
        return foods
    
    def calculate_bmr(self, weight, height, age, gender):
        if gender.lower() == 'male':
            return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
        else:
            return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
    
    def calculate_tdee(self, bmr, activity_level):
        activity_multipliers = {
            'sedentary': 1.2,
            'light': 1.375,
            'moderate': 1.55,
            'active': 1.725,
            'very_active': 1.9
        }
        return bmr * activity_multipliers.get(activity_level.lower(), 1.2)
    
    def adjust_calories_for_goal(self, tdee, fitness_goal):
        goal_adjustments = {
            'weight_loss': -500,
            'maintenance': 0,
            'muscle_gain': 300,
            'extreme_weight_loss': -800
        }
        return tdee + goal_adjustments.get(fitness_goal.lower(), 0)
    
    def generate_diet_plan(self, user_data):
        # Calculate nutritional needs
        bmr = self.calculate_bmr(user_data['weight'], user_data['height'], user_data['age'], user_data['gender'])
        tdee = self.calculate_tdee(bmr, user_data['activity_level'])
        daily_calories = self.adjust_calories_for_goal(tdee, user_data['fitness_goal'])
        
        # Macronutrient distribution based on goal
        if user_data['fitness_goal'] == 'weight_loss':
            protein_ratio, carb_ratio, fat_ratio = 0.35, 0.40, 0.25
        elif user_data['fitness_goal'] == 'muscle_gain':
            protein_ratio, carb_ratio, fat_ratio = 0.40, 0.35, 0.25
        else:  # maintenance
            protein_ratio, carb_ratio, fat_ratio = 0.30, 0.45, 0.25
        
        protein_g = (daily_calories * protein_ratio) / 4
        carbs_g = (daily_calories * carb_ratio) / 4
        fats_g = (daily_calories * fat_ratio) / 9
        
        # Generate meal plan based on diet preference
        diet_pref = user_data['diet_preference']
        meals = self.food_dataset
        
        breakfast = np.random.choice(meals['breakfast'][diet_pref])
        lunch = np.random.choice(meals['lunch'][diet_pref])
        dinner = np.random.choice(meals['dinner'][diet_pref])
        snacks = "Fruits and Nuts"  # Simple snack recommendation
        
        return {
            'breakfast': breakfast,
            'lunch': lunch,
            'dinner': dinner,
            'snacks': snacks,
            'calories': round(daily_calories),
            'protein': round(protein_g, 1),
            'carbs': round(carbs_g, 1),
            'fats': round(fats_g, 1)
        }

# Global model instance
diet_model = DietRecommendationModel()