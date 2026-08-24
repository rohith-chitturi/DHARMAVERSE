export type TranslationRecord = {
  en: string;
  hi: string;
  te: string;
};

export const uiDictionary: Record<string, TranslationRecord> = {
  // Navigation
  "nav.home": { en: "Home", hi: "मुख्य पृष्ठ", te: "హోమ్" },
  "nav.discover": { en: "Discover", hi: "खोजें", te: "అన్వేషించండి" },
  "nav.characters": { en: "Characters", hi: "पात्र", te: "పాత్రలు" },
  "nav.moments": { en: "Moments", hi: "प्रसंग", te: "ఘట్టాలు" },
  "nav.perspectives": { en: "Perspectives", hi: "दृष्टिकोण", te: "దృక్కోణాలు" },
  "nav.universe": { en: "Universe", hi: "ब्रह्मांड", te: "విశ్వం" },
  "nav.dharmaMirror": { en: "Dharma Mirror", hi: "धर्म दर्पण", te: "ధర్మ దర్పణం" },
  "nav.epicJourney": { en: "Epic Journey", hi: "महाकाव्य यात्रा", te: "మహా ప్రయాణం" },
  "nav.chamber": { en: "Chamber", hi: "कथा कक्ष", te: "కథా మందిరం" },
  "nav.about": { en: "About", hi: "परिचय", te: "గురించి" },

  // Mirror UI
  "mirror.gaze": { en: "Gaze Into The Mirror", hi: "दर्पण में देखें", te: "దర్పణంలో చూడండి" },
  "mirror.leave": { en: "Leave Chamber", hi: "कक्ष छोड़ें", te: "గది నుండి నిష్క్రమించండి" },
  "mirror.title": { en: "The Dharma Mirror", hi: "धर्म दर्पण", te: "ధర్మ దర్పణం" },
  "mirror.subtitle": { 
    en: "Until now, you have explored the Epic. Now, the Epic will explore you. Step into the reflection chamber and discover what your choices reveal about your soul.",
    hi: "अब तक आपने महाकाव्य का अन्वेषण किया है। अब महाकाव्य आपका अन्वेषण करेगा। चिंतन कक्ष में कदम रखें और जानें कि आपके विकल्प आपकी आत्मा के बारे में क्या प्रकट करते हैं।",
    te: "ఇంతవరకు మీరు మహాభారతాన్ని అన్వేషించారు. ఇప్పుడు మహాభారతం మిమ్మల్ని అన్వేషిస్తుంది. ప్రతిబింబ గదిలోకి అడుగుపెట్టి, మీ ఎంపికలు మీ ఆత్మ గురించి ఏమి తెలియజేస్తాయో కనుక్కోండి."
  },
  
  // Settings UI
  "settings.title": { en: "Global Settings", hi: "वैश्विक सेटिंग्स", te: "గ్లోబల్ సెట్టింగులు" },
  "settings.language": { en: "Language", hi: "भाषा", te: "భాష" },
  "settings.readability": { en: "Readability Mode", hi: "पठनीयता मोड", te: "చదవడానికి సులభతరం" },
  "settings.knowledge": { en: "Mahabharata Knowledge", hi: "महाभारत ज्ञान", te: "మహాభారత పరిజ్ఞానం" },
  "settings.simplified": { en: "Explain Like I'm New", hi: "मुझे नया समझकर समझाएं", te: "నేను కొత్తవాడినని భావించి వివరించండి" },
  // Chamber UI
  "chamber.title": { en: "Akashic Narrative Chamber", hi: "आकाशिक कथा कक्ष", te: "ఆకాశిక కథా మందిరం" },
  "chamber.observer": { en: "Observer Mode", hi: "दर्शक मोड", te: "వీక్షక మోడ్" },
  "chamber.participant": { en: "Participant Mode", hi: "प्रतिभागी मोड", te: "పాల్గొనే మోడ్" },
  "chamber.speed.normal": { en: "Normal", hi: "सामान्य", te: "సాధారణ" },
  "chamber.speed.fast": { en: "Fast", hi: "तेज़", te: "వేగవంతమైన" },
  "chamber.speed.cinematic": { en: "Cinematic", hi: "सिनेमैटिक", te: "సినిమాటిక్" },
  "chamber.pause": { en: "Pause Scene", hi: "दृश्य रोकें", te: "దృశ్యాన్ని ఆపండి" },
  "chamber.resume": { en: "Resume Scene", hi: "दृश्य जारी रखें", te: "దృశ్యాన్ని కొనసాగించండి" },
  "chamber.next": { en: "Next Speaker", hi: "अगला वक्ता", te: "తదుపరి వక్త" },
  "chamber.exit": { en: "Exit Chamber", hi: "कक्ष छोड़ें", te: "గది నుండి నిష్క్రమించండి" },
  "chamber.yourResponse": { en: "What would you say?", hi: "आप क्या कहेंगे?", te: "మీరు ఏమి చెబుతారు?" },

  // Characters Page
  "characters.title": { en: "The Legends of Kurukshetra", hi: "कुरुक्षेत्र के महानायक", te: "కురుక్షేత్ర వీరులు" },
  "characters.subtitle": { en: "Explore the lives, motivations, and destinies of the epic's greatest figures.", hi: "महाकाव्य की महानतम हस्तियों के जीवन, प्रेरणाओं और नियति का अन्वेषण करें।", te: "మహాకావ్యంలోని గొప్ప వ్యక్తుల జీవితాలు, ప్రేరణలు మరియు విధిని అన్వేషించండి." },

  // Moments Page
  "moments.title": { en: "Defining Moments", hi: "निर्णायक क्षण", te: "నిర్ణయాత్మక ఘట్టాలు" },
  "moments.subtitle": { en: "The events that shaped the destiny of the world.", hi: "वे घटनाएँ जिन्होंने दुनिया की नियति को आकार दिया।", te: "ప్రపంచ భవిష్యత్తును తీర్చిదిద్దిన సంఘటనలు." },

  // Find My Character (Quiz)
  "quiz.title": { en: "Find Your Resonance", hi: "अपना स्वरूप खोजें", te: "మీ ప్రతిరూపాన్ని కనుగొనండి" },
  "quiz.start": { en: "Begin Journey", hi: "यात्रा शुरू करें", te: "ప్రయాణం ప్రారంభించండి" },
  "quiz.question1": { en: "In the face of injustice, what is your first instinct?", hi: "अन्याय के सामने आपकी पहली प्रतिक्रिया क्या होती है?", te: "అన్యాయం ఎదురైనప్పుడు మీ మొదటి స్పందన ఏమిటి?" },
  "quiz.q1.a": { en: "Diplomacy and patience", hi: "कूटनीति और धैर्य", te: "రాజనీతి మరియు సహనం" },
  "quiz.q1.b": { en: "Immediate rebellion", hi: "तत्काल विद्रोह", te: "తక్షణ తిరుగుబాటు" },
  "quiz.q1.c": { en: "Strategic calculation", hi: "रणनीतिक गणना", te: "వ్యూహాత్మక గణన" },
  "quiz.q1.d": { en: "Protecting loved ones", hi: "अपनों की रक्षा करना", te: "ప్రియమైనవారిని రక్షించడం" },

  // General UI
  "ui.loading": { en: "Loading...", hi: "लोड हो रहा है...", te: "లోడ్ అవుతోంది..." },
  "ui.error": { en: "An error occurred", hi: "एक त्रुटि हुई", te: "ఒక లోపం సంభవించింది" },
  "ui.back": { en: "Back", hi: "पीछे", te: "వెనుకకు" }
};
