import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Headphones, ArrowDown, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenMusicModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenMusicModal }) => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16 px-6 sm:px-12 md:px-16 overflow-hidden bg-[#F4EFE6]/90"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Editorial Content Area */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          {/* Badge Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md border border-[#1A1A1A]/10 px-4 py-1.5 rounded-full shadow-2xs"
          >
            <Sparkles size={12} className="text-[#C5A059] animate-pulse" />
            <span className="text-[10px] uppercase text-[#1A1A1A] font-bold tracking-[0.2em]">
              IT Engineering Student &amp; Music Producer
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-headline text-4xl sm:text-6xl lg:text-7xl font-light text-[#1A1A1A] leading-[1.06] tracking-tight max-w-2xl"
          >
            Crafting Code by{' '}
            <span className="font-serif italic font-normal text-[#C5A059]">Day</span>,
            <br />
            Creating Sounds by{' '}
            <span className="font-serif italic font-normal text-[#5C614D]">Night</span>.
          </motion.h1>

          {/* Bio Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-base sm:text-lg text-[#1A1A1A] opacity-75 max-w-xl font-light leading-relaxed"
          >
            I build digital solutions that solve real-world problems and create music that speaks emotions under the moniker <span className="font-semibold text-[#1A1A1A] opacity-100">{PERSONAL_INFO.moniker}</span>.
          </motion.p>

          {/* Action CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="#projects"
              className="px-7 py-3.5 bg-[#1C1B1A] text-white text-[11px] uppercase tracking-[0.18em] font-bold rounded-lg hover:bg-[#33322E] transition-all duration-300 inline-flex items-center gap-2.5 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>View My Work</span>
              <ExternalLink size={14} />
            </a>

            <button
              onClick={onOpenMusicModal}
              className="px-7 py-3.5 bg-white text-[#1C1B1A] text-[11px] uppercase tracking-[0.18em] font-bold rounded-lg border border-[#1C1B1A]/12 hover:bg-[#1C1B1A]/5 transition-all duration-300 inline-flex items-center gap-2.5 shadow-2xs hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Listen on Spotify</span>
              <Headphones size={15} className="text-[#C5A059]" />
            </button>
          </motion.div>
        </div>

        {/* Right side is intentionally open for 3D Code × Sound Core visibility! */}
        <div className="hidden lg:block lg:col-span-5 h-[480px] pointer-events-none" />
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-6 sm:left-12 flex items-center space-x-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#1A1A1A] opacity-50"
      >
        <div className="w-6 h-10 border border-[#1A1A1A]/30 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 bg-[#1A1A1A] rounded-full"
          />
        </div>
        <span>SCROLL TO EXPLORE 3D CORE</span>
      </motion.div>
    </section>
  );
};

