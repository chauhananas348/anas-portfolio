import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Terminal, Layers } from 'lucide-react';
import { TECHNICAL_ARSENAL } from '../data/portfolioData';
import { TiltCard } from './common/TiltCard';

export const Arsenal: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 22,
        stiffness: 120,
      },
    },
  };

  return (
    <section id="skills" className="py-28 px-6 sm:px-12 bg-[#1C1E17] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] font-bold text-[#C5A059] mb-1">
              <Cpu size={12} />
              <span>CORE STACK &amp; TOOLS</span>
            </div>
            <h2 className="font-headline text-3xl sm:text-5xl font-light text-white tracking-tight">
              Technical Arsenal
            </h2>
          </div>
          <p className="text-xs text-white/60 font-mono tracking-wider max-w-xs">
            Python, HTML, CSS, JavaScript, SQL, Git, GitHub, Vercel
          </p>
        </motion.div>

        {/* Sequential Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {TECHNICAL_ARSENAL.map((skill) => (
            <motion.div key={skill.name} variants={badgeVariants}>
              <TiltCard maxTilt={10} scale={1.03} glow={true} className="h-full rounded-xl">
                <div className="bg-[#24271E] p-6 rounded-xl border border-white/10 shadow-lg flex flex-col justify-between h-full group hover:border-[#C5A059]/50 hover:bg-[#2A2E23] transition-all duration-300 transform-style-3d">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-white/10 border border-white/10 rounded-md text-xs font-bold text-[#D4AF37] tracking-wider group-hover:bg-[#C5A059] group-hover:text-[#1C1E17] transition-colors duration-300">
                        {skill.name}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#C5A059]/40 group-hover:bg-[#C5A059] transition-colors" />
                    </div>
                    <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 mb-2">
                      {skill.category}
                    </div>
                  </div>
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

