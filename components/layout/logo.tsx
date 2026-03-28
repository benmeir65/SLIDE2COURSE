export function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Number 2 as the main shape with arrow at top */}
      {/* The curved top of 2 with arrow tip */}
      <path
        d="M12 14C12 9 16 5 22 5C28 5 32 9 32 14C32 18 29 21 25 23L12 33"
        stroke="hsl(195, 90%, 45%)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Bottom line of 2 */}
      <path
        d="M12 33H32"
        stroke="hsl(195, 90%, 45%)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrow at the top of the 2 - pointing up */}
      <path
        d="M18 8L22 4L26 8"
        stroke="hsl(175, 55%, 40%)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Small presentation/slide icon at bottom left of 2 */}
      <rect
        x="4"
        y="30"
        width="10"
        height="8"
        rx="1"
        stroke="hsl(195, 70%, 55%)"
        strokeWidth="1.5"
        fill="white"
      />
      {/* Lines inside presentation */}
      <line x1="6" y1="33" x2="12" y2="33" stroke="hsl(195, 50%, 75%)" strokeWidth="1" />
      <line x1="6" y1="35" x2="10" y2="35" stroke="hsl(195, 50%, 75%)" strokeWidth="1" />
      {/* Course/graduation cap icon at top right */}
      <path
        d="M34 10L40 13L34 16L28 13L34 10Z"
        fill="hsl(175, 55%, 40%)"
        stroke="hsl(175, 55%, 35%)"
        strokeWidth="0.5"
      />
      {/* Cap tassel */}
      <path
        d="M40 13V17"
        stroke="hsl(175, 55%, 40%)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="40" cy="18" r="1" fill="hsl(175, 55%, 40%)" />
    </svg>
  )
}
