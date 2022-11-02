import {
  faChevronDown,
  faChevronUp,
  faCopy,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ArtistDesc({ item, users }) {
  //Copy wallet address
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    copyTextToClipboard(document.getElementById("to be copied").textContent)
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

  //Find if the text is truncated & display the "more/close" button if the text is truncated
  const [truncated, setTruncated] = useState(false);

  useEffect(() => {
    const element = document.getElementById("desc");
    if (
      element.offsetHeight < element.scrollHeight ||
      element.offsetWidth < element.scrollWidth
    ) {
      setTruncated(true);
    }
  });

  //Toggle the "more/close" button
  const [showText, setShowText] = useState(false);

  return (
    <div className="flex flex-col gap-5 md:gap-8">
      <div className="flex flex-col gap-4 border-2 border-mediumGray">
        <div className="flex gap-2.5 py-2.5 px-3.5 bg-[#F3F3F3] items-center md:p-5">
          <a
            href={"/artists/" + item.attributes.artist_id.data.id}
            className="relative rounded-full w-16 h-16 md:w-20 md:h-20"
          >
            <Image
              src={
                item.attributes.artist_id.data.attributes.profile_image.data
                  .attributes.url
              }
              layout="fill"
              objectFit="contain"
              alt="Rarement Artist Profile Picture"
              className="rounded-full"
            />
          </a>
          <div className="flex flex-col gap-1.5">
            <a href={"/artists/" + item.attributes.artist_id.data.id}>
              <div className="font-bold text-sm md:text-lg">
                {item.attributes.artist_id.data.attributes.first_name}
              </div>
            </a>
            {item.attributes.artist_id.data.attributes.wallet_address ? (
              <div
                onClick={handleCopyClick}
                className="group flex items-center w-36"
              >
                <button
                  id="to be copied"
                  aria-label="Copy Wallet Adress"
                  className="px-3 py-1 bg-lightGray text-white text-[11px] rounded-full truncate md:text-xs"
                >
                  {item.attributes.artist_id.data.attributes.wallet_address}
                </button>
                <button
                  aria-label="Copy Wallet Adress"
                  className="opacity-0 transition-opacity px-2 text-[#555555] group-hover:opacity-100"
                >
                  {isCopied ? "Copied!" : <FontAwesomeIcon icon={faCopy} />}
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <div className="text-sm text-justify mx-5 md:text-base md:mx-8">
          <div id="desc" className={`${showText ? "" : "truncate-2"}`}>
            <ReactMarkdown
              children={item.attributes.artist_id.data.attributes.description}
            />
          </div>
          <button
            className="text-[#555555] text-xs md:text-base"
            onClick={(e) => setShowText(!showText)}
            style={{ display: truncated ? "block" : "none" }}
          >
            <span>{showText ? "close" : "more"}</span>
            <FontAwesomeIcon
              icon={showText ? faChevronUp : faChevronDown}
              size="xs"
              className="ml-1"
            />
          </button>
        </div>
        <div className="flex mb-6 mx-5 gap-5 text-[#555555] text-[13px] md:mx-8 md:gap-7">
          {item.attributes.artist_id.data.attributes.instagram ? (
            <a
              href={`https://www.instagram.com/${item.attributes.artist_id.data.attributes.instagram}`}
              target="_blank"
              className="flex items-center gap-0.5 hover:underline"
            >
              <div className="relative w-5 h-5 md:w-6 md:h-6">
                <Image
                  src="/instagram/artist_instagram_1440_768@2x.png"
                  layout="fill"
                  objectFit="contain"
                  alt="Instagram Icon"
                />
              </div>
              <span className="hidden sm:inline-block">
                @{item.attributes.artist_id.data.attributes.instagram}
              </span>
            </a>
          ) : null}
          {item.attributes.artist_id.data.attributes.email ? (
            <a
              href={`mailto:${item.attributes.artist_id.data.attributes.email}`}
              target="_blank"
              className="flex items-center gap-1.5 hover:underline"
            >
              <FontAwesomeIcon icon={faEnvelope} />
              <span className="hidden sm:inline-block">
                {item.attributes.artist_id.data.attributes.email}
              </span>
            </a>
          ) : null}
        </div>
      </div>
      {/* <Collectors users={users} /> */}
    </div>
  );
}
