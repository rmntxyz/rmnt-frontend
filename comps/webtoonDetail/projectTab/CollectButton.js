import { useState } from "react";
import styles from "./CollectButton.module.css";

export default function CollectButton({
  onCollect,
  isReady,
  isCollected,
  isCollecting,
  isCollectError,
  supplyLimitReached,
  holdingLimitReached,
}) {
  const [shake, setShake] = useState(false);

  const shakeHandler = () => {
    setShake(true);
    setTimeout(() => setShake(false), 200);
  };

  if (isCollecting) {
    return (
      <button
        aria-label="Collect NFT"
        disabled
        className="inline-flex px-8 py-3 mt-8 text-base font-bold rounded-3xl border-2 bg-navBg border-mintGreen text-white"
      >
        <svg className="animate-spin -ml-1 mr-3 h-6 w-6" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Collecting...
      </button>
    );
  }

  if (isCollected || isCollectError) {
    return (
      <button
        aria-label="Collect NFT"
        disabled
        className={` transition-all inline-flex px-8 py-3 mt-8 text-base font-bold rounded-3xl border-2 bg-navBg ${
          isCollected ? "border-mintGreen" : "border-mintRed"
        } text-white`}
      >
        <svg
          className={`${styles.mark} -ml-1 mr-3 h-5 w-5`}
          viewBox="0 0 24 24"
        >
          <circle
            className={styles.mark_circle}
            stroke={isCollected ? "rgb(112 239 207)" : "rgb(207 112 146)"}
            cx="12"
            cy="12"
            r="10"
          />
          <path
            className={styles.mark_inside}
            stroke={isCollected ? "rgb(112 239 207)" : "rgb(207 112 146)"}
            d={
              isCollected
                ? "M7,12 L10.5,15.5 L17.5,9"
                : "M8,8 L16,16 M16,8 L8,16"
            }
          />
        </svg>
        {isCollected ? "Success!!" : "Failed"}
      </button>
    );
  }

  if (!isReady) {
    return (
      <button
        aria-label="Collect NFT"
        disabled
        className="animate-pulse px-8 py-3 mt-8 w-32 h-12 bg-white/20 text-navBg text-base font-bold rounded-3xl"
      ></button>
    );
  }

  if (supplyLimitReached || holdingLimitReached) {
    return (
      <button
        aria-label="Collect NFT"
        onClick={shakeHandler}
        className={
          (shake ? styles.shake : "") +
          ` px-8 py-3 mt-8 text-gray-300 text-base font-bold rounded-3xl border-2 bg-mintGreen bg-opacity-10 border-mintGreen`
        }
      >
        {supplyLimitReached ? "Sold out" : "Maxed out"}
      </button>
    );
  }

  if (isReady) {
    return (
      <button
        onClick={() => onCollect?.()}
        aria-label="Collect NFT"
        className="transition-all px-8 py-3 mt-8 text-navBg text-base font-bold rounded-3xl border-2 bg-mintGreen border-mintGreen hover:bg-navBg hover:text-white"
      >
        Collect
      </button>
    );
  }
}
