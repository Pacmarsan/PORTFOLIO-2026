import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { animate } from 'animejs';
import { BRANDS } from './BrandsArchive';

interface GramophoneIllustrationProps {
  color: string;
  isExpanded: boolean;
  onInteract: () => void;
  onBrandSelect: (id: string) => void;
  selectedBrandId: string | null;
}

const GramophoneIllustration: React.FC<GramophoneIllustrationProps> = ({
  color,
  isExpanded,
  onInteract,
  onBrandSelect,
  selectedBrandId
}) => {
  const vinylRef = useRef<SVGGElement>(null);
  const animationRef = useRef<any>(null);
  const [hoveredRing, setHoveredRing] = useState<string | null>(null);

  // Rotation Animation
  useEffect(() => {
    if (!vinylRef.current) return;

    let currentRotation = 0;
    if (vinylRef.current.style.transform) {
         const transform = vinylRef.current.style.transform;
         const match = transform.match(/rotate\(([^)]+)deg\)/);
         if (match) {
             currentRotation = parseFloat(match[1]) % 360;
         }
    }

    if (animationRef.current) animationRef.current.pause();

    try {
        const anim = animate(vinylRef.current, {
          rotate: [currentRotation, currentRotation + 360],
          duration: isExpanded ? 20000 : 8000,
          easing: 'linear',
          loop: true
        });
        animationRef.current = anim;
    } catch (e) {
        console.error("AnimeJS error:", e);
    }

    return () => {
      if (animationRef.current) animationRef.current.pause();
    };
  }, [isExpanded]);

  const handleRingHover = (id: string | null) => {
    setHoveredRing(id);
  };

  const handleRingClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!isExpanded) {
        onInteract();
    } else {
        onBrandSelect(id);
    }
  };

  // Ring Calculation for 10 items
  // Radius range: ~40px (inner) to ~170px (outer)
  // Max radius 170. Inner radius (label) 30.
  // Start from 45.
  // Spacing = (170 - 45) / 10 = 12.5
  // Let's use 13px spacing.

  return (
    <svg
        viewBox="0 0 400 400"
        className="w-full h-full p-8"
        fill="none"
        onClick={!isExpanded ? onInteract : undefined}
    >
      <defs>
         <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
           <feGaussianBlur stdDeviation="5" result="blur" />
           <feComposite in="SourceGraphic" in2="blur" operator="over" />
         </filter>
         <linearGradient id="vinylGradient" x1="0%" y1="0%" x2="100%" y2="100%">
             <stop offset="0%" stopColor="#222" />
             <stop offset="50%" stopColor="#111" />
             <stop offset="100%" stopColor="#222" />
         </linearGradient>
      </defs>

      {/* Base / Platter */}
      <circle cx="200" cy="200" r="180" fill="#050505" stroke={color} strokeWidth="1" strokeOpacity="0.2" />
      <circle cx="200" cy="200" r="170" fill="url(#vinylGradient)" opacity="0.8" />

      {/* Rotating Vinyl Group */}
      <g ref={vinylRef} style={{ transformOrigin: '200px 200px' }}>
         {/* Grooves Texture */}
         {[...Array(15)].map((_, i) => (
             <circle
                key={`groove-${i}`}
                cx="200" cy="200" r={40 + i * 10}
                fill="none"
                stroke="#ffffff"
                strokeOpacity="0.03"
                strokeWidth="1"
             />
         ))}

         {/* Interactive Brand Rings */}
         {BRANDS.map((brand, index) => {
            const startRadius = 50;
            const spacing = 13;
            const radius = startRadius + (index * spacing); // Inner to Outer (Ring index 0 is first in array?)

            // Or Outer to Inner?
            // "10 mockup tracks that are layered on top"
            // Let's go Outer to Inner to match standard "Track 1 is outer" convention on vinyl?
            // Actually vinyl plays Outside -> In.
            // So index 0 (Track 1) should be Outer.

            // Let's reverse:
            // Max R = 170.
            // spacing = 13.
            // R = 170 - (index * 13)
            // Index 0: 170. Index 9: 170 - 117 = 53. Fits well.

            const outerRadius = 170 - (index * spacing);

            const isHovered = hoveredRing === brand.id;
            const isSelected = selectedBrandId === brand.id;

            return (
                <g
                    key={brand.id}
                    onMouseEnter={() => handleRingHover(brand.id)}
                    onMouseLeave={() => handleRingHover(null)}
                    onClick={(e) => handleRingClick(e, brand.id)}
                    className="cursor-pointer"
                    style={{ pointerEvents: 'auto' }}
                >
                    {/* Hit Area */}
                    <circle
                        cx="200" cy="200" r={outerRadius}
                        fill="transparent"
                        stroke="transparent"
                        strokeWidth="12"
                    />

                    {/* Visible Ring */}
                    <motion.circle
                        cx="200" cy="200" r={outerRadius}
                        fill="none"
                        stroke={isSelected ? brand.color : (isHovered ? brand.color : color)}
                        strokeWidth={isSelected ? 3 : (isHovered ? 2 : 0.5)}
                        strokeOpacity={isSelected ? 1 : (isHovered ? 0.8 : 0.3)}
                        strokeDasharray={isSelected ? "none" : ((index % 2 === 0) ? "4 2" : "1 4")}
                        animate={{
                            scale: isHovered ? 1.02 : 1,
                            strokeOpacity: isSelected ? 1 : (isHovered ? 0.8 : (selectedBrandId ? 0.1 : 0.3))
                        }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Label (Only visible on hover/select) */}
                    {(isHovered || isSelected) && (
                        <text
                            x="200" y={200 - outerRadius - 4}
                            textAnchor="middle"
                            fill={brand.color}
                            fontSize="8"
                            fontWeight="bold"
                            style={{ textShadow: '0 0 5px black' }}
                        >
                            {brand.title.split(' ')[0]}
                        </text>
                    )}
                </g>
            );
         })}
      </g>

      {/* Center Label */}
      <circle cx="200" cy="200" r="30" fill="#111" stroke={color} strokeWidth="2" />
      <circle cx="200" cy="200" r="5" fill={color} />

      {/* Tone Arm */}
      <motion.g
         initial={{ rotate: -20 }}
         animate={{ rotate: isExpanded ? 0 : -20 }}
         transition={{ duration: 1, ease: "easeInOut" }}
         style={{ originX: "350px", originY: "50px" }}
      >
          <path d="M350 50 L300 200" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.5" />
          <circle cx="350" cy="50" r="10" fill={color} />
          <circle cx="300" cy="200" r="8" fill={color} />
      </motion.g>

    </svg>
  );
};

export default GramophoneIllustration;
