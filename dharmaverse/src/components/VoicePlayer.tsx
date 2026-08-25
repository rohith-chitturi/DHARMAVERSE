import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, RotateCcw, Volume1 } from "lucide-react";
import { motion } from "framer-motion";
import { useSettings } from "@/context/SettingsContext";

interface VoicePlayerProps {
  characterId: string;
  text: string;
  onPlaybackStart?: () => void;
  onPlaybackEnd?: () => void;
}

type PlayerState = "IDLE" | "LOADING" | "PLAYING" | "PAUSED" | "ERROR";

export default function VoicePlayer({ characterId, text, onPlaybackStart, onPlaybackEnd }: VoicePlayerProps) {
  const [state, setState] = useState<PlayerState>("IDLE");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { settings } = useSettings();

  useEffect(() => {
    // Clean up audio on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const fetchAndPlay = async () => {
    try {
      setState("LOADING");
      
      // If we already have the URL cached locally, just play it
      if (audioUrl && audioRef.current) {
        audioRef.current.play();
        return;
      }

      // Fetch from API
      const res = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          characterId,
          text,
          language: settings.language
        })
      });

      if (!res.ok) {
        throw new Error("Failed to generate voice");
      }

      const data = await res.json();
      
      if (data.url) {
        setAudioUrl(data.url);
        if (audioRef.current) {
          audioRef.current.src = data.url;
          audioRef.current.play();
        }
      } else {
        throw new Error("No URL returned");
      }

    } catch (err) {
      console.error("[VoicePlayer Error]", err);
      setState("ERROR");
    }
  };

  const handlePlayPause = () => {
    if (state === "IDLE") {
      fetchAndPlay();
    } else if (state === "PLAYING") {
      audioRef.current?.pause();
      setState("PAUSED");
    } else if (state === "PAUSED") {
      audioRef.current?.play();
    }
  };

  const handleReplay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleAudioPlay = () => {
    setState("PLAYING");
    if (onPlaybackStart) onPlaybackStart();
  };

  const handleAudioPause = () => {
    setState("PAUSED");
  };

  const handleAudioEnded = () => {
    setState("PAUSED");
    if (onPlaybackEnd) onPlaybackEnd();
  };

  if (state === "ERROR") {
    return (
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-red-500/80 bg-red-900/10 px-3 py-1.5 rounded-full border border-red-500/20 w-fit">
        Voice Unavailable
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 w-fit">
      
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef}
        onPlay={handleAudioPlay}
        onPause={handleAudioPause}
        onEnded={handleAudioEnded}
        onError={() => setState("ERROR")}
      />

      {/* Main Play/Pause Button */}
      <button 
        onClick={handlePlayPause}
        disabled={state === "LOADING"}
        className="flex items-center gap-2 text-primary hover:text-white transition-colors disabled:opacity-50 group"
      >
        <div className="w-8 h-8 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary transition-all">
          {state === "LOADING" ? (
            <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          ) : state === "PLAYING" ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4 ml-0.5" />
          )}
        </div>
        
        <span className="text-xs font-bold tracking-[0.2em] uppercase">
          {state === "LOADING" ? "Channeling..." : state === "PLAYING" ? "Playing" : "Listen"}
        </span>
      </button>

      {/* Extended Controls (Only show if we have audio) */}
      {(state === "PLAYING" || state === "PAUSED") && (
        <motion.div 
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          className="flex items-center gap-2 border-l border-white/10 pl-3 ml-1"
        >
          <button onClick={handleReplay} className="text-white/40 hover:text-white transition-colors p-1" aria-label="Replay">
            <RotateCcw className="w-4 h-4" />
          </button>
          
          <div className="group relative flex items-center">
            <button onClick={() => setIsMuted(!isMuted)} className="text-white/40 hover:text-white transition-colors p-1" aria-label={isMuted ? "Unmute" : "Mute"}>
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : volume < 0.5 ? <Volume1 className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <div className="w-0 overflow-hidden group-hover:w-20 transition-all duration-300 flex items-center px-2">
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  setIsMuted(false);
                }}
                className="w-full h-1 bg-white/20 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
