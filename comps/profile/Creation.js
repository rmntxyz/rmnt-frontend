import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { isImage } from "../../utils/mediaType";
import Collectors from "./Collectors";

export default function Creation({ creations }) {
  let NFTUrl = "";
  return (
    <div className="scroll-large overflow-x-auto lg:scroll-xlarge">
      <div className="min-w-[956px] grid grid-cols-4 gap-5 md:gap-8 md:min-w-[1184px]">
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
                  className="relative"
                >
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
                    layout="responsive"
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
                      className="absolute top-3 left-3 text-white bg-opaqueGray p-1 rounded-md md:text-xl"
                    />
                  )}
                </a>
                <div className="flex max-w-fit mt-3.5 items-center bg-[#F3F3F3] p-1 rounded-sm md:mt-4">
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
