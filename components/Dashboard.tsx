
import React from 'react';
import { UserProfile, FeatureType } from '../types';
import { MOCK_HISTORY, SIDE_INCOME_DATA, DEMO_SAVINGS, PRICE_COMPARISONS, APP_NAME } from '../constants';

interface DashboardProps {
  t: any;
  userProfile: UserProfile;
  onFeatureSelect: (feature: FeatureType, params?: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ t, userProfile, onFeatureSelect }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: userProfile.currency,
    }).format(val);
  };

  const bestTicket = PRICE_COMPARISONS.tickets.find(t => t.best);
  const matchedEarn = SIDE_INCOME_DATA[0]; // Delivery

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-40 relative">
      
      {/* Personalized Luxury Welcome Section */}
      <header className="relative py-12 overflow-hidden rounded-[4rem] px-10 flex flex-col md:flex-row justify-between items-center group shadow-2xl border border-purple-500/20">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-950/40 -z-10 transition-transform group-hover:scale-105 duration-1000"></div>
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-purple-600/10 blur-[120px] rounded-full"></div>
        
        <div className="relative z-10 text-center md:text-left space-y-3">
           <h2 className="text-2xl font-medium text-purple-300 italic tracking-wide">
             {t.greeting}{userProfile.name} ({userProfile.gender})
           </h2>
           <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white drop-shadow-lg leading-tight uppercase italic">
             {APP_NAME}
           </h1>
           <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
              <span className="text-slate-500 font-black tracking-widest text-[10px] uppercase px-4 py-1.5 bg-white/5 rounded-full border border-white/10">
                Stability: <span className="text-emerald-400">OPTIMAL</span>
              </span>
              <span className="text-slate-500 font-black tracking-widest text-[10px] uppercase px-4 py-1.5 bg-white/5 rounded-full border border-white/10">
                AI Engine: <span className="text-purple-400">ACTIVE</span>
              </span>
           </div>
        </div>

        <div className="mt-10 md:mt-0 relative z-10">
           <button 
             onClick={() => onFeatureSelect('ai-advisor')}
             className="px-10 py-5 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-purple-600 hover:border-purple-400 transition-all flex items-center gap-5 group/btn shadow-3xl"
           >
             <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/40 animate-pulse">
               <i className="fas fa-brain text-white text-lg"></i>
             </div>
             <div className="text-left">
               <span className="block text-[11px] font-black uppercase tracking-widest text-slate-300 group-hover/btn:text-white">Run AI Wealth Audit</span>
               <span className="block text-[9px] text-slate-500 font-bold group-hover/btn:text-purple-200">Neural advisor active</span>
             </div>
           </button>
        </div>
      </header>

      {/* Primary Action Hub (Balance & CIBIL) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 purple-glass p-12 rounded-[4.5rem] flex flex-col sm:flex-row justify-between items-center group overflow-hidden relative shadow-3xl border border-purple-500/10 cursor-pointer" onClick={() => onFeatureSelect('transaction')}>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 blur-[120px] -translate-y-1/2 translate-x-1/2 rounded-full"></div>
          <div className="space-y-2 text-center sm:text-left">
            <p className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-500">Node: Total Liquid Assets</p>
            <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-2xl">
              {formatCurrency(12450.80)}
            </h3>
            <p className="text-[10px] text-slate-500 italic mt-2">Demo Detail: Real-time balance across all linked neural accounts.</p>
            <div className="mt-8 flex items-center justify-center sm:justify-start gap-4">
               <div className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-2">
                 <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                 <span className="text-emerald-400 font-black text-[11px] uppercase tracking-widest">+12.5% Month-over-Month</span>
               </div>
            </div>
          </div>
          <div className="mt-8 sm:mt-0 flex flex-col items-center gap-4">
            <button 
              onClick={(e) => { e.stopPropagation(); onFeatureSelect('transfer'); }}
              className="w-24 h-24 rounded-[3rem] bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white hover:scale-110 transition-all shadow-2xl shadow-purple-500/40"
            >
              <i className="fas fa-paper-plane text-3xl"></i>
            </button>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Wire Assets</span>
          </div>
        </div>

        <div className="purple-glass p-12 rounded-[4.5rem] text-center flex flex-col items-center justify-center relative group border border-fuchsia-500/10 shadow-3xl cursor-pointer hover:border-fuchsia-400/30 transition-all" onClick={() => onFeatureSelect('loan')}>
          <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-500 mb-8">Node: Credit Integrity</p>
          <div className="relative">
             <div className="text-7xl font-black text-fuchsia-400 drop-shadow-[0_0_20px_rgba(232,121,249,0.4)]">{userProfile.cibilScore}</div>
             <div className="text-[10px] text-emerald-400 font-black uppercase tracking-widest mt-3 px-6 py-1.5 bg-emerald-400/5 rounded-full border border-emerald-400/20 shadow-lg uppercase">Elite Portfolio Status</div>
          </div>
          <p className="text-[10px] text-slate-500 mt-6 leading-relaxed italic">Demo Detail: Historic credit performance index.</p>
        </div>
      </section>

      {/* Feature Grids with Explicit Names and Demo Descriptions */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Market Scouting Card */}
        <div className="purple-glass p-10 rounded-[4rem] border border-emerald-500/20 col-span-1 flex flex-col justify-between shadow-3xl hover:border-emerald-500/40 transition-all group cursor-pointer" onClick={() => onFeatureSelect('groceries')}>
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 shadow-lg group-hover:scale-110 transition-transform">
                <i className="fas fa-basket-shopping text-2xl"></i>
              </div>
              <div>
                <h5 className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-400">Scout: Market</h5>
                <p className="text-[8px] text-slate-500 font-bold uppercase">Price Comparison Engine</p>
              </div>
            </div>
            <div className="space-y-4">
               <p className="text-xs text-slate-400 italic">Demo Detail: Compare daily items (Milk, Rice) across Dmart, Big Bazaar, and Amazon.</p>
               {PRICE_COMPARISONS.groceries.slice(0, 2).map((g, i) => (
                 <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                   <span className="text-slate-400 font-medium">{g.item}</span>
                   <span className="text-emerald-400 font-black">{formatCurrency(g.dmart)}</span>
                 </div>
               ))}
            </div>
          </div>
          <button className="mt-8 w-full py-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-3xl text-[10px] font-black uppercase tracking-[0.3em]">
            Access Price Matrix
          </button>
        </div>

        {/* Earning Node Card */}
        <div className="purple-glass p-10 rounded-[4rem] border border-indigo-500/20 col-span-1 flex flex-col justify-between shadow-3xl hover:border-indigo-500/40 transition-all group cursor-pointer" onClick={() => onFeatureSelect('side-income')}>
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-indigo-400/10 border border-indigo-400/20 flex items-center justify-center text-indigo-400 shadow-lg group-hover:scale-110 transition-transform">
                <i className="fas fa-hand-holding-dollar text-2xl"></i>
              </div>
              <div>
                <h5 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400">Scout: Earn</h5>
                <p className="text-[8px] text-slate-500 font-bold uppercase">Income Expansion Source</p>
              </div>
            </div>
            <div className="bg-slate-900/60 p-6 rounded-[2.5rem] border border-indigo-500/10 space-y-4">
               <p className="text-[9px] text-indigo-300 font-black uppercase tracking-[0.4em] italic">AI Recommendation</p>
               <h6 className="text-xl font-black text-white">Rapido & Zepto Nodes</h6>
               <p className="text-[10px] text-slate-400 leading-relaxed font-light line-clamp-2">Demo Detail: Suggestions for Swiggy, Zomato, and Elite Tutoring based on demand.</p>
            </div>
          </div>
          <button className="mt-8 w-full py-4 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-3xl text-[10px] font-black uppercase tracking-[0.3em]">
            Open Inflow Nodes
          </button>
        </div>

        {/* Travel Ticket Card */}
        <div className="purple-glass p-10 rounded-[4rem] border border-sky-500/20 col-span-1 flex flex-col justify-between shadow-3xl hover:border-sky-500/40 transition-all group cursor-pointer" onClick={() => onFeatureSelect('tickets')}>
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-400 shadow-lg group-hover:scale-110 transition-transform">
                <i className="fas fa-ticket text-2xl"></i>
              </div>
              <div>
                <h5 className="text-[11px] font-black uppercase tracking-[0.3em] text-sky-400">Scout: Tickets</h5>
                <p className="text-[8px] text-slate-500 font-bold uppercase">Travel Optimization Node</p>
              </div>
            </div>
            <div className="text-center p-8 bg-sky-500/5 border-2 border-dashed border-sky-500/20 rounded-[2.5rem] space-y-3">
               <p className="text-[9px] text-slate-500 uppercase font-black">Optimal Path Detected</p>
               <p className="text-3xl font-black text-white">{bestTicket?.provider}</p>
               <p className="text-sky-400 font-bold text-lg">{formatCurrency(bestTicket?.price || 0)} <span className="text-[10px] uppercase font-black text-slate-600 ml-1 italic">via {bestTicket?.mode}</span></p>
            </div>
          </div>
          <button className="mt-8 w-full py-4 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-3xl text-[10px] font-black uppercase tracking-[0.3em]">
            Launch Transport Scout
          </button>
        </div>
      </section>

      {/* Restoration & Resilience Protocol Section */}
      <section className="bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 p-16 md:p-20 rounded-[7rem] border border-purple-500/20 relative overflow-hidden group shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
        <div className="absolute top-0 right-0 p-16 text-purple-500/5 rotate-12 scale-[2] pointer-events-none transition-transform group-hover:scale-[2.2] duration-[2000ms]">
           <i className="fas fa-heart-pulse text-[150px]"></i>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="w-32 h-32 rounded-[3rem] bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-[0_20px_50px_rgba(147,51,234,0.4)] animate-float">
            <i className="fas fa-life-ring text-6xl"></i>
          </div>
          <div className="flex-1 text-center md:text-left space-y-8">
            <h4 className="text-4xl md:text-5xl font-black tracking-tighter text-white italic underline decoration-purple-500/20 underline-offset-8">Feature: Restoration Protocol</h4>
            <p className="text-slate-400 text-xl md:text-2xl leading-relaxed font-light max-w-5xl">
              SBM architecture prioritizes <span className="text-white font-bold italic">capital healing</span>. If your essential reserves reach a critical deficit, the AI initializes a step-by-step restoration plan.
            </p>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Demo Detail: Automated emergency recovery blueprints for students and professionals.</p>
          </div>
          <button 
            onClick={() => onFeatureSelect('reminders')}
            className="px-14 py-7 bg-white text-slate-950 rounded-[3rem] font-black uppercase tracking-[0.5em] text-xs hover:scale-110 hover:shadow-white/20 transition-all shadow-3xl shrink-0"
          >
            Launch System Restore
          </button>
        </div>
      </section>

    </div>
  );
};

export default Dashboard;
