#!/usr/bin/env python3
"""
Mock Backend Server for Testing
This provides mock responses when the full backend isn't available
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import json
import random
from datetime import datetime

app = FastAPI(title="Mock IPL Team Strategist API")

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

# Mock player database
MOCK_PLAYERS = {
    "batsmen": [
        {"name": "Virat Kohli", "role": "Top Order / RHB", "team": "RCB"},
        {"name": "Rohit Sharma", "role": "Top Order / RHB", "team": "MI"},
        {"name": "KL Rahul", "role": "Top Order / RHB", "team": "LSG"},
        {"name": "Shubman Gill", "role": "Top Order / RHB", "team": "GT"},
        {"name": "David Warner", "role": "Top Order / LHB", "team": "DC"},
        {"name": "Jos Buttler", "role": "Top Order / RHB", "team": "RR"},
        {"name": "Faf du Plessis", "role": "Top Order / RHB", "team": "RCB"},
    ],
    "allrounders": [
        {"name": "Hardik Pandya", "role": "All-Rounder / RMF", "team": "GT"},
        {"name": "Ravindra Jadeja", "role": "All-Rounder / LAO", "team": "CSK"},
        {"name": "Andre Russell", "role": "All-Rounder / RF", "team": "KKR"},
        {"name": "Chris Woakes", "role": "All-Rounder / RF", "team": "RCB"},
        {"name": "Shakib Al Hasan", "role": "All-Rounder / LAO", "team": "KKR"},
    ],
    "bowlers": [
        {"name": "Jasprit Bumrah", "role": "Bowler / RF", "team": "MI"},
        {"name": "Rashid Khan", "role": "Bowler / LBG", "team": "GT"},
        {"name": "Yuzvendra Chahal", "role": "Bowler / LBG", "team": "RR"},
        {"name": "Mohammed Shami", "role": "Bowler / RF", "team": "GT"},
        {"name": "Trent Boult", "role": "Bowler / LF", "team": "RR"},
        {"name": "Kagiso Rabada", "role": "Bowler / RF", "team": "PBKS"},
    ],
    "wicketkeepers": [
        {"name": "MS Dhoni", "role": "WK / RHB", "team": "CSK"},
        {"name": "Rishabh Pant", "role": "WK / LHB", "team": "DC"},
        {"name": "Quinton de Kock", "role": "WK / LHB", "team": "KKR"},
        {"name": "Sanju Samson", "role": "WK / RHB", "team": "RR"},
    ]
}

def generate_mock_team(params: dict):
    """Generate a mock team based on match conditions"""
    
    # Select players based on conditions
    selected_players = []
    
    # Always include a wicketkeeper
    wk = random.choice(MOCK_PLAYERS["wicketkeepers"])
    selected_players.append({
        **wk,
        "isCaptain": random.choice([True, False]),
        "isViceCaptain": False,
        "logic": f"Selected based on {params.pitch} conditions and recent form"
    })
    
    # Select 3-4 top order batsmen
    num_batsmen = 4 if params.pitch == "Batting Paradise" else 3
    for i in range(num_batsmen):
        batsman = random.choice(MOCK_PLAYERS["batsmen"])
        selected_players.append({
            **batsman,
            "isCaptain": i == 0 and not selected_players[0]["isCaptain"],
            "isViceCaptain": i == 1 and not selected_players[0]["isCaptain"],
            "logic": f"Strong record at {params.venue} against {params.opponent}"
        })
    
    # Select 2-3 all-rounders
    num_allrounders = 3 if params.pitch == "Balanced Surface" else 2
    for i in range(num_allrounders):
        ar = random.choice(MOCK_PLAYERS["allrounders"])
        selected_players.append({
            **ar,
            "isCaptain": False,
            "isViceCaptain": False,
            "logic": f"Provides balance for {params.weather} conditions"
        })
    
    # Select remaining bowlers
    remaining_slots = 11 - len(selected_players)
    for i in range(remaining_slots):
        bowler = random.choice(MOCK_PLAYERS["bowlers"])
        selected_players.append({
            **bowler,
            "isCaptain": False,
            "isViceCaptain": False,
            "logic": f"Key for {params.pitch} conditions at {params.venue}"
        })
    
    # Ensure we have exactly 11 players
    selected_players = selected_players[:11]
    
    # Generate team insights
    win_prob = random.randint(55, 85)
    
    strengths = [
        "Strong top order batting lineup",
        "Quality bowling options for death overs",
        "Good all-round balance",
        "Experienced captaincy options"
    ]
    
    weaknesses = [
        "Limited overseas player options",
        "Dependence on top order",
        "Lack of specialist spinner",
        "Weak middle order"
    ]
    
    return {
        "teamName": "Strategic Final XI",
        "winProbability": str(win_prob),
        "players": selected_players,
        "strategyInsight": f"The current XI prioritizes '{'Aggressive Batting' if params.pitch == 'Batting Paradise' else 'Balanced Approach'}' based on {params.pitch} at {params.venue}.",
        "strengths": random.sample(strengths, 2),
        "weaknesses": random.sample(weaknesses, 2),
        "timestamp": datetime.now().isoformat()
    }

@app.post("/generate-team")
async def generate_team(params: MatchParams):
    """Generate team based on match parameters"""
    try:
        result = generate_mock_team(params.dict())
        return result
    except Exception as e:
        print(f"Mock Backend Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/simulate")
async def simulate_match(data: dict):
    """Simulate match outcome"""
    team_data = data.get("teamData", {})
    params = data.get("params", {})
    
    simulation_result = f"""
Match Simulation Results
========================
Venue: {params.get('venue', 'Unknown')}
Pitch: {params.get('pitch', 'Unknown')}
Weather: {params.get('weather', 'Unknown')}

Projected Performance:
- Powerplay Score: 45-55 runs
- Mid Overs Score: 80-95 runs  
- Death Overs Score: 35-45 runs
- Total Projected: 160-195 runs

Win Probability: {team_data.get('winProbability', '68')}%

Key Factors:
- {params.get('pitch', 'Conditions')} will play a crucial role
- Toss decision to {params.get('toss', 'bat first')} impacts strategy
- {params.get('opponent', 'Opponent')} bowling strength considered

Simulation completed: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
    """
    
    return {"simulation": simulation_result.strip()}

@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "healthy", "backend": "mock"}

@app.get("/history")
async def get_history():
    """Get mock history"""
    return [
        {
            "id": 1,
            "params": {"venue": "Wankhede Stadium", "opponent": "CSK"},
            "result": {"winProbability": "72"},
            "timestamp": datetime.now().isoformat()
        }
    ]

if __name__ == "__main__":
    print("Starting Mock Backend Server...")
    print("This server provides mock responses for testing the frontend")
    uvicorn.run(app, host="0.0.0.0", port=8000)
