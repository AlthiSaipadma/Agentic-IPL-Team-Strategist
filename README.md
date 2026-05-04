# 🏏 Agentic IPL Team Strategist

A production-grade, AI-driven platform for optimizing IPL team selection and match strategy. **Agentic IPL Team Strategist** leverages a multi-agent orchestration pipeline (powered by Gemini 2.0 Flash) to analyze thousands of data points and generate winning playing XIs based on real-time ground dynamics.

## ✨ Key Features

*   **Agentic Orchestration:** A sophisticated multi-agent pipeline (Data, Pitch, Strategy, Opponent, Decision) that works autonomously to synthesize a coherent tactical plan.
*   **Premium Glassmorphism UI:** A stunning, theme-aware interface featuring an inverted blue-to-white gradient and high-end **Outfit/Inter** typography.
*   **Context-Aware Selection:** Analyzes ground dimensions, pitch DNA (10+ IPL stadiums), weather patterns, and specific player match-ups.
*   **Match Simulation Engine:** Monte Carlo simulation providing projected powerplay, middle, and death-over performance scores.
*   **Production Ready:** Fully integrated FastAPI backend with SQLite persistence and a high-performance React frontend.

## 🛠️ Technology Stack

*   **Frontend:** React 19, Vite, Tailwind CSS (with custom design tokens)
*   **Backend:** FastAPI, Python 3.10+
*   **AI Engine:** Google Gemini 2.0 Flash (via Google ADK Shim)
*   **Persistence:** SQLite
*   **Styling:** Premium Typography (Outfit & Inter), Glassmorphism, HSL-tailored Color Palettes

## 🚀 Getting Started

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AlthiSaipadma/Agentic-IPL-Team-Strategist.git
   cd Agentic-IPL-Team-Strategist
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

3. **Frontend Setup:**
   ```bash
   npm install
   npm run dev
   ```

4. **Environment Variables:**
   Create a `.env` file in the root:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

## 🌐 Deployment (Vercel)

The project is configured for seamless deployment on **Vercel** using the included `vercel.json`.

1. **Set Environment Variables:** Ensure `GEMINI_API_KEY` is set in your Vercel Dashboard.
2. **Custom Domain:** Connect your domain in **Settings > Domains** on Vercel.

## 📝 License
This project is open source and available under the MIT License.