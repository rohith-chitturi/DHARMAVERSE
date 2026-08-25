import { DharmaDecision } from "./types";

export const dharmaScenarios: DharmaDecision[] = [
  {
    id: "s1-betrayal",
    scenario: {
      en: "A lifelong friend, who has protected you in the past, commits a severe crime against an innocent. The authorities ask if you know who did it.",
      hi: "एक आजीवन मित्र, जिसने अतीत में आपकी रक्षा की है, एक निर्दोष के खिलाफ गंभीर अपराध करता है। अधिकारी पूछते हैं कि क्या आप जानते हैं कि यह किसने किया।",
      te: "గతంలో మిమ్మల్ని రక్షించిన ఒక ప్రాణ స్నేహితుడు, ఒక అమాయకుడిపై తీవ్రమైన నేరం చేస్తాడు. ఇది ఎవరు చేశారో మీకు తెలుసా అని అధికారులు అడుగుతారు."
    },
    options: [
      {
        text: {
          en: "Protect your friend. Loyalty supersedes the law.",
          hi: "अपने दोस्त की रक्षा करें। वफादारी कानून से ऊपर है।",
          te: "మీ స్నేహితుడిని రక్షించండి. చట్టం కంటే విధేయత గొప్పది."
        },
        impact: { Loyalty: 10, Justice: -5, Compassion: 5 },
        hiddenImpact: { Individualism: 5, Pragmatism: 5 },
        epicConnection: "Like Karna, you chose personal loyalty to a benefactor over absolute justice."
      },
      {
        text: {
          en: "Turn them in. Justice must be blind.",
          hi: "उन्हें सौंप दें। न्याय अंधा होना चाहिए।",
          te: "వారిని అప్పగించండి. న్యాయం నిష్పక్షపాతంగా ఉండాలి."
        },
        impact: { Justice: 10, Loyalty: -10, Duty: 5 },
        hiddenImpact: { Idealism: 10, Collectivism: 5 },
        epicConnection: "Like Vidura, you prioritize universal Dharma over personal attachment."
      },
      {
        text: {
          en: "Confront them privately and force them to confess.",
          hi: "उनका निजी तौर पर सामना करें और उन्हें कबूल करने के लिए मजबूर करें।",
          te: "వ్యక్తిగతంగా వారిని ఎదుర్కొని, నేరాన్ని అంగీకరించేలా ఒత్తిడి చేయండి."
        },
        impact: { Wisdom: 10, Justice: 5, Compassion: 5 },
        hiddenImpact: { Pragmatism: 5 },
        epicConnection: "Like Krishna, you seek a strategic path that fulfills duty without immediately breaking bonds."
      }
    ]
  },
  {
    id: "s2-power",
    scenario: {
      en: "You are offered immense power and wealth that rightfully belongs to your rival. If you accept, your family will thrive, but your rival will be ruined.",
      hi: "आपको अपार शक्ति और धन की पेशकश की जाती है जो सही मायने में आपके प्रतिद्वंद्वी का है। यदि आप स्वीकार करते हैं, तो आपका परिवार फलेगा-फूलेगा, लेकिन आपका प्रतिद्वंद्वी बर्बाद हो जाएगा।",
      te: "మీ ప్రత్యర్థికి న్యాయబద్ధంగా చెందాల్సిన అపారమైన అధికారం మరియు సంపద మీకు అందించబడ్డాయి. మీరు అంగీకరిస్తే, మీ కుటుంబం వృద్ధి చెందుతుంది, కానీ మీ ప్రత్యర్థి నాశనం అవుతాడు."
    },
    options: [
      {
        text: {
          en: "Accept it. Power secures the future for those I love.",
          hi: "इसे स्वीकार करें। शक्ति उन लोगों के भविष्य को सुरक्षित करती है जिनसे मैं प्यार करता हूँ।",
          te: "దానిని అంగీకరించండి. నేను ప్రేమించే వారి భవిష్యత్తును అధికారం రక్షిస్తుంది."
        },
        impact: { Ambition: 10, Sacrifice: -5, Duty: -5 },
        hiddenImpact: { Pragmatism: 10, Individualism: 5 },
        epicConnection: "Like Duryodhana, your ambition and desire to elevate your own eclipses traditional fairness."
      },
      {
        text: {
          en: "Reject it. What is not rightfully mine brings only ruin.",
          hi: "इसे अस्वीकार करें। जो सही मायने में मेरा नहीं है वह केवल विनाश लाता है।",
          te: "దానిని తిరస్కరించండి. న్యాయబద్ధంగా నాది కానిది కేవలం నాశనాన్ని మాత్రమే తెస్తుంది."
        },
        impact: { Justice: 10, Ambition: -10, Wisdom: 5 },
        hiddenImpact: { Idealism: 10 },
        epicConnection: "Like Yudhishthira, your adherence to righteousness outweighs material gain."
      },
      {
        text: {
          en: "Accept it, but secretly share the wealth with the rival.",
          hi: "इसे स्वीकार करें, लेकिन गुप्त रूप से प्रतिद्वंद्वी के साथ धन साझा करें।",
          te: "దానిని అంగీకరించండి, కానీ రహస్యంగా ప్రత్యర్థితో సంపదను పంచుకోండి."
        },
        impact: { Compassion: 10, Wisdom: 5, Ambition: 5 },
        hiddenImpact: { Pragmatism: 10 },
        epicConnection: "A complex choice, echoing Kunti's attempts to balance competing familial claims."
      }
    ]
  },
  {
    id: "s3-sacrifice",
    scenario: {
      en: "A terrible conflict can be entirely avoided if you publicly accept the blame for a failure that was not your fault. It will destroy your reputation forever.",
      hi: "एक भयानक संघर्ष से पूरी तरह बचा जा सकता है यदि आप सार्वजनिक रूप से उस विफलता का दोष स्वीकार करते हैं जो आपकी गलती नहीं थी। यह आपकी प्रतिष्ठा को हमेशा के लिए नष्ट कर देगा।",
      te: "మీ తప్పు లేని వైఫల్యానికి మీరు బహిరంగంగా నిందను అంగీకరిస్తే, తీవ్రమైన సంఘర్షణను పూర్తిగా నివారించవచ్చు. అది మీ ప్రతిష్టను శాశ్వతంగా నాశనం చేస్తుంది."
    },
    options: [
      {
        text: {
          en: "Accept the blame. Peace is worth my reputation.",
          hi: "दोष स्वीकार करें। शांति मेरी प्रतिष्ठा के लायक है।",
          te: "నిందను అంగీకరించండి. శాంతి నా ప్రతిష్ట కంటే విలువైనది."
        },
        impact: { Sacrifice: 10, Resilience: 5, Ambition: -10 },
        hiddenImpact: { Collectivism: 10, Idealism: 5 },
        epicConnection: "Like Bhishma, you are willing to sacrifice your own life and name for the stability of the realm."
      },
      {
        text: {
          en: "Refuse. Truth must prevail, even if it brings conflict.",
          hi: "मना कर दें। सत्य की जीत होनी चाहिए, भले ही इससे संघर्ष हो।",
          te: "తిరస్కరించండి. ఘర్షణ తెచ్చినా సత్యమే గెలవాలి."
        },
        impact: { Justice: 10, Duty: 5, Sacrifice: -5 },
        hiddenImpact: { Individualism: 5, Idealism: 5 },
        epicConnection: "Like Draupadi, you demand absolute truth and refuse to be a quiet martyr for the comfort of others."
      },
      {
        text: {
          en: "Expose the true culprit, regardless of the consequences.",
          hi: "परिणामों की परवाह किए बिना असली अपराधी को बेनकाब करें।",
          te: "పరిణామాలతో సంబంధం లేకుండా నిజమైన అపరాధిని బహిర్గతం చేయండి."
        },
        impact: { Justice: 10, Compassion: -5 },
        hiddenImpact: { Pragmatism: 5, Vengeance: 5 },
        epicConnection: "Your pursuit of the truth mirrors Arjuna's arrows—direct, unyielding, and devastating."
      }
    ]
  },
  {
    id: "s4-vow",
    scenario: {
      en: "You made a sacred promise years ago. Keeping it now will cause immense suffering to someone you deeply love.",
      hi: "आपने सालों पहले एक पवित्र वादा किया था। अब इसे निभाने से उस व्यक्ति को भारी पीड़ा होगी जिससे आप बहुत प्यार करते हैं।",
      te: "మీరు సంవత్సరాల క్రితం ఒక పవిత్రమైన వాగ్దానం చేశారు. ఇప్పుడు దానిని నిలబెట్టుకోవడం వల్ల మీరు ఎంతగానో ప్రేమించే వ్యక్తికి విపరీతమైన బాధ కలుగుతుంది."
    },
    options: [
      {
        text: {
          en: "Break the promise. Love and compassion matter more than words.",
          hi: "वादा तोड़ दें। प्यार और करुणा शब्दों से ज्यादा मायने रखते हैं।",
          te: "వాగ్దానాన్ని విచ్ఛిన్నం చేయండి. మాటలకంటే ప్రేమ, కరుణే ఎక్కువ ముఖ్యం."
        },
        impact: { Compassion: 10, Duty: -10, Loyalty: 5 },
        hiddenImpact: { Pragmatism: 10, Individualism: 5 },
        epicConnection: "You prioritize the living over abstract vows, breaking from the rigid traditions of the Kuru elders."
      },
      {
        text: {
          en: "Keep the promise. A broken word destroys the soul.",
          hi: "वादा निभाएं। एक टूटा हुआ वचन आत्मा को नष्ट कर देता है।",
          te: "వాగ్దానాన్ని నిలబెట్టుకోండి. విరిగిన మాట ఆత్మను నాశనం చేస్తుంది."
        },
        impact: { Duty: 10, Sacrifice: 10, Compassion: -10 },
        hiddenImpact: { Idealism: 10 },
        epicConnection: "Like Bhishma's terrible vow, your adherence to your word is absolute, regardless of the tragic cost."
      },
      {
        text: {
          en: "Find a loophole to fulfill the letter of the vow while saving them.",
          hi: "उन्हें बचाते हुए वादे के अक्षरशः पालन करने के लिए एक खामी खोजें।",
          te: "వారిని రక్షిస్తూనే వాగ్దానాన్ని నెరవేర్చడానికి ఒక దారిని కనుగొనండి."
        },
        impact: { Wisdom: 10, Duty: -5 },
        hiddenImpact: { Pragmatism: 10 },
        epicConnection: "Like Krishna, you bend the rules of reality to serve the higher good while technically maintaining the structure."
      }
    ]
  },
  {
    id: "s5-enemy",
    scenario: {
      en: "Your greatest enemy is at your mercy, disarmed and pleading for their life. They have caused you and your family irreparable harm.",
      hi: "आपका सबसे बड़ा दुश्मन आपकी दया पर है, निहत्था और अपनी जान की भीख मांग रहा है। उन्होंने आपको और आपके परिवार को अपूरणीय क्षति पहुंचाई है।",
      te: "మీ గొప్ప శత్రువు మీ దయపై ఆధారపడి, నిరాయుధుడై తన ప్రాణాలను విడిచిపెట్టమని వేడుకుంటున్నాడు. వారు మీకు మరియు మీ కుటుంబానికి తీరని నష్టం కలిగించారు."
    },
    options: [
      {
        text: {
          en: "Show mercy. The cycle of hatred must end with me.",
          hi: "दया दिखाएं। नफरत का चक्र मेरे साथ समाप्त होना चाहिए।",
          te: "దయ చూపండి. ద్వేషం యొక్క చక్రం నాతో ముగియాలి."
        },
        impact: { Compassion: 10, Wisdom: 5, Justice: -5 },
        hiddenImpact: { Forgiveness: 10, Idealism: 5 },
        epicConnection: "Like Yudhishthira, your capacity for forgiveness transcends personal vengeance."
      },
      {
        text: {
          en: "Strike them down. They must pay for their crimes.",
          hi: "उन्हें मार गिराएं। उन्हें अपने अपराधों की कीमत चुकानी होगी।",
          te: "వారిని సంహరించండి. వారు తమ నేరాలకు మూల్యం చెల్లించాలి."
        },
        impact: { Justice: 10, Duty: 5, Compassion: -10 },
        hiddenImpact: { Vengeance: 10, Pragmatism: 5 },
        epicConnection: "Like Bheema, your justice is swift, brutal, and utterly final."
      },
      {
        text: {
          en: "Spare their life, but strip them of all power and dignity.",
          hi: "उनकी जान बख्श दें, लेकिन उन्हें सारी शक्ति और गरिमा से वंचित कर दें।",
          te: "వారి ప్రాణాలను విడిచిపెట్టండి, కానీ వారి శక్తిని మరియు గౌరవాన్ని హరించండి."
        },
        impact: { Ambition: 5, Justice: 5, Resilience: 5 },
        hiddenImpact: { Pragmatism: 10 },
        epicConnection: "A strategic move reminiscent of Ashwatthama's humiliation, leaving the enemy alive but broken."
      }
    ]
  },
  {
    id: "s6-truth",
    scenario: {
      en: "You discover a hidden truth about your past that invalidates your current achievements. Revealing it will cost you your position, but keeping it is a lie.",
      hi: "आप अपने अतीत के बारे में एक छिपा हुआ सच खोजते हैं जो आपकी वर्तमान उपलब्धियों को अमान्य कर देता है। इसे उजागर करने से आपका पद छिन जाएगा, लेकिन इसे छिपाए रखना एक झूठ है।",
      te: "మీరు మీ ప్రస్తుత విజయాలను చెల్లుబాటు కానివిగా చేసే మీ గతం గురించిన ఒక దాచిన సత్యాన్ని కనుగొంటారు. దీనిని వెల్లడించడం వల్ల మీరు మీ స్థానాన్ని కోల్పోతారు, కానీ దానిని దాచడం అబద్ధం."
    },
    options: [
      {
        text: {
          en: "Bury the truth. I earned my place through action, not origin.",
          hi: "सच को दफन कर दें। मैंने अपना स्थान कर्म से अर्जित किया है, मूल से नहीं।",
          te: "సత్యాన్ని పాతిపెట్టండి. నేను నా స్థానాన్ని కర్మ ద్వారా సంపాదించాను, పుట్టుక ద్వారా కాదు."
        },
        impact: { Ambition: 10, Resilience: 5, Duty: -5 },
        hiddenImpact: { Pragmatism: 10, Individualism: 5 },
        epicConnection: "Like Karna, you believe worth is defined by deed, rejecting the fatalism of birth."
      },
      {
        text: {
          en: "Reveal the truth and step down immediately.",
          hi: "सच उजागर करें और तुरंत पद छोड़ दें।",
          te: "నిజాన్ని వెల్లడించి వెంటనే పదవి నుండి దిగిపోండి."
        },
        impact: { Justice: 10, Sacrifice: 10, Ambition: -10 },
        hiddenImpact: { Idealism: 10 },
        epicConnection: "Your commitment to absolute transparency echoes the rigid honesty of Yudhishthira."
      },
      {
        text: {
          en: "Use the truth to quietly dismantle the system from within.",
          hi: "भीतर से सिस्टम को चुपचाप खत्म करने के लिए सच का उपयोग करें।",
          te: "లోపలి నుండి వ్యవస్థను నిశ్శబ్దంగా విచ్ఛిన్నం చేయడానికి సత్యాన్ని ఉపయోగించండి."
        },
        impact: { Wisdom: 10, Ambition: 5, Loyalty: -5 },
        hiddenImpact: { Pragmatism: 10, Collectivism: 5 },
        epicConnection: "Like Vidura, you use uncomfortable truths as tools for long-term reform."
      }
    ]
  },
  {
    id: "s7-war",
    scenario: {
      en: "You are the commander of an army. A tactic guarantees victory and saves your soldiers, but it violates the agreed-upon rules of honorable combat.",
      hi: "आप एक सेना के कमांडर हैं। एक रणनीति जीत की गारंटी देती है और आपके सैनिकों को बचाती है, लेकिन यह सम्मानजनक युद्ध के सहमत नियमों का उल्लंघन करती है।",
      te: "మీరు సైన్యానికి కమాండర్. ఒక వ్యూహం విజయాన్ని ఇస్తుంది మరియు మీ సైనికులను రక్షిస్తుంది, కానీ అది గౌరవప్రదమైన పోరాట నియమాలను ఉల్లంఘిస్తుంది."
    },
    options: [
      {
        text: {
          en: "Use the tactic. Victory and my people's lives are paramount.",
          hi: "रणनीति का उपयोग करें। जीत और मेरे लोगों का जीवन सर्वोपरि है।",
          te: "వ్యూహాన్ని ఉపయోగించండి. విజయం మరియు నా ప్రజల ప్రాణాలు అత్యంత ముఖ్యమైనవి."
        },
        impact: { Ambition: 5, Duty: 10, Justice: -5 },
        hiddenImpact: { Pragmatism: 10, Collectivism: 5 },
        epicConnection: "Like Krishna orchestrating the fall of Drona, you prioritize the ultimate victory over procedural honor."
      },
      {
        text: {
          en: "Refuse the tactic. A victory without honor is worse than defeat.",
          hi: "रणनीति को अस्वीकार करें। सम्मान के बिना जीत हार से बदतर है।",
          te: "వ్యూహాన్ని తిరస్కరించండి. గౌరవం లేని విజయం ఓటమి కంటే ఘోరమైనది."
        },
        impact: { Duty: 10, Sacrifice: 5, Wisdom: -5 },
        hiddenImpact: { Idealism: 10 },
        epicConnection: "Like Arjuna's initial hesitation, you struggle to reconcile martial duty with spiritual purity."
      },
      {
        text: {
          en: "Execute the tactic, then step down in penance.",
          hi: "रणनीति को अंजाम दें, फिर पश्चाताप में पद छोड़ दें।",
          te: "వ్యూహాన్ని అమలు చేసి, ఆపై పశ్చాత్తాపంతో పదవి నుండి తప్పుకోండి."
        },
        impact: { Sacrifice: 10, Justice: 5, Ambition: -10 },
        hiddenImpact: { Idealism: 5, Pragmatism: 5 },
        epicConnection: "You carry the weight of necessary sin, bearing the karmic debt for others."
      }
    ]
  }
];
