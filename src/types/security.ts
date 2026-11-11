export type Language = 'hi' | 'en';

export type TabType = 
  | 'dashboard' 
  | 'privacy' 
  | 'scanner' 
  | 'scams' 
  | 'passwords' 
  | 'monetization' 
  | 'report';

export interface AppPermission {
  id: string;
  name: string;
  nameHi: string;
  category: 'camera' | 'microphone' | 'location' | 'contacts' | 'gallery' | 'sms' | 'storage';
  riskLevel: 'high' | 'medium' | 'safe';
  riskDescriptionEn: string;
  riskDescriptionHi: string;
  appsCount: number;
  appsList: {
    name: string;
    icon: string;
    isGranted: boolean;
    isSuspicious: boolean;
    recommendation: string;
    recommendationHi: string;
  }[];
}

export interface SecurityCheckItem {
  id: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  category: 'privacy' | 'security' | 'scam' | 'password';
  isCompleted: boolean;
  scoreWeight: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  actionLabelEn: string;
  actionLabelHi: string;
}

export interface RecentActivity {
  id: string;
  type: 'blocked' | 'warning' | 'audit' | 'fixed';
  titleEn: string;
  titleHi: string;
  time: string;
  icon: string;
}

export interface ScamSample {
  id: string;
  title: string;
  titleHi: string;
  type: 'sms' | 'url' | 'upi' | 'email';
  content: string;
  isScam: boolean;
  riskScore: number; // 0 to 100
  analysisEn: string;
  analysisHi: string;
  redFlags: string[];
  redFlagsHi: string[];
}
