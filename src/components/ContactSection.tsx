import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, Copy, Check, MapPin, ExternalLink, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { TiltCard } from './common/TiltCard';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  const socialVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
      },
    }),
  };

  return (
    <section id="contact" className="py-28 px-6 sm:px-12 bg-[#F4EFE6]/90 backdrop-blur-[2px] relative overflow-hidden">
      {/* Ambient Depth Background Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-stone-400/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - Slow Cinematic Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          className="border-b border-[#1A1A1A]/10 pb-6 mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <span className="text-[10px] uppercase tracking-widest font-bold opacity-40 text-[#1A1A1A] block mb-1">
              Get In Touch
            </span>
            <h2 className="font-headline text-3xl md:text-5xl text-[#1A1A1A] font-light tracking-tight">
              Let's Connect
            </h2>
          </div>
          <p className="text-xs text-[#1A1A1A] opacity-60 font-light max-w-sm">
            Whether for engineering opportunities or music collaborations, my inbox is always open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Info Column with 3D Tilt */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <TiltCard maxTilt={6} scale={1.01} className="rounded-2xl">
              <div className="bg-white p-8 md:p-10 rounded-2xl border border-[#1A1A1A]/10 shadow-sm space-y-8 transform-style-3d">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest opacity-40 text-[#1A1A1A] block mb-1">
                    Direct Contact
                  </span>
                  <h3 className="font-headline text-2xl md:text-3xl font-medium text-[#1A1A1A] mb-1">
                    Anas Chauhan
                  </h3>
                  <p className="text-xs text-[#1A1A1A] opacity-60 font-semibold uppercase tracking-wider">
                    IT Engineer &amp; Music Producer
                  </p>
                </div>

                <div className="space-y-5 border-t border-[#1A1A1A]/5 pt-6">
                  <div className="flex items-start space-x-3.5 text-[#1A1A1A]">
                    <MapPin size={18} className="mt-0.5 shrink-0 opacity-60" />
                    <div>
                      <p className="text-[10px] text-[#1A1A1A] font-bold uppercase tracking-widest opacity-40">Location</p>
                      <p className="text-sm font-medium">{PERSONAL_INFO.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5 text-[#1A1A1A]">
                    <Mail size={18} className="mt-0.5 shrink-0 opacity-60" />
                    <div>
                      <p className="text-[10px] text-[#1A1A1A] font-bold uppercase tracking-widest opacity-40">Email</p>
                      <div className="flex items-center space-x-2 mt-0.5">
                        <a
                          href={`mailto:${PERSONAL_INFO.email}`}
                          className="text-sm font-medium text-[#1A1A1A] hover:opacity-60 transition-opacity"
                        >
                          {PERSONAL_INFO.email}
                        </a>
                        <button
                          onClick={handleCopyEmail}
                          className="p-1 text-[#1A1A1A] opacity-60 hover:opacity-100 transition-opacity"
                          title="Copy email to clipboard"
                        >
                          {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Channels Staggered Reveal */}
                <div className="pt-6 border-t border-[#1A1A1A]/5">
                  <p className="text-[10px] text-[#1A1A1A] font-bold uppercase tracking-widest opacity-40 mb-3">
                    Social Channels
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(PERSONAL_INFO.socialLinks).map(([key, url], i) => (
                      <motion.a
                        key={key}
                        custom={i}
                        variants={socialVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 bg-[#F5F2ED] hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-white text-[11px] font-semibold rounded border border-[#1A1A1A]/10 transition-all duration-300 flex items-center space-x-1.5 shadow-2xs hover:scale-105"
                      >
                        <span className="capitalize">{key}</span>
                        <ExternalLink size={10} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Right Interactive Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-[#1A1A1A]/10 shadow-sm">
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-12 h-12 bg-[#1A1A1A] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    <Check size={24} />
                  </div>
                  <h3 className="font-headline text-2xl font-medium text-[#1A1A1A]">
                    Message Sent
                  </h3>
                  <p className="font-body text-sm text-[#1A1A1A] opacity-60 max-w-md mx-auto font-light leading-relaxed">
                    Thank you for reaching out, {formData.name}. I'll get back to you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="px-6 py-2.5 bg-[#1A1A1A] text-white rounded-lg text-[10px] uppercase tracking-widest font-bold hover:bg-[#333] transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold text-[#1A1A1A] uppercase tracking-widest opacity-50 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Smith"
                        className="w-full px-4 py-3 bg-[#F5F2ED] border border-[#1A1A1A]/10 rounded-lg text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-[#1A1A1A] uppercase tracking-widest opacity-50 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@example.com"
                        className="w-full px-4 py-3 bg-[#F5F2ED] border border-[#1A1A1A]/10 rounded-lg text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#1A1A1A] uppercase tracking-widest opacity-50 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Project Inquiry / Music Collaboration"
                      className="w-full px-4 py-3 bg-[#F5F2ED] border border-[#1A1A1A]/10 rounded-lg text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#1A1A1A] uppercase tracking-widest opacity-50 mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project or inquiry..."
                      className="w-full px-4 py-3 bg-[#F5F2ED] border border-[#1A1A1A]/10 rounded-lg text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-widest font-bold rounded-lg hover:bg-[#333] transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:scale-105 active:scale-100"
                  >
                    <span>Send Message</span>
                    <Send size={14} />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
