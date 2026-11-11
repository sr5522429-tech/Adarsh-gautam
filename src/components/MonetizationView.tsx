import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  ShieldCheck, 
  DollarSign, 
  Building, 
  CreditCard, 
  Zap, 
  Lock,
  ArrowRight
} from 'lucide-react';
import { Language } from '../types/security';
import { monetizationPlans } from '../data/mockSecurityData';
import { translations } from '../data/translations';

interface MonetizationViewProps {
  lang: Language;
}

export const MonetizationView: React.FC<MonetizationViewProps> = ({ lang }) => {
  const t = translations[lang];
  const [selectedPlanId, setSelectedPlanId] = useState<string>('pro');
  const [isUpgraded, setIsUpgraded] = useState<boolean>(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const handleSubscribe = (planId: string) => {
    setSelectedPlanId(planId);
    if (planId === 'free') {
      setIsUpgraded(false);
    } else {
      setIsUpgraded(true);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Title & Monetization Strategy Header */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {t.monetizationTitle}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'hi'
                ? 'मुफ्त व प्रीमियम सब्सक्रिप्शन मॉडल, डार्क वेब मॉनिटरिंग और बिजनेस सेवाएं'
                : 'Freemium subscription model, dark web identity monitoring, and enterprise services'}
            </p>
          </div>
        </div>

        {/* Business Model Architecture Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === 'hi' ? '1. फ्रीमियम सब्सक्रिप्शन' : '1. Freemium Subscriptions'}</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {lang === 'hi'
                ? 'बुनियादी स्कैन मुफ्त; 24/7 डार्क वेब व असीमित AI स्कैम चेकर हेतु ₹149/माह।'
                : 'Free essential checks; ₹149/mo for 24/7 dark web alerts & unlimited AI radar.'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'hi' ? '2. प्रीमियम सिक्योरिटी रिपोर्ट्स' : '2. Cyber Insurance & Reports'}</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {lang === 'hi'
                ? 'साइबर बीमा और बैंक लोन सुरक्षा हेतु आधिकारिक डिजिटल रिस्क ऑडिट सर्टिफिकेट।'
                : 'Certified digital risk audit reports for cyber insurance & legal documentation.'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-purple-400" />
              <span>{lang === 'hi' ? '3. बिजनेस सुरक्षा (B2B)' : '3. SME Enterprise Security'}</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {lang === 'hi'
                ? 'व्यापारियों व दुकानों के लिए कर्मचारी फ़िशिंग टेस्ट और UPI मर्चेंट फ्रॉड सुरक्षा।'
                : 'Simulated employee phishing tests and merchant soundbox QR fraud guard.'}
            </p>
          </div>
        </div>
      </div>

      {/* Upgrade Success Notification */}
      {isUpgraded && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-600/40 flex items-center justify-between gap-3 cyber-glow-emerald">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <div className="text-xs font-bold text-white">
                {lang === 'hi' ? 'रक्षागार्ड प्रो सक्रिय है!' : 'RakshaGuard Pro Shield Active!'}
              </div>
              <div className="text-[11px] text-emerald-300">
                {lang === 'hi' ? '24/7 डार्क वेब ब्रीच और असीमित AI स्कैम डिटेक्शन चालू है' : '24/7 Dark Web Breach & unlimited scam radar unlocked'}
              </div>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            PRO ACTIVATED
          </span>
        </div>
      )}

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {monetizationPlans.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-6 border transition-all flex flex-col justify-between relative ${
                plan.popular
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-cyan-500/50 cyber-glow-cyan'
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider">
                  {lang === 'hi' ? plan.badge : plan.badgeEn}
                </div>
              )}

              <div>
                <div className="text-xs font-semibold text-slate-400">
                  {lang === 'hi' ? plan.name : plan.nameEn}
                </div>

                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white font-['Outfit',sans-serif] tabular-nums">
                    {plan.price}
                  </span>
                  <span className="text-xs text-slate-400">
                    {lang === 'hi' ? plan.periodHi : plan.period}
                  </span>
                </div>

                {/* Features List */}
                <div className="mt-5 space-y-2.5 pt-4 border-t border-slate-800">
                  {(lang === 'hi' ? plan.featuresHi : plan.featuresEn).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${plan.popular ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950'
                      : plan.popular
                      ? 'bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 shadow-lg shadow-cyan-950/40 hover:opacity-90'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{lang === 'hi' ? 'वर्तमान में सक्रिय' : 'Current Plan'}</span>
                    </>
                  ) : (
                    <>
                      <span>{lang === 'hi' ? 'प्लान चुनें' : 'Choose Plan'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
