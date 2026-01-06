import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TerminalText from './TerminalText';

export interface BrandData {
  id: string;
  title: string;
  subtext: string;
  descriptor: string;
  description: string;
  image: string; // URL to image
  color: string;
  ringIndex: number; // 0 is outer, higher is inner
}

export const BRANDS: BrandData[] = [
  {
    id: 'ziro-robotics',
    title: 'ZIRO ROBOTICS',
    subtext: 'AUTONOMOUS LOGISTICS',
    descriptor: 'BRAND IDENTITY & SYSTEM DESIGN',
    description: 'A complete visual overhaul for the world\'s leading autonomous delivery fleet. The identity focuses on precision, reliability, and the seamless integration of AI into urban environments.',
    image: '/assets/ziro-robot.png',
    color: '#00f5ff',
    ringIndex: 0
  },
  {
    id: 'aether-systems',
    title: 'AETHER SYSTEMS',
    subtext: 'CLOUD INFRASTRUCTURE',
    descriptor: 'WEB PLATFORM & DASHBOARD',
    description: 'Redefining how developers visualize complex data streams. Aether Systems needed a dashboard that felt like a cockpit, not a spreadsheet.',
    image: '/assets/global-reach-portrait.png',
    color: '#7c5cff',
    ringIndex: 1
  },
  {
    id: 'neo-fashion',
    title: 'NEO-TOKYO FASHION',
    subtext: 'DIGITAL WEARABLES',
    descriptor: 'METAVERSE CAMPAIGN',
    description: 'Launching a digital-only clothing line requires breaking the laws of physics. We created a gravity-defying promotional video series.',
    image: '/assets/specter-cover.jpg',
    color: '#ff2a6d',
    ringIndex: 2
  },
  {
    id: 'echo-sound',
    title: 'ECHO SOUND',
    subtext: 'SPATIAL AUDIO SDK',
    descriptor: 'PRODUCT MARKETING',
    description: 'Visualizing sound is impossible, so we visualized the feeling of sound. Using generative wave patterns controlled by audio input.',
    image: '/assets/all-hallows-eve-cover.jpg',
    color: '#ffb703',
    ringIndex: 3
  },
  {
    id: 'cyber-dynamics',
    title: 'CYBER DYNAMICS',
    subtext: 'NEURAL INTERFACES',
    descriptor: 'UX/UI RESEARCH',
    description: 'Designing the interface between human thought and machine execution. Minimal latency, maximum clarity.',
    image: '/assets/studio-limitless-logo.png',
    color: '#00ff9c',
    ringIndex: 4
  },
  {
    id: 'orbit-heavy',
    title: 'ORBIT HEAVY INDUSTRIES',
    subtext: 'ORBITAL CONSTRUCTION',
    descriptor: 'CORPORATE BRANDING',
    description: 'A heavy industrial brand for zero-gravity environments. Robust, high-contrast, and safety-focused visual systems.',
    image: '/assets/ziro-robot.png',
    color: '#ff5e5e',
    ringIndex: 5
  },
  {
    id: 'synapse-net',
    title: 'SYNAPSE NET',
    subtext: 'DECENTRALIZED WEB',
    descriptor: 'PROTOCOL DESIGN',
    description: 'Visualizing the invisible threads that connect the new internet. Organic, self-organizing patterns meet rigid cryptographic structures.',
    image: '/assets/global-reach-portrait.png',
    color: '#9d4edd',
    ringIndex: 6
  },
  {
    id: 'chroma-labs',
    title: 'CHROMA LABS',
    subtext: 'OPTICAL COMPUTING',
    descriptor: 'R&D VISUALIZATION',
    description: 'Light-based computing needs a light-based identity. Using prismatic diffraction and spectral analysis as core brand elements.',
    image: '/assets/specter-cover.jpg',
    color: '#ffffff',
    ringIndex: 7
  },
  {
    id: 'void-security',
    title: 'VOID SECURITY',
    subtext: 'QUANTUM ENCRYPTION',
    descriptor: 'SECURE SYSTEMS',
    description: 'Security you can feel. Dark, impenetrable, and absolute. The visual language of silence and negation.',
    image: '/assets/all-hallows-eve-cover.jpg',
    color: '#1a1a1a',
    ringIndex: 8
  },
  {
    id: 'pulse-engine',
    title: 'PULSE ENGINE',
    subtext: 'HYPERLOOP TRANSPORT',
    descriptor: 'INDUSTRIAL DESIGN',
    description: 'Speed visualized. Streaks, blurs, and the Doppler effect frozen in time for the next generation of transit.',
    image: '/assets/studio-limitless-logo.png',
    color: '#ff004c',
    ringIndex: 9
  }
];

