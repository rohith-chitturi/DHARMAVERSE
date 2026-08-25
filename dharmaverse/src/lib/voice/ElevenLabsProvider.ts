import { VoiceProvider, VoiceGenerationOptions, VoiceGenerationResult } from "./VoiceProvider";

export class ElevenLabsProvider implements VoiceProvider {
  private apiKey: string | undefined;

  constructor() {
    this.apiKey = process.env.ELEVENLABS_API_KEY;
  }

  isAvailable(): boolean {
    return !!this.apiKey;
  }

  getProviderName(): string {
    return "ElevenLabs";
  }

  supportsLanguage(language: string): boolean {
    // ElevenLabs multilingual v2 supports EN, HI, TE among others
    const supported = ["en", "hi", "te"];
    return supported.includes(language.toLowerCase());
  }

  async generateSpeech(options: VoiceGenerationOptions): Promise<VoiceGenerationResult> {
    if (!this.isAvailable()) {
      throw new Error("ElevenLabs API key is not configured.");
    }

    const modelId = "eleven_multilingual_v2";

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${options.voiceId}`, {
      method: "POST",
      headers: {
        "Accept": "audio/mpeg",
        "xi-api-key": this.apiKey!,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: options.text,
        model_id: modelId,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.0,
          use_speaker_boost: true
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ElevenLabs API error: ${response.status} - ${errorText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    
    return {
      audioBuffer: Buffer.from(arrayBuffer),
      mimeType: "audio/mpeg"
    };
  }
}
