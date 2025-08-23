export default function CurricoolLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 256 256"
      role="img"
      aria-label="Logo Curricool"
      className="w-20 h-20 drop-shadow-lg"
      {...props}
    >
      <defs>
        <linearGradient id="gradDoc" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#74C0FC" />
          <stop offset="100%" stopColor="#5A8DEE" />
        </linearGradient>
        <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#softGlow)">
        <path
          d="M64 36h88a8 8 0 0 1 5.7 2.3l34 34A8 8 0 0 1 194 78v110a16 16 0 0 1-16 16H64a16 16 0 0 1-16-16V52a16 16 0 0 1 16-16z"
          fill="url(#gradDoc)"
        />
        <path d="M152 36v32a10 10 0 0 0 10 10h32L152 36z" fill="#BBDDFF" opacity="0.9" />
      </g>

      <g opacity="0.85">
        <rect x="76" y="96" width="84" height="10" rx="5" fill="#FFD166" />
        <rect x="76" y="116" width="68" height="10" rx="5" fill="#FFD166" />
        <rect x="76" y="136" width="92" height="10" rx="5" fill="#FFD166" />
      </g>

      <g transform="translate(36,92)" filter="url(#softGlow)">
        <path
          d="M16 40c0-10 12-22 36-22 16 0 30 6 36 14 6-8 20-14 36-14 24 0 36 12 36 22v14c0 7-6 12-13 12-9 0-14-7-16-15-2-9-10-15-20-15-14 0-22 10-24 22-2-12-10-22-24-22-10 0-18 6-20 15-2 8-7 15-16 15-7 0-13-5-13-12V40z"
          fill="#FF6B6B"
          stroke="#2E5AA3"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        <rect x="22" y="44" width="52" height="34" rx="12" fill="#CDE9FF" stroke="#2E5AA3" strokeWidth="6" />
        <rect x="128" y="44" width="52" height="34" rx="12" fill="#CDE9FF" stroke="#2E5AA3" strokeWidth="6" />
        <rect x="96" y="56" width="16" height="8" rx="4" fill="#2E5AA3" />
        <path d="M40 52c8 0 14-6 14-6" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
        <path d="M146 52c8 0 14-6 14-6" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
      </g>

      <g opacity="0.9">
        <path d="M36 106c8 2 12 6 14 14-2 8-6 12-14 14-8-2-12-6-14-14 2-8 6-12 14-14z" fill="#FFD166" opacity="0.7" />
        <path d="M214 92c7 2 10 5 12 12-2 7-5 10-12 12-7-2-10-5-12-12 2-7 5-10 12-12z" fill="#BBDDFF" opacity="0.8" />
      </g>
    </svg>
  );
}
