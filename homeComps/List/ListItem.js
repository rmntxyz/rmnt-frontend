import Image from "next/image";
import ListAvailable from "./ListAvailable";

export default function ListItem({item}) {
  return (
    <div className="min-w-[80%] mx-4 my-7 drop-shadow-medium">
      <div className="p-4 border border-darkGray bg-white rounded-sm ">
        <a href={item.profileLink} className="flex items-center mb-3 md:mb-4">
          <img
            src={item.profile}
            className="rounded-full w-8 h-8 md:w-10 md:h-10"
          />
          <div className="text-sm ml-1 md:text-base">{item.author}</div>
        </a>
        <div className="relative group">
          <a href={"/webtoons/" + item.id}>
            <Image
              src={item.cover}
              width={268}
              height={268}
              layout="responsive"
              className="hover:scale-125"
            />
            <button className="hidden absolute top-3/4 inset-x-1/4 border-2 py-2 border-ourBlack bg-ourBlack text-white text-md leading-tight font-extrabold whitespace-nowrap rounded-full transition duration-150 ease-in-out group-hover:block">
              View webtoon
            </button>
          </a>
        </div>
        <div className="flex mt-3.5 items-center md:mt-4">
          <div className="truncate text-2xl font-extrabold uppercase">
            {item.title}
          </div>
          <div className="w-1 aspect-square m-2 bg-lightGray rounded-full md:m-4"></div>
          <div className="whitespace-nowrap text-base font-extrabold">
            vol {item.vol}
          </div>
        </div>
      </div>
      <div className="w-full h-2 flex">
        <div className="min-w-[33.3%] h-full border-r border-darkGray"></div>
        <div className="min-w-[33.3%] h-full border-r border-darkGray"></div>
        <div className="min-w-[33.3%] h-full"></div>
      </div>
      <ListAvailable
        nft={item.nft}
      />
    </div>
  );
}
