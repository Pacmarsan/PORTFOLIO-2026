import React, { useState } from 'react';
// Experiences Archive - Revamped Skill Tree Implementation
import { motion, AnimatePresence } from 'framer-motion';
import TerminalText from './TerminalText';

// --- Types ---

interface TimelineNodeData {
  id: string;
  year: string;
  role: string;
  company?: string;
  description: string;
  details?: string[]; // Bullet points
  x: number; // SVG coordinate percentage (0-100)
  y: number; // SVG coordinate percentage (0-100)
}

interface SkillNodeData {
  id: string;
  label: string;
  fullText: string;
  category: 'code' | 'design' | 'ai' | 'soft';
  x: number;
  y: number;
  connections: string[]; // IDs of connected nodes
}

interface CertificateData {
  id: string;
  title: string;
  issuer: string;
  date: string;
  type: 'certificate' | 'award';
}

// --- Data ---

const TIMELINE_DATA: TimelineNodeData[] = [
  {
    id: 'brand-designer',
    year: '2025–Present',
    role: 'Brand Designer',
    company: 'Freelance',
    description: 'Design and production of high-quality digital brand advertisements.',
    details: [
      'Design and production of high-quality digital brand advertisements across social media and web platforms.',
      'Creation of both static and motion creatives optimized for engagement, conversion, and brand visibility.',
      'Delivery of studio-quality visuals using AI-assisted creative workflows and modern design tools.'
    ],
    x: 20,
    y: 5
  },
  {
    id: 'hackathon',
    year: '2025',
    role: 'Hackathon Participation',
    company: 'Solo & Team',
    description: 'Active participant in multiple national and international hackathons.',
    details: [
      'Bolt AI World Hackathon',
      'Enugu State Hackathon',
      'The First AI Creative Hackathon',
      'Google Gemini Hackathon',
      'Several additional competitive innovation events'
    ],
    x: 80,
    y: 15
  },
  {
    id: 'frontend-dev',
    year: '2025–Present',
    role: 'Frontend Developer',
    company: 'Freelance',
    description: 'Development of interactive user interfaces and single-page applications.',
    details: [
      'Development of interactive user interfaces and single-page applications using React and Next.js.',
      'Implementation of animations and micro-interactions with Framer Motion, motion.dev, and anime.js.',
      'Construction of scalable web applications featuring authentication, databases, and APIs powered by Supabase.',
      'Optimization of performance while preserving functionality during website redesigns and upgrades.'
    ],
    x: 30,
    y: 30
  },
  {
    id: 'website-designer',
    year: '2025–Present',
    role: 'Website Designer',
    company: 'Freelance',
    description: 'Design and development of responsive, user-centered websites.',
    details: [
      'Design and development of responsive, user-centered websites guided by modern UI/UX principles and performance-first thinking.'
    ],
    x: 70,
    y: 45
  },
  {
    id: 'gen-ai',
    year: '2024–Present',
    role: 'Generative AI Specialist',
    company: 'Freelance',
    description: 'Advanced application of generative AI models for creative production.',
    details: [
      'Advanced application of generative AI models for creative production.',
      'Specialized in image generation, text-to-image prompting, and model fine-tuning for specific artistic and commercial use cases.'
    ],
    x: 40,
    y: 60
  },
  {
    id: 'prompt-engineer',
    year: '2024–Present',
    role: 'AI Prompt Engineer',
    company: 'Freelance',
    description: 'In-depth analysis of AI conversational behavior and output patterns.',
    details: [
      'In-depth analysis of AI conversational behavior and output patterns.',
      'Development of high-impact prompts for creative content generation, technical documentation, and educational material.'
    ],
    x: 80,
    y: 70
  },
  {
    id: 'founder',
    year: '2023–Present',
    role: 'Founder & CEO',
    company: 'Limitless Studio',
    description: 'Leader of a creative studio managing a team of 10+ artists.',
    details: [
      'Founder and leader of a creative studio managing a team of 10+ artists.',
      'Successfully published 5+ manga titles with over 1M+ combined views, overseeing concept development, production, and release strategy.'
    ],
    x: 20,
    y: 80
  },
  {
    id: 'lead-mangaka',
    year: '2023–Present',
    role: 'Lead Mangaka',
    company: 'Limitless Studio',
    description: 'Creator and lead artist of the award-winning manga Specter.',
    details: [
      'Creator and lead artist of the award-winning manga Specter, responsible for story direction, visual style, and narrative execution.'
    ],
    x: 60,
    y: 88
  },
  {
    id: 'graphic-designer',
    year: '2019–Present',
    role: 'Graphic Designer',
    company: 'Pacmar Graphics Hub',
    description: 'Completion of 50+ branding and promotional projects.',
    details: [
      'Completion of 50+ branding and promotional projects using Adobe Photoshop, CorelDraw, and PixelLab, serving a wide range of clients and creative needs.'
    ],
    x: 50,
    y: 100
  }
];

