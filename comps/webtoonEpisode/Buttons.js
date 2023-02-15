import {
  faArrowLeft,
  faArrowRight,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getScreenSize from "../../utils/getScreenSize";
import scrollToTop from "../../utils/scrollToTop";

export default function Buttons({ webtoon, episode, allEpisodes }) {
  const screenWidth = getScreenSize();
  return (
    <div id="buttons" className="fixed w-full bottom-0 duration-200">
      <div className="relative max-w-[768px] md:max-w-[630px]">
        <div className="flex items-center justify-center gap-8 py-8 font-bold">
          <a
            href={
              "/webtoons/" +
              webtoon.attributes.webtoon_id +
              "/episode/" +
              allEpisodes[episode.page_number - 2]?.attributes.page_number
            }
            style={{
              display: allEpisodes[episode.page_number - 2] ? "block" : "none",
            }}
            className="gradientBorder py-3 px-4 "
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-lg" />
            <span
              style={{
                display:
                  screenWidth < 768 && allEpisodes[episode.page_number]
                    ? "none"
                    : "inline-block",
              }}
              className="ml-3"
            >
              Ep.{episode.page_number - 1}
            </span>
          </a>
          <a
            href={
              "/webtoons/" +
              webtoon.attributes.webtoon_id +
              "/episode/" +
              allEpisodes[episode.page_number]?.attributes.page_number
            }
            style={{
              display: allEpisodes[episode.page_number] ? "block" : "none",
            }}
            className="gradientBorder py-3 px-4"
          >
            <span
              style={{
                display:
                  screenWidth < 768 && allEpisodes[episode.page_number - 2]
                    ? "none"
                    : "inline-block",
              }}
              className="mr-3"
            >
              Ep.{episode.page_number + 1}
            </span>
            <FontAwesomeIcon icon={faArrowRight} className="text-lg" />
          </a>
        </div>
        <button onClick={scrollToTop}>
          <FontAwesomeIcon
            icon={faArrowUp}
            className="absolute right-0 top-1 gradientBorder m-8 px-3.5 py-3 text-lg"
          />
        </button>
      </div>
    </div>
  );
}
