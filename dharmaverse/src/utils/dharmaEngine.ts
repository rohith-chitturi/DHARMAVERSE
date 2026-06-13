import { DharmaVector, HiddenMetric, DharmaProfile, DharmaDecisionOption } from "@/data/types";

// Engine Logic for the Dharma Mirror

export function calculateDharmaProfile(
  selectedOptions: DharmaDecisionOption[],
  previousProfiles: DharmaProfile[]
): DharmaProfile {
  // Initialize base scores
  const scores: Record<DharmaVector, number> = {
    Loyalty: 0, Justice: 0, Duty: 0, Compassion: 0,
    Ambition: 0, Wisdom: 0, Sacrifice: 0, Resilience: 0
  };

  const hiddenScores: Record<HiddenMetric, number> = {
    Idealism: 0, Pragmatism: 0, Forgiveness: 0, Vengeance: 0, Individualism: 0, Collectivism: 0
  };

  // Aggregate scores from decisions
  selectedOptions.forEach(opt => {
    Object.entries(opt.impact).forEach(([vector, value]) => {
      if (value) scores[vector as DharmaVector] += value;
    });
    Object.entries(opt.hiddenImpact).forEach(([metric, value]) => {
      if (value) hiddenScores[metric as HiddenMetric] += value;
    });
  });

  // Determine Core Strength and Weakness
  let coreStrength: DharmaVector = "Duty";
  let maxScore = -Infinity;
  let coreWeakness: DharmaVector = "Ambition";
  let minScore = Infinity;

  Object.entries(scores).forEach(([vector, score]) => {
    if (score > maxScore) { maxScore = score; coreStrength = vector as DharmaVector; }
    if (score < minScore) { minScore = score; coreWeakness = vector as DharmaVector; }
  });

  // Archetype Mapping (Simplified for now, can be expanded)
  const primaryArchetype = determinePrimaryArchetype(coreStrength, hiddenScores);
  const secondaryArchetype = determineSecondaryArchetype(coreStrength, coreWeakness);

  // Character Resonance System
  const characterResonance = generateCharacterResonance(scores, hiddenScores);

  // Your Kurukshetra
  const yourKurukshetra = generateYourKurukshetra(scores, hiddenScores);

  return {
    id: `dp_${Date.now()}`,
    timestamp: new Date().toISOString(),
    scores,
    hiddenScores,
    primaryArchetype,
    secondaryArchetype,
    coreStrength,
    coreWeakness,
    characterResonance,
    yourKurukshetra
  };
}

function determinePrimaryArchetype(strength: DharmaVector, hidden: Record<HiddenMetric, number>): string {
  if (strength === "Justice" && hidden.Idealism > 10) return "The Unyielding Pillar";
  if (strength === "Loyalty" && hidden.Collectivism > 10) return "The Bound Companion";
  if (strength === "Ambition" && hidden.Pragmatism > 10) return "The Strategic Conqueror";
  if (strength === "Compassion" && hidden.Forgiveness > 10) return "The Peaceful Anchor";
  if (strength === "Wisdom") return "The Silent Observer";
  if (strength === "Sacrifice") return "The Tragic Martyr";
  if (strength === "Duty") return "The Lawful Guardian";
  if (strength === "Resilience") return "The Unbroken Survivor";
  return "The Seeker";
}

function determineSecondaryArchetype(strength: DharmaVector, weakness: DharmaVector): string {
  if (weakness === "Compassion") return "Ruthless Pragmatist";
  if (weakness === "Loyalty") return "Solitary Wanderer";
  if (weakness === "Justice") return "Loyal Partisan";
  if (weakness === "Wisdom") return "Impulsive Actor";
  return "Complex Soul";
}

function generateCharacterResonance(scores: Record<DharmaVector, number>, hidden: Record<HiddenMetric, number>) {
  const resonance = [];

  // Sort vectors to find top traits
  const sortedVectors = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  
  if (sortedVectors[0][0] === "Loyalty") resonance.push({ characterId: "karna", trait: "Loyalty", description: "You possess Karna's unshakeable loyalty, choosing personal bonds over absolute rules." });
  else if (sortedVectors[0][0] === "Justice") resonance.push({ characterId: "yudhishthira", trait: "Justice", description: "You share Yudhishthira's rigid adherence to cosmic truth, even at great personal cost." });
  else if (sortedVectors[0][0] === "Duty") resonance.push({ characterId: "bhishma", trait: "Duty", description: "Like Bhishma, you bind yourself to duty above all personal desires." });
  else if (sortedVectors[0][0] === "Ambition") resonance.push({ characterId: "duryodhana", trait: "Ambition", description: "You hold the fierce ambition of Duryodhana, willing to break the world to secure your place." });
  else if (sortedVectors[0][0] === "Wisdom") resonance.push({ characterId: "vidura", trait: "Wisdom", description: "You have Vidura's piercing clarity, seeing the long-term consequences of immediate actions." });

  // Add a secondary complex resonance based on hidden metrics
  if (hidden.Pragmatism > hidden.Idealism && scores.Compassion > 0) {
    resonance.push({ characterId: "krishna", trait: "Strategic Compassion", description: "Like Krishna, your compassion is strategic; you understand that sometimes rules must be broken for the greater good." });
  } else if (hidden.Vengeance > 10) {
    resonance.push({ characterId: "draupadi", trait: "Righteous Fury", description: "You carry Draupadi's righteous fury, refusing to let historic wrongs go unpunished." });
  } else if (hidden.Individualism > 10) {
    resonance.push({ characterId: "arjuna", trait: "Internal Conflict", description: "Like Arjuna, you struggle to reconcile society's demands with your own internal moral compass." });
  }

  return resonance;
}

function generateYourKurukshetra(scores: Record<DharmaVector, number>, hidden: Record<HiddenMetric, number>): string {
  // Find the two highest conflicting vectors
  if (scores.Loyalty > 5 && scores.Justice > 5) {
    return "Your ultimate battlefield is the war between Loyalty to your people and absolute Justice. You will eventually be forced to choose between protecting those you love and doing what is universally right.";
  }
  if (scores.Ambition > 5 && scores.Compassion > 5) {
    return "Your Kurukshetra is the clash between your towering Ambition and your deep Compassion. Achieving your highest goals will require you to leave people behind, breaking your own heart.";
  }
  if (scores.Duty > 5 && hidden.Individualism > 5) {
    return "Your internal war is fought between societal Duty and your own Individualism. You are trapped by expectations, constantly resisting the urge to break free from the roles assigned to you.";
  }
  if (hidden.Forgiveness > 5 && hidden.Vengeance > 5) {
    return "Your Kurukshetra is the struggle to let go of the past. You are torn between the spiritual peace of Forgiveness and the visceral satisfaction of Vengeance against those who wronged you.";
  }

  return "Your ultimate battlefield is the struggle to define your own Dharma in a world that constantly demands you compromise.";
}