const SKILL_NODES: SkillNodeData[] = [
  // Root
  { id: 'root', label: 'CORE', fullText: '', category: 'soft', x: 50, y: 5, connections: ['code', 'design', 'ai', 'soft-skills'] },

  // Categories
  { id: 'code', label: 'DEV', fullText: '', category: 'code', x: 20, y: 25, connections: ['react', 'html', 'motion', 'supabase'] },
  { id: 'design', label: 'ART', fullText: '', category: 'design', x: 40, y: 25, connections: ['manga', 'corel'] },
  { id: 'ai', label: 'AI', fullText: '', category: 'ai', x: 60, y: 25, connections: ['gen-ai-tool', 'prompt'] },
  { id: 'soft-skills', label: 'LEAD', fullText: '', category: 'soft', x: 80, y: 25, connections: ['leadership', 'problem'] },

  // Leaves - Code
  { id: 'react', label: 'React Stack', fullText: 'React, Next.js, JavaScript (ES6+)', category: 'code', x: 10, y: 45, connections: [] },
  { id: 'html', label: 'Frontend UI', fullText: 'HTML5, CSS3, Responsive Design', category: 'code', x: 15, y: 55, connections: [] },
  { id: 'motion', label: 'Animation', fullText: 'Framer Motion, motion.dev, anime.js, Web Animations API', category: 'code', x: 25, y: 45, connections: [] },
  { id: 'supabase', label: 'Backend', fullText: 'Supabase, API Integration, Frontend Performance Optimization', category: 'code', x: 30, y: 55, connections: [] },

  // Leaves - Design
  { id: 'manga', label: 'Manga Art', fullText: 'Manga Art, Storyboarding, Graphic Design', category: 'design', x: 35, y: 45, connections: [] },
  { id: 'corel', label: 'Design Tools', fullText: 'CorelDraw, PixelLab', category: 'design', x: 45, y: 55, connections: [] },

  // Leaves - AI
  { id: 'gen-ai-tool', label: 'AI Creative', fullText: 'AI Creative Tools, Generative AI Applications', category: 'ai', x: 55, y: 45, connections: [] },
  { id: 'prompt', label: 'Prompt Eng.', fullText: 'AI Prompt Engineering & Design', category: 'ai', x: 65, y: 55, connections: [] },

  // Leaves - Soft
  { id: 'leadership', label: 'Leadership', fullText: 'Team Leadership, Collaboration, Communication', category: 'soft', x: 75, y: 45, connections: [] },
  { id: 'problem', label: 'Problem Solving', fullText: 'Problem Solving, Quick Decision-Making', category: 'soft', x: 85, y: 55, connections: [] },
];

const CERTIFICATES: CertificateData[] = [
  { id: 'c1', title: 'React Advanced', issuer: 'Meta', date: '2024', type: 'certificate' },
  { id: 'c2', title: 'Generative AI', issuer: 'Google', date: '2024', type: 'certificate' },
  { id: 'c3', title: 'Hackathon Winner', issuer: 'Bolt AI', date: '2025', type: 'award' },
  { id: 'c4', title: 'UX Design', issuer: 'Google', date: '2023', type: 'certificate' },
  { id: 'c5', title: 'Frontend Basics', issuer: 'FreeCodeCamp', date: '2022', type: 'certificate' },
  // Row 2
  { id: 'c6', title: 'Manga Award', issuer: 'Limitless', date: '2023', type: 'award' },
  { id: 'c7', title: 'Leadership', issuer: 'LinkedIn', date: '2024', type: 'certificate' },
  { id: 'c8', title: 'Prompt Eng.', issuer: 'OpenAI', date: '2024', type: 'certificate' },
  { id: 'c9', title: 'Web Animation', issuer: 'Awwwards', date: '2025', type: 'certificate' },
  { id: 'c10', title: 'Full Stack', issuer: 'Udemy', date: '2023', type: 'certificate' },
];

