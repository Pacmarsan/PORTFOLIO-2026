
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TerminalTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

// Procedural audio utility for terminal sounds
const playTick = (audioContext: AudioContext) => {
  if (audioContext.state === 'suspended') return;
  
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  
  osc.type = 'square';
  osc.frequency.setValueAtTime(800 + Math.random() * 400, audioContext.currentTime);
  
  gain.gain.setValueAtTime(0.05, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.05);
  
  osc.connect(gain);
  gain.connect(audioContext.destination);
  
  osc.start();
  osc.stop(audioContext.currentTime + 0.05);
};

const TerminalText: React.FC<TerminalTextProps> = ({ text, className, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isRevealing, setIsRevealing] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const lastIterationRef = useRef(0);

  useEffect(() => {
    // Shared AudioContext for the component
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    setIsRevealing(true);
    let iteration = 0;
    let interval: number;

    const startReveal = () => {
      interval = window.setInterval(() => {
        const currentIteration = Math.floor(iteration);
        
        // Play sound only when a new character is finalized to avoid sonic clutter
        if (currentIteration > lastIterationRef.current && audioContextRef.current) {
          playTick(audioContextRef.current);
          lastIterationRef.current = currentIteration;
        }

        setDisplayText(prev => 
          text.split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          setIsRevealing(false);
        }

        iteration += 1 / 3;
      }, 30);
    };

    const timeout = window.setTimeout(startReveal, delay * 1000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [text, delay]);

  return (
    <span className={`${className} inline-block whitespace-pre`}>
      {displayText || " "}
      {isRevealing && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.1, repeat: Infinity }}
          className="inline-block w-[0.5em] h-[1em] bg-[var(--accent)] ml-1 align-middle"
        />
      )}
    </span>
  );
};

export default TerminalText;
