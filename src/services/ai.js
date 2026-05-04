// Mock data for testing when backend is unavailable
const getMockTeamData = (params) => {
  const mockPlayers = [
    { name: "Virat Kohli", role: "Top Order / RHB", isCaptain: true, isViceCaptain: false, logic: `Strong record at ${params.venue} against ${params.opponent}. High success rate in powerplay.` },
    { name: "Rohit Sharma", role: "Top Order / RHB", isCaptain: false, isViceCaptain: true, logic: `Experienced captain, excellent on ${params.pitch} surfaces` },
    { name: "KL Rahul", role: "WK / RHB", isCaptain: false, isViceCaptain: false, logic: `Provides stability behind stumps, good against ${params.weather} conditions` },
    { name: "Suryakumar Yadav", role: "Middle Order / RHB", isCaptain: false, isViceCaptain: false, logic: `360-degree batting, perfect for ${params.pitch} conditions` },
    { name: "Hardik Pandya", role: "All-Rounder / RMF", isCaptain: false, isViceCaptain: false, logic: `Crucial finisher and provides 4 overs of pace bowling` },
    { name: "Ravindra Jadeja", role: "All-Rounder / LAO", isCaptain: false, isViceCaptain: false, logic: `Spin-friendly conditions make Jadeja a key asset` },
    { name: "Axar Patel", role: "All-Rounder / LAO", isCaptain: false, isViceCaptain: false, logic: `Left-arm variety, contributes with both bat and ball` },
    { name: "Jasprit Bumrah", role: "Bowler / RF", isCaptain: false, isViceCaptain: false, logic: `Death over specialist, economy rate below 7.5 at this venue` },
    { name: "Mohammed Shami", role: "Bowler / RF", isCaptain: false, isViceCaptain: false, logic: `New ball specialist, gets early wickets on ${params.pitch}` },
    { name: "Yuzvendra Chahal", role: "Bowler / LBG", isCaptain: false, isViceCaptain: false, logic: `Middle overs control, effective in ${params.weather} conditions` },
    { name: "Arshdeep Singh", role: "Bowler / LF", isCaptain: false, isViceCaptain: false, logic: `Powerplay specialist, swings the ball early` }
  ];

  return {
    teamName: "Strategic Final XI",
    winProbability: params.pitch === "Batting Paradise" ? "78" : params.pitch === "Spin-friendly" ? "65" : "72",
    players: mockPlayers,
    strategyInsight: `The current XI prioritizes '${params.pitch === "Batting Paradise" ? "Aggressive Batting" : "Balanced Approach"}' based on ${params.pitch} at ${params.venue}. Toss decision to ${params.toss} will be crucial.`,
    strengths: [
      params.pitch === "Batting Paradise" ? "Power-hitters in top 4" : "Strong spin bowling options",
      "Elite death bowling duo",
      "Experienced leadership",
      "Good all-round balance"
    ],
    weaknesses: [
      params.pitch === "Spin-friendly" ? "Lack of specialist fast bowlers" : "Limited overseas options",
      "High reliance on top order",
      "Middle order vulnerability"
    ],
    timestamp: new Date().toISOString()
  };
};

export const generateTeamLogic = async (params) => {
  try {
    const response = await fetch("http://localhost:8000/generate-team", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to generate team");
    }

    return await response.json();
  } catch (error) {
    console.error("Backend unavailable, using mock data:", error);
    // Fallback to mock data when backend is not available
    return getMockTeamData(params);
  }
};
