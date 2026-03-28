export function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Number 2 as the main shape - acts as arrow from slide to course */}
      {/* The curved top of 2 */}
      <path
        d="M14 16C14 10 18 6 24 6C30 6 34 10 34 16C34 20 31 23 27 25L14 35"
        stroke="hsl(195, 90%, 45%)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Bottom line of 2 */}
      <path
        d="M14 35H34"
        stroke="hsl(195, 90%, 45%)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrow tip at the top of the curved 2 - pointing toward course */}
      <path
        d="M20 9L24 5L28 9"
        stroke="hsl(175, 55%, 40%)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Presentation/slide icon - at bottom right, on the base line of 2, to the right */}
      <rect
        x="36"
        y="31"
        width="10"
        height="8"
        rx="1"
        stroke="hsl(195, 70%, 55%)"
        strokeWidth="1.5"
        fill="white"
      />
      {/* Lines inside presentation */}
      <line x1="38" y1="34" x2="44" y2="34" stroke="hsl(195, 50%, 65%)" strokeWidth="1" />
      <line x1="38" y1="36" x2="42" y2="36" stroke="hsl(195, 50%, 65%)" strokeWidth="1" />

      {/* Course/graduation cap icon - below the top curve of 2, on the right */}
      <path
        d="M38 16L44 19L38 22L32 19L38 16Z"
        fill="hsl(175, 55%, 40%)"
        stroke="hsl(175, 55%, 35%)"
        strokeWidth="0.5"
      />
      {/* Cap tassel */}
      <path
        d="M44 19V23"
        stroke="hsl(175, 55%, 40%)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="44" cy="24" r="1" fill="hsl(175, 55%, 40%)" />
    </svg>
  )
}
