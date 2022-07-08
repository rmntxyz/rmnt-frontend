import Image from "next/image";
import Collectors from "./Collectors";

export default function Creation({ creations, users, webtoons }) {
  return (
    <div className="scroll overflow-x-auto">
      <div className="min-w-[468px] grid grid-cols-2 gap-5 md:gap-8 lg:grid-cols-4">
        {creations.map((item) => (
          <div
            key={item.categoryName}
            className="rounded-sm p-3.5 drop-shadow-small bg-white md:p-4 "
          >
            <a href={"/NFT/" + item.children[0].id}>
              <Image
                src={item.children[0].image_address}
                width={256}
                height={256}
                objectFit="contain"
                layout="responsive"
                className="duration-200 hover:scale-125"
              />
            </a>
            <div className="flex max-w-fit mt-3.5 items-center bg-[#F3F3F3] p-1 rounded-sm md:mt-4">
              <div className="truncate text-sm font-extrabold uppercase">
                {
                  webtoons.find(
                    (webtoon) => webtoon.id === item.children[0].webtoon_id
                  ).title
                }
              </div>
              <div className="w-1 aspect-square m-1 bg-lightGray rounded-full"></div>
              <div className="whitespace-nowrap text-sm font-extrabold">
                vol{" "}
                {
                  webtoons.find(
                    (webtoon) => webtoon.id === item.children[0].webtoon_id
                  ).volume
                }
              </div>
            </div>
            <div className="truncate font-bold text-base md:text-lg">
              {/* {item.children[0].id.toString().length < 2 ? (
                <span>
                  #{"0" + item.children[0].id}. {item.children[0].name}
                </span>
              ) : (
                <span>
                  #{item.children[0].id}. {item.children[0].name}
                </span>
              )} */}
              {item.children[0].name}
            </div>
            <Collectors collectors={item.collectors} users={users} />
          </div>
        ))}
      </div>
    </div>
  );
}
