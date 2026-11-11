import React, { useState } from 'react';
import { 
  Camera, 
  Mic, 
  MapPin, 
  Users, 
  Image as ImageIcon, 
  ShieldAlert, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  Settings, 
  Smartphone, 
  ToggleLeft, 
  ToggleRight,
  Eye,
  Sliders,
  ExternalLink
} from 'lucide-react';
import { Language, AppPermission } from '../types/security';
import { initialPermissions } from '../data/mockSecurityData';
import { translations } from '../data/translations';

interface PrivacyProtectionViewProps {
  lang: Language;
}

export const PrivacyProtectionView: React.FC<PrivacyProtectionViewProps> = ({ lang }) => {
  const t = translations[lang];
  const [permissions, setPermissions] = useState<AppPermission[]>(initialPermissions);
  const [selectedPermId, setSelectedPermId] = useState<string>('perm_camera');
  const [expandedGuide, setExpandedGuide] = useState<string | null>('guide_whatsapp');
  const [adTrackingEnabled, setAdTrackingEnabled] = useState<boolean>(false);
  const [preciseLocationEnabled, setPreciseLocationEnabled] = useState<boolean>(false);

  // Toggle app permission in state
  const handleToggleAppPermission = (permId: string, appIndex: number) => {
    setPermissions((prev) =>
      prev.map((perm) => {
        if (perm.id !== permId) return perm;
        const updatedApps = [...perm.appsList];
        updatedApps[appIndex] = {
          ...updatedApps[appIndex],
          isGranted: !updatedApps[appIndex].isGranted,
        };
        return {
          ...perm,
          appsList: updatedApps,
        };
      })
    );
  };

  const selectedPerm = permissions.find((p) => p.id === selectedPermId) || permissions[0];

  const privacyGuides = [
    {
      id: 'guide_whatsapp',
      platform: 'WhatsApp',
      titleEn: 'WhatsApp Security & Anti-Spy Configuration',
      titleHi: 'WhatsApp प्राइवेसी व एंटी-स्पाई सेटिंग्स',
      stepsEn: [
        'Open WhatsApp > Settings > Privacy > "Silence Unknown Callers" (Turn ON to block international cyber-fraud calls).',
        'Enable "Two-Step Verification" with a 6-digit PIN and backup email.',
        'Go to Chats > Chat Backup > "End-to-End Encrypted Backup" (Turn ON so Google Drive backups cannot be intercepted).',
        'Set Profile Photo and About to "My Contacts" instead of "Everyone".'
      ],
      stepsHi: [
        'WhatsApp > सेटिंग्स > प्राइवेसी > "Silence Unknown Callers" चालू करें (विदेशी ठगों की फर्जी कॉल्स ब्लॉक होंगी)।',
        '6 अंकों के पिन और रिकवरी ईमेल के साथ "Two-Step Verification" अवश्य चालू करें।',
        'चैट्स > चैट बैकअप > "End-to-End Encrypted Backup" चालू करें जिससे गूगल ड्राइव पर भी चैट सुरक्षित रहे।',
        'प्रोफ़ाइल फोटो और अबाउट को "Everyone" के बजाय "My Contacts" पर सेट करें।'
      ]
    },
    {
      id: 'guide_android',
      platform: 'Android / Google',
      titleEn: 'Google Ad ID & Tracking Reset',
      titleHi: 'गूगल विज्ञापन आईडी (Ad ID) व ट्रैकिंग रीसेट',
      stepsEn: [
        'Phone Settings > Google > Ads > Tap "Delete Advertising ID" (Prevents ad brokers from cross-profiling your browsing).',
        'Google Account > Data & Privacy > Set "Web & App Activity" auto-delete to 3 months.',
        'Privacy Dashboard > Check apps accessing Camera / Mic in the last 24 hours.'
      ],
      stepsHi: [
        'फोन सेटिंग्स > Google > Ads > "Delete Advertising ID" पर टैप करें (ऐड ब्रोकर्स आपकी जासूसी नहीं कर पाएंगे)।',
        'Google अकाउंट > डेटा और प्राइवेसी > "Web & App Activity" का ऑटो-डिलीट 3 महीने पर सेट करें।',
        'प्राइवेसी डैशबोर्ड में जाकर देखें कि पिछले 24 घंटों में किन ऐप्स ने कैमरा या माइक का इस्तेमाल किया।'
      ]
    },
    {
      id: 'guide_loan_scam',
      platform: 'Fake Loan Trap',
      titleEn: 'Chinese Instant Loan App Contact Blackmail Shield',
      titleHi: 'फर्जी इंस्टेंट लोन ऐप ब्लैकमेल से सुरक्षा गाइड',
      stepsEn: [
        'CRITICAL: Rogue loan apps demand Contacts and Gallery permissions, then morph photos and threaten contacts.',
        'Never install APKs from WhatsApp, Telegram, or Facebook ads claiming "₹50,000 in 2 minutes without CIBIL".',
        'If already trapped: Immediately revoke Contacts & Storage permissions in Phone Settings > Apps, block numbers, and report to 1930.'
      ],
      stepsHi: [
        'गंभीर चेतावनी: फर्जी लोन ऐप्स कॉन्टैक्ट और गैलरी एक्सेस चुराकर अश्लील मॉर्फ्ड फोटो बनाकर रिश्तेदारों को भेजकर ब्लैकमेल करते हैं।',
        'WhatsApp या फेसबुक विज्ञापनों से "बिना सिबिल 2 मिनट में लोन" वाले किसी भी APK को कभी इंस्टॉल न करें।',
        'यदि फंस गए हैं: तुरंत सेटिंग्स में जाकर उस ऐप की कॉन्टैक्ट व स्टोरेज परमिशन हटाएं, नंबर ब्लॉक करें और 1930 पर शिकायत दर्ज करें।'
      ]
    }
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Title & Overview */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {t.privacySuiteTitle}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'hi'
                ? 'व्यक्तिगत डेटा सुरक्षा, ऐप अनुमतियां और लाइव कैमरा/माइक मॉनिटरिंग'
                : 'Personal data protection, granular app permission checker & spy sensor guard'}
            </p>
          </div>
        </div>

        {/* Live Privacy Toggles Quick Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <div className="pr-2">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{lang === 'hi' ? 'सटीक GPS लोकेशन' : 'Precise GPS Tracking'}</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {preciseLocationEnabled 
                  ? (lang === 'hi' ? 'सटीक घर/दफ्तर पता खुला है' : 'Exact street-level coordinates exposed')
                  : (lang === 'hi' ? 'अनुमानित शहर स्तर तक सुरक्षित' : 'Restricted to approximate city zone')}
              </div>
            </div>
            <button
              onClick={() => setPreciseLocationEnabled(!preciseLocationEnabled)}
              className="text-cyan-400 focus:outline-none"
              title="Toggle Precise Location"
            >
              {preciseLocationEnabled ? (
                <ToggleRight className="w-8 h-8 text-rose-400" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-emerald-400" />
              )}
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <div className="pr-2">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-purple-400" />
                <span>{lang === 'hi' ? 'विज्ञापन प्रोफाइलिंग (Ad ID)' : 'Advertising ID Profiling'}</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {adTrackingEnabled 
                  ? (lang === 'hi' ? 'ऐड ब्रोकर्स व्यवहार ट्रैक कर रहे हैं' : 'Ad brokers tracking your app usage')
                  : (lang === 'hi' ? 'ट्रैकिंग ब्लॉक्ड (गोपनीय)' : 'Tracking blocked & anonymized')}
              </div>
            </div>
            <button
              onClick={() => setAdTrackingEnabled(!adTrackingEnabled)}
              className="text-cyan-400 focus:outline-none"
              title="Toggle Ad Tracking"
            >
              {adTrackingEnabled ? (
                <ToggleRight className="w-8 h-8 text-rose-400" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-emerald-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Sensor Indicators Education Banner (Green Dot / Orange Dot) */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-slate-900 to-slate-900 border border-emerald-800/40">
        <div className="flex items-start gap-3">
          <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50 mt-1 shrink-0" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white">
              {lang === 'hi' ? 'कैमरा और माइक्रोफोन "ग्रीन डॉट" इंडिकेटर गाइड' : 'Camera & Microphone Green Dot Sensor Guide'}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === 'hi'
                ? 'यदि आपके फोन के ऊपरी कोने में हरा या नारंगी बिंदु (Green/Orange Dot) चमक रहा है और आपने कोई कैमरा/कॉल ऐप नहीं खोला है, तो इसका अर्थ है कि कोई बैकग्राउंड ऐप आपकी जासूसी या रिकॉर्डिंग कर रहा है!'
                : 'Android 12+ and iOS 14+ show a green or orange indicator dot whenever an app accesses your camera or microphone. If this dot appears while no camera/recording app is open, a rogue app is silently spying!'}
            </p>
          </div>
        </div>
      </div>

      {/* App Permission Checker Suite */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white">
              {lang === 'hi' ? 'ऐप परमिशन चेकर व ऑडिट' : 'App Permission Checker & Auditor'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'hi' ? 'कैमरा, माइक, कॉन्टैक्ट्स और गैलरी अनुमति प्राप्त ऐप्स' : 'Installed apps holding sensitive device hardware permissions'}
            </p>
          </div>
        </div>

        {/* Permission Category Filter Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {permissions.map((perm) => {
            const isSelected = perm.id === selectedPermId;
            return (
              <button
                key={perm.id}
                onClick={() => setSelectedPermId(perm.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-950/50'
                    : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {perm.category === 'camera' && <Camera className="w-3.5 h-3.5" />}
                {perm.category === 'microphone' && <Mic className="w-3.5 h-3.5" />}
                {perm.category === 'location' && <MapPin className="w-3.5 h-3.5" />}
                {perm.category === 'contacts' && <Users className="w-3.5 h-3.5" />}
                {perm.category === 'gallery' && <ImageIcon className="w-3.5 h-3.5" />}
                <span>{lang === 'hi' ? perm.nameHi : perm.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                  {perm.appsCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Permission Risk Alert */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
          <Info className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
          <p className="text-xs text-slate-300">
            {lang === 'hi' ? selectedPerm.riskDescriptionHi : selectedPerm.riskDescriptionEn}
          </p>
        </div>

        {/* App List with Permission Toggles */}
        <div className="mt-4 space-y-2.5">
          {selectedPerm.appsList.map((app, idx) => (
            <div
              key={app.name}
              className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                app.isSuspicious
                  ? 'bg-rose-950/20 border-rose-800/40'
                  : 'bg-slate-950/40 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                  app.isSuspicious
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-slate-800 text-slate-200'
                }`}>
                  {app.name.charAt(0)}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">
                      {app.name}
                    </span>
                    {app.isSuspicious && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/20 px-1.5 py-0.5 rounded border border-rose-500/30">
                        {lang === 'hi' ? 'अनावश्यक खतरा' : 'Rogue Access'}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {lang === 'hi' ? app.recommendationHi : app.recommendation}
                  </div>
                </div>
              </div>

              {/* Toggle switch */}
              <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-center">
                <span className="text-xs text-slate-400">
                  {app.isGranted 
                    ? (lang === 'hi' ? 'अनुमति दी गई है' : 'Allowed')
                    : (lang === 'hi' ? 'अवरुद्ध (सुरक्षित)' : 'Revoked')}
                </span>
                <button
                  onClick={() => handleToggleAppPermission(selectedPerm.id, idx)}
                  className="focus:outline-none"
                  title="Toggle permission state"
                >
                  {app.isGranted ? (
                    <ToggleRight className={`w-8 h-8 ${app.isSuspicious ? 'text-rose-500' : 'text-emerald-400'}`} />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-slate-600" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step-by-Step Privacy Settings Guides */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">
        <h3 className="text-base font-bold text-white mb-1">
          {t.privacyGuide}
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          {lang === 'hi'
            ? 'व्हाट्सएप, गूगल और फोन सेटिंग्स में जासूसी रोकने की आधिकारिक विधियां'
            : 'Official hardening steps for WhatsApp, Android, and sensitive accounts'}
        </p>

        <div className="space-y-3">
          {privacyGuides.map((guide) => {
            const isExpanded = expandedGuide === guide.id;
            return (
              <div
                key={guide.id}
                className="rounded-2xl bg-slate-950/60 border border-slate-800 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedGuide(isExpanded ? null : guide.id)}
                  className="w-full p-4 flex items-center justify-between gap-3 text-left hover:bg-slate-900/60 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/50">
                      {guide.platform}
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {lang === 'hi' ? guide.titleHi : guide.titleEn}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 space-y-2 border-t border-slate-800/80">
                    {(lang === 'hi' ? guide.stepsHi : guide.stepsEn).map((step, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <span className="w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold shrink-0 mt-0.5">
                          {sIdx + 1}
                        </span>
                        <p className="leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
