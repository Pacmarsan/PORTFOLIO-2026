import React from 'react';
import { motion } from 'framer-motion';
import { Phase } from '../types';

interface PhaseIllustrationProps {
  activePhase: Phase;
}

const PhaseIllustration: React.FC<PhaseIllustrationProps> = ({ activePhase }) => {
  const color = activePhase.color;

  const renderIllustration = () => {
    switch (activePhase.name) {
      case 'hero': // Global Reach / Identity
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-8" fill="none" stroke={color} strokeWidth="1">
            <motion.circle
              cx="100" cy="100" r="40"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <motion.circle
              cx="100" cy="100" r="60"
              strokeDasharray="4 4"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
              d="M100 20 L100 180 M20 100 L180 100"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 1 }}
            />
            <motion.circle
              cx="100" cy="100" r="80"
              strokeOpacity="0.2"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            {/* Satellite nodes */}
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <motion.circle
                key={i}
                cx={100 + 60 * Math.cos((angle * Math.PI) / 180)}
                cy={100 + 60 * Math.sin((angle * Math.PI) / 180)}
                r="3"
                fill={color}
                stroke="none"
                animate={{ scale: [0, 1] }}
                transition={{ delay: 0.5 + i * 0.1 }}
              />
            ))}
          </svg>
        );

      case 'worlds': // Manga & Story IP
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-8" fill="none" stroke={color} strokeWidth="1">
            {/* Book/Portal Pages */}
            <motion.rect
              x="50" y="40" width="100" height="120" rx="2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.path
              d="M60 60 H140 M60 80 H140 M60 100 H120"
              strokeOpacity="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            />
            {/* Floating particles/planets */}
            <motion.circle
              cx="160" cy="60" r="10"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="40" cy="140" r="15"
              strokeDasharray="2 2"
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        );

      case 'brands': // Content & AI Ads
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-8" fill="none" stroke={color} strokeWidth="1">
            {/* Megaphone / Broadcast */}
            <motion.path
              d="M60 80 L100 60 V140 L60 120 Z"
              fill={color}
              fillOpacity="0.1"
              animate={{ scale: [0.9, 1, 0.9] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.rect
              x="30" y="85" width="30" height="30" rx="4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            />
            {/* Waves */}
            {[1, 2, 3].map((i) => (
              <motion.path
                key={i}
                d={`M110 ${100 - i * 15} Q${130 + i * 10} 100 110 ${100 + i * 15}`}
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: [0, 1, 0], x: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </svg>
        );

      case 'experiences': // Interface Planes
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-8" fill="none" stroke={color} strokeWidth="1">
            {/* Layered Interface */}
            <motion.rect
              x="40" y="40" width="120" height="80" rx="4"
              transform="skewX(-10)"
              fill={color} fillOpacity="0.05"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.rect
              x="50" y="70" width="120" height="80" rx="4"
              transform="skewX(-10)"
              fill={color} fillOpacity="0.1"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.path
              d="M60 90 H100 M60 105 H140 M60 120 H80"
              strokeWidth="2"
              transform="skewX(-10)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1 }}
            />
            {/* Cursor */}
            <motion.path
              d="M140 130 L150 150 L140 145 Z"
              fill={color}
              animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </svg>
        );

      case 'products': // Web Apps & Systems
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-8" fill="none" stroke={color} strokeWidth="1">
            {/* Gear / System */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              style={{ originX: "100px", originY: "100px" }}
            >
              <circle cx="100" cy="100" r="30" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <rect
                  key={i}
                  x="95" y="55" width="10" height="15"
                  transform={`rotate(${angle} 100 100)`}
                  fill={color} fillOpacity="0.2"
                />
              ))}
            </motion.g>

            {/* Data flow lines */}
            <motion.path
              d="M40 100 H70"
              strokeDasharray="4 4"
              animate={{ strokeDashoffset: -20 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
              d="M130 100 H160"
              strokeDasharray="4 4"
              animate={{ strokeDashoffset: 20 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />

            {/* Connection nodes */}
            <motion.circle cx="35" cy="100" r="4" fill={color} />
            <motion.circle cx="165" cy="100" r="4" fill={color} />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      key={activePhase.name}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.5 }}
      className="w-full h-full flex items-center justify-center pointer-events-none drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
    >
      <div className="w-[400px] h-[400px]">
        {renderIllustration()}
      </div>
    </motion.div>
  );
};

export default PhaseIllustration;
