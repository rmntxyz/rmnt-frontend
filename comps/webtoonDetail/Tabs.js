import { useState } from "react";
import getScrollPosition from "../../utils/getScrollPoisition";
import CollectiblesTab from "./CollectiblesTab";
import ProjectTab from "./ProjectTab";
import WebtoonTab from "./WebtoonTab";

export default function Tabs({ webtoon, users, NFTs, exchangeRate, episodes }) {
  //Enable navigation between Project, Webtoon, Collection tabs
  const [openTab, setOpenTab] = useState(1);

  //Get scroll position to fix the tab list
  const { scrollPosition, elementHeight } = getScrollPosition();

  return (
    <div>
      <ul
        className={`${
          scrollPosition > elementHeight + 80
            ? "fixed top-0 flex w-[768px] bg-navBg z-10"
            : "relative flex"
        }`}
      >
        <li className="ml-4">
          <button
            className={`text-lg py-4 px-5
                  ${openTab === 1 ? "font-bold" : "text-white/50"}`}
            onClick={(e) => {
              setOpenTab(1);
            }}
            aria-label="View Project"
          >
            Project
          </button>
          <div
            className={`w-full h-[3px] bg-white rounded-sm  ${
              openTab === 1 ? "visible" : "invisible"
            }`}
          ></div>
        </li>
        <li>
          <button
            className={`text-lg py-4 px-5
               ${openTab === 2 ? "font-bold" : "text-white/50"}`}
            onClick={(e) => {
              setOpenTab(2);
            }}
            aria-label="View Webtoon"
          >
            Webtoon
          </button>
          <div
            className={`w-full h-[3px] bg-white rounded-sm  ${
              openTab === 2 ? "visible" : "invisible"
            }`}
          ></div>
        </li>
        <li>
          <button
            className={`text-lg py-4 px-5
               ${openTab === 3 ? "font-bold" : "text-white/50"}`}
            onClick={(e) => {
              setOpenTab(3);
            }}
            aria-label="View Collectibles"
          >
            Collectibles
          </button>
          <div
            className={`w-full h-[3px] bg-white rounded-sm  ${
              openTab === 3 ? "visible" : "invisible"
            }`}
          ></div>
        </li>
        <div className="absolute bottom-0 w-full h-px bg-white/10"></div>
      </ul>
      <div className={`${scrollPosition > elementHeight + 80 ? "pt-16" : ""}`}>
        <div className={openTab === 1 ? "block" : "hidden"}>
          <ProjectTab
            webtoon={webtoon}
            users={users}
            NFTs={NFTs}
            exchangeRate={exchangeRate}
          />
        </div>
        <div className={openTab === 2 ? "block" : "hidden"}>
          <WebtoonTab episodes={episodes} webtoon={webtoon} />
        </div>
        <div className={openTab === 3 ? "block" : "hidden"}>
          <CollectiblesTab NFTs={NFTs} exchangeRate={exchangeRate} />
        </div>
      </div>
    </div>
  );
}
