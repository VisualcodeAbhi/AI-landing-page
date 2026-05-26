import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import DashboardMockup from './DashboardMockup';

interface HeroProps {
  onGetStarted?: () => void;
}

const words = ['Creators', 'Developers', 'Businesses', 'Startups'];

const PARTICLE_POSITIONS = [
  { top: '12%', left: '15%', duration: 6, delay: 0.5 },
  { top: '35%', left: '85%', duration: 8, delay: 1.2 },
  { top: '75%', left: '25%', duration: 7, delay: 0.2 },
  { top: '55%', left: '70%', duration: 9, delay: 2.1 },
  { top: '22%', left: '45%', duration: 5, delay: 1.5 },
  { top: '88%', left: '60%', duration: 6, delay: 0.8 },
  { top: '48%', left: '10%', duration: 7, delay: 1.9 },
  { top: '80%', left: '90%', duration: 8, delay: 0.3 },
  { top: '15%', left: '78%', duration: 9, delay: 2.5 },
  { top: '65%', left: '38%', duration: 6, delay: 1.1 },
  { top: '92%', left: '12%', duration: 5, delay: 0.7 },
  { top: '30%', left: '52%', duration: 7, delay: 1.8 },
];

export default function Hero({ onGetStarted }: HeroProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleConfetti = () => {
    // Elegant futuristic cyan/purple confetti blast
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#6366f1', '#a855f7', '#ffffff']
    });
    if (onGetStarted) onGetStarted();
  };

  return (
    <section className="relative min-h-screen pt-32 pb-24 flex flex-col justify-center items-center overflow-hidden bg-grid-pattern bg-dot-pattern">
      {/* Absolute Ambient Glow Mesh */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-tr from-cyan-500/10 to-indigo-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-bl from-purple-500/10 to-pink-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Floating Particles (Staggered Dots) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {PARTICLE_POSITIONS.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
            style={{
              top: pos.top,
              left: pos.left,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: pos.delay,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center z-10">
        {/* Animated Glow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:border-cyan-500/30 transition-colors duration-300"
        >
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wider font-space text-slate-200">
            NEUROAI CORE V2.4 IS LIVE
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </motion.div>

        {/* Large Futuristic Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl md:text-7xl font-space font-bold leading-[1.1] max-w-4xl text-white"
        >
          Build Smarter with <br className="hidden md:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 text-glow-cyan">
            Neuro-Intelligence
          </span>
        </motion.h1>

        {/* Subheadline & Text Swapper */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl font-poppins font-normal leading-relaxed flex flex-col md:flex-row items-center justify-center gap-2"
        >
          <span>Next-generation AI platform for</span>
          <div className="h-8 overflow-hidden inline-flex items-center justify-center relative w-36 font-semibold text-cyan-400 font-space">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="absolute"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Cinematic CTA Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={handleConfetti}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 py-4 px-8 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 font-semibold text-white hover:opacity-95 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-0.5 group"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              const element = document.querySelector('#solutions');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 py-4 px-8 rounded-xl bg-slate-950/40 border border-white/10 hover:border-cyan-500/30 hover:bg-slate-950/80 font-semibold text-slate-200 transition-all duration-300 backdrop-blur-md transform hover:-translate-y-0.5"
          >
            <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
            Watch Demo
          </button>
        </motion.div>

        {/* Dashboard Mockup Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 w-full"
        >
          <DashboardMockup />
        </motion.div>
      </div>
    </section>
  );
}
