export function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Number 2 - main central element acting as arrow/transition */}
      {/* Curved top section of the 2 with arrow tip at start */}
      <path
        d="M8 14C8 8 13 4 20 4C27 4 32 8 32 14C32 19 28 23 22 26L8 38"
        stroke="#1a1a1a"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Arrow head at the top of the curved section */}
      <path
        d="M16 8L20 4L24 8"
        stroke="#1a1a1a"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Bottom horizontal line of 2 */}
      <path
        d="M8 38H32"
        stroke="#1a1a1a"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Presentation/Slide icon - bottom right, on baseline of 2, to the right of its edge */}
      <g transform="translate(34, 32)">
        {/* Slide frame */}
        <rect
          x="0"
          y="0"
          width="12"
          height="9"
          rx="1.5"
          stroke="hsl(195, 80%, 50%)"
          strokeWidth="1.8"
          fill="white"
        />
        {/* Content lines inside slide */}
        <line x1="2.5" y1="3" x2="9.5" y2="3" stroke="hsl(195, 60%, 65%)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="2.5" y1="5.5" x2="7" y2="5.5" stroke="hsl(195, 60%, 65%)" strokeWidth="1.2" strokeLinecap="round" />
      </g>

      {/* Graduation cap/Course icon - below the curved top of 2, upper right area */}
      <g transform="translate(34, 8)">
        {/* Cap top */}
        <path
          d="M8 0L16 4L8 8L0 4L8 0Z"
          fill="hsl(175, 55%, 40%)"
        />
        {/* Cap base/band */}
        <path
          d="M2 5V9C2 9 5 11 8 11C11 11 14 9 14 9V5"
          stroke="hsl(175, 55%, 35%)"
          strokeWidth="1.2"
          fill="none"
        />
        {/* Tassel */}
        <path
          d="M16 4V10"
          stroke="hsl(175, 55%, 40%)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="16" cy="11.5" r="1.2" fill="hsl(175, 55%, 40%)" />
      </g>

      {/* Small arrow indicators showing flow direction */}
      {/* Arrow from slide toward 2 */}
      <path
        d="M34 36L31 36"
        stroke="hsl(195, 70%, 60%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        markerEnd="none"
      />
      
      {/* Arrow from 2 toward course */}
      <path
        d="M32 12L34 12"
        stroke="hsl(175, 50%, 50%)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
