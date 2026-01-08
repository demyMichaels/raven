import React from 'react';

interface VisualizerProps {
  isActive: boolean;
  volume: number; // 0 to 1
  role: 'user' | 'model';
}

export const Visualizer: React.FC<VisualizerProps> = ({ isActive, volume, role }) => {
  // Generate a few bars to simulate a waveform
  const bars = Array.from({ length: 5 });
  
  const baseHeight = 20; // percent
  const colorClass = role === 'user' ? 'bg-emerald-400' : 'bg-blue-400';
  const glowClass = role === 'user' ? 'shadow-[0_0_15px_rgba(52,211,153,0.5)]' : 'shadow-[0_0_15px_rgba(96,165,250,0.5)]';

  return (
    <div className="flex items-center justify-center gap-2 h-24">
      {bars.map((_, i) => {
        // Calculate dynamic height based on volume and random jitter for effect
        let height = baseHeight;
        if (isActive) {
            // Center bars get more height
            const multiplier = 1 - Math.abs(i - 2) * 0.2;
            height = Math.max(10, Math.min(100, volume * 100 * 3 * multiplier));
        }

        return (
          <div
            key={i}
            className={`w-3 rounded-full ${colorClass} ${isActive ? glowClass : ''} visualizer-bar`}
            style={{ height: `${height}%` }}
          />
        );
      })}
    </div>
  );
};