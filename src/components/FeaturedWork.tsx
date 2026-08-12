import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Code2, ArrowRight, Play, Disc } from 'lucide-react';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { TiltCard } from './common/TiltCard';

interface FeaturedWorkProps {
  onSelectProject: (project: Project) => void;
  onOpenMusicModal: () => void;
}

export const FeaturedWork: React.FC<FeaturedWorkProps> = ({
  onSelectProject,
  onOpenMusicModal,
}) => {
  const webAppProject = FEATURED_PROJECTS.find((p) => p.id === 'alivehub');
  const pythonProject = FEATURED_PROJECTS.find((p) => p.id === 'student-management-system');
  const quietRoomProject = FEATURED_PROJECTS.find((p) => p.id === 'quiet-room');

  return (
    <section id="projects" className="py-28 px-6 sm:px-12 bg-[#E8E2D5]/90 backdrop-blur-[2px] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="border-b border-[#1A1A1A]/10 pb-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <span className="text-[10px] uppercase tracking-widest font-bold opacity-40 text-[#1A1A1A] block mb-1">
              Selected Engineering &amp; Audio Works
            </span>
            <h2 className="font-headline text-3xl md:text-5xl text-[#1A1A1A] font-light tracking-tight">
              Featured Work
            </h2>
          </div>
          <p className="text-xs text-[#1A1A1A] opacity-50 font-light max-w-md">
            Interactive exploration of software architectures and sonic expressions built with precision.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* 1. AliveHub Card */}
          {webAppProject && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="h-full"
            >
              <TiltCard maxTilt={10} scale={1.02} className="rounded-2xl h-full">
                <div className="bg-white p-8 md:p-10 rounded-2xl border border-[#1A1A1A]/10 shadow-sm flex flex-col justify-between h-full group hover:border-[#1A1A1A]/30 transition-all duration-300 transform-style-3d">
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-[10px] uppercase font-bold tracking-widest opacity-40 text-[#1A1A1A]">
                        {webAppProject.category}
                      </span>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm animate-pulse" />
                    </div>

                    <h3 className="font-headline text-2xl md:text-3xl font-medium text-[#1A1A1A] mb-3 group-hover:translate-x-1 transition-transform duration-300">
                      {webAppProject.title}
                    </h3>

                    <p className="font-body text-sm text-[#1A1A1A] opacity-70 leading-relaxed mb-8 font-light">
                      {webAppProject.description}
                    </p>

                    <div className="flex flex-wrap gap-2 text-[10px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-8">
                      {webAppProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-[#F5F2ED] border border-[#1A1A1A]/10 rounded-md transition-transform duration-200 group-hover:scale-105"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-6 border-t border-[#1A1A1A]/5">
                    <button
                      onClick={() => onSelectProject(webAppProject)}
                      className="flex-1 py-3 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-widest font-bold rounded-lg hover:bg-[#333] transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={13} />
                    </button>

                    <button
                      onClick={() => onSelectProject(webAppProject)}
                      className="px-5 py-3 border border-[#1A1A1A]/10 text-[#1A1A1A] text-[10px] uppercase tracking-widest font-bold rounded-lg hover:bg-[#1A1A1A]/5 transition-all duration-300 inline-flex items-center justify-center gap-2"
                    >
                      <span>GitHub</span>
                      <Code2 size={13} />
                    </button>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          )}

          {/* 2. Student Management System Card */}
          {pythonProject && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="h-full"
            >
              <TiltCard maxTilt={10} scale={1.02} className="rounded-2xl h-full">
                <div className="bg-white p-8 md:p-10 rounded-2xl border border-[#1A1A1A]/10 shadow-sm flex flex-col justify-between h-full group hover:border-[#1A1A1A]/30 transition-all duration-300 transform-style-3d">
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-[10px] uppercase font-bold tracking-widest opacity-40 text-[#1A1A1A]">
                        {pythonProject.category}
                      </span>
                      <div className="w-2.5 h-2.5 rounded-full bg-sky-500 shadow-sm" />
                    </div>

                    <h3 className="font-headline text-2xl md:text-3xl font-medium text-[#1A1A1A] mb-3 group-hover:translate-x-1 transition-transform duration-300">
                      {pythonProject.title}
                    </h3>

                    <p className="font-body text-sm text-[#1A1A1A] opacity-70 leading-relaxed mb-8 font-light">
                      {pythonProject.description}
                    </p>

                    <div className="flex flex-wrap gap-2 text-[10px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-8">
                      {pythonProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-[#F5F2ED] border border-[#1A1A1A]/10 rounded-md transition-transform duration-200 group-hover:scale-105"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-6 border-t border-[#1A1A1A]/5">
                    <button
                      onClick={() => onSelectProject(pythonProject)}
                      className="w-full py-3 border border-[#1A1A1A]/10 text-[#1A1A1A] text-[10px] uppercase tracking-widest font-bold rounded-lg hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 inline-flex items-center justify-center gap-2 group-hover:shadow-sm"
                    >
                      <span>GitHub</span>
                      <Code2 size={13} />
                    </button>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          )}

          {/* 3. QUIET ROOM Music Card (Darker Cinematic Treatment) */}
          {quietRoomProject && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="md:col-span-2"
            >
              <TiltCard maxTilt={6} scale={1.01} className="rounded-2xl">
                <div className="bg-[#1A1A1A] text-white p-8 md:p-10 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between border border-white/10 gap-8 shadow-2xl relative overflow-hidden group transform-style-3d">
                  {/* Subtle ambient light aura */}
                  <div className="absolute -right-20 -top-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/20 transition-all duration-700" />

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
                    <div className="relative w-24 h-24 bg-white/10 rounded-xl overflow-hidden shrink-0 border border-white/15 shadow-lg group-hover:scale-105 transition-transform duration-500">
                      <img
                        src={quietRoomProject.imageUrl}
                        alt={quietRoomProject.title}
                        className="w-full h-full object-cover opacity-80"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                        <Play size={24} className="fill-white text-white translate-x-0.5" />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-amber-300/80 mb-2">
                        <Disc size={12} className="animate-spin-slow" />
                        <span>Artist: ANTSHAIL</span>
                      </div>
                      <h3 className="font-headline text-3xl md:text-4xl font-light tracking-wide text-white mb-2">
                        {quietRoomProject.title}
                      </h3>
                      <p className="text-sm text-white/70 max-w-xl font-light leading-relaxed">
                        {quietRoomProject.description}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={onOpenMusicModal}
                    className="w-full md:w-auto px-8 py-4 bg-white text-[#1A1A1A] text-[11px] uppercase tracking-[0.2em] font-bold rounded-xl hover:bg-amber-100 transition-all duration-300 shrink-0 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-100 relative z-10"
                  >
                    Listen
                  </button>
                </div>
              </TiltCard>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
