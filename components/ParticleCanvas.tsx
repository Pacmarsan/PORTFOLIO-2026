
import React, { useEffect, useRef } from 'react';
import { Phase } from '../types';

interface ParticleCanvasProps {
  progress: number;
  activePhase: Phase;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ progress, activePhase }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const count = window.innerWidth < 768 ? 120 : 600;
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.1
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = activePhase.color;
      
      particlesRef.current.forEach((p) => {
        // Update behavior based on phase
        switch (activePhase.particleType) {
          case 'drift':
            p.x += p.vx * 0.5;
            p.y += p.vy * 0.5;
            break;
          case 'spiral':
            const dx = p.x - canvas.width / 2;
            const dy = p.y - canvas.height / 2;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) + 0.01;
            p.x = canvas.width / 2 + Math.cos(angle) * dist;
            p.y = canvas.height / 2 + Math.sin(angle) * dist;
            p.y += 1; // downward spiral drift
            break;
          case 'linear':
            p.x += 2;
            if (p.x > canvas.width) p.x = 0;
            break;
          case 'flow':
            const noise = Math.sin(p.x * 0.005) * 2;
            p.y += noise;
            p.x += 1;
            break;
          case 'pulse':
            const scale = 1 + Math.sin(Date.now() * 0.005) * 0.2;
            p.x += p.vx * scale;
            p.y += p.vy * scale;
            break;
        }

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [activePhase.particleType]); // Only re-init behavior on phase type change

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 opacity-40 transition-colors duration-1000"
      style={{ filter: 'blur(1px)' }}
    />
  );
};

export default ParticleCanvas;
