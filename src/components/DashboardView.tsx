import React from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  ChevronRight, 
  Scan, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight,
  ExternalLink,
  Lock,
  PhoneCall,
  Sparkles,
  Info
} from 'lucide-react';
import { Language, TabType, SecurityCheckItem, RecentActivity } from '../types/security';
import { translations } from '../data/translations';

interface DashboardViewProps {
  lang: Language;
  securityScore: number;
  checklist: SecurityCheckItem[];
  activities: RecentActivity[];
  onToggleCheckItem: (id: string) => void;
  onNavigateTab: (tab: TabType) => void;
  onOpenReport: () => void;
  onRunScan: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  lang,
  securityScore,
  checklist,
  activities,
  onToggleCheckItem,
  onNavigateTab,
  onOpenReport,
  onRunScan,
}) => {
  const t = translations[lang];

  // Circle meter calculations
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (securityScore / 100) * circumference;

  const getScoreColor = () => {
    if (securityScore >= 80) return { stroke: '#10b981', text: 'text-emerald-400', label: t.scoreExcellent, bg: 'bg-emerald-500/10 border-emerald-500/20' };
    if (securityScore >= 60) return { stroke: '#06b6d4', text: 'text-cyan-400', label: t.scoreGood, bg: 'bg-cyan-500/10 border-cyan-500/20' };
    return { stroke: '#f43f5e', text: 'text-rose-400', label: t.scoreDanger, bg: 'bg-rose-500/10 border-rose-500/20' };
  };

  const scoreTheme = getScoreColor();
  const completedCount = checklist.filter((i) => i.isCompleted).length;

  return (
    <div className="space-y-6 pb-20">
      {/* Hero Munna Islam Style Cyber Security Score Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 md:p-8 shadow-2xl">
        {/* Subtle Cyber Glow Backdrops */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Circular Score Gauge */}
          <div className="flex flex-col items-center">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                {/* Track circle */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="12"
                  fill="transparent"
                />
                {/* Value circle */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke={scoreTheme.stroke}
                  strokeWidth="12"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-['Outfit',sans-serif] text-4xl font-extrabold text-white tracking-tight tabular-nums">
                  {securityScore}%
                </span>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mt-0.5">
                  {t.securityScore}
                </span>
              </div>
            </div>

            {/* Score label badge */}
            <div className={`mt-3 px-3 py-1 rounded-full border text-xs font-semibold ${scoreTheme.bg} ${scoreTheme.text} flex items-center gap-1.5`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{scoreTheme.label}</span>
            </div>
          </div>

          {/* Quick Diagnostics & Primary CTA */}
          <div className="flex-1 w-full space-y-4 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Cyber Shield Dashboard</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
                {lang === 'hi' ? 'डिवाइस सुरक्षा एवं गोपनीयता स्थिति' : 'Device Security & Privacy Health'}
              </h2>
              <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-lg">
                {lang === 'hi'
                  ? 'रियल-टाइम एंटी-फ़िशिंग शील्ड, परमिशन वॉचडॉग और UPI फ्रॉड गार्ड सक्रिय हैं।'
                  : 'Real-time anti-phishing shield, permission watchdog, and UPI fraud guard are actively monitoring.'}
              </p>
            </div>

            {/* Quick KPI stats strip */}
            <div className="grid grid-cols-3 gap-2 py-1">
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                <div className="text-lg font-bold text-emerald-400 tabular-nums">
                  {checklist.length - completedCount === 0 ? '0' : checklist.length - completedCount}
                </div>
                <div className="text-[11px] text-slate-400 truncate">
                  {lang === 'hi' ? 'बाकी सुधार' : 'Pending Fixes'}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                <div className="text-lg font-bold text-cyan-400 tabular-nums">1</div>
                <div className="text-[11px] text-slate-400 truncate">
                  {lang === 'hi' ? 'संदिग्ध ऐप' : 'Rogue App'}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                <div className="text-lg font-bold text-rose-400 tabular-nums">24</div>
                <div className="text-[11px] text-slate-400 truncate">
                  {lang === 'hi' ? 'ब्लॉक स्कैम्स' : 'Blocked Scams'}
                </div>
              </div>
            </div>

            {/* Full Device Scan CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
              <button
                onClick={onRunScan}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/50 transition-transform active:scale-95"
              >
                <Scan className="w-4 h-4" />
                <span>{t.scanDeviceBtn}</span>
              </button>

              <button
                onClick={() => onNavigateTab('privacy')}
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>{lang === 'hi' ? 'परमिशन जांचें' : 'Check Permissions'}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Cyber Fraud Quick Action Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 via-red-950/30 to-slate-900 border border-rose-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0 mt-0.5">
            <PhoneCall className="w-4 h-4 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white">
                {t.cyberCrimeHelpline}
              </h4>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 bg-rose-500/20 px-1.5 py-0.5 rounded">
                24x7 Toll Free
              </span>
            </div>
            <p className="text-xs text-rose-200/80 mt-0.5">
              {t.goldenHourTip}
            </p>
          </div>
        </div>
        <button
          onClick={onOpenReport}
          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold whitespace-nowrap shadow-md shadow-rose-950/50 transition-colors flex items-center justify-center gap-1.5"
        >
          <span>{lang === 'hi' ? 'शिकायत ड्राफ्ट करें' : 'Draft Police Complaint'}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Feature Navigation Quick Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={() => onNavigateTab('privacy')}
          className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/40 transition-all text-left group"
        >
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="text-xs text-slate-400 font-medium">Suite A</div>
          <div className="text-sm font-bold text-white mt-0.5">{lang === 'hi' ? 'गोपनीयता सुरक्षा' : 'Privacy Suite'}</div>
          <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
            <span>{lang === 'hi' ? 'कैमरा व माइक ऑडिट' : 'Camera & Mic Audit'}</span>
            <ChevronRight className="w-3 h-3 text-cyan-400 ml-auto group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('scams')}
          className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-rose-500/40 transition-all text-left group"
        >
          <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="text-xs text-slate-400 font-medium">Suite C</div>
          <div className="text-sm font-bold text-white mt-0.5">{lang === 'hi' ? 'स्कैम व फ्रॉड रडार' : 'Scam Radar'}</div>
          <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
            <span>{lang === 'hi' ? 'UPI व SMS डिटेक्टर' : 'UPI & SMS Detector'}</span>
            <ChevronRight className="w-3 h-3 text-rose-400 ml-auto group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('passwords')}
          className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/40 transition-all text-left group"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Lock className="w-5 h-5" />
          </div>
          <div className="text-xs text-slate-400 font-medium">Suite D</div>
          <div className="text-sm font-bold text-white mt-0.5">{lang === 'hi' ? 'पासवर्ड सुरक्षा' : 'Password Vault'}</div>
          <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
            <span>{lang === 'hi' ? 'क्रैक टाइम व जनरेटर' : 'Generator & Crack Time'}</span>
            <ChevronRight className="w-3 h-3 text-emerald-400 ml-auto group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('scanner')}
          className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-purple-500/40 transition-all text-left group"
        >
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Scan className="w-5 h-5" />
          </div>
          <div className="text-xs text-slate-400 font-medium">Suite B</div>
          <div className="text-sm font-bold text-white mt-0.5">{lang === 'hi' ? 'सिक्योरिटी स्कैनर' : 'Security Scanner'}</div>
          <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
            <span>{lang === 'hi' ? 'वाई-फाई व APK टेस्ट' : 'Wi-Fi & APK Scan'}</span>
            <ChevronRight className="w-3 h-3 text-purple-400 ml-auto group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>
      </div>

      {/* Account Safety Checklist (Interactive) */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white">
              {t.accountChecklistTitle}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'hi'
                ? 'इन सुरक्षा कार्यों को पूरा करके अपना स्कोर 100% तक बढ़ाएं'
                : 'Complete these essential actions to raise your score to 100%'}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-cyan-400 tabular-nums">
              {completedCount} / {checklist.length}
            </div>
            <div className="text-[10px] text-slate-500 uppercase">
              {lang === 'hi' ? 'सत्यापित' : 'Completed'}
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          {checklist.map((item) => (
            <div
              key={item.id}
              onClick={() => onToggleCheckItem(item.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                item.isCompleted
                  ? 'bg-slate-950/40 border-slate-800/80 opacity-75'
                  : 'bg-slate-950 border-slate-700/80 hover:border-cyan-500/50'
              }`}
            >
              <button
                type="button"
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  item.isCompleted
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'border-2 border-slate-600 hover:border-cyan-400'
                }`}
              >
                {item.isCompleted && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-sm font-semibold ${item.isCompleted ? 'text-slate-300 line-through' : 'text-white'}`}>
                    {lang === 'hi' ? item.titleHi : item.titleEn}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                    item.severity === 'critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                    item.severity === 'high' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    'bg-slate-800 text-slate-400'
                  }`}>
                    +{item.scoreWeight}% Score
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === 'hi' ? item.descHi : item.descEn}
                </p>
              </div>

              <div className="shrink-0 self-center">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
                  item.isCompleted ? 'text-emerald-400 bg-emerald-500/10' : 'text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20'
                }`}>
                  {lang === 'hi' ? item.actionLabelHi : item.actionLabelEn}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Security Activity Timeline */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white">
              {t.recentActivityTitle}
            </h3>
          </div>
          <span className="text-xs text-slate-500">Live Guard Feed</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {activities.map((act) => (
            <div key={act.id} className="py-3 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  act.type === 'blocked' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                  act.type === 'warning' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                  act.type === 'fixed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                  'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                }`}>
                  {act.type === 'blocked' && <ShieldAlert className="w-4 h-4" />}
                  {act.type === 'warning' && <AlertTriangle className="w-4 h-4" />}
                  {act.type === 'fixed' && <CheckCircle2 className="w-4 h-4" />}
                  {act.type === 'audit' && <Lock className="w-4 h-4" />}
                </div>
                <span className="text-slate-300 font-medium truncate">
                  {lang === 'hi' ? act.titleHi : act.titleEn}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 whitespace-nowrap shrink-0">
                {act.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
