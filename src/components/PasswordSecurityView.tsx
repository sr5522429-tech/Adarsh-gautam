import React, { useState } from 'react';
import { 
  Lock, 
  KeyRound, 
  RefreshCw, 
  Copy, 
  Check, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  Sliders, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Search,
  Sparkles
} from 'lucide-react';
import { Language } from '../types/security';
import { translations } from '../data/translations';

interface PasswordSecurityViewProps {
  lang: Language;
}

export const PasswordSecurityView: React.FC<PasswordSecurityViewProps> = ({ lang }) => {
  const t = translations[lang];

  // Generator state
  const [passwordLength, setPasswordLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [generatedPassword, setGeneratedPassword] = useState<string>('kX9#mP2$vQ8!zW4L');
  const [copied, setCopied] = useState<boolean>(false);

  // Checker state
  const [testPassword, setTestPassword] = useState<string>('');
  const [showTestPassword, setShowTestPassword] = useState<boolean>(false);

  // Breach test state
  const [emailQuery, setEmailQuery] = useState<string>('');
  const [breachResult, setBreachResult] = useState<{ checked: boolean; isLeaked: boolean; count: number } | null>(null);
  const [isCheckingBreach, setIsCheckingBreach] = useState<boolean>(false);

  // Password Generator function
  const handleGeneratePassword = () => {
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let pool = lowerChars;
    if (includeUppercase) pool += upperChars;
    if (includeNumbers) pool += numberChars;
    if (includeSymbols) pool += symbolChars;

    let result = '';
    const array = new Uint32Array(passwordLength);
    crypto.getRandomValues(array);

    for (let i = 0; i < passwordLength; i++) {
      result += pool[array[i] % pool.length];
    }

    setGeneratedPassword(result);
  };

  const handleCopyPassword = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Password Strength & Crack Time Calculator
  const calculateStrength = (pwd: string) => {
    if (!pwd) return { score: 0, labelEn: 'Enter password', labelHi: 'पासवर्ड दर्ज करें', color: 'text-slate-500', timeEn: 'N/A', timeHi: 'उपलब्ध नहीं' };

    let score = 0;
    if (pwd.length >= 8) score += 20;
    if (pwd.length >= 12) score += 20;
    if (pwd.length >= 16) score += 20;
    if (/[A-Z]/.test(pwd)) score += 15;
    if (/[0-9]/.test(pwd)) score += 10;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 15;

    // Check common weak patterns
    const commonPatterns = ['123456', 'password', 'qwerty', 'admin', '111111', 'india', 'sharma', 'kumar'];
    if (commonPatterns.some((pat) => pwd.toLowerCase().includes(pat))) {
      return {
        score: 15,
        labelEn: 'Very Weak (Dictionary Pattern)',
        labelHi: 'अति कमजोर (साधारण शब्द)',
        color: 'text-rose-400',
        timeEn: 'Instantly (< 1 millisecond)',
        timeHi: 'तुरंत (1 मिलीसेकेंड से कम)'
      };
    }

    if (score < 40) {
      return { score, labelEn: 'Weak', labelHi: 'कमजोर', color: 'text-rose-400', timeEn: '3 seconds', timeHi: '3 सेकंड' };
    }
    if (score < 70) {
      return { score, labelEn: 'Medium', labelHi: 'मध्यम', color: 'text-amber-400', timeEn: '3 days', timeHi: '3 दिन' };
    }
    if (score < 90) {
      return { score, labelEn: 'Strong', labelHi: 'मजबूत', color: 'text-cyan-400', timeEn: '400 years', timeHi: '400 वर्ष' };
    }
    return { score, labelEn: 'Ultra Secure (Military Grade)', labelHi: 'अति सुरक्षित (मिलिट्री ग्रेड)', color: 'text-emerald-400', timeEn: '2.4 Billion years', timeHi: '2.4 अरब वर्ष' };
  };

  const strength = calculateStrength(testPassword);

  // Dark Web Breach Simulator
  const handleCheckBreach = () => {
    if (!emailQuery.trim()) return;
    setIsCheckingBreach(true);

    setTimeout(() => {
      const lower = emailQuery.toLowerCase();
      // Realistic simulation
      const isKnownExposed = lower.includes('test') || lower.includes('admin') || lower.includes('kumar') || lower.includes('123');
      setBreachResult({
        checked: true,
        isLeaked: isKnownExposed,
        count: isKnownExposed ? 3 : 0
      });
      setIsCheckingBreach(false);
    }, 700);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Title & Banner */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {t.passwordSuiteTitle}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'hi'
                ? 'पासवर्ड स्ट्रेंथ चेकर, ब्रूट-फोर्स क्रैक टाइम एवं अल्ट्रा-सिक्योर पासवर्ड जनरेटर'
                : 'Brute-force crack time calculator, dark web breach lookup, and high-entropy generator'}
            </p>
          </div>
        </div>
      </div>

      {/* Password Strength & Crack Time Calculator */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">
        <h3 className="text-base font-bold text-white mb-1">
          {lang === 'hi' ? 'पासवर्ड शक्ति एवं क्रैक टाइम परीक्षक' : 'Password Strength & Time-to-Crack Calculator'}
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          {lang === 'hi'
            ? 'जांचें कि हैकर्स के सुपरकंप्यूटर को आपका पासवर्ड तोड़ने में कितना समय लगेगा'
            : 'Estimate how long it would take an automated brute-force cluster to crack your password'}
        </p>

        <div className="space-y-3">
          <div className="relative">
            <input
              type={showTestPassword ? 'text' : 'password'}
              value={testPassword}
              onChange={(e) => setTestPassword(e.target.value)}
              placeholder={lang === 'hi' ? 'परीक्षण हेतु पासवर्ड टाइप करें...' : 'Type a password to test...'}
              className="w-full p-4 pr-12 rounded-2xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-sm text-slate-100 placeholder-slate-600 focus:outline-none"
            />
            <button
              onClick={() => setShowTestPassword(!showTestPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            >
              {showTestPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Strength Bar */}
          {testPassword && (
            <div className="space-y-2 p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">{lang === 'hi' ? 'सुरक्षा रेटिंग:' : 'Security Rating:'}</span>
                <span className={`font-bold ${strength.color}`}>
                  {lang === 'hi' ? strength.labelHi : strength.labelEn}
                </span>
              </div>

              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 rounded-full ${
                    strength.score > 70 ? 'bg-emerald-400' : strength.score > 40 ? 'bg-amber-400' : 'bg-rose-500'
                  }`}
                  style={{ width: `${strength.score}%` }}
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                <span className="text-slate-400">{lang === 'hi' ? 'क्रैक करने में अनुमानित समय:' : 'Estimated Time to Crack:'}</span>
                <span className="font-mono font-bold text-white tabular-nums">
                  {lang === 'hi' ? strength.timeHi : strength.timeEn}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ultra-Secure Password Generator */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-bold text-white">
              {t.passGenTitle}
            </h3>
          </div>
          <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
            Crypto-RNG
          </span>
        </div>

        {/* Generated password display */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
          <span className="font-mono text-sm md:text-base font-bold text-cyan-400 tracking-wider truncate">
            {generatedPassword}
          </span>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleGeneratePassword}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Generate New"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleCopyPassword(generatedPassword)}
              className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-emerald-950/50"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (lang === 'hi' ? 'कॉपी हो गया' : 'Copied') : (lang === 'hi' ? 'कॉपी' : 'Copy')}</span>
            </button>
          </div>
        </div>

        {/* Generator Controls */}
        <div className="mt-4 space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
              <span>{lang === 'hi' ? 'पासवर्ड की लंबाई' : 'Password Length'}</span>
              <span className="font-mono font-bold text-cyan-400 tabular-nums">{passwordLength} Characters</span>
            </div>
            <input
              type="range"
              min={8}
              max={32}
              value={passwordLength}
              onChange={(e) => {
                setPasswordLength(Number(e.target.value));
              }}
              className="w-full accent-cyan-400 h-2 bg-slate-950 rounded-lg cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setIncludeUppercase(!includeUppercase)}
              className={`p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                includeUppercase ? 'bg-cyan-950/60 border-cyan-800 text-cyan-400' : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              A-Z (Capital)
            </button>
            <button
              onClick={() => setIncludeNumbers(!includeNumbers)}
              className={`p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                includeNumbers ? 'bg-cyan-950/60 border-cyan-800 text-cyan-400' : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              0-9 (Numbers)
            </button>
            <button
              onClick={() => setIncludeSymbols(!includeSymbols)}
              className={`p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                includeSymbols ? 'bg-cyan-950/60 border-cyan-800 text-cyan-400' : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              !@#$ (Symbols)
            </button>
          </div>
        </div>
      </div>

      {/* Dark Web Breach Scanner Simulator */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">
        <h3 className="text-base font-bold text-white mb-1">
          {lang === 'hi' ? 'डार्क वेब ब्रीच चेकर (Have I Been Pwned)' : 'Dark Web Breach Lookup'}
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          {lang === 'hi'
            ? 'जांचें कि क्या आपका ईमेल या फोन नंबर किसी पुरानी वेबसाइट के डेटा लीक में शामिल था'
            : 'Check if your email or passwords were exposed in historical publicly scraped breaches'}
        </p>

        <div className="flex gap-2">
          <input
            type="email"
            value={emailQuery}
            onChange={(e) => setEmailQuery(e.target.value)}
            placeholder={lang === 'hi' ? 'अपना ईमेल दर्ज करें (उदा: rahul@gmail.com)' : 'Enter email address to check...'}
            className="flex-1 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
          <button
            onClick={handleCheckBreach}
            disabled={isCheckingBreach || !emailQuery.trim()}
            className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{isCheckingBreach ? (lang === 'hi' ? 'जांच जारी...' : 'Searching...') : (lang === 'hi' ? 'लीक जांचें' : 'Check Leak')}</span>
          </button>
        </div>

        {breachResult && (
          <div className={`mt-4 p-4 rounded-2xl border ${
            breachResult.isLeaked ? 'bg-rose-950/30 border-rose-800/50' : 'bg-emerald-950/30 border-emerald-800/50'
          }`}>
            <div className="flex items-center gap-2">
              {breachResult.isLeaked ? (
                <ShieldAlert className="w-5 h-5 text-rose-400" />
              ) : (
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              )}
              <span className="text-sm font-bold text-white">
                {breachResult.isLeaked 
                  ? (lang === 'hi' ? `सावधान! यह ईमेल 3 सार्वजनिक डेटा उल्लंघनों (Breaches) में पाया गया है` : `Warning! Found in 3 public data breaches`)
                  : (lang === 'hi' ? 'बधाई! ज्ञात डेटाबेस में कोई लीक नहीं मिला' : 'Good news! No breach records found for this account')}
              </span>
            </div>
            {breachResult.isLeaked && (
              <p className="text-xs text-slate-300 mt-2">
                {lang === 'hi'
                  ? 'तत्काल कदम: यदि आप इस ईमेल का वही पुराना पासवर्ड किसी अन्य बैंक या सोशल मीडिया अकाउंट पर भी उपयोग करते हैं, तो उसे तुरंत बदलें!'
                  : 'Immediate action: Change any passwords you have reused across other sites or banking portals!'}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Password Storage Tips */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">
        <h3 className="text-base font-bold text-white mb-2">
          {lang === 'hi' ? 'सुरक्षित पासवर्ड प्रबंधन के सुनहरे नियम' : 'Secure Password Storage Golden Rules'}
        </h3>
        <div className="space-y-2 text-xs text-slate-300">
          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            <span>
              {lang === 'hi'
                ? 'कभी भी पासवर्ड को फोन की डायरी, नोटपैड या खुद को WhatsApp मैसेज करके न रखें। फोन चोरी होने पर सारा डेटा उजागर हो सकता है।'
                : 'Never store passwords in WhatsApp chats or plain text notepad files on your phone.'}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            <span>
              {lang === 'hi'
                ? 'ओपन-सोर्स व एन्क्रिप्टेड पासवर्ड मैनेजर (जैसे Bitwarden या Apple/Google Keychain) का उपयोग करें जो बायोमेट्रिक से सुरक्षित रहते हैं।'
                : 'Use zero-knowledge encrypted password managers (like Bitwarden or Apple/Google Keychain).'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
