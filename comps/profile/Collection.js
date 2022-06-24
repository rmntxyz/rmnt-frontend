import Image from "next/image";
import Collectors from "./Collectors";

export default function Collection({ collections, users, webtoons, NFTs }) {
  return (
    <div className="scroll overflow-x-auto">
      <div className="min-w-[468px] grid grid-cols-2 gap-5 md:gap-8 lg:grid-cols-4">
        {collections.map((collection, idx) => (
          <div
            key={idx}
            className="rounded-sm p-3.5 drop-shadow-small bg-white md:p-4 "
          >
            <a href={"/NFT/" + collection.id}>
              <Image
                src={collection.image_address}
                width={256}
                height={256}
                layout="responsive"
                className="duration-200 hover:scale-125"
              />
            </a>
            <div className="flex max-w-fit mt-3.5 items-center bg-[#F3F3F3] p-1 rounded-sm md:mt-4">
              <div className="truncate text-sm font-extrabold uppercase">
                {
                  webtoons.find(
                    (webtoon) => webtoon.id === collection.webtoon_id
                  ).title
                }
              </div>
              <div className="w-1 aspect-square m-1 bg-lightGray rounded-full"></div>
              <div className="whitespace-nowrap text-sm font-extrabold">
                vol{" "}
                {
                  webtoons.find(
                    (webtoon) => webtoon.id === collection.webtoon_id
                  ).volume
                }
              </div>
            </div>
            <div className="truncate font-bold text-base md:text-lg">
              {/* {collection.id.toString().length < 2 ? (
            <span>
              #{"0" + collection.id}. {collection.name}
            </span>
          ) : (
            <span>
              #{collection.id}. {collection.name}
            </span>
          )} */}
              {collection.name}
            </div>
            <Collectors
              collectors={NFTs.filter(
                (NFT) => NFT.editions_title === collection.editions_title
              ).map((edition) => edition.owned_by)}
              users={users}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
