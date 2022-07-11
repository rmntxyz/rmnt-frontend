import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";

export default function Desc({ props }) {
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    copyTextToClipboard(props.wallet_address)
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

  const [loading, setLoading] = useState(true);
  const handleLoading = () => {
    setLoading(false);
  };

  return (
    <div>
      <div
        className="h-[224px] md:h-[320px] bg-[#CEA671] bg-center bg-cover bg-no-repeat "
        style={
          props.background_picture !== null &&
          props.background_picture !== undefined &&
          props.background_picture !== ""
            ? {
                backgroundImage: "url(" + props.background_picture + ")",
                filter: loading ? "blur(20px)" : "none",
                transition: loading ? "none" : "filter 0.3s ease-out",
              }
            : {
                filter: loading ? "blur(20px)" : "none",
                transition: loading ? "none" : "filter 0.3s ease-out",
              }
        }
      ></div>
      <div className="relative container mx-auto">
        <div className="mx-auto max-w-[82%] md:max-w-[77%] lg:max-w-[90%]">
          <div className="absolute -top-24 border-8 border-white rounded-full w-32 h-32 drop-shadow-small md:w-44 md:h-44 md:-top-36">
            <div className="overflow-hidden w-full h-full rounded-full">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  onLoadingComplete={handleLoading}
                  src={
                    props.profile_picture !== null &&
                    props.profile_picture !== undefined &&
                    props.profile_picture !== ""
                      ? props.profile_picture
                      : "/profile/profile_1440_768@2x.png"
                  }
                  layout="fill"
                  objectFit="contain"
                  style={{
                    filter: loading ? "blur(20px)" : "none",
                    transition: loading ? "none" : "filter 0.3s ease-out",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 md:gap-8">
            <div className="flex justify-between mt-12 md:mt-20">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <span className="font-extrabold text-[26px] md:text-[40px]">
                    @{props.name}
                  </span>
                  <img
                    src="/icons/icons8-instagram-verification-badge 1.png"
                    className="aspect-square w-6 md:w-9"
                  />
                </div>
                <div
                  onClick={handleCopyClick}
                  className="group flex items-center"
                >
                  <button className="px-3 py-1 bg-[#E8E8E8] text-ourBlack text-xs rounded-full hover:underline md:text-base">
                    {props.wallet_address}
                  </button>
                  <button className="opacity-0 transition-opacity px-2 text-[#555555] group-hover:opacity-100">
                    {isCopied ? "Copied!" : <FontAwesomeIcon icon={faCopy} />}
                  </button>
                </div>
              </div>
              {props.opensea !== null &&
              props.opensea !== undefined &&
              props.opensea !== "" ? (
                <a
                  href={props.opensea}
                  target="_blank"
                  className="relative group flex items-center rounded-full border border-ourBlack h-11 py-2 px-2 duration-200 md:px-8 hover:bg-ourBlack "
                >
                  <img
                    src="/openSea/openSea_black_2x.png"
                    className="inline-block w-[25px] h-[22px] md:w-7 md:h-6 group-hover:opacity-0"
                  />
                  <img
                    src="/openSea/openSea_white_2x.png"
                    className="absolute inline-block opacity-0 top-2.5 left-2 w-[25px] h-[22px] md:w-7 md:h-6 md:left-8 group-hover:opacity-100"
                  />
                  <span className="hidden px-2 font-bold group-hover:text-white md:inline-block">
                    OpenSea
                  </span>
                </a>
              ) : null}
            </div>
            {props.description !== null &&
            props.description !== undefined &&
            props.description !== "" ? (
              <div className="text-base md:text-xl lg:w-1/2">
                {props.description}
              </div>
            ) : null}
            {props.description !== null &&
            props.description !== undefined &&
            props.description !== "" ? (
              <div className="flex mb-14 gap-5 text-[#555555] md:gap-7 md:mb-20">
                {props.instagram !== null &&
                props.instagram !== undefined &&
                props.instagram !== "" ? (
                  <a
                    href={`https://www.instagram.com/${props.instagram}`}
                    target="_blank"
                    className="flex items-center gap-0.5 text-xs hover:underline md:text-base"
                  >
                    <img
                      src="/instagram/artist_instagram_1440_768@2x.png"
                      className="w-5 md:w-6"
                    />
                    <span className="hidden md:inline-block">
                      @{props.instagram}
                    </span>
                  </a>
                ) : null}
                {props.twitter !== null &&
                props.twitter !== undefined &&
                props.twitter !== "" ? (
                  <a
                    href={`https://www.twitter.com/${props.twitter}`}
                    target="_blank"
                    className="flex items-center gap-1.5 text-xs hover:underline md:text-base"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                    <span className="hidden md:inline-block">
                      @{props.twitter}
                    </span>
                  </a>
                ) : null}
                {props.email !== null &&
                props.email !== undefined &&
                props.email !== "" ? (
                  <a
                    href={`mailto:${props.email}`}
                    target="_blank"
                    className="flex items-center gap-1.5 text-xs hover:underline md:text-base"
                  >
                    <img
                      src="/profile/profile_website_1440_768@2x.png"
                      className="w-5 md:w-6"
                    />
                    <span className="hidden md:inline-block">
                      {props.email}
                    </span>
                  </a>
                ) : null}
              </div>
            ) : (
              <div className="h-[50px] md:h-[83px]"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
