# 🏏 IPL Pulse Dashboard

A high-fidelity, modern web application designed for cricket fans. **IPL Pulse** is a real-time IPL (Indian Premier League) dashboard that combines live match statistics, an interactive AI chatbot, and a competitive prediction game into a single, beautiful "glassmorphism" bento-grid layout.

## ✨ Key Features

*   **Modern UI/UX (Bento Grid Layout):** Built with a sleek matte-dark theme, vibrant amber accents, and frosted glass panels (glassmorphism) for a premium sports-app aesthetic.
*   **Fully Responsive:** The 3-column dashboard flawlessly collapses into vertical stacks, ensuring a perfect viewing experience on mobile devices and tablets.
*   **Live Match State Engine:** Displays dynamic data including the current score, run rate, active striker/non-striker statistics, and current bowler metrics.
*   **AI Chatbot (Gemini Integration):** An integrated live chat assistant powered by Google's **Gemini AI**. It answers IPL trivia, surfaces mock live match updates, and dynamically creates custom data cards within the chat interface.
*   **Prediction Game:** Features a live betting/prediction module connected to **Firebase Authentication**. Users can sign up, log in, predict next-over runs or wicket methods, and track their leaderboard points.
*   **Reliable Asset Management:** Utilizes locally hosted, high-quality SVG vector graphics to ensure team logos load instantly without CORS or ad-blocker interference.

## 🛠️ Technology Stack

*   **Frontend Framework:** React 18, Vite
*   **Styling:** Vanilla CSS (CSS Grid, Flexbox, Glassmorphism techniques)
*   **Backend / Auth:** Firebase Authentication
*   **AI Integration:** `@google/generative-ai` (Gemini API)
*   **Icons:** Lucide React

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YourUsername/ipl-pulse-dashboard.git
   cd ipl-pulse-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root of your project and add your API keys:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *(Ensure you also configure your Firebase SDK settings inside `src/firebase.js`)*

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **View the app:**
   Open your browser and navigate to `http://localhost:5173/`

## 📁 Project Structure

*   `/public` - Contains static assets and locally hosted SVG team logos.
*   `/src/components/Dashboard.jsx` - The main architectural grid, assembling all dashboard modules.
*   `/src/components/Chatbot.jsx` - Contains the logic for the Gemini AI interactions and local chat caching.
*   `/src/components/PredictionGame.jsx` - Handles Firebase authentication and the user prediction point system.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License
This project is open source and available under the MIT License.

*** 

Now you can just follow the Git steps I gave you above, and you will have an incredibly impressive GitHub repository to show off!