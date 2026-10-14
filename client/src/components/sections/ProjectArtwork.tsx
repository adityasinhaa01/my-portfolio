import type { FC } from 'react';

interface ProjectArtworkProps {
  type: 'architecture' | 'algorithms' | 'editorial';
}

export const ProjectArtwork: FC<ProjectArtworkProps> = ({ type }) => {
  if (type === 'architecture') {
    return (
      <svg viewBox="0 0 800 500" className="w-full h-full object-cover bg-[#0d0d11]" aria-hidden="true">
        <defs>
          <radialGradient id="warmGlow1" cx="25%" cy="25%" r="70%">
            <stop offset="0%" stopColor="#d89b64" stopOpacity="0.24" />
            <stop offset="60%" stopColor="#5e361c" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0d0d11" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill="url(#warmGlow1)" />
        {/* Architectural Orchestration Diagram */}
        <g stroke="#e8dfd3" strokeOpacity="0.22" fill="none" strokeWidth="1.2">
          <rect x="90" y="110" width="170" height="110" rx="4" />
          <rect x="315" y="80" width="180" height="140" rx="4" stroke="#d8b48a" strokeOpacity="0.55" />
          <rect x="550" y="110" width="160" height="110" rx="4" />
          <rect x="200" y="290" width="400" height="110" rx="4" />
          <path d="M260 165 L315 165" stroke="#d8b48a" strokeOpacity="0.7" />
          <path d="M495 165 L550 165" stroke="#d8b48a" strokeOpacity="0.7" />
          <path d="M405 220 L405 290" stroke="#d8b48a" strokeOpacity="0.7" />
        </g>
        <g fill="#f4ece1" fontFamily="'Cormorant Garamond', Georgia, serif">
          <text x="115" y="155" fontSize="22" fillOpacity="0.9">Producer Queue</text>
          <text x="115" y="182" fontSize="11" fill="#d8b48a" fontFamily="'IBM Plex Mono', monospace" letterSpacing="2">INGESTION</text>

          <text x="342" y="138" fontSize="24">Scheduler Core</text>
          <text x="342" y="168" fontSize="11" fill="#d8b48a" fontFamily="'IBM Plex Mono', monospace" letterSpacing="2">STATE MACHINE</text>

          <text x="575" y="155" fontSize="22" fillOpacity="0.9">Worker Pool</text>
          <text x="575" y="182" fontSize="11" fill="#d8b48a" fontFamily="'IBM Plex Mono', monospace" letterSpacing="2">EXECUTION</text>

          <text x="235" y="340" fontSize="24" fillOpacity="0.92">Persistent Event Log &amp; Telemetry Store</text>
          <text x="235" y="368" fontSize="11" fill="#d8b48a" fontFamily="'IBM Plex Mono', monospace" letterSpacing="2">POSTGRESQL · REDIS STREAM</text>
        </g>
      </svg>
    );
  }

  if (type === 'algorithms') {
    return (
      <svg viewBox="0 0 800 500" className="w-full h-full object-cover bg-[#0d0d11]" aria-hidden="true">
        <defs>
          <radialGradient id="warmGlow2" cx="70%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#c97d42" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#0d0d11" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill="url(#warmGlow2)" />
        {/* Weighted Graph Traversal Composition */}
        <g stroke="#e8dfd3" strokeOpacity="0.2" strokeWidth="1.5">
          <line x1="160" y1="260" x2="310" y2="140" stroke="#d8b48a" strokeOpacity="0.75" strokeWidth="2" />
          <line x1="310" y1="140" x2="490" y2="170" stroke="#d8b48a" strokeOpacity="0.75" strokeWidth="2" />
          <line x1="490" y1="170" x2="640" y2="250" stroke="#d8b48a" strokeOpacity="0.75" strokeWidth="2" />
          <line x1="160" y1="260" x2="330" y2="350" />
          <line x1="310" y1="140" x2="330" y2="350" />
          <line x1="330" y1="350" x2="520" y2="340" />
          <line x1="490" y1="170" x2="520" y2="340" />
          <line x1="520" y1="340" x2="640" y2="250" />
        </g>
        {[
          { x: 160, y: 260, active: true, label: 'S' },
          { x: 310, y: 140, active: true, label: 'A' },
          { x: 490, y: 170, active: true, label: 'B' },
          { x: 640, y: 250, active: true, label: 'T' },
          { x: 330, y: 350, active: false, label: 'C' },
          { x: 520, y: 340, active: false, label: 'D' }
        ].map((node, idx) => (
          <g key={idx}>
            <circle
              cx={node.x}
              cy={node.y}
              r="28"
              fill={node.active ? '#1d1712' : '#121217'}
              stroke={node.active ? '#e0b079' : '#f4ece1'}
              strokeOpacity={node.active ? '0.9' : '0.28'}
              strokeWidth="2"
            />
            <text
              x={node.x}
              y={node.y + 6}
              textAnchor="middle"
              fill="#f4ece1"
              fontFamily="'IBM Plex Mono', monospace"
              fontSize="16"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 800 500" className="w-full h-full object-cover bg-[#0d0d11]" aria-hidden="true">
      <defs>
        <radialGradient id="warmGlow3" cx="40%" cy="60%" r="65%">
          <stop offset="0%" stopColor="#b8733e" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0d0d11" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="url(#warmGlow3)" />
      {/* Editorial Typography & Knowledge Graph Layout */}
      <rect x="110" y="75" width="580" height="350" rx="6" fill="#121216" stroke="#f4ece1" strokeOpacity="0.16" />
      <line x1="270" y1="75" x2="270" y2="425" stroke="#f4ece1" strokeOpacity="0.12" />
      <g fill="#f4ece1">
        <text x="140" y="130" fontSize="11" fontFamily="'IBM Plex Mono', monospace" fill="#d8b48a" letterSpacing="2">INDEX</text>
        <rect x="140" y="155" width="90" height="8" rx="2" fillOpacity="0.35" />
        <rect x="140" y="180" width="75" height="8" rx="2" fillOpacity="0.2" />
        <rect x="140" y="205" width="82" height="8" rx="2" fillOpacity="0.2" />

        <text x="315" y="150" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="34" fillOpacity="0.92">
           Systems &amp; Notes
        </text>
        <rect x="315" y="180" width="310" height="10" rx="2" fillOpacity="0.3" />
        <rect x="315" y="202" width="280" height="10" rx="2" fillOpacity="0.3" />
        <rect x="315" y="224" width="240" height="10" rx="2" fillOpacity="0.2" />
        <rect x="315" y="268" width="320" height="95" rx="4" fill="#191614" stroke="#d8b48a" strokeOpacity="0.35" />
        <text x="335" y="305" fontFamily="'IBM Plex Mono', monospace" fontSize="13" fill="#e0b885">
          SELECT title, slug FROM notes WHERE indexed = 1;
        </text>
      </g>
    </svg>
  );
};
