import Image from "next/image";
import Available from "./Available";
import Timer from "./Timer";

export default function TopCard({ item }) {
  const NFTs = item.attributes.webtoon_pages.data
    .map((webtoon_page) => webtoon_page.attributes.nfts?.data)
    .flat(1)
    .filter((NFT) => !!NFT);
  return (
    <div className="pt-4 lg:bg-hero lg:bg-cover lg:bg-top ">
      <div className="container mx-auto md:px-6 lg:px-12 xl:px-32">
        <div className="m-9 flex flex-col md:my-12 lg:m-20 lg:grid lg:grid-flow-col lg:grid-cols-2 lg:items-center">
          <div className="lg:order-2">
            <a
              href={"/artists/" + item.attributes.artist_id.data.id}
              className="flex items-center"
            >
              <div className="w-7 h-7 md:w-8 md:h-8">
                <Image
                  src={
                    "https://rmnt.herokuapp.com" +
                    item.attributes.artist_id.data.attributes.profile_image.data
                      .attributes.url
                  }
                  width={31}
                  height={31}
                  className="rounded-full"
                  alt="Rarement Artist Profile Image"
                />
              </div>
              <div className="text-sm ml-1 md:text-base md:ml-1.5">
                {item.attributes.artist_id.data.attributes.first_name}
              </div>
            </a>
            <div className="flex mt-1.5 items-center md:mt-3 lg:flex-wrap">
              <div className="truncate text-2xl font-extrabold uppercase md:text-[40px]">
                {item.attributes.title}
              </div>
              <div className="w-1 aspect-square m-2 bg-lightGray rounded-full md:w-3 md:m-4 lg:w-1.5"></div>
              <div className="whitespace-nowrap text-xl font-extrabold md:text-3xl">
                vol {item.attributes.volume}
              </div>
            </div>
          </div>
          <div className="border border-darkGray bg-white rounded-sm p-3.5 mt-5 shadow-medium md:p-5 md:mt-8 lg:row-span-2 lg:order-1 lg:mt-0 lg:mr-8">
            <a href={"/webtoons/" + item.id}>
              <Image
                src={
                  "https://rmnt.herokuapp.com" +
                  item.attributes.cover_image.data.attributes.url
                }
                width={402}
                height={402}
                priority={true}
                placeholder="blur"
                blurDataURL={
                  "https://rmnt.herokuapp.com" +
                  item.attributes.cover_image.data.attributes.url
                }
                layout="responsive"
                className="duration-200 hover:scale-125"
                alt="Rarement Webtoon Cover Image"
              />
            </a>
          </div>
          <div className="mt-8 flex flex-col md:mt-12 md:flex-row md:justify-between lg:flex-col lg:order-3">
            <div className="mb-8 pl-6 border-l border-mediumBeige text-sm md:text-lg md:mb-12 md:pl-8">
              <Available NFTs={NFTs} />
              {NFTs.find((NFT) => NFT.attributes.timeRemaining > 0) ? (
                <Timer
                  timeRemaining={
                    data.NFTs.find((NFT) => NFT.timeRemaining > 0).timeRemaining
                  }
                />
              ) : null}
            </div>
            <div className="mx-auto md:mx-0">
              <a
                href={"/webtoons/" + item.id}
                className="inline-block px-10 py-4 border-2 border-ourBlack bg-ourBlack text-white text-base leading-tight font-extrabold rounded-full duration-200 hover:shadow-large md:text-lg"
              >
                View webtoon
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
