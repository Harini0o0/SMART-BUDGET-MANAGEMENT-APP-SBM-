
import React, { useState } from 'react';
import { UserProfile, TransactionRecord } from '../types';
import { MOCK_HISTORY } from '../constants';

interface TransactionProps {
  t: any;
  userProfile: UserProfile;
  onBack: () => void;
}

const Transaction: React.FC<TransactionProps> = ({ t, userProfile, onBack }) => {
  const [transactions, setTransactions] = useState<TransactionRecord[]>(MOCK_HISTORY as any);
  const [activeTab, setActiveTab] = useState<'all' | 'income' | 'expense'>('all');
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ category: '', amount: '', description: '', type: 'expense' });
  const [aiAlert, setAiAlert] = useState<{msg: string, riskLevel: 'high' | 'medium' } | null>(null);

  const filtered = transactions.filter(tr => activeTab === 'all' || tr.type === activeTab);

  const checkAiRisk = (type: string, category: string, amount: number) => {
    const cat = category.toLowerCase();
    
    // Luxury/High Amount check
    if (type === 'expense' && amount > userProfile.income * 0.15) {
      return { 
        msg: "High Liquidity Drain: This expense exceeds 15% of your income. Neural forecast shows potential savings instability for the next 3 months.", 
        riskLevel: 'medium' 
      };
    }
    
    // Misuse of Essential Funds check
    if (cat.includes('fee') || cat.includes('college') || cat.includes('school')) {
      return { 
        msg: "Critical Warning: You are using Academic Reserves. This misuse will cause a projected tuition shortage. Recovery plan required.", 
        riskLevel: 'high' 
      };
    }
    if (cat.includes('emi') || cat.includes('loan') || cat.includes('mortgage')) {
      return { 
        msg: "Liability Alert: Attempting to reallocate EMI funds. This increases the risk of credit score degradation and penalty fees.", 
        riskLevel: 'high' 
      };
    }
    if (cat.includes('med') || cat.includes('health') || cat.includes('hosp')) {
      return { 
        msg: "Safety Net Breach: Withdrawing from Medical Reserves. This reduces your emergency resilience index below recommended levels.", 
        riskLevel: 'high' 
      };
    }
    
    return null;
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !formData.amount) return;

    const risk = checkAiRisk(formData.type, formData.category, Number(formData.amount));
    if (risk && !aiAlert) {
      setAiAlert(risk as any);
      return; 
    }

    const newTr: TransactionRecord = {
      id: Date.now().toString(),
      type: formData.type as any,
      category: formData.category,
      amount: Number(formData.amount),
      date: new Date().toISOString().split('T')[0],
      description: formData.description
    };
    setTransactions([newTr, ...transactions]);
    setIsAdding(false);
    setAiAlert(null);
    setFormData({ category: '', amount: '', description: '', type: 'expense' });
  };

  const handleOverride = () => {
    if (window.confirm("Are you sure you want to proceed despite the risks?")) {
      setAiAlert(null);
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: userProfile.currency,
    }).format(val);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-8 duration-500 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors">
          <i className="fas fa-arrow-left"></i>
          Back
        </button>
        <button onClick={() => {
          setIsAdding(!isAdding);
          setAiAlert(null);
        }} className="px-8 py-3 bg-purple-600 rounded-[1.5rem] font-black hover:bg-purple-500 transition-all shadow-xl shadow-purple-500/20 uppercase tracking-widest text-xs">
          {isAdding ? 'Cancel Entry' : t.addTransaction}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="purple-glass p-10 rounded-[3rem] border border-white/10 space-y-6 animate-in zoom-in-95 duration-500">
          {aiAlert && (
            <div className={`p-8 rounded-3xl border animate-pulse ${aiAlert.riskLevel === 'high' ? 'bg-red-500/10 border-red-500/30' : 'bg-amber-500/10 border-amber-500/30'}`}>
              <div className={`flex items-center gap-4 mb-3 font-black uppercase tracking-[0.2em] text-sm ${aiAlert.riskLevel === 'high' ? 'text-red-400' : 'text-amber-400'}`}>
                <i className="fas fa-shield-virus text-xl"></i>
                Neural Warning: Stability Breach
              </div>
              <p className="text-slate-200 text-lg font-light leading-relaxed">{aiAlert.msg}</p>
              <div className="mt-6 flex gap-4">
                <button 
                  type="button"
                  onClick={handleOverride}
                  className="px-6 py-2 bg-white/10 rounded-xl text-xs font-bold hover:bg-white/20"
                >
                  I Understand Risks, Override
                </button>
                <button 
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-6 py-2 bg-purple-600 rounded-xl text-xs font-bold"
                >
                  Cancel Transaction
                </button>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Type</label>
              <select 
                className="w-full bg-slate-900 border border-white/10 rounded-[1.5rem] p-4 focus:ring-2 focus:ring-purple-500 outline-none"
                value={formData.type}
                onChange={e => {
                  setFormData({...formData, type: e.target.value});
                  setAiAlert(null);
                }}
              >
                <option value="expense">{t.expense}</option>
                <option value="income">{t.income}</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Category (Triggers Intelligence)</label>
              <input 
                type="text" placeholder="EMI, Education, Medical, etc." 
                className="w-full bg-slate-900 border border-white/10 rounded-[1.5rem] p-4 focus:ring-2 focus:ring-purple-500 outline-none"
                value={formData.category}
                onChange={e => {
                  setFormData({...formData, category: e.target.value});
                  setAiAlert(null);
                }}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Monetary Value</label>
              <input 
                type="number" placeholder="0.00" 
                className="w-full bg-slate-900 border border-white/10 rounded-[1.5rem] p-4 focus:ring-2 focus:ring-purple-500 outline-none text-xl font-bold"
                value={formData.amount}
                onChange={e => {
                  setFormData({...formData, amount: e.target.value});
                  setAiAlert(null);
                }}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Description</label>
              <input 
                type="text" placeholder="Context for the AI assistant..." 
                className="w-full bg-slate-900 border border-white/10 rounded-[1.5rem] p-4 focus:ring-2 focus:ring-purple-500 outline-none"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>
          <button className="w-full py-5 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-[2rem] font-black text-white hover:shadow-2xl hover:shadow-purple-500/30 transition-all uppercase tracking-[0.3em] text-sm">
            {aiAlert ? 'Authorize Risk' : 'Secure Entry'}
          </button>
        </form>
      )}

      <div className="flex gap-4 p-2 bg-white/5 rounded-[2rem] w-fit border border-white/5">
        {['all', 'income', 'expense'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-8 py-3 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-purple-600 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="purple-glass p-8 rounded-[2.5rem] flex items-center justify-between hover:bg-white/10 transition-all group border border-white/5">
            <div className="flex items-center gap-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl ${item.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                <i className={`fas ${item.type === 'income' ? 'fa-plus-circle' : 'fa-minus-circle'}`}></i>
              </div>
              <div>
                <h4 className="font-bold text-xl">{item.category}</h4>
                <p className="text-sm text-slate-500 mt-1">{item.date} • {item.description}</p>
              </div>
            </div>
            <div className={`text-2xl font-black ${item.type === 'income' ? 'text-emerald-400' : 'text-slate-200 group-hover:text-white'}`}>
              {item.type === 'income' ? '+' : '-'}{formatCurrency(item.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transaction;
