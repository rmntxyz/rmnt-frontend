import {
  faArrowRight,
  faCopy,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import Collectors from "./Collectors";

export default function Desc({ item, users }) {
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

  return (
    <div className="container mx-auto my-20 md:my-36">
      <div className="max-w-[72%] mx-auto flex flex-col lg:max-w-[80%] lg:gap-16 lg:grid lg:grid-cols-2 xl:gap-24 xl:max-w-[90%] 2xl:max-w-[97%]">
        <div className="mb-12 md:mb-20">
          <div className="mt-3.5  md:mt-4">
            <span className="text-xl font-extrabold uppercase md:text-[32px]">
              {item.attributes.title}
            </span>
            <div className="inline-block w-1 aspect-square m-2 bg-lightGray rounded-full md:w-1.5 md:m-3"></div>
            <span className="align-text-bottom whitespace-nowrap text-lg font-extrabold md:text-3xl">
              vol. {item.attributes.volume}
            </span>
          </div>
          <div className="text-justify my-3.5 text-sm md:my-4 md:text-lg">
            {item.attributes.description}
          </div>
          <a
            href={
              "/artists/" + item.attributes.artist_id.data.id + "/#webtoons"
            }
            className="text-[#CEA671] flex items-center gap-1.5 text-sm hover:underline md:text-lg"
          >
            <span>View all series</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </div>
        <div className="flex flex-col gap-5 md:gap-8">
          <div className="flex flex-col gap-4 border-2 border-mediumGray">
            <div className="flex gap-2.5 py-2.5 px-3.5 bg-[#F3F3F3] items-center md:p-5">
              <a
                href={"/artists/" + item.attributes.artist_id.data.id}
                className="relative rounded-full w-16 h-16 md:w-20 md:h-20"
              >
                <Image
                  src={`https://rmnt.herokuapp.com${item.attributes.artist_id.data.attributes.profile_image.data.attributes.url}
                  `}
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
                <div
                  onClick={handleCopyClick}
                  className="group flex items-center"
                >
                  <button
                    id="to be copied"
                    aria-label="Copy Wallet Adress"
                    className="px-3 py-1 bg-lightGray text-white text-[11px] rounded-full md:text-xs"
                  >
                    {item.attributes.artist_id.data.attributes.wallet_address}
                  </button>
                  <button className="opacity-0 transition-opacity px-2 text-[#555555] group-hover:opacity-100">
                    {isCopied ? "Copied!" : <FontAwesomeIcon icon={faCopy} />}
                  </button>
                </div>
              </div>
            </div>
            <div className="text-sm md:text-base mx-5 md:mx-8">
              {item.attributes.artist_id.data.attributes.description}
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
          <Collectors users={users} />
        </div>
      </div>
    </div>
  );
}
