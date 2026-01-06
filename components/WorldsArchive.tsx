import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TerminalText from './TerminalText';

// Types
type BookStatus = 'released' | 'upcoming' | 'in-progress';
type BookType = 'manga' | 'game';

interface BookData {
  id: string;
  title: string;
  releaseDate?: string;
  status: BookStatus;
  type: BookType;
  synopsis: string;
  color: string; // Spine color
  coverImage?: string;
  readLink?: string;
}

// Data
const BOOKS: Record<string, BookData[]> = {
  released_mangas: [
    {
      id: 'all-hallows-eve',
      title: 'ALL HALLOWS EVE',
      releaseDate: 'October 4, 2024',
      status: 'released',
      type: 'manga',
      synopsis: 'A world plunged into sorrow and despair after a deal with \'one\' no one should trust. Now, only a chosen few have the courage to risk their lives to fix the terrible mistakes made. But was it all for nothing? Was it all a gamble? Or was it all hopeless from the start?',
      color: '#ff5e5e',
      coverImage: '/assets/all-hallows-eve-cover.jpg',
      readLink: 'https://mangaplus-creators.jp/episodes/qf2410041822304070025580017'
    },
    {
      id: 'specter',
      title: 'SPECTER',
      releaseDate: 'November 3, 2024',
      status: 'released',
      type: 'manga',
      synopsis: 'When the darkness stirs, something awakens. How long can you run before it finds you?',
      color: '#a3a3a3',
      coverImage: '/assets/specter-cover.jpg',
      readLink: 'https://mangaplus-creators.jp/episodes/na2411040411010370026609448'
    },
    {
      id: 'first-bite',
      title: 'FIRST BITE',
      releaseDate: 'December 25, 2024',
      status: 'released',
      type: 'manga',
      synopsis: 'In a world overrun with the undead, two survivors face a fate defining trail that tests the bond keeping them alive.',
      color: '#ffffff',
      coverImage: '/assets/first-bite-cover.jpg',
      readLink: 'https://mangaplus-creators.jp/episodes/sb2412252117006130026909136'
    },
    {
      id: 'bloodmoon-zero',
      title: 'BLOODMOON ZERO',
      releaseDate: 'July 15, 2025',
      status: 'released',
      type: 'manga',
      synopsis: 'When Life puts you on the edge of edges and you\'re forced to survive by any means necessary just for the sake of your loved ones...',
      color: '#ff004c',
      coverImage: '/assets/bloodmoon-zero-cover.jpg',
      readLink: 'https://mangaplus-creators.jp/episodes/ek2507150148560027245996'
    },
    {
      id: 'ominous-ch1-pt1',
      title: 'OMINOUS — CHAPTER 1 (PART 1)',
      releaseDate: 'December 25, 2025',
      status: 'released',
      type: 'manga',
      synopsis: 'In a shattered world plagued by relentless breaches, "Ominous" follows Celon Xander and Janet Xander. Confronted by monstrous entities called the "Plague", the siblings navigate this disaster torn reality to find their own path in it.',
      color: '#9d4edd',
      coverImage: '/assets/ominous-chapter1.jpg',
      readLink: 'https://mangaplus-creators.jp/episodes/su2512262012330026609448'
    }
  ],
  upcoming_mangas: [
    {
      id: 'ominous-ch1-complete',
      title: 'OMINOUS — CHAPTER 1: COMPLETE EDITION',
      status: 'upcoming',
      type: 'manga',
      synopsis: 'The full collection of the first chapter, including unseen pages and developer commentary on the world-building process.',
      color: '#7b2cbf'
    },
    {
      id: 'epistolary-war-ch1',
      title: 'THE EPISTOLARY WAR — CHAPTER 1',
      status: 'upcoming',
      type: 'manga',
      synopsis: 'War told through letters, emails, and intercepted transmissions. A sci-fi drama about connection in the face of galactic conflict.',
      color: '#4cc9f0'
    },
    {
      id: 'ember-games-prologue',
      title: 'THE EMBER GAMES — PROLOGUE',
      status: 'upcoming',
      type: 'manga',
      synopsis: 'Before the fire spreads, a spark must be struck. The prologue to a saga of rebellion, magic, and the ashes of an empire.',
      color: '#f72585'
    }
  ],
  upcoming_games: [
    {
      id: 'tatakae-lodge',
      title: 'TATAKAE LODGE',
      status: 'upcoming',
      type: 'game',
      synopsis: 'A cozy yet competitive strategy game where managing a lodge is just as important as defending it. Build, bond, and battle.',
      color: '#4361ee'
    },
    {
      id: 'camping',
      title: 'CAMPING',
      status: 'upcoming',
      type: 'game',
      synopsis: 'A survival horror experience in the deep wilderness. It was supposed to be a relaxing weekend. It wasn\'t.',
      color: '#3a0ca3'
    }
  ]
};

