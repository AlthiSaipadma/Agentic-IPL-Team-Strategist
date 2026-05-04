from adk_shim import GoogleADKAgent

class DataAgent(GoogleADKAgent):
    def __init__(self):
        super().__init__(
            name="Data Agent",
            role="Statistical Analyst",
            goal="Analyze recent player form, strike rates, and economy rates for IPL players."
        )

class PitchAgent(GoogleADKAgent):
    def __init__(self):
        super().__init__(
            name="Pitch & Weather Agent",
            role="Environmental Specialist",
            goal="Analyze stadium history, pitch behavior (spin vs pace), and weather impact on the game."
        )

class StrategyAgent(GoogleADKAgent):
    def __init__(self):
        super().__init__(
            name="Strategy Agent",
            role="Tactical Planner",
            goal="Determine optimal batting order, bowling rotations, and identify captaincy candidates."
        )

class OpponentAgent(GoogleADKAgent):
    def __init__(self):
        super().__init__(
            name="Opponent Analysis Agent",
            role="Scouting Specialist",
            goal="Identify weaknesses in the opponent team's lineup and suggest counter-strategies."
        )

class DecisionAgent(GoogleADKAgent):
    def __init__(self):
        super().__init__(
            name="Decision Agent",
            role="Master Orchestrator",
            goal="Combine insights from all agents to select the final Playing XI and provide reasoning."
        )
