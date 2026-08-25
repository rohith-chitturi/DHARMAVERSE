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
  involvedCharacters: string[];
  options: DecisionOption[];
}

export interface WarDay {
  id: string;
  dayNumber: number;
  title: string;
  commanderKaurava: string;
  commanderPandava: string;
  majorEvents: string[];
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

export interface SimulationBranch {
  branchId: string;
  userId: string;
  warDayId: string;
  decisionId: string;
  chosenOptionId: string;
  originCanonicalState: Partial<WarDay>; 
  branchStatus: 'active' | 'completed' | 'abandoned';
  consequences: SimulationConsequences | null; 
}

export interface SimulationConsequences {
  immediateConsequences: string[];
  affectedCharacters: string[];
  relationshipChanges: string[];
  futureDivergences: string[];
  narrative: string;
  nextPossiblePaths: string[];
  canonicalReminder: string;
}
