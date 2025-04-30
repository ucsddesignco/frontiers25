import { CardSvgProps } from '@/app/components/customization/SimplifiedCard';

export const Rectangular = ({ bgColor, borderColor }: CardSvgProps) => (
  <svg
    width="300"
    height="400"
    viewBox="0 0 300 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0H300V400H0V0Z" fill={bgColor} />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M297 3H3V397H297V3ZM0 0V400H300V0H0Z"
      fill={borderColor}
    />
  </svg>
);
