import {
  faArrowLeft,
  faArrowRight,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import scrollToTop from "../../utils/scrollToTop";

export default function Buttons({ episode, allEpisodes }) {
  return (
    <div id="buttons" className="fixed w-full bottom-0 duration-200">
      <div className="relative max-w-[768px] md:max-w-[630px]">
        <div className="flex items-center justify-center gap-8 py-8 font-bold">
          <a
            href={
              "/webtoons/episode/" + allEpisodes[episode.page_number - 2]?.id
            }
            style={{
              display: allEpisodes[episode.page_number - 2] ? "block" : "none",
            }}
            className="gradientBorder py-3 px-4 "
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-3 text-lg" />
            Ep.{episode.page_number - 1}
          </a>
          <a
            href={"/webtoons/episode/" + allEpisodes[episode.page_number]?.id}
            style={{
              display: allEpisodes[episode.page_number] ? "block" : "none",
            }}
            className="gradientBorder py-3 px-4"
          >
            Ep.{episode.page_number + 1}
            <FontAwesomeIcon icon={faArrowRight} className="ml-3 text-lg" />
          </a>
        </div>
        <button onClick={scrollToTop}>
          <FontAwesomeIcon
            icon={faArrowUp}
            className="absolute right-0 top-0 gradientBorder m-8 px-3.5 py-3 text-lg"
          />
        </button>
      </div>
    </div>
  );
}
