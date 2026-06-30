interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 32, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="logoGrad2" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>

      {/* Rounded square background */}
      <rect width="32" height="32" rx="8" fill="url(#logoGrad)" />

      {/* Radar rings */}
      <circle cx="16" cy="17" r="11" stroke="white" strokeOpacity="0.15" strokeWidth="1" fill="none" />
      <circle cx="16" cy="17" r="7" stroke="white" strokeOpacity="0.2" strokeWidth="1" fill="none" />
      <circle cx="16" cy="17" r="3" fill="white" fillOpacity="0.9" />

      {/* Signal arc top */}
      <path
        d="M9 10 Q16 4 23 10"
        stroke="white"
        strokeOpacity="0.7"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Signal arc top 2 (smaller) */}
      <path
        d="M11.5 12.5 Q16 8 20.5 12.5"
        stroke="white"
        strokeOpacity="0.9"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Upward arrow / spike from center dot */}
      <line x1="16" y1="14" x2="16" y2="8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <polyline points="13.5,10.5 16,8 18.5,10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
