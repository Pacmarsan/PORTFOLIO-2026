
import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { Phase } from '../types';

interface MorphingShapeProps {
  activePhase: Phase;
}

const MorphingShape: React.FC<MorphingShapeProps> = ({ activePhase }) => {
  const pathRef = useRef<SVGPathElement>(null);
  
  const SHAPES = {
    hero: "M500,100 A400,400 0 1,1 500,900 A400,400 0 1,1 500,100 M500,200 A300,300 0 1,0 500,800 A300,300 0 1,0 500,200",
    worlds: "M500,50 L950,500 L500,950 L50,500 Z M500,300 L700,500 L500,700 L300,500 Z",
    brands: "M100,100 L900,100 L900,900 L100,900 Z M200,200 L800,200 L800,800 L200,800 Z",
    experiences: "M50,400 L450,400 L550,600 L150,600 Z M550,400 L950,400 L850,600 L450,600 Z",
    products: "M400,400 L600,400 L600,600 L400,600 Z M100,100 L200,100 L200,200 L100,200 Z M800,800 L900,800 L900,900 L800,900 Z",
    contacts: "M500,100 L846,300 L846,700 L500,900 L154,700 L154,300 Z M500,250 L673,350 L673,650 L500,750 L327,650 L327,350 Z"
  };

  useEffect(() => {
    if (!pathRef.current) return;
    
    animate(pathRef.current, {
      d: SHAPES[activePhase.name],
      duration: 1200,
      easing: 'easeInOutQuart'
    });
  }, [activePhase.name]);

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10 px-8 py-24 lg:px-48 lg:py-32">
      <div className="relative w-full h-full max-w-[800px] max-h-[800px] border border-white/5 flex items-center justify-center">
        {/* HUD Brackets */}
        <div className="hud-bracket-tl"></div>
        <div className="hud-bracket-tr"></div>
        <div className="hud-bracket-bl"></div>
        <div className="hud-bracket-br"></div>
        
        <svg 
          id="core-shape" 
          viewBox="0 0 1000 1000" 
          className="w-4/5 h-4/5 opacity-40 filter drop-shadow-[0_0_15px_var(--accent-glow)]"
        >
          <path
            ref={pathRef}
            d={SHAPES.hero}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
            className="transition-colors duration-1000"
          />
        </svg>
      </div>
    </div>
  );
};

export default MorphingShape;
