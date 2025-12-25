
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { speakAdvice } from '../services/gemini';

interface RemindersProps {
  t: any;
  userProfile: UserProfile;
  onBack: () => void;
}

const Reminders: React.FC<RemindersProps> = ({ t, userProfile, onBack }) => {
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);

  const notifications = [
    {
      id: '1',
      type: 'discipline',
      title: 'Savings Gap Detected',
      message: 'You haven\'t added to your "School Fees" goal in 4 days. Neural forecast shows a potential $450 deficit by August.',
      severity: 'high',
      recovery: 'Save $20 today to stay on track.'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Impulsive Spending Alert',
      message: 'Spending velocity is 15% higher than planned this week. Your "Emergency Fund" may be impacted.',
      severity: 'medium',
      recovery: 'Reduce non-essential entertainment spending for the next 48 hours.'
    },
    {
      id: '3',
      type: 'restoration',
      title: 'Emergency Recovery Plan',
      message: 'Medical fund used last week. AI has calculated a 3-month restoration path.',
      severity: 'high',
      recovery: 'Allocate $150 from next paycheck to Medical Reserve.'
    },
    {
      id: '4',
      type: 'habit',
      title: 'Consistent Saver Reward',
      message: 'You reached your weekly household saving target! Stability score +5.',
      severity: 'low',
      recovery: 'Maintain current momentum.'
    }
  ];

  const handleSpeak = async (msg: string, id: string) => {
    setIsSpeaking(id);
    try {
      await speakAdvice(msg);
    } finally {
      setIsSpeaking(null);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-8 duration-500 max-w-4xl mx-auto pb-48">
      <button onClick={onBack} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors">
        <i className="fas fa-arrow-left"></i>
        Dashboard
      </button>

      <div className="text-center mb-16">
        <div className="w-24 h-24 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-[2.5rem] mx-auto flex items-center justify-center mb-8 shadow-2xl shadow-purple-500/30">
          <i className="fas fa-bell text-4xl text-white"></i>
        </div>
        <h2 className="text-5xl font-black tracking-tighter mb-4">Financial Discipline Tool</h2>
        <p className="text-slate-400 text-lg italic">"Neural reminders to ensure your long-term capital preservation."</p>
      </div>

      <div className="space-y-6">
        {notifications.map((notif) => (
          <div key={notif.id} className={`purple-glass p-8 rounded-[3rem] border transition-all relative overflow-hidden group ${notif.severity === 'high' ? 'border-red-500/30' : notif.severity === 'medium' ? 'border-amber-500/30' : 'border-emerald-500/30'}`}>
            <div className="flex flex-col md:flex-row gap-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${notif.severity === 'high' ? 'bg-red-500/10 text-red-400' : notif.severity === 'medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                <i className={`fas ${notif.type === 'discipline' ? 'fa-calendar-exclamation' : notif.type === 'warning' ? 'fa-bolt' : notif.type === 'habit' ? 'fa-medal' : 'fa-life-ring'} text-2xl`}></i>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">{notif.title}</h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mt-1">Context: {notif.type}</p>
                  </div>
                  <button 
                    onClick={() => handleSpeak(`${notif.title}. ${notif.message}. Recovery step: ${notif.recovery}`, notif.id)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isSpeaking === notif.id ? 'bg-purple-600 text-white animate-pulse' : 'bg-white/5 text-purple-400 hover:bg-white/10'}`}
                  >
                    <i className={`fas ${isSpeaking === notif.id ? 'fa-waveform-path' : 'fa-volume-up'}`}></i>
                  </button>
                </div>

                <p className="text-slate-300 leading-relaxed font-light text-lg italic">
                  "{notif.message}"
                </p>

                <div className={`p-4 rounded-2xl border ${notif.severity === 'high' ? 'bg-red-500/5 border-red-500/10' : 'bg-emerald-500/5 border-emerald-500/10'}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">AI Recovery Strategy:</span>
                    <p className="text-sm text-white font-medium">{notif.recovery}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/60 p-12 rounded-[4rem] border border-white/5 text-center space-y-6">
        <h4 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">Discipline Automation</h4>
        <div className="flex justify-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-6 bg-purple-600 rounded-full relative">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Voice Alerts</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-6 bg-purple-600 rounded-full relative">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Context Warnings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reminders;
