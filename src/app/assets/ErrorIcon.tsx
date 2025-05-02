export default function ErrorIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
      <g filter="url(#filter0_dd_6827_970)">
        <path
          fill="#AC271E"
          fillRule="evenodd"
          d="m17.414 16 7.293-7.293-1.414-1.414L16 14.586 8.707 7.293 7.293 8.707 14.586 16l-7.293 7.293 1.414 1.414L16 17.414l7.293 7.293 1.414-1.414z"
          clipRule="evenodd"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_dd_6827_970"
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
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_6827_970"></feBlend>
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
            in2="effect1_dropShadow_6827_970"
            mode="hard-light"
            result="effect2_dropShadow_6827_970"
          ></feBlend>
          <feBlend in="SourceGraphic" in2="effect2_dropShadow_6827_970" result="shape"></feBlend>
        </filter>
      </defs>
    </svg>
  );
}
