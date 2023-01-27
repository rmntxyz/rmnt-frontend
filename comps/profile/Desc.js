import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faChevronDown,
  faChevronUp,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Desc({ props }) {
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
    if (element.offsetHeight < element.scrollHeight) {
      setTruncated(true);
    }
  });

  //Toggle the "more/close" button
  const [showText, setShowText] = useState(false);

  //Add blur to top images while loading
  // const [loading, setLoading] = useState(true);
  // const handleLoading = () => {
  //   setLoading(false);
  // };

  return (
    <div>
      <div className="relative bg-[#CEA671] w-full h-[224px] md:h-[320px]">
        {props.attributes.background_image?.data ? (
          <Image
            src={props.attributes.background_image.data.attributes.url}
            // height={320}
            // width={1920}
            layout="fill"
            objectFit="cover"
            alt="Profile Background"
            placeholder="blur"
            blurDataURL={props.attributes.background_image.data.attributes.url}
            // style={{
            //   filter: loading ? "blur(20px)" : "none",
            //   transition: loading ? "none" : "filter 0.3s ease-out",
            // }}
          />
        ) : null}
      </div>
      <div className="relative mx-8 md:mx-28 2xl:container 2xl:mx-auto">
        <div className="absolute -top-24 border-8 border-white rounded-full bg-white w-32 h-32 shadow-small md:w-44 md:h-44 md:-top-36">
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              alt="Rarement Artist Profile Image"
              // onLoadingComplete={handleLoading}
              placeholder="blur"
              src={
                props.attributes.profile_image?.data
                  ? props.attributes.profile_image.data.attributes.url
                  : "/profile/profile_1440_768@2x.png"
              }
              blurDataURL={
                props.attributes.profile_image?.data
                  ? props.attributes.profile_image.data.attributes.url
                  : "/profile/profile_1440_768@2x.png"
              }
              layout="fill"
              objectFit="contain"
              // style={{
              //   filter: loading ? "blur(20px) " : "none",
              //   transition: loading ? "none" : "filter 0.3s ease-out",
              //   borderRadius: "50%",
              // }}
              className="rounded-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5 md:gap-8">
          <div className="flex justify-between mt-12 md:mt-20">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-1.5 md:gap-2">
                <span className="font-extrabold text-[21px] md:text-[32px]">
                  @{props.attributes.first_name}
                </span>
                <div className="relative aspect-square w-[18px] md:w-[28px]">
                  <Image
                    src="/icons/icons8-instagram-verification-badge 1.png"
                    alt="badge icon"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
              {props.attributes.wallet_address?.length > 0 ? (
                <div
                  onClick={handleCopyClick}
                  className="group flex items-center w-44"
                >
                  <button
                    id="to be copied"
                    className="px-3 py-1 bg-[#E8E8E8] text-ourBlack text-sm rounded-full truncate hover:underline md:text-base"
                    aria-label="Copy Wallet Address"
                  >
                    {props.attributes.wallet_address}
                  </button>
                  <button
                    className="opacity-0 transition-opacity px-2 text-[#555555] group-hover:opacity-100"
                    aria-label="Copy Icon"
                  >
                    {isCopied ? "Copied!" : <FontAwesomeIcon icon={faCopy} />}
                  </button>
                </div>
              ) : null}
            </div>
            {props.attributes.opensea?.length > 0 ? (
              <a
                href={props.attributes.opensea}
                target="_blank"
                className="relative group flex items-center rounded-full border border-ourBlack h-11 py-2 px-2 duration-200 md:px-8 hover:bg-ourBlack "
              >
                <div className="relative inline-block w-[25px] h-[22px] md:w-7 md:h-6 group-hover:opacity-0">
                  <Image
                    src="/openSea/openSea_black_2x.png"
                    layout="fill"
                    objectFit="contain"
                    alt="Open Sea Icon"
                  />
                </div>
                <div className="absolute inline-block opacity-0 top-2.5 left-2 w-[25px] h-[22px] md:w-7 md:h-6 md:left-8 group-hover:opacity-100">
                  <div className="relative w-full h-full">
                    <Image
                      src="/openSea/openSea_white_2x.png"
                      layout="fill"
                      objectFit="contain"
                      alt="Open Sea Icon"
                    />
                  </div>
                </div>
                <span className="hidden px-2 font-bold group-hover:text-white md:inline-block">
                  OpenSea
                </span>
              </a>
            ) : null}
          </div>
          {props.attributes.description?.length > 0 ? (
            <div className="text-sm text-justify md:text-lg lg:w-1/2">
              <div id="desc" className={`${showText ? "" : "truncate-2"}`}>
                <ReactMarkdown children={props.attributes.description} />
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
          ) : null}

          <div className="flex mb-14 gap-5 text-[#555555] md:gap-7 md:mb-20">
            {props.attributes.instagram?.length > 0 ? (
              <a
                href={`https://www.instagram.com/${props.instagram}`}
                target="_blank"
                className="flex items-center gap-0.5 text-xs hover:underline md:text-base"
              >
                <div className="relative w-5 h-5 md:w-6 md:h-6">
                  <Image
                    src="/instagram/artist_instagram_1440_768@2x.png"
                    alt="Instagram Icon"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <span className="hidden md:inline-block">
                  @{props.attributes.instagram}
                </span>
              </a>
            ) : null}
            {props.attributes.twitter?.length > 0 ? (
              <a
                href={`https://www.twitter.com/${props.attributes.twitter}`}
                target="_blank"
                className="flex items-center gap-1.5 text-xs hover:underline md:text-base"
              >
                <FontAwesomeIcon icon={faTwitter} />
                <span className="hidden md:inline-block">
                  @{props.attributes.twitter}
                </span>
              </a>
            ) : null}
            {props.attributes.email?.length > 0 ? (
              <a
                href={`mailto:${props.attributes.email}`}
                target="_blank"
                className="flex items-center gap-1.5 text-xs hover:underline md:text-base"
              >
                <div className="relative w-5 h-5 md:w-6 md:h-6">
                  <Image
                    src="/profile/profile_website_1440_768@2x.png"
                    alt="Website Icon"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <span className="hidden md:inline-block">
                  {props.attributes.email}
                </span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}