
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { SIDE_INCOME_DATA } from '../constants';

interface SideIncomeProps {
  t: any;
  userProfile: UserProfile;
  onBack: () => void;
}

const SideIncome: React.FC<SideIncomeProps> = ({ t, userProfile, onBack }) => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const getBrandLogo = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'rapido': return <i className="fas fa-motorcycle text-yellow-500"></i>;
      case 'swiggy': return <i className="fas fa-burger text-orange-500"></i>;
      case 'zomato': return <i className="fas fa-utensils text-red-500"></i>;
      case 'zepto': return <i className="fas fa-bolt text-purple-400"></i>;
      case 'chegg': return <i className="fas fa-book-open text-orange-400"></i>;
      case 'unacademy': return <i className="fas fa-graduation-cap text-green-400"></i>;
      case 'offline tutor': return <i className="fas fa-user-tie text-blue-400"></i>;
      case 'byju\'s': return <i className="fas fa-pencil-alt text-purple-600"></i>;
      default: return <i className="fas fa-globe"></i>;
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-8 duration-700 pb-40">
      <div className="flex justify-between items-center mb-12">
        <button onClick={onBack} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-black uppercase tracking-widest text-[10px] transition-colors group">
          <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          DASHBOARD
        </button>
        <div className="px-5 py-2 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-400 text-[9px] font-black uppercase tracking-widest animate-pulse">
           Feature: Inflow Scouting Hub
        </div>
      </div>

      <div className="text-center max-w-4xl mx-auto mb-20">
        <h2 className="text-5xl font-black tracking-tighter mb-4 bg-gradient-to-r from-white via-purple-200 to-slate-400 bg-clip-text text-transparent italic">
          {t.interests}
        </h2>
        <p className="text-slate-400 text-lg font-light leading-relaxed">
          "Demo Detail: Side incomesuggestions dynamically analyzed for your '{userProfile.incomeType}' profile and '{userProfile.gender}' demographic."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {SIDE_INCOME_DATA.map((item, idx) => (
          <div 
            key={idx} 
            onClick={() => setActiveNode(item.id)}
            className={`purple-glass p-12 rounded-[4rem] border transition-all group overflow-hidden relative flex flex-col justify-between shadow-3xl cursor-pointer ${activeNode === item.id ? 'border-purple-500 scale-[1.02] bg-purple-600/5' : 'border-white/5 hover:border-purple-500/40'}`}
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/5 blur-3xl rounded-full"></div>
            
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-20 h-20 bg-purple-500/10 rounded-[2rem] flex items-center justify-center text-purple-400 text-3xl shadow-inner border border-white/5 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Inflow Status</p>
                   <p className="text-xs font-bold text-white">Demand Node: HIGH</p>
                </div>
              </div>
              
              <h3 className="text-4xl font-black mb-6 tracking-tight text-white">{item.category}</h3>
              <p className="text-slate-400 mb-8 text-lg leading-relaxed font-light">
                {item.description}
              </p>

              {/* AI Neural Suggestion Box */}
              <div className="mb-10 p-6 bg-slate-950/50 rounded-[2.5rem] border border-purple-500/20 shadow-[inset_0_0_20px_rgba(168,85,247,0.1)] relative overflow-hidden group/advice">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover/advice:scale-125 transition-transform duration-1000">
                   <i className="fas fa-brain text-4xl"></i>
                </div>
                <div className="flex items-center gap-3 mb-3">
                   <i className="fas fa-robot text-purple-400 text-xs"></i>
                   <span className="text-[9px] font-black uppercase tracking-[0.3em] text-purple-400">Neural Expansion Advice</span>
                </div>
                <p className="text-sm text-slate-300 italic leading-relaxed font-light relative z-10">
                  "{item.aiAdvice}"
                </p>
              </div>
              
              <div className="space-y-6 mb-10">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Brand Portals</p>
                <div className="grid grid-cols-2 gap-4">
                  {item.platforms.map((p, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-[1.8rem] border border-white/10 hover:bg-purple-600/20 hover:border-purple-500/40 transition-all group/brand">
                      <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center text-xl shadow-lg border border-white/5 group-hover/brand:scale-110 transition-transform">
                        {getBrandLogo(p)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white text-[10px] font-black uppercase tracking-widest">{p}</span>
                        <span className="text-[8px] text-slate-500 uppercase font-black">Portal Active</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <button className="w-full py-6 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-[2.2rem] font-black uppercase tracking-[0.4em] text-[10px] hover:scale-105 transition-all shadow-3xl">
              INITIALIZE CONNECTION
            </button>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/60 p-12 rounded-[5rem] border border-white/5 text-center mt-20 relative overflow-hidden group shadow-2xl">
         <div className="absolute inset-0 bg-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
         <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600 relative z-10">
           Neural Network Latency: 4ms • Node Status: Synchronized with {userProfile.name}'s Profile
         </p>
      </div>
    </div>
  );
};

export default SideIncome;
