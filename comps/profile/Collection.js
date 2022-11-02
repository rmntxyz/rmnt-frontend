import Image from "next/image";
import { isImage } from "../../utils/mediaType";
import Collectors from "./Collectors";

export default function Collection({ collections }) {
  let NFTUrl = "";
  return (
    <div className="scroll overflow-x-auto flex md:scroll-large 2xl:overflow-visible">
      <div className="min-w-[956px] grid grid-cols-4 gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-16 md:min-w-[1248px]">
        {collections.map(
          (collection, idx) => (
            (NFTUrl = collection.attributes.image.data[0].attributes.url),
            (
              <div
                key={idx}
                className="relative rounded-sm p-3.5 shadow-small bg-white md:p-4 "
              >
                <a href={"/NFT/" + collection.id}>
                  <Image
                    alt="Rarement NFT image"
                    src={
                      isImage.includes(
                        NFTUrl.split(".")[NFTUrl.split(".").length - 1]
                      )
                        ? NFTUrl
                        : collection.attributes.thumbnail.data.attributes.url
                    }
                    width={256}
                    height={256}
                    placeholder="blur"
                    blurDataURL={
                      isImage.includes(
                        NFTUrl.split(".")[NFTUrl.split(".").length - 1]
                      )
                        ? NFTUrl
                        : collection.attributes.thumbnail.data.attributes.url
                    }
                    objectFit="contain"
                    layout="responsive"
                    className="duration-200 hover:scale-125"
                  />
                  {isImage.includes(
                    NFTUrl.split(".")[NFTUrl.split(".").length - 1]
                  ) ? null : (
                    <FontAwesomeIcon
                      icon={faVideo}
                      className="absolute top-7 left-7 text-white bg-opaqueGray p-1 rounded-md md:text-xl"
                    />
                  )}
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
                      (NFT) =>
                        NFT.attributes.name === collection.attributes.name
                    )
                    .map((NFT) => NFT.attributes.owned_by.data)}
                />
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}
