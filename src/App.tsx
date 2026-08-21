import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Arsenal } from './components/Arsenal';
import { FeaturedWork } from './components/FeaturedWork';
import { MusicSection } from './components/MusicSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { MusicPlayerModal } from './components/MusicPlayerModal';
import { CodeSoundCoreCanvas } from './components/3d/CodeSoundCoreCanvas';
import { Project } from './types';
import SectionRail from './components/SectionRail';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [musicModalOpen, setMusicModalOpen] = useState(false);

  // ScrollSpy for the top navigation
  useEffect(() => {
    const sections = [
      'home',
      'about',
      'skills',
      'projects',
      'music',
      'contact',
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);

      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#1C1B1A] font-body selection:bg-[#1C1B1A] selection:text-white flex flex-col antialiased relative">

      {/* Signature 3D Interactive "Code × Sound Core" Background */}
      <CodeSoundCoreCanvas />

      {/* Top Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Left Section Navigation Rail */}
      <SectionRail />

      {/* Main Content Sections */}
      <main className="relative z-10 flex-1">

        {/* Hero Section */}
        <Hero
          onOpenMusicModal={() => setMusicModalOpen(true)}
        />

        {/* About Section */}
        <About />

        {/* Technical Arsenal Section */}
        <Arsenal />

        {/* Featured Work Section */}
        <FeaturedWork
          onSelectProject={(proj) => setSelectedProject(proj)}
          onOpenMusicModal={() => setMusicModalOpen(true)}
        />

        {/* Music Section */}
        <MusicSection />

        {/* Contact Section */}
        <ContactSection />

      </main>

      {/* Footer */}
      <Footer />

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Interactive Music Player Modal */}
      <MusicPlayerModal
        isOpen={musicModalOpen}
        onClose={() => setMusicModalOpen(false)}
      />

    </div>
  );
}