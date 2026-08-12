import React, { useState } from 'react';
import { X, ExternalLink, Code2, Check, Copy } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(project.liveDemoUrl || project.githubUrl || '');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#F5F2ED] rounded-2xl max-w-2xl w-full border border-[#1A1A1A]/10 shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#1A1A1A]/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A] opacity-50 block mb-0.5">
              {project.category}
            </span>
            <h3 className="font-headline text-2xl font-medium text-[#1A1A1A]">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#1A1A1A] opacity-60 hover:opacity-100 hover:bg-[#1A1A1A]/5 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#F5F2ED]">
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A] opacity-40 mb-2">Overview</h4>
            <p className="font-body text-sm text-[#1A1A1A] opacity-70 leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A] opacity-40 mb-3">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-white border border-[#1A1A1A]/10 text-[#1A1A1A] text-[11px] font-semibold rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Special Feature Preview */}
          {project.id === 'alivehub' && (
            <div className="bg-[#1A1A1A] text-white p-6 rounded-xl space-y-3 font-mono text-xs border border-white/10">
              <div className="flex items-center justify-between text-emerald-400 border-b border-white/10 pb-2">
                <span>AliveHub Web Platform Preview</span>
                <span>STATUS: ONLINE</span>
              </div>
              <p className="text-gray-300 font-light">
                Responsive web architecture with optimized UI modules, custom CSS variables, and serverless deployment on Vercel.
              </p>
              <div className="pt-2 text-gray-400">
                &gt; git clone https://github.com/anaschauhan/alivehub.git
                <br />
                &gt; npm install &amp;&amp; vercel deploy
              </div>
            </div>
          )}

          {project.id === 'student-management-system' && (
            <div className="bg-[#1A1A1A] text-white p-6 rounded-xl space-y-3 font-mono text-xs border border-white/10">
              <div className="flex items-center justify-between text-sky-400 border-b border-white/10 pb-2">
                <span>Student Management System (Python CRUD)</span>
                <span>STATUS: READY</span>
              </div>
              <p className="text-gray-300 font-light">
                Features student registration, record updates, search algorithms, attendance logging, and JSON database serialization.
              </p>
              <div className="pt-2 text-gray-400">
                &gt; python main.py
                <br />
                [1] Add Student  [2] View Records  [3] Update Grade  [4] Delete
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-white border-t border-[#1A1A1A]/10 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={handleCopy}
            className="inline-flex items-center space-x-2 text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A] opacity-60 hover:opacity-100 transition-opacity"
          >
            {copiedLink ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            <span>{copiedLink ? 'Copied Link!' : 'Copy Repository Link'}</span>
          </button>

          <div className="flex items-center space-x-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white text-[#1A1A1A] border border-[#1A1A1A]/10 rounded-lg text-[10px] uppercase tracking-widest font-bold hover:bg-[#F5F2ED] transition-colors inline-flex items-center space-x-2"
              >
                <span>GitHub Repository</span>
                <Code2 size={14} />
              </a>
            )}

            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#1A1A1A] text-white rounded-lg text-[10px] uppercase tracking-widest font-bold hover:bg-[#333] transition-colors inline-flex items-center space-x-2"
              >
                <span>Live Demo</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
