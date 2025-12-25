
import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface EMIProps {
  t: any;
  userProfile: UserProfile;
  onBack: () => void;
}

const EMI: React.FC<EMIProps> = ({ t, userProfile, onBack }) => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [tenure, setTenure] = useState(12); // months
  const [interest, setInterest] = useState(10); // percentage
  const [emi, setEmi] = useState(0);

  useEffect(() => {
    const r = interest / 12 / 100;
    const n = tenure;
    const calcEmi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmi(isNaN(calcEmi) ? 0 : calcEmi);
  }, [loanAmount, tenure, interest]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: userProfile.currency,
    }).format(val);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-8 duration-500 max-w-4xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors">
        <i className="fas fa-arrow-left"></i>
        Back
      </button>

      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-amber-500/20 rounded-full mx-auto flex items-center justify-center mb-4">
          <i className="fas fa-calculator text-3xl text-amber-400"></i>
        </div>
        <h2 className="text-4xl font-bold mb-4">{t.emi}</h2>
        <p className="text-slate-400">Forecast your monthly commitments with real-time interest simulations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="purple-glass p-8 rounded-[2.5rem] border border-white/5 space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-bold text-slate-300">Loan Amount</label>
              <span className="text-purple-400 font-bold">{formatCurrency(loanAmount)}</span>
            </div>
            <input 
              type="range" min="1000" max="1000000" step="1000"
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              value={loanAmount}
              onChange={e => setLoanAmount(Number(e.target.value))}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-bold text-slate-300">Interest Rate (%)</label>
              <span className="text-purple-400 font-bold">{interest}%</span>
            </div>
            <input 
              type="range" min="1" max="25" step="0.5"
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              value={interest}
              onChange={e => setInterest(Number(e.target.value))}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-bold text-slate-300">Tenure (Months)</label>
              <span className="text-purple-400 font-bold">{tenure} Months</span>
            </div>
            <input 
              type="range" min="1" max="120" step="1"
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              value={tenure}
              onChange={e => setTenure(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="purple-glass p-8 rounded-[2.5rem] border border-purple-500/20 flex flex-col items-center justify-center text-center space-y-6">
          <div className="p-6 bg-purple-500/10 rounded-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-purple-400 font-bold mb-2">Monthly Installment</p>
            <p className="text-5xl font-black tracking-tighter text-white">{formatCurrency(emi)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-400">Total Payable: <b className="text-white">{formatCurrency(emi * tenure)}</b></p>
            <p className="text-slate-400">Interest Payable: <b className="text-emerald-400">{formatCurrency((emi * tenure) - loanAmount)}</b></p>
          </div>
          <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl font-bold shadow-lg shadow-purple-500/20 transition-all hover:-translate-y-1">
            Apply for Loan Refinance
          </button>
        </div>
      </div>
    </div>
  );
};

export default EMI;
