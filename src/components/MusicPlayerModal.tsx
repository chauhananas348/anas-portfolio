import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Headphones, ExternalLink, Disc } from 'lucide-react';
import { MUSIC_TRACKS, PERSONAL_INFO } from '../data/portfolioData';

interface MusicPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MusicPlayerModal: React.FC<MusicPlayerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const track = MUSIC_TRACKS[0]; // QUIET ROOM
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Web Audio Synth setup
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  const startSynth = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      stopSynth();

      const ctx = audioCtxRef.current;
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(isMuted ? 0 : 0.18, ctx.currentTime);
      gainNode.connect(ctx.destination);
      gainNodeRef.current = gainNode;

      // Quiet Room Ambient Chord Frequencies: A Minor (A2, C3, E3, G3, B3)
      const frequencies = [110.00, 130.81, 164.81, 196.00, 246.94];

      oscillatorsRef.current = frequencies.map((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.15 + i * 0.04;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 1.2;
        lfo.connect(osc.frequency);
        lfo.start();

        osc.connect(gainNode);
        osc.start();
        return osc;
      });

      setIsPlaying(true);
    } catch (e) {
      console.warn('Synth error:', e);
      setIsPlaying(true);
    }
  };

  const stopSynth = () => {
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
      stopSynth();
    } else {
      startSynth();
    }
  };

  const toggleMute = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      if (isMuted) {
        gainNodeRef.current.gain.setValueAtTime(0.18, audioCtxRef.current.currentTime);
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
      stopSynth();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#F5F2ED] rounded-2xl max-w-xl w-full border border-[#1A1A1A]/10 shadow-2xl overflow-hidden relative flex flex-col">
        {/* Modal Header */}
        <div className="p-6 bg-white border-b border-[#1A1A1A]/10 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-[#1A1A1A]">
            <Disc className={isPlaying ? 'animate-spin-slow' : ''} size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
              ANTSHAIL Sound Experience
            </span>
          </div>
          <button
            onClick={() => {
              stopSynth();
              onClose();
            }}
            className="p-2 text-[#1A1A1A] opacity-60 hover:opacity-100 hover:bg-[#1A1A1A]/5 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 space-y-6 bg-[#F5F2ED]">
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <img
              src={track.imageUrl}
              alt={track.title}
              className="w-32 h-32 object-cover rounded-xl border border-[#1A1A1A]/10 shrink-0 shadow-sm"
              referrerPolicy="no-referrer"
            />

            <div className="space-y-1.5 text-center sm:text-left">
              <span className="px-2.5 py-0.5 bg-[#1A1A1A] text-white text-[10px] font-bold uppercase tracking-wider rounded-sm inline-block">
                {track.genre}
              </span>
              <h3 className="font-headline text-2xl font-medium text-[#1A1A1A]">
                {track.title}
              </h3>
              <p className="font-body text-xs font-bold uppercase tracking-widest text-[#1A1A1A] opacity-50">
                by {track.artist}
              </p>
              <p className="text-[11px] text-[#1A1A1A] opacity-50">
                BPM: {track.bpm} • Key: {track.key} • Duration: {track.duration}
              </p>
            </div>
          </div>

          <p className="font-body text-xs text-[#1A1A1A] opacity-70 leading-relaxed bg-white p-4 rounded-xl border border-[#1A1A1A]/5 font-light">
            {track.description}
          </p>

          {/* Player controls */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              onClick={togglePlay}
              className="flex-1 py-3 bg-[#1A1A1A] text-white rounded-lg text-[10px] uppercase tracking-widest font-bold flex items-center justify-center space-x-2.5 hover:bg-[#333] transition-colors shadow-sm"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="fill-white" />}
              <span>{isPlaying ? 'Pause Ambient Synth' : 'Play Ambient Soundscape'}</span>
            </button>

            <button
              onClick={toggleMute}
              className="p-3 bg-white text-[#1A1A1A] rounded-lg border border-[#1A1A1A]/10 hover:bg-[#F5F2ED] transition-colors"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>
        </div>

        {/* Modal Footer Links */}
        <div className="p-6 bg-white border-t border-[#1A1A1A]/10 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A] opacity-40">Stream on platforms:</span>

          <div className="flex items-center space-x-4 text-xs font-bold uppercase tracking-wider">
            <a
              href={PERSONAL_INFO.socialLinks.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1A1A1A] hover:opacity-50 transition-opacity flex items-center space-x-1"
            >
              <span>Spotify</span>
              <ExternalLink size={10} />
            </a>
            <a
              href={PERSONAL_INFO.socialLinks.soundcloud}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1A1A1A] hover:opacity-50 transition-opacity flex items-center space-x-1"
            >
              <span>SoundCloud</span>
              <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
