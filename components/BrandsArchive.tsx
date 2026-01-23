import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TerminalText from './TerminalText';

// --- DATA MODEL ---

export interface CardData {
  id: string;
  title: string;
  subtext: string;
  image?: string;
  link?: string;
}

export const CARDS: CardData[] = [
  {
    id: 'card-1',
    title: 'ZIRO',
    subtext: 'A brand advertisement centered on identifying security breaches and closing system loopholes. The piece creatively demonstrates how Ziro addresses these challenges and reinforces its commitment to trust, protection, and reliability.',
    image: '/assets/brands/brand-card-01.png'
  },
  {
    id: 'card-2',
    title: 'PLAYSTATION',
    subtext: 'A brand ad focused on connection and shared memories, highlighting how PlayStation brings friends and families together through play.',
    image: '/assets/brands/brand-card-02.png',
    link: 'https://drive.google.com/file/d/16RubFHF8flxaEKb_wPCeHn6bxMO70_u7/view?usp=sharing'
  },
  {
    id: 'card-3',
    title: 'OMINOUS HALLOWEEN',
    subtext: 'A themed Halloween animation designed to build anticipation and promote the upcoming Ominous manga release.',
    image: '/assets/brands/brand-card-03.jpg',
    link: 'https://drive.google.com/file/d/1ObS3kQMtgB0fiqh9fFJ-8TITPaLl7diB/view?usp=drive_link'
  },
  {
    id: 'card-4',
    title: 'OMINOUS CHRISTMAS',
    subtext: 'A short festive animation celebrating Christmas with the Limitless family, while announcing the manga’s Christmas release.',
    image: '/assets/brands/brand-card-04.png',
    link: 'https://drive.google.com/file/d/16Wak7Avme_A1UJVPBNidhhovVV1yfwcr/view?usp=drive_link'
  },
  {
    id: 'card-5',
    title: 'THE LIMITLESS MOMENT',
    subtext: 'A podcast intro animation created for official announcements, updates, and key communications from Limitless Studio.',
    image: '/assets/brands/brand-card-05.png',
    link: 'https://drive.google.com/file/d/1e9T3AwQvkREn4uDy_AdlJum8_BoBqWjU/view?usp=drive_link'
  },
  {
    id: 'card-6',
    title: 'TATAKAE LODGE',
    subtext: 'A character showcase animation developed to introduce and promote the Tatakae Lodge game project.',
    image: '/assets/brands/brand-card-06.png',
    link: 'https://drive.google.com/file/d/1ohGGDKoVGWFC5jZSPsCgIVGjLt4IhWUA/view?usp=drive_link'
  },
  {
    id: 'card-7',
    title: 'NKZ GOLD',
    subtext: 'A professional body spray advertisement focused on product introduction and brand positioning, executed in a classic, traditional advertising style.',
    image: '/assets/brands/brand-card-07.png',
    link: 'https://drive.google.com/file/d/1kjre5kciKW0sYxwfjv3e3EYrg_a_aI_7/view?usp=drive_link'
  },
  {
    id: 'card-8',
    title: 'OMINOUS ANIME OPENING',
    subtext: 'An anime-style opening sequence that further promotes the Ominous manga and offers a preview of what a full anime adaptation could look like.',
    image: '/assets/brands/brand-card-08.jpg',
    link: 'https://drive.google.com/file/d/1crdvQ1CvlxNUteHVVOmFXcN-g9ZEvBg-/view?usp=drive_link'
  },
  {
    id: 'card-9',
    title: 'ZEEFAS',
    subtext: 'A professional online marketplace advertisement emphasizing the strength of its escrow system in protecting both buyers and sellers.',
    image: '/assets/brands/brand-card-09.png',
    link: 'https://drive.google.com/file/d/1npwXL5vV_Sn_xHX5pMj_2XAO7y3PQvHA/view?usp=drive_link'
  },
  {
    id: 'card-10',
    title: 'MCDONALD’S',
    subtext: 'An Ominous-themed promotional animation centered on the richness and indulgent appeal of McDonald’s offerings.',
    image: '/assets/brands/brand-card-10.png',
    link: 'https://drive.google.com/file/d/1gvb9Q-p4jP49wJhC-iLDYkIWyyPZqvbr/view?usp=drive_link'
  }
];

// --- COMPONENTS ---

const BrandCard: React.FC<{ card: CardData; onClick: () => void; index: number }> = ({ card, onClick, index }) => {
  return (
    <motion.div
      layoutId={`card-container-${card.id}`}
      onClick={onClick}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex-shrink-0 w-[85vw] lg:w-[400px] aspect-video cursor-pointer snap-center"
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
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent z-10">
        <div className="text-[10px] tracking-[0.2em] font-bold text-[var(--accent)] uppercase mb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[var(--accent)]" />
            <span>ID: {card.id.split('-')[1].padStart(2, '0')}</span>
        </div>
        <h3 className="text-xl font-bold tracking-tighter text-white uppercase group-hover:translate-x-2 transition-transform duration-300">
          {card.title}
        </h3>
        <p className="text-[10px] text-white/60 tracking-wider uppercase mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-3">
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
                <div
                    className="text-[10px] tracking-[0.2em] font-bold text-[var(--accent)] uppercase mb-2 flex items-center gap-2"
                >
                    <div className="w-2 h-2 border border-[var(--accent)]" />
                    SYSTEM ID: {card.id.toUpperCase()}
                </div>

                <h2
                    className="text-4xl lg:text-5xl font-bold tracking-tighter text-white mb-4"
                >
                    {card.title}
                </h2>

                <div
                    className="h-[1px] w-full bg-white/10 my-6"
                />

                <p
                    className="text-sm leading-relaxed text-white/70 font-light"
                >
                    {card.subtext}
                </p>
             </div>

             {/* External Link Button */}
             {card.link && (
                 <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 mt-6 border border-[var(--accent)] text-[var(--accent)] text-xs tracking-widest uppercase hover:bg-[var(--accent)] hover:text-black transition-all duration-300"
                 >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                    WATCH AD
                 </a>
             )}

             <button
                onClick={onClose}
                className="text-[10px] tracking-widest uppercase text-[var(--accent)] hover:text-white transition-colors flex items-center gap-2 group w-fit mt-8"
             >
                 <span>← Return to Grid</span>
                 <div className="h-[1px] w-8 bg-[var(--accent)] group-hover:w-12 transition-all" />
             </button>
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
        <div className="h-full w-full flex flex-col relative px-6 lg:pl-16 lg:pr-24 overflow-hidden pt-20 lg:pt-0">
             {/* Background Decor */}
             <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--accent)] rounded-full blur-[150px] opacity-5 pointer-events-none" />

            {/* Close Button (Global) */}
            {!selectedCard && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 lg:top-0 lg:right-12 p-4 text-white/30 hover:text-[var(--accent)] transition-colors z-20"
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
                            <div className="w-full overflow-x-auto pb-12 custom-scrollbar flex items-center gap-6 px-4 lg:px-1 snap-x snap-mandatory lg:snap-none">
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
