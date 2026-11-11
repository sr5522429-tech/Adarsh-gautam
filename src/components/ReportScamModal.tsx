import React, { useState } from 'react';
import { 
  X, 
  PhoneCall, 
  FileText, 
  Copy, 
  Check, 
  ExternalLink, 
  AlertOctagon, 
  Clock, 
  Building2, 
  Download 
} from 'lucide-react';
import { Language } from '../types/security';

interface ReportScamModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ReportScamModal: React.FC<ReportScamModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  const [fraudType, setFraudType] = useState<string>('upi');
  const [amount, setAmount] = useState<string>('15000');
  const [bankName, setBankName] = useState<string>('State Bank of India');
  const [utrNumber, setUtrNumber] = useState<string>('431289012345');
  const [scammerDetail, setScammerDetail] = useState<string>('scammer98@okaxis / Ph: 9876543210');
  const [incidentDate, setIncidentDate] = useState<string>('2026-11-11 11:30 AM');
  const [description, setDescription] = useState<string>(
    'Scammer called impersonating electricity board officer and sent fake UPI QR code stating bill was pending. After scanning, Rs. 15,000 was debited without consent.'
  );

  const [copiedDraft, setCopiedDraft] = useState<boolean>(false);

  // Generate formal police complaint draft
  const generatedDraft = `TO: The Cyber Crime Cell / National Cyber Crime Reporting Portal (cybercrime.gov.in)
SUBJECT: Urgent Complaint regarding Financial Cyber Fraud of INR ${amount}/- via ${fraudType.toUpperCase()}

Respected Officer,

I wish to report an urgent financial cyber fraud that occurred on ${incidentDate}.
Details of the transaction and fraudulent recipient are as follows:

1. Victim Bank: ${bankName}
2. Disputed Amount: INR ${amount}/-
3. Bank Transaction Reference (UTR / Txn ID): ${utrNumber}
4. Fraudster Account / UPI ID / Mobile: ${scammerDetail}
5. Modus Operandi: ${description}

As this complaint is being initiated within the Golden Hour window under the Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS / Helpline 1930), I kindly request immediate intimation to the recipient nodal bank/wallet to freeze and hold the disputed funds.

Thanking you,
Victim Name: [Your Full Name]
Registered Mobile: [Your Mobile Number]
Date: ${incidentDate}`;

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(generatedDraft);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {lang === 'hi' ? 'साइबर फ्रॉड रिपोर्टिंग असिस्टेंट (हेल्पलाइन 1930)' : 'National Cyber Fraud Incident Reporting'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'hi'
                ? 'आधिकारिक पुलिस व बैंक शिकायत ड्राफ्ट बनाएं और तुरंत 1930 पर सहायता लें'
                : 'Direct CFCFRMS 1930 assistance & official police complaint draft generator'}
            </p>
          </div>
        </div>

        {/* Golden Hour Urgency Alert */}
        <div className="mt-4 p-4 rounded-2xl bg-rose-950/40 border border-rose-800/40 space-y-2">
          <div className="flex items-center gap-2 text-rose-300 font-bold text-xs uppercase tracking-wider">
            <Clock className="w-4 h-4 text-rose-400" />
            <span>{lang === 'hi' ? 'गोल्डन ऑवर प्रोटोकॉल (Golden Hour Priority)' : 'Golden Hour Protocol (First 2 Hours)'}</span>
          </div>
          <p className="text-xs text-rose-100/90 leading-relaxed">
            {lang === 'hi'
              ? 'यदि ऑनलाइन वित्तीय धोखाधड़ी अभी-अभी हुई है, तो तुरंत 1930 पर कॉल करें। गृह मंत्रालय का CFCFRMS सिस्टम बैंक से तुरंत संपर्क करके ठग के खाते से निकासी रोक देता है!'
              : 'Dial 1930 immediately if the fraud occurred recently. The MHA CFCFRMS system connects to nodal banks to place an immediate lien on the fraudster wallet.'}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <a
              href="tel:1930"
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-950/60"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
              <span>{lang === 'hi' ? 'हेल्पलाइन 1930 पर कॉल करें' : 'Call 1930 Toll-Free'}</span>
            </a>

            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>cybercrime.gov.in</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Guided Form */}
        <div className="mt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {lang === 'hi' ? 'धोखाधड़ी का प्रकार' : 'Fraud Category'}
              </label>
              <select
                value={fraudType}
                onChange={(e) => setFraudType(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="upi">UPI / QR Code Fraud</option>
                <option value="netbanking">Net Banking / OTP Interception</option>
                <option value="fake_loan">Fake Instant Loan Blackmail</option>
                <option value="electricity">Electricity Bill / AnyDesk Remote Hack</option>
                <option value="lottery">Lottery / Part-time Job Task Scam</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {lang === 'hi' ? 'ठगी गई राशि (₹)' : 'Lost Amount (₹)'}
              </label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {lang === 'hi' ? 'आपका बैंक' : 'Victim Bank Name'}
              </label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {lang === 'hi' ? 'लेनदेन संदर्भ (UTR / Txn ID)' : 'Bank UTR / Transaction ID'}
              </label>
              <input
                type="text"
                value={utrNumber}
                onChange={(e) => setUtrNumber(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {lang === 'hi' ? 'ठग का UPI ID / फोन नंबर / बैंक खाता' : 'Fraudster Phone / UPI ID / Account'}
            </label>
            <input
              type="text"
              value={scammerDetail}
              onChange={(e) => setScammerDetail(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {lang === 'hi' ? 'घटना का संक्षिप्त विवरण' : 'Incident Details'}
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Generated Official Police Draft */}
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === 'hi' ? 'ऑटो-जेनरेटेड पुलिस व पोर्टल शिकायत ड्राफ्ट' : 'Auto-Generated Police & Nodal Bank Draft'}</span>
            </span>
            <button
              onClick={handleCopyDraft}
              className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-colors"
            >
              {copiedDraft ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedDraft ? (lang === 'hi' ? 'कॉपी हो गया!' : 'Copied!') : (lang === 'hi' ? 'ड्राफ्ट कॉपी करें' : 'Copy Draft')}</span>
            </button>
          </div>

          <pre className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed">
            {generatedDraft}
          </pre>
        </div>
      </div>
    </div>
  );
};
