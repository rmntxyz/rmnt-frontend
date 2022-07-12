import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Timer from "../home/TopCard/Timer";

export default function Desc({ NFT, currentNFT, exchangeRate }) {
  return (
    <div className={`container mx-auto my-16 md:my-32`}>
      <div className="max-w-[85%] mx-auto flex flex-col lg:max-w-[93%] lg:gap-16 lg:grid lg:grid-cols-2 xl:gap-24">
        <div className="mb-12 md:mb-20">
          <div className="text-2xl font-extrabold uppercase md:text-5xl">
            {currentNFT.name}
          </div>
          <div className="text-justify my-4 md:text-xl">
            {currentNFT.description}
          </div>
          {currentNFT.sold ? (
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
              <span className="text-lg font-extrabold md:text-2xl">
                Soldout
              </span>
              <span className="text-lg md:text-2xl">
                {currentNFT.price} ETH
              </span>
            </div>
          ) : (
            <div className="max-w-fit mt-8 flex flex-col items-center">
              <a
                href="/"
                className="inline-block px-12 py-3.5 border-2 border-ourBlack bg-ourBlack text-white text-lg leading-tight font-extrabold rounded-full duration-200 hover:drop-shadow-large md:px-14 md:py-4 md:text-2xl"
              >
                <span>Buy</span>
                <span className="font-normal ml-3 md:ml-4">
                  {currentNFT.price} ETH
                </span>
              </a>
              <div className="text-[#858585] text-lg mt-3">
                (≈ {(exchangeRate * currentNFT.price).toFixed(4)} USD)
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-5 md:gap-8">
          <div className="flex flex-col border-2 border-[#CEA671]">
            <div className="flex gap-2.5 py-4 px-6 bg-[#CEA671] items-center text-white text-base font-bold md:px-8 md:py-7 md:text-2xl">
              <span className="bg-white rounded-full flex items-center justify-center w-5 aspect-square md:w-6">
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-[#CEA671] text-xs md:text-sm"
                />
              </span>
              <span>
                Edition {currentNFT.edition} of{" "}
                {
                  NFT.webtoon.NFTs.filter((NFT) => NFT.name === currentNFT.name)
                    .length
                }
              </span>
            </div>
            <div>
              {currentNFT.timeRemaining ? (
                <div className="px-6 md:px-8">
                  <Timer timeRemaining={currentNFT.timeRemaining} />
                  <div className="h-px w-full mt-4 bg-lightBeige md:mt-8"></div>
                </div>
              ) : null}
              <div className="text-sm md:text-lg py-4 px-6 md:px-8 md:py-7 md:text-[17px]">
                <a href={"/artists/" + currentNFT.created_by}>
                  <span>Created by </span>
                  <span className="text-[#CEA671] hover:underline">
                    {currentNFT.created_by}
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 bg-lightBeige py-4 px-6 md:gap-4 md:px-8 md:py-7">
            <div className="text-base font-bold md:text-2xl">Reward</div>
            <div className="text-justify">{currentNFT.reward}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
