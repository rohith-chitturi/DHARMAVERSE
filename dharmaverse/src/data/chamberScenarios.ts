export type ScenarioContext = {
  scenarioId: string;
  slug: string;
  title: string;
  description: string;
  timelineState: string;
  activeCharacters: string[];
  eventContext: string;
  initialTensions: string[];
  objectives: Record<string, string>;
  historicalConstraints: string[];
  allowedTopics: string[];
  initialSpeaker: string;
  maxTurns: number;
  defaultLanguage: string;
  eventEmotion: string;
  worldState: string;
};

export const chamberScenarios: ScenarioContext[] = [
  {
    scenarioId: "dice_sabha",
    slug: "dice-sabha",
    title: "The Dice Sabha",
    description: "The moment Draupadi is dragged into the Kuru assembly. The turning point of the epic.",
    timelineState: "Pre-Exile",
    activeCharacters: ["draupadi", "duryodhana", "karna", "bhishma", "vidura"],
    eventContext: "Yudhishthira has lost his kingdom, his brothers, and his wife in a rigged game of dice. Draupadi has been dragged into the assembly hall by Dushasana. The elders are silent.",
    initialTensions: [
      "Draupadi demands to know if she was lost before or after Yudhishthira lost himself.",
      "Duryodhana is gloating and demanding her submission as a slave.",
      "Karna is fueling Duryodhana's cruelty, calling Draupadi a woman of many husbands.",
      "Bhishma is torn between his vow to the throne and his knowledge of Dharma.",
      "Vidura is the only one openly protesting, but he lacks power."
    ],
    objectives: {
      draupadi: "Force the elders to answer her question of Dharma and protect her dignity.",
      duryodhana: "Humiliate the Pandavas completely and assert total dominance.",
      karna: "Avenge his past insult at Draupadi's swayamvara by stripping the Pandavas of their pride.",
      bhishma: "Find a loophole in Dharma that prevents a civil war while keeping his vow to the king.",
      vidura: "Awaken Dhritarashtra's conscience before disaster strikes."
    },
    historicalConstraints: [
      "The Pandavas are bound by Yudhishthira's wager and cannot fight.",
      "Dhritarashtra is blind and ignoring the situation.",
      "Krishna is not physically present in the hall yet."
    ],
    allowedTopics: ["Dharma", "Slavery", "Vows", "Vengeance", "Kingdom"],
    initialSpeaker: "draupadi",
    maxTurns: 12,
    defaultLanguage: "en",
    eventEmotion: "Intense Outrage and Despair",
    worldState: "The Kuru assembly is in shock. The line of Dharma has been crossed."
  },
  {
    scenarioId: "peace_mission",
    slug: "krishna-peace-mission",
    title: "Krishna's Peace Mission",
    description: "Krishna arrives at Hastinapura to negotiate peace, asking for only five villages.",
    timelineState: "Pre-War",
    activeCharacters: ["krishna", "duryodhana", "vidura", "bhishma", "karna"],
    eventContext: "The Pandavas have completed their 13 years of exile. Krishna has come as an ambassador of peace, asking Duryodhana to give back Indraprastha, or at least five villages, to avoid total annihilation.",
    initialTensions: [
      "Krishna offers peace, but warns of total destruction if refused.",
      "Duryodhana refuses to give even a needle-point of land.",
      "Vidura and Bhishma desperately plead with Duryodhana to listen to Krishna.",
      "Karna promises to destroy the Pandavas if war happens."
    ],
    objectives: {
      krishna: "Expose Duryodhana's absolute greed and establish that war is now the only righteous path (Dharma Yuddha).",
      duryodhana: "Arrest Krishna and assert that the Pandavas broke the exile condition.",
      vidura: "Prevent the destruction of the Kuru lineage.",
      bhishma: "Avert the war at all costs.",
      karna: "Prove that he is superior to Arjuna and eager for the war."
    },
    historicalConstraints: [
      "Duryodhana has secretly planned to capture Krishna.",
      "Krishna knows the war is inevitable."
    ],
    allowedTopics: ["Peace", "Five Villages", "War", "Exile", "Arrest"],
    initialSpeaker: "krishna",
    maxTurns: 12,
    defaultLanguage: "en",
    eventEmotion: "Tense Negotiation",
    worldState: "The final attempt at peace is being made in the royal court."
  },
  {
    scenarioId: "eve_of_kurukshetra",
    slug: "eve-of-kurukshetra",
    title: "The Eve of Kurukshetra",
    description: "The night before the Great War begins.",
    timelineState: "Day 0",
    activeCharacters: ["krishna", "arjuna", "karna"],
    eventContext: "The armies are gathered. Kunti has just met Karna, and Krishna has revealed Karna's true lineage to him, offering him the empire. Arjuna is unaware of this.",
    initialTensions: [
      "Karna has refused Krishna's offer to switch sides, choosing loyalty to Duryodhana over his birthright.",
      "Arjuna is beginning to feel the weight of killing his grand-sire and teachers.",
      "Krishna is finalizing the cosmic board."
    ],
    objectives: {
      krishna: "Ensure the war proceeds according to Dharma, testing Karna's resolve.",
      arjuna: "Prepare mentally for the slaughter of his relatives.",
      karna: "Maintain his tragic vow to Duryodhana and promise Kunti he will only kill Arjuna."
    },
    historicalConstraints: [
      "Arjuna does NOT know Karna is his brother.",
      "Karna knows he is a Kaunteya but will not reveal it.",
      "Krishna knows everything."
    ],
    allowedTopics: ["Lineage", "Loyalty", "War", "Dharma", "Death"],
    initialSpeaker: "krishna",
    maxTurns: 12,
    defaultLanguage: "en",
    eventEmotion: "Melancholic Resolve",
    worldState: "The calm before the ultimate storm. The silence of a million doomed men."
  },
  {
    scenarioId: "day_17",
    slug: "kurukshetra-day-17",
    title: "Kurukshetra Day 17",
    description: "The final, fatal confrontation between Karna and Arjuna.",
    timelineState: "Day 17",
    activeCharacters: ["karna", "arjuna", "krishna", "shalya"],
    eventContext: "The climax of the war. Karna's chariot wheel is stuck in the mud. He has exhausted his divine weapons. Arjuna is aiming at him. Krishna is urging Arjuna to shoot.",
    initialTensions: [
      "Karna demands a pause in the fight to lift his wheel, citing the rules of Dharma.",
      "Krishna furiously recounts all the times Karna broke Dharma (Abhimanyu's death, the dice game).",
      "Arjuna is hesitating, torn between warrior code and Krishna's command.",
      "Shalya, Karna's charioteer, is watching the tragic end unfold."
    ],
    objectives: {
      karna: "Appeal to the ancient warrior code to buy time, knowing his death is near.",
      arjuna: "Decide whether to shoot an unarmed man or obey his divine charioteer.",
      krishna: "Force Arjuna to execute Karna, reminding him that Karna showed no mercy to Abhimanyu.",
      shalya: "Witness the fall of a great warrior, his earlier demoralization of Karna turning to respect."
    },
    historicalConstraints: [
      "Karna cannot remember the incantation for the Brahmastra due to his curse.",
      "Arjuna does not yet know Karna is his brother.",
      "Karna is currently weaponless on the ground."
    ],
    allowedTopics: ["Chariot Wheel", "Dharma", "Abhimanyu", "Curses", "Death"],
    initialSpeaker: "karna",
    maxTurns: 12,
    defaultLanguage: "en",
    eventEmotion: "Tragic Climax",
    worldState: "The battlefield is soaked in blood. The two greatest archers face their ultimate destiny."
  },
  {
    scenarioId: "after_abhimanyu",
    slug: "after-abhimanyu",
    title: "After Abhimanyu's Fall",
    description: "The night of Day 13. Abhimanyu has been brutally murdered by multiple warriors.",
    timelineState: "Day 13 Night",
    activeCharacters: ["arjuna", "krishna", "drona", "ashwatthama"],
    eventContext: "Abhimanyu was trapped in the Chakravyuha and killed unfairly by six Maharathis. Arjuna has just returned to camp and learned of his son's death.",
    initialTensions: [
      "Arjuna is consumed by unparalleled grief and blinding rage. He vows to kill Jayadratha by sunset tomorrow or immolate himself.",
      "Krishna knows the vow is nearly impossible but must support Arjuna.",
      "Drona feels deep guilt for allowing the boy to be slaughtered in his formation.",
      "Ashwatthama justifies the killing as the brutal reality of war."
    ],
    objectives: {
      arjuna: "Swear the ultimate oath of vengeance against Jayadratha.",
      krishna: "Channel Arjuna's grief into a focused, unstoppable weapon for tomorrow.",
      drona: "Defend his actions as Commander while grappling with the loss of his favorite student's son.",
      ashwatthama: "Mock the Pandavas' grief and assert Kaurava supremacy."
    },
    historicalConstraints: [
      "Jayadratha is being hidden by the entire Kaurava army.",
      "Arjuna's vow is binding."
    ],
    allowedTopics: ["Chakravyuha", "Jayadratha", "Vow", "Unfair Combat", "Grief"],
    initialSpeaker: "arjuna",
    maxTurns: 12,
    defaultLanguage: "en",
    eventEmotion: "Blinding Rage and Grief",
    worldState: "The Pandava camp is mourning. The rules of war have been permanently broken."
  }
];
