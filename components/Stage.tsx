
import React, { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { MotionResponse } from '../types';

interface StageProps {
  config: MotionResponse | null;
  isPlaying: boolean;
  onFinished: () => void;
}

const Stage: React.FC<StageProps> = ({ config, isPlaying, onFinished }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeAnimationsRef = useRef<any[]>([]);
  const isCancelledRef = useRef<boolean>(false);

  useEffect(() => {
    isCancelledRef.current = false;

    const runSequence = async () => {
      if (!config || !isPlaying) return;

      // Stop any existing animations
      activeAnimationsRef.current.forEach(anim => {
        if (anim && typeof anim.pause === 'function') anim.pause();
      });
      activeAnimationsRef.current = [];

      // Reset positions to initial state (optional but good for consistency)
      // In v4, we can simply animate them back or reset styles if needed.
      
      try {
        for (const step of config.steps) {
          if (isCancelledRef.current) break;

          const { targets, ...settings } = step;
          
          // Process stagger if present in delay
          const processedSettings: any = { ...settings };
          if (typeof settings.delay === 'string' && settings.delay.includes('stagger')) {
            const match = settings.delay.match(/\d+/);
            const val = match ? parseInt(match[0]) : 100;
            processedSettings.delay = stagger(val);
          }

          // In v4, animate(targets, settings) returns a controller object that is awaitable
          const animation = animate(targets, processedSettings);
          activeAnimationsRef.current.push(animation);
          
          // Wait for this step to complete before moving to the next (mimics timeline)
          await animation;
        }
        
        if (!isCancelledRef.current) {
          onFinished();
        }
      } catch (err) {
        // Animation might have been cancelled
        console.debug('Animation sequence interrupted');
      }
    };

    runSequence();

    return () => {
      isCancelledRef.current = true;
      activeAnimationsRef.current.forEach(anim => {
        if (anim && typeof anim.pause === 'function') anim.pause();
      });
    };
  }, [config, isPlaying, onFinished]);

  const renderElements = () => {
    if (!config) return (
      <div className="flex flex-col items-center justify-center h-full opacity-20 text-center p-12">
        <div className="text-6xl mb-4">
          <i className="fas fa-sparkles"></i>
        </div>
        <p className="text-xl font-light">Describe a sequence to begin your motion exploration.</p>
      </div>
    );

    return config.elements.map((group) => {
      const elements = Array.from({ length: group.count }).map((_, i) => (
        <div
          key={`${group.id}-${i}`}
          className={`${group.id} w-12 h-12 flex items-center justify-center relative`}
          style={{ 
            backgroundColor: group.color,
            borderRadius: group.type === 'circle' ? '50%' : '8px',
            margin: '8px',
            boxShadow: `0 0 20px ${group.color}44`
          }}
        >
          {group.label && <span className="text-[10px] font-bold text-white opacity-50 pointer-events-none">{group.label}</span>}
        </div>
      ));

      return (
        <div key={group.id} className="flex flex-wrap items-center justify-center p-4">
          {elements}
        </div>
      );
    });
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden flex flex-col items-center justify-center"
      style={{
        backgroundImage: 'radial-gradient(circle at center, #111 0%, #050505 100%)'
      }}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="relative z-10 flex flex-col items-center">
        {renderElements()}
      </div>
    </div>
  );
};

export default Stage;
