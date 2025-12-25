
import React from 'react';
import { UserProfile, Language, Currency } from '../types';

interface SettingsProps {
  t: any;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ t, userProfile, setUserProfile, onBack }) => {
  const togglePreference = (pref: string) => {
    const current = userProfile.preferences || [];
    const updated = current.includes(pref) 
      ? current.filter(p => p !== pref)
      : [...current, pref];
    setUserProfile({ ...userProfile, preferences: updated });
  };

  return (
    <div className="space-y-12 animate-in slide-in-from-right-8 duration-500 max-w-4xl mx-auto pb-48">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-black uppercase tracking-widest text-[10px] transition-colors group">
          <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          DASHBOARD
        </button>
        <h2 className="text-2xl font-black tracking-widest uppercase italic bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
          {t.settings}
        </h2>
      </div>

      <div className="purple-glass p-12 rounded-[4rem] border border-purple-500/20 space-y-12 shadow-3xl">
        <section className="space-y-6">
          <h3 className="text-xs font-black uppercase tracking-[0.5em] text-slate-500 border-b border-white/5 pb-4">Personal Identity</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Authorized User</label>
              <input 
                type="text" 
                className="w-full bg-slate-950 border border-white/10 rounded-[2rem] p-5 focus:ring-2 focus:ring-purple-500 outline-none text-white font-bold" 
                value={userProfile.name}
                onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Gender Identification</label>
              <select 
                className="w-full bg-slate-950 border border-white/10 rounded-[2rem] p-5 focus:ring-2 focus:ring-purple-500 outline-none text-white font-bold"
                value={userProfile.gender}
                onChange={(e) => setUserProfile({...userProfile, gender: e.target.value as any})}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Income Segment</label>
              <select 
                className="w-full bg-slate-950 border border-white/10 rounded-[2rem] p-5 focus:ring-2 focus:ring-purple-500 outline-none text-white font-bold"
                value={userProfile.incomeType}
                onChange={(e) => setUserProfile({...userProfile, incomeType: e.target.value as any})}
              >
                <option>Student</option>
                <option>Professional</option>
                <option>Business</option>
                <option>Freelancer</option>
              </select>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xs font-black uppercase tracking-[0.5em] text-slate-500 border-b border-white/5 pb-4">Localization Nodes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">System Language</label>
              <select 
                className="w-full bg-slate-950 border border-white/10 rounded-[2rem] p-5 focus:ring-2 focus:ring-purple-500 outline-none text-white font-bold"
                value={userProfile.language}
                onChange={(e) => setUserProfile({...userProfile, language: e.target.value as Language})}
              >
                <option value={Language.EN}>English (Global)</option>
                <option value={Language.HI}>Hindi (India)</option>
                <option value={Language.ES}>Spanish (International)</option>
                <option value={Language.FR}>French (Europe)</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Operating Region</label>
              <select 
                className="w-full bg-slate-950 border border-white/10 rounded-[2rem] p-5 focus:ring-2 focus:ring-purple-500 outline-none text-white font-bold"
                value={userProfile.country}
                onChange={(e) => {
                   const country = e.target.value;
                   let currency = Currency.USD;
                   if (country === 'India') currency = Currency.INR;
                   setUserProfile({...userProfile, country, currency});
                }}
              >
                <option>United States</option>
                <option>India</option>
                <option>United Kingdom</option>
                <option>France</option>
              </select>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 italic ml-4">
            Note: Currency selection is automated based on region ({userProfile.currency}).
          </p>
        </section>

        <button 
          onClick={onBack}
          className="w-full py-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-[2.5rem] font-black text-white uppercase tracking-[0.5em] text-xs shadow-3xl hover:scale-[1.01] transition-all"
        >
          Synchronize Neural Profile
        </button>
      </div>
    </div>
  );
};

export default Settings;
