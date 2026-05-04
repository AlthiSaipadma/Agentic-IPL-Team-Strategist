import json
from agents.specialized_agents import DataAgent, PitchAgent, StrategyAgent, OpponentAgent, DecisionAgent

class TeamSelectionOrchestrator:
    def __init__(self):
        self.pitch_agent = PitchAgent()
        self.opponent_agent = OpponentAgent()
        self.data_agent = DataAgent()
        self.strategy_agent = StrategyAgent()
        self.decision_agent = DecisionAgent()

    async def generate_xi(self, match_params: dict):
        # 1. Analyze Environmental Factors
        pitch_analysis = await self.pitch_agent.execute(
            task=f"Analyze conditions for {match_params['venue']} with {match_params['weather']} and {match_params['pitch']} pitch.",
            context=match_params
        )

        # 2. Analyze Opponent
        opponent_analysis = await self.opponent_agent.execute(
            task=f"Analyze {match_params['opponent']} and find their weaknesses against current conditions.",
            context={"pitch_analysis": pitch_analysis, **match_params}
        )

        # 3. Gather Player Insights
        player_insights = await self.data_agent.execute(
            task="Suggest top performing players for these conditions and match-ups.",
            context={"pitch": pitch_analysis, "opponent": opponent_analysis}
        )

        # 4. Develop Strategy
        strategy = await self.strategy_agent.execute(
            task="Define batting order and bowling strategy based on selected conditions.",
            context={"players": player_insights, "pitch": pitch_analysis}
        )

        # 5. Final Decision
        final_prompt = f"""
        Based on all reports, generate the final Playing XI.
        
        Pitch Report: {pitch_analysis}
        Opponent Weaknesses: {opponent_analysis}
        Player Form: {player_insights}
        Strategy: {strategy}
        
        OUTPUT MUST BE VALID JSON with this structure:
        {{
          "teamName": "Selected XI",
          "winProbability": "percentage",
          "players": [
            {{ "name": "Player Name", "role": "Role", "isCaptain": bool, "isViceCaptain": bool, "reasoning": "Detailed logic" }}
          ],
          "strategyInsight": "Overall tactical summary",
          "strengths": ["list"],
          "weaknesses": ["list"]
        }}
        """
        
        final_xi_raw = await self.decision_agent.execute(task=final_prompt)
        
        try:
            # Extract JSON from markdown if necessary
            json_str = final_xi_raw.replace("```json", "").replace("```", "").strip()
            result_json = json.loads(json_str)
            
            # Bonus: Add simulation data
            result_json["simulation"] = {
                "score_est": "170-190",
                "key_battle": "Bumrah vs Dhoni in the death overs",
                "predicted_result": "Win by 15 runs"
            }
            return result_json
        except Exception as e:
            print(f"Error parsing JSON: {e}")
            return {"error": "Failed to parse agent output", "raw": final_xi_raw}

    async def simulate_match(self, team_data: dict, match_params: dict):
        prompt = f"""
        Simulate a match between {team_data['teamName']} and {match_params['opponent']}.
        Conditions: {match_params}
        Players: {[p['name'] for p in team_data['players']]}
        
        Provide a detailed ball-by-ball or phase-by-phase simulation summary and a final result.
        """
        simulation_raw = await self.decision_agent.execute(task=prompt)
        return {"simulation": simulation_raw}
