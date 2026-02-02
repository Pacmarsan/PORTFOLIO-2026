import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TerminalText from './TerminalText';

// --- DATA MODEL ---

export interface ProductData {
  id: string;
  title: string;
  role: string;
  oneLiner: string;
  techStack: string[];
  liveUrl: string;
  highlights?: string[];
  fallbackColor: string;
}

const PRODUCTS: ProductData[] = [
  {
    id: 'kinetic-footwear',
    title: 'KINETIC FOOTWEAR',
    role: '3D Web Engineer',
    oneLiner: 'An immersive 3D product showcase for sneaker store company.',
    techStack: ['React 19', 'Three.js (R3F)', 'Tailwind', 'Framer Motion'],
    liveUrl: 'https://kinectic-footwear.vercel.app/',
    highlights: ['Real-time 3D', 'Custom Shaders'],
    fallbackColor: '#2C097F'
  },
  {
    id: 'stash-it',
    title: 'STASH IT',
    role: 'Full Stack + AI',
    oneLiner: 'AI-powered platform for saving and organizing short-form content so you never lose the good stuff.',
    techStack: ['Next.js', 'AI Integration', 'Supabase', 'Tailwind'],
    liveUrl: 'https://stash1t.vercel.app/',
    highlights: ['Save links & Organize', 'AI Insights', 'Activity Feed'],
    fallbackColor: '#3b82f6'
  },
  {
    id: 'prompt-forge',
    title: 'PROMPT FORGE',
    role: 'System Architect',
    oneLiner: 'A prompt-building system designed to structure, store, and run prompts efficiently for fast iteration.',
    techStack: ['React', 'Cloud Run', 'Workflow Systems'],
    liveUrl: 'https://promptforge-350662590960.us-west1.run.app/',
    fallbackColor: '#f59e0b'
  },
  {
    id: 'sticker-me',
    title: 'STICKER ME',
    role: 'AI Product Engineer',
    oneLiner: 'AI-powered sticker creation tool that converts uploaded photos into cartoon-style stickers.',
    techStack: ['AI Transformation', 'Image Processing', 'React'],
    liveUrl: 'https://sticker-me.vercel.app/',
    highlights: ['Upload to Sticker', 'Freemium Model'],
    fallbackColor: '#ec4899'
  },
  {
    id: 'globalizer',
    title: 'GLOBALIZER',
    role: 'Frontend Engineer',
    oneLiner: 'A live web platform experience built as a modern frontend system with production-style UI.',
    techStack: ['Modern UI', 'Real-time Nav', 'Production Ready'],
    liveUrl: 'https://globalizer-main.vercel.app/',
    fallbackColor: '#10b981'
  },
  {
    id: 'eagleseye',
    title: 'EAGLESEYE',
    role: 'UI/UX Engineer',
    oneLiner: 'A finance-forward brand experience with multi-currency context and a premium intro sequence.',
    techStack: ['FinTech UI', 'Advanced Motion', 'Data Viz'],
    liveUrl: 'https://eagleseye.vercel.app/',
    fallbackColor: '#6366f1'
  }
];

// --- COMPONENTS ---

