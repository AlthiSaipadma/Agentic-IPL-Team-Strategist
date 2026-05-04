import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import GenerateTeam from './pages/GenerateTeam';
import Results from './pages/Results';
import History from './pages/History';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<GenerateTeam />} />
        <Route path="/results" element={<Results />} />
        <Route path="/history" element={<History />} />
        <Route path="/about" element={<div className="p-xl text-center">About Page coming soon!</div>} />
      </Routes>
    </Layout>
  );
}

export default App;
