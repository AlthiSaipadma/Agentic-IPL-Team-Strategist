import os
import httpx
import json
from typing import List, Dict, Any
from dotenv import load_dotenv

load_dotenv()

class GoogleADKAgent:
    def __init__(self, name: str, role: str, goal: str):
        self.name = name
        self.role = role
        self.goal = goal
        self.api_key = os.getenv("VITE_GEMINI_API_KEY") or os.getenv("GEMINI_API_KEY")
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY not found in environment")
        
        self.endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={self.api_key}"
        print(f"Agent {self.name} initialized with endpoint: {self.endpoint[:50]}...")

    async def execute(self, task: str, context: Dict[str, Any] = None) -> str:
        prompt = f"""
        Agent Name: {self.name}
        Role: {self.role}
        Goal: {self.goal}
        
        Context: {context}
        
        Task: {task}
        
        Provide your analysis or decision based on your specific role.
        """
        
        payload = {
            "contents": [{
                "parts": [{"text": prompt}]
            }]
        }
        
        max_retries = 3
        for attempt in range(max_retries):
            try:
                async with httpx.AsyncClient() as client:
                    response = await client.post(self.endpoint, json=payload, timeout=60.0)
                    if response.status_code != 200:
                        raise Exception(f"Gemini API Error: {response.text}")
                    
                    data = response.json()
                    return data['candidates'][0]['content']['parts'][0]['text']
            except Exception as e:
                if attempt == max_retries - 1:
                    raise e
                print(f"Attempt {attempt + 1} failed for agent {self.name}: {e}. Retrying...")

class Workflow:
    def __init__(self, name: str):
        self.name = name
        self.agents = []

    def add_agent(self, agent: GoogleADKAgent):
        self.agents.append(agent)
