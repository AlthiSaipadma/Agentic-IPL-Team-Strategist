import React from 'react';

const History = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-lg">
      {/* Header Section */}
      <section className="mb-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-indigo-900 mb-xs">Strategy Vault</h1>
            <p className="font-body-lg text-body-lg text-indigo-700">Review and refine your championship-winning rosters from previous simulations.</p>
          </div>
          <div className="flex gap-sm">
            <button className="flex items-center gap-xs glass-card px-md py-sm font-label-bold text-label-bold text-indigo-900 hover:bg-white/20 transition-colors">
              <span className="material-symbols-outlined text-[20px]">filter_list</span>
              Filter
            </button>
            <button className="flex items-center gap-xs bg-amber-500 text-indigo-950 px-md py-sm rounded-lg font-label-bold text-label-bold hover:bg-amber-400 transition-colors">
              <span className="material-symbols-outlined text-[20px]">add</span>
              New Strategy
            </button>
          </div>
        </div>
      </section>

      {/* History Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Entry 1 */}
        <div className="lg:col-span-8 glass-card p-md flex flex-col md:flex-row gap-md">
          <div className="md:w-1/3 relative rounded-lg overflow-hidden group shrink-0">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAs7Hy5-GBOLlFwk89GH-rzOJlchykqFWS_medd1-P9qOkauu9me8b-vnoQ9a3qtv1CxzUA2IyUqj3oDGMnReoYfNtOtWZEZeLxx8jZe60Bxx-k6nRCBe3k61j5_62o0X3Au24LssRmaDBpPu8Yi4LOfYiHfuS1ZUXC74mvmHszNfs7AB079k1IRkOXkrOsC1VhaqiSd-njZpcFPszI4TOcwSohryO_qiSudufRyMJg7TTGGmzAjg56ADbuLbbPGomoWAQHras1CQ" 
            />
            <div className="absolute top-sm left-sm flex flex-col gap-xs">
              <span className="bg-amber-500 text-indigo-950 px-sm py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">AI Top Pick</span>
            </div>
          </div>
          <div className="md:w-2/3 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-sm">
                <div>
                  <h3 className="font-headline-md text-headline-md text-indigo-900">Finals Simulation: MI vs CSK</h3>
                  <p className="text-indigo-700 text-sm">2 hours ago • Wankhede Stadium</p>
                </div>
                <div className="text-right">
                  <div className="font-stats-num text-stats-num text-amber-500">84%</div>
                  <div className="text-[10px] font-label-bold text-amber-500 uppercase">Win Prob.</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-xs mb-md">
                <span className="bg-indigo-100/50 text-indigo-900 px-sm py-1 rounded-lg text-xs font-medium">Pitch: Dusty</span>
                <span className="bg-indigo-100/50 text-indigo-900 px-sm py-1 rounded-lg text-xs font-medium">Weather: Humid</span>
                <span className="bg-indigo-100/50 text-indigo-900 px-sm py-1 rounded-lg text-xs font-medium">Type: Balanced XI</span>
              </div>
              <div className="flex -space-x-3 mb-md">
                <div className="w-10 h-10 rounded-full border-2 border-slate-800 bg-slate-700 flex items-center justify-center text-[10px] font-bold">WK</div>
                <div className="w-10 h-10 rounded-full border-2 border-slate-800 bg-slate-600 flex items-center justify-center text-[10px] font-bold">BAT</div>
                <div className="w-10 h-10 rounded-full border-2 border-slate-800 bg-slate-700 flex items-center justify-center text-[10px] font-bold">ALL</div>
                <div className="w-10 h-10 rounded-full border-2 border-slate-800 bg-slate-600 flex items-center justify-center text-[10px] font-bold">BOWL</div>
                <div className="w-10 h-10 rounded-full border-2 border-slate-800 bg-slate-500 flex items-center justify-center text-[10px] font-bold">+7</div>
              </div>
            </div>
            <div className="flex gap-sm pt-sm border-t border-indigo-200/30">
              <button className="flex-1 bg-amber-500 text-indigo-950 py-sm rounded-lg font-label-bold text-label-bold hover:bg-amber-400 transition-colors">Reuse</button>
              <button className="flex-1 border border-indigo-300/30 text-indigo-800 py-sm rounded-lg font-label-bold text-label-bold hover:bg-white/20 transition-colors">Compare</button>
            </div>
          </div>
        </div>

        {/* Entry 2 */}
        <div className="lg:col-span-4 glass-card p-md flex flex-col">
          <div className="mb-md">
            <div className="flex items-center gap-sm mb-xs">
              <span className="material-symbols-outlined text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
              <h3 className="font-headline-md text-indigo-900 text-lg">Death Over Specialist</h3>
            </div>
            <p className="text-indigo-700 text-sm">Yesterday at 18:42 • Bengaluru</p>
          </div>
          <div className="flex-grow space-y-sm mb-md">
            <div className="flex justify-between items-center p-sm bg-indigo-100/30 rounded-lg border border-indigo-200/30">
              <span className="font-label-bold text-sm text-indigo-800">Avg Score</span>
              <span className="font-stats-num text-lg text-amber-500">184</span>
            </div>
            <div className="flex justify-between items-center p-sm bg-indigo-100/30 rounded-lg border-l-4 border-amber-500">
              <span className="font-label-bold text-sm text-indigo-800">AI Move</span>
              <span className="text-xs text-amber-500">Added Leg-Spinner</span>
            </div>
          </div>
          <div className="flex gap-sm">
            <button className="flex-1 bg-amber-500 text-indigo-950 py-sm rounded-lg font-label-bold text-label-bold hover:bg-amber-400 transition-colors">Reuse</button>
            <button className="p-sm border border-indigo-300/30 text-indigo-800 rounded-lg hover:bg-white/20 transition-colors">
              <span className="material-symbols-outlined">compare_arrows</span>
            </button>
          </div>
        </div>

        {/* Entry 3 */}
        <div className="lg:col-span-12 glass-card p-md">
          <div className="flex flex-col md:flex-row items-center gap-md">
            <div className="bg-amber-500/10 w-full md:w-16 h-16 rounded-lg flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-amber-500 text-3xl">history</span>
            </div>
            <div className="flex-grow text-center md:text-left">
              <h4 className="font-headline-md text-indigo-900">Qualifier 1 Optimization</h4>
              <p className="text-indigo-700 text-sm">Generated 3 days ago • Eden Gardens</p>
            </div>
            <div className="flex gap-md px-md border-x border-indigo-200/30 hidden md:flex">
              <div className="text-center">
                <div className="text-xs font-label-bold text-indigo-800 uppercase tracking-wider">Batsmen</div>
                <div className="font-stats-num text-xl text-amber-500">6</div>
              </div>
              <div className="text-center">
                <div className="text-xs font-label-bold text-indigo-800 uppercase tracking-wider">Bowlers</div>
                <div className="font-stats-num text-xl text-amber-500">5</div>
              </div>
            </div>
            <div className="flex gap-sm w-full md:w-auto">
              <button className="flex-1 md:px-lg bg-amber-500 text-indigo-950 py-sm rounded-lg font-label-bold text-label-bold hover:bg-amber-400 transition-colors">Reuse</button>
              <button className="flex-1 md:px-lg border border-indigo-300/30 text-indigo-800 py-sm rounded-lg font-label-bold text-label-bold hover:bg-white/20 transition-colors">Compare</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
