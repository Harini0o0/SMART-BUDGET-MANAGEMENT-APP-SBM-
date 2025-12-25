
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface GroceryComparisonProps {
  t: any;
  userProfile: UserProfile;
  onBack: () => void;
}

const GroceryComparison: React.FC<GroceryComparisonProps> = ({ t, userProfile, onBack }) => {
  const [items] = useState([
    { name: 'Potatoes (1kg)', prices: { 'DMart': 22, 'Big Bazaar': 28, 'Local': 30, 'Amazon': 35 }, best: 'DMart' },
    { name: 'Milk (1L)', prices: { 'DMart': 55, 'Big Bazaar': 54, 'Local': 60, 'Amazon': 62 }, best: 'Big Bazaar' },
    { name: 'Rice (5kg)', prices: { 'DMart': 450, 'Big Bazaar': 480, 'Local': 500, 'Amazon': 420 }, best: 'Amazon' },
  ]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: userProfile.currency,
    }).format(userProfile.currency === 'USD' ? val / 83 : val);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
      <button onClick={onBack} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors">
        <i className="fas fa-arrow-left"></i>
        Back to Suite
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{t.groceryTitle}</h2>
          <p className="text-slate-400">Automated price scouting for daily essentials to cut your cost of living by 25%.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {['DMart', 'Big Bazaar', 'Local Market', 'Amazon Fresh'].map((store, i) => (
            <div key={i} className="purple-glass p-4 rounded-2xl text-center border border-white/5">
              <span className="text-xs uppercase tracking-widest text-slate-500 font-bold block mb-2">Partner</span>
              <h5 className="font-bold">{store}</h5>
            </div>
          ))}
        </div>

        <div className="purple-glass rounded-[2.5rem] overflow-hidden border border-white/5">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5">
                <th className="p-6 font-bold text-slate-300">Essential Item</th>
                <th className="p-6 font-bold text-slate-300 text-right">Best Price</th>
                <th className="p-6 font-bold text-slate-300">Store</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {items.map((item, i) => (
                <tr key={i} className="group hover:bg-white/5 transition-colors">
                  <td className="p-6 font-medium">{item.name}</td>
                  <td className="p-6 text-right font-bold text-emerald-400">
                    {formatCurrency(item.prices[item.best as keyof typeof item.prices])}
                  </td>
                  <td className="p-6">
                    <span className="px-4 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider">
                      {item.best}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 p-6 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-3xl border border-purple-500/20">
          <h4 className="font-bold mb-2 flex items-center gap-2">
            <i className="fas fa-cart-arrow-down text-purple-400"></i>
            Total Basket Savings
          </h4>
          <p className="text-sm text-slate-300">By following these suggestions, you saved <span className="text-emerald-400 font-bold">{formatCurrency(125)}</span> this week.</p>
        </div>
      </div>
    </div>
  );
};

export default GroceryComparison;
