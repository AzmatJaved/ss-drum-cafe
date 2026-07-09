/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, Volume2, VolumeX, Music, Disc, X } from 'lucide-react';
import { SONGS } from '../data';
import { Song } from '../types';

interface AudioPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  autoPlay?: boolean;
}

export default function AudioPlayer({ isOpen, onClose, autoPlay = false }: AudioPlayerProps) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(225); // Simulated seconds (3:45)
  const [equalizerBars, setEqualizerBars] = useState<number[]>(new Array(16).fill(15));

  const audioCtxRef = useRef<AudioContext | null>(null);
  const loopRef = useRef<number | null>(null);
  const nextBeatTimeRef = useRef<number>(0);
  const beatIndexRef = useRef<number>(0);
  const tempoRef = useRef<number>(85); // 85 BPM (chill lo-fi)
  const isSynthRunningRef = useRef<boolean>(false);

  const activeSong: Song = SONGS[currentSongIndex];

  // Duration in string format
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  // Convert duration string "3:45" to seconds
  useEffect(() => {
    if (activeSong.duration) {
      const parts = activeSong.duration.split(':');
      const secs = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
      setDuration(secs);
      setCurrentTime(0);
    }
  }, [currentSongIndex]);

  // Simulate progress bar and visualizer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            // Auto loop to next track
            handleNext();
            return 0;
          }
          return prev + 1;
        });

        // Generate dynamic visualizer bars
        setEqualizerBars((prev) =>
          prev.map(() => Math.floor(Math.random() * 40) + 10)
        );
      }, 1000);
    } else {
      setEqualizerBars(new Array(16).fill(15));
    }
    return () => clearInterval(timer);
  }, [isPlaying, duration, currentSongIndex]);

  // Synthesis engine for a real ambient drum beat!
  const startSynth = () => {
    if (isSynthRunningRef.current) return;
    
    try {
      // Lazy init AudioContext
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtxClass();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      nextBeatTimeRef.current = ctx.currentTime;
      beatIndexRef.current = 0;
      isSynthRunningRef.current = true;
      
      const secondsPerBeat = 60.0 / tempoRef.current / 4; // Subdivided into 16th notes
      
      const scheduler = () => {
        while (nextBeatTimeRef.current < ctx.currentTime + 0.1) {
          scheduleBeat(beatIndexRef.current, nextBeatTimeRef.current, ctx);
          nextBeatTimeRef.current += secondsPerBeat;
          beatIndexRef.current = (beatIndexRef.current + 1) % 16;
        }
        loopRef.current = requestAnimationFrame(scheduler);
      };
      
      scheduler();
    } catch (err) {
      console.warn("Web Audio API not supported or suspended by user gesture restriction.", err);
    }
  };

  const stopSynth = () => {
    isSynthRunningRef.current = false;
    if (loopRef.current) {
      cancelAnimationFrame(loopRef.current);
      loopRef.current = null;
    }
    // Fade out audio if possible
  };

  // Synthesise basic sounds: Kick drum, Snare drum, Hi-hat
  const scheduleBeat = (step: number, time: number, ctx: AudioContext) => {
    if (!isSynthRunningRef.current || isMuted) return;

    const volumeGain = ctx.createGain();
    // Connect to volume slider
    volumeGain.gain.setValueAtTime(volume, time);
    volumeGain.connect(ctx.destination);

    // Dynamic pattern based on song index
    const isKickStep = currentSongIndex === 0 
      ? (step === 0 || step === 8 || step === 10)
      : currentSongIndex === 1
      ? (step === 0 || step === 4 || step === 8 || step === 12)
      : currentSongIndex === 2
      ? (step === 0 || step === 6 || step === 10)
      : (step === 0 || step === 8); // s4

    const isSnareStep = currentSongIndex === 0
      ? (step === 4 || step === 12)
      : currentSongIndex === 1
      ? (step === 2 || step === 6 || step === 10 || step === 14)
      : currentSongIndex === 2
      ? (step === 4 || step === 12)
      : (step === 4 || step === 12 || step === 14);

    const isHihatStep = step % 2 === 0;

    // Play Kick
    if (isKickStep) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(volumeGain);

      // Low pitch pitch-sweep kick
      osc.frequency.setValueAtTime(150, time);
      osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.3);
      
      gain.gain.setValueAtTime(0.8, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.3);

      osc.start(time);
      osc.stop(time + 0.3);
    }

    // Play Snare
    if (isSnareStep) {
      // Noise buffer for snare rattle
      const bufferSize = ctx.sampleRate * 0.2; // 200ms
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2.0 - 1.0;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1000, time);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.4, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(volumeGain);

      noise.start(time);
      noise.stop(time + 0.15);

      // Add a metallic rimshot tone
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, time);
      oscGain.gain.setValueAtTime(0.3, time);
      oscGain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
      
      osc.connect(oscGain);
      oscGain.connect(volumeGain);
      osc.start(time);
      osc.stop(time + 0.1);
    }

    // Play Hihat
    if (isHihatStep && !isKickStep && !isSnareStep) {
      // Filtered noise hi-hat
      const bufferSize = ctx.sampleRate * 0.05; // 50ms
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2.0 - 1.0;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(7000, time);

      const gain = ctx.createGain();
      // Emphasize offbeats for swing
      const hhVol = step % 4 === 2 ? 0.2 : 0.08;
      gain.gain.setValueAtTime(hhVol, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(volumeGain);

      noise.start(time);
      noise.stop(time + 0.05);
    }
  };

  // Manage Web Audio start/stop on playing state change
  useEffect(() => {
    if (isPlaying) {
      startSynth();
    } else {
      stopSynth();
    }
    return () => {
      stopSynth();
    };
  }, [isPlaying, currentSongIndex, isMuted, volume]);

  useEffect(() => {
    if (isOpen && autoPlay) {
      setIsPlaying(true);
    }
  }, [isOpen, autoPlay]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % SONGS.length);
    setCurrentTime(0);
  };

  if (!isOpen) return null;

  return (
    <div id="audio-player-container" className="fixed bottom-6 right-6 z-50 w-80 rounded-none border border-white/10 bg-[#0A0A0A] p-6 shadow-2xl transition-all duration-300">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Music className="h-4 w-4 text-brand-gold animate-bounce" />
          <span className="font-heading text-xs font-bold tracking-[0.2em] text-brand-gold uppercase">
            Ambience Player
          </span>
        </div>
        <button
          id="audio-close-btn"
          onClick={onClose}
          className="p-1 text-zinc-500 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Song Details */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-none bg-[#121212] overflow-hidden border border-white/5">
          <Disc className={`h-8 w-8 text-brand-gold ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
        </div>
        <div className="flex-1 overflow-hidden">
          <h4 className="truncate font-heading text-xs font-bold text-white uppercase tracking-wider">{activeSong.title}</h4>
          <p className="truncate text-[10px] text-zinc-500 uppercase tracking-widest">{activeSong.artist}</p>
        </div>
      </div>

      {/* Visual Equalizer Waves */}
      <div className="flex h-12 items-end justify-center gap-[3px] rounded-none bg-black px-4 py-2 mb-4 border border-white/5">
        {equalizerBars.map((val, i) => (
          <div
            key={i}
            className="w-[6px] rounded-none bg-gradient-to-t from-brand-red to-brand-gold transition-all duration-100 ease-out"
            style={{ height: `${val}%` }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="relative h-1 w-full rounded-none bg-[#1A1A1A] overflow-hidden">
          <div
            className="h-full bg-brand-gold transition-all duration-1000 ease-linear"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[9px] font-mono text-zinc-500 tracking-widest">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        {/* Mute Button */}
        <button
          id="audio-mute-btn"
          onClick={toggleMute}
          className="text-zinc-400 hover:text-white transition-colors"
        >
          {isMuted ? <VolumeX className="h-5 w-5 text-brand-red" /> : <Volume2 className="h-5 w-5" />}
        </button>

        {/* Play/Pause/Skip */}
        <div className="flex items-center gap-4">
          <button
            id="audio-play-pause-btn"
            onClick={togglePlay}
            className="flex h-10 w-10 items-center justify-center rounded-none bg-white text-black hover:bg-brand-gold hover:text-black transition-all duration-200 shadow-md"
          >
            {isPlaying ? <Pause className="h-4 w-4 fill-current text-black" /> : <Play className="h-4 w-4 fill-current text-black ml-0.5" />}
          </button>

          <button
            id="audio-skip-btn"
            onClick={handleNext}
            className="flex h-8 w-8 items-center justify-center rounded-none bg-[#121212] border border-white/10 text-zinc-400 hover:text-white hover:border-brand-gold transition-all"
            title="Next Track"
          >
            <SkipForward className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Volume Slider */}
        <div className="flex items-center gap-2">
          <input
            id="audio-volume-slider"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="w-16 h-1 bg-[#1A1A1A] rounded-none appearance-none cursor-pointer accent-brand-gold"
          />
        </div>
      </div>
    </div>
  );
}