// Components

const BookSpine: React.FC<{ book: BookData; onClick: () => void }> = ({ book, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -5, zIndex: 10 }}
      className="group relative h-48 w-8 lg:w-10 cursor-pointer perspective-500"
    >
      <div
        className="absolute inset-0 rounded-sm shadow-lg transition-all duration-300"
        style={{ backgroundColor: book.color }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />

        {/* Spine Text */}
        <div className="h-full w-full flex items-center justify-center writing-vertical-rl rotate-180 p-2">
           <span className="text-[10px] font-bold tracking-widest text-white/90 truncate uppercase mix-blend-overlay">
             {book.title}
           </span>
        </div>
      </div>
    </motion.div>
  );
};

const ShelfRow: React.FC<{ title: string; books: BookData[]; onSelectBook: (book: BookData) => void }> = ({ title, books, onSelectBook }) => {
  return (
    <div className="w-full mb-8">
      <div className="text-[9px] tracking-[0.2em] font-bold text-white/30 mb-4 border-b border-white/5 pb-2 uppercase">
        {title}
      </div>
      <div className="flex items-end gap-1 lg:gap-2 px-2 border-b-4 border-[#1a1a1a] pb-0 bg-gradient-to-b from-transparent to-white/5 pt-4">
        {books.map((book) => (
          <BookSpine key={book.id} book={book} onClick={() => onSelectBook(book)} />
        ))}
      </div>
    </div>
  );
};

