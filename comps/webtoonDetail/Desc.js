import {
  faArrowRight,
  faCopy,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Collectors from "./Collectors";

export default function Desc({ item }) {
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    copyTextToClipboard(item.authorWallet)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mx-auto my-20 md:my-36">
      <div className="max-w-[85%] mx-auto flex flex-col lg:max-w-[93%] lg:gap-16 lg:grid lg:grid-cols-2 xl:gap-24">
        <div className="mb-12 md:mb-20">
          <div className="mt-3.5  md:mt-4">
            <span className="text-2xl font-extrabold uppercase md:text-5xl">
              {item.title}
            </span>
            <div className="inline-block w-1 aspect-square m-2 bg-lightGray rounded-full md:w-1.5 md:m-3"></div>
            <span className="align-text-bottom whitespace-nowrap text-lg font-extrabold md:text-3xl">
              vol. {item.vol}
            </span>
          </div>
          <div className="text-justify my-3.5 md:my-4 md:text-xl">
            {item.desc}
          </div>
          <a
            href="/"
            className="text-[#CEA671] flex items-center gap-1.5 hover:underline md:text-xl"
          >
            <span>View all series</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </div>
        <div className="flex flex-col gap-5 md:gap-8">
          <div className="flex flex-col gap-4 border-2 border-mediumGray">
            <div className="flex gap-2.5 py-2.5 px-3.5 bg-[#F3F3F3] items-center md:p-5">
              <a href={item.profileLink}>
                <img
                  src={item.profile}
                  className="rounded-full w-16 h-16 md:w-20 md:h-20"
                />
              </a>
              <div className="flex flex-col gap-1.5">
                <a href={item.profileLink}>
                  <div className="font-bold md:text-2xl">{item.author}</div>
                </a>
                <div
                  onClick={handleCopyClick}
                  className="group flex items-center"
                >
                  <button className="px-3 py-1 bg-lightGray text-white text-xs rounded-full md:text-base">
                    {item.authorWallet}
                  </button>
                  <button className="opacity-0 transition-opacity px-2 text-[#555555] group-hover:opacity-100">
                    {isCopied ? "Copied!" : <FontAwesomeIcon icon={faCopy} />}
                  </button>
                </div>
              </div>
            </div>
            <div className="text-sm md:text-lg mx-5 md:mx-8">
              {item.authorDesc}
            </div>
            <div className="flex mb-6 mx-5 gap-5 text-[#555555] md:mx-8 md:gap-7">
              <a
                href={`https://www.instagram.com/${item.authorInstagram}`}
                target="_blank"
                className="flex items-center gap-0.5 text-xs hover:underline md:text-base"
              >
                <img
                  src="/instagram/artist_instagram_1440_768@2x.png"
                  className="w-5 md:w-6"
                />
                <span>@{item.authorInstagram}</span>
              </a>
              <a
                href={`mailto:${item.authorEmail}`}
                target="_blank"
                className="flex items-center gap-1.5 text-xs hover:underline md:text-base"
              >
                <FontAwesomeIcon icon={faEnvelope} />
                {item.authorEmail}
              </a>
            </div>
          </div>
          <Collectors collectors={item.collectors} />
        </div>
      </div>
    </div>
  );
}
