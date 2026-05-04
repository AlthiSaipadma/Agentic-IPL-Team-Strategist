import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateTeamLogic } from '../services/ai';

const GenerateTeam = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    venue: 'Wankhede Stadium, Mumbai',
    pitch: 'Batting Paradise',
    weather: 'Sunny & Clear',
    toss: 'Bat First',
    opponent: 'Chennai Super Kings'
  });
  const [errors, setErrors] = useState({});

  const validateForm = (data) => {
    const newErrors = {};
    
    if (!data.venue || data.venue.trim() === '') {
      newErrors.venue = 'Please select a venue';
    }
    
    if (!data.pitch || data.pitch.trim() === '') {
      newErrors.pitch = 'Please select a pitch type';
    }
    
    if (!data.weather || data.weather.trim() === '') {
      newErrors.weather = 'Please select weather conditions';
    }
    
    if (!data.toss || data.toss.trim() === '') {
      newErrors.toss = 'Please select toss result';
    }
    
    if (!data.opponent || data.opponent.trim() === '') {
      newErrors.opponent = 'Please select an opponent';
    }
    
    return newErrors;
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Show error message
      const firstError = Object.values(validationErrors)[0];
      alert(`Validation Error: ${firstError}`);
      return;
    }
    
    // Clear errors if validation passes
    setErrors({});
    
    setLoading(true);
    try {
      const generatedData = await generateTeamLogic(formData);
      navigate('/results', { state: { teamData: generatedData, params: formData } });
    } catch (error) {
      alert("Failed to generate team. Please check your API key and backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center px-6 py-xl">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        <div className="lg:col-span-4 space-y-md">
          <div className="space-y-sm">
            <span className="bg-[#FFD700] text-black px-sm py-1 rounded-full text-label-bold inline-block shadow-lg">
              STRATEGY ENGINE v2.0
            </span>
            <h1 className="hero-title leading-tight">
              Optimize Your <span className="text-indigo-600">Lineup.</span>
            </h1>
            <p className="hero-description">
              Our AI analyzes historical venue data, player metrics, and real-time conditions to project the highest-probability winning combination.
            </p>
          </div>
          <div className="glass-card p-md shadow-xl">
            <div className="flex items-center gap-sm text-indigo-600 mb-base">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <span className="font-label-bold uppercase text-xs">AGENTIC INSIGHTS</span>
            </div>
            <p className="text-sm text-on-background/90 leading-relaxed font-medium">
              Currently analyzing: {formData.venue}'s conditions often favor certain styles of play. Adjust your parameters to explore different outcomes.
            </p>
          </div>
        </div>

        <div className="lg:col-span-8 glass-card overflow-hidden shadow-2xl border-white/20">
          <div className="p-md border-b border-white/10 flex items-center justify-between">
            <h2 className="font-headline-md text-on-background flex items-center gap-sm">
              <span className="material-symbols-outlined text-indigo-600">analytics</span>
              Team Generation Parameters
            </h2>
          </div>
          <form className="p-md space-y-md" onSubmit={handleGenerate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {/* Venue */}
              <div className="flex flex-col gap-xs">
                <label className="text-label-bold text-indigo-600 ml-xs uppercase text-[10px]">SELECT VENUE</label>
                <div className="relative group">
                  <span className="absolute left-sm top-1/2 -translate-y-1/2 material-symbols-outlined text-indigo-600/60">location_on</span>
                  <select 
                    value={formData.venue}
                    onChange={(e) => setFormData({...formData, venue: e.target.value})}
                    className={`w-full pl-lg pr-md py-sm bg-white/20 border text-on-background rounded-lg focus:ring-2 appearance-none transition-all font-bold ${
                      errors.venue 
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                        : 'border-indigo-200 focus:ring-indigo-500 focus:border-indigo-500'
                    }`}
                  >
                    <option className="bg-white">Wankhede Stadium, Mumbai</option>
                    <option className="bg-white">M. Chinnaswamy Stadium, Bengaluru</option>
                    <option className="bg-white">Eden Gardens, Kolkata</option>
                    <option className="bg-white">Narendra Modi Stadium, Ahmedabad</option>
                    <option className="bg-white">MA Chidambaram Stadium, Chennai</option>
                  </select>
                  <span className="absolute right-sm top-1/2 -translate-y-1/2 material-symbols-outlined text-indigo-600 pointer-events-none">expand_more</span>
                </div>
              </div>

              {/* Pitch */}
              <div className="flex flex-col gap-xs">
                <label className="text-label-bold text-indigo-600 ml-xs uppercase text-[10px]">PITCH TYPE</label>
                <div className="relative group">
                  <span className="absolute left-sm top-1/2 -translate-y-1/2 material-symbols-outlined text-indigo-600/60">grass</span>
                  <select 
                    value={formData.pitch}
                    onChange={(e) => setFormData({...formData, pitch: e.target.value})}
                    className={`w-full pl-lg pr-md py-sm bg-white/20 border text-on-background rounded-lg focus:ring-2 appearance-none transition-all font-bold ${
                      errors.pitch 
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                        : 'border-indigo-200 focus:ring-indigo-500 focus:border-indigo-500'
                    }`}
                  >
                    <option className="bg-white">Batting Paradise</option>
                    <option className="bg-white">Spin-friendly</option>
                    <option className="bg-white">Pace-friendly</option>
                    <option className="bg-white">Balanced Surface</option>
                  </select>
                  <span className="absolute right-sm top-1/2 -translate-y-1/2 material-symbols-outlined text-indigo-600 pointer-events-none">expand_more</span>
                </div>
              </div>

              {/* Weather */}
              <div className="flex flex-col gap-xs">
                <label className="text-label-bold text-indigo-600 ml-xs uppercase text-[10px]">WEATHER CONDITIONS</label>
                <div className="relative group">
                  <span className="absolute left-sm top-1/2 -translate-y-1/2 material-symbols-outlined text-indigo-600/60">filter_drama</span>
                  <select 
                    value={formData.weather}
                    onChange={(e) => setFormData({...formData, weather: e.target.value})}
                    className={`w-full pl-lg pr-md py-sm bg-white/20 border text-on-background rounded-lg focus:ring-2 appearance-none transition-all font-bold ${
                      errors.weather 
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                        : 'border-indigo-200 focus:ring-indigo-500 focus:border-indigo-500'
                    }`}
                  >
                    <option className="bg-white">Sunny & Clear</option>
                    <option className="bg-white">High Humidity</option>
                    <option className="bg-white">Overcast / Rainy</option>
                    <option className="bg-white">Dew Likely</option>
                  </select>
                  <span className="absolute right-sm top-1/2 -translate-y-1/2 material-symbols-outlined text-indigo-600 pointer-events-none">expand_more</span>
                </div>
              </div>

              {/* Toss */}
              <div className="flex flex-col gap-xs">
                <label className="text-label-bold text-indigo-600 ml-xs uppercase text-[10px]">TOSS RESULT</label>
                <div className="relative group">
                  <span className="absolute left-sm top-1/2 -translate-y-1/2 material-symbols-outlined text-indigo-600/60">payments</span>
                  <select 
                    value={formData.toss}
                    onChange={(e) => setFormData({...formData, toss: e.target.value})}
                    className={`w-full pl-lg pr-md py-sm bg-white/20 border text-on-background rounded-lg focus:ring-2 appearance-none transition-all font-bold ${
                      errors.toss 
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                        : 'border-indigo-200 focus:ring-indigo-500 focus:border-indigo-500'
                    }`}
                  >
                    <option className="bg-white">Bat First</option>
                    <option className="bg-white">Bowl First</option>
                  </select>
                  <span className="absolute right-sm top-1/2 -translate-y-1/2 material-symbols-outlined text-indigo-600 pointer-events-none">expand_more</span>
                </div>
              </div>

              {/* Opponent */}
              <div className="flex flex-col gap-xs md:col-span-2">
                <label className="text-label-bold text-indigo-600 ml-xs uppercase text-[10px]">OPPONENT TEAM</label>
                <div className="relative group">
                  <span className="absolute left-sm top-1/2 -translate-y-1/2 material-symbols-outlined text-indigo-600/60">groups</span>
                  <select 
                    value={formData.opponent}
                    onChange={(e) => setFormData({...formData, opponent: e.target.value})}
                    className={`w-full pl-lg pr-md py-sm bg-white/20 border text-on-background rounded-lg focus:ring-2 appearance-none transition-all font-bold ${
                      errors.opponent 
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                        : 'border-indigo-200 focus:ring-indigo-500 focus:border-indigo-500'
                    }`}
                  >
                    <option className="bg-white">Chennai Super Kings</option>
                    <option className="bg-white">Mumbai Indians</option>
                    <option className="bg-white">Royal Challengers Bengaluru</option>
                    <option className="bg-white">Gujarat Titans</option>
                    <option className="bg-white">Delhi Capitals</option>
                    <option className="bg-white">Lucknow Super Giants</option>
                  </select>
                  <span className="absolute right-sm top-1/2 -translate-y-1/2 material-symbols-outlined text-indigo-600 pointer-events-none">expand_more</span>
                </div>
              </div>
            </div>

            <div className="pt-md border-t border-indigo-100">
              <button 
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-sm bg-indigo-600 text-white py-md rounded-lg font-headline-md shadow-2xl hover:brightness-110 transition-all active:scale-95 disabled:opacity-50"
              >
                <span className={`material-symbols-outlined ${loading ? 'animate-spin' : 'animate-pulse'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                  {loading ? 'sync' : 'bolt'}
                </span>
                {loading ? 'Analyzing Agents...' : 'Generate Team'}
              </button>
              <p className="text-center text-xs text-indigo-900 font-bold mt-sm flex items-center justify-center gap-xs">
                <span className="material-symbols-outlined text-[14px] text-indigo-600">info</span>
                Processing may take up to 30 seconds for precise simulations.
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-xl w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-gutter">
        {[
          { label: 'DYNAMIC STATS', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARkhirTWPjQWAg-2cKI1mOMdkakFlPP4lnBvIPaBgYclmt6dZ4eKMNKC7c5Fdtg5-leCmwJNFC9GfUUDKy4iJzTBDiKMNKwsZ7FMCprzkaPvO8aNTLaJDEk7lvMC9jl1PjdTteLznpTozQFUKRmod6elmUQfZZbghh04OH_mK6I14Mn-halz-riSXcGWR6n2NOkOfYsmcnUUHZZztd8b1WWVU3gVRoi2ZrstUb_shuDQOUg5ceHvA2tnIZ2gyXPu_76OhMGWbvkw' },
          { label: 'AI MODEL V2', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-DFYCmDjeM5BtfGmYVKQIh009N5s3g_C3rgztyZO86TXaJaiYVF4mSiU_jg7PpJTjpd-XsriTZQdIbpKKa2gytAX1Dj_i-EVkJB-QJI8aM-KfKTU8Ok04Pz-iteFDmJ3uSI453D66Vo8SlLEinIZOIy0it-u7DDlqZw7157VgDAI4nFE1wwy1U5FR2rhDybo7VMSL2faaK9Ov2t62g_SYLFCWou19ghsR-eIGLAfrvf-RRh-H6yQ17nu0JgtY-C3OXXls8YbQ8w' },
          { label: 'STADIUM DATA', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjId5iWJxQH_skG6ID52SROC2xZsX4fPzyD8Yl5jx3ZtUIzUy366Cr-kAlgsa9YFWEcv-k4RkNhgBwHlAuTXfpEATVY0BL_5_Zpwyg7YoII_XjrQZq8ZSIzfNGQqUHumLTdqIL9J5d0veONeh8q7qWBMMviu_nhQoLLDwMOMMcnsy0AW0mV8iA20IJ2kFUsCUoC9uXeYKPXi57e56wgvx_ZcSc9LS_SOgOVXxyQC7VvLFXVg9QAWGaMdm8KNEVFDO9TsLXvkmvVA' },
          { label: 'PRO PLAYER LOGS', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8iRhabNRgHZ1PLs0AOSIxLZV-_8a_dSNArHvCxfHQ8-8Gg9WgQgJDyNVq90rajmVqY-PcLlBJZp3UM0LIMTIPJIeh5PLUZLB_1EygLcueFzLTubTW_N41Dp-34dM_H_5GgvQfPp0KmUMJ8AQon5apDFrGCA4RiAlpLegYCHOaVLGBJMlWYn8fMcj9X9vU88Xt0EFwlMRp-B9n_4w_CyQzU7oH1gjHIBfNNR3hA6QLoGQTgq_HsJdorBqy-2DqHT_PzZqzaCEsKw' }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <img alt={item.label} className="w-16 h-16 rounded-full object-cover border-2 border-indigo-200 shadow-2xl mb-xs" src={item.img} />
            <span className="text-xs font-label-bold text-indigo-900 uppercase tracking-widest">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenerateTeam;
