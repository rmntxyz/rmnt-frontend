import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { House } from "../../utils/svgs";
import Toggle from "../webtoonDetail/Toggle";

export default function Nav({ episode, webtoon, prevUrl }) {
  //Use router to enable navigation
  const router = useRouter();

  return (
    <nav
      id="navbar"
      className="fixed z-10 w-full bg-navBg h-20 text-2xl font-bold duration-200"
    >
      <div className="flex justify-between items-center mx-auto h-full px-8 max-w-[768px]">
        <div className="flex gap-6 items-center justify-center">
          <FontAwesomeIcon
            id="episodeBack"
            icon={faArrowLeft}
            onClick={() => router.back()}
            className="cursor-pointer"
            style={{ display: !prevUrl ? "none" : "block" }}
          />
          <div className="flex gap-2">
            <span className="text-lg py-1 px-3.5 rounded-3xl bg-mainBg drop-shadow-[4px_5px_10px_rgba(0, 0, 0, 0.1)]">
              Ep.{episode.page_number}
            </span>
            <a href={"/webtoons/" + webtoon.id}>
              <span>{webtoon.attributes.title}</span>
            </a>
          </div>
        </div>
        <div className="flex gap-5 items-center justify-center">
          <Link href="/" passHref>
            <a className="p-3.5 rounded-full border border-white/20 bg-opaqueGray">
              <House />
            </a>
          </Link>
          <Toggle />
        </div>
      </div>
    </nav>
  );
}
