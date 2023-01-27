import {
  faChevronDown,
  faChevronUp,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ProjectTab({ webtoon, users, NFTs, exchangeRate }) {
  //Store the value of the NFT to be used on the screen
  const NFT = NFTs[0];

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

  //Remove duplicate collectors from the array
  const uniqueIds = [];
  const uniqueUsers = users.filter((item) => {
    if (item === null) return false;
    else {
      const isDuplicate = uniqueIds.includes(item.attributes.user_id);
      if (!isDuplicate) {
        uniqueIds.push(item.attributes.user_id);
        return true;
      }
      return false;
    }
  });

  return (
    <div className="mx-8 my-8 flex flex-col gap-8">
      <div className="relative w-fit">
        <span className="text-3xl font-bold">{webtoon.attributes.title}</span>
        <div className="bg-mintGreen/20 absolute h-1/2 w-full bottom-0"></div>
      </div>
      <div className="text-justify flex flex-col gap-3 justify-center items-start">
        <div className="text-2xl flex gap-1.5 items-center justify-start">
          {/* <FontAwesomeIcon icon={faPencil} /> */}
          <Image src="/KakaoTalk_Photo_2023-01-27-11-57-45.png" width={20} height={20} />
          <span>Synopsis</span>
        </div>
        <div id="desc" className={`${showText ? "" : "truncate-5"}`}>
          <ReactMarkdown children={webtoon.attributes.description} />
        </div>
        <button
          className="text-white/50 text-sm"
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
      <div className="mt-7 flex flex-col gap-4">
        <div className="text-2xl font-bold">Digital Avatars</div>
        <div className="flex gap-8">
          <div className="box w-full aspect-square">
            <Image
              src={NFT.attributes.image.data[0].attributes.url}
              width={336}
              height={336}
              layout="fill"
              className="clipped scale-[98.5%]"
            />
          </div>
          <div className="w-full flex flex-col gap-6">
            <div className="text-lg">
              Created by{" "}
              <span className="font-bold">
                {webtoon.attributes.artist_id.data.attributes.first_name}
              </span>
            </div>
            <div className="w-full h-px bg-white/10"></div>
            <div>
              <div className="flex items-center gap-1 mb-3">
                <svg
                  width="13"
                  height="19"
                  viewBox="0 0 13 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.48876 12.8914L12.0738 9.65178L5.44263 6.24341L6.48876 12.8914Z"
                    fill="#CCFFF2"
                  />
                  <path
                    d="M0.920654 9.66869L6.50567 12.9083V6.93524L0.920654 9.66869Z"
                    fill="#CCFFF2"
                  />
                  <path
                    d="M6.4887 0.574097L0.903687 9.66872L8.20976 6.41221L6.4887 0.574097Z"
                    fill="#70EFCF"
                  />
                  <path
                    d="M6.48877 0.574097V7.1715L12.0738 9.66872L6.48877 0.574097Z"
                    fill="#1EA280"
                  />
                  <path
                    d="M6.48879 18.4259L7.21434 14.3426L0.920654 10.698L6.48879 18.4259Z"
                    fill="#70EFCF"
                  />
                  <path
                    d="M6.48877 13.9376V18.4259L12.0738 10.698L6.48877 13.9376Z"
                    fill="#1EA280"
                  />
                </svg>

                <div className="font-bold text-base md:text-lg">
                  {parseFloat(NFT.attributes.price_in_wei) / Math.pow(10, 18)}{" "}
                  ETH
                </div>
                <div
                  className="text-white/50 text-sm"
                  style={{
                    visibility:
                      NFT.attributes.sold_timestamp?.toString().length > 0
                        ? "hidden"
                        : "visible",
                  }}
                >
                  (≈{" "}
                  {(
                    (exchangeRate * parseFloat(NFT.attributes.price_in_wei)) /
                    Math.pow(10, 18)
                  ).toFixed(4)}{" "}
                  USD)
                </div>
              </div>
              <div className="ml-4 mb-8">
                <span className="font-bold"></span>
                <span>/{NFT.attributes.quantity}</span>
                {NFT.attributes.sold_timestamp?.toString().length > 0 ? (
                  <span className="text-sm text-white/50 ml-1">(Soldout)</span>
                ) : (
                  <span className="text-sm text-white/50 ml-1">
                    (Available)
                  </span>
                )}
              </div>
              <button aria-label="Collect NFT" className="py-3">
                <span className="px-8 py-3 bg-mintGreen border-2 border-mintGreen text-navBg text-base leading-tight font-bold rounded-3xl hover:bg-navBg hover:text-white duration-200">
                  Collect
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-7 flex flex-col gap-4">
        <div className="text-2xl font-bold">Benefits</div>
        <div className="grid grid-cols-3">
          <svg
            style={{ visibility: "hidden", position: "absolute" }}
            width="0"
            height="0"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
          >
            <defs>
              <filter id="round">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="5"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>
          <div className="box aspect-square">
            <div className="innerBox"></div>
          </div>
          <div className="relative ">
            <div className="innerBox"></div>
          </div>
        </div>
      </div>
      <div className="mt-7 flex flex-col">
        <div className="text-2xl font-bold">Patrons</div>
        <div className="mt-3">
          The order of the patrons' list is determined by time of support.
        </div>
        <div className="w-full h-px my-6 bg-white/10"></div>
        <div className="grid grid-cols-2 gap-8 font-bold">
          {uniqueUsers && uniqueUsers.length ? (
            uniqueUsers.map((user, idx) => (
              <div className="flex items-center gap-3">
                <span
                  className="py-1 px-2.5 bg-opaqueGray rounded"
                  style={{ color: idx < 3 ? "#70EFCF" : "white" }}
                >
                  {idx + 1}
                </span>
                <Image
                  src={NFT.attributes.image.data[0].attributes.url}
                  width={52}
                  height={52}
                  className="rounded-full"
                />
                <span className="truncate">
                  {user.attributes.wallet_address}
                </span>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
