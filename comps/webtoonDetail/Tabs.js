import Link from "next/link";
import { useRouter } from "next/router";
import CollectiblesTab from "./CollectiblesTab";
import ProjectTab from "./projectTab/ProjectTab";
import WebtoonTab from "./WebtoonTab";

export default function Tabs(props) {
  const { webtoon, rarementABI, collectibles, exchangeRate, episodes } = props;

  //Enable navigation between Project, Webtoon, Collection tabs
  const { query } = useRouter();
  const { webtoonId, tab = "project" } = query;

  return (
    <div id="main">
      <div className="sticky top-0 flex bg-navBg z-20 shadow-md">
        <div className="ml-4">
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
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
        <div className="absolute bottom-0 w-full h-px bg-white/10"></div>
      </div>
      <div>
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
