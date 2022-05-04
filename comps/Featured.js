import Image from "next/image";
import Timer from "./Timer";

export default function Featured(props) {
  const {data} = props
  return (
    <div className="container mx-auto">
      <div className="m-9 flex flex-col md:my-12 lg:my-20 lg:grid lg:grid-flow-col lg:items-center">
        <div className="lg:order-2">
          <div className="flex items-center">
            <div className="w-8 h-8 md:w-10 md:h-10">
              <Image
                src={data.profile}
                width={41.33}
                height={41.33}
                className="rounded-full"
              />
            </div>
            <div className="text-sm ml-1 md:text-xl md:ml-1.5">{data.name}</div>
          </div>
          <div className="flex items-center">
            <div className="mt-1.5 text-2xl font-extrabold uppercase md:text-6xl md:mt-3">
              {data.title}
            </div>
            <div className="w-1 h-1 m-2 bg-lightGray rounded-full md:w-1.5 md:h-1.5"></div>
            <div className="text-base font-extrabold md:text-3xl">{data.vol}</div>
          </div>
        </div>
        <div className="mt-5 md:mt-8 lg:row-span-2 lg:col-span-3 lg:order-1 lg:mt-0 lg:mr-8">
          <div className="border border-darkGray rounded-sm p-3.5 md:p-5">
            <Image
              src={data.cover}
              width={664}
              height={664}
              layout="responsive"
            />
          </div>
        </div>
        <div className="mt-8 flex flex-col md:mt-12 md:flex-row md:justify-between lg:flex-col lg:order-3">
          <div className="mb-8 pl-6 border-l border-mediumBeige text-sm md:text-lg md:mb-12 md:pl-8">
            <div>
              <div>Available NFT</div>
              <div className="text-base font-bold md:text-xl">{data.available}/5</div>
            </div>
            <Timer targetTime={data.targetTime} />
          </div>
          <div>
            <button className="inline-block px-12 py-3.5 border-2 border-ourBlack bg-ourBlack text-white text-lg leading-tight font-extrabold rounded-full transition duration-150 ease-in-out hover:drop-shadow-rmnt md:px-14 md:py-4 md:text-2xl">
              View webtoon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
