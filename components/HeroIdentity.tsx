import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import TerminalText from './TerminalText';

const SectionTitle: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
    className="text-[10px] tracking-[0.2em] font-bold text-[var(--accent)] uppercase mb-2 flex items-center justify-center lg:justify-start gap-2"
  >
    <div className="w-2 h-2 border border-[var(--accent)]" />
    {children}
  </motion.div>
);

const SectionBody: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: delay + 0.2 }}
    className="text-sm leading-relaxed text-white/70 font-light"
  >
    {children}
  </motion.div>
);

const HeroIdentity: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const totalSections = 4;

  const handleScrollNext = () => {
    if (currentSection < totalSections - 1) {
      const nextIndex = currentSection + 1;
      sectionRefs.current[nextIndex]?.scrollIntoView({ behavior: 'smooth' });
      setCurrentSection(nextIndex);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Number(entry.target.getAttribute('data-index'));
                if (!isNaN(index)) {
                    setCurrentSection(index);
                }
            }
        });
    }, { threshold: 0.5 });

    sectionRefs.current.forEach(ref => {
        if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-full w-full relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)] rounded-full blur-[100px] opacity-10 pointer-events-none" />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 lg:top-0 lg:right-12 p-4 text-white/30 hover:text-[var(--accent)] transition-colors z-50"
        aria-label="Close Identity"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Scrollable Content Container */}
      <div
        ref={scrollContainerRef}
        className="h-full w-full overflow-y-auto lg:overflow-visible px-6 lg:pl-16 lg:pr-24 lg:pt-0 pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] snap-y snap-mandatory lg:snap-none lg:flex lg:flex-col lg:justify-center"
      >
        <div className="lg:space-y-10 relative z-10 max-w-2xl mx-auto lg:mx-0 lg:py-20 h-full lg:h-auto">

            {/* Section 0: Name & Title */}
            <div
                ref={el => { if (el) sectionRefs.current[0] = el; }}
                data-index="0"
                className="h-full lg:h-auto flex flex-col justify-center items-center lg:block lg:text-left text-center snap-start"
            >
                <div>
                    <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold tracking-tight lg:tracking-tighter text-white mb-6 lg:mb-2 leading-tight">
                        <TerminalText text="Pascal Mario Alexander Onwuasoanya" delay={0} />
                    </h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-[10px] lg:text-sm tracking-[0.15em] lg:tracking-[0.3em] text-[var(--accent)] uppercase font-bold leading-relaxed"
                    >
                        Creative Architect · World Builder · Brand Master
                    </motion.div>
                </div>
                {/* Divider - Hidden on mobile */}
                <div className="hidden lg:block h-[1px] w-full bg-gradient-to-r from-[var(--accent)] to-transparent opacity-30 mt-8 lg:mt-10" />
            </div>

            {/* Section 1: About */}
            <div
                ref={el => { if (el) sectionRefs.current[1] = el; }}
                data-index="1"
                className="h-full lg:h-auto flex flex-col justify-center items-center lg:block lg:text-left text-center snap-start"
            >
                <div className="w-full">
                    <SectionTitle delay={1}>About</SectionTitle>
                    <SectionBody delay={1}>
                        <p>
                            I build worlds, brands, and digital products — from idea to execution. My work blends storytelling, design, and technology into complete systems that are imagined, built, and shipped with intention.
                        </p>
                    </SectionBody>
                </div>
            </div>

            {/* Section 2: Philosophy */}
            <div
                ref={el => { if (el) sectionRefs.current[2] = el; }}
                data-index="2"
                className="h-full lg:h-auto flex flex-col justify-center items-center lg:block lg:text-left text-center snap-start"
            >
                <div className="w-full">
                    <SectionTitle delay={1.4}>Philosophy</SectionTitle>
                    <SectionBody delay={1.4}>
                        <p>
                            I’m driven by transformation — how stories become brands, brands become experiences, and experiences become products. That’s why my work often blends motion, interaction, animation, and emerging tools like generative AI.
                        </p>
                    </SectionBody>
                </div>
            </div>

            {/* Section 3: Final Message */}
            <div
                ref={el => { if (el) sectionRefs.current[3] = el; }}
                data-index="3"
                className="h-full lg:h-auto flex flex-col justify-center items-center lg:block lg:text-left text-center snap-start"
            >
                <div className="w-full">
                    <SectionTitle delay={1.8}>Final Message</SectionTitle>
                    <SectionBody delay={1.8}>
                        <p>
                            This portfolio is designed as one universe with multiple domains, reflecting how I work in real life: one core vision, expressed differently depending on the problem.
                        </p>
                    </SectionBody>
                </div>
            </div>

        </div>
      </div>

        {/* Scroll Button (Mobile Only) */}
        <AnimatePresence>
            {currentSection < totalSections - 1 && (
                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onClick={handleScrollNext}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 p-4 text-[var(--accent)] lg:hidden z-50 hover:scale-110 transition-transform bg-black/50 rounded-full backdrop-blur-sm border border-[var(--accent)]/30"
                >
                    <FiChevronDown size={24} className="animate-bounce" />
                </motion.button>
            )}
        </AnimatePresence>

    </div>
  );
};

export default HeroIdentity;
