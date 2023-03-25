import {
  faArrowLeft,
  faArrowRight,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import useScreenSize from "../../utils/useScreenSize";
import scrollToTop from "../../utils/scrollToTop";

export default function Buttons({
  allEpisodes,
  viewportHeight,
  elementHeight,
}) {
  //Get screen width to set the botton size
  const { screenWidth } = useScreenSize();

  //Use params to specify prev/next episodes
  const {
    query: { episodeNumber, webtoonId, language },
  } = useRouter();

  const episodeNo = parseInt(episodeNumber);
  const prevEpisode = allEpisodes[episodeNo - 2];
  const nextEpisode = allEpisodes[episodeNo];
  const nextReleased =
    nextEpisode?.attributes.released_timestamp * 1000 < new Date().getTime();
  return (
    <div id="buttons" className="fixed w-full bottom-0 duration-200">
      <div className="relative max-w-[768px] md:max-w-[630px]">
        <div className="flex items-center justify-center gap-8 py-8 font-bold">
          <a
            href={
              "/webtoons/" +
              webtoonId +
              "/episode/" +
              prevEpisode?.attributes.episode_number +
              "/" +
              language
            }
            style={{
              display: prevEpisode ? "block" : "none",
            }}
            className="gradientBorder py-3 px-4 "
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-lg" />
            <span
              style={{
                display:
                  screenWidth < 768 && nextReleased ? "none" : "inline-block",
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
              nextEpisode?.attributes.episode_number +
              "/" +
              language
            }
            style={{
              display: nextReleased ? "block" : "none",
            }}
            className="gradientBorder py-3 px-4"
          >
            <span
              style={{
                display:
                  screenWidth < 768 && prevEpisode ? "none" : "inline-block",
              }}
              className="mr-3"
            >
              Ep.{episodeNo + 1}
            </span>
            <FontAwesomeIcon icon={faArrowRight} className="text-lg" />
          </a>
        </div>
        <button
          id="scrollToTop"
          onClick={scrollToTop}
          title="Scroll To Top"
          style={{
            opacity: viewportHeight > elementHeight + 80 ? "0" : "1",
            pointerEvents:
              viewportHeight > elementHeight + 80 ? "none" : "auto",
          }}
        >
          <FontAwesomeIcon
            icon={faArrowUp}
            className="absolute right-0 top-1 gradientBorder m-8 px-3.5 py-3 text-lg"
          />
        </button>
      </div>
    </div>
  );
}
