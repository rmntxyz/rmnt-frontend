import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { House } from "../../utils/svgs";
import Toggle from "../webtoonEpisode/Toggle";

export default function Nav({ episode, webtoon }) {
  return (
    <nav
      id="navbar"
      className="fixed z-10 w-full bg-navBg h-20 text-2xl font-bold duration-200"
    >
      <div className="flex justify-between items-center mx-auto h-full px-8 max-w-[768px] md:max-w-[630px]">
        <div className="flex gap-6 items-center justify-center">
          <Link
            href={
              "/webtoons/" + webtoon.attributes.webtoon_id + "/webtoon#main"
            }
            aria-label="Go to this webtoon's page"
          >
            <FontAwesomeIcon
              id="episodeBack"
              icon={faArrowLeft}
              className="cursor-pointer"
            />
          </Link>
          <div className="hidden gap-2 items-center sm:flex">
            <span className="text-lg py-1 px-3.5 rounded-3xl bg-mainBg drop-shadow-[4px_5px_10px_rgba(0, 0, 0, 0.1)]">
              Ep.{episode.episode_number}
            </span>
            <span className="truncate w-56">{webtoon.attributes.title}</span>
          </div>
        </div>
        <div className="flex gap-5 items-center justify-center">
          <Link href="/" passHref>
            <div
              className="p-3.5 rounded-full border border-white/20 bg-opaqueGray"
              aria-label="Go to Rarement home"
            >
              <House />
            </div>
          </Link>
          <Toggle />
        </div>
      </div>
    </nav>
  );
}
