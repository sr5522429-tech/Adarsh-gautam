import React, { useEffect, useState } from 'react';
import { ShieldCheck, Sparkles, Lock, ArrowRight } from 'lucide-react';
import { Language } from '../types/security';

interface SplashScreenProps {
  onDismiss: () => void;
  lang: Language;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onDismiss, lang }) => {
  const [loadStep, setLoadStep] = useState<number>(1);

  useEffect(() => {
    const t1 = setTimeout(() => setLoadStep(2), 600);
    const t2 = setTimeout(() => setLoadStep(3), 1200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-between p-6 sm:p-10 select-none cyber-grid">
      {/* Top Brand Tag */}
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-400 mt-4">
        <Sparkles className="w-3.5 h-3.5" />
        <span>CYBER DEFENSE INTELLIGENCE</span>
      </div>

      {/* Center Shield & Logo */}
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="relative">
          {/* Animated Glow Rings */}
          <div className="absolute inset-0 rounded-3xl bg-cyan-500/20 blur-2xl animate-pulse" />
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-2xl shadow-cyan-950/80">
            <ShieldCheck className="w-14 h-14 sm:w-16 sm:h-16 stroke-[1.8] text-cyan-400 animate-in zoom-in-75 duration-700" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
            {lang === 'hi' ? 'रक्षागार्ड AI' : 'RakshaGuard AI'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-sm">
            {lang === 'hi'
              ? 'गोपनीयता सुरक्षा, यूपीआई व फ़िशिंग फ्रॉड से सुरक्षा कवच'
              : 'Complete Cyber Security, Privacy Protection, and UPI Fraud Shield'}
          </p>
        </div>

        {/* Loading / Initializing Status */}
        <div className="w-64 space-y-2 pt-4">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>
              {loadStep === 1 && (lang === 'hi' ? 'सुरक्षा शील्ड सक्रिय कर रहे हैं...' : 'Initializing security shields...')}
              {loadStep === 2 && (lang === 'hi' ? 'परमिशन व सेंसर ऑडिट लोड हो रहा है...' : 'Auditing sensor & mic permissions...')}
              {loadStep >= 3 && (lang === 'hi' ? 'सिस्टम सुरक्षित व तैयार है!' : 'System armed and secured!')}
            </span>
            <span className="font-mono text-cyan-400 font-bold tabular-nums">
              {loadStep === 1 ? '35%' : loadStep === 2 ? '78%' : '100%'}
            </span>
          </div>

          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500 rounded-full"
              style={{ width: loadStep === 1 ? '35%' : loadStep === 2 ? '78%' : '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Enter App Button */}
      <div className="w-full max-w-xs space-y-3 mb-4">
        <button
          onClick={onDismiss}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-950/60 transition-transform active:scale-95"
        >
          <span>{lang === 'hi' ? 'सुरक्षा कवच प्रारंभ करें' : 'Launch Protection Shield'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
          <Lock className="w-3 h-3 text-emerald-400" />
          <span>Zero-Knowledge AES-256 Client Guard</span>
        </div>
      </div>
    </div>
  );
};
