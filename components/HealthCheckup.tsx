
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface HealthCheckupProps {
  t: any;
  userProfile: UserProfile;
  onBack: () => void;
}

const HealthCheckup: React.FC<HealthCheckupProps> = ({ t, userProfile, onBack }) => {
  const [medicalExpenses, setMedicalExpenses] = useState([
    { id: 1, name: 'General Checkup', amount: 50, date: '2025-05-10' },
    { id: 2, name: 'Medicines', amount: 25, date: '2025-05-12' },
  ]);

  const [newItem, setNewItem] = useState({ name: '', amount: '' });

  const total = medicalExpenses.reduce((acc, item) => acc + item.amount, 0);

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.amount) return;
    setMedicalExpenses([...medicalExpenses, {
      id: Date.now(),
      name: newItem.name,
      amount: Number(newItem.amount),
      date: new Date().toISOString().split('T')[0]
    }]);
    setNewItem({ name: '', amount: '' });
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: userProfile.currency,
    }).format(userProfile.currency === 'INR' ? val * 83 : val);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-8 duration-500 max-w-4xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors">
        <i className="fas fa-arrow-left"></i>
        Back to Suite
      </button>

      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-red-500/20 rounded-full mx-auto flex items-center justify-center mb-4">
          <i className="fas fa-heartbeat text-3xl text-red-500"></i>
        </div>
        <h2 className="text-4xl font-bold mb-4">{t.healthTitle}</h2>
        <p className="text-slate-400">Track and optimize your health-related expenditures to ensure medical security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="purple-glass p-8 rounded-[2.5rem] border border-white/5">
            <h3 className="text-xl font-bold mb-6">Recent Medical Expenses</h3>
            <div className="space-y-4">
              {medicalExpenses.map(item => (
                <div key={item.id} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.date}</p>
                  </div>
                  <p className="text-xl font-bold text-red-400">{formatCurrency(item.amount)}</p>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={addItem} className="purple-glass p-8 rounded-[2.5rem] border border-white/5">
            <h3 className="text-xl font-bold mb-6">Add New Expense</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="text" 
                placeholder="Expense Name (e.g. Dentist)" 
                className="flex-1 bg-slate-900 border border-white/10 rounded-xl p-3"
                value={newItem.name}
                onChange={e => setNewItem({...newItem, name: e.target.value})}
              />
              <input 
                type="number" 
                placeholder="Amount" 
                className="w-full md:w-32 bg-slate-900 border border-white/10 rounded-xl p-3"
                value={newItem.amount}
                onChange={e => setNewItem({...newItem, amount: e.target.value})}
              />
              <button className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-xl font-bold transition-all">
                Add
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <div className="purple-glass p-8 rounded-[2.5rem] border border-white/5 text-center">
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Total Monthly Medical</p>
            <p className="text-4xl font-bold text-red-400">{formatCurrency(total)}</p>
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-sm text-slate-400">
                {total > 100 ? "Warning: Medical spending is higher than average." : "Your medical budget is healthy."}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-900/40 to-slate-900 p-8 rounded-[2.5rem] border border-red-500/20">
            <h4 className="font-bold mb-3 flex items-center gap-2">
              <i className="fas fa-shield-alt text-red-400"></i>
              Medical Reserve
            </h4>
            <p className="text-sm text-slate-300">We recommend keeping at least {formatCurrency(500)} in an emergency health fund.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthCheckup;
