import React from 'react';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  LockKeyhole, 
  EyeOff, 
  Radar, 
  Sparkles 
} from 'lucide-react';
import { TabType, Language } from '../types/security';
import { translations } from '../data/translations';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  lang: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab, lang }) => {
  const t = translations[lang];

  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    {
      id: 'dashboard',
      label: t.tabDashboard,
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      id: 'privacy',
      label: t.tabPrivacy,
      icon: <EyeOff className="w-5 h-5" />,
    },
    {
      id: 'scanner',
      label: t.tabScanner,
      icon: <Radar className="w-5 h-5" />,
    },
    {
      id: 'scams',
      label: t.tabScams,
      icon: <ShieldAlert className="w-5 h-5" />,
    },
    {
      id: 'passwords',
      label: t.tabPasswords,
      icon: <LockKeyhole className="w-5 h-5" />,
    },
    {
      id: 'monetization',
      label: t.tabPlans,
      icon: <Sparkles className="w-5 h-5" />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 px-2 py-1.5">
      <div className="max-w-md mx-auto grid grid-cols-6 gap-1 items-center">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-all duration-200 min-h-[48px] ${
                isActive
                  ? 'text-cyan-400 bg-cyan-950/40 shadow-sm shadow-cyan-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <div className="relative">
                {item.icon}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full" />
                )}
              </div>
              <span className="text-[10px] font-medium tracking-tight mt-1 truncate max-w-full">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
