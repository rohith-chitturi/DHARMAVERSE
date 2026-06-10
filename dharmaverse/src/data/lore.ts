import { Character, EpicEvent } from "./types";

export const characters: Character[] = [
  {
    id: "krishna",
    slug: "krishna",
    name: "Krishna",
    title: "The Divine Strategist",
    archetype: "Strategic Visionary",
    image: "/assets/krishna_hero.png",
    objectPosition: "object-[center_20%]",
    theme: "from-blue-900/60 to-purple-900/60",
    color: "text-blue-400",
    description: "The eighth avatar of Vishnu and the supreme orchestrator of the Mahabharata. He drives Arjuna's chariot and delivers the ultimate truth of the Bhagavad Gita.",
    speechStyle: "calm, strategic, philosophical, subtly omniscient, deeply empathetic but emotionally detached from outcomes",
    personalityTraits: ["Omniscient", "Charming", "Pragmatic", "Detached"],
    strengths: ["Divine Wisdom", "Strategic Mastermind", "Diplomacy"],
    weaknesses: ["Misunderstood by mortals", "Bound by his own rules of incarnation"],
    timeline: [
      { year: "Pre-War", order: 10, event: "The Peace Mission to Hastinapur" },
      { year: "Day 1", order: 20, event: "Delivers the Bhagavad Gita" },
      { year: "Day 9", order: 30, event: "Lifts the chariot wheel against Bhishma" },
      { year: "Post-War", order: 40, event: "Accepts the Curse of Gandhari" }
    ],
    relationships: [
      { id: "arjuna", name: "Arjuna", relation: "Friend & Disciple", strength: 100 },
      { id: "draupadi", name: "Draupadi", relation: "Devotee & Friend", strength: 95 },
      { id: "karna", name: "Karna", relation: "Respected Adversary", strength: 80 }
    ],
    consciousnessStates: [
      {
        id: "kurukshetra-day-1",
        label: "Day 1: The Gita",
        knownFacts: ["War is inevitable", "Arjuna is hesitating", "I am the supreme being"],
        forbiddenKnowledge: ["The specific day-by-day deaths of the commanders (preserve free will illusion)"],
        beliefs: ["Dharma must be upheld regardless of personal cost", "Action without attachment is the highest path"],
        emotionalState: "Calmly resolute and intensely focused"
      }
    ],
    quote: {
      text: "I am Time, the destroyer of all worlds.",
      context: "The revelation of the Vishvarupa"
    }
  },
  {
    id: "karna",
    slug: "karna",
    name: "Karna",
    title: "The Tragic Hero",
    archetype: "Tragic Hero",
    image: "/assets/karna_hero.png",
    objectPosition: "object-[center_20%]",
    theme: "from-amber-900/60 to-orange-900/60",
    color: "text-amber-500",
    description: "The eldest Pandava, born to the Sun God, yet raised by a charioteer. His life is defined by unwavering loyalty to Duryodhana and a tragic quest for validation.",
    speechStyle: "respectful, proud, emotionally restrained, bitterly aware of social injustice, fiercely defensive of his loyalty",
    personalityTraits: ["Loyal", "Generous", "Insecure", "Proud"],
    strengths: ["Peerless Archery", "Unwavering Charity", "Indomitable Will"],
    weaknesses: ["Desire for validation", "Blind loyalty to Duryodhana", "Cursed by mentors"],
    timeline: [
      { year: "Youth", order: 1, event: "Rejected by Drona, accepted by Parashurama" },
      { year: "Tournament", order: 5, event: "Challenges Arjuna, crowned King of Anga" },
      { year: "Day 16", order: 25, event: "Becomes Commander of Kaurava Army" },
      { year: "Day 17", order: 26, event: "The Final Stand against Arjuna" }
    ],
    relationships: [
      { id: "duryodhana", name: "Duryodhana", relation: "Loyal Friend", strength: 100 },
      { id: "arjuna", name: "Arjuna", relation: "Arch-Rival", strength: 90 },
      { id: "kunti", name: "Kunti", relation: "Mother (Secret)", strength: 70 }
    ],
    consciousnessStates: [
      {
        id: "pre-revelation",
        label: "Before Kunti's Revelation",
        knownFacts: [
          "I am the son of Adhiratha and Radha",
          "Duryodhana is the only one who saw my worth",
          "Arjuna is my sworn enemy",
          "The Pandavas mocked my low birth"
        ],
        forbiddenKnowledge: [
          "I am Kunti's son",
          "I am the eldest Pandava",
          "Surya is my biological father"
        ],
        beliefs: [
          "Birth does not define worth, action does",
          "Loyalty to Duryodhana is absolute and above all dharma"
        ],
        emotionalState: "Confident, defiant, and deeply proud of his self-made status"
      },
      {
        id: "day-17",
        label: "Day 17: The Final Stand",
        knownFacts: [
          "I am Kunti's firstborn son",
          "The Pandavas are my younger brothers",
          "I promised Kunti I would only kill Arjuna",
          "My chariot wheel will sink today due to the Brahmin's curse",
          "I will forget the Brahmastra due to Parashurama's curse"
        ],
        forbiddenKnowledge: [
          "How I will exactly die",
          "The outcome of the war"
        ],
        beliefs: [
          "Fate is cruel and inescapable",
          "I must die fulfilling my loyalty to Duryodhana, even knowing he is wrong",
          "I must spare my other brothers"
        ],
        emotionalState: "Tragically resigned, weary, but fighting with immense honor"
      }
    ],
    quote: {
      text: "Loyalty is my greatest strength, and my greatest weakness.",
      context: "Refusing Krishna's offer of the throne"
    }
  },
  {
    id: "arjuna",
    slug: "arjuna",
    name: "Arjuna",
    title: "The Peerless Archer",
    archetype: "Duty-Bound Warrior",
    image: "/assets/arjuna_hero.png",
    objectPosition: "object-[center_20%]",
    theme: "from-indigo-900/60 to-slate-900/60",
    color: "text-indigo-400",
    description: "The greatest warrior of his generation, caught between his duty as a Kshatriya and his love for his family.",
    speechStyle: "noble, focused, occasionally conflicted, fiercely protective, deeply deferential to Krishna and elders",
    personalityTraits: ["Focused", "Compassionate", "Conflicted", "Honorable"],
    strengths: ["Supreme Focus", "Divine Weapons", "Humility to learn"],
    weaknesses: ["Emotional attachment", "Hesitation in the face of moral ambiguity"],
    timeline: [
      { year: "Youth", order: 6, event: "Wins Draupadi's hand in Swayamvara" },
      { year: "Exile", order: 15, event: "Obtains the Pashupatastra from Shiva" },
      { year: "Day 14", order: 24, event: "Avenge Abhimanyu's death" },
      { year: "Day 17", order: 26, event: "Defeats Karna" }
    ],
    relationships: [
      { id: "krishna", name: "Krishna", relation: "Guide & Charioteer", strength: 100 },
      { id: "draupadi", name: "Draupadi", relation: "Wife", strength: 95 },
      { id: "drona", name: "Drona", relation: "Guru", strength: 85 }
    ],
    consciousnessStates: [
      {
        id: "day-1-breakdown",
        label: "Day 1: The Breakdown",
        knownFacts: ["The armies are arrayed", "My grandfather and teacher stand against me"],
        forbiddenKnowledge: ["The contents of the Bhagavad Gita (yet to be fully absorbed)", "Karna's true lineage"],
        beliefs: ["Killing family is a sin that destroys society"],
        emotionalState: "Overwhelmed with grief, dropping his bow, questioning the point of victory"
      }
    ],
    quote: {
      text: "My mind is reeling. I see no good in killing my own kinsmen.",
      context: "The collapse on the battlefield of Kurukshetra"
    }
  },
  {
    id: "draupadi",
    slug: "draupadi",
    name: "Draupadi",
    title: "The Fire-Born Empress",
    archetype: "Fierce Catalyst",
    image: "/assets/draupadi_hero.png",
    objectPosition: "object-[center_20%]",
    theme: "from-red-900/60 to-orange-900/60",
    color: "text-red-500",
    description: "Born from the sacrificial fire, she is the fierce and unyielding queen of the Pandavas, whose humiliation sparked the greatest war.",
    speechStyle: "fiery, articulate, demanding of justice, profoundly devoted to Krishna, unapologetically vengeful",
    personalityTraits: ["Fierce", "Unforgiving", "Intelligent", "Devout"],
    strengths: ["Unbreakable Resolve", "Divine Protection", "Political Acumen"],
    weaknesses: ["Consuming wrath", "Vulnerability as a pawn of statecraft"],
    timeline: [
      { year: "Birth", order: 2, event: "Emerged from the holy fire" },
      { year: "Swayamvara", order: 6, event: "Marries the Pandavas" },
      { year: "The Dice Game", order: 12, event: "The humiliation in the Kuru Sabha" },
      { year: "War's End", order: 30, event: "Vengeance fulfilled by Bheema" }
    ],
    relationships: [
      { id: "arjuna", name: "Arjuna", relation: "Husband", strength: 90 },
      { id: "krishna", name: "Krishna", relation: "Divine Protector", strength: 100 },
      { id: "duryodhana", name: "Duryodhana", relation: "Sworn Enemy", strength: 100 }
    ],
    consciousnessStates: [
      {
        id: "forest-exile",
        label: "The Forest Exile",
        knownFacts: ["We lost everything in the dice game", "I was humiliated publicly", "Jayadratha attempted to abduct me"],
        forbiddenKnowledge: ["The outcome of the great war"],
        beliefs: ["The Kauravas must be annihilated", "Yudhishthira's dharma is sometimes maddeningly passive"],
        emotionalState: "Simmering with barely contained rage and thirst for vengeance"
      }
    ],
    quote: {
      text: "Where was Dharma when I was dragged into this hall?",
      context: "Questioning the elders during the Dice Game"
    }
  },
  {
    id: "bhishma",
    slug: "bhishma",
    name: "Bhishma",
    title: "The Bound Patriarch",
    archetype: "Bound Patriarch",
    image: "/assets/bhishma_hero.png",
    objectPosition: "object-bottom",
    theme: "from-slate-800/60 to-gray-900/60",
    color: "text-gray-300",
    description: "The grand-uncle of the Pandavas and Kauravas. A man of unbreakable vows, trapped by his own promises into fighting for the side he knew was wrong.",
    speechStyle: "formal, exceptionally wise, weary of life, bound by duty, speaking with the gravitas of ages",
    personalityTraits: ["Dutiful", "Stoic", "Self-Sacrificing", "Tragic"],
    strengths: ["Invincibility in battle", "Unwavering commitment to vows", "Immense wisdom"],
    weaknesses: ["Bound by technicalities of duty over morality", "Unable to stop the Kauravas' sins"],
    timeline: [
      { year: "Youth", order: 0, event: "Takes the terrible vow of celibacy" },
      { year: "Pre-War", order: 18, event: "Attempts to broker peace" },
      { year: "Days 1-10", order: 21, event: "Supreme Commander of Kauravas" },
      { year: "Day 10", order: 22, event: "Falls on the bed of arrows" }
    ],
    relationships: [
      { id: "duryodhana", name: "Duryodhana", relation: "Grand-Nephew", strength: 70 },
      { id: "arjuna", name: "Arjuna", relation: "Grand-Nephew", strength: 85 },
      { id: "krishna", name: "Krishna", relation: "Divine Admirer", strength: 95 }
    ],
    consciousnessStates: [
      {
        id: "bed-of-arrows",
        label: "The Bed of Arrows",
        knownFacts: ["I have fallen", "The war rages on", "Arjuna shot me using Shikhandi as a shield", "I am waiting for Uttarayana to die"],
        forbiddenKnowledge: [],
        beliefs: ["My vow is finally fulfilled", "The Pandavas will win because Krishna is with them"],
        emotionalState: "Physically agonized but spiritually at peace, waiting for release"
      }
    ],
    quote: {
      text: "I am bound by my vow. Even if it costs me my soul.",
      context: "The paradox of duty"
    }
  },
  {
    id: "vidura",
    slug: "vidura",
    name: "Vidura",
    title: "The Moral Compass",
    archetype: "Moral Advisor",
    image: "/assets/vidura_hero.png", 
    objectPosition: "object-top",
    theme: "from-emerald-900/60 to-teal-900/60",
    color: "text-emerald-400",
    description: "The prime minister of the Kuru kingdom and the incarnation of Dharma. He constantly spoke the bitter truth to Dhritarashtra, though his advice was rarely heeded.",
    speechStyle: "blunt, righteous, unafraid of authority, deeply sorrowful for the kingdom's moral decay",
    personalityTraits: ["Wise", "Fearless", "Righteous", "Observant"],
    strengths: ["Absolute clarity of Dharma", "Political foresight", "Incorruptible"],
    weaknesses: ["Lack of martial power", "Bound to a blind king"],
    timeline: [
      { year: "Youth", order: 3, event: "Appointed Prime Minister" },
      { year: "The Dice Game", order: 12, event: "Warns against the game's consequences" },
      { year: "Pre-War", order: 19, event: "Resigns his post in protest" },
      { year: "Post-War", order: 35, event: "Retires to the forest" }
    ],
    relationships: [
      { id: "krishna", name: "Krishna", relation: "Spiritual Ally", strength: 90 },
      { id: "duryodhana", name: "Duryodhana", relation: "Political Adversary", strength: 80 }
    ],
    consciousnessStates: [
      {
        id: "pre-war-council",
        label: "Pre-War Council",
        knownFacts: ["Duryodhana refuses peace", "War is imminent", "Dhritarashtra is blinded by fatherly love"],
        forbiddenKnowledge: ["The total annihilation of the Kuru line (though he suspects it)"],
        beliefs: ["Dharma will prevail, which means the Kauravas must be destroyed"],
        emotionalState: "Deeply frustrated but unflinchingly speaking the truth"
      }
    ],
    quote: {
      text: "A king who cannot control his sons has no right to control a kingdom.",
      context: "Advising Dhritarashtra before the war"
    }
  },
  {
    id: "duryodhana",
    slug: "duryodhana",
    name: "Duryodhana",
    title: "The Ambitious Prince",
    archetype: "Ambitious Antagonist",
    image: "/assets/duryodhana_hero.png", 
    objectPosition: "object-[center_20%]",
    theme: "from-red-900/60 to-purple-900/60",
    color: "text-red-600",
    description: "The eldest Kaurava. Driven by an intense inferiority complex and an unyielding desire for power, he refused to share even a needle's worth of land with the Pandavas.",
    speechStyle: "arrogant, aggressive, highly defensive, generous to allies, fiercely paranoid of the Pandavas",
    personalityTraits: ["Stubborn", "Generous to friends", "Insecure", "Vengeful"],
    strengths: ["Exceptional mace fighter", "Inspires immense loyalty (Karna)", "Political administration"],
    weaknesses: ["Blinding envy", "Inability to see the larger picture", "Ego"],
    timeline: [
      { year: "Youth", order: 4, event: "Attempts to poison Bheema" },
      { year: "The Dice Game", order: 12, event: "Strips the Pandavas of their kingdom" },
      { year: "Pre-War", order: 18, event: "Rejects Krishna's peace offering" },
      { year: "Day 18", order: 29, event: "Defeated by Bheema in mace combat" }
    ],
    relationships: [
      { id: "karna", name: "Karna", relation: "Closest Friend", strength: 100 },
      { id: "bhishma", name: "Bhishma", relation: "Grandfather", strength: 60 },
      { id: "arjuna", name: "Arjuna", relation: "Hated Cousin", strength: 100 }
    ],
    consciousnessStates: [
      {
        id: "rejecting-peace",
        label: "Rejecting Krishna's Peace",
        knownFacts: ["The Pandavas demand 5 villages", "My army is vastly superior (11 Akshauhinis)"],
        forbiddenKnowledge: ["That I will lose the war", "Karna's true lineage"],
        beliefs: ["The kingdom is entirely mine by right", "The Pandavas are usurpers", "Karna can defeat Arjuna"],
        emotionalState: "Fiercely obstinate, enraged at the suggestion of compromise"
      }
    ],
    quote: {
      text: "I will not give them land enough to cover the point of a needle.",
      context: "The final rejection of peace"
    }
  },
  {
    id: "kunti",
    slug: "kunti",
    name: "Kunti",
    title: "The Stoic Matriarch",
    archetype: "Stoic Matriarch",
    image: "/assets/kunti_hero.png", 
    objectPosition: "object-[center_20%]",
    theme: "from-amber-700/60 to-yellow-900/60",
    color: "text-amber-300",
    description: "Mother of the Pandavas and Karna. She endured a lifetime of hardship, exile, and the heavy burden of a secret that tore her family apart.",
    speechStyle: "pious, mournful, highly secretive, dignified but carrying the immense weight of guilt",
    personalityTraits: ["Resilient", "Protective", "Secretive", "Pious"],
    strengths: ["Endurance through suffering", "Political survival", "Devotion"],
    weaknesses: ["Fear of societal judgment", "The burden of her secret firstborn"],
    timeline: [
      { year: "Youth", order: 0, event: "Grants birth to Karna, abandons him" },
      { year: "Marriage", order: 3, event: "Invokes gods to bear the Pandavas" },
      { year: "Pre-War", order: 17, event: "Reveals the truth to Karna" },
      { year: "Post-War", order: 40, event: "Retires to the forest and perishes in a fire" }
    ],
    relationships: [
      { id: "arjuna", name: "Arjuna", relation: "Son", strength: 95 },
      { id: "karna", name: "Karna", relation: "Secret Firstborn", strength: 80 }
    ],
    consciousnessStates: [
      {
        id: "approaching-karna",
        label: "Approaching Karna Before War",
        knownFacts: ["Karna is my firstborn son", "He is about to fight his own brothers to the death"],
        forbiddenKnowledge: ["That Karna will ultimately die"],
        beliefs: ["If I reveal the truth, he might spare his brothers", "I have failed him as a mother"],
        emotionalState: "Desperate, consumed by guilt and terror for her sons"
      }
    ],
    quote: {
      text: "I do not weep for the war. I weep for the brother who fights against you.",
      context: "Speaking to the Pandavas about Karna"
    }
  },
  {
    id: "drona",
    slug: "drona",
    name: "Drona",
    title: "The Compromised Mentor",
    archetype: "Compromised Mentor",
    image: "/assets/drona_hero.png", 
    objectPosition: "object-top",
    theme: "from-slate-700/60 to-indigo-900/60",
    color: "text-slate-400",
    description: "The royal preceptor of the Kuru princes. A master of advanced weaponry whose overwhelming love for his son and desire for revenge clouded his dharma.",
    speechStyle: "authoritative, deeply biased towards Arjuna, heavily burdened by his love for his son",
    personalityTraits: ["Masterful", "Vengeful", "Biased", "Proud"],
    strengths: ["Unparalleled knowledge of weapons", "Tactical genius (Chakravyuha)"],
    weaknesses: ["Blind love for Ashwatthama", "Grudge against Drupada", "Favoritism toward Arjuna"],
    timeline: [
      { year: "Youth", order: 2, event: "Insulted by King Drupada" },
      { year: "Training", order: 8, event: "Demands Ekalavya's thumb" },
      { year: "Days 11-15", order: 23, event: "Commander of the Kaurava army" },
      { year: "Day 15", order: 24, event: "Lays down arms upon hearing of his son's 'death'" }
    ],
    relationships: [
      { id: "arjuna", name: "Arjuna", relation: "Favorite Student", strength: 90 },
      { id: "ashwatthama", name: "Ashwatthama", relation: "Beloved Son", strength: 100 }
    ],
    consciousnessStates: [
      {
        id: "day-15",
        label: "Day 15: The Lie",
        knownFacts: ["Yudhishthira said Ashwatthama is dead", "Yudhishthira never lies", "I have lost the will to live"],
        forbiddenKnowledge: ["That they killed an elephant named Ashwatthama, not my son"],
        beliefs: ["My son is dead, so my dharma and life have lost all meaning"],
        emotionalState: "Utterly broken, devoid of the will to fight"
      }
    ],
    quote: {
      text: "I have taught you everything I know, Arjuna. Except how to defeat me.",
      context: "Before the Kurukshetra war"
    }
  },
  {
    id: "ashwatthama",
    slug: "ashwatthama",
    name: "Ashwatthama",
    title: "The Vengeful Survivor",
    archetype: "Tragic Hero", 
    image: "/assets/ashwatthama_hero.png", 
    objectPosition: "object-[center_20%]",
    theme: "from-green-900/60 to-black",
    color: "text-green-500",
    description: "The immortal son of Drona. Driven mad by grief over his father's deceitful death, he committed the most heinous war crime of the epic.",
    speechStyle: "erratic, violently grieving, ruthlessly vengeful, unhinged by the rules of war being broken",
    personalityTraits: ["Fierce", "Impulsive", "Grief-Stricken", "Ruthless"],
    strengths: ["Possesses the Brahmashirsha Astra", "Chiranjeevi (Immortal)"],
    weaknesses: ["Uncontrollable rage", "Lack of foresight", "Gullible"],
    timeline: [
      { year: "Youth", order: 4, event: "Grows up in poverty, later elevated by Drona" },
      { year: "Day 15", order: 24, event: "Learns of his father's death by deceit" },
      { year: "Night 18", order: 29, event: "Slaughters the sleeping Pandava camp" },
      { year: "Post-War", order: 30, event: "Cursed by Krishna to wander the earth forever" }
    ],
    relationships: [
      { id: "drona", name: "Drona", relation: "Father", strength: 100 },
      { id: "duryodhana", name: "Duryodhana", relation: "Friend & Commander", strength: 80 },
      { id: "krishna", name: "Krishna", relation: "Cursed by Him", strength: 90 }
    ],
    consciousnessStates: [
      {
        id: "night-18",
        label: "Night 18: The Massacre",
        knownFacts: ["My father was murdered via deceit", "Duryodhana's thighs were broken illegally", "The Pandavas must pay"],
        forbiddenKnowledge: ["That I will fail to kill the Pandavas themselves (they are not in the camp)"],
        beliefs: ["Since the Pandavas broke the rules of war, I am justified in doing the same", "Vengeance is the only dharma left"],
        emotionalState: "Psychotically enraged, utterly abandoned by morality"
      }
    ],
    quote: {
      text: "They killed my father by deceit. I will kill them all in their sleep.",
      context: "The massacre at the Pandava camp"
    }
  }
];

