export function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Slide shape - wider with more padding */}
      <rect
        x="2"
        y="2"
        width="40"
        height="30"
        rx="3"
        stroke="hsl(195, 90%, 55%)"
        strokeWidth="2"
        fill="white"
      />
      {/* Text lines on left side */}
      <rect x="6" y="8" width="8" height="1.6" rx="0.8" fill="hsl(195, 60%, 80%)" />
      <rect x="6" y="12" width="6" height="1.3" rx="0.65" fill="hsl(195, 50%, 87%)" />
      <rect x="6" y="15" width="7" height="1.3" rx="0.65" fill="hsl(195, 50%, 87%)" />
      <rect x="6" y="18" width="5" height="1.3" rx="0.65" fill="hsl(195, 50%, 87%)" />
      <rect x="6" y="21" width="7" height="1.3" rx="0.65" fill="hsl(195, 50%, 87%)" />
      <rect x="6" y="24" width="5.5" height="1.3" rx="0.65" fill="hsl(195, 50%, 87%)" />
      {/* Text lines on right side */}
      <rect x="30" y="8" width="8" height="1.6" rx="0.8" fill="hsl(195, 60%, 80%)" />
      <rect x="31" y="12" width="6" height="1.3" rx="0.65" fill="hsl(195, 50%, 87%)" />
      <rect x="30" y="15" width="7" height="1.3" rx="0.65" fill="hsl(195, 50%, 87%)" />
      <rect x="31.5" y="18" width="5" height="1.3" rx="0.65" fill="hsl(195, 50%, 87%)" />
      <rect x="30" y="21" width="7" height="1.3" rx="0.65" fill="hsl(195, 50%, 87%)" />
      <rect x="31" y="24" width="5.5" height="1.3" rx="0.65" fill="hsl(195, 50%, 87%)" />
      {/* Upload arrow (the "nose") */}
      <path
        d="M22 24V14M19 16.5L22 13l3 3.5"
        stroke="hsl(175, 55%, 40%)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Glasses - lenses sit on both sides of arrow tip */}
      {/* Left lens */}
      <circle
        cx="15.5"
        cy="18.5"
        r="3"
        stroke="#222222"
        strokeWidth="1.4"
        fill="none"
      />
      {/* Right lens */}
      <circle
        cx="28.5"
        cy="18.5"
        r="3"
        stroke="#222222"
        strokeWidth="1.4"
        fill="none"
      />
      {/* Bridge resting on the arrow "nose" */}
      <path
        d="M18.5 17.5C19.5 16.5 24.5 16.5 25.5 17.5"
        stroke="#222222"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Left temple */}
      <path
        d="M12.5 18.5H11"
        stroke="#222222"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right temple */}
      <path
        d="M31.5 18.5H33"
        stroke="#222222"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Tray centered below arrow */}
      <path
        d="M17.5 26v2h9V26"
        stroke="hsl(175, 55%, 40%)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}
