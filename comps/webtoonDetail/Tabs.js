import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CollectiblesTab from "./CollectiblesTab";
import ProjectTab from "./projectTab/ProjectTab";
import WebtoonTab from "./WebtoonTab";

export default function Tabs(props) {
  const {
    webtoon,
    rarementABI,
    collectibles,
    exchangeRate,
    episodes,
    coverRef,
  } = props;

  //Use Intersection Observer for stick header
  const [fixedTab, setFixedTab] = useState(false);
  useEffect(() => {
    //Define the element above the tabs to track its position (although "cover" will still work without being defined)
    const cover = coverRef.current;
    // Define configuration for the observer
    const config = {
      root: null,
    };
    // Create the observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) setFixedTab(true);
        if (entry.isIntersecting) setFixedTab(false);
      });
    }, config);
    // Observe the element above the tabs to see when it's in view
    observer.observe(cover); //"cover (as the id of the element)" will still work without being defined
  });

  //Enable navigation between Project, Webtoon, Collection tabs
  const { query } = useRouter();
  const { webtoonId, tab = "project" } = query;

  return (
    <div id="main">
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
      <div className={`${fixedTab ? "pt-16" : ""}`}>
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
