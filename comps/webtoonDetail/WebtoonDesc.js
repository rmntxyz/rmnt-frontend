import {
  faArrowRight,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import ArtistDesc from "./ArtistDesc";

export default function WebtoonDesc({ item, users }) {
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
            <div id="desc" className={`${showText ? "" : "truncate-5"}`}>
              <ReactMarkdown children={item.attributes.description} />
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
        <ArtistDesc item={item} users={users} />
      </div>
    </div>
  );
}
