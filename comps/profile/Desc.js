import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";

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

  //Add blur to top images while loading
  const [loading, setLoading] = useState(true);
  const handleLoading = () => {
    setLoading(false);
  };

  return (
    <div>
      <div
        className="h-[224px] md:h-[320px] bg-[#CEA671] bg-center bg-cover bg-no-repeat "
        style={
          props.attributes.background_image?.data
            ? {
                backgroundImage:
                  `url(${props.attributes.background_image.data.attributes.url})`,
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
          <div className="absolute -top-24 border-8 border-white rounded-full w-32 h-32 shadow-small md:w-44 md:h-44 md:-top-36">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                alt="Rarement Artist Profile Image"
                onLoadingComplete={handleLoading}
                src={
                  props.attributes.profile_image
                    ? props.attributes.profile_image.data.attributes.url
                    : "/profile/profile_1440_768@2x.png"
                }
                layout="fill"
                objectFit="contain"
                style={{
                  filter: loading ? "blur(20px) " : "none",
                  transition: loading ? "none" : "filter 0.3s ease-out",
                  borderRadius: "50%",
                }}
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
                <div
                  onClick={handleCopyClick}
                  className="group flex items-center"
                >
                  <button
                    id="to be copied"
                    className="px-3 py-1 bg-[#E8E8E8] text-ourBlack text-sm rounded-full hover:underline md:text-base"
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
              <div className="text-sm md:text-lg lg:w-1/2">
                {props.attributes.description}
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
    </div>
  );
}
