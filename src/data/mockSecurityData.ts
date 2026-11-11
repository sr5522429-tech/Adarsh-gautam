import { AppPermission, SecurityCheckItem, RecentActivity, ScamSample } from '../types/security';

export const initialPermissions: AppPermission[] = [
  {
    id: 'perm_camera',
    name: 'Camera Permission',
    nameHi: 'कैमरा अनुमति',
    category: 'camera',
    riskLevel: 'high',
    riskDescriptionEn: '4 apps have camera access. Rogue apps can secretly take photos without notification dots.',
    riskDescriptionHi: '4 ऐप्स के पास कैमरा एक्सेस है। संदिग्ध ऐप्स बिना आपकी जानकारी के फोटो या वीडियो रिकॉर्ड कर सकते हैं।',
    appsCount: 4,
    appsList: [
      { name: 'WhatsApp', icon: 'MessageCircle', isGranted: true, isSuspicious: false, recommendation: 'Essential for video calls', recommendationHi: 'वीडियो कॉल के लिए आवश्यक' },
      { name: 'Torch & Flashlight Pro', icon: 'Flashlight', isGranted: true, isSuspicious: true, recommendation: 'Revoke! Flashlights do NOT need camera sensor.', recommendationHi: 'अनुमति हटाएं! टॉर्च को कैमरे की आवश्यकता नहीं है।' },
      { name: 'Instagram', icon: 'Camera', isGranted: true, isSuspicious: false, recommendation: 'Used for stories & reels', recommendationHi: 'रील्स व स्टोरीज़ के लिए' },
      { name: 'BeautyFilter Free', icon: 'Sparkles', isGranted: true, isSuspicious: true, recommendation: 'Suspicious! Background camera access detected.', recommendationHi: 'संदिग्ध! बैकग्राउंड में कैमरा एक्सेस देखा गया।' },
    ]
  },
  {
    id: 'perm_mic',
    name: 'Microphone Permission',
    nameHi: 'माइक्रोफोन (माइक) अनुमति',
    category: 'microphone',
    riskLevel: 'high',
    riskDescriptionEn: '5 apps can listen to ambient audio and conversations for profiling.',
    riskDescriptionHi: '5 ऐप्स आपकी आवाज़ व बातचीत सुन सकते हैं और लक्षित विज्ञापनों के लिए प्रोफाइलिंग कर सकते हैं।',
    appsCount: 5,
    appsList: [
      { name: 'Phone Dialer', icon: 'Phone', isGranted: true, isSuspicious: false, recommendation: 'Core system app', recommendationHi: 'सिस्टम कॉल ऐप' },
      { name: 'WhatsApp', icon: 'Mic', isGranted: true, isSuspicious: false, recommendation: 'Voice notes & calls', recommendationHi: 'वॉइस नोट्स व कॉल के लिए' },
      { name: 'Free Offline MP3 Player', icon: 'Music', isGranted: true, isSuspicious: true, recommendation: 'Revoke! Audio players only play sound, not record it.', recommendationHi: 'हटाएं! म्यूजिक प्लेयर को रिकॉर्डिंग की जरूरत नहीं होती।' },
      { name: 'Social Video Shorts', icon: 'Video', isGranted: true, isSuspicious: false, recommendation: 'Audio dubbing & clips', recommendationHi: 'डबिंग व क्लिप्स के लिए' },
    ]
  },
  {
    id: 'perm_location',
    name: 'Precise Location Tracking',
    nameHi: 'सटीक लोकेशन (GPS) ट्रैकिंग',
    category: 'location',
    riskLevel: 'medium',
    riskDescriptionEn: 'Precise GPS coordinates reveal your exact home and workplace routines.',
    riskDescriptionHi: 'सटीक GPS कोऑर्डिनेट्स से आपके घर, दफ्तर और दैनिक आवागमन का सटीक पता चलता है।',
    appsCount: 6,
    appsList: [
      { name: 'Google Maps', icon: 'Navigation', isGranted: true, isSuspicious: false, recommendation: 'Essential for navigation', recommendationHi: 'नेविगेशन के लिए आवश्यक' },
      { name: 'Food Delivery Fast', icon: 'Truck', isGranted: true, isSuspicious: false, recommendation: 'Change to "While Using App Only"', recommendationHi: 'सिर्फ "ऐप का उपयोग करते समय" पर सेट करें' },
      { name: 'Calculator Plus', icon: 'Calculator', isGranted: true, isSuspicious: true, recommendation: 'Severe Risk! A calculator NEVER needs your GPS.', recommendationHi: 'गंभीर खतरा! कैलकुलेटर को GPS की कतई जरूरत नहीं है।' },
    ]
  },
  {
    id: 'perm_contacts',
    name: 'Contact Book Access',
    nameHi: 'कॉन्टैक्ट लिस्ट (फोन बुक)',
    category: 'contacts',
    riskLevel: 'high',
    riskDescriptionEn: 'Contact access can upload your entire address book to rogue marketing servers.',
    riskDescriptionHi: 'पूरी फोनबुक अनधिकृत सर्वर पर अपलोड हो सकती है जिससे रिश्तेदारों को स्पैम कॉल आ सकते हैं।',
    appsCount: 3,
    appsList: [
      { name: 'WhatsApp', icon: 'Users', isGranted: true, isSuspicious: false, recommendation: 'Used to find contacts', recommendationHi: 'कॉन्टैक्ट्स ढूँढने के लिए' },
      { name: 'Instant Loan Fast Cash', icon: 'CreditCard', isGranted: true, isSuspicious: true, recommendation: 'EXTREME DANGER: Chinese fake loan apps blackmail family using contacts!', recommendationHi: 'अति संवेदनशील खतरा: फर्जी लोन ऐप्स रिश्तेदारों को कॉल कर ब्लैकमेल करते हैं!' },
    ]
  },
  {
    id: 'perm_gallery',
    name: 'Photos & Storage Access',
    nameHi: 'गैलरी व पर्सनल फोटोज',
    category: 'gallery',
    riskLevel: 'medium',
    riskDescriptionEn: 'Full storage permission exposes Aadhaar cards, PAN copies, and private memories.',
    riskDescriptionHi: 'फुल स्टोरेज एक्सेस से आधार कार्ड, पैन कार्ड और निजी तस्वीरों के लीक होने का खतरा होता है।',
    appsCount: 8,
    appsList: [
      { name: 'Google Photos', icon: 'Image', isGranted: true, isSuspicious: false, recommendation: 'Cloud backup service', recommendationHi: 'क्लाउड बैकअप सेवा' },
      { name: 'PDF Scanner & Reader', icon: 'FileText', isGranted: true, isSuspicious: true, recommendation: 'Switch to Android Scoped Photo Picker', recommendationHi: 'सिर्फ चुनिंदा फाइलों तक सीमित रखें' },
    ]
  }
];

