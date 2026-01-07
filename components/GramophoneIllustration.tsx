import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

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
  selectedBrandId,
}) => {
  const vinylRef = useRef<SVGGElement>(null);
  const vinylAnimRef = useRef<any>(null);

  // Vinyl Rotation Logic
  useEffect(() => {
    if (!vinylRef.current) return;

    try {
        if (!vinylAnimRef.current) {
            vinylAnimRef.current = animate(vinylRef.current, {
                rotate: 360,
                duration: 8000,
                easing: 'linear',
                loop: true
            });
        }
    } catch (err) {
        // Ignore
    }

    return () => {
        if (vinylAnimRef.current && typeof vinylAnimRef.current.pause === 'function') {
            vinylAnimRef.current.pause();
        }
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative pointer-events-none">
      <svg
        viewBox="-200 -200 400 400"
        className="w-[120%] h-[120%] lg:w-full lg:h-full max-w-[800px] max-h-[800px]"
        fill="none"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* --- BASE LAYER --- */}
        <g id="base-layer" opacity={0.6}>
           <ellipse cx="0" cy="0" rx="105" ry="105" fill="#050505" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
           <path
             d="M 120 -80 L 130 -90 L 140 -80 L 140 50 L 130 60 L 120 50 Z"
             fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0.4"
           />
           <circle cx="130" cy="-85" r="5" fill={color} fillOpacity="0.2" />
           <line x1="130" y1="-85" x2="90" y2="20" stroke={color} strokeWidth="1" />
           <path d="M 85 15 L 95 25 L 80 40 L 70 30 Z" fill={color} fillOpacity="0.5" />
        </g>

        {/* --- KINETIC LAYER --- */}
        <g ref={vinylRef} id="vinyl-group">
            <circle cx="0" cy="0" r="100" fill="#000" stroke="none" />
            {[20, 35, 50, 65, 80, 90, 95].map((r, i) => (
                <circle
                    key={r}
                    cx="0" cy="0" r={r}
                    fill="none"
                    stroke={color}
                    strokeWidth={i % 2 === 0 ? 0.5 : 1}
                    strokeOpacity={0.1 + (i * 0.05)}
                    strokeDasharray={i % 2 === 0 ? "none" : "10 5"}
                />
            ))}
            <circle cx="0" cy="0" r="15" fill={color} fillOpacity="0.1" />
            <circle cx="0" cy="0" r="2" fill="white" />
        </g>
      </svg>
    </div>
  );
};

export default GramophoneIllustration;