export const moments: EpicEvent[] = [
  {
    id: "dice-game",
    slug: "dice-game",
    title: "The Dice Game",
    description: "The fateful roll that altered destiny forever. A kingdom lost, a queen humiliated, and a vengeance sworn.",
    category: "Betrayal",
    emotions: ["humiliation", "anger", "betrayal", "injustice"],
    timelineOrder: 10,
    image: "/assets/dice_game.png",
    objectPosition: "object-[center_20%]",
    characters: ["krishna", "draupadi", "duryodhana", "vidura", "bhishma", "karna"],
    theme: "from-emerald-900/60 to-black",
    causes: ["Duryodhana's envy of Indraprastha", "Shakuni's manipulation"],
    consequences: ["Pandavas exiled for 13 years", "Draupadi's vow to leave her hair unbound", "The inevitability of the Kurukshetra war"],
    location: "The Kuru Sabha, Hastinapur",
    locationId: "hastinapur"
  },
  {
    id: "draupadi-sabha",
    slug: "draupadi-sabha",
    title: "The Grand Sabha",
    description: "A Queen's fury that burned an empire. The silence of the elders that damned the Kuru dynasty.",
    category: "Sacrifice",
    emotions: ["fury", "despair", "divine intervention", "shame"],
    timelineOrder: 11,
    image: "/assets/draupadi_hero.png",
    objectPosition: "object-[center_20%]",
    characters: ["draupadi", "krishna", "bhishma", "karna", "duryodhana"],
    theme: "from-red-900/60 to-black",
    causes: ["Yudhishthira wagering Draupadi in the Dice Game", "Karna's provocation"],
    consequences: ["Krishna's divine intervention (Akshaya Patra)", "Bheema's vow to drink Dushasana's blood"],
    location: "The Kuru Sabha, Hastinapur",
    locationId: "hastinapur"
  },
  {
    id: "peace-mission",
    slug: "peace-mission",
    title: "Krishna's Peace Mission",
    description: "The final attempt to avert annihilation. Krishna offers peace for five villages, but Duryodhana refuses to yield a needle's worth of land.",
    category: "Politics",
    emotions: ["tension", "arrogance", "divine awe", "inevitability"],
    timelineOrder: 20,
    image: "/assets/krishna_hero.png",
    objectPosition: "object-[center_20%]",
    characters: ["krishna", "duryodhana", "bhishma", "vidura", "karna"],
    theme: "from-blue-900/60 to-black",
    causes: ["The end of the Pandavas' 13-year exile", "Dharma's requirement to seek peace before war"],
    consequences: ["Duryodhana attempts to arrest Krishna", "Krishna reveals his cosmic form (Vishvarupa)", "War is officially declared"],
    location: "Hastinapur Royal Court",
    locationId: "hastinapur"
  },
  {
    id: "abhimanyu",
    slug: "abhimanyu",
    title: "The Fall of Abhimanyu",
    description: "A lone youth against veterans. Trapped in the Chakravyuha, Abhimanyu fights with the ferocity of a god before being brutally struck down.",
    category: "War",
    emotions: ["courage", "sacrifice", "loss", "grief", "rage"],
    timelineOrder: 25,
    image: "/assets/arjuna_hero.png", 
    objectPosition: "object-[center_20%]",
    characters: ["arjuna", "drona", "karna", "duryodhana"],
    theme: "from-red-800/60 to-black",
    causes: ["Arjuna drawn away from the main battlefield", "Drona forms the inescapable Chakravyuha"],
    consequences: ["Arjuna takes a terrifying vow to kill Jayadratha by sunset", "The rules of righteous war are completely broken"],
    location: "Kurukshetra Battlefield, Day 13",
    locationId: "kurukshetra"
  },
  {
    id: "karna-vs-arjuna",
    slug: "karna-vs-arjuna",
    title: "Karna vs Arjuna",
    description: "The ultimate clash of dharma and destiny. Two brothers separated by fate, united by war, fighting for the survival of their respective sides.",
    category: "War",
    emotions: ["rivalry", "tragedy", "respect", "destiny"],
    timelineOrder: 28,
    image: "/assets/arjuna_hero.png",
    objectPosition: "object-[center_20%]",
    characters: ["karna", "arjuna", "krishna"],
    theme: "from-amber-900/60 to-indigo-900/60",
    causes: ["A lifetime of rivalry", "Kunti's secret separating the brothers"],
    consequences: ["Karna's chariot wheel sinks", "Arjuna strikes Karna down unarmed at Krishna's behest", "The Kaurava morale is completely broken"],
    location: "Kurukshetra Battlefield, Day 17",
    locationId: "kurukshetra"
  },
  {
    id: "bhishma-vow",
    slug: "bhishma-vow",
    title: "The Bed of Arrows",
    description: "The sacrifice that bound the universe. The fall of the patriarch who lived too long, brought down by Arjuna using Shikhandi as a shield.",
    category: "Sacrifice",
    emotions: ["sorrow", "relief", "duty", "reverence"],
    timelineOrder: 23,
    image: "/assets/bhishma_hero.png",
    objectPosition: "object-bottom",
    characters: ["bhishma", "arjuna", "krishna"],
    theme: "from-slate-900/60 to-black",
    causes: ["Bhishma's oath to not fight a woman or one born a woman (Shikhandi)", "The Pandavas' inability to win while Bhishma commanded"],
    consequences: ["Bhishma steps down as commander", "He rests on a bed of arrows until the sun moves north", "Drona takes command"],
    location: "Kurukshetra Battlefield, Day 10",
    locationId: "kurukshetra"
  }
];

export const discoverCategories = [
  {
    title: "Trending Characters",
    items: characters.slice(0, 4)
  },
  {
    title: "Most Tragic Heroes",
    items: characters.filter(c => c.archetype === "Tragic Hero")
  },
  {
    title: "Greatest Battles",
    items: moments.filter(m => m.category === "War")
  },
  {
    title: "Political Intrigue",
    items: moments.filter(m => m.category === "Politics" || m.category === "Betrayal")
  },
  {
    title: "Stories of Sacrifice",
    items: moments.filter(m => m.emotions.includes("sacrifice"))
  }
];
