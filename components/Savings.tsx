
import React, { useState } from 'react';
import { UserProfile, SavingGoal, FeatureType } from '../types';
import { DEMO_SAVINGS } from '../constants';

interface SavingsProps {
  t: any;
  userProfile: UserProfile;
  onBack: () => void;
  // Using custom event or exposing advisor feature
  onFeatureSelect?: (feature: FeatureType, params?: any) => void;
}

const Savings: React.FC<SavingsProps> = ({ t, userProfile, onBack, onFeatureSelect }) => {
  const [goals, setGoals] = useState<SavingGoal[]>(DEMO_SAVINGS);
  const [isAdding, setIsAdding] = useState(false);
  const [newGoal, setNewGoal] = useState<Partial<SavingGoal>>({
    purpose: 'Investment',
    isReminderActive: true
  });

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: userProfile.currency,
    }).format(val);
  };

  const getPurposeConfig = (purpose: string) => {
    switch(purpose) {
      case 'School Fee': 
        return { 
          color: 'text-sky-400 bg-sky-400/10 border-sky-500/30', 
          icon: 'fa-graduation-cap',
          label: 'Academic Fund',
          glow: 'shadow-sky-500/20',
          isLocked: true
        };
      case 'Household': 
        return { 
          color: 'text-amber-400 bg-amber-400/10 border-amber-500/30', 
          icon: 'fa-home',
          label: 'Household Essential',
          glow: 'shadow-amber-500/20',
          isLocked: false
        };
      case 'Emergency': 
        return { 
          color: 'text-red-400 bg-red-400/10 border-red-500/30', 
          icon: 'fa-heartbeat',
          label: 'Emergency Reserve',
          glow: 'shadow-red-500/20',
          isLocked: true
        };
      case 'Investment': 
        return { 
          color: 'text-emerald-400 bg-emerald-400/10 border-emerald-500/30', 
          icon: 'fa-chart-line',
          label: 'Wealth Growth',
          glow: 'shadow-emerald-500/20',
          isLocked: false
        };
      case 'Travel': 
        return { 
          color: 'text-fuchsia-400 bg-fuchsia-400/10 border-fuchsia-500/30', 
          icon: 'fa-plane',
          label: 'Travel Node',
          glow: 'shadow-fuchsia-500/20',
          isLocked: false
        };
      default: 
        return { 
          color: 'text-purple-400 bg-purple-400/10 border-purple-500/30', 
          icon: 'fa-piggy-bank',
          label: 'General Fund',
          glow: 'shadow-purple-500/20',
          isLocked: false
        };
    }
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.name || !newGoal.targetAmount) return;
    
    const goal: SavingGoal = {
      id: Date.now().toString(),
      name: newGoal.name,
      purpose: newGoal.purpose as any,
      targetAmount: Number(newGoal.targetAmount),
      currentAmount: 0,
      deadline: newGoal.deadline || new Date().toISOString().split('T')[0],
      isReminderActive: true
    };

    setGoals([...goals, goal]);
    setIsAdding(false);
    setNewGoal({ purpose: 'Investment', isReminderActive: true });
  };

  const toggleReminder = (id: string) => {
    setGoals(goals.map(g => g.id === id ? { ...g, isReminderActive: !g.isReminderActive } : g));
  };

  const handleSimulateWithdrawal = (goal: SavingGoal) => {
    const amount = goal.currentAmount * 0.5; // Simulate 50% withdrawal
    if (onFeatureSelect) {
      onFeatureSelect('ai-advisor', { 
        prefill: `I am considering withdrawing ${formatCurrency(amount)} from my ${goal.name} (${goal.purpose}) savings goal. Analyze the risk and provide an impact report.` 
      });
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-8 duration-500 max-w-7xl mx-auto pb-48">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-bold transition-all group">
          <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          DASHBOARD
        </button>
        <button 
          onClick={() => setIsAdding(!isAdding)} 
          className="px-10 py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-3xl font-black text-white hover:scale-105 transition-all shadow-xl shadow-purple-500/30 uppercase tracking-[0.2em] text-xs"
        >
          {isAdding ? 'CANCEL ARCHITECTURE' : 'NEW SAVINGS NODE'}
        </button>
      </div>

      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full"></div>
        <div className="w-24 h-24 bg-gradient-to-tr from-purple-600 to-indigo-700 rounded-[2.5rem] mx-auto flex items-center justify-center mb-8 shadow-2xl shadow-purple-500/30 relative z-10">
          <i className="fas fa-vault text-4xl text-white"></i>
        </div>
        <h2 className="text-6xl font-black tracking-tighter mb-4 bg-gradient-to-r from-white via-purple-200 to-slate-400 bg-clip-text text-transparent relative z-10">
          CAPITAL SAFEGUARDS
        </h2>
        <p className="text-slate-500 text-xl font-light tracking-wide max-w-2xl mx-auto relative z-10">
          "Algorithmic protection and monitoring of your wealth nodes."
        </p>
      </div>

      {isAdding && (
        <form onSubmit={handleAddGoal} className="purple-glass p-12 rounded-[4rem] border border-purple-500/30 space-y-8 animate-in zoom-in-95 duration-500 max-w-4xl mx-auto shadow-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Goal Designation</label>
              <input 
                type="text" placeholder="Ex: Harvard Tuition Fund..." 
                className="w-full bg-slate-950 border border-white/10 rounded-[2rem] p-5 focus:ring-2 focus:ring-purple-500 outline-none text-white font-medium"
                value={newGoal.name || ''}
                onChange={e => setNewGoal({...newGoal, name: e.target.value})}
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Objective Category</label>
              <select 
                className="w-full bg-slate-950 border border-white/10 rounded-[2rem] p-5 focus:ring-2 focus:ring-purple-500 outline-none text-white font-medium"
                value={newGoal.purpose}
                onChange={e => setNewGoal({...newGoal, purpose: e.target.value as any})}
              >
                <option value="School Fee">School Fee (Locked)</option>
                <option value="Household">Household Essential</option>
                <option value="Emergency">Emergency Fund (Locked)</option>
                <option value="Investment">Investment Capital</option>
                <option value="Travel">Travel Budget</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Required Capital</label>
              <input 
                type="number" placeholder="0.00" 
                className="w-full bg-slate-950 border border-white/10 rounded-[2rem] p-5 focus:ring-2 focus:ring-purple-500 outline-none text-white text-2xl font-black"
                value={newGoal.targetAmount || ''}
                onChange={e => setNewGoal({...newGoal, targetAmount: Number(e.target.value)})}
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Completion Deadline</label>
              <input 
                type="date" 
                className="w-full bg-slate-950 border border-white/10 rounded-[2rem] p-5 focus:ring-2 focus:ring-purple-500 outline-none text-white"
                value={newGoal.deadline || ''}
                onChange={e => setNewGoal({...newGoal, deadline: e.target.value})}
              />
            </div>
          </div>
          <button className="w-full py-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-[2.5rem] font-black text-white shadow-2xl shadow-purple-500/40 uppercase tracking-[0.5em] text-sm hover:scale-[1.01] transition-transform">
            INITIALIZE SAVINGS NODE
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {goals.map(goal => {
          const config = getPurposeConfig(goal.purpose);
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          return (
            <div key={goal.id} className="purple-glass p-10 rounded-[4rem] border border-white/5 flex flex-col justify-between group hover:border-purple-500/40 transition-all relative overflow-hidden shadow-2xl">
              <div className={`absolute -right-20 -top-20 w-48 h-48 opacity-5 blur-3xl rounded-full transition-opacity group-hover:opacity-10 ${config.color.split(' ')[0]}`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center border ${config.color} ${config.glow}`}>
                    <i className={`fas ${config.icon} text-2xl`}></i>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Reminders</span>
                    <button 
                      onClick={() => toggleReminder(goal.id)}
                      className={`w-12 h-6 rounded-full relative transition-all border ${goal.isReminderActive ? 'bg-purple-600 border-purple-400' : 'bg-slate-800 border-white/10'}`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${goal.isReminderActive ? 'right-0.5' : 'left-0.5'}`}></div>
                    </button>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-3xl font-black mb-1 tracking-tight text-white group-hover:text-purple-200 transition-colors">{goal.name}</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${config.color}`}>
                      {goal.purpose.toUpperCase()}
                    </span>
                    {config.isLocked && (
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400">
                        <i className="fas fa-lock mr-2"></i>LOCKED FUND
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.4em]">
                    <span className="text-slate-500 italic">Fulfillment Progress</span>
                    <span className={config.color.split(' ')[0]}>{progress.toFixed(1)}%</span>
                  </div>
                  <div className="h-4 bg-slate-950 rounded-full overflow-hidden border border-white/5 shadow-inner p-1">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r transition-all duration-[1500ms] ${
                        goal.purpose === 'Emergency' ? 'from-red-600 to-orange-400' : 
                        goal.purpose === 'School Fee' ? 'from-sky-600 to-indigo-400' :
                        goal.purpose === 'Travel' ? 'from-fuchsia-600 to-pink-400' :
                        'from-emerald-600 to-teal-400'
                      }`} 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex flex-col gap-6 relative z-10">
                <div className="flex justify-between items-end border-t border-white/5 pt-8">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-600 uppercase tracking-widest font-black">Target</p>
                    <p className="text-xl font-black text-slate-400">{formatCurrency(goal.targetAmount)}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-[10px] text-slate-600 uppercase tracking-widest font-black">Available</p>
                    <p className={`text-4xl font-black ${config.color.split(' ')[0]}`}>{formatCurrency(goal.currentAmount)}</p>
                  </div>
                </div>

                {config.isLocked && (
                  <button 
                    onClick={() => handleSimulateWithdrawal(goal)}
                    className="w-full py-4 border border-red-500/20 bg-red-500/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-red-400 hover:bg-red-500/10 transition-all flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-microchip"></i>
                    Simulate Withdrawal Impact
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-purple-950/60 p-12 rounded-[5rem] border border-purple-500/30 mt-20 relative overflow-hidden group shadow-3xl">
        <div className="absolute inset-0 bg-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="w-28 h-28 rounded-[3rem] bg-purple-600/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 shadow-2xl animate-float">
             <i className="fas fa-brain text-5xl"></i>
          </div>
          <div className="space-y-6 text-center md:text-left">
            <h4 className="text-3xl font-black tracking-tight flex flex-col md:flex-row items-center gap-4">
              Neural Integrity Monitoring
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-5 py-2 rounded-full uppercase tracking-widest border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
                AI Discipline Active
              </span>
            </h4>
            <p className="text-slate-400 text-xl leading-relaxed font-light">
              Our neural engine monitors spending velocity and liquidity events. Withdrawing from <span className="text-red-400 font-bold underline decoration-red-500/30">Locked Funds</span> (School Fees, Emergency) will trigger a <span className="text-white font-black italic">High-Severity Discipline Protocol</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Savings;
