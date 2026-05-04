#!/usr/bin/env python3
"""
Simplified Backend Server for IPL Team Strategist
Minimal dependencies - only requires fastapi and uvicorn
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
from datetime import datetime
import json
import uvicorn

app = FastAPI(title="IPL Team Strategist API - Simple Version")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class MatchParams(BaseModel):
    venue: str
    pitch: str
    weather: str
    toss: str
    opponent: str

# Player database
PLAYERS = {
    "batsmen": [
        {"name": "Virat Kohli", "role": "Top Order / RHB", "team": "RCB"},
        {"name": "Rohit Sharma", "role": "Top Order / RHB", "team": "MI"},
        {"name": "KL Rahul", "role": "Top Order / RHB", "team": "LSG"},
        {"name": "Shubman Gill", "role": "Top Order / RHB", "team": "GT"},
        {"name": "David Warner", "role": "Top Order / LHB", "team": "DC"},
        {"name": "Jos Buttler", "role": "Top Order / RHB", "team": "RR"},
        {"name": "Faf du Plessis", "role": "Top Order / RHB", "team": "RCB"},
        {"name": "Suryakumar Yadav", "role": "Middle Order / RHB", "team": "MI"},
    ],
    "allrounders": [
        {"name": "Hardik Pandya", "role": "All-Rounder / RMF", "team": "GT"},
        {"name": "Ravindra Jadeja", "role": "All-Rounder / LAO", "team": "CSK"},
        {"name": "Andre Russell", "role": "All-Rounder / RF", "team": "KKR"},
        {"name": "Chris Woakes", "role": "All-Rounder / RF", "team": "RCB"},
        {"name": "Shakib Al Hasan", "role": "All-Rounder / LAO", "team": "KKR"},
        {"name": "Axar Patel", "role": "All-Rounder / LAO", "team": "DC"},
        {"name": "Washington Sundar", "role": "All-Rounder / ROB", "team": "SRH"},
    ],
    "bowlers": [
        {"name": "Jasprit Bumrah", "role": "Bowler / RF", "team": "MI"},
        {"name": "Rashid Khan", "role": "Bowler / LBG", "team": "GT"},
        {"name": "Yuzvendra Chahal", "role": "Bowler / LBG", "team": "RR"},
        {"name": "Mohammed Shami", "role": "Bowler / RF", "team": "GT"},
        {"name": "Trent Boult", "role": "Bowler / LF", "team": "RR"},
        {"name": "Kagiso Rabada", "role": "Bowler / RF", "team": "PBKS"},
        {"name": "Mohammed Siraj", "role": "Bowler / RF", "team": "RCB"},
        {"name": "Arshdeep Singh", "role": "Bowler / LF", "team": "PBKS"},
    ],
    "wicketkeepers": [
        {"name": "MS Dhoni", "role": "WK / RHB", "team": "CSK"},
        {"name": "Rishabh Pant", "role": "WK / LHB", "team": "DC"},
        {"name": "Quinton de Kock", "role": "WK / LHB", "team": "KKR"},
        {"name": "Sanju Samson", "role": "WK / RHB", "team": "RR"},
        {"name": "KL Rahul", "role": "WK / RHB", "team": "LSG"},
    ]
}

def generate_team_logic(params: dict):
    """Generate team based on match conditions"""
    
    # Strategy based on conditions
    pitch_type = params.get('pitch', 'Balanced Surface')
    weather = params.get('weather', 'Sunny & Clear')
    toss = params.get('toss', 'Bat First')
    
    selected_players = []
    
    # Select wicketkeeper
    wk = random.choice(PLAYERS["wicketkeepers"])
    selected_players.append({
        **wk,
        "isCaptain": random.choice([True, False]),
        "isViceCaptain": False,
        "logic": f"Selected based on {pitch_type} conditions and recent form"
    })
    
    # Select batsmen based on pitch
    if pitch_type == "Batting Paradise":
        num_batsmen = 4
        batsman_reason = "High scoring surface, need aggressive batsmen"
    elif pitch_type == "Spin-friendly":
        num_batsmen = 3
        batsman_reason = "Need players good against spin"
    else:
        num_batsmen = 3
        batsman_reason = "Balanced approach needed"
    
    for i in range(num_batsmen):
        batsman = random.choice(PLAYERS["batsmen"])
        selected_players.append({
            **batsman,
            "isCaptain": i == 0 and not selected_players[0]["isCaptain"],
            "isViceCaptain": i == 1 and not selected_players[0]["isCaptain"],
            "logic": batsman_reason
        })
    
    # Select all-rounders
    if pitch_type == "Balanced Surface":
        num_allrounders = 3
        ar_reason = "Balance crucial on this surface"
    else:
        num_allrounders = 2
        ar_reason = "Provides flexibility for conditions"
    
    for i in range(num_allrounders):
        ar = random.choice(PLAYERS["allrounders"])
        selected_players.append({
            **ar,
            "isCaptain": False,
            "isViceCaptain": False,
            "logic": ar_reason
        })
    
    # Select bowlers
    remaining_slots = 11 - len(selected_players)
    
    if pitch_type == "Spin-friendly":
        bowler_reason = "Spinners will be key on this surface"
    elif pitch_type == "Pace-friendly":
        bowler_reason = "Pace bowlers needed for this surface"
    else:
        bowler_reason = "Balanced bowling attack required"
    
    for i in range(remaining_slots):
        bowler = random.choice(PLAYERS["bowlers"])
        selected_players.append({
            **bowler,
            "isCaptain": False,
            "isViceCaptain": False,
            "logic": bowler_reason
        })
    
    # Generate insights
    if pitch_type == "Batting Paradise":
        win_prob = random.randint(70, 85)
        strategy = "Aggressive Batting"
        strengths = ["Power-hitters in top 4", "High scoring potential", "Deep batting lineup"]
        weaknesses = ["Limited bowling options", "High chase targets"]
    elif pitch_type == "Spin-friendly":
        win_prob = random.randint(60, 75)
        strategy = "Spin-Dominant"
        strengths = ["Strong spin bowling", "Good middle overs control", "Variety in attack"]
        weaknesses = ["Lack of pace options", "Vulnerable to big hitting"]
    else:
        win_prob = random.randint(65, 80)
        strategy = "Balanced Approach"
        strengths = ["Good team balance", "All-round options", "Flexible batting order"]
        weaknesses = ["No standout strength", "Dependence on conditions"]
    
    return {
        "teamName": "Strategic Final XI",
        "winProbability": str(win_prob),
        "players": selected_players[:11],  # Ensure exactly 11 players
        "strategyInsight": f"The current XI prioritizes '{strategy}' based on {pitch_type} at {params.get('venue', 'Unknown')}. Toss decision to {toss} will be crucial.",
        "strengths": strengths,
        "weaknesses": weaknesses,
        "timestamp": datetime.now().isoformat()
    }

@app.post("/generate-team")
async def generate_team(params: MatchParams):
    """Generate team based on match parameters"""
    try:
        result = generate_team_logic(params.dict())
        return result
    except Exception as e:
        print(f"Backend Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/simulate")
async def simulate_match(data: dict):
    """Simulate match outcome"""
    team_data = data.get("teamData", {})
    params = data.get("params", {})
    
    # Generate realistic simulation
    powerplay_min = random.randint(40, 55)
    powerplay_max = powerplay_min + random.randint(10, 20)
    
    middle_min = random.randint(70, 90)
    middle_max = middle_min + random.randint(15, 25)
    
    death_min = random.randint(30, 45)
    death_max = death_min + random.randint(10, 15)
    
    total_min = powerplay_min + middle_min + death_min
    total_max = powerplay_max + middle_max + death_max
    
    simulation_result = f"""