const BrandDetail: React.FC<{ brand: BrandData }> = ({ brand }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 h-full items-center lg:items-start p-4 lg:p-0">
      {/* Left: Brand Hero Image */}
      <motion.div
        key={brand.id}
        initial={{ opacity: 0, scale: 0.9, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.9, x: -20 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[400px] lg:w-1/2 shrink-0 relative aspect-square lg:aspect-auto lg:h-[400px] bg-white/5 rounded-sm overflow-hidden"
      >
        <img
            src={brand.image}
            alt={brand.title}
            className="w-full h-full object-cover opacity-80 mix-blend-screen"
        />
        <div className="absolute inset-0 border border-white/10" />

        {/* Decorative overlay */}
        <div className="absolute top-4 left-4 text-[10px] text-white/40 tracking-widest">{brand.id.toUpperCase()}</div>
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[var(--accent)]" />
      </motion.div>

      {/* Right: Metadata */}
      <div className="flex-1 space-y-8 mt-4 lg:mt-0 flex flex-col justify-center h-full">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[10px] tracking-[0.2em] font-bold text-[var(--accent)] uppercase mb-2 flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-[var(--accent)]" />
            {brand.subtext}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl lg:text-5xl font-bold tracking-tighter text-white mb-4"
          >
            <TerminalText text={brand.title} />
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xs tracking-[0.2em] text-white/40 uppercase border-l-2 border-white/20 pl-4"
          >
            {brand.descriptor}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="h-[1px] w-full bg-white/10"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm leading-relaxed text-white/70 font-light"
        >
          {brand.description}
        </motion.p>
      </div>
    </div>
  );
};

interface BrandsArchiveProps {
    selectedBrandId: string | null;
    onClose: () => void;
    onSelect?: (id: string) => void;
}

const BrandsArchive: React.FC<BrandsArchiveProps> = ({ selectedBrandId, onClose, onSelect }) => {
  const selectedBrand = BRANDS.find(b => b.id === selectedBrandId);

  return (
    <div className="h-full w-full flex flex-col relative pl-8 lg:pl-16 pr-12 lg:pr-24 overflow-y-auto lg:overflow-hidden">
        {/* Background Decor */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-[150px] opacity-[0.03] pointer-events-none" />

        <div className="relative z-10 w-full h-full flex flex-col justify-center">
            <AnimatePresence mode="wait">
                {selectedBrand ? (
                    <div className="w-full h-full flex flex-col">
                        <button
                            onClick={() => onSelect?.('')}
                            className="w-fit mb-8 text-[10px] tracking-widest text-white/40 hover:text-white uppercase transition-colors"
                        >
                            ← Back to List
                        </button>
                        <BrandDetail key={selectedBrand.id} brand={selectedBrand} />
                    </div>
                ) : (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full flex flex-col justify-center items-start space-y-8 h-full overflow-y-auto custom-scrollbar pr-4"
                    >
                         <div className="text-[10px] tracking-[0.4em] uppercase text-white/60 mb-8 border-b border-white/10 pb-2 w-full sticky top-0 bg-[#050505] z-10">Select a Brand</div>
                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full pb-8">
                            {BRANDS.map((brand, i) => (
                                <motion.button
                                    key={brand.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => onSelect?.(brand.id)}
                                    className="group text-left p-6 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[var(--accent)]/50 transition-all duration-300"
                                >
                                    <div className="text-[9px] tracking-[0.2em] text-[var(--accent)] uppercase mb-2 group-hover:text-white transition-colors">{brand.subtext}</div>
                                    <div className="text-xl font-bold text-white tracking-tight">{brand.title}</div>
                                </motion.button>
                            ))}
                         </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* Close button handled by parent layout mostly, but we can add one if needed */}
         <button
            onClick={onClose}
            className="absolute top-0 right-8 lg:right-12 p-4 text-white/30 hover:text-[var(--accent)] transition-colors z-20"
            aria-label="Close Brands"
        >
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    </div>
  );
};

export default BrandsArchive;
