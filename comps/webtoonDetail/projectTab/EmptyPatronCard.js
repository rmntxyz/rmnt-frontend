export const EmptyPatronCard = ({ idx }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34">
    {idx === 0 ? (
      <text x="10" y="10" fontSize="3" fill="white">
        <tspan x="10" dy="1.5em">
          Be the first
        </tspan>
        <tspan x="12" dy="1.5em">
          patron!
        </tspan>
      </text>
    ) : null}
    <defs>
      <linearGradient id={"gradient" + idx} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#70efcf" />
        <stop offset="100%" stopColor="#cea671" />
      </linearGradient>
      <linearGradient id="gradientHover" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#70efcf" />
        <stop offset="100%" stopColor="#cea671" />
      </linearGradient>
      <path
        id={"path" + idx}
        d="M 1 2 L 1 32 Q 1 33 2 33 L 23 33 C 24 33 24 33 30 29 C 33 27 33 27 33 26 L 33 2 Q 33 1 32 1 L 2 1 Q 1 1 1 2"
      />
    </defs>
    <use
      href={"#path" + idx}
      stroke={"url(#gradient" + idx + ")"}
      strokeWidth="0.5"
      strokeOpacity="0.2"
      fill="rgba(255, 255, 255, 0.04)"
    />
  </svg>
);
