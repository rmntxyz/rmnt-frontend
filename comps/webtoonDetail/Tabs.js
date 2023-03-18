import Link from "next/link";
import { useRouter } from "next/router";
import getScrollPosition from "../../utils/getScrollPoisition";
import CollectiblesTab from "./CollectiblesTab";
import ProjectTab from "./projectTab/ProjectTab";
import WebtoonTab from "./WebtoonTab";

export default function Tabs({
  webtoon,
  avatar,
  collectibles,
  exchangeRate,
  episodes,
  benefits,
}) {
  //Get scroll position to fix the tab list
  const { scrollPosition, elementHeight } = getScrollPosition();

  //Enable navigation between Project, Webtoon, Collection tabs
  const { query } = useRouter();
  const { webtoonId, tab = "project" } = query;

  return (
    <div>
      <ul
        className={`${
          scrollPosition > elementHeight + 80
            ? "fixed top-0 flex w-[768px] bg-navBg z-10 shadow-md md:w-[630px]"
            : "relative flex shadow-md"
        }`}
      >
        <li className="ml-4">
          <Link
            shallow
            href={`/webtoons/${webtoonId}`}
            isSelected={tab === "project"}
          >
            <a
              className={`${tab === "project" ? "font-bold" : "text-white/50"}`}
              aria-label="View Project"
            >
              <div className="text-lg py-4 px-5">Project</div>
            </a>
          </Link>
          <div
            className={`w-full h-[3px] bg-white rounded-sm  ${
              tab === "project" ? "visible" : "invisible"
            }`}
          ></div>
        </li>
        <li>
          <Link
            shallow
            href={`/webtoons/${webtoonId}/webtoon`}
            isSelected={tab === "webtoon"}
          >
            <a
              className={`${tab === "webtoon" ? "font-bold" : "text-white/50"}`}
              aria-label="View Webtoon"
            >
              <div className="text-lg py-4 px-5">Webtoon</div>
            </a>
          </Link>
          <div
            className={`w-full h-[3px] bg-white rounded-sm  ${
              tab === "webtoon" ? "visible" : "invisible"
            }`}
          ></div>
        </li>
        <li>
          <Link
            shallow
            href={`/webtoons/${webtoonId}/collectibles`}
            isSelected={tab === "collectibles"}
          >
            <a
              className={`${
                tab === "collectibles" ? "font-bold" : "text-white/50"
              }`}
              aria-label="View Collectibles"
            >
              <div className="text-lg py-4 px-5">Collectibles</div>
            </a>
          </Link>
          <div
            className={`w-full h-[3px] bg-white rounded-sm  ${
              tab === "collectibles" ? "visible" : "invisible"
            }`}
          ></div>
        </li>
        <div className="absolute bottom-0 w-full h-px bg-white/10"></div>
      </ul>
      <div
        id="main"
        className={`${scrollPosition > elementHeight + 80 ? "pt-16" : ""}`}
      >
        <div className={tab === "project" ? "block" : "hidden"}>
          <ProjectTab
            webtoon={webtoon}
            avatar={avatar}
            exchangeRate={exchangeRate}
            benefits={benefits}
          />
        </div>
        <div className={tab === "webtoon" ? "block" : "hidden"}>
          <WebtoonTab episodes={episodes} webtoon={webtoon} />
        </div>
        <div className={tab === "collectibles" ? "block" : "hidden"}>
          <CollectiblesTab
            collectibles={collectibles}
            exchangeRate={exchangeRate}
          />
        </div>
      </div>
    </div>
  );
}
