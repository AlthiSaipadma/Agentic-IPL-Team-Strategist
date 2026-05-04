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
    console.error("Error calling backend:", error);
    throw error;
  }
};
