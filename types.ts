export type PhaseName = 'hero' | 'worlds' | 'brands' | 'experiences' | 'products' | 'contacts';

export interface Phase {
  name: PhaseName;
  start: number;
  end: number;
  color: string;
  label: string;
  subtext: string;
  particleType: 'drift' | 'spiral' | 'linear' | 'flow' | 'pulse';
}

export const PHASES: Phase[] = [
  { name: 'hero', start: 0, end: 0.14, color: '#00f5ff', label: 'IDENTITY', subtext: 'PACMARSAN CREATIVE UNIVERSE', particleType: 'drift' },
  { name: 'worlds', start: 0.16, end: 0.30, color: '#7c5cff', label: 'WORLDS', subtext: 'MANGA & STORY IP', particleType: 'spiral' },
  { name: 'brands', start: 0.32, end: 0.46, color: '#ffffff', label: 'BRANDS', subtext: 'CONTENT & AI ADS', particleType: 'linear' },
  { name: 'experiences', start: 0.48, end: 0.62, color: '#00ff9c', label: 'EXPERIENCES', subtext: 'INTERFACE PLANES', particleType: 'flow' },
  { name: 'products', start: 0.64, end: 0.78, color: '#ffb703', label: 'PRODUCTS', subtext: 'WEB APPS & SYSTEMS', particleType: 'pulse' },
  { name: 'contacts', start: 0.80, end: 1.0, color: '#ff2a6d', label: 'CONTACT', subtext: 'SYSTEM LINK', particleType: 'drift' }
];

/* Define interfaces for the AI-generated motion configuration */
export interface MotionElement {
  id: string;
  type: string;
  count: number;
  color: string;
  label?: string;
}

export interface MotionStep {
  targets: string;
  translateX?: string | number;
  translateY?: string | number;
  scale?: string | number;
  rotate?: string | number;
  opacity?: string | number;
  backgroundColor?: string;
  borderRadius?: string;
  duration?: number;
  delay?: string | number;
  easing?: string;
  direction?: string;
  loop?: boolean | number;
}

export interface MotionResponse {
  explanation: string;
  elements: MotionElement[];
  steps: MotionStep[];
}