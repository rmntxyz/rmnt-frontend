import Link from "next/link";
import { useRouter } from "next/router";
import getScrollPosition from "../../utils/getScrollPoisition";
import CollectiblesTab from "./CollectiblesTab";
import ProjectTab from "./ProjectTab";
import WebtoonTab from "./WebtoonTab";

export default function Tabs({
  webtoon,
  avatars,
  NFTs,
  exchangeRate,
  episodes,
}) {
  //Get scroll position to fix the tab list
  const { scrollPosition, elementHeight } = getScrollPosition();

  //Enable navigation between Project, Webtoon, Collection tabs
  const { query } = useRouter();

  const isTabOneSelected =
    !!query.tabOne || (!query.tabOne && !query.tabTwo && !query.tabThree);
  const isTabTwoSelected = !!query.tabTwo;
  const isTabThreeSelected = !!query.tabThree;

  return (
    <div>
      <ul
        className={`${
          scrollPosition > elementHeight + 80
            ? "fixed top-0 flex w-[768px] bg-navBg z-10 shadow-md"
            : "relative flex shadow-md"
        }`}
      >
        <li className="ml-4">
          <Link
            shallow
            href={"/webtoons/" + webtoon.id + "?tabOne=true"}
            isSelected={isTabOneSelected}
          >
            <a
              className={`${isTabOneSelected ? "font-bold" : "text-white/50"}`}
              aria-label="View Project"
            >
              <div className="text-lg py-4 px-5">Project</div>
            </a>
          </Link>
          <div
            className={`w-full h-[3px] bg-white rounded-sm  ${
              isTabOneSelected ? "visible" : "invisible"
            }`}
          ></div>
        </li>
        <li>
          <Link
            shallow
            href={"/webtoons/" + webtoon.id + "?tabTwo=true"}
            isSelected={isTabTwoSelected}
          >
            <a
              className={`${isTabTwoSelected ? "font-bold" : "text-white/50"}`}
              aria-label="View Webtoon"
            >
              <div className="text-lg py-4 px-5">Webtoon</div>
            </a>
          </Link>
          <div
            className={`w-full h-[3px] bg-white rounded-sm  ${
              isTabTwoSelected ? "visible" : "invisible"
            }`}
          ></div>
        </li>
        <li>
          <Link
            shallow
            href={"/webtoons/" + webtoon.id + "?tabThree=true"}
            isSelected={isTabThreeSelected}
          >
            <a
              className={`${
                isTabThreeSelected ? "font-bold" : "text-white/50"
              }`}
              aria-label="View Collectibles"
            >
              <div className="text-lg py-4 px-5">Collectibles</div>
            </a>
          </Link>
          <div
            className={`w-full h-[3px] bg-white rounded-sm  ${
              isTabThreeSelected ? "visible" : "invisible"
            }`}
          ></div>
        </li>
        <div className="absolute bottom-0 w-full h-px bg-white/10"></div>
      </ul>
      <div className={`${scrollPosition > elementHeight + 80 ? "pt-16" : ""}`}>
        <div id="tabOne" className={isTabOneSelected ? "block" : "hidden"}>
          <ProjectTab
            webtoon={webtoon}
            avatars={avatars}
            exchangeRate={exchangeRate}
          />
        </div>
        <div id="tabTwo" className={isTabTwoSelected ? "block" : "hidden"}>
          <WebtoonTab episodes={episodes} webtoon={webtoon} />
        </div>
        <div id="tabThree" className={isTabThreeSelected ? "block" : "hidden"}>
          <CollectiblesTab NFTs={NFTs} exchangeRate={exchangeRate} />
        </div>
      </div>
    </div>
  );
}