export const initialSecurityChecklist: SecurityCheckItem[] = [
  {
    id: 'chk_2fa',
    titleEn: 'Enable Two-Factor Authentication (2FA) on Gmail & WhatsApp',
    titleHi: 'Gmail और WhatsApp पर टू-फैक्टर ऑथेंटिकेशन (2FA) चालू करें',
    descEn: 'Prevents account takeover even if an attacker steals your password.',
    descHi: 'पासवर्ड चोरी होने पर भी कोई आपका अकाउंट हैक नहीं कर पाएगा।',
    category: 'security',
    isCompleted: false,
    scoreWeight: 20,
    severity: 'critical',
    actionLabelEn: 'Set up 2FA',
    actionLabelHi: '2FA चालू करें'
  },
  {
    id: 'chk_screen_lock',
    titleEn: 'Biometric Screen Lock & 6-Digit PIN',
    titleHi: 'बायोमेट्रिक स्क्रीन लॉक और 6-अंकों का पिन',
    descEn: 'Avoid simple 4-digit PINs like 1234 or birth years.',
    descHi: 'साधारण 1234 या जन्म वर्ष वाले कमजोर पिन से बचें।',
    category: 'security',
    isCompleted: true,
    scoreWeight: 15,
    severity: 'high',
    actionLabelEn: 'Configured',
    actionLabelHi: 'सक्रिय है'
  },
  {
    id: 'chk_upi_pin',
    titleEn: 'Never Share or Enter UPI PIN to "Receive" Money',
    titleHi: 'पैसे प्राप्त करने के लिए कभी UPI PIN न डालें',
    descEn: 'UPI PIN is ONLY required when money is DEDUCTED from your bank.',
    descHi: 'UPI PIN केवल बैंक से पैसे कटने (भेजने) के समय ही माँगा जाता है।',
    category: 'scam',
    isCompleted: true,
    scoreWeight: 20,
    severity: 'critical',
    actionLabelEn: 'Acknowledged',
    actionLabelHi: 'नियम याद है'
  },
  {
    id: 'chk_revoke_loan',
    titleEn: 'Revoke Contacts & Storage from Unverified Loan/Utility Apps',
    titleHi: 'अनवेरिफाइड लोन/यूटिलिटी ऐप्स से कॉन्टैक्ट व स्टोरेज अनुमति हटाएं',
    descEn: '1 suspicious utility app currently holds dangerous contact permissions.',
    descHi: '1 संदिग्ध ऐप के पास अभी भी कॉन्टैक्ट्स की संवेदनशील अनुमति है।',
    category: 'privacy',
    isCompleted: false,
    scoreWeight: 15,
    severity: 'critical',
    actionLabelEn: 'Revoke Now',
    actionLabelHi: 'अभी हटाएं'
  },
  {
    id: 'chk_dark_web',
    titleEn: 'Check Leaked Passwords on Dark Web Database',
    titleHi: 'डार्क वेब पर लीक हुए पासवर्ड्स की जांच करें',
    descEn: 'Old email passwords might be exposed in public breaches.',
    descHi: 'पुराने ईमेल्स के पासवर्ड्स पब्लिक डेटा ब्रीच में लीक हो सकते हैं।',
    category: 'password',
    isCompleted: false,
    scoreWeight: 15,
    severity: 'high',
    actionLabelEn: 'Run Breach Scan',
    actionLabelHi: 'स्कैन करें'
  },
  {
    id: 'chk_anti_phishing',
    titleEn: 'Verify Bank SMS Headers (e.g. AXIS, SBI, HDFC vs Unknown Numbers)',
    titleHi: 'बैंक SMS हेडर की जांच करें (जैसे VM-HDFCBK बनाम 10 अंकों का मोबाइल नंबर)',
    descEn: 'Real banks NEVER send SMS from regular 10-digit mobile numbers.',
    descHi: 'असली बैंक कभी 10 अंकों के निजी मोबाइल नंबर से जरूरी अलर्ट नहीं भेजते।',
    category: 'scam',
    isCompleted: true,
    scoreWeight: 15,
    severity: 'medium',
    actionLabelEn: 'Learned',
    actionLabelHi: 'सुरक्षित नियम'
  }
];

