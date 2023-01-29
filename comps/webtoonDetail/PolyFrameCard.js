export const PolyFrameCard = ({ href }) => (
  <svg id="cardSVG" viewBox="0 0 238 340" xmlns="http://www.w3.org/2000/svg">
    <g
      id="cardG"
      filter="url(#filter0_d_2449_5660)"
      stroke="url(#cardGradient)"
      strokeWidth="1"
      fill="white"
      fillOpacity="0.04"
    >
      <path
        id="cardPath"
        d="M232 13C232 8.58172 228.418 5 224 5H14C9.58172 5 6 8.58173 6 13V328C6 332.418 9.58173 336 14 336H176.726C178.407 336 180.045 335.47 181.408 334.486L228.683 300.359C230.766 298.855 232 296.442 232 293.873V13Z"
        shapeRendering="crispEdges"
      />
      <image xlinkHref={href} width="100%" y="-5" clipPath="url(#imageClip)" />
    </g>
    <defs>
      <clipPath id="imageClip">
        <use href="#cardPath" />
      </clipPath>
      <linearGradient id="cardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#70efcf" />
        <stop offset="100%" stopColor="#cea671" />
      </linearGradient>
      <filter
        id="filter0_d_2449_5660"
        x="0"
        y="0"
        width="246"
        height="351"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="4" dy="5" />
        <feGaussianBlur stdDeviation="5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2449_5660"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_2449_5660"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
