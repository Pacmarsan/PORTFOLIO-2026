export type PhaseName = 'hero' | 'worlds' | 'brands' | 'experiences' | 'products';

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
  { name: 'hero', start: 0, end: 0.2, color: '#00f5ff', label: 'IDENTITY', subtext: 'PACMARSAN CREATIVE UNIVERSE', particleType: 'drift' },
  { name: 'worlds', start: 0.3, end: 0.45, color: '#7c5cff', label: 'WORLDS', subtext: 'MANGA & STORY IP', particleType: 'spiral' },
  { name: 'brands', start: 0.55, end: 0.7, color: '#ffffff', label: 'BRANDS', subtext: 'CONTENT & AI ADS', particleType: 'linear' },
  { name: 'experiences', start: 0.8, end: 0.92, color: '#00ff9c', label: 'EXPERIENCES', subtext: 'INTERFACE PLANES', particleType: 'flow' },
  { name: 'products', start: 0.92, end: 1.0, color: '#ffb703', label: 'PRODUCTS', subtext: 'WEB APPS & SYSTEMS', particleType: 'pulse' }
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