export const initialActivities: RecentActivity[] = [
  {
    id: 'act_1',
    type: 'blocked',
    titleEn: 'Blocked deceptive link: onlinesbi.co.in.kyc-verify.top',
    titleHi: 'फर्जी फ़िशिंग लिंक ब्लॉक किया: onlinesbi.co.in.kyc-verify.top',
    time: '12 min ago',
    icon: 'ShieldAlert'
  },
  {
    id: 'act_2',
    type: 'warning',
    titleEn: 'Dangerous contact permission flagged on "Torch & Flashlight Pro"',
    titleHi: '"Torch & Flashlight Pro" ऐप में कॉन्टैक्ट अनुमति पर चेतावनी जारी की',
    time: '2 hours ago',
    icon: 'AlertTriangle'
  },
  {
    id: 'act_3',
    type: 'fixed',
    titleEn: 'Device OS Security Patch Level verified (Up-to-date)',
    titleHi: 'डिवाइस OS सुरक्षा पैच की पुष्टि की गई (अप-टू-डेट)',
    time: 'Yesterday',
    icon: 'CheckCircle2'
  },
  {
    id: 'act_4',
    type: 'audit',
    titleEn: 'WhatsApp End-to-End Chat Encryption verified active',
    titleHi: 'WhatsApp एंड-टू-एंड एन्क्रिप्शन सक्रिय पाया गया',
    time: '2 days ago',
    icon: 'Lock'
  }
];

