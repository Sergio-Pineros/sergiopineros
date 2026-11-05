"use client";

import { Sun, Moon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface Particle {
  id: number;
  delay: number;
  duration: number;
}

export function CinematicThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");

  useEffect(() => {
    setMounted(true);
  }, []);

  const generateParticles = () => {
    const newParticles: Particle[] = [];
    const particleCount = 3;
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({ id: i, delay: i * 0.1, duration: 0.6 + i * 0.1 });
    }
    setParticles(newParticles);
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setParticles([]);
    }, 1000);
  };

  const handleToggle = () => {
    generateParticles();
    setTheme(isDark ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <div className="relative inline-block">
        <div className="relative flex h-[64px] w-[104px] items-center rounded-full bg-[#eceef2] p-1" />
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      <svg className="absolute h-0 w-0">
        <defs>
          <filter id="cinematic-grain-light">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
            <feColorMatrix in="noise" type="saturate" values="0" result="desaturatedNoise" />
            <feComponentTransfer in="desaturatedNoise" result="lightGrain">
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" in2="lightGrain" mode="overlay" />
          </filter>
          <filter id="cinematic-grain-dark">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
            <feColorMatrix in="noise" type="saturate" values="0" result="desaturatedNoise" />
            <feComponentTransfer in="desaturatedNoise" result="darkGrain">
              <feFuncA type="linear" slope="0.5" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" in2="darkGrain" mode="overlay" />
          </filter>
        </defs>
      </svg>

      <motion.button
        ref={toggleRef}
        onClick={handleToggle}
        className="relative flex h-[64px] w-[104px] items-center rounded-full p-[6px] transition-all duration-300 focus:outline-none"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at top left, #2a0134 0%, #1a0120 40%, #07000a 100%)"
            : "radial-gradient(ellipse at top left, #ffffff 0%, #eceef2 40%, #e4e6ec 100%)",
          boxShadow: isDark
            ? `
              inset 5px 5px 12px rgba(0, 0, 0, 0.9),
              inset -5px -5px 12px rgba(74, 45, 86, 0.4),
              inset 8px 8px 16px rgba(0, 0, 0, 0.7),
              inset -8px -8px 16px rgba(127, 104, 153, 0.2),
              inset 0 2px 4px rgba(0, 0, 0, 1),
              inset 0 -2px 4px rgba(74, 45, 86, 0.4),
              inset 0 0 20px rgba(0, 0, 0, 0.6),
              0 1px 1px rgba(185, 168, 208, 0.08),
              0 2px 4px rgba(0, 0, 0, 0.4),
              0 8px 16px rgba(0, 0, 0, 0.4),
              0 16px 32px rgba(0, 0, 0, 0.3),
              0 24px 48px rgba(0, 0, 0, 0.2)
            `
            : `
              inset 5px 5px 12px rgba(157, 134, 188, 0.35),
              inset -5px -5px 12px rgba(255, 255, 255, 1),
              inset 8px 8px 16px rgba(127, 104, 153, 0.2),
              inset -8px -8px 16px rgba(255, 255, 255, 0.9),
              inset 0 2px 4px rgba(157, 134, 188, 0.28),
              inset 0 -2px 4px rgba(255, 255, 255, 1),
              inset 0 0 20px rgba(236, 238, 242, 0.5),
              0 1px 2px rgba(255, 255, 255, 1),
              0 2px 4px rgba(42, 1, 52, 0.08),
              0 8px 16px rgba(42, 1, 52, 0.06),
              0 16px 32px rgba(42, 1, 52, 0.05),
              0 24px 48px rgba(42, 1, 52, 0.04)
            `,
          border: isDark ? "2px solid rgba(74, 45, 86, 0.7)" : "2px solid rgba(236, 238, 242, 0.9)",
          position: "relative",
        }}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        role="switch"
        aria-checked={isDark}
        whileTap={{ scale: 0.98 }}
      >
        <div
          className="pointer-events-none absolute inset-[3px] rounded-full"
          style={{
            boxShadow: isDark
              ? "inset 0 2px 6px rgba(0, 0, 0, 0.9), inset 0 -1px 3px rgba(74, 45, 86, 0.35)"
              : "inset 0 2px 6px rgba(157, 134, 188, 0.28), inset 0 -1px 3px rgba(255, 255, 255, 0.8)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background: isDark
              ? `radial-gradient(ellipse at top, rgba(185, 168, 208, 0.12) 0%, transparent 50%),
                linear-gradient(to bottom, rgba(74, 45, 86, 0.28) 0%, transparent 30%, transparent 70%, rgba(0, 0, 0, 0.3) 100%)`
              : `radial-gradient(ellipse at top, rgba(255, 255, 255, 0.8) 0%, transparent 50%),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.7) 0%, transparent 30%, transparent 70%, rgba(157, 134, 188, 0.12) 100%)`,
            mixBlendMode: "overlay",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            boxShadow: isDark
              ? "inset 0 0 15px rgba(0, 0, 0, 0.5)"
              : "inset 0 0 15px rgba(157, 134, 188, 0.16)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Sun size={20} color={isDark ? "#b9a8d0" : "#9d86bc"} />
          <Moon size={20} color={isDark ? "#b9a8d0" : "#7f6899"} />
        </div>

        <motion.div
          className="relative z-10 flex h-[44px] w-[44px] items-center justify-center overflow-hidden rounded-full"
          style={{
            background: isDark
              ? "linear-gradient(145deg, #4a2d56 0%, #2a0134 50%, #1a0120 100%)"
              : "linear-gradient(145deg, #ffffff 0%, #fefefe 50%, #eceef2 100%)",
            boxShadow: isDark
              ? `
                inset 2px 2px 4px rgba(185, 168, 208, 0.22),
                inset -2px -2px 4px rgba(0, 0, 0, 0.8),
                inset 0 1px 1px rgba(185, 168, 208, 0.18),
                0 1px 2px rgba(185, 168, 208, 0.08),
                0 8px 32px rgba(0, 0, 0, 0.6),
                0 4px 12px rgba(0, 0, 0, 0.5),
                0 2px 4px rgba(0, 0, 0, 0.4)
              `
              : `
                inset 2px 2px 4px rgba(236, 238, 242, 0.7),
                inset -2px -2px 4px rgba(255, 255, 255, 1),
                inset 0 1px 2px rgba(255, 255, 255, 1),
                0 1px 2px rgba(255, 255, 255, 1),
                0 8px 32px rgba(42, 1, 52, 0.12),
                0 4px 12px rgba(42, 1, 52, 0.08),
                0 2px 4px rgba(42, 1, 52, 0.06)
              `,
            border: isDark ? "2px solid rgba(185, 168, 208, 0.28)" : "2px solid rgba(255, 255, 255, 0.9)",
          }}
          animate={{ x: isDark ? 46 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, transparent 40%, rgba(0, 0, 0, 0.1) 100%)",
              mixBlendMode: "overlay",
            }}
          />
          {isAnimating &&
            particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: "10px",
                    height: "10px",
                    background: isDark
                      ? "radial-gradient(circle, rgba(185, 168, 208, 0.55) 0%, rgba(185, 168, 208, 0) 70%)"
                      : "radial-gradient(circle, rgba(157, 134, 188, 0.7) 0%, rgba(157, 134, 188, 0) 70%)",
                    mixBlendMode: "normal",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: isDark ? 6 : 8, opacity: [0, 1, 0] }}
                  transition={{
                    duration: isDark ? 0.5 : particle.duration,
                    delay: particle.delay,
                    ease: "easeOut",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full opacity-40"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                      mixBlendMode: "overlay",
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          <div className="relative z-10">
            {isDark ? <Moon size={20} color="#b9a8d0" /> : <Sun size={20} color="#9d86bc" />}
          </div>
        </motion.div>
      </motion.button>
    </div>
  );
}
