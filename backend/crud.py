import random
from database import get_connection

def get_recommendations(data):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    age = data['age']
    height = data['height']
    weight = data['weight']
    gender = data['gender']
    level = data['level']
    purpose = data['purpose']
    equipment = data['equipment']

    # ----------------------
    # 1. Filter bodyweight exercises
    # ----------------------
    bodyweight_query = """
        SELECT * FROM exercises
        WHERE type='bodyweight'
          AND difficulty=%s
          AND purpose=%s
          AND (gender=%s OR gender='Other')
          AND min_age <= %s AND max_age >= %s
          AND min_height <= %s AND max_height >= %s
          AND min_weight <= %s AND max_weight >= %s
    """
    cursor.execute(bodyweight_query, (level, purpose, gender, age, age, height, height, weight, weight))
    bodyweight_exercises = cursor.fetchall()

    # Randomly pick up to 4 bodyweight exercises
    if len(bodyweight_exercises) >= 4:
        bodyweight_selection = random.sample(bodyweight_exercises, 4)
    else:
        bodyweight_selection = bodyweight_exercises.copy()
        # Fill missing slots with random bodyweight exercises
        cursor.execute("SELECT * FROM exercises WHERE type='bodyweight'")
        all_bodyweight = cursor.fetchall()
        remaining = 4 - len(bodyweight_selection)
        extra = random.sample(all_bodyweight, remaining)
        bodyweight_selection.extend(extra)

    # ----------------------
    # 2. Equipment exercise
    # ----------------------
    equipment_selection = []
    if equipment and equipment.lower() != "none":
        equipment_query = """
            SELECT * FROM exercises
            WHERE type='equipment'
              AND equipment_needed=%s
              AND difficulty=%s
              AND purpose=%s
              AND (gender=%s OR gender='Other')
              AND min_age <= %s AND max_age >= %s
              AND min_height <= %s AND max_height >= %s
              AND min_weight <= %s AND max_weight >= %s
        """
        cursor.execute(equipment_query, (equipment, level, purpose, gender, age, age, height, height, weight, weight))
        eq_exercises = cursor.fetchall()
        if eq_exercises:
            equipment_selection = [random.choice(eq_exercises)]
        else:
            # If no match, pick any random equipment exercise
            cursor.execute("SELECT * FROM exercises WHERE type='equipment'")
            all_equipment = cursor.fetchall()
            if all_equipment:
                equipment_selection = [random.choice(all_equipment)]
    else:
        # No equipment → add one more bodyweight exercise
        cursor.execute("SELECT * FROM exercises WHERE type='bodyweight'")
        all_bodyweight = cursor.fetchall()
        remaining = 1
        extra = random.sample(all_bodyweight, remaining)
        equipment_selection = extra

    cursor.close()
    conn.close()

    # ----------------------
    # 3. Add default reps only if reps should exist
    # ----------------------
    final_exercises = bodyweight_selection + equipment_selection
    for ex in final_exercises:
        # Add default reps only if the exercise normally requires reps
        if ex.get("reps") is None or ex["reps"].strip() == "":
            if ex["type"] in ["bodyweight", "equipment"] and ex["purpose"].lower() not in ["flexibility / mobility", "posture / back strength"]:
                ex["reps"] = "10-15 reps"

    random.shuffle(final_exercises)
    return final_exercises
