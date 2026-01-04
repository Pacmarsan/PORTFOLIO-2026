
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { animate, stagger } from 'animejs';

interface BubbleMergeProps {
  imageSrc: string;
  color: string;
}

export const BubbleMergeIllustration: React.FC<BubbleMergeProps> = ({ imageSrc, color }) => {
  const containerRef = useRef<SVGSVGElement>(null);
  const animRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Select all mask circles
    const circles = containerRef.current.querySelectorAll('.mask-circle');

    // Cleanup previous animation
    if (animRef.current && typeof animRef.current.pause === 'function') {
      animRef.current.pause();
    }

    try {
      // 1. Initial State: Circles are scattered and small (handled by default attributes/styles)
      // 2. Animate them to "bubble together"
      //    We animate 'r' (radius) to grow and 'cx/cy' (position) to settle into the grid?
      //    Actually, if we use a grid for the mask, we just need to animate scale/radius
      //    from 0 to cover size. To make them "join", maybe we can have them start with
      //    random transforms and animate to identity.

      // Let's rely on Anime.js to handle the stagger and scaling for the "bubbling" effect.
      // We'll animate scale from 0 to 1.5 (to ensure overlap) and opacity.

      animRef.current = animate(circles, {
        r: [0, 15], // Grow from 0 to 15 (grid spacing is ~16, so radius 15 covers well with overlap)
        opacity: [0, 1],
        // Stagger grid effect for a "wave" of bubbles
        delay: stagger(20, { grid: [15, 15], from: 'center' }),
        duration: 1500,
        easing: 'easeOutElastic(1, .6)', // Bouncy "bubble" feel
        loop: false
      });

    } catch (err) {
      console.error("AnimeJS error:", err);
    }

    return () => {
      if (animRef.current && typeof animRef.current.pause === 'function') {
        animRef.current.pause();
      }
    };

  }, [imageSrc]);

  // Generate grid of circles for the mask
  // We want enough circles to cover the 200x200 area.
  // 15x15 grid => spacing ~13.33
  const bubbles = [];
  const rows = 15;
  const cols = 15;
  const size = 200;
  const spacing = size / rows;

  for(let i=0; i <= rows; i++) {
    for(let j=0; j <= cols; j++) {
       bubbles.push(
         <circle
           key={`${i}-${j}`}
           className="mask-circle"
           cx={j * spacing}
           cy={i * spacing}
           r="0" // Start at 0, animate to ~spacing
           fill="white"
         />
       );
    }
  }

  const maskId = `bubble-mask-${imageSrc.replace(/[^a-z0-9]/gi, '')}`;

  return (
    <svg ref={containerRef} viewBox="0 0 200 200" className="w-full h-full p-8" fill="none">
       <defs>
         <mask id={maskId}>
           {bubbles}
         </mask>

         {/* Filter for "Gooey" effect? (Optional, might be too heavy) */}
         <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
         </filter>
       </defs>

       {/* Background placeholder or outline */}
       <circle cx="100" cy="100" r="90" stroke={color} strokeWidth="0.5" strokeDasharray="2 2" opacity="0.2" />

       {/* The Image Revealed by Bubbles */}
       <image
         href={imageSrc}
         x="0" y="0" width="200" height="200"
         mask={`url(#${maskId})`}
         preserveAspectRatio="xMidYMid meet"
         style={{ opacity: 0.9 }} //, filter: 'url(#goo)' }} // Gooey filter on image might be weird, applied on mask is better but mask is invisible.
       />

       {/* Optional: Add some floating bubbles on top for depth */}
       <motion.circle
         cx="50" cy="50" r="5" fill={color} opacity="0.5"
         animate={{ y: [0, -20, 0], opacity: [0, 0.5, 0] }}
         transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
       />
       <motion.circle
         cx="150" cy="150" r="8" fill={color} opacity="0.3"
         animate={{ y: [0, -30, 0], opacity: [0, 0.3, 0] }}
         transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
       />

    </svg>
  );
};
