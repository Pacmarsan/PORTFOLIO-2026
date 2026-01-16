import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SiGmail, SiWhatsapp, SiInstagram, SiLinkedin, SiX, SiGithub } from 'react-icons/si';
import { FiArrowUpRight, FiExternalLink } from 'react-icons/fi';
import TerminalText from './TerminalText';

// --- DATA ---

const CONTACTS = {
  primary: [
    {
      id: 'email',
      label: 'Email Me',
      value: 'pacmargraphics@gmail.com',
      href: 'mailto:pacmargraphics@gmail.com',
      icon: SiGmail,
      color: '#EA4335', // Gmail Red
      bg: 'hover:bg-[#EA4335]/10',
      border: 'hover:border-[#EA4335]/50'
    },
    {
      id: 'whatsapp',
      label: 'Chat on WhatsApp',
      value: '+234 813 952 4748',
      href: 'https://wa.me/2348139524748',
      icon: SiWhatsapp,
      color: '#25D366', // WhatsApp Green
      bg: 'hover:bg-[#25D366]/10',
      border: 'hover:border-[#25D366]/50'
    }
  ],
  social: [
    {
      id: 'instagram',
      label: 'Instagram',
      handle: '@pacmar1official',
      href: 'https://www.instagram.com/pacmar1official?igsh=MWIzbjBzdWRucXR3',
      icon: SiInstagram,
      color: '#E4405F'
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      handle: '@pacmarsan',
      href: 'https://www.linkedin.com/in/pacmarsan',
      icon: SiLinkedin,
      color: '#0A66C2'
    },
    {
      id: 'x',
      label: 'X',
      handle: '@pacmarsan',
      href: 'https://x.com/pacmarsan',
      icon: SiX,
      color: '#ffffff'
    },
    {
      id: 'github',
      label: 'GitHub',
      handle: 'Pacmarsan',
      href: 'https://github.com/Pacmarsan',
      icon: SiGithub,
      color: '#ffffff'
    }
  ]
};

// --- COMPONENTS ---

const SectionHeader: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="mb-8 lg:mb-12">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-[10px] tracking-[0.2em] font-bold text-[var(--accent)] uppercase mb-2 flex items-center gap-2"
      >
        <div className="w-2 h-2 border border-[var(--accent)]" />
        <span>Status: Open to collaborations</span>
      </motion.div>

      <motion.h1
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-4xl lg:text-5xl font-bold tracking-tighter text-white mb-2"
      >
        <TerminalText text="CONTACT" delay={0.2} />
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-sm lg:text-base text-white/60 font-light"
      >
        Let’s build something real.
      </motion.p>
    </div>
  );
};

const PrimaryCard: React.FC<{ item: typeof CONTACTS.primary[0]; index: number }> = ({ item, index }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.a
      href={item.href}
      target={item.id === 'email' ? '_self' : '_blank'}
      rel="noopener noreferrer"
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.6 + (index * 0.1),
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -2 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
      className={`relative group flex flex-col p-6 lg:p-8 rounded-sm bg-white/5 border border-white/10 transition-colors duration-300 ${item.bg} ${item.border}`}
    >
      <div className="flex items-start justify-between mb-4">
        <item.icon className={`w-8 h-8 lg:w-10 lg:h-10 transition-transform duration-300 ${!shouldReduceMotion && 'group-hover:rotate-6'}`} style={{ color: item.color }} />
        <FiArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white/60 transition-colors" />
      </div>

      <div>
        <div className="text-xs font-bold tracking-widest text-white/40 uppercase mb-1">{item.label}</div>
        <div className="text-sm lg:text-lg font-bold text-white tracking-tight">{item.value}</div>
      </div>

      {/* Glow Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-sm pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${item.color}, transparent 70%)` }}
      />
    </motion.a>
  );
};

const SocialCard: React.FC<{ item: typeof CONTACTS.social[0]; index: number }> = ({ item, index }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.9 + (index * 0.1) }}
      whileHover={shouldReduceMotion ? {} : { y: -4 }}
      className="group flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 hover:border-white/30 rounded-sm transition-all relative overflow-hidden"
    >
      <item.icon
        className={`w-6 h-6 mb-3 text-white/60 group-hover:text-white transition-all duration-300 ${!shouldReduceMotion && 'group-hover:scale-110 group-hover:rotate-3'}`}
      />
      <div className="text-xs font-bold tracking-widest text-white uppercase mb-1 flex items-center gap-1">
        {item.label}
      </div>
      {item.handle && (
        <div className="text-[10px] text-white/40 font-mono group-hover:text-[var(--accent)] transition-colors">
          {item.handle}
        </div>
      )}

      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <FiExternalLink className="w-3 h-3 text-white/30" />
      </div>
    </motion.a>
  );
};

const ContactsArchive: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="h-full w-full flex flex-col relative px-6 lg:pl-16 lg:pr-24 overflow-y-auto custom-scrollbar pt-20 lg:pt-0 justify-center">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff2a6d] rounded-full blur-[150px] opacity-10 pointer-events-none" />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 lg:top-0 lg:right-12 p-4 text-white/30 hover:text-[var(--accent)] transition-colors z-50 lg:bg-transparent"
        aria-label="Close Contacts"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div className="max-w-4xl w-full mx-auto relative z-10 pb-12">
        <SectionHeader />

        {/* Primary Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {CONTACTS.primary.map((item, index) => (
            <PrimaryCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Social Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {CONTACTS.social.map((item, index) => (
            <SocialCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Footer Microcopy */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1.5, duration: 1 }}
           className="text-center border-t border-white/5 pt-8"
        >
          <p className="text-[10px] lg:text-xs text-white/30 tracking-wider font-light uppercase">
            Prefer email for serious work. WhatsApp for quick questions.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactsArchive;
