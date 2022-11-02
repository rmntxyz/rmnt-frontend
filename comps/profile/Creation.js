import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { isImage } from "../../utils/mediaType";
import Collectors from "./Collectors";

export default function Creation({ creations }) {
  let NFTUrl = "";
  return (
    <div className="scroll overflow-x-auto flex md:scroll-large 2xl:overflow-visible">
      <div className="flex gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-16 lg:min-w-[1248px] lg:grid lg:grid-cols-4">
        {creations.map(
          (item) => (
            (NFTUrl = item.children[0].image.data[0].attributes.url),
            (
              <div
                key={item.categoryName}
                className="rounded-sm p-3.5 shadow-small bg-white md:p-4 "
              >
                <a
                  href={
                    "/NFT/" + item.children[0].id + "/#" + item.children[0].id
                  }
                >
                  <div className="relative h-[196px] w-[196px] md:h-[240px] md:w-[240px] lg:h-[256px] lg:w-[256px]">
                    <Image
                      src={
                        isImage.includes(
                          NFTUrl.split(".")[NFTUrl.split(".").length - 1]
                        )
                          ? NFTUrl
                          : item.children[0].thumbnail.data.attributes.url
                      }
                      width={256}
                      height={256}
                      objectFit="contain"
                      layout="fill"
                      placeholder="blur"
                      blurDataURL={
                        isImage.includes(
                          NFTUrl.split(".")[NFTUrl.split(".").length - 1]
                        )
                          ? NFTUrl
                          : item.children[0].thumbnail.data.attributes.url
                      }
                      className="duration-200 hover:scale-125"
                      alt="Rarement NFT Image"
                    />
                    {isImage.includes(
                      NFTUrl.split(".")[NFTUrl.split(".").length - 1]
                    ) ? null : (
                      <FontAwesomeIcon
                        icon={faVideo}
                        className="absolute top-7 left-7 text-white bg-opaqueGray p-1 rounded-md md:text-xl"
                      />
                    )}
                  </div>
                </a>
                <div className="flex max-w-fit mt-3.5 items-center w-[196px] bg-[#F3F3F3] p-1 rounded-sm md:mt-4 md:w-[240px] lg:w-[256px]">
                  <div className="truncate text-sm font-extrabold uppercase">
                    {
                      item.children[0].webtoon_pages.data[0].attributes
                        .webtoon_id.data.attributes.title
                    }
                  </div>
                  <div className="w-1 aspect-square m-1 bg-lightGray rounded-full"></div>
                  <div className="whitespace-nowrap text-sm font-extrabold">
                    vol{" "}
                    {
                      item.children[0].webtoon_pages.data[0].attributes
                        .webtoon_id.data.attributes.volume
                    }
                  </div>
                </div>
                <div className="truncate font-bold text-base w-[196px] md:text-lg md:w-[240px] lg:w-[256px]">
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
                <Collectors
                  users={item.children.map((NFT) => NFT.owned_by.data)}
                />
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}
