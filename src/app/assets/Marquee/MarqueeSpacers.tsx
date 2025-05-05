interface MarqueeSpacerProps {
  accent?: string;
}

export const RectangularSpacer = ({ accent = 'black' }: MarqueeSpacerProps) => (
  <span className="h-8 w-8" style={{ backgroundColor: accent }}></span>
);

export const RoundedSpacer = ({ accent = 'black' }: MarqueeSpacerProps) => (
  <span className="h-8 w-8 rounded-full" style={{ backgroundColor: accent }}></span>
);

export const BeveledSpacer = ({ accent = 'black' }: MarqueeSpacerProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <g clip-path="url(#clip0_5941_3216)">
      <path d="M9 0H23L32 9V23L23 32H9L0 23V9L9 0Z" fill={accent} />
    </g>
    <defs>
      <clipPath id="clip0_5941_3216">
        <rect width="32" height="32" rx="8" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const SquircleSpacer = ({ accent = 'black' }: MarqueeSpacerProps) => (
  <span className="h-8 w-8 rounded-[8px]" style={{ backgroundColor: accent }}></span>
);
