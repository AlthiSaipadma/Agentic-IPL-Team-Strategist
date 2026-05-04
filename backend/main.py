from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from orchestrator import TeamSelectionOrchestrator
import db
import uvicorn
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    db.init_db()
    yield

app = FastAPI(title="Agentic IPL Team Strategist API", lifespan=lifespan)

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

orchestrator = TeamSelectionOrchestrator()

@app.post("/generate-team")
async def generate_team(params: MatchParams):
    try:
        result = await orchestrator.generate_xi(params.dict())
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        
        # Save to DB for learning
        db.save_selection(params.dict(), result)
        
        return result
    except Exception as e:
        print(f"Backend Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/history")
async def get_history():
    return db.get_history()

@app.post("/feedback/{selection_id}")
async def submit_feedback(selection_id: int, score: int):
    db.update_feedback(selection_id, score)
    return {"message": "Feedback updated"}

@app.post("/simulate")
async def simulate(data: dict):
    # data expects {team_data: {...}, params: {...}}
    return await orchestrator.simulate_match(data["teamData"], data["params"])

@app.get("/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
