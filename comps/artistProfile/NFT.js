import { useState } from "react";
import Collection from "./Collection";
import Creation from "./Creation";

export default function NFT({ NFTs, users, webtoons }) {
  const [openTab, setOpenTab] = useState(1);
  function groupBy(arr, property) {
    return arr.reduce(function (memo, x) {
      if (!memo[x[property]]) {
        memo[x[property]] = [];
      }
      memo[x[property]].push(x);
      return memo;
    }, {});
  }
  const groups = groupBy(NFTs, "editions_title");
  const finalGroups = [];

  for (const key in groups) {
    finalGroups.push({
      categoryName: key,
      children: groups[key],
      collectors: groups[key].map((item) => item.owned_by),
    });
  }

  return (
    <div className="bg-lightBeige py-12 md:py-20">
      <div className="container mx-auto">
        <div className="max-w-[85%] mx-auto md:max-w-[90%]">
          <ul
            role="tablist"
            className="relative flex gap-4 mb-5 md:gap-6 md:mb-8"
          >
            <li>
              <button
                className={`text-lg md:text-2xl py-2 px-[18px] md:py-3 md:px-6
                  ${openTab === 1 ? "font-bold" : "font-normal"}`}
                onClick={(e) => {
                  setOpenTab(1);
                }}
                role="tab"
              >
                Creation {finalGroups.length}
              </button>
              <div
                className={`w-full h-[3px] bg-ourBlack rounded-sm  ${
                  openTab === 1 ? "visible" : "invisible"
                }`}
              ></div>
            </li>
            <li>
              <button
                className={`text-lg md:text-2xl py-2 px-[18px] md:py-3 md:px-6
               ${openTab === 2 ? "font-bold" : "font-normal"}`}
                onClick={(e) => {
                  setOpenTab(2);
                }}
                role="tab"
              >
                Collection
              </button>
              <div
                className={`w-full h-[3px] bg-ourBlack rounded-sm  ${
                  openTab === 2 ? "visible" : "invisible"
                }`}
              ></div>
            </li>
            <div className="absolute bottom-0 w-full h-px bg-ourBlack opacity-[15%]"></div>
          </ul>
          <div>
            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
              <Creation
                creations={finalGroups}
                users={users}
                webtoons={webtoons}
              />
            </div>
            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
              <Collection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