export const scamSamples: ScamSample[] = [
  {
    id: 'scam_sms_electricity',
    title: 'Electricity Bill Disconnect Scam',
    titleHi: 'बिजली बिल कटने का फर्जी SMS',
    type: 'sms',
    content: 'Dear consumer, your electricity power will be disconnected tonight at 9:30 PM from the power sub-station office because your previous month bill was not updated. Please immediately call electricity officer on 9876543210.',
    isScam: true,
    riskScore: 98,
    analysisEn: 'HIGH SEVERITY FRAUD: Electricity boards never send SMS from personal 10-digit phone numbers and never give panic 9:30 PM deadlines. Calling this number will lead to an APK download trap or AnyDesk remote screen share scam.',
    analysisHi: 'अत्यंत गंभीर धोखाधड़ी: बिजली बोर्ड कभी भी 10 अंकों के निजी मोबाइल नंबर से SMS नहीं भेजते और न ही रात 9:30 बजे की डेडलाइन देते हैं। इस नंबर पर कॉल करने पर ठग AnyDesk या फर्जी APK डाउनलोड करवाकर बैंक खाली कर देते हैं।',
    redFlags: [
      'Sent from personal mobile number instead of official header like DM-BSES / VM-UPPCL',
      'Artificial panic deadline ("tonight at 9:30 PM")',
      'Asks to call a personal phone number rather than official portal'
    ],
    redFlagsHi: [
      'निजी मोबाइल नंबर से भेजा गया, आधिकारिक हेडर नहीं है',
      'घबराहट पैदा करने वाली रात 9:30 बजे की झूठी समय सीमा',
      'आधिकारिक ऐप के बजाय किसी अनजान नंबर पर कॉल करने का दबाव'
    ]
  },
  {
    id: 'scam_sms_sbi_kyc',
    title: 'Bank KYC Expired / Account Blocked Trap',
    titleHi: 'बैंक खाता ब्लॉक और पैन कार्ड अपडेट झांसा',
    type: 'sms',
    content: 'Dear SBI Customer, your YONO account has been suspended today due to missing PAN verification. Kindly click here immediately to update your documents and prevent permanent closure: http://sbi-kyc-secure-verify.site/login',
    isScam: true,
    riskScore: 99,
    analysisEn: 'CRITICAL PHISHING ATTACK: Deceptive domain mimicking SBI. Banks NEVER send clickable links via SMS to update PAN or Aadhaar. Entering credentials or OTP here transfers money straight to cyber criminals.',
    analysisHi: 'गंभीर फ़िशिंग हमला: यह SBI की नकली वेबसाइट है। कोई भी बैंक SMS में लिंक भेजकर कभी भी पैन या आधार अपडेट नहीं करवाता। यहाँ लॉगिन या OTP डालते ही खाता खाली हो जाएगा।',
    redFlags: [
      'Fake domain ending in ".site" instead of "onlinesbi.sbi"',
      'No HTTPS lock on link (insecure HTTP protocol)',
      'Threat of immediate "permanent closure"'
    ],
    redFlagsHi: [
      'फर्जी डोमेन ".site" (असली डोमेन "onlinesbi.sbi" होता है)',
      'असुरक्षित HTTP लिंक',
      'खाता तुरंत बंद होने की झूठी धमकी'
    ]
  },
  {
    id: 'scam_upi_qr',
    title: 'OLX / Marketplace QR Code Payment Trap',
    titleHi: 'OLX / क्यूआर कोड स्कैन करके पैसे मिलने का झांसा',
    type: 'upi',
    content: 'Sir I want to buy your sofa on OLX. I am in Indian Army and cannot come in person. I have generated a merchant QR code for ₹15,000. Just open PhonePe/GPay, scan this QR code and enter your UPI PIN to instantly receive ₹15,000 in your bank account.',
    isScam: true,
    riskScore: 100,
    analysisEn: 'FATAL UPI FRAUD: "Scan QR & Enter PIN to Receive Money" is impossible in UPI architecture. Entering your UPI PIN ALWAYS DEDUCTS money from your account. The fraudster impersonates Army/Police personnel to gain unearned trust.',
    analysisHi: 'अति घातक UPI फ्रॉड: UPI में पैसे "प्राप्त करने" के लिए कभी भी QR कोड स्कैन करने या PIN डालने की जरूरत नहीं होती। जैसे ही आप PIN डालेंगे, ₹15,000 आपके खाते से कट जाएंगे! ठग अक्सर सेना या पुलिस के फर्जी आईडी कार्ड दिखाकर भरोसा जीतते हैं।',
    redFlags: [
      'Universal UPI Rule: PIN is ONLY for paying, NEVER for receiving',
      'Impersonating Army/Defense personnel with fake ID photo',
      'Refusal to meet in person or pay via normal phone number UPI transfer'
    ],
    redFlagsHi: [
      'गोल्डन नियम: UPI PIN केवल पैसे काटने के लिए होता है, पाने के लिए नहीं',
      'सेना या पुलिसकर्मी बनकर फर्जी पहचान पत्र भेजना',
      'सीधे मोबाइल नंबर पर पैसे भेजने से बचना और QR स्कैन करने की जिद'
    ]
  },
  {
    id: 'scam_sms_legit_sample',
    title: 'Legitimate Bank Transaction SMS (Safe)',
    titleHi: 'असली बैंक लेनदेन का SMS (सुरक्षित उदाहरण)',
    type: 'sms',
    content: 'Rs. 450.00 debited from A/c XX4091 on 11-NOV-26 12:45:10 via UPI/P2M to Reliance Fresh. Bal: Rs. 14,320.10. If not done by you, SMS BLOCK to 567676 or call 18001234.',
    isScam: false,
    riskScore: 2,
    analysisEn: 'SAFE / LEGITIMATE: Standard banking notification containing masked account number (XX4091), exact transaction timestamp, no suspicious links, and standard toll-free customer support helpline.',
    analysisHi: 'सुरक्षित एवं असली SMS: इसमें बैंक खाता नंबर छिपा हुआ (XX4091) है, कोई संदिग्ध लिंक नहीं है, और बैंक का आधिकारिक टोल-फ्री नंबर दिया गया है।',
    redFlags: [],
    redFlagsHi: []
  }
];

