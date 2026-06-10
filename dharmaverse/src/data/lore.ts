export const characters = [
  {
    id: "krishna",
    name: "Krishna",
    title: "The Divine Strategist",
    image: "/assets/krishna_hero.png",
    objectPosition: "object-[center_20%]",
    theme: "from-blue-900/60 to-purple-900/60",
    color: "text-blue-400",
    description: "The eighth avatar of Vishnu and the supreme orchestrator of the Mahabharata. He drives Arjuna's chariot and delivers the ultimate truth of the Bhagavad Gita.",
    timeline: [
      { year: "Pre-War", event: "The Peace Mission to Hastinapur" },
      { year: "Day 1", event: "Delivers the Bhagavad Gita" },
      { year: "Day 9", event: "Lifts the chariot wheel against Bhishma" },
      { year: "Post-War", event: "The Curse of Gandhari" }
    ],
    relationships: [
      { name: "Arjuna", relation: "Friend & Disciple" },
      { name: "Draupadi", relation: "Devotee & Friend" },
      { name: "Karna", relation: "Respected Adversary" }
    ],
    quote: {
      text: "I am Time, the destroyer of all worlds.",
      context: "The revelation of the Vishvarupa"
    }
  },
  {
    id: "karna",
    name: "Karna",
    title: "The Tragic Hero",
    image: "/assets/karna_hero.png",
    objectPosition: "object-[center_20%]",
    theme: "from-amber-900/60 to-orange-900/60",
    color: "text-amber-500",
    description: "The eldest Pandava, born to the Sun God, yet raised by a charioteer. His life is defined by unwavering loyalty to Duryodhana and a tragic quest for validation.",
    timeline: [
      { year: "Youth", event: "Rejected by Drona, accepted by Parashurama" },
      { year: "Tournament", event: "Challenges Arjuna, crowned King of Anga" },
      { year: "Day 16", event: "Becomes Commander of Kaurava Army" },
      { year: "Day 17", event: "The Final Stand against Arjuna" }
    ],
    relationships: [
      { name: "Duryodhana", relation: "Loyal Friend" },
      { name: "Arjuna", relation: "Arch-Rival" },
      { name: "Kunti", relation: "Mother (Secret)" }
    ],
    quote: {
      text: "Loyalty is my greatest strength, and my greatest weakness.",
      context: "Refusing Krishna's offer of the throne"
    }
  },
  {
    id: "arjuna",
    name: "Arjuna",
    title: "The Peerless Archer",
    image: "/assets/arjuna_hero.png",
    objectPosition: "object-[center_20%]",
    theme: "from-indigo-900/60 to-slate-900/60",
    color: "text-indigo-400",
    description: "The greatest warrior of his generation, caught between his duty as a Kshatriya and his love for his family.",
    timeline: [
      { year: "Youth", event: "Wins Draupadi's hand in Swayamvara" },
      { year: "Exile", event: "Obtains the Pashupatastra from Shiva" },
      { year: "Day 14", event: "Avenge Abhimanyu's death" },
      { year: "Day 17", event: "Defeats Karna" }
    ],
    relationships: [
      { name: "Krishna", relation: "Guide & Charioteer" },
      { name: "Draupadi", relation: "Wife" },
      { name: "Drona", relation: "Guru" }
    ],
    quote: {
      text: "My mind is reeling. I see no good in killing my own kinsmen.",
      context: "The collapse on the battlefield of Kurukshetra"
    }
  },
  {
    id: "draupadi",
    name: "Draupadi",
    title: "The Fire-Born Empress",
    image: "/assets/draupadi_hero.png",
    objectPosition: "object-[center_20%]",
    theme: "from-red-900/60 to-orange-900/60",
    color: "text-red-500",
    description: "Born from the sacrificial fire, she is the fierce and unyielding queen of the Pandavas, whose humiliation sparked the greatest war.",
    timeline: [
      { year: "Birth", event: "Emerged from the holy fire" },
      { year: "Swayamvara", event: "Marries the Pandavas" },
      { year: "The Dice Game", event: "The humiliation in the Kuru Sabha" },
      { year: "War's End", event: "Vengeance fulfilled by Bheema" }
    ],
    relationships: [
      { name: "Pandavas", relation: "Husbands" },
      { name: "Krishna", relation: "Divine Protector" },
      { name: "Dushasana", relation: "Sworn Enemy" }
    ],
    quote: {
      text: "Where was Dharma when I was dragged into this hall?",
      context: "Questioning the elders during the Dice Game"
    }
  },
  {
    id: "bhishma",
    name: "Bhishma",
    title: "The Bound Patriarch",
    image: "/assets/bhishma_hero.png",
    objectPosition: "object-bottom",
    theme: "from-slate-800/60 to-gray-900/60",
    color: "text-gray-300",
    description: "The grand-uncle of the Pandavas and Kauravas. A man of unbreakable vows, trapped by his own promises into fighting for the side he knew was wrong.",
    timeline: [
      { year: "Youth", event: "Takes the terrible vow of celibacy" },
      { year: "Pre-War", event: "Attempts to broker peace" },
      { year: "Days 1-10", event: "Supreme Commander of Kauravas" },
      { year: "Day 10", event: "Falls on the bed of arrows" }
    ],
    relationships: [
      { name: "Kauravas & Pandavas", relation: "Grand-Nephews" },
      { name: "Amba", relation: "Karmic Retribution (Shikhandi)" }
    ],
    quote: {
      text: "I am bound by my vow. Even if it costs me my soul.",
      context: "The paradox of duty"
    }
  }
];

export const moments = [
  {
    id: "dice-game",
    title: "The Dice Game",
    description: "The fateful roll that altered destiny forever. A kingdom lost, a queen humiliated, and a vengeance sworn.",
    image: "/assets/dice_game.png",
    objectPosition: "object-[center_20%]",
    characters: ["yudhishthira", "shakuni", "draupadi", "duryodhana"],
    theme: "from-emerald-900/60 to-black"
  },
  {
    id: "draupadi-sabha",
    title: "The Grand Sabha",
    description: "A Queen's fury that burned an empire. The silence of the elders that damned the Kuru dynasty.",
    image: "/assets/draupadi_hero.png",
    objectPosition: "object-[center_20%]",
    characters: ["draupadi", "krishna", "bhishma", "karna"],
    theme: "from-red-900/60 to-black"
  },
  {
    id: "karna-vs-arjuna",
    title: "Karna vs Arjuna",
    description: "The ultimate clash of dharma and destiny. Two brothers separated by fate, united by war.",
    image: "/assets/arjuna_hero.png",
    objectPosition: "object-[center_20%]",
    characters: ["karna", "arjuna", "krishna", "shalya"],
    theme: "from-amber-900/60 to-indigo-900/60"
  },
  {
    id: "bhishma-vow",
    title: "The Bed of Arrows",
    description: "The sacrifice that bound the universe. The fall of the patriarch who lived too long.",
    image: "/assets/bhishma_hero.png",
    objectPosition: "object-bottom",
    characters: ["bhishma", "arjuna", "shikhandi"],
    theme: "from-slate-900/60 to-black"
  }
];

export const discoverCategories = [
  {
    title: "Trending Characters",
    items: [characters[1], characters[3], characters[0]]
  },
  {
    title: "Most Tragic Heroes",
    items: [characters[1], characters[4]]
  },
  {
    title: "Greatest Battles",
    items: [moments[2], moments[3]]
  },
  {
    title: "Turning Points",
    items: [moments[0], moments[1]]
  }
];