Match Simulation Results
========================
Venue: {params.get('venue', 'Unknown')}
Pitch: {params.get('pitch', 'Unknown')}
Weather: {params.get('weather', 'Unknown')}
Toss: {params.get('toss', 'Unknown')}
Opponent: {params.get('opponent', 'Unknown')}

Projected Performance:
- Powerplay Score: {powerplay_min}-{powerplay_max} runs
- Mid Overs Score: {middle_min}-{middle_max} runs  
- Death Overs Score: {death_min}-{death_max} runs
- Total Projected: {total_min}-{total_max} runs

Win Probability: {team_data.get('winProbability', '68')}%

Key Factors:
- {params.get('pitch', 'Conditions')} will play a crucial role
- Toss decision to {params.get('toss', 'bat first')} impacts strategy
- {params.get('opponent', 'Opponent')} bowling strength considered
- {params.get('weather', 'Weather')} conditions may affect performance

AI Analysis:
{params.get('pitch', 'This surface')} favors {'aggressive batting' if params.get('pitch') == 'Batting Paradise' else 'balanced approach' if params.get('pitch') == 'Balanced Surface' else 'spin bowling'}.
The {params.get('toss', 'batting first')} team has {'advantage' if params.get('weather') == 'Dew Likely' else 'neutral conditions'}.

Simulation completed: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
    """.strip()
    
    return {"simulation": simulation_result}

@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "healthy", "backend": "simple", "timestamp": datetime.now().isoformat()}

@app.get("/history")
async def get_history():
    """Get mock history"""
    return [
        {
            "id": 1,
            "params": {"venue": "Wankhede Stadium, Mumbai", "opponent": "Chennai Super Kings", "pitch": "Batting Paradise"},
            "result": {"winProbability": "78", "teamName": "Aggressive XI"},
            "timestamp": datetime.now().isoformat()
        },
        {
            "id": 2,
            "params": {"venue": "MA Chidambaram Stadium, Chennai", "opponent": "Mumbai Indians", "pitch": "Spin-friendly"},
            "result": {"winProbability": "65", "teamName": "Spin-Dominant XI"},
            "timestamp": datetime.now().isoformat()
        }
    ]

@app.post("/feedback/{selection_id}")
async def submit_feedback(selection_id: int, score: int):
    """Submit feedback for a team selection"""
    if score < 1 or score > 5:
        raise HTTPException(status_code=400, detail="Score must be between 1 and 5")
    
    return {"message": f"Feedback {score} recorded for selection {selection_id}"}

if __name__ == "__main__":
    print("🚀 Starting Simple IPL Team Strategist Backend...")
    print("📍 Server will be available at: http://localhost:8000")
    print("📊 API Documentation: http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000)
