import { VoiceProvider } from "./VoiceProvider";
import { ElevenLabsProvider } from "./ElevenLabsProvider";
import { AudioCacheService } from "./AudioCacheService";
import { getVoiceProfile } from "@/data/voiceProfiles";

export class VoiceService {
  private provider: VoiceProvider;
  private cache: AudioCacheService;

  constructor() {
    this.provider = new ElevenLabsProvider();
    this.cache = new AudioCacheService();
  }

  /**
   * Generates or retrieves audio for a specific character, text, and language.
   * Returns the URL to the audio file.
   */
  async getAudioUrl(characterId: string, text: string, language: string): Promise<string> {
    const profile = getVoiceProfile(characterId);
    if (!profile) {
      throw new Error(`No voice profile found for character: ${characterId}`);
    }

    if (!profile.supportedLanguages.includes(language)) {
      throw new Error(`Voice profile for ${characterId} does not support language: ${language}`);
    }

    if (!this.provider.isAvailable()) {
      throw new Error(`TTS Provider ${this.provider.getProviderName()} is unavailable.`);
    }

    // 1. Calculate Cache Key
    const cacheKey = this.cache.generateCacheKey(characterId, language, text, profile.voiceVersion);

    // 2. Check Cache
    const cachedUrl = await this.cache.getCachedAudioUrl(cacheKey);
    if (cachedUrl) {
      console.log(`[VoiceService] Cache HIT for ${cacheKey}`);
      return cachedUrl;
    }

    console.log(`[VoiceService] Cache MISS for ${cacheKey}. Generating speech...`);

    // 3. Generate Speech
    const result = await this.provider.generateSpeech({
      voiceId: profile.voiceId,
      text: text,
      language: language
    });

    // 4. Cache and return URL
    const url = await this.cache.cacheAudio(cacheKey, result.audioBuffer);
    
    return url;
  }
}

// Singleton instance for the server
export const voiceService = new VoiceService();
