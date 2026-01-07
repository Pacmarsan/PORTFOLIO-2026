import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { animate } from 'animejs';

// --- DATA MODEL ---

export type BrandStage = 'IDEA' | 'LIVE' | 'SCALING';

export interface BrandData {
  id: string;
  title: string;
  // Identity (Top Strand)
  concept: string;     // One-line thesis
  philosophy: string;  // Intent
  // Execution (Bottom Strand)
  medium: string;      // Game, Manga, SaaS, Brand, Media
  visualSystem: string; // Description
  stage: BrandStage;
}

export const BRANDS: BrandData[] = [
  {
    id: 'ziro-robotics',
    title: 'ZIRO ROBOTICS',
    concept: 'Autonomous delivery as an urban circulatory system.',
    philosophy: 'Efficiency without inhumanity; precision with character.',
    medium: 'Brand',
    visualSystem: 'High-contrast safety orange met with clean Swiss typography.',
    stage: 'SCALING'
  },
  {
    id: 'aether-systems',
    title: 'AETHER SYSTEMS',
    concept: 'Data visualization as a habitable environment.',
    philosophy: 'Complexity should be navigated, not just observed.',
    medium: 'SaaS',
    visualSystem: 'Atmospheric depth maps and translucent glass layers.',
    stage: 'LIVE'
  },
  {
    id: 'neo-fashion',
    title: 'NEO-TOKYO FASHION',
    concept: 'Clothing that exists only in the digital ether.',
    philosophy: 'Identity is fluid; physics is optional.',
    medium: 'Media',
    visualSystem: 'Holographic shaders and impossible material physics.',
    stage: 'IDEA'
  },
  {
    id: 'echo-sound',
    title: 'ECHO SOUND',
    concept: 'Audio spatialization for immersive narrative.',
    philosophy: 'Sound is the primary driver of emotional presence.',
    medium: 'SaaS',
    visualSystem: 'Generative waveforms reacting to real-time input.',
    stage: 'LIVE'
  },
  {
    id: 'cyber-dynamics',
    title: 'CYBER DYNAMICS',
    concept: 'The bridge between neural impulse and machine action.',
    philosophy: 'Seamless integration of biological and digital intent.',
    medium: 'Brand',
    visualSystem: 'Bio-digital wireframes and synaptic firing patterns.',
    stage: 'IDEA'
  },
  {
    id: 'orbit-heavy',
    title: 'ORBIT HEAVY',
    concept: 'Construction at the edge of the atmosphere.',
    philosophy: 'Uncompromising durability in zero-tolerance environments.',
    medium: 'Brand',
    visualSystem: 'Industrial warning stripes and heavy structural grids.',
    stage: 'SCALING'
  },
  {
    id: 'synapse-net',
    title: 'SYNAPSE NET',
    concept: 'A self-healing decentralized protocol.',
    philosophy: 'Resilience through distribution and redundancy.',
    medium: 'SaaS',
    visualSystem: 'Node-based constellations and cryptographic lattices.',
    stage: 'LIVE'
  },
  {
    id: 'chroma-labs',
    title: 'CHROMA LABS',
    concept: 'Computing at the speed of light.',
    philosophy: 'The spectrum is the new binary.',
    medium: 'R&D',
    visualSystem: 'Prismatic diffraction and spectral gradients.',
    stage: 'IDEA'
  },
  {
    id: 'void-security',
    title: 'VOID SECURITY',
    concept: 'Encryption as absolute negation.',
    philosophy: 'True security is the absence of information.',
    medium: 'SaaS',
    visualSystem: 'Vantablack voids and minimalist redaction bars.',
    stage: 'LIVE'
  },
  {
    id: 'pulse-engine',
    title: 'PULSE ENGINE',
    concept: 'Hypersonic transit for the connected world.',
    philosophy: 'Distance is a failure of velocity.',
    medium: 'Brand',
    visualSystem: 'Motion-blurred vectors and aerodynamic curves.',
    stage: 'SCALING'
  }
];

// --- COMPONENTS ---

