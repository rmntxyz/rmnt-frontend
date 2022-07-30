import Image from "next/image";
import Collectors from "./Collectors";

export default function Creation({ creations }) {
  return (
    <div className="scroll-xlarge overflow-x-auto">
      <div className="min-w-[956px] grid grid-cols-4 gap-5 md:gap-8 md:min-w-[1184px]">
        {creations.map((item) => (
          <div
            key={item.categoryName}
            className="rounded-sm p-3.5 shadow-small bg-white md:p-4 "
          >
            <a href={"/NFT/" + item.children[0].id}>
              <Image
                src={
                  "https://rmnt.herokuapp.com" +
                  item.children[0].image.data[0].attributes.url
                }
                width={256}
                height={256}
                objectFit="contain"
                layout="responsive"
                className="duration-200 hover:scale-125"
                alt="Rarement NFT Image"
              />
            </a>
            <div className="flex max-w-fit mt-3.5 items-center bg-[#F3F3F3] p-1 rounded-sm md:mt-4">
              <div className="truncate text-sm font-extrabold uppercase">
                {
                  item.children[0].webtoon_pages.data[0].attributes.webtoon_id
                    .data.attributes.title
                }
              </div>
              <div className="w-1 aspect-square m-1 bg-lightGray rounded-full"></div>
              <div className="whitespace-nowrap text-sm font-extrabold">
                vol{" "}
                {
                  item.children[0].webtoon_pages.data[0].attributes.webtoon_id
                    .data.attributes.volume
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
            <Collectors users={item.children.map((NFT) => NFT.owned_by.data)} />
          </div>
        ))}
      </div>
    </div>
  );
}
