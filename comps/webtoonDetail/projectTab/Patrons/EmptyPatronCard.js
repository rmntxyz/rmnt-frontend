import styles from "./EmptyPatronCard.module.css";

export const EmptyPatronCard = ({ idx, textOne, textTwo, loading }) => (
  <div className="relative">
    <svg viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
      <path
        id={"path" + idx}
        d="M168 0.5C174.351 0.5 179.5 5.64873 179.5 12V143.569C179.5 147.262 177.726 150.731 174.731 152.893L140.888 177.324C138.929 178.739 136.574 179.5 134.157 179.5H12C5.64874 179.5 0.5 174.351 0.5 168V12C0.5 5.64872 5.64873 0.5 12 0.5H168Z"
        stroke={"url(#gradient" + idx + ")"}
        strokeOpacity="0.2"
        fill="rgba(255, 255, 255, 0.04)"
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
          <stop stopColor="#70EFCF" />
          <stop offset="1" stopColor="#CEA671" />
        </linearGradient>
      </defs>
    </svg>
    {loading ? (
      <div className="animate-pulse absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="bg-white/20 w-1/3 h-1/3 rounded-full"></div>
      </div>
    ) : (
      <div
        className={`${styles.blink} absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center`}
        >
        <div>{textOne}</div>
        <div>{textTwo}</div>
      </div>
    )}
  </div>
);
