
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { animate } from 'motion';
import { PHASES, Phase, PhaseName } from './types';
import ParticleCanvas from './components/ParticleCanvas';
import MorphingShape from './components/MorphingShape';
import TerminalText from './components/TerminalText';
import PhaseIllustration from './components/PhaseIllustration';
import HeroIdentity from './components/HeroIdentity';
import WorldsArchive from './components/WorldsArchive';
import BrandsArchive from './components/BrandsArchive';

const App: React.FC = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [coords, setCoords] = useState({ x: 0, y: 0, z: 0 });

  // Expansion State
  const [expandedPhase, setExpandedPhase] = useState<PhaseName | null>(null);
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);

  useEffect(() => {
    // Simulate system pre-load
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2000);

    const handleScroll = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = winScroll / height;
      setScrollProgress(scrolled);
      
      setCoords({
        x: Math.floor(scrolled * 99),
        y: Math.floor((1 - scrolled) * 99),
        z: Math.floor(Math.sin(scrolled * Math.PI) * 99)
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleStart = () => {
    setIsInitializing(false);
  };

  const activePhase = useMemo(() => {
    const found = PHASES.find(p => scrollProgress >= p.start && scrollProgress <= p.end);
    if (found) return found;
    return PHASES.reduce((prev, curr) => {
      return Math.abs(curr.start - scrollProgress) < Math.abs(prev.start - scrollProgress) ? curr : prev;
    });
  }, [scrollProgress]);

  // Collapse expansion if phase changes
  useEffect(() => {
    if (expandedPhase && activePhase.name !== expandedPhase) {
      setExpandedPhase(null);
    }
  }, [activePhase.name, expandedPhase]);

  // Dynamic HUD state based on phase proximity
  const hudState = useMemo(() => {
    const inPhase = PHASES.some(p => scrollProgress >= p.start && scrollProgress <= p.end);
    
    // Transition window (how quickly it fades out)
    const margin = 0.08; 
    let proximity = 0;

    if (inPhase) {
      proximity = 1;
    } else {
      const distances = PHASES.map(p => Math.min(Math.abs(scrollProgress - p.start), Math.abs(scrollProgress - p.end)));
      const minDist = Math.min(...distances);
      proximity = Math.max(0.3, 1 - (minDist / margin));
    }

    return {
      opacity: proximity,
      scale: 0.95 + (0.05 * proximity),
      blur: 0,
      y: (1 - proximity) * 20
    };
  }, [scrollProgress]);

  useEffect(() => {
    if (!isInitializing) {
      animate(document.documentElement, { 
        // @ts-ignore
        '--accent': activePhase.color 
      }, { duration: 1 });
    }
  }, [activePhase.color, isInitializing]);

  const handleInteraction = () => {
    if (activePhase.name === 'hero' || activePhase.name === 'worlds' || activePhase.name === 'brands') {
      setExpandedPhase(activePhase.name);
    }
  };

  const isExpanded = !!expandedPhase;

  return (
    <div className="relative min-h-[600vh] selection:bg-[var(--accent)] selection:text-black font-mono">
      <AnimatePresence>
        {isInitializing ? (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            <div className="relative flex flex-col items-center">
              <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-48 h-48 lg:w-64 lg:h-64 mb-12 relative"
                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#00f5ff] drop-shadow-[0_0_20px_rgba(0,245,255,0.5)]">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="opacity-20" />
                  <ellipse cx="50" cy="50" rx="48" ry="20" fill="none" stroke="currentColor" strokeWidth="0.5" className="opacity-40" />
                  <ellipse cx="50" cy="50" rx="20" ry="48" fill="none" stroke="currentColor" strokeWidth="0.5" className="opacity-40" />
                  <path d="M50 2 A48 48 0 0 1 50 98" fill="none" stroke="currentColor" strokeWidth="1" />
                  <path d="M50 2 A48 48 0 0 0 50 98" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-20" />
                </svg>
              </motion.div>

              <div className="text-center space-y-6">
                <div className="space-y-2">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-[10px] tracking-[0.5em] text-[#00f5ff] font-bold uppercase"
                  >
                    Pacmarsan Systems Ready
                  </motion.div>
                  <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden mx-auto">
                    <motion.div 
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 bg-[#00f5ff] shadow-[0_0_10px_#00f5ff]"
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {isReady && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={handleStart}
                      className="px-8 py-3 bg-[#00f5ff] text-black text-[11px] font-bold tracking-[0.4em] uppercase hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,245,255,0.3)]"
                    >
                      Enter Protocol
                    </motion.button>
                  )}
                </AnimatePresence>

                <div className="flex justify-between w-64 mx-auto text-[8px] text-white/20 tracking-widest font-bold">
                  <span>SECURE_LINK</span>
                  <span>AUDIO_ENABLED</span>
                </div>
              </div>
            </div>

            <div className="absolute top-12 left-12 w-8 h-8 border-t border-l border-[#00f5ff]/30" />
            <div className="absolute top-12 right-12 w-8 h-8 border-t border-r border-[#00f5ff]/30" />
            <div className="absolute bottom-12 left-12 w-8 h-8 border-b border-l border-[#00f5ff]/30" />
            <div className="absolute bottom-12 right-12 w-8 h-8 border-b border-r border-[#00f5ff]/30" />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="contents"
          >
            {/* Background & Particles */}
            <ParticleCanvas progress={scrollProgress} activePhase={activePhase} />
            <MorphingShape activePhase={activePhase} />

            {/* Top Status Bar - Interactive Scroll Response */}
            <motion.div 
              style={{ opacity: hudState.opacity, y: -hudState.y }}
              className="fixed top-0 left-0 w-full z-50 p-4 lg:p-6 flex items-center justify-between pointer-events-none"
            >
              <div className="flex items-center gap-6 glass px-4 py-2 border border-white/10 rounded-sm">
                <div className="text-[10px] tracking-[0.2em] font-bold text-white/40">PACMARSAN // PORTFOLIO</div>
                <div className="h-3 w-[1px] bg-white/10" />
                <div className="flex items-center gap-2">
                  <span className="text-[10px] tracking-[0.2em] font-bold text-white/40">SYSTEM:</span>
                  <span className="text-[10px] tracking-[0.2em] font-bold text-emerald-400">ONLINE</span>
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full dot-blink shadow-[0_0_5px_#34d399]" />
                </div>
              </div>
            </motion.div>

            {/* Main HUD Interface - High Dynamic Response */}
            <motion.div 
              style={{ 
                opacity: hudState.opacity, 
                scale: hudState.scale,
              }}
              className="fixed inset-0 pointer-events-none z-20 flex items-center justify-center lg:justify-start px-8 lg:px-24"
            >
              {/* Dynamic Layout Container */}
              <div className="relative w-full max-w-[1400px] h-[600px] flex items-center">
                
                {/* Left Panel: Data Terminal */}
                <motion.div
                   className="w-full lg:w-1/2 h-full absolute lg:relative left-0 top-0 flex flex-col justify-center pointer-events-auto"
                   animate={{
                     opacity: isExpanded ? 0 : 1,
                     x: isExpanded ? -50 : 0,
                     pointerEvents: isExpanded ? 'none' : 'auto'
                   }}
                   transition={{ duration: 0.5 }}
                >
                  <div className="hud-border bg-[#050505]/60 backdrop-blur-md p-8 lg:p-12 border-l-4 border-l-[var(--accent)] relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-white/5" />
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5" />
                    
                    <div className="text-[10px] tracking-[0.3em] font-bold text-white/30 mb-8 flex items-center gap-4">
                      <span>PACMARSAN PROTOCOL // PORTFOLIO</span>
                      <div className="flex-1 h-[1px] bg-white/5" />
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activePhase.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-8 glow-text leading-tight text-[var(--accent)]">
                          <TerminalText 
                            text={activePhase.name === 'hero' ? 'WHO I AM' : activePhase.name.toUpperCase()}
                          />
                        </h2>
                        
                        <div className="space-y-4 border-t border-white/10 pt-8 mt-4">
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] text-white/30 font-bold w-16 uppercase tracking-widest">Phase:</span>
                            <TerminalText 
                              text={activePhase.label} 
                              className="text-[11px] text-white font-bold tracking-[0.3em] uppercase"
                              delay={0.2}
                            />
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] text-white/30 font-bold w-16 uppercase tracking-widest">Type:</span>
                            <TerminalText 
                              text={activePhase.subtext} 
                              className="text-[11px] text-white font-bold tracking-[0.3em] uppercase"
                              delay={0.4}
                            />
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    <div className="mt-12 flex items-center gap-4">
                      <button className="px-6 py-2 bg-[var(--accent)] text-black text-[10px] font-bold tracking-widest uppercase hover:brightness-110 transition-all cursor-pointer">
                        Initiate Sequence
                      </button>
                      <div className="flex-1" />
                      <div className="flex items-center gap-1">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="w-1 h-3 bg-white/10" />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Right Panel / Phase Illustration */}
                <motion.div
                   className="hidden lg:block h-full absolute right-0 top-0 pointer-events-none"
                   initial={false}
                   animate={{
                     width: isExpanded ? '35%' : '50%',
                     left: isExpanded ? 0 : '50%',
                     right: 'auto',
                   }}
                   transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <AnimatePresence mode="wait">
                    <PhaseIllustration
                        key={activePhase.name}
                        activePhase={activePhase}
                        onInteract={handleInteraction}
                        isExpanded={isExpanded}
                        selectedBrandId={selectedBrandId}
                        onBrandSelect={setSelectedBrandId}
                    />
                  </AnimatePresence>
                </motion.div>

                {/* Expanded Content Layer */}
                <motion.div
                  className="absolute right-0 top-0 h-full hidden lg:flex flex-col justify-center pointer-events-auto"
                  initial={{ width: '50%', opacity: 0, x: 100 }}
                  animate={{
                    width: isExpanded ? '65%' : '50%',
                    opacity: isExpanded ? 1 : 0,
                    x: isExpanded ? 0 : 100,
                    pointerEvents: isExpanded ? 'auto' : 'none'
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    {expandedPhase === 'hero' && (
                        <HeroIdentity onClose={() => setExpandedPhase(null)} />
                    )}
                    {expandedPhase === 'worlds' && (
                        <WorldsArchive onClose={() => setExpandedPhase(null)} />
                    )}
                    {expandedPhase === 'brands' && (
                        <BrandsArchive
                           selectedBrandId={selectedBrandId}
                           onClose={() => { setExpandedPhase(null); setSelectedBrandId(null); }}
                           onSelect={(id) => setSelectedBrandId(id || null)}
                        />
                    )}
                </motion.div>

              </div>
            </motion.div>

            {/* Bottom Data Bar - Interactive Scroll Response */}
            <motion.div 
              style={{ opacity: hudState.opacity, y: hudState.y }}
              className="fixed bottom-0 left-0 w-full z-50 p-8 lg:p-12 pointer-events-none flex items-end justify-between"
            >
              <div className="space-y-1">
                <div className="text-[10px] text-white/40 font-bold tracking-[0.2em]">
                  COORDS: {coords.x.toString().padStart(2,'0')}.{coords.y.toString().padStart(2,'0')}.{coords.z.toString().padStart(2,'0')}
                </div>
                <div className="text-[10px] text-white/20 font-bold tracking-[0.2em]">
                  SCROLL-LINKED ENGINE V1.0
                </div>
              </div>

              <div className="hidden lg:flex flex-col items-end gap-2">
                 <div className="flex gap-1">
                   {PHASES.map((p, i) => (
                     <div 
                       key={p.name}
                       className={`w-8 h-1 transition-all duration-300 ${activePhase.name === p.name ? 'bg-[var(--accent)]' : 'bg-white/5'}`}
                     />
                   ))}
                 </div>
                 <div className="text-[9px] text-white/20 tracking-[0.4em] uppercase">Phase Progression Matrix</div>
              </div>
            </motion.div>

            {/* Side Progress Strip */}
            <div className="fixed left-0 top-0 h-full w-[2px] bg-white/5 z-40">
              <div 
                className="bg-[var(--accent)] w-full transition-all duration-100 ease-linear shadow-[0_0_10px_var(--accent)]"
                style={{ height: `${scrollProgress * 100}%` }}
              />
            </div>

            <motion.div 
              style={{ opacity: 1 - hudState.opacity }}
              className="lg:hidden fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50"
            >
              <div className="text-[10px] text-white/40 animate-pulse uppercase tracking-[0.2em]">Navigating Protocol...</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
