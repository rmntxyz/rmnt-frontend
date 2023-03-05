import {
  faArrowLeft,
  faArrowRight,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import getScreenSize from "../../utils/getScreenSize";
import scrollToTop from "../../utils/scrollToTop";

export default function Buttons({ allEpisodes }) {
  const { screenWidth } = getScreenSize();

  const {
    query: { episodeNumber, webtoonId, language },
  } = useRouter();

  const episodeNo = parseInt(episodeNumber);

  return (
    <div id="buttons" className="fixed w-full bottom-0 duration-200">
      <div className="relative max-w-[768px] md:max-w-[630px]">
        <div className="flex items-center justify-center gap-8 py-8 font-bold">
          <a
            href={
              "/webtoons/" +
              webtoonId +
              "/episode/" +
              allEpisodes[episodeNo - 2]?.attributes.episode_number +
              "/" +
              language
            }
            style={{
              display: allEpisodes[episodeNo - 2] ? "block" : "none",
            }}
            className="gradientBorder py-3 px-4 "
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-lg" />
            <span
              style={{
                display:
                  screenWidth < 768 && allEpisodes[episodeNo]
                    ? "none"
                    : "inline-block",
              }}
              className="ml-3"
            >
              Ep.{episodeNo - 1}
            </span>
          </a>
          <a
            href={
              "/webtoons/" +
              webtoonId +
              "/episode/" +
              allEpisodes[episodeNo]?.attributes.episode_number +
              "/" +
              language
            }
            style={{
              display: allEpisodes[episodeNo] ? "block" : "none",
            }}
            className="gradientBorder py-3 px-4"
          >
            <span
              style={{
                display:
                  screenWidth < 768 && allEpisodes[episodeNo - 2]
                    ? "none"
                    : "inline-block",
              }}
              className="mr-3"
            >
              Ep.{episodeNo + 1}
            </span>
            <FontAwesomeIcon icon={faArrowRight} className="text-lg" />
          </a>
        </div>
        <button id="scrollToTop" onClick={scrollToTop}>
          <FontAwesomeIcon
            icon={faArrowUp}
            className="absolute right-0 top-1 gradientBorder m-8 px-3.5 py-3 text-lg"
          />
        </button>
      </div>
    </div>
  );
}
