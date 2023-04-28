import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import { useRef, useState } from "react";

export default function CopyAddress({ walletAddress }) {
  const [isCopied, setIsCopied] = useState(false);
  const textRef = useRef();
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const handleCopyClick = () => {
    copyTextToClipboard(textRef.current.innerText)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 5000);
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <div
      onClick={handleCopyClick}
      className="group flex items-center gap-1.5"
      aria-label="Copy Wallet Address"
    >
      <button
        ref={textRef}
        aria-label="Copy Wallet Address"
        className="px-3 py-1 max-w-[120px] bg-mainBg text-white text-sm rounded-full truncate md:text-base"
      >
        {walletAddress}
      </button>
      {isCopied ? (
        <Tippy
          render={(attrs) => (
            <div
              {...attrs}
              id="tooltip"
              className="tooltip flex items-center justify-center"
              role="tooltip"
            >
              <span className="mx-2 my-1 text-sm">Address Copied</span>
              <div id="arrow" className="arrow" data-popper-arrow=""></div>
            </div>
          )}
        >
          <button aria-label="Check Icon">
            <FontAwesomeIcon icon={faCheck} className="text-mintGreen" />
          </button>
        </Tippy>
      ) : (
        <Tippy
          render={(attrs) => (
            <div
              {...attrs}
              id="tooltip"
              className="tooltip flex items-center justify-center"
              role="tooltip"
            >
              <span className="mx-2 my-1 text-sm">Copy Address</span>
              <div id="arrow" className="arrow" data-popper-arrow=""></div>
            </div>
          )}
        >
          <button aria-label="Copy Icon">
            <FontAwesomeIcon icon={faCopy} className="text-white" />
          </button>
        </Tippy>
      )}
    </div>
  );
}
