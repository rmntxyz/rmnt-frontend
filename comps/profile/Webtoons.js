import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import Collectors from "./Collectors";

export default function Webtoons({ webtoons, users, artist }) {
  const firstWebtoons = webtoons.slice(0, 4);
  const [isClicked, setIsClicked] = useState(false);
  const array = () => {
    if (!isClicked) {
      return firstWebtoons;
    } else return webtoons;
  };
  return (
    <div id="webtoons" className="container mx-auto mb-6 md:mb-8">
      <div className="mx-auto max-w-[82%] md:max-w-[77%] lg:max-w-[90%]">
        <div className="relative  mb-5 md:mb-8">
          <div className="flex justify-between">
            <div>
              <div className="font-bold text-lg py-2 px-[18px] md:text-2xl md:py-3 md:px-6">
                Webtoon {webtoons.length}
              </div>
              <div className="w-full h-[3px] bg-ourBlack rounded-sm"></div>
            </div>
            {webtoons.length > 4 ? (
              <button
                onClick={(e) => setIsClicked(!isClicked)}
                className="flex gap-2 items-center text-sm md:gap-2.5 md:text-xl"
              >
                {!isClicked ? "View all" : "View less"}
                <FontAwesomeIcon icon={!isClicked ? faAngleDown : faAngleUp} />
              </button>
            ) : (
              <div></div>
            )}
          </div>
          <div className="absolute bottom-0 w-full h-px bg-ourBlack opacity-[15%]"></div>
        </div>
        {webtoons.length > 0 ? (
          <div className="scroll overflow-x-auto">
            <div className="min-w-[468px] grid grid-cols-2 gap-5 md:gap-8 xl:grid-cols-4">
              {array().map((item) => (
                <div
                  key={item.id}
                  className="border border-ourBlack rounded-sm p-3.5 drop-shadow-small bg-white md:p-4 "
                >
                  <a href={"/webtoons/" + item.id} className="relative group">
                    <Image
                      src={item.cover_image}
                      width={256}
                      height={256}
                      layout="responsive"
                      className="duration-200 hover:scale-125"
                    />
                    <button className="opacity-0 transition-opacity absolute top-3/4 inset-x-1/4 border-2 py-2 border-ourBlack bg-ourBlack text-white text-sm leading-tight font-bold whitespace-nowrap rounded-full group-hover:opacity-100">
                      View webtoon
                    </button>
                  </a>
                  <div className="flex mt-3.5 items-center md:mt-4">
                    <div className="truncate text-base font-extrabold uppercase md:text-lg">
                      {item.title}
                    </div>
                    <div className="w-1 aspect-square m-1 bg-lightGray rounded-full"></div>
                    <div className="whitespace-nowrap text-sm font-extrabold md:text-base">
                      vol {item.volume}
                    </div>
                  </div>
                  <Collectors collectors={item.collectors} users={users} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-base py-8 md:py-14 md:text-xl lg:py-20">
            {artist} has not listed any webtoon.
          </div>
        )}
      </div>
    </div>
  );
}
