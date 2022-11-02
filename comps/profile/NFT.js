import { useState } from "react";
import Collection from "./Collection";
import Creation from "./Creation";

export default function NFT({ NFTs, artist }) {
  //Enable navigation between the Creation & Collection tabs
  const [openTab, setOpenTab] = useState(1);

  // //Place the artist's NFTs into one single array
  // const artistNFTs = artist.webtoons
  //   .map((webtoon) => webtoon.NFTs)
  //   .filter((NFTs) => NFTs.length)
  //   .flat(1);

  //Group the NFTs by name (so NFTs with multiple editions will be displayed as one single card as opposed to multiple cards)
  function groupByName(arr, property) {
    return arr.reduce(function (memo, x) {
      if (!memo[x[property]]) {
        memo[x[property]] = [];
      }
      memo[x[property]].push(x);
      return memo;
    }, {});
  }
  const groups = groupByName(
    NFTs.map((NFT) => ({ ...NFT.attributes, id: NFT.id })),
    "name"
  );
  const finalGroups = [];

  for (const key in groups) {
    finalGroups.push({
      categoryName: key,
      children: groups[key],
    });
  }
  return (
    <div className="bg-lightBeige py-12 md:py-20">
      <div className="mx-8 md:mx-24 lg:mx-16 xl:mx-32 2xl:ml-72">
        <ul className="relative flex gap-4 mb-5 md:gap-6 md:mb-8 ">
          <li>
            <button
              className={`text-lg md:text-2xl py-2 px-[18px] md:py-3 md:px-6
                  ${openTab === 1 ? "font-bold" : "font-normal"}`}
              onClick={(e) => {
                setOpenTab(1);
              }}
              aria-label="View Creations"
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
              aria-label="View Collections"
            >
              Collection {artist.collection ? artist.collection.length : 0}
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
          <div className={openTab === 1 ? "block" : "hidden"}>
            {NFTs.length > 0 ? (
              <Creation creations={finalGroups} />
            ) : (
              <div className="text-center text-base py-8 md:py-14 md:text-xl lg:py-20">
                {artist.attributes.first_name} has not created any NFT yet.
              </div>
            )}
          </div>
          <div className={openTab === 2 ? "block" : "hidden"}>
            {artist.collection > 0 ? (
              <Collection />
            ) : (
              <div className="text-center text-base py-8 md:py-14 md:text-xl lg:py-20">
                {artist.attributes.first_name} does not own any RMNT NFT.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
