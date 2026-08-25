"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mapEras, mapLocations, locationPresences, mapRoutes } from "@/data/mapData";
import TemporalSlider from "./TemporalSlider";
import LocationModal from "./LocationModal";
import { useSettings } from "@/context/SettingsContext";

export default function LivingUniverse() {
  const { t } = useSettings();
  
  const [activeEraId, setActiveEraId] = useState<string>(mapEras[0].id);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  
  // Viewport/Map State
  const mapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  // Derive current state
  const activeEra = mapEras.find(e => e.id === activeEraId) || mapEras[0];
  const activePresences = locationPresences.filter(p => p.eraId === activeEraId);
  const activeRoutes = mapRoutes.filter(r => r.eraId === activeEraId);

  // Modal data
  const selectedLocation = mapLocations.find(loc => loc.id === selectedLocationId) || null;
  const selectedPresence = activePresences.find(p => p.locationId === selectedLocationId);

  // Zoom Handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomIntensity = 0.05;
    const newScale = e.deltaY < 0 ? scale + zoomIntensity : scale - zoomIntensity;
    setScale(Math.min(Math.max(0.5, newScale), 3));
  };

  return (
    <section className="relative w-full h-[100svh] bg-[#05070a] overflow-hidden select-none">
      
      {/* Background Atmosphere */}
      <div className={`absolute inset-0 z-0 bg-gradient-to-br ${activeEra.worldState} opacity-30 transition-all duration-1000`}></div>
      
      {/* Celestial Grid / Texture */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

      {/* Interactive Map Area */}
      <motion.div 
        ref={mapRef}
        className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing flex items-center justify-center"
        onWheel={handleWheel}
        drag
        dragConstraints={{ top: -500, left: -500, right: 500, bottom: 500 }}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setTimeout(() => setIsDragging(false), 100)} // Prevent click after drag
        style={{ scale }}
      >
        {/* The Map Canvas (Fixed relative size to represent Aryavarta) */}
        <div className="relative w-[1200px] h-[800px]">
          
          {/* Map SVG for Routes/Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <AnimatePresence>
              {activeRoutes.map(route => {
                const from = mapLocations.find(l => l.id === route.fromLocationId);
                const to = mapLocations.find(l => l.id === route.toLocationId);
                if (!from || !to) return null;
                
                return (
                  <motion.line
                    key={route.id}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    x1={`${from.x}%`}
                    y1={`${from.y}%`}
                    x2={`${to.x}%`}
                    y2={`${to.y}%`}
                    stroke="#D4AF37"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                );
              })}
            </AnimatePresence>
          </svg>

          {/* Location Nodes */}
          {mapLocations.map(loc => {
            const isActive = activeEra.activeLocations.includes(loc.id);
            const isSelected = selectedLocationId === loc.id;
            
            return (
              <motion.div
                key={loc.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ left: `${loc.x}%`, top: `${loc.y}%`, zIndex: isSelected ? 20 : 10 }}
                animate={{ 
                  opacity: isActive ? 1 : 0.3,
                  scale: isActive ? 1 : 0.8
                }}
              >
                {/* Node Button */}
                <button
                  onClick={() => {
                    if (!isDragging && isActive) {
                      setSelectedLocationId(loc.id);
                    }
                  }}
                  className={`relative group p-4 rounded-full transition-all duration-300 ${isActive ? 'cursor-pointer hover:scale-110' : 'cursor-not-allowed'}`}
                >
                  {/* Outer Glow */}
                  {isActive && (
                    <div className={`absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity bg-current ${loc.theme}`}></div>
                  )}
                  {/* Inner Core */}
                  <div className={`w-4 h-4 rounded-full border border-[#05070a] shadow-[0_0_15px_rgba(255,255,255,0.2)] ${isActive ? 'bg-primary' : 'bg-white/20'}`}></div>
                </button>
                
                {/* Location Label */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isActive ? (isSelected ? 1 : 0.7) : 0, y: 0 }}
                  className={`mt-2 text-xs md:text-sm font-bold tracking-[0.2em] uppercase whitespace-nowrap transition-colors ${isSelected ? loc.theme : 'text-white/60'}`}
                  style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
                >
                  {loc.name}
                </motion.div>
              </motion.div>
            );
          })}

        </div>
      </motion.div>

      {/* Cinematic Title Overlay (Top) */}
      <div className="absolute top-24 left-0 w-full z-20 pointer-events-none px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-serif text-white tracking-widest uppercase drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] mb-2">
          Aryavarta
        </h1>
        <p className="text-primary tracking-[0.3em] uppercase text-xs md:text-sm font-bold drop-shadow-md">
          A Living Map Through Time
        </p>
      </div>

      {/* Controls Overlay */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30">
        <button onClick={() => setScale(s => Math.min(s + 0.2, 3))} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
          +
        </button>
        <button onClick={() => setScale(s => Math.max(s - 0.2, 0.5))} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
          -
        </button>
        <button onClick={() => setScale(1)} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors text-xs uppercase tracking-widest">
          Rst
        </button>
      </div>

      {/* Temporal Slider */}
      <TemporalSlider 
        eras={mapEras} 
        activeEraId={activeEraId} 
        onEraChange={(id) => {
          setActiveEraId(id);
          setSelectedLocationId(null);
        }} 
      />

      {/* Location Modal */}
      <LocationModal 
        location={selectedLocation} 
        era={activeEra}
        presentCharacters={selectedPresence?.characters || []}
        presentEvents={selectedPresence?.events || []}
        onClose={() => setSelectedLocationId(null)} 
      />

      {/* Edge Gradients */}
      <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-black via-black/50 to-transparent pointer-events-none z-10"></div>
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10"></div>
      <div className="absolute left-0 h-full w-24 bg-gradient-to-r from-black via-black/50 to-transparent pointer-events-none z-10"></div>
      <div className="absolute right-0 h-full w-24 bg-gradient-to-l from-black via-black/50 to-transparent pointer-events-none z-10"></div>

    </section>
  );
}
