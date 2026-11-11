import React, { useState } from 'react';
import { 
  ShieldAlert, 
  MessageSquareWarning, 
  Globe, 
  QrCode, 
  Mail, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ArrowRight, 
  Search, 
  Sparkles, 
  Send, 
  PhoneCall,
  Info
} from 'lucide-react';
import { Language, ScamSample } from '../types/security';
import { scamSamples } from '../data/mockSecurityData';
import { translations } from '../data/translations';

interface ScamDetectionViewProps {
  lang: Language;
  onOpenReport: () => void;
}

export const ScamDetectionView: React.FC<ScamDetectionViewProps> = ({ lang, onOpenReport }) => {
  const t = translations[lang];

  const [activeSubTab, setActiveSubTab] = useState<'sms' | 'url' | 'upi' | 'email'>('sms');
  const [inputText, setInputText] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<ScamSample | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Set sample into analyzer
  const handleLoadSample = (sample: ScamSample) => {
    setInputText(sample.content);
    setAnalysisResult(sample);
  };

  // Run dynamic analysis on user input
  const handleAnalyzeInput = () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      const lower = inputText.toLowerCase();

      // Heuristic detection flags for Indian & Global scams
      const isElectricity = lower.includes('electricity') || lower.includes('bijli') || lower.includes('power will be disconnected') || lower.includes('9:30');
      const isBankKyc = lower.includes('kyc') || lower.includes('pan') || lower.includes('yono') || lower.includes('sbi') || lower.includes('blocked') || lower.includes('suspended');
      const isUpiReceive = lower.includes('receive') && (lower.includes('pin') || lower.includes('qr') || lower.includes('olx'));
      const isLottery = lower.includes('lottery') || lower.includes('kbc') || lower.includes('crore') || lower.includes('winner') || lower.includes('congratulations');
      const isPhishingUrl = lower.includes('.xyz') || lower.includes('.top') || lower.includes('.site') || lower.includes('.click') || lower.includes('.club') || lower.includes('http://');

      const isSuspect = isElectricity || isBankKyc || isUpiReceive || isLottery || isPhishingUrl;

      if (isSuspect) {
        setAnalysisResult({
          id: 'custom_scam',
          title: 'Suspicious Scam Detected!',
          titleHi: 'संदिग्ध ऑनलाइन धोखाधड़ी (स्कैम) की पहचान हुई!',
          type: activeSubTab,
          content: inputText,
          isScam: true,
          riskScore: 95,
          analysisEn: 'High threat detected. The text contains classic urgency triggers, unverified domain patterns, or demands for sensitive credentials/UPI PIN.',
          analysisHi: 'गंभीर धोखाधड़ी का खतरा: इस संदेश में कृत्रिम घबराहट, असत्यापित लिंक या UPI PIN डालने का झांसा शामिल है। किसी भी लिंक पर क्लिक न करें!',
          redFlags: [
            'Urgency / fear tactic to bypass rational thinking',
            'Requests sensitive credentials, OTP, or remote screen sharing',
            'Unverified domain or communication channel'
          ],
          redFlagsHi: [
            'घबराहट या लालच पैदा करने की चाल',
            'ओटीपी, पिन या स्क्रीन शेयरिंग की मांग',
            'अनवेरिफाइड वेबसाइट लिंक या निजी फोन नंबर'
          ]
        });
      } else {
        setAnalysisResult({
          id: 'custom_safe',
          title: 'Likely Safe / Low Risk',
          titleHi: 'सामान्यतः सुरक्षित / कम जोखिम',
          type: activeSubTab,
          content: inputText,
          isScam: false,
          riskScore: 8,
          analysisEn: 'No obvious phishing markers, panic deadlines, or credential traps detected. Always remain vigilant with personal information.',
          analysisHi: 'कोई स्पष्ट फ़िशिंग लिंक, घबराहट की डेडलाइन या बैंक क्रेडेंशियल चोरी के संकेत नहीं मिले। फिर भी निजी जानकारी कभी शेयर न करें।',
          redFlags: [],
          redFlagsHi: []
        });
      }
      setIsAnalyzing(false);
    }, 600);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Title & Banner */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {t.scamSuiteTitle}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'hi'
                  ? 'फर्जी SMS, फ़िशिंग वेबसाइट, UPI व QR कोड फ्रॉड डिटेक्टर'
                  : 'AI Radar for Smishing, Phishing URLs, QR Code Traps, and Fake Bank SMS'}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenReport}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-950/50 transition-colors shrink-0"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'साइबर फ्रॉड रिपोर्ट करें (1930)' : 'Report Scam (Helpline 1930)'}</span>
          </button>
        </div>

        {/* Sub-tab selection */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5">
          <button
            onClick={() => { setActiveSubTab('sms'); setAnalysisResult(null); setInputText(''); }}
            className={`p-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeSubTab === 'sms'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-950/50'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <MessageSquareWarning className="w-4 h-4" />
            <span>{lang === 'hi' ? 'फेक SMS चेकर' : 'Fake SMS (Smishing)'}</span>
          </button>

          <button
            onClick={() => { setActiveSubTab('url'); setAnalysisResult(null); setInputText(''); }}
            className={`p-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeSubTab === 'url'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-950/50'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>{lang === 'hi' ? 'फ़िशिंग वेबसाइट' : 'Phishing URL'}</span>
          </button>

          <button
            onClick={() => { setActiveSubTab('upi'); setAnalysisResult(null); setInputText(''); }}
            className={`p-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeSubTab === 'upi'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-950/50'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>{lang === 'hi' ? 'UPI व QR फ्रॉड' : 'UPI & QR Trap'}</span>
          </button>

          <button
            onClick={() => { setActiveSubTab('email'); setAnalysisResult(null); setInputText(''); }}
            className={`p-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeSubTab === 'email'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-950/50'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>{lang === 'hi' ? 'फेक ईमेल डिटेक्टर' : 'Fake Email'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Analyzer Input Card */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">
        <h3 className="text-base font-bold text-white mb-1">
          {activeSubTab === 'sms' && (lang === 'hi' ? 'SMS संदेश पेस्ट करें या टेस्ट सैंपल चुनें' : 'Paste SMS Message or Select Test Sample')}
          {activeSubTab === 'url' && (lang === 'hi' ? 'संदिग्ध वेबसाइट लिंक (URL) दर्ज करें' : 'Enter Suspicious Website Link (URL)')}
          {activeSubTab === 'upi' && (lang === 'hi' ? 'UPI / QR कोड भुगतान संदेश की जांच करें' : 'Analyze UPI / QR Payment Scenario')}
          {activeSubTab === 'email' && (lang === 'hi' ? 'ईमेल विषय व संदेश पेस्ट करें' : 'Paste Email Subject & Sender Details')}
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          {lang === 'hi'
            ? 'हमारा AI हेडर, डोमेन स्पूफिंग और मनोवैज्ञानिक हेरफेर (Panic Deadlines) की त्वरित जांच करता है।'
            : 'Heuristic radar checks for typosquatting, panic deadlines, and deceptive credential traps.'}
        </p>

        {/* Input box */}
        <div className="space-y-3">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={4}
            placeholder={
              activeSubTab === 'sms'
                ? (lang === 'hi' ? 'उदा: "बिजली बिल अपडेट न होने पर रात 9:30 बजे बिजली काट दी जाएगी..."' : 'e.g. "Dear consumer, your electricity power will be disconnected tonight at 9:30 PM..."')
                : activeSubTab === 'url'
                ? 'e.g. http://onlinesbi.co.in.kyc-verify.site/login or netbanking-hdfc.click'
                : activeSubTab === 'upi'
                ? (lang === 'hi' ? 'उदा: "पैसे पाने के लिए इस QR कोड को स्कैन करें और UPI PIN डालें..."' : 'e.g. "Scan this QR code and enter PIN to receive ₹15,000..."')
                : (lang === 'hi' ? 'उदा: इनकम टैक्स रिफंड पाने के लिए तुरंत इस APK को डाउनलोड करें...' : 'e.g. Income Tax refund approved. Click here to download refund utility APK...')
            }
            className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 focus:border-rose-500 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-colors"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Quick Sample Chips */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] text-slate-500 font-medium">
                {lang === 'hi' ? 'परीक्षण सैंपल:' : 'Test Samples:'}
              </span>
              {scamSamples
                .filter((s) => s.type === activeSubTab || (activeSubTab === 'email' && s.type === 'sms'))
                .slice(0, 2)
                .map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handleLoadSample(sample)}
                    className="text-[11px] text-slate-300 bg-slate-950 hover:bg-slate-800 border border-slate-800 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    {lang === 'hi' ? sample.titleHi : sample.title}
                  </button>
                ))}
            </div>

            <button
              onClick={handleAnalyzeInput}
              disabled={isAnalyzing || !inputText.trim()}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-950/50 transition-transform active:scale-95 shrink-0"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{isAnalyzing ? (lang === 'hi' ? 'विश्लेषण जारी...' : 'Analyzing...') : (lang === 'hi' ? 'स्कैम रडार चलाएं' : 'Analyze Threat')}</span>
            </button>
          </div>
        </div>

        {/* Analysis Result Card */}
        {analysisResult && (
          <div className={`mt-6 p-5 rounded-2xl border transition-all ${
            analysisResult.isScam
              ? 'bg-rose-950/30 border-rose-600/50 cyber-glow-rose'
              : 'bg-emerald-950/30 border-emerald-600/50 cyber-glow-emerald'
          }`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  analysisResult.isScam ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {analysisResult.isScam ? <XCircle className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                </div>

                <div>
                  <h4 className="text-base font-bold text-white">
                    {lang === 'hi' ? analysisResult.titleHi : analysisResult.title}
                  </h4>
                  <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                    <span>Threat Level: <strong className={analysisResult.isScam ? 'text-rose-400' : 'text-emerald-400'}>{analysisResult.riskScore}%</strong></span>
                    <span>·</span>
                    <span>Type: {analysisResult.type.toUpperCase()}</span>
                  </div>
                </div>
              </div>

              <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                analysisResult.isScam ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              }`}>
                {analysisResult.isScam ? (lang === 'hi' ? 'धोखाधड़ी (SCAM)' : 'FRAUD DETECTED') : (lang === 'hi' ? 'सुरक्षित (SAFE)' : 'SAFE')}
              </span>
            </div>

            <p className="text-xs text-slate-200 mt-3 leading-relaxed">
              {lang === 'hi' ? analysisResult.analysisHi : analysisResult.analysisEn}
            </p>

            {/* Red Flags Breakdown */}
            {(lang === 'hi' ? analysisResult.redFlagsHi : analysisResult.redFlags).length > 0 && (
              <div className="mt-4 pt-4 border-t border-rose-900/40 space-y-2">
                <div className="text-xs font-bold text-rose-300">
                  {lang === 'hi' ? 'पहचाने गए खतरे व चेतावनी संकेत:' : 'Critical Red Flags Identified:'}
                </div>
                {(lang === 'hi' ? analysisResult.redFlagsHi : analysisResult.redFlags).map((flag, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span>{flag}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Action advice */}
            {analysisResult.isScam && (
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-slate-950/80 border border-rose-800/30">
                <span className="text-xs text-rose-200">
                  {lang === 'hi' ? 'क्या आपने पैसे गंवा दिए हैं? तुरंत शिकायत दर्ज करें।' : 'Lost money to this scam? File an instant 1930 incident report.'}
                </span>
                <button
                  onClick={onOpenReport}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors whitespace-nowrap"
                >
                  {lang === 'hi' ? 'हेल्पलाइन 1930 पर रिपोर्ट करें' : 'Report on 1930 Portal'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* UPI Fraud Golden Rules & Visual Awareness */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">
        <h3 className="text-base font-bold text-white mb-2">
          {lang === 'hi' ? '💡 UPI और QR कोड फ्रॉड से बचने के 4 अमर नियम' : '💡 The 4 Unbreakable Rules of UPI Safety'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              1
            </div>
            <div>
              <div className="text-xs font-bold text-white">
                {lang === 'hi' ? 'पैसे पाने के लिए PIN की जरूरत नहीं होती' : 'PIN is ONLY for Sending Money'}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'hi'
                  ? 'यदि कोई कहता है कि "पैसे पाने के लिए QR स्कैन करें या PIN डालें", तो वह 100% ठग है।'
                  : 'You NEVER need to enter your UPI PIN to receive money in your account.'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              2
            </div>
            <div>
              <div className="text-xs font-bold text-white">
                {lang === 'hi' ? 'गूगल सर्च पर फर्जी कस्टमर केयर नंबर' : 'Never Google Customer Care Numbers'}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'hi'
                  ? 'ठग गूगल मैप्स और सर्च पर Zomato, SBI, या Flipkart का फर्जी नंबर डाल देते हैं। हमेशा आधिकारिक ऐप के अंदर से ही सहायता लें।'
                  : 'Cyber criminals put fake helpline numbers in Google Search results to trick callers.'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              3
            </div>
            <div>
              <div className="text-xs font-bold text-white">
                {lang === 'hi' ? 'AnyDesk या TeamViewer कभी इंस्टॉल न करें' : 'Never Install Screen Share Apps'}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'hi'
                  ? 'बैंक अधिकारी बनकर ठग कभी स्क्रीन शेयरिंग ऐप (AnyDesk/QuickSupport) डाउनलोड करने को नहीं कहते।'
                  : 'No legitimate bank or courier will ever ask you to download remote desktop apps.'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              4
            </div>
            <div>
              <div className="text-xs font-bold text-white">
                {lang === 'hi' ? '"डिजिटल अरेस्ट" (Digital Arrest) फर्जीवाड़ा' : '"Digital Arrest" Scam Awareness'}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'hi'
                  ? 'CBI, पुलिस या कस्टम्स कभी भी वीडियो कॉल पर किसी को "डिजिटल अरेस्ट" नहीं करते। डरें नहीं, सीधे 1930 पर फोन करें।'
                  : 'Law enforcement agencies never conduct arrests or demand money via Skype/WhatsApp video calls.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
