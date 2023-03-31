export const PolyFrameImage = ({ href, idx }) => (
  <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <image
      width="100%"
      height="100%"
      clipPath={"url(#clip" + idx + ")"}
      xlinkHref={href}
    />
    <path
      id={"path" + idx}
      d="M168 0.5C174.351 0.5 179.5 5.64873 179.5 12V143.569C179.5 147.262 177.726 150.731 174.731 152.893L140.888 177.324C138.929 178.739 136.574 179.5 134.157 179.5H12C5.64874 179.5 0.5 174.351 0.5 168V12C0.5 5.64872 5.64873 0.5 12 0.5H168Z"
      stroke={"url(#gradient" + idx + ")"}
    />
    <defs>
      <linearGradient
        id={"gradient" + idx}
        x1="19.8"
        y1="16.9438"
        x2="122.153"
        y2="210.577"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#70EFCF" />
        <stop offset="1" stop-color="#CEA671" />
      </linearGradient>
      <linearGradient id="gradientHover" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#70efcf" />
        <stop offset="100%" stopColor="#cea671" />
      </linearGradient>
      <clipPath id={"clip" + idx}>
        <use href={"#path" + idx} />
      </clipPath>
    </defs>
  </svg>
);
