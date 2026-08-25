export interface VoiceProfile {
  characterId: string;
  voiceId: string; // The provider's voice ID
  voiceVersion: string; // Used for cache invalidation if voice config changes
  supportedLanguages: string[];
  style: string;
  tone: string;
  pacing: string;
  description: string;
}

export const voiceProfiles: VoiceProfile[] = [
  {
    characterId: "krishna",
    // We use some placeholder 11Labs voice IDs here, in reality you'd map to your actual trained/selected voices
    voiceId: "TX3OmfQAyOS1TX2aI0pM", // Example generic ID
    voiceVersion: "v1",
    supportedLanguages: ["en", "hi", "te"],
    style: "philosophical",
    tone: "warm, calm, measured",
    pacing: "steady and deliberate",
    description: "A voice that carries the weight of the universe but speaks with the warmth of a friend."
  },
  {
    characterId: "karna",
    voiceId: "ErXwobaYiN019PkySvjV", // Example generic ID
    voiceVersion: "v1",
    supportedLanguages: ["en", "hi", "te"],
    style: "intense",
    tone: "deep, restrained, emotionally controlled",
    pacing: "firm, sometimes hesitant when conflicted",
    description: "The voice of a tragic hero—proud but carrying deep, unspoken pain."
  },
  {
    characterId: "arjuna",
    voiceId: "VR6AewLTigWG4xSOukaG", // Example generic ID
    voiceVersion: "v1",
    supportedLanguages: ["en", "hi", "te"],
    style: "earnest",
    tone: "thoughtful, conflicted, noble",
    pacing: "dynamic, accelerating during combat, slow during moral doubt",
    description: "The voice of the peerless archer, dutiful but constantly questioning."
  }
];

export function getVoiceProfile(characterId: string): VoiceProfile | undefined {
  return voiceProfiles.find(p => p.characterId === characterId);
}
