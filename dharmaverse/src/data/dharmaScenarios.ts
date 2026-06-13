import { DharmaDecision } from "./types";

export const dharmaScenarios: DharmaDecision[] = [
  {
    id: "s1-betrayal",
    scenario: "A lifelong friend, who has protected you in the past, commits a severe crime against an innocent. The authorities ask if you know who did it.",
    options: [
      {
        text: "Protect your friend. Loyalty supersedes the law.",
        impact: { Loyalty: 10, Justice: -5, Compassion: 5 },
        hiddenImpact: { Individualism: 5, Pragmatism: 5 },
        epicConnection: "Like Karna, you chose personal loyalty to a benefactor over absolute justice."
      },
      {
        text: "Turn them in. Justice must be blind.",
        impact: { Justice: 10, Loyalty: -10, Duty: 5 },
        hiddenImpact: { Idealism: 10, Collectivism: 5 },
        epicConnection: "Like Vidura, you prioritize universal Dharma over personal attachment."
      },
      {
        text: "Confront them privately and force them to confess.",
        impact: { Wisdom: 10, Justice: 5, Compassion: 5 },
        hiddenImpact: { Pragmatism: 5 },
        epicConnection: "Like Krishna, you seek a strategic path that fulfills duty without immediately breaking bonds."
      }
    ]
  },
  {
    id: "s2-power",
    scenario: "You are offered immense power and wealth that rightfully belongs to your rival. If you accept, your family will thrive, but your rival will be ruined.",
    options: [
      {
        text: "Accept it. Power secures the future for those I love.",
        impact: { Ambition: 10, Sacrifice: -5, Duty: -5 },
        hiddenImpact: { Pragmatism: 10, Individualism: 5 },
        epicConnection: "Like Duryodhana, your ambition and desire to elevate your own eclipses traditional fairness."
      },
      {
        text: "Reject it. What is not rightfully mine brings only ruin.",
        impact: { Justice: 10, Ambition: -10, Wisdom: 5 },
        hiddenImpact: { Idealism: 10 },
        epicConnection: "Like Yudhishthira, your adherence to righteousness outweighs material gain."
      },
      {
        text: "Accept it, but secretly share the wealth with the rival.",
        impact: { Compassion: 10, Wisdom: 5, Ambition: 5 },
        hiddenImpact: { Pragmatism: 10 },
        epicConnection: "A complex choice, echoing Kunti's attempts to balance competing familial claims."
      }
    ]
  },
  {
    id: "s3-sacrifice",
    scenario: "A terrible conflict can be entirely avoided if you publicly accept the blame for a failure that was not your fault. It will destroy your reputation forever.",
    options: [
      {
        text: "Accept the blame. Peace is worth my reputation.",
        impact: { Sacrifice: 10, Resilience: 5, Ambition: -10 },
        hiddenImpact: { Collectivism: 10, Idealism: 5 },
        epicConnection: "Like Bhishma, you are willing to sacrifice your own life and name for the stability of the realm."
      },
      {
        text: "Refuse. Truth must prevail, even if it brings conflict.",
        impact: { Justice: 10, Duty: 5, Sacrifice: -5 },
        hiddenImpact: { Individualism: 5, Idealism: 5 },
        epicConnection: "Like Draupadi, you demand absolute truth and refuse to be a quiet martyr for the comfort of others."
      },
      {
        text: "Expose the true culprit, regardless of the consequences.",
        impact: { Justice: 10, Vengeance: 5, Compassion: -5 },
        hiddenImpact: { Pragmatism: 5 },
        epicConnection: "Your pursuit of the truth mirrors Arjuna's arrows—direct, unyielding, and devastating."
      }
    ]
  },
  {
    id: "s4-vow",
    scenario: "You made a sacred promise years ago. Keeping it now will cause immense suffering to someone you deeply love.",
    options: [
      {
        text: "Break the promise. Love and compassion matter more than words.",
        impact: { Compassion: 10, Duty: -10, Loyalty: 5 },
        hiddenImpact: { Pragmatism: 10, Individualism: 5 },
        epicConnection: "You prioritize the living over abstract vows, breaking from the rigid traditions of the Kuru elders."
      },
      {
        text: "Keep the promise. A broken word destroys the soul.",
        impact: { Duty: 10, Sacrifice: 10, Compassion: -10 },
        hiddenImpact: { Idealism: 10 },
        epicConnection: "Like Bhishma's terrible vow, your adherence to your word is absolute, regardless of the tragic cost."
      },
      {
        text: "Find a loophole to fulfill the letter of the vow while saving them.",
        impact: { Wisdom: 10, Pragmatism: 10, Duty: -5 },
        hiddenImpact: { Pragmatism: 10 },
        epicConnection: "Like Krishna, you bend the rules of reality to serve the higher good while technically maintaining the structure."
      }
    ]
  },
  {
    id: "s5-enemy",
    scenario: "Your greatest enemy is at your mercy, disarmed and pleading for their life. They have caused you and your family irreparable harm.",
    options: [
      {
        text: "Show mercy. The cycle of hatred must end with me.",
        impact: { Compassion: 10, Wisdom: 5, Justice: -5 },
        hiddenImpact: { Forgiveness: 10, Idealism: 5 },
        epicConnection: "Like Yudhishthira, your capacity for forgiveness transcends personal vengeance."
      },
      {
        text: "Strike them down. They must pay for their crimes.",
        impact: { Justice: 10, Duty: 5, Compassion: -10 },
        hiddenImpact: { Vengeance: 10, Pragmatism: 5 },
        epicConnection: "Like Bheema, your justice is swift, brutal, and utterly final."
      },
      {
        text: "Spare their life, but strip them of all power and dignity.",
        impact: { Ambition: 5, Justice: 5, Resilience: 5 },
        hiddenImpact: { Pragmatism: 10 },
        epicConnection: "A strategic move reminiscent of Ashwatthama's humiliation, leaving the enemy alive but broken."
      }
    ]
  },
  {
    id: "s6-truth",
    scenario: "You discover a hidden truth about your past that invalidates your current achievements. Revealing it will cost you your position, but keeping it is a lie.",
    options: [
      {
        text: "Bury the truth. I earned my place through action, not origin.",
        impact: { Ambition: 10, Resilience: 5, Duty: -5 },
        hiddenImpact: { Pragmatism: 10, Individualism: 5 },
        epicConnection: "Like Karna, you believe worth is defined by deed, rejecting the fatalism of birth."
      },
      {
        text: "Reveal the truth and step down immediately.",
        impact: { Justice: 10, Sacrifice: 10, Ambition: -10 },
        hiddenImpact: { Idealism: 10 },
        epicConnection: "Your commitment to absolute transparency echoes the rigid honesty of Yudhishthira."
      },
      {
        text: "Use the truth to quietly dismantle the system from within.",
        impact: { Wisdom: 10, Ambition: 5, Loyalty: -5 },
        hiddenImpact: { Pragmatism: 10, Collectivism: 5 },
        epicConnection: "Like Vidura, you use uncomfortable truths as tools for long-term reform."
      }
    ]
  },
  {
    id: "s7-war",
    scenario: "You are the commander of an army. A tactic guarantees victory and saves your soldiers, but it violates the agreed-upon rules of honorable combat.",
    options: [
      {
        text: "Use the tactic. Victory and my people's lives are paramount.",
        impact: { Ambition: 5, Duty: 10, Justice: -5 },
        hiddenImpact: { Pragmatism: 10, Collectivism: 5 },
        epicConnection: "Like Krishna orchestrating the fall of Drona, you prioritize the ultimate victory over procedural honor."
      },
      {
        text: "Refuse the tactic. A victory without honor is worse than defeat.",
        impact: { Duty: 10, Sacrifice: 5, Wisdom: -5 },
        hiddenImpact: { Idealism: 10 },
        epicConnection: "Like Arjuna's initial hesitation, you struggle to reconcile martial duty with spiritual purity."
      },
      {
        text: "Execute the tactic, then step down in penance.",
        impact: { Sacrifice: 10, Justice: 5, Ambition: -10 },
        hiddenImpact: { Idealism: 5, Pragmatism: 5 },
        epicConnection: "You carry the weight of necessary sin, bearing the karmic debt for others."
      }
    ]
  },
  {
    id: "s8-mentor",
    scenario: "Your beloved mentor demands you do something that clearly violates your own moral compass.",
    options: [
      {
        text: "Obey them out of respect and gratitude.",
        impact: { Loyalty: 10, Duty: 5, Justice: -10 },
        hiddenImpact: { Collectivism: 10 },
        epicConnection: "Like Arjuna preparing to fight his grandfathers, your deference to authority overrides personal alignment."
      },
      {
        text: "Refuse them, even if it means severing the relationship.",
        impact: { Justice: 10, Wisdom: 5, Loyalty: -10 },
        hiddenImpact: { Individualism: 10, Idealism: 5 },
        epicConnection: "Like Vidura walking away from Dhritarashtra, you prioritize universal truth over emotional bonds."
      },
      {
        text: "Pretend to obey, but subtly undermine the outcome.",
        impact: { Wisdom: 10, Compassion: 5, Duty: -5 },
        hiddenImpact: { Pragmatism: 10 },
        epicConnection: "A dangerous game of shadows, akin to Shakuni's indirect manipulations."
      }
    ]
  },
  {
    id: "s9-humiliation",
    scenario: "You are publicly humiliated by someone powerful while the community watches in silence. You have no immediate power to fight back.",
    options: [
      {
        text: "Swear eternal vengeance, no matter how long it takes.",
        impact: { Resilience: 10, Ambition: 5, Compassion: -10 },
        hiddenImpact: { Vengeance: 10, Individualism: 5 },
        epicConnection: "Like Draupadi in the Sabha, your fury becomes the fuel that will eventually burn an empire."
      },
      {
        text: "Endure in silence. Time will bring balance.",
        impact: { Resilience: 10, Wisdom: 5, Ambition: -5 },
        hiddenImpact: { Pragmatism: 5, Forgiveness: 5 },
        epicConnection: "Like the Pandavas during their exile, you recognize that survival is the prerequisite for future justice."
      },
      {
        text: "Call out the silent watchers for their cowardice.",
        impact: { Justice: 10, Sacrifice: 5, Wisdom: -5 },
        hiddenImpact: { Idealism: 10 },
        epicConnection: "You demand accountability from the system itself, challenging the very fabric of society's dharma."
      }
    ]
  },
  {
    id: "s10-legacy",
    scenario: "You have built an incredible legacy. To ensure it survives, you must pass it to an unworthy heir, or destroy it so your rivals cannot have it.",
    options: [
      {
        text: "Pass it to the unworthy heir. Blood and continuity matter most.",
        impact: { Loyalty: 10, Duty: 5, Wisdom: -10 },
        hiddenImpact: { Collectivism: 10 },
        epicConnection: "Like Dhritarashtra's blind love for Duryodhana, your attachment to lineage blinds you to ruin."
      },
      {
        text: "Destroy it. If it cannot be held by the worthy, it must end.",
        impact: { Sacrifice: 10, Justice: 5, Loyalty: -5 },
        hiddenImpact: { Idealism: 5, Pragmatism: 5 },
        epicConnection: "Like Ashwatthama's final devastating weapon, you choose annihilation over compromise."
      },
      {
        text: "Give it to your rival. The legacy is bigger than my ego.",
        impact: { Wisdom: 10, Compassion: 5, Ambition: -10 },
        hiddenImpact: { Pragmatism: 10, Forgiveness: 10 },
        epicConnection: "A rare display of ultimate detachment, acting only for the preservation of the concept, not the self."
      }
    ]
  },
  {
    id: "s11-innocent",
    scenario: "To defeat a tyrant who is destroying the world, you must sacrifice one completely innocent life.",
    options: [
      {
        text: "Make the sacrifice. The needs of the many outweigh the one.",
        impact: { Duty: 10, Wisdom: 5, Compassion: -10 },
        hiddenImpact: { Pragmatism: 10, Collectivism: 10 },
        epicConnection: "Like Krishna advising the sacrifice of Ghatotkacha to save Arjuna, you calculate the harsh math of survival."
      },
      {
        text: "Refuse. An evil committed to stop evil makes me the tyrant.",
        impact: { Compassion: 10, Justice: 10, Duty: -5 },
        hiddenImpact: { Idealism: 10, Individualism: 5 },
        epicConnection: "You reject the moral compromises of war, clinging to absolute spiritual purity."
      },
      {
        text: "Offer your own life instead, hoping it is enough.",
        impact: { Sacrifice: 10, Compassion: 5, Ambition: -10 },
        hiddenImpact: { Idealism: 10 },
        epicConnection: "Like Abhimanyu entering the Chakravyuha, you rush toward certain doom to shield others."
      }
    ]
  },
  {
    id: "s12-knowledge",
    scenario: "You possess a secret that could destroy the current societal order, freeing the oppressed but causing massive chaos and war.",
    options: [
      {
        text: "Keep the secret. Chaos brings more suffering than oppression.",
        impact: { Wisdom: 10, Duty: 5, Justice: -5 },
        hiddenImpact: { Pragmatism: 10, Collectivism: 5 },
        epicConnection: "Like Bhishma suppressing the truth of the Kuru lineage, you favor stability over disruptive truth."
      },
      {
        text: "Release the secret. A society built on lies deserves to fall.",
        impact: { Justice: 10, Resilience: 5, Wisdom: -5 },
        hiddenImpact: { Idealism: 10, Vengeance: 5 },
        epicConnection: "You are the catalyst for the great war, believing that only fire can cleanse a corrupted forest."
      },
      {
        text: "Reveal it only to a few chosen leaders to slowly force reform.",
        impact: { Ambition: 5, Wisdom: 10, Sacrifice: -5 },
        hiddenImpact: { Pragmatism: 10 },
        epicConnection: "Like Krishna organizing the Pandavas, you engineer a slow, strategic revolution."
      }
    ]
  },
  {
    id: "s13-talent",
    scenario: "You have unparalleled talent, but society denies you an opportunity because of your background. Your rival, with less talent, is given the position.",
    options: [
      {
        text: "Ally with the society's enemies to prove your worth.",
        impact: { Ambition: 10, Resilience: 10, Loyalty: -10 },
        hiddenImpact: { Individualism: 10, Vengeance: 5 },
        epicConnection: "Like Karna aligning with Duryodhana, your need for validation drives you to the opposition."
      },
      {
        text: "Walk away entirely and build your own domain in isolation.",
        impact: { Wisdom: 10, Sacrifice: 5, Duty: -5 },
        hiddenImpact: { Pragmatism: 5, Individualism: 10 },
        epicConnection: "Like Ekalavya, you achieve mastery in the shadows, needing no societal approval."
      },
      {
        text: "Challenge the rival to a public duel to expose the system.",
        impact: { Justice: 10, Ambition: 5, Compassion: -5 },
        hiddenImpact: { Idealism: 10, Individualism: 5 },
        epicConnection: "You force the world to look at its own hypocrisy, demanding your rightful place in the sun."
      }
    ]
  },
  {
    id: "s14-forgiveness",
    scenario: "Years after a bitter conflict, your defeated enemy comes to you, broken and asking for shelter.",
    options: [
      {
        text: "Grant them shelter. The war is over.",
        impact: { Compassion: 10, Wisdom: 5, Resilience: -5 },
        hiddenImpact: { Forgiveness: 10, Collectivism: 5 },
        epicConnection: "Like Yudhishthira accepting Dhritarashtra after the war, you let go of the past."
      },
      {
        text: "Turn them away. Some debts can never be forgiven.",
        impact: { Justice: 10, Duty: 5, Compassion: -10 },
        hiddenImpact: { Vengeance: 5, Pragmatism: 5 },
        epicConnection: "Like Bheema, you refuse to let the ashes of war obscure the crimes committed."
      },
      {
        text: "Shelter them, but keep them under strict surveillance.",
        impact: { Wisdom: 10, Ambition: 5, Compassion: -5 },
        hiddenImpact: { Pragmatism: 10 },
        epicConnection: "A strategic benevolence, ensuring the threat is neutralized but controlled."
      }
    ]
  },
  {
    id: "s15-the-end",
    scenario: "You have achieved everything you set out to do, but it cost you everyone you loved. You stand alone at the pinnacle of the world.",
    options: [
      {
        text: "Embrace the solitude. This is the price of greatness.",
        impact: { Resilience: 10, Ambition: 10, Compassion: -10 },
        hiddenImpact: { Individualism: 10, Pragmatism: 5 },
        epicConnection: "You sit upon the throne of ashes, accepting the terrible cost of your ambition."
      },
      {
        text: "Abandon the throne and walk into the wilderness.",
        impact: { Sacrifice: 10, Wisdom: 10, Ambition: -20 },
        hiddenImpact: { Idealism: 10 },
        epicConnection: "Like the Pandavas' final journey (Mahaprasthanika Parva), you realize earthly power is ultimately an illusion."
      },
      {
        text: "Dedicate the rest of your life to rebuilding what was broken.",
        impact: { Duty: 10, Compassion: 10, Sacrifice: 5 },
        hiddenImpact: { Collectivism: 10, Pragmatism: 5 },
        epicConnection: "Like Parikshit inheriting the post-war kingdom, you focus on healing the scars of the past."
      }
    ]
  }
];