interface BrandsArchiveProps {
    selectedBrandId: string | null;
    onClose: () => void;
    onSelect?: (id: string) => void;
}

const BrandRung: React.FC<{
    brand: BrandData;
    isSelected: boolean;
    onSelect: () => void;
}> = ({ brand, isSelected, onSelect }) => {

    const stageStyle = () => {
        switch (brand.stage) {
            case 'IDEA': return { borderBottomStyle: 'dashed', borderBottomWidth: '1px' };
            case 'LIVE': return { borderBottomStyle: 'solid', borderBottomWidth: '1px' };
            case 'SCALING': return { borderBottomStyle: 'double', borderBottomWidth: '4px' };
            default: return {};
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{
                opacity: 1,
                scaleY: 1,
                width: isSelected ? '500px' : '40px', // Expand inline
                marginRight: isSelected ? '40px' : '20px',
                marginLeft: isSelected ? '40px' : '20px',
            }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`relative flex flex-col justify-center items-center h-[400px] shrink-0 z-10`}
            onClick={onSelect}
        >
            {/* Rung Connector */}
            <div className={`absolute top-0 bottom-0 w-[1px] bg-[var(--accent)] transition-opacity duration-300 ${isSelected ? 'opacity-0' : 'opacity-40 hover:opacity-100 cursor-pointer'}`}>
                 <div
                   className="w-full h-full border-l border-[var(--accent)]"
                   style={{
                     borderLeftStyle: brand.stage === 'IDEA' ? 'dashed' : (brand.stage === 'SCALING' ? 'double' : 'solid'),
                     borderLeftWidth: brand.stage === 'SCALING' ? '3px' : '1px'
                   }}
                 />
            </div>

             {/* Brand Name Label (Rotated when collapsed) */}
            {!isSelected && (
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-[10px] tracking-[0.2em] font-bold text-white/50 origin-center pointer-events-none">
                    {brand.title}
                 </div>
            )}

            {/* EXPANDED CONTENT */}
            <AnimatePresence>
                {isSelected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="w-full h-full flex flex-col py-8 px-8 border border-[var(--accent)] bg-[#050505] text-left overflow-hidden cursor-default relative z-20"
                        onClick={(e) => e.stopPropagation()} // Prevent collapse on content click if desired, but user can click close button or toggle
                    >
                         <button
                           onClick={(e) => { e.stopPropagation(); onSelect(); }}
                           className="absolute top-4 right-4 text-[var(--accent)] hover:text-white transition-colors"
                         >
                           ✕
                         </button>

                         {/* 1. Brand Name */}
                         <h3 className="text-3xl font-bold tracking-tighter text-white uppercase mb-4">{brand.title}</h3>

                         {/* 2. Stage Indicator (Visual) */}
                         {/* "No labels, pills, or badges may be used." */}
                         <div className="w-full border-b border-[var(--accent)] opacity-50 mb-6" style={stageStyle() as any} />

                         {/* 3. Concept */}
                         <p className="text-xl text-white font-serif italic mb-6 leading-tight">"{brand.concept}"</p>

                         {/* 4. Identity Explanation (Philosophy) */}
                         <p className="text-xs text-white/60 font-mono uppercase tracking-widest mb-auto">{brand.philosophy}</p>

                         {/* 5. Execution Explanation */}
                         <div className="mt-8 pt-4 border-t border-[var(--accent)]/20">
                             <div className="text-sm font-bold text-[var(--accent)] uppercase mb-1">{brand.medium}</div>
                             <p className="text-xs text-white/80 font-mono leading-relaxed">{brand.visualSystem}</p>
                         </div>
                    </motion.div>
                )}
            </AnimatePresence>

             {/* Top/Bottom Connection Nodes */}
            <div className="absolute top-0 w-2 h-2 bg-[var(--accent)] rounded-full -translate-y-1/2" />
            <div className="absolute bottom-0 w-2 h-2 bg-[var(--accent)] rounded-full translate-y-1/2" />

        </motion.div>
    );
};

