import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

/**
 * A local file-based cache for audio files. 
 * In a production environment, this should be backed by an object store (e.g. S3 or Vercel Blob).
 */
export class AudioCacheService {
  private cacheDir: string;

  constructor() {
    // We use a local directory inside the project for simplicity in this phase.
    // Ensure this directory is added to .gitignore (.dharmaverse-cache)
    this.cacheDir = path.join(process.cwd(), '.dharmaverse-cache', 'audio');
    
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    }
  }

  /**
   * Generates a deterministic cache key.
   */
  generateCacheKey(characterId: string, language: string, text: string, voiceVersion: string): string {
    const textHash = crypto.createHash('md5').update(text).digest('hex');
    return `${characterId}_${language}_${textHash}_${voiceVersion}`;
  }

  /**
   * Checks if audio exists in the cache and returns its public URL path if it does.
   */
  async getCachedAudioUrl(cacheKey: string): Promise<string | null> {
    const filePath = path.join(this.cacheDir, `${cacheKey}.mp3`);
    
    if (fs.existsSync(filePath)) {
      // In a real app, this would be a CDN URL or a signed S3 URL.
      // Here, we'll serve it through a Next.js API route that reads from the cache dir.
      return `/api/voice/cache/${cacheKey}`;
    }
    
    return null;
  }

  /**
   * Stores the audio buffer in the cache.
   */
  async cacheAudio(cacheKey: string, audioBuffer: Buffer): Promise<string> {
    const filePath = path.join(this.cacheDir, `${cacheKey}.mp3`);
    fs.writeFileSync(filePath, audioBuffer);
    
    return `/api/voice/cache/${cacheKey}`;
  }

  /**
   * Gets the raw buffer for serving the cached file via the API route.
   */
  async getAudioBuffer(cacheKey: string): Promise<Buffer | null> {
    const filePath = path.join(this.cacheDir, `${cacheKey}.mp3`);
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath);
    }
    return null;
  }
}
