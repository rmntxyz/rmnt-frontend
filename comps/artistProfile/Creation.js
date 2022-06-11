import Image from "next/image";
import Collectors from "./Collectors";

export default function Creation({ creations, users, webtoons }) {
  return (
    <div className="scroll overflow-x-auto">
      <div className="min-w-[468px] grid grid-cols-2 gap-5 md:gap-8 lg:grid-cols-4">
        {creations.map((item) => (
          <div
            key={item.categoryName}
            className="rounded-sm p-3.5 drop-shadow-medium bg-white md:p-4 "
          >
            <a href={"/NFTs/" + item.id}>
              <Image
                src={item.children[0].image_address}
                width={256}
                height={256}
                layout="responsive"
                className="duration-200 hover:scale-125"
              />
            </a>
            <div className="flex mt-3.5 items-center md:mt-4">
              <div className="truncate text-base font-extrabold uppercase md:text-lg">
                {
                  webtoons.find(
                    (webtoon) => webtoon.id === item.children[0].webtoon_id
                  ).title
                }
              </div>
              <div className="w-1 aspect-square m-1 bg-lightGray rounded-full"></div>
              <div className="whitespace-nowrap text-sm font-extrabold md:text-base">
                vol{" "}
                {
                  webtoons.find(
                    (webtoon) => webtoon.id === item.children[0].webtoon_id
                  ).volume
                }
              </div>
            </div>
            <div className="font-bold text-lg md:text-xl">
              {item.children[0].id.toString().length < 2 ? (
                <span>
                  #{"0" + item.children[0].id}. {item.children[0].name}
                </span>
              ) : (
                <span>
                  #{item.children[0].id}. {item.children[0].name}
                </span>
              )}
            </div>
            <Collectors collectors={item.collectors} users={users} />
          </div>
        ))}
      </div>
    </div>
  );
}
