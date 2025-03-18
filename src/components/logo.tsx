interface CryptoLogoProps {
  className?: string
  size?: number
}

export function CryptoLogo({className = '', size = 40}: CryptoLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="coinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent) " />
        </linearGradient>
      </defs>

      {/* Background circle */}
      <circle cx="40" cy="40" r="36" fill="var(--primary)" stroke="var(--border)" strokeWidth="2" />

      {/* Coin shape */}
      <circle cx="40" cy="40" r="28" fill="url(#coinGradient)" />

      {/* Inner circle (hole) */}
      <circle cx="40" cy="40" r="14" fill="var(--primary)" />

      {/* Chart line */}
      <path
        d="M20 50 L28 42 L36 46 L44 30 L52 38 L60 26"
        stroke="var(--primary)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Up arrow */}
      <path
        d="M38 32 L40 28 L42 32"
        stroke="var(--primary)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}
