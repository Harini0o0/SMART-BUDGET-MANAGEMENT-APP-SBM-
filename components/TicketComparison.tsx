
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface TicketComparisonProps {
  t: any;
  userProfile: UserProfile;
  onBack: () => void;
}

const TicketComparison: React.FC<TicketComparisonProps> = ({ t, userProfile, onBack }) => {
  const [route, setRoute] = useState({ from: 'New York', to: 'London' });
  const [results] = useState([
    { provider: 'SkyLink', type: 'Flight', price: 450, time: '7h 20m', tag: 'Fastest' },
    { provider: 'EuroRail', type: 'Train', price: 120, time: '24h+', tag: 'Scenic' },
    { provider: 'GlobalBus', type: 'Bus', price: 85, time: '48h+', tag: 'Budget', best: true },
  ]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: userProfile.currency,
    }).format(userProfile.currency === 'INR' ? val * 83 : val);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
      <button onClick={onBack} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors">
        <i className="fas fa-arrow-left"></i>
        Back to Suite
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{t.ticketTitle}</h2>
          <p className="text-slate-400">We aggregate data across all transport modes to find your optimal path.</p>
        </div>

        <div className="purple-glass p-8 rounded-[2.5rem] flex flex-col md:flex-row gap-6 mb-12 items-center">
          <div className="flex-1 w-full relative">
            <i className="fas fa-map-marker-alt absolute left-4 top-1/2 -translate-y-1/2 text-purple-400"></i>
            <input 
              type="text" 
              className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50" 
              placeholder="From" 
              value={route.from}
              onChange={(e) => setRoute({...route, from: e.target.value})}
            />
          </div>
          <div className="w-10 h-10 shrink-0 bg-purple-500/20 rounded-full flex items-center justify-center">
            <i className="fas fa-exchange-alt text-purple-400"></i>
          </div>
          <div className="flex-1 w-full relative">
            <i className="fas fa-location-arrow absolute left-4 top-1/2 -translate-y-1/2 text-fuchsia-400"></i>
            <input 
              type="text" 
              className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50" 
              placeholder="To" 
              value={route.to}
              onChange={(e) => setRoute({...route, to: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-4">
          {results.map((res, i) => (
            <div key={i} className={`p-6 rounded-3xl border ${res.best ? 'border-purple-500 bg-purple-500/5' : 'border-white/5 bg-slate-900/40'} flex items-center justify-between transition-all hover:scale-[1.02]`}>
              <div className="flex items-center gap-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${res.type === 'Flight' ? 'bg-sky-500/20 text-sky-400' : res.type === 'Train' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-orange-500/20 text-orange-400'}`}>
                  <i className={`fas ${res.type === 'Flight' ? 'fa-plane' : res.type === 'Train' ? 'fa-train' : 'fa-bus'} text-2xl`}></i>
                </div>
                <div>
                  <h4 className="text-xl font-bold">{res.provider}</h4>
                  <div className="flex gap-2 items-center text-xs mt-1">
                    <span className="text-slate-400 uppercase tracking-widest">{res.type}</span>
                    <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                    <span className="text-slate-400">{res.time}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold mb-1">{formatCurrency(res.price)}</div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${res.best ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  {res.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicketComparison;
