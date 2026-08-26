export interface CharacterPresence {
  characterId: string;
  role: string;
  status: 'active' | 'injured' | 'fallen' | 'withdrawn';
}

export interface BattleFormation {
  name: string;
  side: 'pandava' | 'kaurava';
  description: string;
  commander: string;
}

export interface DecisionOption {
  id: string;
  text: string;
  immediateIntent: string;
  affectedCharacters: string[];
  possibleConsequences: string;
  dharmaThemes: string[];
  isCanonical: boolean;
}

export interface CriticalDecision {
  id: string;
  title: string;
  description: string;
  stakes: string;
  competingValues: string[];
  whyItMatters: string;
  involvedCharacters: string[];
  options: DecisionOption[];
}

export type DayState = 
  | 'DAY_START'
  | 'BATTLE_ACTIVE'
  | 'KARNA_ENGAGED'
  | 'CRITICAL_MOMENT'
  | 'DECISION_AVAILABLE'
  | 'ALTERNATE_BRANCH'
  | 'CANONICAL_RESTORED';

export interface ChronologicalEvent {
  eventId: string;
  title: string;
  description: string;
  characters: string[];
  location: string;
  stateTrigger: DayState;
  canonicalFacts: string[];
  availableInteractions: string[]; // Characters available for chamber interaction at this time
}

export type ConfidenceLevel = 'HIGH_CONFIDENCE' | 'PLAUSIBLE' | 'SPECULATIVE';

export interface ConsequenceNode {
  text: string;
  confidence: ConfidenceLevel;
  characterId?: string; // Optional if it pertains to a specific character
}

export interface SimulationConsequences {
  immediateConsequence: ConsequenceNode;
  affectedCharacter: ConsequenceNode;
  characterReaction: ConsequenceNode;
  strategicConsequence: ConsequenceNode;
  shortTermDivergence: ConsequenceNode;
  longTermDivergence: ConsequenceNode;
  narrative?: string; // Fallback or summary
  canonicalReminder?: string;
}

export interface SimulationBranch {
  branchId: string;
  userId: string;
  warDayId: string;
  eventId: string;
  decisionId: string;
  chosenOptionId: string;
  originCanonicalState: any; 
  branchStatus: 'active' | 'completed';
  consequences: SimulationConsequences | null;
  branchSummary?: string; // Compact summary passed to AI
}

export interface WarDay {
  id: string;
  dayNumber: number;
  title: string;
  commanderKaurava: string;
  commanderPandava: string;
  majorEvents: string[]; // Keep for summary purposes, but events drive the chronology
  chronology: ChronologicalEvent[];
  activeCharacters: CharacterPresence[];
  casualties: string[];
  formations: BattleFormation[];
  campStatePandava: string;
  campStateKaurava: string;
  tensions: string[];
  criticalDecisions: CriticalDecision[];
  canonicalOutcome: string;
}

