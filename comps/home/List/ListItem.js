import Image from "next/image";
import ListAvailable from "./ListAvailable";

export default function ListItem({ item }) {
  return (
    <div className="w-[224px] drop-shadow-medium md:w-[272px] xl:w-[288px]">
      <div className="p-4 border border-darkGray bg-white rounded-sm ">
        <a
          href={"/artists/" + item.attributes.artist_id.data.id}
          className="flex items-center mb-3 md:mb-4"
        >
          <div className="relative rounded-full w-7 h-7 overflow-hidden md:w-8 md:h-8 ">
            <Image
              src={
                "https://rmnt.herokuapp.com" +
                item.attributes.artist_id.data.attributes.profile_image.data
                  .attributes.url
              }
              layout="fill"
              objectFit="contain"
              alt="Rarement Artist Profile Image"
              className="rounded-full"
            />
          </div>
          <div className="text-sm ml-1 md:text-base">
            {item.attributes.artist_id.data.attributes.first_name}
          </div>
        </a>
        <div className="relative group">
          <a href={"/webtoons/" + item.id}>
            <Image
              src={
                "https://rmnt.herokuapp.com" +
                item.attributes.cover_image.data.attributes.url
              }
              width={240}
              height={240}
              placeholder="blur"
              blurDataURL={
                "https://rmnt.herokuapp.com" +
                item.attributes.cover_image.data.attributes.url
              }
              layout="responsive"
              objectFit="contain"
              className="duration-200 hover:scale-125"
              alt="Rarement Webtoon Cover Image"
            />
            <button
              className="opacity-0 transition-opacity absolute top-3/4 inset-x-1/4 border-2 py-2 border-ourBlack bg-ourBlack text-white text-xs leading-tight font-bold whitespace-nowrap rounded-full group-hover:opacity-100 md:text-sm"
              aria-label="View Webtoon"
            >
              View webtoon
            </button>
          </a>
        </div>
        <div className="flex mt-3.5 items-center md:mt-4">
          <div className="truncate text-lg font-extrabold uppercase">
            {item.attributes.title}
          </div>
          <div className="w-1 aspect-square m-2 bg-lightGray rounded-full md:m-4"></div>
          <div className="whitespace-nowrap text-sm font-extrabold">
            vol {item.attributes.volume}
          </div>
        </div>
      </div>
      <div className="w-full h-2 flex">
        <div className="min-w-[33.3%] h-full border-r border-darkGray"></div>
        <div className="min-w-[33.3%] h-full border-r border-darkGray"></div>
        <div className="min-w-[33.3%] h-full"></div>
      </div>
      <ListAvailable
        NFTs={item.attributes.webtoon_pages.data
          .map((webtoon_page) => webtoon_page.attributes.nfts?.data)
          .flat(1)
          .filter((NFT) => !!NFT)}
      />
    </div>
  );
}
