import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-transparent">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-xl min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-gutter grid grid-cols-1 lg:grid-cols-12 gap-xl items-center w-full">
          {/* Left Side Content */}
          <div className="z-10 lg:col-span-7 space-y-lg">
            <span className="inline-block bg-[#FFD700] text-black px-sm py-xs rounded-full font-label-bold text-label-bold shadow-xl border border-black/20 tracking-wider uppercase text-[12px]">
              NEXT-GEN STRATEGY ENGINE
            </span>
            <h1 className="hero-title leading-[1.1] tracking-tight">
              Build Your Smart <br className="hidden md:block" />
              IPL Playing XI
            </h1>
            <p className="hero-description text-xl md:text-2xl font-medium leading-relaxed opacity-95">
              AI-powered, context-aware team selection. Harness data from thousands of matches to predict player performance, ground dynamics, and opposition weaknesses.
            </p>
            <div className="flex flex-wrap gap-md pt-sm">
              <button 
                onClick={() => navigate('/generate')}
                className="bg-[#FFD700] text-black px-xl py-md rounded-lg font-label-bold flex items-center gap-xs hover:scale-105 transition-all active:scale-95 shadow-2xl"
              >
                Start Selecting Team
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              </button>
              <button className="border-2 border-white/30 text-white px-xl py-md rounded-lg font-label-bold hover:bg-white/20 transition-all active:scale-95 glass-card !bg-transparent shadow-xl">
                View Demo
              </button>
            </div>
            <div className="mt-xl flex items-center gap-md">
              <div className="flex -space-x-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-14 h-14 rounded-full border-2 border-indigo-200 bg-white/30 flex items-center justify-center backdrop-blur-sm shadow-md">
                    <span className="material-symbols-outlined text-indigo-900 text-2xl">person</span>
                  </div>
                ))}
              </div>
              <div className="text-white font-bold text-lg">
                <span className="text-[#FFD700] text-2xl">10k+</span> Strategists active
              </div>
            </div>
          </div>

          {/* Right Side Image/Graphic */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="absolute -top-12 -right-12 w-80 h-80 bg-indigo-600/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="glass-card p-md relative z-10 overflow-hidden shadow-2xl border-white/40">
              <img 
                alt="IPL Strategist Dashboard" 
                className="w-full h-auto rounded-lg opacity-100 shadow-inner" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGWDMg5dB-C3eWtRXjj05RHroPOdt3Rg2KQFKDlDToT_atWI3JHWJNjSGGWp7we2ERNsL6cUjKGEA_aXVXEmHof8-3XS3v8RRhDQ5t4uzHskwxeWVokk-HLVrxf1T2VAUrLiA5pglTQAmB158IqDFVbVMYMLWk3hQsRa4cPF0IzHiBr5SVzGHadhf7ToWsbgqb2xHIX3IUqhtOgp-zRYIKjE9YVcgXvfMXvr74tfh-M_Yo1dmHffzwYR_0Z_Vm_wjoUy7QRUyi6w"
              />
              <div className="absolute -bottom-4 -right-4 glass-card p-sm flex items-center gap-sm shadow-2xl !bg-white/90">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg">
                  <span className="material-symbols-outlined">query_stats</span>
                </div>
                <div>
                  <p className="text-[10px] font-label-bold text-indigo-900/70 uppercase tracking-wider">Win Probability</p>
                  <p className="font-stats-num text-3xl text-indigo-900">84.2%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-xl">
        <div className="max-w-7xl mx-auto px-gutter">
          <div className="mb-lg text-center">
            <h2 className="font-headline-lg text-headline-lg text-indigo-900 mb-sm">Precision Tactical Analysis</h2>
            <p className="text-indigo-800 font-medium max-w-2xl mx-auto text-lg">Leveraging sophisticated machine learning models to provide deep insights into every aspect of the game.</p>
          </div>
          <div className="bento-grid">
            {/* Feature 1 */}
            <div className="col-span-12 md:col-span-8 glass-card p-md border-indigo-200">
              <div className="flex justify-between items-start mb-md">
                <div>
                  <h3 className="font-headline-md text-headline-md text-indigo-900">Contextual Player Selection</h3>
                  <p className="text-indigo-800 mt-sm font-medium">Algorithms that analyze ground dimensions, weather patterns, and specific match-ups between bowlers and batsmen.</p>
                </div>
                <span className="material-symbols-outlined text-indigo-600 text-4xl">psychology</span>
              </div>
              <div className="bg-white/40 rounded-lg p-md border border-indigo-100 shadow-inner">
                <div className="flex items-center justify-between mb-sm border-b border-indigo-100 pb-xs">
                  <span className="font-label-bold text-indigo-900">R. Sharma vs Left-Arm Pace</span>
                  <span className="text-white bg-[#d97706] px-sm py-xs rounded text-[10px] uppercase font-bold shadow-sm">High Risk</span>
                </div>
                <div className="h-3 w-full bg-indigo-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#d97706] w-2/3 shadow-sm"></div>
                </div>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="col-span-12 md:col-span-4 glass-card p-md flex flex-col justify-between border-indigo-200">
              <div>
                <span className="material-symbols-outlined text-indigo-600 text-4xl mb-sm">stadium</span>
                <h3 className="font-headline-md text-headline-md text-indigo-900">Venue DNA</h3>
                <p className="text-indigo-800 mt-sm font-medium">Historical pitch behavior data for all 10 IPL stadiums.</p>
              </div>
              <button className="mt-md flex items-center text-indigo-600 font-label-bold gap-xs group text-lg">
                Explore Venues <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
            {/* Feature 3 */}
            <div className="col-span-12 md:col-span-4 glass-card p-md !bg-indigo-600/10 border-indigo-200">
              <div className="w-14 h-14 bg-[#FFD700] rounded-lg flex items-center justify-center mb-md shadow-lg">
                <span className="material-symbols-outlined text-black text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-indigo-900 mb-sm">Agentic Move</h3>
              <p className="text-indigo-900 font-medium mb-md">Our AI agent suggests swapping a top-order batsman for a spin-bowling all-rounder based on the dry pitch conditions in Chennai today.</p>
              <div className="p-sm bg-white/40 rounded-lg text-sm italic text-indigo-900 font-bold border border-indigo-200 shadow-sm">
                "Optimal for 2nd innings advantage"
              </div>
            </div>
            {/* Feature 4 */}
            <div className="col-span-12 md:col-span-8 glass-card p-md border-indigo-200">
              <div className="flex items-center gap-md mb-md">
                <div className="p-sm bg-indigo-50 rounded-full">
                  <span className="material-symbols-outlined text-indigo-600 text-2xl">groups</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-indigo-900">Auction Simulation</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                <div className="space-y-sm">
                  <div className="flex items-center justify-between p-sm rounded-lg bg-white/60 border border-indigo-200 shadow-sm">
                    <span className="text-sm font-bold text-indigo-900">B. Stokes</span>
                    <span className="font-stats-num text-xl text-indigo-700">₹16.25 Cr</span>
                  </div>
                  <div className="flex items-center justify-between p-sm rounded-lg bg-white/30 border border-indigo-100 opacity-80">
                    <span className="text-sm font-medium text-indigo-900">S. Curran</span>
                    <span className="font-stats-num text-xl text-indigo-600">₹18.50 Cr</span>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-base text-indigo-900 font-medium leading-relaxed">Simulate high-pressure bidding wars and optimize your remaining purse using AI valuation models.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-xl">
        <div className="max-w-7xl mx-auto px-gutter">
          <div className="glass-card overflow-hidden shadow-2xl border-indigo-200">
            <div className="p-md border-b border-indigo-100 flex justify-between items-center bg-white/20">
              <h3 className="font-headline-md text-headline-md text-indigo-900">Top Projected Performers</h3>
              <button className="text-sm font-label-bold text-indigo-600 flex items-center gap-xs hover:text-indigo-800 transition-colors">
                Full Leaderboard <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-indigo-50/50">
                    <th className="px-md py-sm font-label-bold text-indigo-900/70 text-[12px] uppercase">Player</th>
                    <th className="px-md py-sm font-label-bold text-indigo-900/70 text-[12px] uppercase">Form Index</th>
                    <th className="px-md py-sm font-label-bold text-indigo-900/70 text-[12px] uppercase">Match-up Advantage</th>
                    <th className="px-md py-sm font-label-bold text-indigo-900/70 text-[12px] uppercase">Impact Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-indigo-100 bg-white/10">
                  {[
                    { name: 'Virat Kohli', form: 9.2, tag: 'Spin Crusher', score: 88, trending: 'trending_up' },
                    { name: 'Jasprit Bumrah', form: 9.8, tag: 'Death Specialist', score: 94, trending: 'trending_up' },
                    { name: 'Rashid Khan', form: 8.9, tag: 'Middle Over Lock', score: 91, trending: 'trending_flat' }
                  ].map((player, i) => (
                    <tr key={i} className={`${i % 2 === 1 ? 'bg-indigo-50/20' : ''} hover:bg-white/30 transition-colors`}>
                      <td className="px-md py-md flex items-center gap-sm">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-xs font-bold text-indigo-700">#{i+1}</span>
                        </div>
                        <span className="font-bold text-indigo-900 text-lg">{player.name}</span>
                      </td>
                      <td className="px-md py-md text-indigo-900 font-bold">
                        <div className="flex items-center gap-xs">
                          <span className="material-symbols-outlined text-indigo-600 text-base">{player.trending}</span>
                          {player.form}
                        </div>
                      </td>
                      <td className="px-md py-md">
                        <span className="bg-indigo-600/10 text-indigo-700 border border-indigo-200 px-sm py-xs rounded-full text-[12px] font-bold shadow-sm">{player.tag}</span>
                      </td>
                      <td className="px-md py-md font-stats-num text-2xl text-indigo-900">{player.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-xl">
        <div className="max-w-7xl mx-auto px-gutter">
          <div className="glass-card p-xl flex flex-col items-center text-center relative overflow-hidden shadow-2xl border-indigo-200 !bg-white/40">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #FFD700 0%, transparent 50%)' }}></div>
            </div>
            <div className="z-10 max-w-3xl">
              <h2 className="font-display text-display text-indigo-950 mb-md text-shadow-sm">Ready to dominate the IPL?</h2>
              <p className="text-indigo-900 font-body-lg mb-lg font-bold text-xl leading-relaxed">Join thousands of strategists and start building your unbeatable XI today with our precision AI models.</p>
              <button 
                onClick={() => navigate('/generate')}
                className="bg-indigo-600 text-white px-xl py-md rounded-lg font-label-bold text-xl hover:scale-105 transition-transform active:scale-95 shadow-2xl border-2 border-white/20"
              >
                Create Your Squad Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
