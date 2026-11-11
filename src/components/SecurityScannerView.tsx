import React, { useState, useEffect } from 'react';
import { 
  Radar, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  Wifi, 
  Smartphone, 
  RefreshCw, 
  KeyRound, 
  SmartphoneNfc, 
  CheckCircle2, 
  XCircle, 
  Copy, 
  Check, 
  LogOut,
  ExternalLink,
  Laptop
} from 'lucide-react';
import { Language } from '../types/security';
import { translations } from '../data/translations';

interface SecurityScannerViewProps {
  lang: Language;
}

export const SecurityScannerView: React.FC<SecurityScannerViewProps> = ({ lang }) => {
  const t = translations[lang];

  // Scanner state
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(100);
  const [scanComplete, setScanComplete] = useState<boolean>(true);

  // 2FA Simulator state
  const [totpSeconds, setTotpSeconds] = useState<number>(24);
  const [totpCode, setTotpCode] = useState<string>('842 190');
  const [copiedTotp, setCopiedTotp] = useState<boolean>(false);

  // Suspicious sessions state
  const [sessions, setSessions] = useState([
    {
      id: 'sess_1',
      device: 'Samsung Galaxy S24 Ultra (This Phone)',
      deviceHi: 'सैमसंग गैलेक्सी S24 (यह फोन)',
      location: 'New Delhi, India',
      ip: '103.21.244.18',
      isCurrent: true,
      status: 'active',
    },
    {
      id: 'sess_2',
      device: 'Windows PC (Chrome 122)',
      deviceHi: 'विंडोज पीसी (क्रोम ब्राउज़र)',
      location: 'Shenzhen, China (Suspicious IP)',
      locationHi: 'शेन्ज़ेन, चीन (संदिग्ध आईपी)',
      ip: '113.88.12.94',
      isCurrent: false,
      status: 'suspicious',
    }
  ]);

  // Scan simulation effect
  const handleStartScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanComplete(true);
          return 100;
        }
        return prev + 20;
      });
    }, 400);
  };

  // 2FA TOTP timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTotpSeconds((prev) => {
        if (prev <= 1) {
          // Generate new simulated TOTP
          const newCode = `${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)}`;
          setTotpCode(newCode);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyTotp = () => {
    navigator.clipboard.writeText(totpCode.replace(' ', ''));
    setCopiedTotp(true);
    setTimeout(() => setCopiedTotp(false), 2000);
  };

  const handleRevokeSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
  };

  const scanItems = [
    {
      id: 'chk_os',
      titleEn: 'OS Security Patch Level',
      titleHi: 'सिस्टम सुरक्षा पैच लेवल',
      status: 'safe',
      descEn: 'Updated with latest November 2026 Android/iOS security patches.',
      descHi: 'नवीनतम नवंबर 2026 सुरक्षा पैच के साथ अपडेटेड है।'
    },
    {
      id: 'chk_apk',
      titleEn: 'Install from Unknown Sources',
      titleHi: 'अज्ञात स्रोतों से APK इंस्टॉल',
      status: 'warning',
      descEn: 'Unknown sources toggle is active. Sideloaded APKs bypass Google Play Protect.',
      descHi: 'अज्ञात स्रोत विकल्प चालू है। बाहर से डाउनलोड की गई APKs प्ले प्रोटेक्ट को बायपास कर सकती हैं।'
    },
    {
      id: 'chk_wifi',
      titleEn: 'Public Wi-Fi Encryption (WPA3/WPA2)',
      titleHi: 'वाई-फाई एन्क्रिप्शन व हॉटस्पॉट सुरक्षा',
      status: 'safe',
      descEn: 'Connected to secure encrypted network. DNS-over-HTTPS active.',
      descHi: 'सुरक्षित एन्क्रिप्टेड नेटवर्क से कनेक्टेड है। DNS-over-HTTPS सक्रिय है।'
    },
    {
      id: 'chk_usb',
      titleEn: 'USB Debugging Risk',
      titleHi: 'USB डीबगिंग व डेवलपर मोड',
      status: 'safe',
      descEn: 'USB Debugging is turned off. Prevents juice jacking at public charging stations.',
      descHi: 'USB डीबगिंग बंद है। सार्वजनिक चार्जिंग स्टेशनों पर डेटा चोरी से सुरक्षा।'
    }
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Title & Scanner Hero */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <Radar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {t.securitySuiteTitle}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'hi'
                  ? 'मैलवेयर, कमजोर सेटिंग्स, 2FA और संदिग्ध लॉगिन सुरक्षा'
                  : 'Deep device vulnerability scanner, 2FA authenticator & session radar'}
              </p>
            </div>
          </div>

          <button
            onClick={handleStartScan}
            disabled={isScanning}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/40 transition-transform active:scale-95 shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? (lang === 'hi' ? 'स्कैनिंग जारी...' : 'Scanning...') : (lang === 'hi' ? 'गहन स्कैन चलाएं' : 'Run Deep Audit')}</span>
          </button>
        </div>

        {/* Scan Progress Bar */}
        {isScanning && (
          <div className="mt-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{lang === 'hi' ? 'सिस्टम फाइलों, वाई-फाई व अनुमतियों का विश्लेषण...' : 'Analyzing system binaries, network leaks & credentials...'}</span>
              <span className="font-bold text-cyan-400 tabular-nums">{scanProgress}%</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-300 rounded-full"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Scanner Checklist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
          {scanItems.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3"
            >
              <div className="mt-0.5 shrink-0">
                {item.status === 'safe' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">
                    {lang === 'hi' ? item.titleHi : item.titleEn}
                  </span>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded uppercase ${
                    item.status === 'safe' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {item.status === 'safe' ? (lang === 'hi' ? 'सुरक्षित' : 'Passed') : (lang === 'hi' ? 'ध्यान दें' : 'Warning')}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === 'hi' ? item.descHi : item.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Two-Factor Authentication (2FA) Simulator */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {lang === 'hi' ? '2-फैक्टर ऑथेंटिकेशन (2FA) जनरेटर व गाइड' : 'Two-Factor Authentication (2FA) Simulator'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'hi' ? 'TOTP टाइम-बेस्ड वन-टाइम पासवर्ड जनरेटर' : 'Standard 30-second rotating security passcode'}
              </p>
            </div>
          </div>
          <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            TOTP Active
          </span>
        </div>

        {/* Simulated Authenticator Card */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs text-slate-400">
              {lang === 'hi' ? 'Google / Banking Account MFA' : 'Simulated Primary Account 2FA'}
            </div>
            <div className="text-3xl font-mono font-bold tracking-wider text-cyan-400 mt-1 tabular-nums">
              {totpCode}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span>{lang === 'hi' ? `नया कोड ${totpSeconds} सेकेंड में` : `Refreshes in ${totpSeconds}s`}</span>
              <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cyan-400 transition-all duration-1000 ease-linear rounded-full"
                  style={{ width: `${(totpSeconds / 30) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopyTotp}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              {copiedTotp ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedTotp ? (lang === 'hi' ? 'कॉपी किया गया!' : 'Copied!') : (lang === 'hi' ? 'कोड कॉपी करें' : 'Copy Code')}</span>
            </button>
          </div>
        </div>

        <div className="mt-3 p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 text-xs text-slate-400 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
          <span>
            {lang === 'hi'
              ? 'सुझाव: SMS OTP के बजाय हमेशा Google Authenticator या Bitwarden 2FA का उपयोग करें, क्योंकि SMS OTP को सिम-स्वैप (SIM Swap) द्वारा चुराया जा सकता है!'
              : 'Pro Tip: Prefer authenticator apps over SMS OTP whenever possible. SMS OTP is vulnerable to SIM-swap attacks and SS7 interception.'}
          </span>
        </div>
      </div>

      {/* Suspicious Login Alerts Radar */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white">
              {lang === 'hi' ? 'सक्रिय सत्र एवं संदिग्ध लॉगिन रडार' : 'Active Sessions & Suspicious Login Radar'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'hi' ? 'अपरिचित शहरों या अज्ञात डिवाइस से हुए लॉगिन पर तुरंत अलर्ट' : 'Real-time alert on anomalous geo-ip jumps and unauthorized logins'}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {sessions.map((sess) => (
            <div
              key={sess.id}
              className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                sess.status === 'suspicious'
                  ? 'bg-rose-950/20 border-rose-800/40'
                  : 'bg-slate-950/60 border-slate-800'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  sess.status === 'suspicious' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {sess.isCurrent ? <Smartphone className="w-4 h-4" /> : <Laptop className="w-4 h-4" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">
                      {lang === 'hi' ? sess.deviceHi : sess.device}
                    </span>
                    {sess.isCurrent && (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {lang === 'hi' ? 'वर्तमान डिवाइस' : 'Current Device'}
                      </span>
                    )}
                    {sess.status === 'suspicious' && (
                      <span className="text-[10px] font-bold text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/30 animate-pulse">
                        {lang === 'hi' ? 'संदिग्ध खतरा' : 'High Alert'}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {lang === 'hi' ? sess.locationHi : sess.location} · IP: {sess.ip}
                  </div>
                </div>
              </div>

              {!sess.isCurrent && (
                <button
                  onClick={() => handleRevokeSession(sess.id)}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors self-end sm:self-center shadow-md shadow-rose-950/50"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'लॉगआउट व ब्लॉक करें' : 'Terminate & Block'}</span>
                </button>
              )}
            </div>
          ))}

          {sessions.length === 1 && (
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-300 text-center">
              {lang === 'hi'
                ? 'सभी संदिग्ध सत्र समाप्त कर दिए गए हैं। केवल आपका वर्तमान फोन अधिकृत है।'
                : 'All suspicious sessions revoked. Only your verified current device has access.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
