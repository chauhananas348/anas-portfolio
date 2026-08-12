import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 bg-[#F5F2ED] border-t border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A]">
        {/* Copyright */}
        <div className="opacity-40">&copy; 2024 Anas Chauhan</div>

        {/* Links */}
        <div className="flex flex-wrap justify-center items-center gap-6">
          <a
            href={PERSONAL_INFO.socialLinks.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-40 transition-opacity"
          >
            LinkedIn
          </a>
          <a
            href={PERSONAL_INFO.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-40 transition-opacity"
          >
            GitHub
          </a>
          <a
            href={PERSONAL_INFO.socialLinks.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-40 transition-opacity"
          >
            Spotify
          </a>
          <a
            href={PERSONAL_INFO.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-40 transition-opacity"
          >
            Instagram
          </a>
        </div>

        {/* Location / Meta */}
        <div className="opacity-40">Mumbai, India &bull; IT Engineering &amp; Music</div>
      </div>
    </footer>
  );
};
