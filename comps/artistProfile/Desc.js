import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Desc({ artist }) {
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    copyTextToClipboard(artist.wallet_address)
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
    <div>
      <div>
        <div
          className="h-[224px] md:h-[320px] bg-center bg-cover bg-no-repeat "
          style={{ backgroundImage: "url(" + artist.background_picture + ")" }}
        ></div>
        <div className="relative container mx-auto">
          <div className="mx-auto max-w-[82%] md:max-w-[77%] lg:max-w-[90%]">
            <img
              src={artist.profile_picture}
              className="absolute -top-24 border-8 border-white rounded-full w-32 aspect-square drop-shadow-small md:w-44 md:-top-36"
            />
            <div className="flex flex-col gap-5 md:gap-8">
              <div className="flex justify-between mt-12 md:mt-20">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <span className="font-extrabold text-[26px] md:text-[40px]">
                      @{artist.name}
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
                      {artist.wallet_address}
                    </button>
                    <button className="opacity-0 transition-opacity px-2 text-[#555555] group-hover:opacity-100">
                      {isCopied ? "Copied!" : <FontAwesomeIcon icon={faCopy} />}
                    </button>
                  </div>
                </div>
                <a
                  href={artist.opensea}
                  target="_blank"
                  className="relative group flex items-center rounded-full border border-ourBlack h-11 py-2 px-2 duration-200 md:px-8 hover:bg-ourBlack "
                >
                  <img
                    src="/openSea/openSea_black.png"
                    className="inline-block group-hover:opacity-0"
                  />
                  <img
                    src="/openSea/openSea_white.png"
                    className="absolute inline-block opacity-0 top-2 left-2 md:left-8 group-hover:opacity-100"
                  />
                  <span className="hidden px-2 font-bold group-hover:text-white md:inline-block">
                    OpenSea
                  </span>
                </a>
              </div>

              <div className="text-base md:text-xl lg:w-1/2">
                {artist.description}
              </div>
              <div className="flex mb-14 gap-5 text-[#555555] md:gap-7 md:mb-20">
                <a
                  href={`https://www.instagram.com/${artist.instagram}`}
                  target="_blank"
                  className="flex items-center gap-0.5 text-xs hover:underline md:text-base"
                >
                  <img
                    src="/instagram/artist_instagram_1440_768@2x.png"
                    className="w-5 md:w-6"
                  />
                  <span className="hidden md:inline-block">@{artist.instagram}</span>
                </a>
                <a
                  href={`https://www.twitter.com/${artist.twitter}`}
                  target="_blank"
                  className="flex items-center gap-1.5 text-xs hover:underline md:text-base"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                  <span className="hidden md:inline-block">@{artist.twitter}</span>
                </a>
                <a
                  href={`mailto:${artist.email}`}
                  target="_blank"
                  className="flex items-center gap-1.5 text-xs hover:underline md:text-base"
                >
                  <img
                    src="/profile_website_1440_768@2x.png"
                    className="w-5 md:w-6"
                  />
                  <span className="hidden md:inline-block">{artist.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
