import Image from "next/image";

export default function Desc({
  currentNFT,
  exchangeRate,
  router,
  timeRemaining,
}) {
  return (
    <div className="text-white">
      <div className="text-[21px] font-extrabold uppercase md:text-[32px]">
        {currentNFT.attributes.name}
      </div>
      <div className="text-justify my-4 text-sm md:text-lg">
        {currentNFT.attributes.description}
      </div>
      {currentNFT.attributes.sold_timestamp?.toString().length > 0 ? (
        <div className="flex gap-4 mt-8 items-center">
          <a
            href={currentNFT.attributes.opensea}
            target="_blank"
            className="relative group w-[51px] h-[51px] mr-1 md:w-16 md:h-16"
          >
            <div className="relative w-full h-full group-hover:opacity-0 duration-200 ">
              <Image
                src="/openSea/opensea_64_1440_768@2x_black.png"
                layout="fill"
                objectFit="contain"
                alt="Open Sea Icon"
              />
            </div>
            <div className="absolute top-0 left-0 opacity-0 duration-200 w-[51px] h-[51px] mr-1 group-hover:opacity-100 md:w-16 md:h-16">
              <div className="relative w-full h-full ">
                <Image
                  src="/openSea/opensea_64_1440_768@2x_white.png"
                  layout="fill"
                  objectFit="contain"
                  alt="Open Sea Icon"
                />
              </div>
            </div>
          </a>
          <span className="text-base font-extrabold md:text-lg">Soldout</span>
          <span className="text-base md:text-lg">
            {parseFloat(currentNFT.attributes.price_in_wei) / Math.pow(10, 18)}{" "}
            ETH
          </span>
        </div>
      ) : (
        <div className="max-w-fit mt-8 flex flex-col items-center">
          <button
            disabled={timeRemaining > 0 ? true : false}
            onClick={(e) => router.push("/")}
            className="inline-block px-10 py-4 bg-[#CEA671]  text-white text-base leading-tight font-extrabold rounded-full duration-200 hover:shadow-large disabled:bg-neutral-200 disabled:hover:shadow-none md:px-14 md:py-4 md:text-lg"
          >
            <span>Buy</span>
            <span className="font-normal ml-3 md:ml-4">
              {parseFloat(currentNFT.attributes.price_in_wei) /
                Math.pow(10, 18)}{" "}
              ETH
            </span>
          </button>
          <div className="text-[#858585] text-xs mt-3 md:text-base">
            (≈{" "}
            {(
              exchangeRate *
              (parseFloat(currentNFT.attributes.price_in_wei) /
                Math.pow(10, 18))
            ).toFixed(4)}{" "}
            USD)
          </div>
        </div>
      )}
    </div>
  );
}
