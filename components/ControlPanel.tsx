
import React, { useState } from 'react';
import { ICONS } from '../constants';

interface ControlPanelProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
  history: string[];
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onGenerate, isLoading, history }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    onGenerate(prompt);
    setPrompt('');
  };

  return (
    <div className="flex flex-col h-full bg-[#0d0d0d] border-r border-white/5 p-6 w-80 lg:w-96">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
          <i className="fas fa-wind text-xl"></i>
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight">Lumina</h1>
          <p className="text-xs text-white/40 uppercase tracking-widest">Motion Studio</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6">
        <section>
          <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-3 block">Instruction</label>
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., '12 dots breathing in a circle with a stagger delay'"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 min-h-[120px] resize-none transition-all placeholder:text-white/20"
            />
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="absolute bottom-3 right-3 w-10 h-10 bg-blue-600 hover:bg-blue-500 disabled:bg-white/10 rounded-lg flex items-center justify-center transition-all shadow-lg"
            >
              {isLoading ? <i className="fas fa-circle-notch fa-spin"></i> : ICONS.SEND}
            </button>
          </form>
        </section>

        {history.length > 0 && (
          <section>
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-3 block">Recent Explorations</label>
            <div className="space-y-2">
              {history.map((h, i) => (
                <button
                  key={i}
                  onClick={() => onGenerate(h)}
                  className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 text-xs text-white/60 truncate transition-all"
                >
                  {h}
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="bg-blue-900/10 rounded-xl p-4 border border-blue-500/20">
          <h4 className="text-xs font-bold text-blue-400 mb-2 flex items-center gap-2">
            <i className="fas fa-lightbulb"></i>
            Pro Tip
          </h4>
          <p className="text-[11px] text-blue-100/60 leading-relaxed">
            Specify "stagger", "easing", or "spring physics" for more nuanced control over the animation timing.
          </p>
        </section>
      </div>

      <div className="pt-6 border-t border-white/5">
        <div className="flex items-center justify-between text-[10px] text-white/20 font-medium">
          <span>GEMINI 3 PRO</span>
          <span>ANIME.JS ENGINE</span>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
