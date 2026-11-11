/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Wifi, 
  Battery, 
  Signal, 
  User, 
  Sparkles, 
  ShieldCheck, 
  Monitor, 
  Smartphone,
  PhoneCall,
  Lock,
  Layers,
  ChevronRight
} from 'lucide-react';
import { Language, TabType, SecurityCheckItem, RecentActivity } from './types/security';
import { initialSecurityChecklist, initialActivities } from './data/mockSecurityData';
import { translations } from './data/translations';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { PrivacyProtectionView } from './components/PrivacyProtectionView';
import { SecurityScannerView } from './components/SecurityScannerView';
import { ScamDetectionView } from './components/ScamDetectionView';
import { PasswordSecurityView } from './components/PasswordSecurityView';
import { MonetizationView } from './components/MonetizationView';
import { ReportScamModal } from './components/ReportScamModal';
import { TechArchitectureModal } from './components/TechArchitectureModal';
import { SplashScreen } from './components/SplashScreen';
import { AuthModal } from './components/AuthModal';

export default function App() {
  const [lang, setLang] = useState<Language>('hi');
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(true);
  const [showSplash, setShowSplash] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [showTechModal, setShowTechModal] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  const [user, setUser] = useState<{ name: string; phone: string; isPro: boolean } | null>({
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    isPro: true,
  });

  const [checklist, setChecklist] = useState<SecurityCheckItem[]>(initialSecurityChecklist);
  const [activities, setActivities] = useState<RecentActivity[]>(initialActivities);

  const t = translations[lang];

  // Dynamic Security Score Calculation
  const calculateTotalScore = () => {
    let score = 25; // baseline
    checklist.forEach((item) => {
      if (item.isCompleted) {
        score += item.scoreWeight;
      }
    });
    return Math.min(score, 100);
  };

  const securityScore = calculateTotalScore();

  // Toggle checklist item
  const handleToggleCheckItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const nextState = !item.isCompleted;

        // Add to activities feed
        if (nextState) {
          const newAct: RecentActivity = {
            id: `act_${Date.now()}`,
            type: 'fixed',
            titleEn: `Completed security check: ${item.titleEn}`,
            titleHi: `सुरक्षा कार्य पूरा किया: ${item.titleHi}`,
            time: 'Just now',
            icon: 'CheckCircle2',
          };
          setActivities((a) => [newAct, ...a.slice(0, 5)]);
        }

        return { ...item, isCompleted: nextState };
      })
    );
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardView
            lang={lang}
            securityScore={securityScore}
            checklist={checklist}
            activities={activities}
            onToggleCheckItem={handleToggleCheckItem}
            onNavigateTab={setActiveTab}
            onOpenReport={() => setShowReportModal(true)}
            onRunScan={() => setActiveTab('scanner')}
          />
        );
      case 'privacy':
        return <PrivacyProtectionView lang={lang} />;
      case 'scanner':
        return <SecurityScannerView lang={lang} />;
      case 'scams':
        return (
          <ScamDetectionView
            lang={lang}
            onOpenReport={() => setShowReportModal(true)}
          />
        );
      case 'passwords':
        return <PasswordSecurityView lang={lang} />;
      case 'monetization':
        return <MonetizationView lang={lang} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Splash Screen */}
      {showSplash && (
        <SplashScreen
          onDismiss={() => setShowSplash(false)}
          lang={lang}
        />
      )}

      {/* Global Application Header */}
      <Header
        lang={lang}
        onToggleLang={() => setLang(lang === 'hi' ? 'en' : 'hi')}
        isMobileFrame={isMobileFrame}
        onToggleFrame={() => setIsMobileFrame(!isMobileFrame)}
        onOpenReport={() => setShowReportModal(true)}
        onOpenTech={() => setShowTechModal(true)}
      />

      {/* Quick Secondary Utility Bar for Demo Actions */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs flex-wrap">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-slate-300">
              {t.protectionActive} · {lang === 'hi' ? 'स्कोर:' : 'Score:'} <strong className="text-emerald-400 tabular-nums">{securityScore}%</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* User Account Trigger */}
            <button
              onClick={() => setShowAuthModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span>{user ? user.name : (lang === 'hi' ? 'लॉगिन' : 'Sign In')}</span>
            </button>

            {/* Replay Splash Trigger */}
            <button
              onClick={() => setShowSplash(true)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors hidden sm:inline-block"
            >
              {lang === 'hi' ? 'स्प्लैश स्क्रीन देखें' : 'View Splash'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area: Switchable between Mobile Mockup Bezel and Full Widescreen Layout */}
      <main className="flex-1 flex items-center justify-center p-2 sm:p-6 md:p-8">
        {isMobileFrame ? (
          /* ================= Realistic Mobile Device Container (Munna Islam Dribbble Style) ================= */
          <div className="relative w-full max-w-[420px] h-[860px] bg-slate-950 rounded-[48px] border-[10px] border-slate-800/90 shadow-[0_0_60px_-15px_rgba(6,182,212,0.3)] overflow-hidden flex flex-col transition-all">
            {/* Dynamic Island / Top Speaker Notch */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-center pointer-events-none">
              <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-800 ml-auto mr-3" />
            </div>

            {/* Mobile Status Bar (9:41, Icons) */}
            <div className="pt-3 px-6 pb-2 flex items-center justify-between text-[11px] font-semibold text-slate-400 select-none z-40 bg-slate-950/80 backdrop-blur-md">
              <span className="font-mono">9:41</span>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Signal className="w-3 h-3 text-slate-300" />
                <Wifi className="w-3 h-3 text-slate-300" />
                <Battery className="w-4 h-4 text-emerald-400" />
              </div>
            </div>

            {/* Scrollable Mobile Body */}
            <div className="flex-1 overflow-y-auto px-4 pt-2 pb-24 scrollbar-none">
              {renderActiveView()}
            </div>

            {/* Fixed Mobile Bottom Nav */}
            <BottomNav
              activeTab={activeTab}
              onSelectTab={setActiveTab}
              lang={lang}
            />
          </div>
        ) : (
          /* ================= Full Responsive Desktop Container ================= */
          <div className="w-full max-w-6xl mx-auto">
            {/* Desktop Navigation Tabs Bar */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 mb-6 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === 'dashboard' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.tabDashboard}
              </button>
              <button
                onClick={() => setActiveTab('privacy')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === 'privacy' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.tabPrivacy}
              </button>
              <button
                onClick={() => setActiveTab('scanner')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === 'scanner' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.tabScanner}
              </button>
              <button
                onClick={() => setActiveTab('scams')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === 'scams' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.tabScams}
              </button>
              <button
                onClick={() => setActiveTab('passwords')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === 'passwords' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.tabPasswords}
              </button>
              <button
                onClick={() => setActiveTab('monetization')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === 'monetization' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.tabPlans}
              </button>
            </div>

            {/* Desktop View Render */}
            {renderActiveView()}
          </div>
        )}
      </main>

      {/* Floating Emergency Helpline Button (Always Accessible on Desktop) */}
      {!isMobileFrame && (
        <button
          onClick={() => setShowReportModal(true)}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs flex items-center gap-2 shadow-2xl shadow-rose-950/80 transition-transform active:scale-95"
        >
          <PhoneCall className="w-4 h-4 animate-bounce" />
          <span>{lang === 'hi' ? 'साइबर फ्रॉड हेल्पलाइन 1930' : 'Emergency Helpline 1930'}</span>
        </button>
      )}

      {/* Modals */}
      <ReportScamModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        lang={lang}
      />

      <TechArchitectureModal
        isOpen={showTechModal}
        onClose={() => setShowTechModal(false)}
        lang={lang}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        lang={lang}
        user={user}
        onLogin={(userData) => setUser(userData)}
        onLogout={() => setUser(null)}
      />
    </div>
  );
}
