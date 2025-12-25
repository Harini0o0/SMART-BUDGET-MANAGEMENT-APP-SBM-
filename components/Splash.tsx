
import React from 'react';
import { APP_NAME } from '../constants';

const Splash: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center luxury-gradient splash-fade-out overflow-hidden">
      {/* Background Animated Particles */}
      <div className="absolute inset-0 opacity-10">
         <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[150px] animate-pulse"></div>
         <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600 rounded-full blur-[120px] animate-float"></div>
      </div>

      <div className="relative animate-float scale-125 md:scale-150">
        <div className="w-44 h-44 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-[3.5rem] rotate-45 flex items-center justify-center shadow-[0_0_100px_rgba(168,85,247,0.4)] border-4 border-purple-400/50">
          <i className="fas fa-gem text-7xl text-white -rotate-45 drop-shadow-2xl"></i>
        </div>
        <div className="absolute -inset-12 bg-purple-500/20 rounded-full blur-[80px] animate-pulse"></div>
      </div>
      
      <div className="mt-28 text-center px-4 relative z-10 max-w-2xl space-y-6">
        <h1 className="text-6xl font-black bg-gradient-to-b from-white via-purple-100 to-purple-400 bg-clip-text text-transparent tracking-tighter leading-tight" style={{fontFamily: 'Playfair Display'}}>
          {APP_NAME}
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto"></div>
        <p className="text-purple-400/60 tracking-[1em] uppercase text-[11px] font-black">
          Neural Wealth Intelligence
        </p>
      </div>

      <div className="absolute bottom-32 flex gap-6">
        {[0, 1, 2].map((i) => (
          <div 
            key={i} 
            className="w-2 h-2 bg-white/30 rounded-full animate-bounce" 
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default Splash;
