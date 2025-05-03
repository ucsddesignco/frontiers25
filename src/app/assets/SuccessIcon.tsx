export default function SuccessIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} width="32" height="32" fill="none" viewBox="0 0 32 32">
      <g filter="url(#filter0_dd_6827_444)">
        <path
          fill="#337E1A"
          fillRule="evenodd"
          d="m12.668 20.586 11.96-11.96 1.414 1.415-13.374 13.374-6.707-6.708 1.414-1.414z"
          clipRule="evenodd"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_dd_6827_444"
          width="34"
          height="36"
          x="-1"
          y="-2"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="1"></feOffset>
          <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"></feColorMatrix>
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_6827_444"></feBlend>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="-1"></feOffset>
          <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix>
          <feBlend
            in2="effect1_dropShadow_6827_444"
            mode="hard-light"
            result="effect2_dropShadow_6827_444"
          ></feBlend>
          <feBlend in="SourceGraphic" in2="effect2_dropShadow_6827_444" result="shape"></feBlend>
        </filter>
      </defs>
    </svg>
  );
}
