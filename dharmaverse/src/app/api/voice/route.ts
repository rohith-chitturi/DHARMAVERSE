import { NextResponse } from "next/server";
import { voiceService } from "@/lib/voice/VoiceService";
import { getVoiceProfile } from "@/data/voiceProfiles";

export async function POST(req: Request) {
  try {
    const { characterId, text, language } = await req.json();

    if (!characterId || !text || !language) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Text Length Limit (Cost control)
    if (text.length > 500) {
      return NextResponse.json({ error: "Text exceeds maximum allowed length for TTS" }, { status: 400 });
    }

    // 2. Validate Character Profile
    const profile = getVoiceProfile(characterId);
    if (!profile) {
      return NextResponse.json({ error: "No voice profile configured for this character" }, { status: 404 });
    }

    // 3. Validate Language
    if (!profile.supportedLanguages.includes(language)) {
      return NextResponse.json({ error: `Language ${language} not supported for this character` }, { status: 400 });
    }

    // 4. Generate or Retrieve from Cache
    // The voiceService handles caching internally and returns a URL.
    const audioUrl = await voiceService.getAudioUrl(characterId, text, language);

    return NextResponse.json({
      url: audioUrl,
      characterId,
      language,
      cached: true // Client doesn't strictly need to know if it was a cache hit or miss, but we return URL
    });
    
  } catch (error: any) {
    console.error("[Voice API Error]", error);
    return NextResponse.json({ error: "Voice generation failed", details: error.message }, { status: 500 });
  }
}
