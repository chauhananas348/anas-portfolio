import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Headphones, CheckCircle2, Music, Sparkles, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { TiltCard } from './common/TiltCard';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-28 px-6 sm:px-12 bg-[#EFEAE1]/95 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 space-y-20">
        {/* Top Profile & Bio Split matching Reference Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Avatar with Gold Aura Halo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex justify-center lg:justify-start"
          >
            <div className="relative group cursor-pointer">
              {/* Glowing Warm Gold Aura Ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#C5A059]/30 via-[#D4AF37]/20 to-[#5C614D]/30 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />

              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border-2 border-[#1C1B1A]/10 shadow-2xl">
                <img
                  src={PERSONAL_INFO.avatarUrl}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Floating Moniker Pill */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#1C1B1A] text-white px-4 py-1.5 rounded-full border border-white/20 shadow-lg flex items-center space-x-2 text-[10px] font-mono font-bold tracking-widest uppercase">
                <Music size={12} className="text-[#C5A059]" />
                <span>{PERSONAL_INFO.moniker}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Editorial Story Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] font-bold text-[#1C1B1A] opacity-50">
              <Sparkles size={12} className="text-[#C5A059]" />
              <span>ABOUT ME</span>
            </div>

            <h2 className="font-headline text-3xl sm:text-5xl font-light text-[#1C1B1A] tracking-tight leading-tight">
              I'm{' '}
              <span className="font-serif italic font-normal text-[#C5A059]">Anas Chauhan</span>,
            </h2>

            <p className="font-body text-base sm:text-lg text-[#1C1B1A] opacity-80 leading-relaxed font-light">
              an IT Engineering student at <span className="font-semibold text-[#1C1B1A]">{PERSONAL_INFO.college}</span> who loves turning complex technical challenges into intuitive digital experiences. I build full-stack web software to learn, solve real-world problems, and constantly grow. Music is where I express what words can't.
            </p>

            <a
              href="#skills"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-white border border-[#1C1B1A]/10 text-[#1C1B1A] rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xs hover:bg-[#1C1B1A] hover:text-white transition-all duration-300"
            >
              <span>Explore Technical Arsenal</span>
              <ArrowRight size={13} />
            </a>
          </motion.div>
        </div>

        {/* Section Header for Duality Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="border-b border-[#1C1B1A]/10 pb-4"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40 text-[#1C1B1A] block mb-1">
            Core Dual Identity
          </span>
          <h3 className="font-headline text-2xl sm:text-4xl text-[#1C1B1A] font-light tracking-tight">
            Duality of Craft
          </h3>
        </motion.div>

        {/* Two-Column Premium Duality Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* Tech Side */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <TiltCard maxTilt={6} className="rounded-[28px] h-full">
              <div className="relative overflow-hidden rounded-[28px] border border-[#1C1B1A]/10 bg-[#FBF9F4] p-7 md:p-9 shadow-[0_20px_60px_rgba(28,27,26,0.07)] flex flex-col justify-between h-full group transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_75px_rgba(28,27,26,0.12)] transform-style-3d">

                {/* Decorative depth */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#C5A059]/10 blur-3xl transition-all duration-700 group-hover:bg-[#C5A059]/20" />
                <div className="pointer-events-none absolute right-7 top-7 font-serif text-[92px] leading-none text-[#1C1B1A]/[0.025] select-none">
                  {'</>'}
                </div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 bg-[#1C1B1A] text-[#C5A059] rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                      <Terminal size={25} strokeWidth={1.8} />
                    </div>

                    <span className="rounded-full border border-[#1C1B1A]/10 bg-white/60 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#1C1B1A]/45">
                      01 / CODE
                    </span>
                  </div>

                  <div className="mt-8">
                    <span className="text-[10px] uppercase font-bold tracking-[0.22em] text-[#A17F35] block mb-2">
                      Engineering &amp; Code
                    </span>

                    <h4 className="font-headline text-3xl md:text-4xl font-medium text-[#1C1B1A] tracking-tight">
                      The Tech Side
                    </h4>

                    <p className="font-body text-sm sm:text-[15px] text-[#1C1B1A]/65 leading-7 mt-5 font-light">
                      As an IT student, I enjoy turning ideas into practical digital experiences through clean architecture, efficient logic, and thoughtful web development.
                    </p>
                  </div>

                  <div className="my-7 h-px w-full bg-gradient-to-r from-[#1C1B1A]/15 via-[#1C1B1A]/5 to-transparent" />

                  <ul className="space-y-3.5 font-body text-xs sm:text-sm text-[#1C1B1A]/80">
                    {[
                      'Full-Stack Web Development',
                      'Software Systems Architecture',
                      'Clean Code & Optimization',
                    ].map((item, index) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10 text-[9px] font-bold text-[#A17F35]">
                          0{index + 1}
                        </span>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-10 mt-8 flex items-center justify-between border-t border-[#1C1B1A]/10 pt-5">
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#1C1B1A]/35">
                    Building with intention
                  </span>
                  <span className="h-2 w-2 rounded-full bg-[#C5A059] shadow-[0_0_12px_rgba(197,160,89,0.45)]" />
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Sound Side */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <TiltCard maxTilt={6} className="rounded-[28px] h-full">
              <div className="relative overflow-hidden rounded-[28px] border border-[#1C1B1A]/10 bg-[#E8E9DC] p-7 md:p-9 shadow-[0_20px_60px_rgba(28,27,26,0.07)] flex flex-col justify-between h-full group transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_75px_rgba(28,27,26,0.12)] transform-style-3d">

                {/* Decorative waveform */}
                <div className="pointer-events-none absolute right-7 top-8 flex items-end gap-1 opacity-[0.10] transition-all duration-700 group-hover:opacity-[0.18]">
                  {[18, 30, 45, 26, 55, 35, 22, 42, 28, 50].map((height, index) => (
                    <span
                      key={index}
                      className="w-1 rounded-full bg-[#1C1B1A] transition-transform duration-500 group-hover:scale-y-110"
                      style={{ height: `${height}px` }}
                    />
                  ))}
                </div>

                <div className="pointer-events-none absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-[#6F7555]/15 blur-3xl transition-all duration-700 group-hover:bg-[#6F7555]/25" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 bg-[#6F7555] text-[#F8F5ED] rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
                      <Headphones size={25} strokeWidth={1.8} />
                    </div>

                    <span className="rounded-full border border-[#1C1B1A]/10 bg-white/50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#1C1B1A]/45">
                      02 / SOUND
                    </span>
                  </div>

                  <div className="mt-8">
                    <span className="text-[10px] uppercase font-bold tracking-[0.22em] text-[#6F7555] block mb-2">
                      Music &amp; Audio Architecture
                    </span>

                    <h4 className="font-headline text-3xl md:text-4xl font-medium text-[#1C1B1A] tracking-tight">
                      The Sound Side
                    </h4>

                    <p className="font-body text-sm sm:text-[15px] text-[#1C1B1A]/65 leading-7 mt-5 font-light">
                      Under the moniker <span className="font-semibold text-[#1C1B1A]">ANTSHAIL</span>, I explore music as another form of expression — shaping atmosphere, emotion, and sound through production and design.
                    </p>
                  </div>

                  <div className="my-7 h-px w-full bg-gradient-to-r from-[#1C1B1A]/15 via-[#1C1B1A]/5 to-transparent" />

                  <ul className="space-y-3.5 font-body text-xs sm:text-sm text-[#1C1B1A]/80">
                    {[
                      'Music Production',
                      'Audio Engineering & Mixing',
                      'Sound Design & Atmospheric Synthesis',
                    ].map((item, index) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#6F7555]/40 bg-[#6F7555]/10 text-[9px] font-bold text-[#6F7555]">
                          0{index + 1}
                        </span>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-10 mt-8 flex items-center justify-between border-t border-[#1C1B1A]/10 pt-5">
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#1C1B1A]/35">
                    Creating with emotion
                  </span>

                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#6F7555]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#6F7555]/60" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#6F7555]/30" />
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
        </div>
    </section>
  );
};