const ProductCard: React.FC<{ product: ProductData; index: number }> = ({ product, index }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex-shrink-0 w-[85vw] lg:w-[60vw] h-[75vh] lg:h-[80vh] flex flex-col snap-center relative group rounded-md overflow-hidden bg-[#0a0a0a] border border-white/10"
    >
      {/* --- LIVE PREVIEW AREA (Top 80%) --- */}
      <div className="relative h-[80%] w-full bg-black overflow-hidden border-b border-white/10">

        {/* Live Indicator */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
           <div className={`w-1.5 h-1.5 rounded-full ${hasError ? 'bg-red-500' : 'bg-emerald-500'} ${!hasError && 'animate-pulse'}`} />
           <span className="text-[9px] font-bold tracking-widest text-white/80 uppercase">
             {isLoading ? 'INIT...' : hasError ? 'OFFLINE' : 'LIVE SYSTEM'}
           </span>
        </div>

        {/* Iframe */}
        {!hasError && (
          <iframe
            src={product.liveUrl}
            className={`w-full h-full object-cover transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            title={`Preview of ${product.title}`}
            sandbox="allow-scripts allow-same-origin allow-forms"
            loading="lazy"
          />
        )}

        {/* Fallback / Error State */}
        {(hasError || isLoading) && (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505]">
                {isLoading ? (
                    // Loading Shimmer
                    <div className="w-full h-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent" />
                        <motion.div
                           className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                           animate={{ translateX: ['-100%', '100%'] }}
                           transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[10px] tracking-widest text-white/30 animate-pulse">ESTABLISHING CONNECTION...</span>
                        </div>
                    </div>
                ) : (
                    // Error / Placeholder
                    <div className="text-center p-8">
                         <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                             <span className="text-2xl opacity-50">!</span>
                         </div>
                         <h3 className="text-white/50 text-xs tracking-widest uppercase mb-2">Signal Interrupted</h3>
                         <p className="text-white/30 text-[10px] max-w-[200px] mx-auto">
                            Target system may prevent embedding. Access directly via external link.
                         </p>
                    </div>
                )}
             </div>
        )}

        {/* Interactive Overlay (Hover) */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none" />
        <a
          href={product.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
        >
             <div className="px-6 py-3 bg-[var(--accent)] text-black font-bold text-xs tracking-widest uppercase shadow-[0_0_20px_var(--accent)] hover:scale-105 transition-transform cursor-pointer">
                 Open Live Interface
             </div>
        </a>
      </div>

      {/* --- INFO AREA (Bottom 20%) --- */}
      <div className="flex-1 p-5 lg:p-6 relative bg-[#0a0a0a] flex flex-col justify-between">
          {/* Background Gradient */}
          <div
            className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-10 pointer-events-none"
            style={{ backgroundColor: product.fallbackColor }}
          />

          <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                 <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-sm text-[9px] tracking-wider text-[var(--accent)] uppercase font-bold">
                    {product.role}
                 </span>
                 <div className="h-[1px] flex-1 bg-white/10" />
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tighter mb-2">
                  <TerminalText text={product.title} />
              </h2>

              <p className="text-xs lg:text-sm text-white/60 font-light leading-relaxed max-w-2xl line-clamp-2">
                  {product.oneLiner}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mt-3 hidden lg:flex">
                  {product.techStack.map(tech => (
                      <span key={tech} className="text-[9px] text-white/40 uppercase tracking-wider border border-white/10 px-2 py-0.5 rounded-sm">
                          {tech}
                      </span>
                  ))}
              </div>
          </div>

          <div className="relative z-10 flex items-center justify-between mt-3 pt-3 border-t border-white/5">
               <a
                 href={product.liveUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white hover:text-[var(--accent)] transition-colors uppercase group/link"
               >
                   <span>Initialize System</span>
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover/link:translate-x-1 transition-transform">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                   </svg>
               </a>

               <div className="text-[10px] text-white/20 tracking-widest font-mono">
                   SYS.VER.1.0
               </div>
          </div>
      </div>
    </motion.div>
  );
};

// --- MAIN ARCHIVE COMPONENT ---

const ProductsArchive: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="h-full w-full flex flex-col relative px-6 lg:pl-12 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffb703] rounded-full blur-[150px] opacity-5 pointer-events-none" />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 lg:top-0 lg:right-12 p-4 text-white/30 hover:text-[var(--accent)] transition-colors z-50"
        aria-label="Close Products"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Header */}
      <motion.div
         initial={{ opacity: 0, x: -20 }}
         animate={{ opacity: 1, x: 0 }}
         className="absolute top-8 left-8 lg:left-16 z-40 pointer-events-none"
      >
         <h1 className="text-3xl font-bold tracking-tighter text-white mb-1">PRODUCTS</h1>
         <div className="text-[10px] tracking-[0.3em] text-[var(--accent)] uppercase font-bold">
            Deployed Systems
         </div>
      </motion.div>

      {/* Scroll Track */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="w-full h-full flex items-center overflow-x-auto snap-x snap-mandatory custom-scrollbar pl-4 lg:pl-4 pr-12 gap-8 pt-16 pb-8"
      >
          {PRODUCTS.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
          ))}

          {/* End Spacer */}
          <div className="w-12 flex-shrink-0" />
      </motion.div>
    </div>
  );
};

export default ProductsArchive;
