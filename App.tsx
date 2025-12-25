
import React, { useState, useEffect } from 'react';
import { Language, Currency, UserProfile, FeatureType } from './types';
import { LOCALES, APP_NAME } from './constants';
import Splash from './components/Splash';
import Dashboard from './components/Dashboard';
import SideIncome from './components/SideIncome';
import TicketComparison from './components/TicketComparison';
import GroceryComparison from './components/GroceryComparison';
import AIAdvisor from './components/AIAdvisor';
import Settings from './components/Settings';
import HealthCheckup from './components/HealthCheckup';
import Transaction from './components/Transaction';
import Savings from './components/Savings';
import Loan from './components/Loan';
import EMI from './components/EMI';
import Transfer from './components/Transfer';
import Reminders from './components/Reminders';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [activeFeature, setActiveFeature] = useState<FeatureType>('dashboard');
  const [featureParams, setFeatureParams] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Alex Sterling",
    gender: "Male",
    income: 75000,
    incomeType: 'Professional',
    preferences: ['Delivery', 'Stocks'],
    country: 'United States',
    language: Language.EN,
    currency: Currency.USD,
    isDarkMode: true,
    cibilScore: 785
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (userProfile.country === 'India') {
      setUserProfile(prev => ({ ...prev, currency: Currency.INR, language: Language.HI }));
    } else if (userProfile.country === 'United States') {
      setUserProfile(prev => ({ ...prev, currency: Currency.USD, language: Language.EN }));
    }
  }, [userProfile.country]);

  if (showSplash) {
    return <Splash />;
  }

  const t = LOCALES[userProfile.language] || LOCALES[Language.EN];

  const handleFeatureSelect = (feature: FeatureType, params?: any) => {
    setActiveFeature(feature);
    setFeatureParams(params || null);
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    const back = () => {
      setActiveFeature('dashboard');
      setFeatureParams(null);
    };
    switch (activeFeature) {
      case 'dashboard':
        return <Dashboard t={t} userProfile={userProfile} onFeatureSelect={handleFeatureSelect} />;
      case 'side-income':
        return <SideIncome t={t} userProfile={userProfile} onBack={back} />;
      case 'tickets':
        return <TicketComparison t={t} userProfile={userProfile} onBack={back} />;
      case 'groceries':
        return <GroceryComparison t={t} userProfile={userProfile} onBack={back} />;
      case 'ai-advisor':
        return <AIAdvisor t={t} userProfile={userProfile} onBack={back} initialQuery={featureParams?.prefill} />;
      case 'health-checkup':
        return <HealthCheckup t={t} userProfile={userProfile} onBack={back} />;
      case 'transaction':
        return <Transaction t={t} userProfile={userProfile} onBack={back} />;
      case 'savings':
        return <Savings t={t} userProfile={userProfile} onBack={back} onFeatureSelect={handleFeatureSelect} />;
      case 'loan':
        return <Loan t={t} userProfile={userProfile} onBack={back} onFeatureSelect={handleFeatureSelect} />;
      case 'emi':
        return <EMI t={t} userProfile={userProfile} onBack={back} />;
      case 'transfer':
        return <Transfer t={t} userProfile={userProfile} onBack={back} />;
      case 'reminders':
        return <Reminders t={t} userProfile={userProfile} onBack={back} />;
      case 'settings':
        return <Settings t={t} userProfile={userProfile} onBack={back} setUserProfile={setUserProfile} />;
      default:
        return <Dashboard t={t} userProfile={userProfile} onFeatureSelect={handleFeatureSelect} />;
    }
  };

  const allFeatures: { id: FeatureType; icon: string; label: string; desc: string }[] = [
    { id: 'dashboard', icon: 'fa-home', label: 'Dashboard', desc: 'Main Command Center' },
    { id: 'transaction', icon: 'fa-list-ul', label: 'Liquid Ledger', desc: 'Transaction Management' },
    { id: 'savings', icon: 'fa-vault', label: 'Sacred Reserves', desc: 'Protected Wealth Nodes' },
    { id: 'ai-advisor', icon: 'fa-robot', label: 'AI Concierge', desc: 'Neural Financial Advice' },
    { id: 'side-income', icon: 'fa-coins', label: 'Inflow Scout', desc: 'Side Earning Suggestion' },
    { id: 'loan', icon: 'fa-hand-holding-dollar', label: 'Credit Matrix', desc: 'Debt & Liability Management' },
    { id: 'groceries', icon: 'fa-shop', label: 'Market Scout', desc: 'Grocery Price Comparison' },
    { id: 'tickets', icon: 'fa-ticket', label: 'Transport Scout', desc: 'Travel Ticket Aggregator' },
    { id: 'reminders', icon: 'fa-bell', label: 'Neural Alerts', desc: 'Discipline Reminders' },
    { id: 'health-checkup', icon: 'fa-heart-pulse', label: 'Vital Reserves', desc: 'Health Fund Monitoring' },
    { id: 'emi', icon: 'fa-calculator', label: 'EMI Forecaster', desc: 'Liability Simulation' },
    { id: 'transfer', icon: 'fa-paper-plane', label: 'Wire Assets', desc: 'Instant Capital Transfer' },
    { id: 'settings', icon: 'fa-user-circle', label: 'System Hub', desc: 'Neural Profile Config' },
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 pb-20 ${userProfile.isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Sidebar Overlay */}
      <div 
        className={`fixed inset-0 z-[80] bg-slate-950/80 backdrop-blur-md transition-opacity duration-500 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Luxury Sidebar */}
      <aside className={`fixed top-0 left-0 bottom-0 z-[90] w-80 bg-slate-900 border-r border-purple-500/20 shadow-[20px_0_50px_rgba(0,0,0,0.5)] transition-transform duration-700 ease-out overflow-y-auto ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 border-b border-purple-500/10 mb-6 flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/30">
            <i className="fas fa-gem text-white text-3xl"></i>
          </div>
          <div className="text-center">
            <h2 className="text-sm font-black text-white uppercase tracking-widest italic">{APP_NAME}</h2>
            <p className="text-[10px] text-purple-400 font-bold uppercase tracking-[0.2em] mt-1">Neural Navigation</p>
          </div>
        </div>

        <nav className="px-4 space-y-2 pb-10">
          {allFeatures.map(item => (
            <button
              key={item.id}
              onClick={() => handleFeatureSelect(item.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${activeFeature === item.id ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-purple-300'}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${activeFeature === item.id ? 'border-white/20' : 'border-white/5 bg-slate-950 group-hover:border-purple-500/30'}`}>
                <i className={`fas ${item.icon} text-base`}></i>
              </div>
              <div className="text-left">
                <p className="text-xs font-black uppercase tracking-widest">{item.label}</p>
                <p className={`text-[8px] uppercase tracking-tighter opacity-60`}>{item.desc}</p>
              </div>
              {activeFeature === item.id && (
                <i className="fas fa-chevron-right ml-auto text-[10px] animate-pulse"></i>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Header */}
      <nav className="p-6 flex justify-between items-center border-b border-purple-500/20 purple-glass sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-purple-600/20 hover:border-purple-500/30 transition-all group"
          >
            <i className="fas fa-bars text-purple-400 group-hover:scale-110 transition-transform"></i>
          </button>
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleFeatureSelect('dashboard')}>
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/40">
              <i className="fas fa-gem text-white text-base"></i>
            </div>
            <h1 className="text-xl font-black bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent italic tracking-tighter uppercase hidden sm:block">
              {APP_NAME}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">Stability Index</span>
            <span className="text-emerald-400 font-bold">{userProfile.cibilScore}</span>
          </div>
          <button 
            onClick={() => handleFeatureSelect('settings')} 
            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-purple-600/20 hover:border-purple-500/30 transition-all group"
          >
            <i className="fas fa-cog text-slate-400 group-hover:text-purple-400 transition-all"></i>
          </button>
        </div>
      </nav>

      <main className="container mx-auto p-6 md:p-12">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
