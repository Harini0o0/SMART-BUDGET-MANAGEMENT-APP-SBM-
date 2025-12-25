
import React, { useState, useRef, useEffect } from 'react';
import { UserProfile } from '../types';
import { getFinancialAdvice, speakAdvice } from '../services/gemini';

interface AIAdvisorProps {
  t: any;
  userProfile: UserProfile;
  onBack: () => void;
  initialQuery?: string;
}

const AIAdvisor: React.FC<AIAdvisorProps> = ({ t, userProfile, onBack, initialQuery }) => {
  const [query, setQuery] = useState(initialQuery || '');
  const [advice, setAdvice] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      handleAsk(undefined, initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = userProfile.language === 'en' ? 'en-US' : userProfile.language === 'hi' ? 'hi-IN' : 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
        handleAsk(undefined, transcript);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, [userProfile.language]);

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("Voice interaction not supported in this environment.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleAsk = async (e?: React.FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault();
    const promptToUse = customPrompt || query;
    if (!promptToUse.trim()) return;

    setLoading(true);
    try {
      const res = await getFinancialAdvice(promptToUse, userProfile);
      setAdvice(res || "Analysis complete. Recommendation unavailable.");
      if (!customPrompt) setQuery('');
    } catch (err) {
      setAdvice("Security bypass detected. Neural link error.");
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = async () => {
    if (!advice || isSpeaking) return;
    setIsSpeaking(true);
    try {
      await speakAdvice(advice);
    } finally {
      setIsSpeaking(false);
    }
  };

  const presets = [
    { 
      title: "Risky Decision Alert", 
      prompt: "I am considering using my reserved School Fee funds for a luxury expense. Analyze the risk." 
    },
    { 
      title: "Stabilization Plan", 
      prompt: "I have just faced a job loss. Create a 6-month financial stabilization plan." 
    },
    { 
      title: "Wealth Recovery", 
      prompt: "My savings were depleted by a recent emergency. Suggest a recovery timeline." 
    }
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-right-8 duration-500 pb-32">
      <button onClick={onBack} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors">
        <i className="fas fa-arrow-left"></i>
        Return to Dashboard
      </button>

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400">System: Active Analytical Core</span>
            </div>
            <h2 className="text-6xl font-black tracking-tighter bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
              Preventive Neural Advisor
            </h2>
            <p className="text-slate-400 text-xl font-light leading-relaxed max-w-2xl">
              "Providing authoritarian guidance on locked funds and emergency recovery."
            </p>
          </div>
          <div className="purple-glass p-8 rounded-[3rem] border border-purple-500/20 flex flex-col items-center justify-center text-center group">
            <div className="relative mb-4">
              <svg className="w-32 h-32 -rotate-90">
                <circle cx="64" cy="64" r="58" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-900" />
                <circle cx="64" cy="64" r="58" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="364.4" strokeDashoffset="43" className="text-purple-500" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-white">88%</span>
              </div>
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500">Stability Score</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            {presets.map((p, i) => (
              <button 
                key={i} 
                onClick={() => {
                  setQuery(p.prompt);
                  handleAsk(undefined, p.prompt);
                }}
                className="px-8 py-4 bg-purple-500/5 hover:bg-purple-600 border border-purple-500/20 rounded-[1.5rem] text-[10px] font-black transition-all uppercase tracking-[0.25em] shadow-xl shadow-purple-950/20 text-slate-300 hover:text-white"
              >
                {p.title}
              </button>
            ))}
          </div>

          <form onSubmit={handleAsk} className="relative flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full group">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about withdrawal risks, locked funds, or emergency plans..."
                className="w-full bg-slate-900/90 border border-purple-500/20 rounded-[3rem] py-8 pl-12 pr-24 focus:outline-none focus:ring-4 focus:ring-purple-500/20 text-xl shadow-3xl transition-all font-light"
              />
              <button 
                type="button"
                onClick={handleVoiceInput}
                className={`absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-red-500 text-white animate-pulse shadow-2xl shadow-red-500/40' : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/20'}`}
              >
                <i className={`fas ${isListening ? 'fa-waveform' : 'fa-microphone-alt'} text-xl`}></i>
              </button>
            </div>
            <button 
              disabled={loading}
              className="w-full md:w-auto px-16 h-[88px] bg-gradient-to-r from-purple-600 to-fuchsia-700 hover:from-purple-500 hover:to-fuchsia-600 disabled:from-slate-800 disabled:to-slate-900 text-white rounded-[3rem] font-black transition-all shadow-2xl shadow-purple-500/30 flex items-center justify-center gap-4 uppercase tracking-[0.4em] text-sm"
            >
              {loading ? <i className="fas fa-circle-notch animate-spin text-2xl"></i> : 'Execute Analysis'}
            </button>
          </form>

          {advice && (
            <div className="purple-glass p-12 rounded-[4rem] border border-purple-500/20 animate-in fade-in zoom-in duration-1000 relative group overflow-hidden">
               <div className="absolute top-12 right-12 flex gap-4">
                 <button 
                    onClick={handleSpeak}
                    disabled={isSpeaking}
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-3xl ${isSpeaking ? 'bg-purple-600 text-white animate-pulse' : 'bg-white/5 text-purple-300 hover:bg-white/10 hover:text-white border border-white/5'}`}
                  >
                    <i className={`fas ${isSpeaking ? 'fa-waveform-path' : 'fa-volume-up'} text-2xl`}></i>
                  </button>
               </div>
              <div className="mb-10 flex items-center gap-4">
                <div className="w-10 h-1 bg-purple-500 rounded-full"></div>
                <span className="text-xs font-black uppercase tracking-[0.6em] text-purple-400">Neural Intelligence Synthesis</span>
              </div>
              <div className="prose prose-invert max-w-none text-slate-100 leading-relaxed whitespace-pre-wrap text-2xl font-light tracking-tight">
                {advice.split('\n').map((line, idx) => {
                  if (line.toUpperCase().includes('RISK') || line.toUpperCase().includes('WARNING')) return <div key={idx} className="text-red-400 font-black mb-6 border-l-4 border-red-500 pl-6 py-2 bg-red-500/5 rounded-r-2xl">{line}</div>;
                  if (line.toUpperCase().includes('RECOVERY') || line.toUpperCase().includes('RESTORATION')) return <div key={idx} className="text-emerald-400 font-black mt-10 mb-6 border-l-4 border-emerald-500 pl-6 py-2 bg-emerald-500/5 rounded-r-2xl">{line}</div>;
                  return <p key={idx} className="mb-4 opacity-90">{line}</p>;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAdvisor;
