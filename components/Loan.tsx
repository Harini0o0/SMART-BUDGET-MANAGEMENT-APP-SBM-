
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface LoanProps {
  t: any;
  userProfile: UserProfile;
  onBack: () => void;
  onFeatureSelect: (feature: any) => void;
}

const Loan: React.FC<LoanProps> = ({ t, userProfile, onBack, onFeatureSelect }) => {
  const [loans] = useState([
    { 
      id: '1', 
      lender: 'Standard Chartered', 
      type: 'Personal', 
      principal: 50000, 
      interestRate: 8.5, 
      paid: 12000, 
      monthlyImpact: 12, 
      status: 'On Track',
      statusColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-500/30'
    },
    { 
      id: '2', 
      lender: 'Chase Luxury Card', 
      type: 'Credit Line', 
      principal: 15000, 
      interestRate: 14.2, 
      paid: 2500, 
      monthlyImpact: 8, 
      status: 'On Track',
      statusColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-500/30'
    },
    { 
      id: '3', 
      lender: 'Global Education Fund', 
      type: 'Student Loan', 
      principal: 35000, 
      interestRate: 4.5, 
      paid: 5000, 
      monthlyImpact: 5, 
      status: 'At Risk',
      statusColor: 'text-amber-400 bg-amber-400/10 border-amber-500/30',
      warning: 'Upcoming payment exceeds disposable income forecast.'
    },
    { 
      id: '4', 
      lender: 'HDFC Mortgage', 
      type: 'Home Loan', 
      principal: 450000, 
      interestRate: 7.2, 
      paid: 85000, 
      monthlyImpact: 25, 
      status: 'On Track',
      statusColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-500/30'
    },
    { 
      id: '5', 
      lender: 'Tesla Finance', 
      type: 'Auto Loan', 
      principal: 65000, 
      interestRate: 3.9, 
      paid: 65000, 
      monthlyImpact: 0, 
      status: 'Settled',
      statusColor: 'text-purple-400 bg-purple-400/10 border-purple-500/30'
    },
  ]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: userProfile.currency,
    }).format(val);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-8 duration-500 max-w-4xl mx-auto pb-48">
      <button onClick={onBack} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors">
        <i className="fas fa-arrow-left"></i>
        Back to Dashboard
      </button>

      <div className="text-center mb-16">
        <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-700 rounded-[2.5rem] mx-auto flex items-center justify-center mb-8 shadow-2xl shadow-blue-500/30">
          <i className="fas fa-hand-holding-usd text-4xl text-white"></i>
        </div>
        <h2 className="text-5xl font-black tracking-tighter mb-4">{t.loan}</h2>
        <p className="text-slate-400 text-lg">Portfolio optimization for all active liabilities and credit facilities.</p>
      </div>

      <div className="space-y-10">
        {loans.map(loan => {
          const progress = (loan.paid / loan.principal) * 100;
          return (
            <div key={loan.id} className="purple-glass p-10 rounded-[4rem] border border-white/5 group transition-all hover:border-purple-500/30 overflow-hidden relative">
              {loan.status === 'At Risk' && (
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-500 animate-pulse"></div>
              )}
              
              <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <h3 className="text-3xl font-bold tracking-tight">{loan.lender}</h3>
                    <div className="flex gap-2">
                      <span className="text-[10px] uppercase font-black bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20 tracking-widest">{loan.type}</span>
                      <span className={`text-[10px] uppercase font-black px-3 py-1 rounded-full border tracking-widest ${loan.statusColor}`}>{loan.status}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Rate</p>
                      <p className="text-white font-bold">{loan.interestRate}% APR</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Principal</p>
                      <p className="text-white font-bold">{formatCurrency(loan.principal)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Outstanding</p>
                      <p className="text-white font-bold">{formatCurrency(loan.principal - loan.paid)}</p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-64 space-y-4">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                    <span>Fulfillment Index</span>
                    <span className="text-blue-400">{progress.toFixed(0)}%</span>
                  </div>
                  <div className="h-3 bg-slate-950 rounded-full overflow-hidden border border-white/5 shadow-inner">
                    <div className={`h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-1000 shadow-[0_0_15px_rgba(59,130,246,0.5)]`} style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              </div>

              {loan.warning && (
                <div className="mb-8 p-5 bg-amber-500/5 border border-amber-500/20 rounded-3xl flex items-center gap-4 animate-in slide-in-from-top-2">
                  <i className="fas fa-exclamation-triangle text-amber-500"></i>
                  <p className="text-xs text-amber-200 font-medium italic">Neural Alert: {loan.warning}</p>
                </div>
              )}

              {/* Neural CIBIL Impact Section */}
              <div className="bg-slate-900/40 rounded-[2.5rem] p-8 border border-white/5 relative overflow-hidden group-hover:bg-slate-900/60 transition-colors">
                <div className="absolute top-0 right-0 p-6 text-emerald-500/5 -rotate-12 translate-x-4 -translate-y-4">
                  <i className="fas fa-shield-check text-8xl"></i>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${loan.status === 'At Risk' ? 'bg-amber-500/20 text-amber-500' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    <i className={`fas ${loan.status === 'At Risk' ? 'fa-chart-line-down' : 'fa-chart-line'} text-2xl`}></i>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-500">Credit Score Logic Engine</h4>
                      <div className="h-px bg-emerald-500/20 flex-1"></div>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed font-light">
                      {loan.status === 'Settled' 
                        ? `This loan is fully settled. Maintaining this status prevents credit cooling and keeps your historic score high.` 
                        : loan.status === 'At Risk'
                        ? `Attention: Your ${userProfile.cibilScore} rating is currently VULNERABLE. A missed payment on this ${loan.type} will cause a significant neural downgrade.`
                        : `Sustaining your current repayment velocity contributes approximately +${loan.monthlyImpact} index points to your CIBIL rating per cycle.`
                      }
                    </p>
                    <button 
                      onClick={() => onFeatureSelect('ai-advisor')}
                      className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 hover:text-purple-300 transition-all flex items-center gap-2 group/btn py-2"
                    >
                      <i className="fas fa-robot text-xs"></i>
                      Consult AI for Credit Recovery
                      <i className="fas fa-arrow-right group-hover/btn:translate-x-2 transition-transform text-[8px]"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Loan;
