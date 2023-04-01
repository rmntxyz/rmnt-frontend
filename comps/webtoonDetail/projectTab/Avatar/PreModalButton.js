import { useState } from "react";
import styles from "./CollectButton.module.css";
import Modal from "./Modal";

export default function PreModalButton(props) {
  const { isReady, supplyLimitReached, holdingLimitReached } = props;
  const [open, setOpen] = useState(false);
  const [shake, setShake] = useState(false);

  const shakeHandler = () => {
    setShake(true);
    setTimeout(() => setShake(false), 200);
  };
  if (!isReady) {
    return (
      <button
        aria-label="Collect NFT"
        disabled
        className="animate-pulse px-11 py-3 mt-8 w-32 h-12 bg-white/20 text-navBg text-base font-bold rounded-full"
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
          ` px-11 py-3 mt-8 text-gray-300 text-base font-bold rounded-full border-2 bg-mintGreen bg-opacity-10 border-mintGreen`
        }
      >
        {supplyLimitReached ? "Sold Out" : "Maxed Out"}
      </button>
    );
  }

  if (isReady) {
    return (
      <div>
        <button
          onClick={() => setOpen(true)}
          className="border-2 bg-mintGreen border-mintGreen hover:bg-navBg hover:text-white duration-200 px-11 py-3 mt-8 text-navBg text-base leading-tight font-bold rounded-full"
          aria-label="Collect Avatar"
        >
          Collect
        </button>
        {open ? <Modal {...props} setOpen={setOpen} /> : null}
      </div>
    );
  }
}
