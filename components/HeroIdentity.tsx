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

const WorkItem: React.FC<{ title: string; desc: string; delay?: number }> = ({ title, desc, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="border-l border-white/10 pl-4 py-1 hover:border-[var(--accent)] transition-colors group"
  >
    <div className="text-white font-bold text-xs uppercase tracking-wider mb-1 group-hover:text-[var(--accent)] transition-colors">
      {title}
    </div>
    <div className="text-[11px] text-white/50 leading-tight">
      {desc}
    </div>
  </motion.div>
);

const HeroIdentity: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="h-full w-full flex flex-col justify-center relative pl-8 lg:pl-16 pr-12 lg:pr-24 overflow-y-auto lg:overflow-visible">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)] rounded-full blur-[100px] opacity-10 pointer-events-none" />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-0 right-8 lg:right-12 p-4 text-white/30 hover:text-[var(--accent)] transition-colors"
        aria-label="Close Identity"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div className="space-y-8 relative z-10 max-w-2xl">

        {/* Name & Title */}
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter text-white mb-2">
            <TerminalText text="Pascal Mario Alexander Onwuasoanya" delay={0} />
          </h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-sm tracking-[0.3em] text-[var(--accent)] uppercase font-bold"
          >
            Creative Architect · World Builder · Brand Master
          </motion.div>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-[var(--accent)] to-transparent opacity-30" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Column 1: About & Philosophy */}
          <div className="space-y-8">
            <div>
              <SectionTitle delay={1}>About Me</SectionTitle>
              <SectionBody delay={1}>
                <p className="mb-4">
                  I build worlds, brands, and digital products — from idea to execution.
                </p>
                <p className="mb-4">
                  My work lives at the intersection of storytelling, design, and technology. I don’t operate as a single-role creative; I build complete systems that are imagined, designed, engineered, and shipped with purpose.
                </p>
                <p>
                  I’m a graphic designer, manga artist and writer, brand content creator, and web/product developer. Over time, these disciplines converged into one practice: creating cohesive experiences that feel intentional at every layer — visual, narrative, and technical.
                </p>
              </SectionBody>
            </div>

            <div>
              <SectionTitle delay={1.4}>Philosophy</SectionTitle>
              <SectionBody delay={1.4}>
                <p className="mb-4">
                  I’m especially focused on transformation — how a story becomes a brand, how a brand becomes an experience, and how an experience becomes a product. That’s why my work blends motion, interaction, animation, and emerging tools like generative AI.
                </p>
                <p>
                  This portfolio is designed as a single universe with multiple domains, reflecting how I work in real life: one core vision, expressed differently depending on the problem.
                </p>
              </SectionBody>
            </div>
          </div>

          {/* Column 2: Domains & Closing */}
          <div className="space-y-8">
            <div>
              <SectionTitle delay={1.8}>Work Domains</SectionTitle>
              <div className="space-y-4 mt-4">
                <WorkItem
                  title="Narrative & IP"
                  desc="Manga, story worlds, lore, and long-form concepts"
                  delay={2.0}
                />
                <WorkItem
                  title="Brand systems & campaigns"
                  desc="Identity, visuals, AI-powered ads, and content"
                  delay={2.1}
                />
                <WorkItem
                  title="Digital experiences"
                  desc="Websites and landing pages built for clarity and impact"
                  delay={2.2}
                />
                <WorkItem
                  title="Products & tools"
                  desc="Web apps and experimental systems built through vibe coding"
                  delay={2.3}
                />
              </div>
            </div>

            <div>
              <SectionTitle delay={2.5}>Closing Statement</SectionTitle>
              <SectionBody delay={2.5}>
                <p className="mb-2">If you’re looking for someone who can:</p>
                <ul className="list-disc list-inside space-y-1 text-xs mb-4 text-white/60">
                  <li>Think conceptually</li>
                  <li>Design with intention</li>
                  <li>Build with modern tools</li>
                  <li>And connect everything into a coherent whole</li>
                </ul>
                <p className="font-bold text-white">—you’re in the right place.</p>
              </SectionBody>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroIdentity;