// --- Sub-Components ---

const SectionTitle: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
    className="text-[10px] tracking-[0.2em] font-bold text-[var(--accent)] uppercase mb-6 flex items-center gap-2"
  >
    <div className="w-2 h-2 border border-[var(--accent)]" />
    {children}
  </motion.div>
);

const DetailView: React.FC<{ item: TimelineNodeData | CertificateData; onClose: () => void }> = ({ item, onClose }) => {
  const isTimeline = 'role' in item;

  return (
    <div className="h-full w-full flex flex-col justify-center relative p-8">
       <button
        onClick={onClose}
        className="absolute top-0 right-0 p-4 text-white/30 hover:text-[var(--accent)] transition-colors"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl"
      >
        <div className="text-[10px] tracking-[0.3em] font-bold text-[var(--accent)] uppercase mb-4">
            {isTimeline ? (item as TimelineNodeData).year : (item as CertificateData).date}
        </div>

        <h2 className="text-3xl lg:text-5xl font-bold tracking-tighter text-white mb-2">
            <TerminalText text={isTimeline ? (item as TimelineNodeData).role : (item as CertificateData).title} />
        </h2>

        <div className="text-sm tracking-[0.2em] text-white/40 uppercase mb-8">
            {isTimeline ? (item as TimelineNodeData).company : (item as CertificateData).issuer}
        </div>

        <div className="h-[1px] w-full bg-white/10 mb-8" />

        <div className="text-sm leading-relaxed text-white/70 font-light space-y-4">
             {isTimeline ? (
                 (item as TimelineNodeData).details?.map((detail, i) => (
                     <p key={i}>• {detail}</p>
                 ))
             ) : (
                 <p>Certificate of achievement awarded for excellence in the field.</p>
             )}
        </div>
      </motion.div>
    </div>
  )
};

const TimelineMap: React.FC<{ onSelect: (item: TimelineNodeData) => void }> = ({ onSelect }) => {
  const NEON_GREEN = '#39FF14';

  return (
    <div className="relative w-full h-[800px] mb-24">
      <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 100 800" preserveAspectRatio="none">
        {/* Connection Path */}
        <motion.path
          d={`M ${TIMELINE_DATA.map(n => `${n.x * 0.8 + 10} ${n.y * 7 + 50}`).join(' L ')}`}
          fill="none"
          stroke={NEON_GREEN}
          strokeWidth="1"
          strokeOpacity="0.8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>

      {TIMELINE_DATA.map((node, i) => (
        <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + (i * 0.1) }}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{
                left: `${node.x * 0.8 + 10}%`,
                top: `${node.y * 7 + 50}px`
            }}
            onClick={() => onSelect(node)}
        >
            <div className="relative flex items-center justify-center">
                {/* Pulsing Glow */}
                <motion.div
                    className="absolute inset-0 rounded-sm blur-[4px]"
                    style={{ backgroundColor: NEON_GREEN }}
                    animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />

                <div
                    className="relative w-4 h-4 bg-[#050505] rotate-45 transition-colors duration-300 z-10"
                    style={{ borderColor: NEON_GREEN, borderWidth: '1px', borderStyle: 'solid' }}
                />

                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-32 text-center pointer-events-none">
                    <div className="text-[9px] font-bold text-[var(--accent)] tracking-widest uppercase mb-1">{node.year}</div>
                    <div className="text-[10px] text-white font-bold tracking-wider leading-tight group-hover:text-[var(--accent)] transition-colors">{node.role}</div>
                </div>
            </div>
        </motion.div>
      ))}
    </div>
  );
};

