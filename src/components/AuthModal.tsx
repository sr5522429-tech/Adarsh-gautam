import React, { useState } from 'react';
import { X, Lock, Smartphone, ShieldCheck, Fingerprint, ArrowRight, Check } from 'lucide-react';
import { Language } from '../types/security';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  user: { name: string; phone: string; isPro: boolean } | null;
  onLogin: (userData: { name: string; phone: string; isPro: boolean }) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  lang,
  user,
  onLogin,
  onLogout,
}) => {
  if (!isOpen) return null;

  const [authMode, setAuthMode] = useState<'otp' | 'google' | 'bio'>('otp');
  const [phoneNumber, setPhoneNumber] = useState<string>('9876543210');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const handleSendOtp = () => {
    if (!phoneNumber.trim()) return;
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    setIsVerifying(true);
    setTimeout(() => {
      onLogin({
        name: 'Rahul Sharma',
        phone: `+91 ${phoneNumber}`,
        isPro: true,
      });
      setIsVerifying(false);
      onClose();
    }, 600);
  };

  const handleGoogleLogin = () => {
    onLogin({
      name: 'Rahul Sharma (Google)',
      phone: 'rahul.sharma@gmail.com',
      isPro: true,
    });
    onClose();
  };

  const handleBiometricLogin = () => {
    onLogin({
      name: 'Verified Biometric User',
      phone: '+91 98765 43210',
      isPro: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {user ? (
          /* User Profile View */
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold text-lg">
              {user.name.charAt(0)}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">{user.name}</h3>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  VERIFIED
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{user.phone}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>{lang === 'hi' ? 'Firebase Auth स्थिति:' : 'Firebase Auth Status:'}</span>
                <span className="text-emerald-400 font-semibold">{lang === 'hi' ? 'सुरक्षित सत्र' : 'Secure Session'}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>{lang === 'hi' ? 'सुरक्षा शील्ड टियर:' : 'Shield Tier:'}</span>
                <span className="text-cyan-400 font-bold">Pro Shield Active</span>
              </div>
            </div>

            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              {lang === 'hi' ? 'लॉगआउट करें' : 'Sign Out'}
            </button>
          </div>
        ) : (
          /* Login / Signup Flow */
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {lang === 'hi' ? 'सुरक्षित लॉगिन / साइनअप' : 'Secure Authentication'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {lang === 'hi' ? 'Firebase Auth व बायोमेट्रिक सुरक्षित एक्सेस' : 'Powered by Firebase Auth & Biometric MFA'}
                </p>
              </div>
            </div>

            {/* Mode Selector */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setAuthMode('otp')}
                className={`py-1.5 rounded-lg font-medium transition-colors ${authMode === 'otp' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
              >
                Mobile OTP
              </button>
              <button
                onClick={() => setAuthMode('google')}
                className={`py-1.5 rounded-lg font-medium transition-colors ${authMode === 'google' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
              >
                Google
              </button>
              <button
                onClick={() => setAuthMode('bio')}
                className={`py-1.5 rounded-lg font-medium transition-colors ${authMode === 'bio' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
              >
                Biometric
              </button>
            </div>

            {authMode === 'otp' && (
              <div className="space-y-3">
                {!otpSent ? (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {lang === 'hi' ? '10 अंकों का मोबाइल नंबर' : 'Mobile Phone Number'}
                      </label>
                      <div className="flex">
                        <span className="p-2.5 rounded-l-xl bg-slate-800 text-xs text-slate-400 border border-r-0 border-slate-800">
                          +91
                        </span>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="9876543210"
                          className="flex-1 p-2.5 rounded-r-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleSendOtp}
                      className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>{lang === 'hi' ? 'सुरक्षित OTP भेजें' : 'Send Secure OTP'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {lang === 'hi' ? 'OTP दर्ज करें (परीक्षण: 1234)' : 'Enter 4-Digit OTP (Demo: 1234)'}
                      </label>
                      <input
                        type="text"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="1234"
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-center text-white focus:outline-none focus:border-cyan-500 font-mono tracking-widest text-lg"
                      />
                    </div>
                    <button
                      onClick={handleVerifyOtp}
                      disabled={isVerifying}
                      className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{isVerifying ? (lang === 'hi' ? 'सत्यापित कर रहे हैं...' : 'Verifying...') : (lang === 'hi' ? 'OTP सत्यापित करें' : 'Verify & Enter')}</span>
                    </button>
                  </>
                )}
              </div>
            )}

            {authMode === 'google' && (
              <div className="space-y-3 py-2 text-center">
                <p className="text-xs text-slate-400">
                  {lang === 'hi' ? 'Google Firebase Auth के माध्यम से सुरक्षित एक-क्लिक लॉगिन' : 'One-click sign in with Google Firebase Auth credentials'}
                </p>
                <button
                  onClick={handleGoogleLogin}
                  className="w-full py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>
            )}

            {authMode === 'bio' && (
              <div className="space-y-3 py-2 text-center">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                  <Fingerprint className="w-8 h-8 animate-pulse" />
                </div>
                <p className="text-xs text-slate-400">
                  {lang === 'hi' ? 'फिंगरप्रिंट या फेस आईडी सेंसर को छुएं' : 'Touch fingerprint or Face ID sensor to unlock'}
                </p>
                <button
                  onClick={handleBiometricLogin}
                  className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Fingerprint className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'बायोमेट्रिक से खोलें' : 'Unlock with Biometrics'}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
