import React from 'react';
import { X, Cpu, Smartphone, Database, Bell, Lock, Server, CheckCircle2 } from 'lucide-react';
import { Language } from '../types/security';
import { techStackDetails } from '../data/mockSecurityData';

interface TechArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const TechArchitectureModal: React.FC<TechArchitectureModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  const techIcons: Record<string, React.ReactNode> = {
    'Flutter Framework': <Smartphone className="w-5 h-5 text-cyan-400" />,
    'Firebase Authentication': <Lock className="w-5 h-5 text-amber-400" />,
    'Firebase Cloud Firestore': <Database className="w-5 h-5 text-amber-500" />,
    'Firebase Cloud Messaging (FCM)': <Bell className="w-5 h-5 text-rose-400" />,
    'End-to-End Encryption (AES-256 + TLS 1.3)': <Cpu className="w-5 h-5 text-emerald-400" />,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {lang === 'hi' ? '4. ऐप में टेक्नोलॉजी (Technology Stack)' : '4. Core Technology & Architecture'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'hi'
                ? 'Flutter, Firebase, मिलिट्री-ग्रेड एन्क्रिप्शन एवं सुरक्षित API का तकनीकी विवरण'
                : 'Native Flutter engine, Firebase backend services, and AES-256 encryption specs'}
            </p>
          </div>
        </div>

        {/* Tech Stack Cards */}
        <div className="mt-5 space-y-3">
          {techStackDetails.map((tech) => (
            <div
              key={tech.tech}
              className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                {techIcons[tech.tech] || <Server className="w-5 h-5 text-cyan-400" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h4 className="text-sm font-bold text-white">
                    {tech.tech}
                  </h4>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Production Ready
                  </span>
                </div>
                <div className="text-xs text-cyan-400 font-medium mt-0.5">
                  {lang === 'hi' ? tech.roleHi : tech.roleEn}
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {lang === 'hi' ? tech.benefitHi : tech.benefitEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 p-4 rounded-2xl bg-slate-950/40 border border-slate-800/80 text-xs text-slate-400 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
          <span>
            {lang === 'hi'
              ? 'आर्किटेक्चर सुरक्षा मानक: जीरो-नॉलेज एन्क्रिप्शन के साथ सभी डेटा फोन पर स्थानीय रूप से और HTTPS TLS 1.3 टनल के माध्यम से प्रेषित होता है।'
              : 'Security Guarantee: Zero-Knowledge client architecture ensures sensitive credentials never traverse unencrypted networks.'}
          </span>
        </div>
      </div>
    </div>
  );
};