const MobileTimelineList: React.FC<{ onSelect: (item: TimelineNodeData) => void }> = ({ onSelect }) => {
    return (
        <div className="space-y-4 mb-24">
            {TIMELINE_DATA.map((node) => (
                <div
                    key={node.id}
                    onClick={() => onSelect(node)}
                    className="p-4 border border-white/10 bg-white/5 rounded-sm hover:border-[var(--accent)] transition-colors cursor-pointer"
                >
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] text-[var(--accent)] font-bold tracking-widest uppercase">{node.year}</span>
                        <span className="text-[8px] text-white/40 tracking-wider uppercase">{node.company}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white uppercase mb-1">{node.role}</h3>
                    <p className="text-[10px] text-white/60 line-clamp-2">{node.description}</p>
                </div>
            ))}
        </div>
    );
};

const SkillTreeIllustration: React.FC = () => {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    return (
        <div className="relative w-full h-[600px] mb-24">
            <svg className="w-full h-full overflow-visible">
                 {/* Links */}
                 {SKILL_NODES.map(node => (
                     node.connections.map(targetId => {
                         const target = SKILL_NODES.find(n => n.id === targetId);
                         if(!target) return null;
                         return (
                             <motion.line
                                key={`${node.id}-${targetId}`}
                                x1={`${node.x}%`} y1={`${node.y}%`}
                                x2={`${target.x}%`} y2={`${target.y}%`}
                                stroke="white"
                                strokeOpacity="0.3"
                                strokeWidth="1"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                             />
                         )
                     })
                 ))}

                 {/* Nodes */}
                 {SKILL_NODES.map((node, i) => (
                     <motion.g
                        key={node.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 + (i * 0.05) }}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        className="cursor-pointer"
                        data-testid={`skill-node-${node.id}`}
                     >
                         <circle cx={`${node.x}%`} cy={`${node.y}%`} r="3" fill="var(--accent)" />
                         <rect
                            x={`${node.x}%`}
                            y={`${node.y + 2}%`}
                            width="100" height="20"
                            fill="none"
                            transform={`translate(-50, 0)`}
                        />
                         <text
                            x={`${node.x}%`}
                            y={`${node.y + 4}%`}
                            textAnchor="middle"
                            fill="white"
                            fontSize="10"
                            fontFamily="monospace"
                            className="uppercase tracking-widest font-bold"
                            fillOpacity={hoveredNode === node.id ? 1 : 0.7}
                            style={{ transition: 'fill-opacity 0.3s' }}
                         >
                             {node.label}
                         </text>
                     </motion.g>
                 ))}
            </svg>

            {/* Tooltip Overlay */}
            <AnimatePresence>
                {hoveredNode && (() => {
                    const node = SKILL_NODES.find(n => n.id === hoveredNode);
                    if (!node || !node.fullText) return null;
                    return (
                        <motion.div
                            key="tooltip"
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute z-20 pointer-events-none bg-black/90 border border-[var(--accent)]/30 backdrop-blur-md px-4 py-3 rounded max-w-xs text-center shadow-[0_0_15px_rgba(0,255,156,0.1)]"
                            style={{
                                left: `calc(${node.x}% - 100px)`, // Center approx
                                top: `calc(${node.y}% + 30px)`,
                                width: '200px'
                            }}
                        >
                            <div className="text-[9px] tracking-widest text-[var(--accent)] uppercase font-bold mb-1">{node.label}</div>
                            <div className="text-xs text-white/80 leading-relaxed font-mono">
                                {node.fullText}
                            </div>
                        </motion.div>
                    );
                })()}
            </AnimatePresence>
        </div>
    )
}

