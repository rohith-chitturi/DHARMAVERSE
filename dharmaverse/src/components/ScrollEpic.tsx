"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const storyEvents = [
  {
    id: "birth",
    title: "The River's Secret",
    description: "A warrior born to the Sun, abandoned to the river.",
    image: "/assets/karna_hero.png",
    objectPosition: "object-[center_20%]"
  },
  {
    id: "tournament",
    title: "The Royal Tournament",
    description: "A lowborn challenges the greatest prince.",
    image: "/assets/arjuna_hero.png",
    objectPosition: "object-[center_20%]"
  },
  {
    id: "dice-game",
    title: "The Dice Game",
    description: "A kingdom lost. A vow made.",
    image: "/assets/dice_game.png",
    objectPosition: "object-[center_20%]"
  },
  {
    id: "kurukshetra",
    title: "Kurukshetra",
    description: "The battlefield where brother slays brother.",
    image: "/assets/bhishma_hero.png",
    objectPosition: "object-bottom"
  },
  {
    id: "final",
    title: "The Final Truth",
    description: "Victory without triumph. Defeat without surrender.",
    image: "/assets/krishna_hero.png",
    objectPosition: "object-[center_20%]"
  }
];

export default function ScrollEpic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".story-panel");
      
      // Pin the container and scroll horizontally or just fade through
      // Let's do a crossfade sticky effect
      panels.forEach((panel: any, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
        });

        // Fade in the text
        if (textRefs.current[i]) {
          gsap.fromTo(
            textRefs.current[i],
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              scrollTrigger: {
                trigger: panel,
                start: "top center",
                end: "center center",
                scrub: 1,
              }
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-black">
      {storyEvents.map((event, i) => (
        <div 
          key={event.id}
          className="story-panel relative w-full h-[100svh] flex items-center justify-center overflow-hidden"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={event.image}
              alt={event.title}
              fill
              sizes="100vw"
              className={`object-cover opacity-60 ${event.objectPosition}`}
              priority={i === 0}
            />
          </div>

          {/* Heavy Vignette / Overlay */}
          <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#080B12_100%)] opacity-80"></div>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#080B12] via-transparent to-[#080B12] opacity-90"></div>

          {/* Text Content */}
          <div 
            ref={el => { textRefs.current[i] = el; }}
            className="relative z-20 text-center px-4 max-w-5xl mx-auto"
          >
            <p className="text-primary text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-bold">
              Chapter 0{i + 1}
            </p>
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-widest drop-shadow-2xl mb-6">
              {event.title}
            </h2>
            <p className="text-2xl md:text-4xl font-light text-muted tracking-wide max-w-3xl mx-auto">
              {event.description}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
