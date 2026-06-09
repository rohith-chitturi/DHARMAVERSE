"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

function randomSpherePoint(radius: number) {
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi) * Math.sin(theta);
  const z = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

const characters = [
  "Krishna", "Karna", "Arjuna", "Bhishma", "Draupadi", 
  "Yudhishthira", "Bheema", "Nakula", "Sahadeva", 
  "Duryodhana", "Shakuni", "Drona", "Ashwatthama",
  "Dhritarashtra", "Vidura", "Kunti", "Gandhari",
  "Abhimanyu", "Ghatotkacha", "Shikhandi"
];

function Constellation() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generate random points for the characters
  const points = useMemo(() => {
    return characters.map(() => randomSpherePoint(Math.random() * 6 + 6));
  }, []);

  // Generate lines connecting nodes to form a web (alliances/conflicts)
  const lines = useMemo(() => {
    const linesArr = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        // Randomly connect nodes based on distance to simulate a neural/constellation web
        if (points[i].distanceTo(points[j]) < 7) {
          if (Math.random() > 0.6) {
            linesArr.push([points[i], points[j]]);
          }
        }
      }
    }
    return linesArr;
  }, [points]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0005;
      groupRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Draw Nodes */}
      {points.map((pos, i) => (
        <Float key={`node-${i}`} speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <group position={pos}>
            {/* Core glowing star */}
            <mesh>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshBasicMaterial color="#D4AF37" />
            </mesh>
            {/* Outer aura */}
            <mesh>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshBasicMaterial color="#D4AF37" transparent opacity={0.2} />
            </mesh>
            {/* Character Name */}
            <Text
              position={[0, 0.4, 0]}
              fontSize={0.25}
              color="#FFFFFF"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor="#000000"
            >
              {characters[i]}
            </Text>
          </group>
        </Float>
      ))}

      {/* Draw Connecting Lines */}
      {lines.map((pair, i) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(pair);
        return (
          <line key={`line-${i}`} geometry={geometry}>
            <lineBasicMaterial color="#4F8CFF" transparent opacity={0.15} />
          </line>
        );
      })}
    </group>
  );
}

export default function LivingUniverse() {
  return (
    <section className="relative w-full h-[100svh] bg-[#080B12] overflow-hidden flex flex-col justify-center items-center cursor-move">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 18], fov: 60 }}>
          <ambientLight intensity={0.5} />
          {/* Deep space background stars */}
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Constellation />
          <OrbitControls 
            enableZoom={true} 
            enablePan={false} 
            autoRotate={true}
            autoRotateSpeed={0.5}
            maxDistance={30}
            minDistance={5}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="absolute top-16 left-0 w-full z-10 pointer-events-none px-4 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-widest uppercase drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] mb-4"
        >
          The <span className="text-gradient-gold">Living</span> Universe
        </motion.h2>
        <p className="text-muted tracking-[0.3em] uppercase text-sm md:text-lg font-bold drop-shadow-md bg-black/30 backdrop-blur-sm inline-block px-6 py-2 rounded-full border border-white/10">
          A Web of Destiny. Drag to Explore.
        </p>
      </div>
      
      {/* Seamless transition gradients */}
      <div className="absolute top-0 w-full h-40 bg-gradient-to-b from-black via-[#080B12]/80 to-transparent pointer-events-none z-10"></div>
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black via-[#080B12]/80 to-transparent pointer-events-none z-10"></div>
    </section>
  );
}
