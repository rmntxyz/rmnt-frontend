import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Avatar from "./Avatar";
import Benefits from "./Benefits";
import Patrons from "./Patrons";

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
          <Image
            src="/KakaoTalk_Photo_2023-01-27-11-57-45.png"
            width={20}
            height={20}
          />
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
      <Avatar NFT={NFT} exchangeRate={exchangeRate} webtoon={webtoon} />
      <Benefits />
      <Patrons uniqueUsers={uniqueUsers} webtoon={webtoon} />
    </div>
  );
}