export const monetizationPlans = [
  {
    id: 'free',
    name: 'निःशुल्क सुरक्षा (Free Shield)',
    nameEn: 'Free Shield',
    price: '₹0',
    period: 'Life-time Free',
    periodHi: 'आजीवन मुफ्त',
    popular: false,
    badge: 'आवश्यक सुरक्षा',
    badgeEn: 'Essential',
    featuresEn: [
      'Basic Device Security Score (0-100%)',
      'App Permission Audit (Camera, Mic, GPS)',
      'Up to 3 Scam & Phishing Link Scans / day',
      'Strong Password Generator & Crack Time',
      'Cyber Fraud Helpline 1930 Guide & Draft'
    ],
    featuresHi: [
      'बुनियादी डिवाइस सुरक्षा स्कोर (0-100%)',
      'ऐप परमिशन ऑडिट (कैमरा, माइक, लोकेशन)',
      'प्रतिदिन 3 स्कैम व लिंक चेक्स',
      'मजबूत पासवर्ड जनरेटर और सुरक्षा सुझाव',
      'साइबर फ्रॉड हेल्पलाइन 1930 गाइड'
    ]
  },
  {
    id: 'pro',
    name: 'रक्षागार्ड प्रो (Pro Shield)',
    nameEn: 'RakshaGuard Pro',
    price: '₹149',
    period: '/ Month (या ₹999/वर्ष)',
    periodHi: '/ महीना (या ₹999/वर्ष)',
    popular: true,
    badge: 'सर्वाधिक लोकप्रिय',
    badgeEn: 'Most Popular',
    featuresEn: [
      'Everything in Free Shield',
      '24/7 Dark Web Breach & Email Leak Radar',
      'Unlimited AI Phishing, SMS & QR Code Scans',
      'Real-time Rogue App & Mic Spy Alerts',
      'Automated Bank Fraud Draft for cybercrime.gov.in',
      'Priority Cyber Legal & Financial Recovery Guidance'
    ],
    featuresHi: [
      'फ्री शील्ड के सभी फीचर्स शामिल',
      '24/7 डार्क वेब ब्रीच और ईमेल लीक रडार',
      'असीमित AI स्कैम, SMS व QR कोड स्कैनर',
      'बैकग्राउंड में जासूसी करने वाले ऐप्स पर तुरंत अलर्ट',
      'साइबर पोर्टल के लिए ऑटो-जेनरेटेड पुलिस कंप्लेंट ड्राफ्ट',
      'प्राथमिकता पर साइबर हेल्पलाइन सहायता मार्गदर्शन'
    ]
  },
  {
    id: 'business',
    name: 'बिजनेस सुरक्षा (Enterprise Shield)',
    nameEn: 'Enterprise & SME Shield',
    price: '₹2,499',
    period: '/ Month (Up to 25 Devices)',
    periodHi: '/ महीना (25 डिवाइस तक)',
    popular: false,
    badge: 'व्यापारियों के लिए',
    badgeEn: 'For Teams',
    featuresEn: [
      'Multi-Device Unified Central Security Console',
      'Employee Phishing Simulation & Awareness Tests',
      'UPI Merchant Soundbox & QR Tampering Guard',
      'Data Leak Prevention (DLP) for Customer PII',
      'Dedicated Cyber Security Incident Response Manager'
    ],
    featuresHi: [
      'मल्टी-डिवाइस सेंट्रलाइज्ड सुरक्षा कंसोल',
      'कर्मचारियों के लिए फर्जी ईमेल/फ़िशिंग टेस्टिंग',
      'दुकानदारों के लिए मर्चेंट QR व साउंडबॉक्स फ्रॉड गार्ड',
      'ग्राहक डेटा चोरी (PII) सुरक्षा ऑडिट',
      'समर्पित साइबर सुरक्षा सलाहकार सहायता'
    ]
  }
];

