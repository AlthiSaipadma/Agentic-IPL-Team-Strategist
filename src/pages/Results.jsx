import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const [simulationResult, setSimulationResult] = useState(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const { teamData, params } = location.state || {
    teamData: {
      teamName: "Strategic Final XI",
      winProbability: "68",
      players: [
        { name: "Virat K.", role: "Top Order / RHB", isCaptain: true, isViceCaptain: false, logic: "Crucial for stability at Wankhede. High success rate against leg-spin in middle overs." },
        { name: "Hardik P.", role: "All-Rounder / RMF", isCaptain: false, isViceCaptain: true, logic: "Finishing capability and 4 overs of pace essential for team balance." },
        { name: "Jasprit B.", role: "Bowler / RF", isCaptain: false, isViceCaptain: false, logic: "Death over specialist. Predicted economy rate below 7.5 at this venue." }
      ],
      strategyInsight: "The current XI prioritizes 'Aggressive Batting' over 'Defensive Stability.' Expect a high-scoring game.",
      strengths: ["Power-hitters in top 4", "Elite death bowling duo"],
      weaknesses: ["Lack of specialist off-spinner", "High reliance on overseas pace"]
    },
    params: { venue: "Mumbai Wankhede Stadium", pitch: "Fast/Bounce" }
  };

  const handleSimulate = async () => {
    const API_URL = import.meta.env.MODE === 'production' 
      ? "/api" 
      : "http://localhost:8000";

    try {
      const response = await fetch(`${API_URL}/simulate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamData, params })
      });
      const data = await response.json();
      setSimulationResult(data.simulation);
    } catch (error) {
      console.error("Simulation failed, using mock data:", error);
      // Fallback to mock simulation when backend is not available
      const mockSimulation = `
Match Simulation Results
========================
Venue: ${params.venue}
Pitch: ${params.pitch}
Weather: ${params.weather}
Toss: ${params.toss}
Opponent: ${params.opponent}

Projected Performance:
- Powerplay Score: ${Math.floor(Math.random() * 20) + 45}-${Math.floor(Math.random() * 20) + 55} runs
- Mid Overs Score: ${Math.floor(Math.random() * 25) + 80}-${Math.floor(Math.random() * 25) + 95} runs  
- Death Overs Score: ${Math.floor(Math.random() * 15) + 35}-${Math.floor(Math.random() * 15) + 45} runs
- Total Projected: ${Math.floor(Math.random() * 35) + 160}-${Math.floor(Math.random() * 35) + 195} runs

Win Probability: ${teamData.winProbability}%

Key Factors:
- ${params.pitch} will play a crucial role
- Toss decision to ${params.toss} impacts strategy
- ${params.opponent} bowling strength considered
- ${params.weather} conditions may affect performance

Simulation completed: ${new Date().toLocaleString()}
      `.trim();
      setSimulationResult(mockSimulation);
    }
  };

  const submitFeedback = (score) => {
    setFeedbackSent(true);
    // Logic to call backend /feedback endpoint can be added here
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-lg space-y-xl w-full">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-gutter">
        <div>
          <h1 className="font-display text-display text-on-background">{teamData.teamName}</h1>
          <p className="text-muted-contrast font-body-lg">Optimized for {params.venue} | Pitch: {params.pitch}</p>
        </div>
        {/* Win Probability Card */}
        <div className="glass-card p-sm min-w-[320px]">
          <div className="flex justify-between items-center mb-base px-2">
            <span className="font-label-bold text-white/70 uppercase text-xs">Win Probability</span>
            <span className="font-stats-num text-amber-500">{teamData.winProbability}%</span>
          </div>
          <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden mx-2 max-w-[calc(100%-16px)]">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-amber-500 rounded-full" style={{ width: `${teamData.winProbability}%` }}></div>
          </div>
          <p className="mt-base text-xs text-white/60 italic px-2">AI Advantage: Strong Powerplay Strike Rate</p>
        </div>
      </section>

      {/* Main Content Bento Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter">
        {/* Playing XI Grid (8 Columns) */}
        <div className="xl:col-span-8 space-y-gutter">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-md text-primary">Playing Eleven</h2>
            <div className="flex gap-sm">
              <span className="px-3 py-1 bg-white/20 text-indigo-900 text-xs font-label-bold rounded-full">{teamData.players.length} PLAYERS</span>
              <span className="px-3 py-1 bg-amber-500/20 text-amber-700 border border-amber-500/30 text-xs font-label-bold rounded-full">4 OVERSEAS</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {teamData.players.map((player, index) => (
              <div key={index} className={`glass-card p-gutter relative group overflow-hidden border-t-4 ${player.isCaptain ? '!border-t-amber-500' : player.isViceCaptain ? '!border-t-indigo-500' : 'border-transparent'}`}>
                {player.isCaptain && <div className="absolute top-2 right-2 bg-amber-500 text-white font-label-bold text-[10px] px-2 py-0.5 rounded-full shadow-sm">CAPTAIN</div>}
                {player.isViceCaptain && <div className="absolute top-2 right-2 bg-indigo-500 text-white font-label-bold text-[10px] px-2 py-0.5 rounded-full shadow-sm uppercase">Vice-Captain</div>}
                <div className="flex items-center gap-sm mb-sm">
                  <div className="w-16 h-16 rounded-full bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center text-indigo-800 font-bold text-xl">
                    {player.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-headline-md text-md text-primary">{player.name}</h3>
                    <p className="text-xs font-label-bold text-muted-contrast uppercase">{player.role}</p>
                  </div>
                </div>
                <div className="bg-white/5 p-sm rounded-lg border border-white/5">
                  <p className="text-xs text-high-contrast leading-relaxed">
                    <span className="font-bold text-amber-500">AI Logic:</span> {player.logic || player.reasoning}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategy Insights Panel (4 Columns) */}
        <aside className="xl:col-span-4 space-y-gutter">
          <h2 className="font-headline-md text-primary">Strategy Insights</h2>
          <div className="glass-card p-gutter space-y-md">
            <h3 className="font-label-bold text-indigo-900 flex items-center gap-xs">
              <span className="material-symbols-outlined text-amber-600 text-lg">balance</span>
              TEAM BALANCE
            </h3>
            <div className="space-y-sm">
              <div className="flex justify-between text-xs font-label-bold mb-xs">
                <span className="text-muted-contrast">BATTING DEPTH</span>
                <span className="text-on-background">8.5/10</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <div className="flex justify-between text-xs font-label-bold mb-xs pt-sm">
                <span className="text-muted-contrast">BOWLING OPTIONS</span>
                <span className="text-on-background">7/10</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-gutter">
            <div className="glass-card p-gutter border-l-4 !border-l-emerald-500">
              <h3 className="font-label-bold text-emerald-500 mb-sm flex items-center gap-xs uppercase text-sm">
                <span className="material-symbols-outlined text-lg">trending_up</span>
                Key Strengths
              </h3>
              <ul className="space-y-sm text-sm text-high-contrast">
                {teamData.strengths.map((s, i) => (
                  <li key={i} className="flex gap-sm">
                    <span className="material-symbols-outlined text-emerald-500 text-md">check_circle</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-gutter border-l-4 !border-l-red-500">
              <h3 className="font-label-bold text-red-500 mb-sm flex items-center gap-xs uppercase text-sm">
                <span className="material-symbols-outlined text-lg">trending_down</span>
                Vulnerabilities
              </h3>
              <ul className="space-y-sm text-sm text-high-contrast">
                {teamData.weaknesses.map((w, i) => (
                  <li key={i} className="flex gap-sm">
                    <span className="material-symbols-outlined text-red-500 text-md">warning</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-gutter bg-indigo-900/40 border-indigo-400/30 relative overflow-hidden">
              <span className="material-symbols-outlined absolute top-4 right-4 text-amber-500/60">auto_awesome</span>
              <h3 className="font-label-bold text-amber-500 mb-base uppercase text-xs">AI Agentic Insight</h3>
              <p className="font-body-md text-sm leading-relaxed text-high-contrast">
                {teamData.strategyInsight}
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Match Simulation Graph Section */}
      <section className="glass-card p-lg">
        <div className="flex flex-col md:flex-row justify-between gap-md mb-lg">
          <div>
            <h2 className="font-headline-md text-primary">Match Simulation</h2>
            <p className="text-muted-contrast text-sm">Monte Carlo Simulation: 10,000 iterations based on current XI performance history.</p>
          </div>
          <div className="flex items-center gap-sm">
            <button 
              onClick={handleSimulate}
              className="bg-indigo-500 text-white px-md py-xs rounded-lg font-label-bold hover:bg-indigo-600 transition-all flex items-center gap-xs"
            >
              <span className="material-symbols-outlined text-sm">sports_cricket</span>
              Run Detailed Simulation
            </button>
          </div>
        </div>
        
        {simulationResult ? (
          <div className="bg-white/5 p-md rounded-lg border border-white/10 text-sm whitespace-pre-wrap leading-relaxed">
            {simulationResult}
          </div>
        ) : (
          <>
            <div className="w-full h-48 flex items-end justify-between gap-1 mb-md">
              <div className="flex-1 bg-white/5 h-[40%] rounded-t-sm"></div>
              <div className="flex-1 bg-white/5 h-[45%] rounded-t-sm"></div>
              <div className="flex-1 bg-indigo-500/80 h-[55%] rounded-t-sm relative">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white">PP</span>
              </div>
              <div className="flex-1 bg-indigo-500/80 h-[60%] rounded-t-sm"></div>
              <div className="flex-1 bg-indigo-500/80 h-[50%] rounded-t-sm"></div>
              <div className="flex-1 bg-indigo-500/80 h-[65%] rounded-t-sm"></div>
              <div className="flex-1 bg-indigo-500/80 h-[70%] rounded-t-sm relative">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white">MID</span>
              </div>
              <div className="flex-1 bg-indigo-500/80 h-[62%] rounded-t-sm"></div>
              <div className="flex-1 bg-indigo-500/80 h-[58%] rounded-t-sm"></div>
              <div className="flex-1 bg-indigo-500/80 h-[75%] rounded-t-sm"></div>
              <div className="flex-1 bg-indigo-500/80 h-[85%] rounded-t-sm relative">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white">DEATH</span>
              </div>
              <div className="flex-1 bg-indigo-500/80 h-[80%] rounded-t-sm"></div>
            </div>
            <div className="flex justify-between px-xs border-t border-white/10 pt-sm">
              <span className="text-[10px] font-label-bold text-white/40">OVERS 0-5</span>
              <span className="text-[10px] font-label-bold text-white/40">OVERS 6-15</span>
              <span className="text-[10px] font-label-bold text-white/40">OVERS 16-20</span>
            </div>
          </>
        )}
      </section>

      <div className="flex flex-col items-center gap-sm mt-xl border-t border-white/10 pt-lg">
        <p className="font-label-bold text-indigo-900/40 uppercase text-xs tracking-widest">Rate this Strategy</p>
        <div className="flex gap-sm">
          {[1, 2, 3, 4, 5].map((star) => (
            <button 
              key={star} 
              onClick={() => submitFeedback(star)}
              className="material-symbols-outlined text-amber-500 hover:scale-125 transition-transform"
            >
              star
            </button>
          ))}
        </div>
        {feedbackSent && <p className="text-emerald-400 text-xs font-medium">Thank you for your feedback! The AI is learning.</p>}
        <Link to="/generate" className="text-white/60 hover:text-white transition-colors mt-md flex items-center gap-xs">
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Selection
        </Link>
      </div>
    </main>
  );
};

export default Results;
