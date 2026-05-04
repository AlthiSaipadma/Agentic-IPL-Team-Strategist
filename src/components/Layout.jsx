import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      {/* TopAppBar */}
      <header className="sticky top-0 z-50 bg-white/5 backdrop-blur-md border-b border-white/10 shadow-sm">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-16">
          <div className="font-['Lexend'] font-black text-2xl italic text-white tracking-tighter whitespace-nowrap drop-shadow-sm">
            IPL Strategist AI
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              className={`font-['Lexend'] font-medium text-sm tracking-tight transition-all active:scale-95 ${isActive('/') ? 'text-white border-b-2 border-amber-500 pb-1' : 'text-white/80 hover:text-white'}`} 
              to="/"
            >
              Home
            </Link>
            <Link 
              className={`font-['Lexend'] font-medium text-sm tracking-tight transition-all active:scale-95 ${isActive('/generate') ? 'text-indigo-900 border-b-2 border-amber-500 pb-1' : 'text-indigo-700 hover:text-indigo-900'}`} 
              to="/generate"
            >
              Generate Team
            </Link>
            <Link 
              className={`font-['Lexend'] font-medium text-sm tracking-tight transition-all active:scale-95 ${isActive('/history') ? 'text-indigo-900 border-b-2 border-amber-500 pb-1' : 'text-indigo-700 hover:text-indigo-900'}`} 
              to="/history"
            >
              History
            </Link>
            <Link 
              className={`font-['Lexend'] font-medium text-sm tracking-tight transition-all active:scale-95 ${isActive('/about') ? 'text-indigo-900 border-b-2 border-amber-500 pb-1' : 'text-indigo-700 hover:text-indigo-900'}`} 
              to="/about"
            >
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-indigo-800 hover:text-amber-500 transition-colors">
              <span className="material-symbols-outlined">account_circle</span>
            </button>
            <button className="text-indigo-800 hover:text-amber-500 transition-colors">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="glass-card rounded-none border-b-0 border-x-0 py-12 px-6 mt-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="font-['Lexend'] font-bold text-lg text-indigo-900">
              IPL Strategist AI
            </div>
            <div className="font-['Lexend'] text-xs font-light text-indigo-700">
              © 2024 IPL Strategist AI. Precision in every play.
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="font-['Lexend'] text-xs font-light text-indigo-700 hover:text-indigo-900 transition-colors" href="#">Privacy Policy</a>
            <a className="font-['Lexend'] text-xs font-light text-indigo-700 hover:text-indigo-900 transition-colors" href="#">Terms of Service</a>
            <a className="font-['Lexend'] text-xs font-light text-indigo-700 hover:text-indigo-900 transition-colors" href="#">Support</a>
            <a className="font-['Lexend'] text-xs font-light text-indigo-700 hover:text-indigo-900 transition-colors" href="#">API Docs</a>
          </div>
          <div className="flex space-x-4">
            <span className="material-symbols-outlined text-indigo-700 cursor-pointer hover:text-indigo-900 transition-colors">share</span>
            <span className="material-symbols-outlined text-indigo-700 cursor-pointer hover:text-indigo-900 transition-colors">alternate_email</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