const BookCoverSVG: React.FC<{ book: BookData }> = ({ book }) => {
    // Generate a consistent pattern based on string hash or just use simple logic
    const isManga = book.type === 'manga';

    if (book.coverImage) {
        return (
            <svg viewBox="0 0 300 450" className="w-full h-full shadow-2xl rounded-sm">
                 <image
                    href={book.coverImage}
                    x="0"
                    y="0"
                    width="300"
                    height="450"
                    preserveAspectRatio="xMidYMid slice"
                />
                {/* Overlay spine shine for consistency */}
                <rect x="0" y="0" width="10" height="450" fill="white" fillOpacity="0.1" />
                <rect width="100%" height="100%" fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 300 450" className="w-full h-full shadow-2xl rounded-sm">
            <defs>
                <linearGradient id={`grad-${book.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={book.color} />
                    <stop offset="100%" stopColor="#1a1a1a" />
                </linearGradient>
                <pattern id={`pat-${book.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                     <circle cx="2" cy="2" r="1" fill="white" fillOpacity="0.1" />
                </pattern>
            </defs>

            <rect width="100%" height="100%" fill={`url(#grad-${book.id})`} />
            <rect width="100%" height="100%" fill={`url(#pat-${book.id})`} />

            <rect x="20" y="20" width="260" height="410" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="2" />

            {/* Abstract Shapes */}
            <circle cx="150" cy="150" r="80" fill="white" fillOpacity="0.05" />
            <circle cx="150" cy="150" r="60" stroke="white" strokeOpacity="0.2" strokeWidth="1" />

            <text
                x="150" y="350"
                textAnchor="middle"
                fill="white"
                fontFamily="monospace"
                fontSize="24"
                fontWeight="bold"
                className="uppercase tracking-widest"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
            >
                {book.title.split('—')[0]}
            </text>
             <text
                x="150" y="380"
                textAnchor="middle"
                fill="white"
                fillOpacity="0.7"
                fontFamily="monospace"
                fontSize="12"
                fontWeight="normal"
                className="uppercase tracking-[0.3em]"
            >
                {book.status}
            </text>

            {/* Spine Highlight */}
            <rect x="0" y="0" width="10" height="450" fill="white" fillOpacity="0.1" />
        </svg>
    )
}

const BookDetail: React.FC<{ book: BookData; onClose: () => void }> = ({ book, onClose }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 h-full items-center lg:items-start p-4 lg:p-0">
        {/* Left: Cover */}
        <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[300px] lg:w-1/3 shrink-0 perspective-1000"
        >
             <BookCoverSVG book={book} />
        </motion.div>

        {/* Right: Metadata */}
        <div className="flex-1 space-y-8 mt-4 lg:mt-12">
             <div>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-[10px] tracking-[0.2em] font-bold text-[var(--accent)] uppercase mb-2 flex items-center gap-2"
                >
                    <div className="w-2 h-2 border border-[var(--accent)]" />
                    {book.type} / {book.status}
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl lg:text-4xl font-bold tracking-tighter text-white mb-2"
                >
                    <TerminalText text={book.title} />
                </motion.h2>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xs tracking-[0.2em] text-white/40 uppercase"
                >
                    {book.releaseDate || 'Coming Soon'}
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
                {book.synopsis}
             </motion.p>

             <div className="flex flex-col gap-4 mt-8">
                {book.readLink && (
                    <motion.a
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.65 }}
                        href={book.readLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-fit flex items-center gap-3 px-6 py-3 bg-[var(--accent)] text-white text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-white hover:text-black transition-all duration-300"
                    >
                        <span>Read Here</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                    </motion.a>
                )}

                 <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    onClick={onClose}
                    className="text-[10px] tracking-widest uppercase text-[var(--accent)] hover:text-white transition-colors flex items-center gap-2 group w-fit"
                 >
                     <span>← Return to Shelf</span>
                     <div className="h-[1px] w-8 bg-[var(--accent)] group-hover:w-12 transition-all" />
                 </motion.button>
             </div>
        </div>
    </div>
  );
};

const WorldsArchive: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);

  return (
    <div className="h-full w-full flex flex-col relative pl-8 lg:pl-16 pr-12 lg:pr-24 overflow-y-auto lg:overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#7c5cff] rounded-full blur-[120px] opacity-5 pointer-events-none" />

      {/* Close Button (Global for Archive) */}
      {!selectedBook && (
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

      {/* Content Area */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center">
        <AnimatePresence mode="wait">
            {selectedBook ? (
                <motion.div
                    key="detail"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full flex items-center"
                >
                    <BookDetail book={selectedBook} onClose={() => setSelectedBook(null)} />
                </motion.div>
            ) : (
                <motion.div
                    key="shelf"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="w-full space-y-2 lg:space-y-4 max-h-full overflow-y-auto pr-4 custom-scrollbar"
                >
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold tracking-tighter text-white mb-1">ARCHIVE</h1>
                        <div className="text-[10px] tracking-[0.3em] text-[var(--accent)] uppercase font-bold">
                            Authorized Worlds & Narratives
                        </div>
                    </div>

                    <ShelfRow
                        title="Released Mangas"
                        books={BOOKS.released_mangas}
                        onSelectBook={setSelectedBook}
                    />
                    <ShelfRow
                        title="Upcoming Mangas"
                        books={BOOKS.upcoming_mangas}
                        onSelectBook={setSelectedBook}
                    />
                    <ShelfRow
                        title="Upcoming Game Projects"
                        books={BOOKS.upcoming_games}
                        onSelectBook={setSelectedBook}
                    />
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WorldsArchive;
