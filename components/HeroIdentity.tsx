import React from 'react';
import { motion } from 'framer-motion';
import TerminalText from './TerminalText';

const SectionTitle: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
    className="text-[10px] tracking-[0.2em] font-bold text-[var(--accent)] uppercase mb-2 flex items-center gap-2"
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
  return (
    <div className="h-full w-full flex flex-col justify-center relative px-6 lg:pl-16 lg:pr-24 overflow-y-auto lg:overflow-visible pt-20 lg:pt-0 pb-20 lg:pb-0">
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

      <div className="space-y-8 lg:space-y-10 relative z-10 max-w-2xl">

        {/* Name & Title */}
        <div>
          <h1 className="text-2xl lg:text-5xl font-bold tracking-tight lg:tracking-tighter text-white mb-2 leading-normal lg:leading-tight">
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

        <div className="h-[1px] w-full bg-gradient-to-r from-[var(--accent)] to-transparent opacity-30" />

        {/* Content Sections */}
        <div className="space-y-8">
          <div>
            <SectionTitle delay={1}>About</SectionTitle>
            <SectionBody delay={1}>
              <p>
                I build worlds, brands, and digital products — from idea to execution. My work blends storytelling, design, and technology into complete systems that are imagined, built, and shipped with intention.
              </p>
            </SectionBody>
          </div>

          <div>
            <SectionTitle delay={1.4}>Philosophy</SectionTitle>
            <SectionBody delay={1.4}>
              <p>
                I’m driven by transformation — how stories become brands, brands become experiences, and experiences become products. That’s why my work often blends motion, interaction, animation, and emerging tools like generative AI.
              </p>
            </SectionBody>
          </div>

          <div>
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
  );
};

export default HeroIdentity;
