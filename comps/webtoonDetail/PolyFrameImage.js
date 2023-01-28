export const PolyFrameImage = ({ href }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34">
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#70efcf" />
        <stop offset="100%" stopColor="#cea671" />
      </linearGradient>
      <path
        id="path"
        d="M 1 2 L 1 32 Q 1 33 2 33 L 23 33 C 24 33 24 33 30 29 C 33 27 33 27 33 26 L 33 2 Q 33 1 32 1 L 2 1 Q 1 1 1 2"
      />
      <clipPath id="clip">
        <use href="#path" />
      </clipPath>
    </defs>
    <use href="#path" stroke="url(#gradient)" stroke-width="0.5" fill="none" />
    <image
      width="100%"
      clipPath="url(#clip)"
      xlinkHref={href}
    />
  </svg>
);
