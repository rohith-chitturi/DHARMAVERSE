import { NextResponse } from "next/server";
import { AudioCacheService } from "@/lib/voice/AudioCacheService";

export async function GET(req: Request, { params }: { params: Promise<{ key: string }> }) {
  try {
    const { key } = await params;
    const cacheService = new AudioCacheService();
    const audioBuffer = await cacheService.getAudioBuffer(key);

    if (!audioBuffer) {
      return new NextResponse("Audio not found in cache", { status: 404 });
    }

    // Serve the audio file with appropriate headers
    return new NextResponse(audioBuffer as any, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    });
  } catch (error) {
    console.error("[Audio Cache Route Error]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
