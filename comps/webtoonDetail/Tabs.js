import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import CollectiblesTab from "./CollectiblesTab";
import ProjectTab from "./projectTab/ProjectTab";
import WebtoonTab from "./WebtoonTab";

export default function Tabs(props) {
  const {
    webtoon,
    avatar,
    rarementABI,
    collectibles,
    exchangeRate,
    episodes,
    benefits,
  } = props;

  //Get scroll position to fix the tab list
  const [fixedTab, setFixedTab] = useState(false);
  const stickyPosition = useRef();
  useEffect(() => {
    const observe = () => {
      let fixedTop = stickyPosition.current.offsetTop;
      setFixedTab(window.pageYOffset > fixedTop);
    };
    window.addEventListener("scroll", observe);
    window.addEventListener("resize", observe);
    return () => {
      window.addEventListener("scroll", observe);
      window.addEventListener("resize", observe);
    };
  }, []);

  //Enable navigation between Project, Webtoon, Collection tabs
  const { query } = useRouter();
  const { webtoonId, tab = "project" } = query;

  return (
    <div ref={stickyPosition}>
      <ul
        className={`${
          fixedTab
            ? "fixed top-0 flex w-[768px] bg-navBg z-10 shadow-md md:w-[630px]"
            : "relative flex shadow-md"
        }`}
      >
        <li className="ml-4">
          <Link shallow href={`/webtoons/${webtoonId}`}>
            <div
              className={`text-lg py-4 px-5 ${
                tab === "project" ? "font-bold" : "text-white/50"
              }`}
            >
              Project
            </div>
          </Link>
          <div
            className={`w-full h-[3px] bg-white rounded-sm  ${
              tab === "project" ? "visible" : "invisible"
            }`}
          ></div>
        </li>
        <li>
          <Link shallow href={`/webtoons/${webtoonId}/webtoon`}>
            <div
              className={`text-lg py-4 px-5 ${
                tab === "webtoon" ? "font-bold" : "text-white/50"
              }`}
            >
              Webtoon
            </div>
          </Link>
          <div
            className={`w-full h-[3px] bg-white rounded-sm  ${
              tab === "webtoon" ? "visible" : "invisible"
            }`}
          ></div>
        </li>
        <li>
          <Link shallow href={`/webtoons/${webtoonId}/collectibles`}>
            <div
              className={`text-lg py-4 px-5 ${
                tab === "collectibles" ? "font-bold" : "text-white/50"
              }`}
            >
              Collectibles
            </div>
          </Link>
          <div
            className={`w-full h-[3px] bg-white rounded-sm  ${
              tab === "collectibles" ? "visible" : "invisible"
            }`}
          ></div>
        </li>
        <div className="absolute bottom-0 w-full h-px bg-white/10"></div>
      </ul>
      <div id="main" className={`${fixedTab ? "pt-16" : ""}`}>
        <div className={tab === "project" ? "block" : "hidden"}>
          <ProjectTab {...props} />
        </div>
        <div className={tab === "webtoon" ? "block" : "hidden"}>
          <WebtoonTab {...{ episodes, webtoon }} />
        </div>
        <div className={tab === "collectibles" ? "block" : "hidden"}>
          <CollectiblesTab {...{ rarementABI, collectibles, exchangeRate }} />
        </div>
      </div>
    </div>
  );
}
