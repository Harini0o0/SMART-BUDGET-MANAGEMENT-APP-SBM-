
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { DEMO_UPI_IDS } from '../constants';

interface TransferProps {
  t: any;
  userProfile: UserProfile;
  onBack: () => void;
}

const Transfer: React.FC<TransferProps> = ({ t, userProfile, onBack }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !amount) return;
    setStatus('processing');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
      setRecipient('');
      setAmount('');
    }, 2000);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: userProfile.currency,
    }).format(val);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-8 duration-500 max-w-2xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors">
        <i className="fas fa-arrow-left"></i>
        Back
      </button>

      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-purple-500/20 rounded-full mx-auto flex items-center justify-center mb-4">
          <i className="fas fa-paper-plane text-3xl text-purple-400"></i>
        </div>
        <h2 className="text-4xl font-bold mb-4">{t.transfer}</h2>
        <p className="text-slate-400">Secure instant transfers using elite neural encryption.</p>
      </div>

      <div className="purple-glass p-8 rounded-[2.5rem] space-y-8">
        <form onSubmit={handleTransfer} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-slate-400 ml-2">Recipient UPI ID</label>
            <input 
              type="text" 
              className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              placeholder="vpa@bank"
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-400 ml-2">Amount</label>
            <input 
              type="number" 
              className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 text-2xl font-bold focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              placeholder="0.00"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              required
            />
          </div>
          
          <button 
            disabled={status !== 'idle'}
            className={`w-full py-5 rounded-2xl font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-3 ${status === 'success' ? 'bg-emerald-500' : 'bg-purple-600 hover:bg-purple-500'}`}
          >
            {status === 'processing' && <i className="fas fa-circle-notch animate-spin"></i>}
            {status === 'success' && <i className="fas fa-check-circle"></i>}
            {status === 'idle' ? t.sendMoney : status === 'processing' ? 'Processing...' : 'Transfer Successful'}
          </button>
        </form>

        <div className="pt-8 border-t border-white/10">
          <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-4">{t.upiId}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {DEMO_UPI_IDS.map(id => (
              <button 
                key={id}
                onClick={() => setRecipient(id)}
                className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs text-slate-300 text-left transition-all truncate"
              >
                {id}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
