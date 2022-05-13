import Image from "next/image";
import Available from "./Available";
import Timer from "./Timer";

export default function TopCard({ data }) {
  return (
    <div className="bg-hero bg-cover bg-top pt-4">
      <div className="container mx-auto ">
        {data.title ? (
          <div className="m-9 flex flex-col md:my-12 lg:m-24 lg:grid lg:grid-flow-col lg:grid-cols-2 lg:items-center">
            <div className="lg:order-2">
              <a href={data.profileLink} className="flex items-center">
                <div className="w-8 h-8 md:w-10 md:h-10">
                  <Image
                    src={data.profile}
                    width={41.33}
                    height={41.33}
                    className="rounded-full"
                  />
                </div>
                <div className="text-sm ml-1 md:text-xl md:ml-1.5">
                  {data.author}
                </div>
              </a>
              <div className="flex mt-1.5 items-center md:mt-3 lg:flex-wrap">
                <div className="truncate text-2xl font-extrabold uppercase md:text-6xl">
                  {data.title}
                </div>
                <div className="w-1 aspect-square m-2 bg-lightGray rounded-full md:w-3 md:m-4 lg:w-1.5"></div>
                <div className="whitespace-nowrap text-base font-extrabold md:text-3xl">
                  vol {data.vol}
                </div>
              </div>
            </div>
            <div className="mt-5 md:mt-8 lg:row-span-2 lg:order-1 lg:mt-0 lg:mr-8">
              <div className="border border-darkGray bg-white rounded-sm p-3.5 drop-shadow-medium md:p-5">
                <a href={data.detailLink}>
                  <Image
                    src={data.cover}
                    width={664}
                    height={664}
                    layout="responsive"
                    className="hover:scale-125"
                  />
                </a>
              </div>
            </div>
            <div className="mt-8 flex flex-col md:mt-12 md:flex-row md:justify-between lg:flex-col lg:order-3">
              <div className="mb-8 pl-6 border-l border-mediumBeige text-sm md:text-lg md:mb-12 md:pl-8">
                <Available nft={data.nft} />
                <Timer nft={data.nft} />
              </div>
              <div className="mx-auto md:mx-0">
                <a
                  href={"/webtoons/" + data.id}
                  className="inline-block px-12 py-3.5 border-2 border-ourBlack bg-ourBlack text-white text-lg leading-tight font-extrabold rounded-full transition duration-150 ease-in-out hover:drop-shadow-large md:px-14 md:py-4 md:text-2xl"
                >
                  View webtoon
                </a>
              </div>
            </div>
          </div>
        ) : (
          <h4>Loading...</h4>
        )}
      </div>
    </div>
  );
}