// Simplified Strand: Two continuous lines that define the boundaries of the genome
const SimpleStrands: React.FC<{ width: number }> = ({ width }) => {

    useEffect(() => {
        // Subtle "genome is alive" motion
        animate('.strand-line', {
            strokeDashoffset: [0, -20],
            duration: 2000,
            loop: true,
            easing: 'linear'
        });
    }, []);

    return (
        <svg
            className="absolute top-0 left-0 h-full pointer-events-none z-0"
            style={{ width: width + 100 }}
            preserveAspectRatio="none"
            viewBox={`0 0 ${width + 100} 600`}
        >
            <defs>
                 <pattern id="helix-pattern" x="0" y="0" width="100" height="40" patternUnits="userSpaceOnUse">
                     <path d="M0 20 Q 25 0, 50 20 T 100 20" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.1" />
                 </pattern>
            </defs>

            {/* Top Strand - Identity (y=100 matches top of 400px rung centered at 300) */}
            <line
                x1="0" y1="100" x2="100%" y2="100"
                stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.5"
                strokeDasharray="10 5"
                className="strand-line"
            />
            <text x="20" y="90" fill="var(--accent)" fontSize="10" letterSpacing="0.2em" opacity="0.5">IDENTITY STRAND</text>

            {/* Bottom Strand - Execution (y=500 matches bottom of 400px rung centered at 300) */}
            <line
                x1="0" y1="500" x2="100%" y2="500"
                stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.5"
                strokeDasharray="10 5"
                className="strand-line"
            />
            <text x="20" y="520" fill="var(--accent)" fontSize="10" letterSpacing="0.2em" opacity="0.5">EXECUTION STRAND</text>

            {/* DNA Helix Background Effect (Subtle) */}
            <rect x="0" y="100" width="100%" height="400" fill="url(#helix-pattern)" opacity="0.05" className="text-[var(--accent)]" />
        </svg>
    );
};


const BrandsArchive: React.FC<BrandsArchiveProps> = ({ selectedBrandId, onClose, onSelect }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Wheel hijacking for horizontal scroll
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
             // If selected, allow normal interaction if inside content?
             // But content is small.
             // We can lock horizontal scroll on focus if desired.
             // "Horizontal genome motion pauses" -> user stops scrolling.

             if (selectedBrandId) return; // Pause scroll logic when focused?

             e.preventDefault();
             container.scrollLeft += e.deltaY;
        };

        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, [selectedBrandId]);

    // Calculate width for strands
    const totalWidth = BRANDS.length * 100 + (selectedBrandId ? 500 : 0) + 500; // Buffer

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full relative flex items-center overflow-hidden bg-[#050505]"
        >
            {/* Horizontal Scrolling Container */}
            <div
                ref={scrollContainerRef}
                className="w-full h-full overflow-x-auto overflow-y-hidden flex items-center custom-scrollbar relative pl-24 pr-24 hide-scrollbar"
                style={{ scrollBehavior: 'smooth' }}
            >
                {/* Strands Background */}
                <SimpleStrands width={Math.max(2000, totalWidth)} />

                <div className="flex items-center h-[600px] relative z-10 pl-12 pr-12 gap-0">
                    {BRANDS.map((brand) => (
                        <BrandRung
                            key={brand.id}
                            brand={brand}
                            isSelected={selectedBrandId === brand.id}
                            onSelect={() => onSelect?.(brand.id === selectedBrandId ? '' : brand.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            {!selectedBrandId && (
                <div className="absolute bottom-8 right-8 text-[10px] text-white/30 tracking-widest animate-pulse pointer-events-none">
                    SCROLL &gt;&gt;&gt;
                </div>
            )}

             {/* Back / Close Focus Button */}
             {selectedBrandId && (
                <button
                    onClick={() => onSelect?.('')}
                    className="absolute top-8 right-8 text-[10px] text-[var(--accent)] tracking-widest border border-[var(--accent)] px-4 py-2 hover:bg-[var(--accent)] hover:text-black transition-colors uppercase z-50"
                >
                    Close Focus
                </button>
             )}

        </motion.div>
    );
};

export default BrandsArchive;
