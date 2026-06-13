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
  "settings.simplified": { en: "Explain Like I'm New", hi: "मुझे नया समझकर समझाएं", te: "నేను కొత్తవాడినని భావించి వివరించండి" }
};
