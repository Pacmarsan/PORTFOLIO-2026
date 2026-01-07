import React from 'react';

interface HoloCardProps {
  x: number;
  y: number;
  width?: number;
  height?: number;
  scale?: number;
  opacity?: number;
  logoUrl?: string;
  label?: string;
  isFocused?: boolean;
  onClick?: () => void;
  color?: string;
}

export const HoloCard: React.FC<HoloCardProps> = ({
  x,
  y,
  width = 60,
  height = 90,
  scale = 1,
  opacity = 1,
  logoUrl,
  label,
  isFocused = false,
  onClick,
  color = '#00f0ff'
}) => {
  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      opacity={opacity}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      className="holo-card-group"
    >
      {/* Glow Filter Def would be global, but we can simulate with stacked strokes */}

      {/* Card Background - Glass Effect */}
      <rect
        x={-width / 2}
        y={-height / 2}
        width={width}
        height={height}
        fill={isFocused ? color : "#000"}
        fillOpacity={isFocused ? 0.1 : 0.6}
        stroke={isFocused ? color : "white"}
        strokeWidth={isFocused ? 1.5 : 0.5}
        strokeOpacity={isFocused ? 1 : 0.3}
        rx="2"
      />

      {/* Internal Tech Lines */}
      <line
        x1={-width/2 + 5} y1={-height/2 + 10}
        x2={width/2 - 5} y2={-height/2 + 10}
        stroke={color} strokeWidth="0.5" strokeOpacity="0.5"
      />
      <rect
        x={-width/2 + 5} y={height/2 - 15}
        width={10} height={2}
        fill={color} fillOpacity="0.8"
      />

      {/* Logo / Image Placeholder */}
      {logoUrl ? (
        <image
          href={logoUrl}
          x={-width/2 + 10}
          y={-height/2 + 20}
          width={width - 20}
          height={height - 40}
          preserveAspectRatio="xMidYMid meet"
          opacity={0.8}
        />
      ) : (
         <circle cx="0" cy="0" r="10" fill="none" stroke={color} strokeWidth="1" />
      )}

      {/* Label (Tiny Text) */}
      {label && (
        <text
          x="0"
          y={height/2 + 15}
          textAnchor="middle"
          fill="white"
          fontSize="6"
          fontFamily="monospace"
          opacity={0.7}
          letterSpacing="1"
        >
          {label.length > 8 ? label.substring(0, 8) + '..' : label}
        </text>
      )}

      {/* Focused Highlight */}
      {isFocused && (
        <rect
            x={-width / 2 - 2}
            y={-height / 2 - 2}
            width={width + 4}
            height={height + 4}
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            strokeDasharray="2 2"
            rx="4"
        />
      )}
    </g>
  );
};