const MobileSkillList: React.FC = () => {
    const categories = ['code', 'design', 'ai', 'soft'] as const;

    return (
        <div className="space-y-8 mb-24">
            {categories.map((cat) => (
                <div key={cat} className="space-y-4">
                     <h3 className="text-[10px] text-[var(--accent)] font-bold tracking-[0.2em] uppercase border-b border-white/10 pb-2">
                         {cat === 'soft' ? 'LEADERSHIP & SOFT SKILLS' : cat + ' SKILLS'}
                     </h3>
                     <div className="grid grid-cols-2 gap-3">
                         {SKILL_NODES.filter(n => n.category === cat && n.fullText).map(node => (
                             <div key={node.id} className="p-3 bg-white/5 border border-white/10 rounded-sm">
                                 <div className="text-[10px] font-bold text-white uppercase mb-1">{node.label}</div>
                                 <div className="text-[9px] text-white/50">{node.fullText.split(',')[0]}</div>
                             </div>
                         ))}
                     </div>
                </div>
            ))}
        </div>
    );
};

const CertificatesGrid: React.FC<{ onSelect: (cert: CertificateData) => void }> = ({ onSelect }) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {CERTIFICATES.map((cert, i) => (
                <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    onClick={() => onSelect(cert)}
                    className="aspect-square border border-white/10 hover:border-[var(--accent)] bg-white/5 hover:bg-[var(--accent)]/10 transition-all cursor-pointer p-4 flex flex-col justify-between group"
                >
                    <div className="flex justify-between items-start">
                        <div className="w-2 h-2 bg-white/20 group-hover:bg-[var(--accent)]" />
                        <div className="text-[8px] tracking-widest text-white/30 uppercase">{cert.date}</div>
                    </div>

                    <div className="space-y-2">
                        <div className="text-[8px] tracking-[0.2em] text-[var(--accent)] uppercase">{cert.type}</div>
                        <div className="text-[10px] font-bold leading-tight uppercase group-hover:text-white transition-colors">{cert.title}</div>
                    </div>

                    <div className="text-[8px] tracking-widest text-white/30 uppercase text-right group-hover:text-white/50">{cert.issuer}</div>
                </motion.div>
            ))}
        </div>
    )
}

// --- Main Component ---

const ExperiencesArchive: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedItem, setSelectedItem] = useState<TimelineNodeData | CertificateData | null>(null);

  return (
    <div className="h-full w-full flex flex-col relative px-6 lg:pl-16 lg:pr-24 overflow-y-auto lg:overflow-hidden pt-20 lg:pt-0">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00ff9c] rounded-full blur-[120px] opacity-5 pointer-events-none" />

        {/* Close Button (Global) */}
        {!selectedItem && (
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
                {selectedItem ? (
                     <motion.div
                        key="detail"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full flex items-center"
                    >
                        <DetailView item={selectedItem} onClose={() => setSelectedItem(null)} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="w-full space-y-12 max-h-full overflow-y-auto pr-4 custom-scrollbar pb-24"
                    >
                        {/* Header */}
                        <div className="pt-8">
                            <h1 className="text-3xl font-bold tracking-tighter text-white mb-1">EXPERIENCES</h1>
                            <div className="text-[10px] tracking-[0.3em] text-[var(--accent)] uppercase font-bold">
                                Career Timeline & Skill Matrix
                            </div>
                        </div>

                        {/* Timeline */}
                        <section>
                            <SectionTitle delay={0.2}>My Experience Timeline</SectionTitle>
                            <div className="hidden lg:block">
                                <TimelineMap onSelect={setSelectedItem} />
                            </div>
                            <div className="lg:hidden">
                                <MobileTimelineList onSelect={setSelectedItem} />
                            </div>
                        </section>

                        {/* Skills */}
                        <section>
                            <SectionTitle delay={0.4}>Skill Tree System</SectionTitle>
                             <div className="text-sm leading-relaxed text-white/70 font-light mb-8 max-w-xl">
                                The visual design resembles expanding tree branches, symbolizing growth and mastery over time.
                            </div>
                            <div className="hidden lg:block">
                                <SkillTreeIllustration />
                            </div>
                            <div className="lg:hidden">
                                <MobileSkillList />
                            </div>
                        </section>

                        {/* Certificates */}
                        <section>
                             <SectionTitle delay={0.6}>Certificates & Awards</SectionTitle>
                             <CertificatesGrid onSelect={setSelectedItem} />
                        </section>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </div>
  );
};

export default ExperiencesArchive;