export const kurukshetraDays: Record<string, WarDay> = {
  "day-17": {
    id: "day-17",
    dayNumber: 17,
    title: "Karna's Last Stand",
    commanderKaurava: "karna",
    commanderPandava: "dhrishtadyumna",
    majorEvents: [
      "Karna defeats but spares Yudhisthira, Bhima, Nakula, and Sahadeva.",
      "The fierce duel between Karna and Arjuna begins.",
      "Karna's chariot wheel sinks into the bloody earth.",
      "Karna invokes the Brahmastra but forgets the mantra due to Parashurama's curse.",
      "Arjuna, prompted by Krishna, strikes Karna while he is unarmed."
    ],
    chronology: [
      {
        eventId: "day-17-start",
        title: "Dawn of the 17th Day",
        description: "The Kaurava army, demoralized but desperate, looks to Karna as their last hope. Karna takes command and forms the Makara Vyuha.",
        characters: ["karna", "duryodhana", "shalya"],
        location: "Kaurava Camp",
        stateTrigger: "DAY_START",
        canonicalFacts: ["Karna is the Supreme Commander.", "Duryodhana's hopes rest entirely on Karna.", "Yudhishthira is still recovering."],
        availableInteractions: ["karna"]
      },
      {
        eventId: "battle-active",
        title: "The Battle Rages",
        description: "Karna systematically defeats the Pandava brothers one by one, but spares their lives due to his secret promise to Kunti.",
        characters: ["karna", "yudhishthira", "bhima"],
        location: "Battlefield",
        stateTrigger: "BATTLE_ACTIVE",
        canonicalFacts: ["Karna defeated Yudhishthira.", "Karna spared the brothers.", "Arjuna vows to kill Karna before sunset."],
        availableInteractions: ["yudhishthira", "arjuna"]
      },
      {
        eventId: "karna-engaged",
        title: "The Final Duel",
        description: "Karna and Arjuna finally clash. The earth shakes as they exchange divine weapons. Shalya continues to demoralize Karna.",
        characters: ["karna", "arjuna", "krishna", "shalya"],
        location: "Center Battlefield",
        stateTrigger: "KARNA_ENGAGED",
        canonicalFacts: ["The duel is perfectly matched.", "Shalya demoralizes Karna.", "Parashurama's curse begins to take effect."],
        availableInteractions: ["karna", "shalya"]
      },
      {
        eventId: "critical-moment",
        title: "The Wheel Sinks",
        description: "Karna's chariot wheel sinks into the mud. He is forced to dismount and asks Arjuna to pause the fight, invoking the Kshatriya code.",
        characters: ["karna", "arjuna", "krishna"],
        location: "Muddy terrain near the center",
        stateTrigger: "CRITICAL_MOMENT",
        canonicalFacts: ["Karna's wheel is stuck.", "Karna is unarmed.", "Krishna reminds Arjuna of Karna's past transgressions against Dharma."],
        availableInteractions: ["krishna", "arjuna", "karna"]
      }
    ],
    activeCharacters: [
      { characterId: "karna", role: "Supreme Commander (Kaurava)", status: "active" },
      { characterId: "arjuna", role: "Primary Warrior (Pandava)", status: "active" },
      { characterId: "krishna", role: "Charioteer (Pandava)", status: "active" },
      { characterId: "shalya", role: "Charioteer (Kaurava)", status: "active" },
      { characterId: "duryodhana", role: "Kaurava King", status: "active" },
      { characterId: "yudhishthira", role: "Pandava King", status: "injured" }
    ],
    casualties: ["Vrishasena (Karna's son)"],
    formations: [
      {
        name: "Makara Vyuha (Crocodile Formation)",
        side: "kaurava",
        description: "A fierce offensive formation designed to crush the enemy vanguard.",
        commander: "karna"
      }
    ],
    campStatePandava: "Tense but hopeful. Yudhishthira was severely injured and humiliated by Karna earlier today, causing a brief falling out between him and Arjuna. Arjuna has vowed to slay Karna before sunset.",
    campStateKaurava: "Desperate. The army relies entirely on Karna to deliver them victory against Arjuna. Shalya continues to demoralize Karna on the chariot.",
    tensions: [
      "Will Karna's curses manifest today?",
      "Can Arjuna overcome his equal without breaking the rules of war?",
      "Will Shalya betray or support Karna?"
    ],
    criticalDecisions: [
      {
        id: "karna-chariot-crisis",
        title: "The Chariot Wheel Crisis",
        description: "Karna's chariot wheel sinks into the mud. He drops his weapons to lift it, appealing to Arjuna to respect the Dharma of war and pause the fight.",
        stakes: "The life of the Kaurava Supreme Commander and the integrity of the Kshatriya code.",
        competingValues: ["Absolute Duty (Swa-dharma)", "Chivalric Honor (Kshatriya-dharma)", "Divine Will (Karma)"],
        whyItMatters: "This moment defines Arjuna's legacy. Is victory more important than the rules of engagement? Can a warrior who broke the rules demand protection from them?",
        involvedCharacters: ["karna", "arjuna", "krishna"],
        options: [
          {
            id: "strike-unarmed",
            text: "Strike Karna while he is unarmed (Canonical)",
            immediateIntent: "Execute the enemy commander when he is vulnerable.",
            affectedCharacters: ["karna", "krishna", "duryodhana"],
            possibleConsequences: "Karna dies. The Kaurava army breaks. Arjuna bears the karmic weight of breaking combat rules.",
            dharmaThemes: ["Necessity vs Honor", "Divine Will", "Karmic Justice"],
            isCanonical: true
          },
          {
            id: "pause-combat",
            text: "Lower your bow and wait for him to lift the wheel",
            immediateIntent: "Uphold the strict Kshatriya code of honor above strategic victory.",
            affectedCharacters: ["krishna", "karna", "yudhishthira"],
            possibleConsequences: "Karna lifts the wheel and resumes the duel. The battle extends. Yudhishthira's vow is broken.",
            dharmaThemes: ["Honor", "Duty", "Chivalry"],
            isCanonical: false
          },
          {
            id: "demand-surrender",
            text: "Demand Karna's unconditional surrender",
            immediateIntent: "Attempt to end the war through diplomatic humiliation rather than bloodshed.",
            affectedCharacters: ["karna", "duryodhana"],
            possibleConsequences: "Karna's pride forces him to refuse, fighting to the death on foot.",
            dharmaThemes: ["Pride", "Mercy", "Loyalty"],
            isCanonical: false
          }
        ]
      }
    ],
    canonicalOutcome: "Arjuna strikes Karna dead at Krishna's urging. The Kaurava army is shattered."
  }
};


