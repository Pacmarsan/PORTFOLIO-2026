import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { animate, stagger } from 'animejs';
import { Phase } from '../types';
import { BubbleMergeIllustration } from './BubbleMergeIllustration';

interface PhaseIllustrationProps {
  activePhase: Phase;
  onInteract?: () => void;
}

const BlockRevealIllustration: React.FC<{ color: string; imageSrc: string }> = ({ color, imageSrc }) => {
  const containerRef = useRef<SVGSVGElement>(null);
  const animRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const blocks = containerRef.current.querySelectorAll('.reveal-block');

    // Cleanup
    if (animRef.current && typeof animRef.current.pause === 'function') {
      animRef.current.pause();
    }

    try {
      // Animate blocks falling down
      const animation = animate(blocks, {
        translateY: [-400, 0], // Fall from above
        opacity: [0, 1],
        scale: [0.5, 1],
        easing: 'easeOutBounce', // Bounce effect
        duration: 2000,
        // Stagger from top-left to bottom-right (grid effect)
        delay: stagger(30, { grid: [12, 12], from: 'first' }),
      });

      animRef.current = animation;
    } catch (err) {
      console.error("AnimeJS error:", err);
    }

    return () => {
      if (animRef.current && typeof animRef.current.pause === 'function') {
        animRef.current.pause();
      }
    };

  }, [imageSrc]); // Re-run if image changes

  // Generate grid of blocks (squares) for the mask
  const blocks = [];
  const rows = 12;
  const cols = 12;
  const spacing = 200 / rows;
  // Make blocks slightly larger than spacing to eliminate subpixel gaps
  const size = spacing + 0.5;

  for(let i=0; i < rows; i++) {
    for(let j=0; j < cols; j++) {
       blocks.push(
         <rect
           key={`${i}-${j}`}
           className="reveal-block"
           x={j * spacing} // x is column
           y={i * spacing} // y is row
           width={size}
           height={size}
           fill="white"
         />
       );
    }
  }

  // Create unique IDs for mask based on imageSrc to prevent collisions if multiple instances (though logic prevents that via switch)
  // Simple hash or just use image filename part
  const maskId = `mask-${imageSrc.replace(/[^a-z0-9]/gi, '')}`;

  return (
    <svg ref={containerRef} viewBox="0 0 200 200" className="w-full h-full p-8" fill="none">
       <defs>
         <mask id={maskId}>
           {blocks}
         </mask>
       </defs>

       {/* Background circle for context */}
       <circle cx="100" cy="100" r="95" stroke={color} strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />

       {/* The Image Revealed by Blocks */}
       <image
         href={imageSrc}
         x="10" y="10" width="180" height="180"
         mask={`url(#${maskId})`}
         preserveAspectRatio="xMidYMid slice"
         style={{ opacity: 0.9 }}
       />

       {/* Decorative rings on top */}
       <motion.circle
          cx="100" cy="100" r="100"
          stroke={color}
          strokeWidth="1"
          strokeOpacity="0.5"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1 }}
       />
    </svg>
  );
};

const PhaseIllustration: React.FC<PhaseIllustrationProps> = ({ activePhase, onInteract }) => {
  const color = activePhase.color;
  const isInteractive = (activePhase.name === 'hero' || activePhase.name === 'worlds') && !!onInteract;

  const renderIllustration = () => {
    switch (activePhase.name) {
      case 'hero': // Global Reach / Identity
        return <BlockRevealIllustration color={color} imageSrc="/assets/global-reach-portrait.png" />;

      case 'worlds': // Manga & Story IP
        return <BlockRevealIllustration color={color} imageSrc="/assets/studio-limitless-logo.png" />;

      case 'brands': // Content & AI Ads
        return <BubbleMergeIllustration color={color} imageSrc="/assets/ziro-robot.png" />;

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

      case 'contacts': // Contact / System Link
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-8" fill="none" stroke={color} strokeWidth="1">
            {/* Central Hub */}
            <motion.circle
              cx="100" cy="100" r="20"
              fill={color} fillOpacity="0.2"
              animate={{ r: [20, 25, 20], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <circle cx="100" cy="100" r="10" fill={color} />

            {/* Orbiting Satellites */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{ originX: "100px", originY: "100px" }}
            >
              <circle cx="100" cy="40" r="5" fill={color} />
              <path d="M100 50 L100 90" strokeDasharray="2 2" />

              <circle cx="100" cy="160" r="5" fill={color} />
              <path d="M100 150 L100 110" strokeDasharray="2 2" />

              <circle cx="40" cy="100" r="5" fill={color} />
              <path d="M50 100 L90 100" strokeDasharray="2 2" />

              <circle cx="160" cy="100" r="5" fill={color} />
              <path d="M150 100 L110 100" strokeDasharray="2 2" />
            </motion.g>

            {/* Expanding Waves */}
            <motion.circle
              cx="100" cy="100" r="40"
              stroke={color} strokeWidth="0.5"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 0.5, 0], scale: [0.8, 2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
            />
             <motion.circle
              cx="100" cy="100" r="40"
              stroke={color} strokeWidth="0.5"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 0.5, 0], scale: [0.8, 2] }}
              transition={{ duration: 3, delay: 1, repeat: Infinity, ease: "easeOut" }}
            />
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
      onClick={isInteractive ? onInteract : undefined}
      data-testid={isInteractive ? "hero-illustration-interactive" : "hero-illustration"}
      className={`w-full h-full flex items-center justify-center drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] ${
        isInteractive ? 'pointer-events-auto cursor-pointer hover:scale-105 transition-transform duration-300' : 'pointer-events-none'
      }`}
    >
      <div className="w-[400px] h-[400px]">
        {renderIllustration()}
      </div>
    </motion.div>
  );
};

export default PhaseIllustration;
