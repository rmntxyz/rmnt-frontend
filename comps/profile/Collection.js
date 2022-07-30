import Image from "next/image";
import Collectors from "./Collectors";

export default function Collection({ collections }) {
  return (
    <div className="scroll overflow-x-auto">
      <div className="min-w-[956px] grid grid-cols-4 gap-5 md:gap-8 md:min-w-[1184px]">
        {collections.map((collection, idx) => (
          <div
            key={idx}
            className="rounded-sm p-3.5 shadow-small bg-white md:p-4 "
          >
            <a href={"/NFT/" + collection.id}>
              <Image
                alt="Rarement NFT image"
                src={
                  "https://rmnt.herokuapp.com" +
                  collection.attributes.image.data[0].attributes.url
                }
                width={256}
                height={256}
                layout="responsive"
                className="duration-200 hover:scale-125"
              />
            </a>
            <div className="flex max-w-fit mt-3.5 items-center bg-[#F3F3F3] p-1 rounded-sm md:mt-4">
              <div className="truncate text-sm font-extrabold uppercase">
                {
                  collection.attributes.webtoon_pages.data[0].attributes
                    .webtoon_id.data.attributes.title
                }
              </div>
              <div className="w-1 aspect-square m-1 bg-lightGray rounded-full"></div>
              <div className="whitespace-nowrap text-sm font-extrabold">
                vol{" "}
                {
                  collection.attributes.webtoon_pages.data[0].attributes
                    .webtoon_id.data.attributes.volume
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
              <span>{collection.attributes.name}</span>
              {/* {collection.edition === 1 ? null : (
                <span className="font-normal text-xs">
                  {" "}
                  (Edition {collection.edition})
                </span>
              )} */}
            </div>
            <Collectors
              users={collection.attributes.webtoon_pages.data[0].attributes.nfts.data
                .filter(
                  (NFT) => NFT.attributes.name === collection.attributes.name
                )
                .map((NFT) => NFT.attributes.owned_by.data)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
