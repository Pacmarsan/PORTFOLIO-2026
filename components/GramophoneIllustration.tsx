import React, { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { BRANDS } from './BrandsArchive';
import { HoloCard } from './HoloCard';

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
  const orbitalRef = useRef<any>({ angle: 0 });
  const [cards, setCards] = useState<any[]>([]);
  const animRef = useRef<any>(null);
  const vinylAnimRef = useRef<any>(null);
  const prevSelectedRef = useRef<string | null>(null);

  // Geometry Constants
  const RADIUS_X = 140;
  const RADIUS_Y = 60;
  const CENTER_Y_OFFSET = -20;

  // Initialize Cards
  useEffect(() => {
    const initialCards = BRANDS.map((brand, i) => {
        const angleStep = (Math.PI * 2) / BRANDS.length;
        const angle = i * angleStep;
        return {
            ...brand,
            angleOffset: angle,
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            zIndex: 0
        };
    });
    setCards(initialCards);
  }, []);

  // --- ORBITAL ANIMATION LOOP ---
  useEffect(() => {
    try {
        // Handle "Open" Transition and "Idle" Loop
        // If selected, we stop the loop and let the Focus Effect handle it.
        // If NOT selected, we want the loop running.

        // Check transition from Selected -> Null (Closing)
        const isClosing = prevSelectedRef.current !== null && selectedBrandId === null;

        if (selectedBrandId) {
            // PAUSE LOOP
            if (animRef.current && typeof animRef.current.pause === 'function') {
                animRef.current.pause();
            }
        } else {
             // START/RESUME LOOP
             // If we are just starting or resuming from pause, play.
             if (animRef.current && typeof animRef.current.play === 'function') {
                 // But wait, if we are "Closing", we shouldn't snap.
                 // The Focus Effect (below) will handle the animation *back* to orbit state.
                 // We should only resume the loop AFTER that animation is done?
                 // Or we can let the loop resume but we need to match the values.

                 // Strategy: The loop updates `orbitalRef.current.angle`.
                 // When we resume, it continues from where it left off.
                 // This ensures the cards are at the correct "orbit positions" relative to time.
                 // BUT their visual state (React State) is currently "Focused" (center screen).
                 // If we just play(), the next onUpdate will calculate orbit positions and SNAP them there.

                 if (!isClosing) {
                    animRef.current.play();
                 }
             }
        }

        if (!animRef.current) {
            animRef.current = animate(orbitalRef.current, {
              angle: Math.PI * 2,
              duration: 25000,
              easing: 'linear',
              loop: true,
              autoplay: !selectedBrandId,
              onUpdate: () => {
                 // If we are currently closing (animating back), don't let the loop override?
                 // We need a flag or logic here.
                 // Actually, simpler: The loop drives the "Ideal Orbit State".
                 // We can render that directly if no transition is happening.

                 const currentGlobalAngle = orbitalRef.current.angle;

                 setCards(prevCards => prevCards.map(card => {
                    const theta = currentGlobalAngle + card.angleOffset;

                    const x = Math.cos(theta) * RADIUS_X;
                    const y = Math.sin(theta) * RADIUS_Y + CENTER_Y_OFFSET;
                    const sinVal = Math.sin(theta);

                    const scale = 1 + (sinVal * 0.3);
                    const opacity = 0.5 + ((sinVal + 1) / 2) * 0.5;
                    const zIndex = sinVal;

                    return { ...card, x, y, scale, opacity, zIndex };
                 }));
              }
            });
        }
    } catch (err) {
        console.error("AnimeJS Orbital Error:", err);
    }
  }, [selectedBrandId]);

  // --- TRANSITION MANAGER (Focus & Unfocus) ---
  useEffect(() => {
    // If state hasn't changed effectively, do nothing (or init)
    if (prevSelectedRef.current === selectedBrandId) return;

    const isOpening = !!selectedBrandId;
    const isClosing = !selectedBrandId && prevSelectedRef.current !== null;

    prevSelectedRef.current = selectedBrandId;

    if (!isOpening && !isClosing) return;

    try {
        const targets = cards.map(c => ({...c}));

        // If Opening: Animate TO Focus Targets
        // If Closing: Animate FROM Focus Targets TO Orbital Targets (Current calculated orbit)

        let animationParams = {};

        if (isOpening) {
             animationParams = {
                x: (t: any) => (t.id === selectedBrandId ? 0 : t.x),
                y: (t: any) => (t.id === selectedBrandId ? 0 : t.y),
                scale: (t: any) => (t.id === selectedBrandId ? 2.0 : 0.5),
                opacity: (t: any) => (t.id === selectedBrandId ? 1 : 0.1),
                duration: 1000,
                easing: 'outExpo'
             };
        } else {
             // CLOSING
             // We want to animate back to where they *should* be in the orbit.
             // We can calculate the target destination based on current `orbitalRef.angle`.

             animationParams = {
                 x: (t: any) => {
                     const theta = orbitalRef.current.angle + t.angleOffset;
                     return Math.cos(theta) * RADIUS_X;
                 },
                 y: (t: any) => {
                     const theta = orbitalRef.current.angle + t.angleOffset;
                     return Math.sin(theta) * RADIUS_Y + CENTER_Y_OFFSET;
                 },
                 scale: (t: any) => {
                     const theta = orbitalRef.current.angle + t.angleOffset;
                     const sinVal = Math.sin(theta);
                     return 1 + (sinVal * 0.3);
                 },
                 opacity: (t: any) => {
                     const theta = orbitalRef.current.angle + t.angleOffset;
                     const sinVal = Math.sin(theta);
                     return 0.5 + ((sinVal + 1) / 2) * 0.5;
                 },
                 duration: 800,
                 easing: 'inOutQuad', // Smooth return
                 complete: () => {
                     // Once back in place, resume the orbit loop
                     if (animRef.current) animRef.current.play();
                 }
             };
        }

        const anim = animate(targets, {
            ...animationParams,
            onUpdate: () => {
                setCards(prev => prev.map((item, index) => {
                    const target = targets[index];
                    return {
                        ...item,
                        x: target.x,
                        y: target.y,
                        scale: target.scale,
                        opacity: target.opacity
                    };
                }));
            }
        });

        return () => {
            if (anim && typeof anim.pause === 'function') anim.pause();
        };

    } catch (err) {
        console.error("AnimeJS Transition Error:", err);
    }

  }, [selectedBrandId, cards]); // Depend on cards to get current state


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

        if (selectedBrandId) {
             if (vinylAnimRef.current && typeof vinylAnimRef.current.pause === 'function') vinylAnimRef.current.pause();
        } else {
             // Resume vinyl only if NOT closing (wait for return animation?)
             // Actually vinyl can start spinning immediately, it looks cool.
             if (vinylAnimRef.current && typeof vinylAnimRef.current.play === 'function') vinylAnimRef.current.play();
        }
    } catch (err) {
        // Ignore
    }
  }, [selectedBrandId]);


  const sortedCards = [...cards].sort((a, b) => {
      if (a.id === selectedBrandId) return 1000;
      if (b.id === selectedBrandId) return -1000;
      return a.zIndex - b.zIndex;
  });

  return (
    <div className="w-full h-full flex items-center justify-center relative">
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
        <g id="base-layer" opacity={selectedBrandId ? 0.2 : 0.6} style={{ transition: 'opacity 1s' }}>
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
        <g ref={vinylRef} id="vinyl-group" opacity={selectedBrandId ? 0.2 : 1} style={{ transition: 'opacity 1s' }}>
            {/* Vinyl Body */}
            <circle cx="0" cy="0" r="100" fill="#050505" stroke="none" />

            {/* Brand Mascot / Label Center */}
            <defs>
                <clipPath id="center-label-clip">
                    <circle cx="0" cy="0" r="30" />
                </clipPath>
            </defs>
            <image
                href="/assets/ziro-new.png"
                x="-30" y="-30" width="60" height="60"
                clipPath="url(#center-label-clip)"
                preserveAspectRatio="xMidYMid slice"
                opacity="0.9"
            />
            {/* Label Gloss */}
            <circle cx="0" cy="0" r="30" fill="url(#gloss-gradient)" opacity="0.3" style={{ mixBlendMode: 'overlay' }} />

            {/* Grooves */}
            {[35, 50, 65, 80, 90, 95].map((r, i) => (
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

            {/* Spindle */}
            <circle cx="0" cy="0" r="3" fill="#fff" />
        </g>

        {/* --- ORBITAL LAYER --- */}
        {sortedCards.map((card) => (
             <HoloCard
               key={card.id}
               x={card.x}
               y={card.y}
               scale={card.scale}
               opacity={card.opacity}
               logoUrl={card.image}
               label={card.subtext}
               color={card.color}
               isFocused={selectedBrandId === card.id}
               onClick={() => {
                   if (selectedBrandId === card.id) return;
                   onInteract();
                   onBrandSelect(card.id);
               }}
             />
        ))}

      </svg>
    </div>
  );
};

export default GramophoneIllustration;
