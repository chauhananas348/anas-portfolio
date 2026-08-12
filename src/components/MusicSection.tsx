import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Disc, Sparkles } from 'lucide-react';
import { MUSIC_TRACKS, PERSONAL_INFO } from '../data/portfolioData';
import { WaveformCanvas3D } from './3d/WaveformCanvas3D';
import { TiltCard } from './common/TiltCard';

export const MusicSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTrack, setActiveTrack] = useState(MUSIC_TRACKS[0]);

  // Web Audio Synth state for interactive music sampling
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  const startAmbientSynth = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      stopAmbientSynth();

      const ctx = audioCtxRef.current;
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(isMuted ? 0 : 0.15, ctx.currentTime);
      gainNode.connect(ctx.destination);
      gainNodeRef.current = gainNode;

      // Warm ambient chord frequencies (A Minor 9: A, C, E, G, B)
      const freqs = activeTrack.title === 'QUIET ROOM'
        ? [220.00, 261.63, 329.63, 392.00, 493.88]
        : [164.81, 196.00, 246.94, 293.66, 369.99];

      oscillatorsRef.current = freqs.map((f, i) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, ctx.currentTime);

        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.2 + i * 0.05;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 1.5;
        lfo.connect(osc.frequency);
        lfo.start();

        oscGain.gain.setValueAtTime(0.08, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(gainNode);
        osc.start();
        return osc;
      });

      setIsPlaying(true);
    } catch (e) {
      console.warn('Audio Context error:', e);
      setIsPlaying(true);
    }
  };

  const stopAmbientSynth = () => {
    oscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {}
    });
    oscillatorsRef.current = [];
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAmbientSynth();
    } else {
      startAmbientSynth();
    }
  };

  const toggleMute = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      if (isMuted) {
        gainNodeRef.current.gain.setValueAtTime(0.15, audioCtxRef.current.currentTime);
        setIsMuted(false);
      } else {
        gainNodeRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
        setIsMuted(true);
      }
    } else {
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    return () => {
      stopAmbientSynth();
    };
  }, []);

  return (
    <section id="music" className="py-28 px-6 sm:px-12 bg-[#161514]/95 backdrop-blur-[2px] text-white relative overflow-hidden">
      {/* 3D Waveform Canvas Transitioning Code into Sound */}
      <WaveformCanvas3D isPlaying={isPlaying} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-6 gap-6"
        >
          <div>
            <div className="inline-flex items-center space-x-2 text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
              <Disc className="animate-spin-slow" size={14} />
              <span>SONIC IDENTITY — {PERSONAL_INFO.moniker}</span>
            </div>
            <h2 className="font-headline text-3xl md:text-5xl text-white font-light tracking-tight">
              Music &amp; Sound Design
            </h2>
          </div>

          <p className="font-body text-sm text-white/70 max-w-md font-light leading-relaxed">
            Exploring atmospheric synths, organic sound textures, and algorithmic sound design under the moniker <span className="font-semibold text-white">{PERSONAL_INFO.moniker}</span>.
          </p>
        </motion.div>

        {/* Music Player & Soundscape Display Card with 3D Tilt */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8 }}
        >
          <TiltCard maxTilt={6} scale={1.01} className="rounded-2xl">
            <div className="bg-[#1E1C1A]/90 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transform-style-3d">
              {/* Cover Art / Audio Visualizer */}
              <div className="lg:col-span-5 relative group">
                <div className="aspect-square rounded-xl overflow-hidden border border-white/15 relative shadow-xl">
                  <img
                    src={activeTrack.imageUrl}
                    alt={activeTrack.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Animated Waveform Overlay when Playing */}
                  {isPlaying && (
                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between h-12 gap-1.5 px-4 py-2 bg-black/60 backdrop-blur-md rounded-lg">
                      {[40, 75, 55, 90, 60, 85, 45, 95, 70, 50, 80, 65, 90, 40].map((h, idx) => (
                        <div
                          key={idx}
                          className="w-1.5 bg-[#C5A059] rounded-full animate-pulse"
                          style={{
                            height: `${h}%`,
                            animationDuration: `${0.6 + (idx % 4) * 0.2}s`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Track Information & Controls */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="px-3 py-1 bg-[#C5A059] text-[#161514] text-[10px] font-bold uppercase tracking-wider rounded-sm">
                      {activeTrack.genre}
                    </span>
                    <span className="text-[11px] text-white/50 font-medium">
                      Released {activeTrack.releaseYear} • {activeTrack.duration}
                    </span>
                  </div>

                  <h3 className="font-headline text-3xl md:text-4xl font-medium text-white mb-1">
                    {activeTrack.title}
                  </h3>
                  <p className="font-body text-xs font-bold uppercase tracking-widest text-[#C5A059] opacity-80 mb-4">
                    by {activeTrack.artist}
                  </p>

                  <p className="font-body text-sm text-white/75 leading-relaxed mb-6 font-light">
                    {activeTrack.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs font-mono text-white/80 bg-black/40 p-4 rounded-xl border border-white/10">
                    <div>BPM: <span className="font-bold text-[#C5A059]">{activeTrack.bpm}</span></div>
                    <div>Key: <span className="font-bold text-[#C5A059]">{activeTrack.key}</span></div>
                    <div>Synthesis: <span className="font-bold text-white">Analog Web Audio</span></div>
                  </div>
                </div>

                {/* Interactive Player Controls */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <button
                      onClick={togglePlay}
                      className="px-6 py-3.5 bg-[#C5A059] text-[#161514] rounded-lg text-[11px] uppercase tracking-widest font-bold flex items-center justify-center space-x-2.5 hover:bg-[#D4AF37] transition-all duration-300 w-full sm:w-auto shadow-md hover:scale-105 active:scale-100"
                    >
                      {isPlaying ? <Pause size={16} /> : <Play size={16} className="fill-[#161514]" />}
                      <span>{isPlaying ? 'Pause Ambient Sound' : 'Play Ambient Soundscape'}</span>
                    </button>

                    <button
                      onClick={toggleMute}
                      className="p-3.5 bg-white/10 text-white rounded-lg border border-white/15 hover:bg-white/20 transition-colors"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                  </div>

                  {/* Streaming Links */}
                  <div className="flex items-center space-x-4 text-xs font-bold uppercase tracking-wider">
                    <a
                      href={PERSONAL_INFO.socialLinks.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#C5A059] transition-colors"
                    >
                      Spotify
                    </a>
                    <a
                      href={PERSONAL_INFO.socialLinks.soundcloud}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#C5A059] transition-colors"
                    >
                      SoundCloud
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
};
