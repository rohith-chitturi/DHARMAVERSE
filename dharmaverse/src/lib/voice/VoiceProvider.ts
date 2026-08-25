export interface VoiceGenerationOptions {
  voiceId: string;
  text: string;
  language: string;
  emotion?: string; // Optional context for the provider
}

export interface VoiceGenerationResult {
  audioBuffer: Buffer;
  mimeType: string;
  duration?: number;
}

export interface VoiceProvider {
  /**
   * Generates speech audio for the given text using the specified voice ID.
   * Throws an error if the generation fails.
   */
  generateSpeech(options: VoiceGenerationOptions): Promise<VoiceGenerationResult>;

  /**
   * Returns true if this provider supports the requested language code (e.g., "en", "hi", "te").
   */
  supportsLanguage(language: string): boolean;

  /**
   * Returns the name of the provider (e.g., "ElevenLabs").
   */
  getProviderName(): string;

  /**
   * Verifies if the provider is currently configured and available (e.g., API keys are present).
   */
  isAvailable(): boolean;
}