export const techStackDetails = [
  {
    tech: 'Flutter Framework',
    roleEn: 'Cross-platform native mobile application (Android & iOS)',
    roleHi: 'क्रॉस-प्लेटफ़ॉर्म मोबाइल ऐप इंजन (एंड्रॉइड और iOS दोनों के लिए)',
    benefitEn: 'Smooth 120Hz high-performance UI and direct native OS permission channel integration',
    benefitHi: 'स्मूद 120Hz परफॉरमेंस और फोन के हार्डवेयर व परमिशन सिस्टम से सीधा संपर्क'
  },
  {
    tech: 'Firebase Authentication',
    roleEn: 'Secure Login, OTP Sign-in & Biometrics Sync',
    roleHi: 'सुरक्षित लॉगिन, मोबाइल OTP और बायोमेट्रिक्स सत्यापन',
    benefitEn: 'Zero password exposure, brute-force mitigation, and multi-factor authentication (MFA)',
    benefitHi: 'पासवर्ड लीक होने का शून्य खतरा और ब्रूट-फोर्स हमलों से सुरक्षा'
  },
  {
    tech: 'Firebase Cloud Firestore',
    roleEn: 'Encrypted User Preferences & Security Audit Logs',
    roleHi: 'एन्क्रिप्टेड यूजर डेटा और सुरक्षा ऑडिट लॉग्स',
    benefitEn: 'Sub-second real-time sync with strict Firestore Security Rules protecting user privacy',
    benefitHi: 'सख्त सिक्योरिटी रूल्स के साथ सुरक्षित डेटा स्टोरेज'
  },
  {
    tech: 'Firebase Cloud Messaging (FCM)',
    roleEn: 'Urgent Threat Push Alerts & Suspicious Login Warnings',
    roleHi: 'तत्काल खतरा पुश नोटिफिकेशन्स और नए लॉगिन अलर्ट्स',
    benefitEn: 'Instant background dispatch when data breach or malicious app behavior is detected',
    benefitHi: 'संदिग्ध गतिविधि या डेटा लीक होते ही फोन स्क्रीन पर तुरंत चेतावनी'
  },
  {
    tech: 'End-to-End Encryption (AES-256 + TLS 1.3)',
    roleEn: 'Zero-Knowledge Sensitive Vault & Network Traffic Protection',
    roleHi: 'संवेदनशील डेटा के लिए जीरो-नॉलेज मिलिट्री-ग्रेड एन्क्रिप्शन',
    benefitEn: 'Your confidential passwords and sensitive data cannot be read even by cloud admins',
    benefitHi: 'आपका डेटा इतना सुरक्षित कि कंपनी के इंजीनियर भी इसे नहीं देख सकते'
  }
];
