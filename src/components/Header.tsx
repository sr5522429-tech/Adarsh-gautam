import React from 'react';
import { ShieldCheck, PhoneCall, Smartphone, Monitor, Globe2, Sparkles } from 'lucide-react';
import { Language } from '../types/security';
import { translations } from '../data/translations';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  isMobileFrame: boolean;
  onToggleFrame: () => void;
  onOpenReport: () => void;
  onOpenTech: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  isMobileFrame,
  onToggleFrame,
  onOpenReport,
  onOpenTech,
}) => {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark & Shield Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 cyber-glow-cyan shrink-0">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg md:text-xl tracking-tight text-white font-['Outfit',sans-serif]">
                {t.appName}
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 hidden sm:inline-block">
                v2.6 Pro Shield
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block truncate max-w-xs md:max-w-md">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Zone 2: Navigation Utilities & Mode Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Tech Stack Spec Button */}
          <button
            onClick={onOpenTech}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
            title="View App Technology Stack"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'hi' ? 'तकनीक विवरण' : 'Tech Stack'}</span>
          </button>

          {/* Frame View Toggle (Mobile Bezel vs Full Screen) */}
          <button
            onClick={onToggleFrame}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
            title={isMobileFrame ? t.viewDesktop : t.viewMobile}
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">{t.viewDesktop}</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">{t.viewMobile}</span>
              </>
            )}
          </button>

          {/* Bilingual Language Switcher */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-cyan-400 bg-cyan-950/40 border border-cyan-800/60 hover:bg-cyan-900/40 transition-colors"
            title="Switch Language / भाषा बदलें"
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>{t.switchLang}</span>
          </button>

          {/* Zone 3: Emergency 1930 Fraud Report CTA */}
          <button
            onClick={onOpenReport}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 shadow-md shadow-rose-950/50 transition-transform active:scale-95 shrink-0"
          >
            <PhoneCall className="w-3.5 h-3.5 text-white animate-pulse" />
            <span className="hidden xs:inline">{lang === 'hi' ? 'हेल्पलाइन 1930' : 'Helpline 1930'}</span>
            <span className="xs:hidden">1930</span>
          </button>
        </div>
      </div>
    </header>
  );
};
