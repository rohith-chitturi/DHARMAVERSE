"use client";

import { motion } from "framer-motion";
import { ExploredNode } from "@/lib/intelligence/NarrativeContext";
import { characters, moments } from "@/data/lore";
import { useState } from "react";
import { ArrowRight, Activity, Eye, Zap, ShieldAlert } from "lucide-react";
import Link from "next/link";

interface DharmaConstellationProps {
  nodes: ExploredNode[];
}

export default function DharmaConstellation({ nodes }: DharmaConstellationProps) {
  const [selectedNode, setSelectedNode] = useState<ExploredNode | null>(null);

  // Layout logic: Randomly distribute nodes around a center, but keeping characters and events somewhat grouped
  // In a real app, this might use D3 force directed graph, but for cinematic effect we'll use a fixed but stylized scatter
  
  const mappedNodes = nodes.map((node, i) => {
    // Generate pseudo-random deterministic positions based on ID
    const angle = (i * 137.5) * (Math.PI / 180);
    const radius = 50 + (i * 10);
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    return { ...node, x, y };
  });

  const getEntityName = (node: ExploredNode) => {
    if (node.type === 'character') return characters.find(c => c.id === node.id)?.name || node.id;
    if (node.type === 'event') return moments.find(m => m.id === node.id)?.title || node.id;
    return node.id;
  };

  const getIconForDepth = (depth: string) => {
    switch (depth) {
      case 'VIEWED': return <Eye className="w-3 h-3 text-white/40" />;
      case 'INTERACTED': return <Activity className="w-3 h-3 text-primary/70" />;
      case 'COMPLETED': return <ShieldAlert className="w-3 h-3 text-amber-500" />;
      case 'DEEP_EXPERIENCE': return <Zap className="w-3 h-3 text-primary" />;
      default: return <Eye className="w-3 h-3 text-white/40" />;
    }
  };

  return (
    <div className="relative w-full h-[600px] bg-black/40 border border-white/5 rounded-3xl overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-black to-black opacity-50"></div>
      
      {/* Network Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
        <g transform="translate(50%, 50%)">
          {mappedNodes.map((n1, i) => 
            mappedNodes.slice(i+1, i+3).map((n2, j) => (
              <line 
                key={`${n1.id}-${n2.id}`}
                x1={`${n1.x}%`} y1={`${n1.y}%`}
                x2={`${n2.x}%`} y2={`${n2.y}%`}
                stroke="white"
                strokeWidth="1"
                className="opacity-20"
              />
            ))
          )}
        </g>
      </svg>

      {/* Nodes */}
      <div className="relative w-full h-full" style={{ transform: 'translate(50%, 50%)' }}>
        {mappedNodes.map((node) => {
          const isDeep = node.depth === 'DEEP_EXPERIENCE' || node.depth === 'COMPLETED';
          const isSelected = selectedNode?.id === node.id;
          
          return (
            <motion.div
              key={node.id}
              className="absolute"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: Math.random() * 0.5 }}
            >
              <button
                onClick={() => setSelectedNode(node)}
                className={`relative -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 ${isSelected ? 'z-50 scale-125' : 'z-10 hover:scale-110 hover:z-40'}`}
              >
                {/* Visual Distinction for FAINT vs DEEP nodes */}
                <div className={`rounded-full flex items-center justify-center transition-all ${
                  isDeep 
                    ? 'w-12 h-12 bg-primary/20 border-2 border-primary shadow-[0_0_20px_rgba(212,175,55,0.4)] animate-pulse' 
                    : 'w-8 h-8 bg-white/5 border border-white/20'
                } ${isSelected ? 'ring-4 ring-primary/30 ring-offset-4 ring-offset-black' : ''}`}>
                  {getIconForDepth(node.depth)}
                </div>
                
                {/* Node Label */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max text-center pointer-events-none">
                  <p className={`text-[10px] uppercase tracking-widest font-bold ${isDeep ? 'text-primary' : 'text-white/50'}`}>
                    {getEntityName(node)}
                  </p>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Info Panel for Selected Node */}
      {selectedNode && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-8 right-8 w-80 bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 z-50"
        >
          <h3 className="text-xl font-serif uppercase tracking-widest text-white mb-1">
            {getEntityName(selectedNode)}
          </h3>
          <p className="text-[10px] text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            {getIconForDepth(selectedNode.depth)} {selectedNode.depth.replace('_', ' ')}
          </p>
          
          <div className="space-y-4 mb-8">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Type</p>
              <p className="text-sm font-light text-white capitalize">{selectedNode.type}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Interactions</p>
              <p className="text-sm font-light text-white">{selectedNode.count} encounters</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Last Explored</p>
              <p className="text-sm font-light text-white">{new Date(selectedNode.lastExplored).toLocaleDateString()}</p>
            </div>
          </div>

          <Link 
            href={selectedNode.type === 'character' ? `/universe/${selectedNode.id}` : `/experience/${selectedNode.id}`}
            className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors group"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-white">Continue Journey</span>
            <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      )}
    </div>
  );
}
