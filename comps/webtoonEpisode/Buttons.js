import {
  faArrowLeft,
  faArrowRight,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import scrollToTop from "../../utils/scrollToTop";
import Link from "next/link";

export default function Buttons({ allEpisodes, showToTop }) {
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
    <div id="buttons" className="fixed bottom-0 w-full h-32">
      <div className="relative py-8 mx-auto max-w-[768px] md:max-w-[630px]">
        <div className="flex items-center justify-center gap-8 font-bold">
          <Link
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
            className={`gradientBorder py-3 px-4`}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-lg" />
            <span
              className={`ml-3 ${
                nextReleased ? "hidden md:inline-block" : "inline-block"
              }`}
            >
              Ep.{episodeNo - 1}
            </span>
          </Link>
          <Link
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
            className={`gradientBorder py-3 px-4`}
          >
            <span
              className={`mr-3 ${
                prevEpisode ? "hidden md:inline-block" : "inline-block"
              }`}
            >
              Ep.{episodeNo + 1}
            </span>
            <FontAwesomeIcon icon={faArrowRight} className="text-lg" />
          </Link>
        </div>
        <button
          id="scrollToTop"
          onClick={scrollToTop}
          title="Scroll To Top"
          style={{
            opacity: !showToTop ? "0" : "1",
            pointerEvents: !showToTop ? "none" : "auto",
          }}
        >
          <FontAwesomeIcon
            icon={faArrowUp}
            className={`absolute right-0 top-1 gradientBorder m-8 px-3.5 py-3 text-lg`}
          />
        </button>
      </div>
    </div>
  );
}
