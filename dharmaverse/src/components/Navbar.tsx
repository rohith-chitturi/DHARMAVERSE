"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Settings2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useSettings } from "@/context/SettingsContext";
import SettingsModal from "@/components/SettingsModal";

const navLinksKeyMapping = [
  { key: "nav.home", href: "/" },
  { key: "nav.discover", href: "/discover" },
  { key: "nav.characters", href: "/characters" },
  { key: "nav.moments", href: "/moments" },
  { key: "nav.perspectives", href: "/perspectives" },
  { key: "nav.universe", href: "/universe" },
  { key: "nav.dharmaMirror", href: "/dharma-mirror" },
  { key: "nav.epicJourney", href: "/epic" },
  { key: "nav.about", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { t } = useSettings();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-[#080B12]/80 backdrop-blur-lg border-b border-white/5 py-4" : "bg-gradient-to-b from-black/80 to-transparent py-6"
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-4 sm:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="relative z-50 group flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-primary/50 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all">
            <div className="w-4 h-4 rounded-full border-2 border-primary border-dashed animate-[spin_10s_linear_infinite]"></div>
          </div>
          <span className="text-xl font-black text-white tracking-widest uppercase drop-shadow-md">
            Dharma<span className="text-gradient-gold">verse</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinksKeyMapping.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.key}
                href={link.href}
                className={`text-sm tracking-widest uppercase transition-colors duration-300 relative group ${
                  isActive ? "text-primary font-bold" : "text-muted hover:text-white"
                }`}
              >
                {t(link.key)}
                {isActive && (
                  <motion.div 
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-primary rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                  />
                )}
                <div className="absolute -bottom-2 left-0 w-0 h-[2px] bg-white/50 transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
              </Link>
            );
          })}
          
          <button 
            onClick={() => setSettingsOpen(true)}
            className="p-2 text-white/50 hover:text-white bg-white/5 rounded-full hover:bg-white/10 transition-colors ml-4"
          >
            <Settings2 className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden relative z-50 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-0 left-0 right-0 h-screen bg-[#080B12]/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8"
            >
              {navLinksKeyMapping.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-bold tracking-widest uppercase transition-colors ${
                    pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                      ? "text-primary"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {t(link.key)}
                </Link>
              ))}
              <button 
                onClick={() => { setSettingsOpen(true); setMobileMenuOpen(false); }}
                className="mt-8 px-8 py-3 rounded-full border border-primary text-primary tracking-widest uppercase font-bold"
              >
                <Settings2 className="w-5 h-5 inline-block mr-2 -mt-1" /> {t("settings.title")}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
      
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </nav>
  );
}
