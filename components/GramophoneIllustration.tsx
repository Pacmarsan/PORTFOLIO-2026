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

    // Get current rotation if available to prevent jump
    let currentRotation = 0;
    if (vinylRef.current.style.transform) {
         // anime.js stores transform in inline style usually
         // or we can read it via getComputedStyle, but anime.js has a helper usually.
         // Let's try to parse the style string or assume 0 if first run.
         // However, anime.js might use 'rotate' property directly.
         // Let's rely on anime.js `get` or just start from current visual state.

         // In anime.js, if we animate 'rotate', it tracks it.
         // But when we restart animation, it might reset.
         // We should read the current value.
         const transform = vinylRef.current.style.transform;
         const match = transform.match(/rotate\(([^)]+)deg\)/);
         if (match) {
             currentRotation = parseFloat(match[1]) % 360;
         }
    }

    // Stop existing animation
    if (animationRef.current) animationRef.current.pause();

    // Base rotation
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
  }, [isExpanded]); // Re-run if expansion state changes

  // Hover Effect Handling
  const handleRingHover = (id: string | null) => {
    setHoveredRing(id);
  };

  const handleRingClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent bubbling
    if (!isExpanded) {
        onInteract(); // First expand
    } else {
        onBrandSelect(id);
    }
  };

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
         {[...Array(10)].map((_, i) => (
             <circle
                key={`groove-${i}`}
                cx="200" cy="200" r={40 + i * 12}
                fill="none"
                stroke="#ffffff"
                strokeOpacity="0.05"
                strokeWidth="1"
             />
         ))}

         {/* Interactive Brand Rings */}
         {BRANDS.map((brand, index) => {
            const radius = 60 + (brand.ringIndex * 30);
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
                    {/* Hit Area (Transparent but captures events) */}
                    <circle
                        cx="200" cy="200" r={radius}
                        fill="transparent"
                        stroke="transparent"
                        strokeWidth="25"
                    />

                    {/* Visible Ring */}
                    <motion.circle
                        cx="200" cy="200" r={radius}
                        fill="none"
                        stroke={isSelected ? brand.color : (isHovered ? brand.color : color)}
                        strokeWidth={isSelected ? 4 : (isHovered ? 3 : 1)}
                        strokeOpacity={isSelected ? 1 : (isHovered ? 0.8 : 0.3)}
                        strokeDasharray={isSelected ? "none" : (index % 2 === 0 ? "4 4" : "10 10")}
                        animate={{
                            scale: isHovered ? 1.05 : 1,
                            strokeOpacity: isSelected ? 1 : (isHovered ? 0.8 : (selectedBrandId ? 0.1 : 0.3))
                        }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Label */}
                    {(isHovered || isSelected) && (
                        <text
                            x="200" y={200 - radius - 10}
                            textAnchor="middle"
                            fill={brand.color}
                            fontSize="10"
                            fontWeight="bold"
                            style={{ textShadow: '0 0 5px black' }}
                        >
                            {brand.title}
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
