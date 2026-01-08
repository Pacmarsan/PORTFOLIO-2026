import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TerminalText from './TerminalText';

// --- DATA MODEL ---

export interface CardData {
  id: string;
  title: string;
  subtext: string;
  image?: string;
}

export const CARDS: CardData[] = Array.from({ length: 10 }, (_, i) => {
  let image: string | undefined;
  if (i === 0) image = '/assets/card-1-visual.png';
  if (i === 1) image = '/assets/card-2-visual.jpg';
  if (i === 2) image = '/assets/special-image.jpg';
  if (i === 4) image = '/assets/card-5-visual.png';

  return {
    id: `card-${i + 1}`,
    title: `Card ${i + 1}`,
    subtext: `System Entity ${i + 1} // Description Placeholder`,
    image
  };
});

// --- COMPONENTS ---

const BrandCard: React.FC<{ card: CardData; onClick: () => void; index: number }> = ({ card, onClick, index }) => {
  return (
    <motion.div
      layoutId={`card-container-${card.id}`}
      onClick={onClick}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex-shrink-0 w-[300px] lg:w-[400px] aspect-video cursor-pointer"
    >
      {/* Background / Image Placeholder */}
      <div className="absolute inset-0 bg-white/5 border border-white/10 group-hover:border-[var(--accent)] group-hover:bg-white/10 transition-all duration-300 overflow-hidden">
        {card.image ? (
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
            <image
              href={card.image}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
            />
          </svg>
        ) : (
          <>
            {/* Placeholder Diagonal Lines or Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #ffffff 10px, #ffffff 11px)' }} />

            {/* Center Label for placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] tracking-widest text-white/20 group-hover:text-[var(--accent)] transition-colors uppercase">
                    Image Signal Lost
                </span>
            </div>
          </>
        )}
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
        <div className="text-[10px] tracking-[0.2em] font-bold text-[var(--accent)] uppercase mb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[var(--accent)]" />
            <span>ID: {card.id.split('-')[1].padStart(2, '0')}</span>
        </div>
        <h3 className="text-xl font-bold tracking-tighter text-white uppercase group-hover:translate-x-2 transition-transform duration-300">
          {card.title}
        </h3>
        <p className="text-[10px] text-white/60 tracking-wider uppercase mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {card.subtext}
        </p>
      </div>
    </motion.div>
  );
};

const BrandDetail: React.FC<{ card: CardData; onClose: () => void }> = ({ card, onClose }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 h-full items-center lg:items-start p-4 lg:p-0 w-full">
        {/* Left: Image Area (Large) */}
        <motion.div
            layoutId={`card-container-${card.id}`}
            className="w-full lg:w-1/2 aspect-video bg-white/5 border border-white/10 relative overflow-hidden"
        >
             {card.image ? (
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
                    <image
                        href={card.image}
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        preserveAspectRatio="xMidYMid slice"
                    />
                </svg>
             ) : (
                <>
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #ffffff 10px, #ffffff 11px)' }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs tracking-[0.3em] text-white/20 uppercase">
                            Visual Feed Offline
                        </span>
                    </div>
                </>
             )}
        </motion.div>

        {/* Right: Metadata */}
        <div className="flex-1 space-y-8 mt-4 lg:mt-0">
             <div>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-[10px] tracking-[0.2em] font-bold text-[var(--accent)] uppercase mb-2 flex items-center gap-2"
                >
                    <div className="w-2 h-2 border border-[var(--accent)]" />
                    SYSTEM ID: {card.id.toUpperCase()}
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl lg:text-5xl font-bold tracking-tighter text-white mb-4"
                >
                    <TerminalText text={card.title} />
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="h-[1px] w-full bg-white/10 my-6"
                />

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-sm leading-relaxed text-white/70 font-light"
                >
                    {card.subtext}
                    <br /><br />
                    ADDITIONAL DATA: This sector currently holds placeholder information. In a full deployment, this area would contain brand philosophy, visual guidelines, or architectural specifications.
                </motion.p>
             </div>

             <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={onClose}
                className="text-[10px] tracking-widest uppercase text-[var(--accent)] hover:text-white transition-colors flex items-center gap-2 group w-fit mt-8"
             >
                 <span>← Return to Grid</span>
                 <div className="h-[1px] w-8 bg-[var(--accent)] group-hover:w-12 transition-all" />
             </motion.button>
        </div>
    </div>
  );
};

// --- MAIN ARCHIVE COMPONENT ---

interface BrandsArchiveProps {
    selectedBrandId: string | null;
    onClose: () => void;
    onSelect?: (id: string) => void;
}

const BrandsArchive: React.FC<BrandsArchiveProps> = ({ onClose }) => {
    const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

    return (
        <div className="h-full w-full flex flex-col relative pl-8 lg:pl-16 pr-12 lg:pr-24 overflow-hidden">
             {/* Background Decor */}
             <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--accent)] rounded-full blur-[150px] opacity-5 pointer-events-none" />

            {/* Close Button (Global) */}
            {!selectedCard && (
                <button
                    onClick={onClose}
                    className="absolute top-0 right-8 lg:right-12 p-4 text-white/30 hover:text-[var(--accent)] transition-colors z-20"
                    aria-label="Close Archive"
                >
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            )}

            <div className="relative z-10 w-full h-full flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    {selectedCard ? (
                        <motion.div
                            key="detail"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full h-full flex items-center"
                        >
                            <BrandDetail card={selectedCard} onClose={() => setSelectedCard(null)} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full h-full flex flex-col justify-center"
                        >
                             <div className="mb-8">
                                <h1 className="text-3xl font-bold tracking-tighter text-white mb-1">BRANDS</h1>
                                <div className="text-[10px] tracking-[0.3em] text-[var(--accent)] uppercase font-bold">
                                    Strategic Identifiers
                                </div>
                            </div>

                            {/* Horizontal Scroll Container */}
                            <div className="w-full overflow-x-auto pb-12 custom-scrollbar flex items-center gap-6 px-1">
                                {CARDS.map((card, index) => (
                                    <BrandCard
                                        key={card.id}
                                        card={card}
                                        index={index}
                                        onClick={() => setSelectedCard(card)}
                                    />
                                ))}
                                {/* Padding to allow last card to be fully seen/centered if needed */}
                                <div className="w-12 flex-shrink-0" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default BrandsArchive;
