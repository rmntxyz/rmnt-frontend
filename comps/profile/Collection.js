import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { isImage } from "../../utils/mediaType";
import Collectors from "./Collectors";

export default function Collection({ collections }) {
  let NFTUrl = "";
  return (
    <div className="scroll overflow-x-auto flex md:scroll-large 2xl:overflow-visible">
      <div className="flex gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-16 xl:min-w-[1184px] xl:grid xl:grid-cols-4 ">
        {collections.map(
          (collection, idx) => (
            (NFTUrl = collection.attributes.image.data[0].attributes.url),
            (
              <div
                key={idx}
                className="rounded-sm p-3.5 shadow-small bg-white w-[224px] md:w-[272px] md:p-4 xl:w-[288px]"
              >
                <a href={"/NFT/" + collection.id}>
                  <div className="relative">
                    <Image
                      alt="Rarement NFT image"
                      src={
                        isImage.includes(
                          NFTUrl.split(".")[NFTUrl.split(".").length - 1]
                        )
                          ? NFTUrl
                          : collection.attributes.thumbnail.data.attributes.url
                      }
                      placeholder="blur"
                      blurDataURL={
                        isImage.includes(
                          NFTUrl.split(".")[NFTUrl.split(".").length - 1]
                        )
                          ? NFTUrl
                          : collection.attributes.thumbnail.data.attributes.url
                      }
                      objectFit="contain"
                      layout="fill"
                      className="duration-200 hover:scale-125"
                    />
                    {isImage.includes(
                      NFTUrl.split(".")[NFTUrl.split(".").length - 1]
                    ) ? null : (
                      <FontAwesomeIcon
                        icon={faVideo}
                        className="absolute top-3 left-3 text-white bg-opaqueGray p-1 rounded-md md:text-xl"
                      />
                    )}
                  </div>
                </a>
                <div className="flex max-w-fit mt-3.5 items-center w-[194px] bg-[#F3F3F3] p-1 rounded-sm md:mt-4 md:w-[238px] xl:w-[254px]">
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
                <div className="truncate font-bold text-base w-[194px] md:text-lg md:w-[238px] xl:w-[254px]">
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
