import Image from "next/image";

export default function Desc({ NFT, currentNFT, exchangeRate, router }) {
  return (
    <div className={`my-16 px-10 md:my-32 md:px-24 xl:px-4`}>
      <div className="container mx-auto">
        <div className="text-[21px] font-extrabold uppercase md:text-[32px]">
          {currentNFT.name}
        </div>
        <div className="text-justify my-4 text-sm md:text-lg">
          {currentNFT.description}
        </div>
        {currentNFT.sold_timestamp !== null &&
        currentNFT.sold_timestamp !== undefined &&
        currentNFT.sold_timestamp !== "" ? (
          <div className="flex gap-4 mt-8 items-center">
            <a
              href={currentNFT.opensea}
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
            <span className="text-base md:text-lg">{currentNFT.price} ETH</span>
          </div>
        ) : (
          <div className="max-w-fit mt-8 flex flex-col items-center">
            <button
              disabled={currentNFT.timeRemaining > 0 ? true : false}
              onClick={(e) => router.push("/")}
              className="inline-block px-10 py-4 bg-ourBlack text-white text-base leading-tight font-extrabold rounded-full duration-200 hover:drop-shadow-large disabled:bg-neutral-200 disabled:hover:drop-shadow-none md:px-14 md:py-4 md:text-lg"
            >
              <span>Buy</span>
              <span className="font-normal ml-3 md:ml-4">
                {currentNFT.price} ETH
              </span>
            </button>
            <div className="text-[#858585] text-xs mt-3 md:text-base">
              (≈ {(exchangeRate * currentNFT.price).toFixed(4)} USD)
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
