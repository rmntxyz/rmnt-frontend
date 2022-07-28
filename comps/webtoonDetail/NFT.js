import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import DetailTimer from "./DetailTimer";

export default function NFT({ NFTs, exchangeRate }) {
  return (
    <div className="bg-lightBeige py-12 md:py-20">
      <div className="ml-8 md:ml-28 2xl:ml-72">
        <div className="flex flex-col gap-8 md:gap-14">
          <div className="flex items-start gap-4 md:gap-7 md:items-center">
            <div className="font-bold text-[22px] md:text-[40px]">NFT</div>
            {NFTs.find((NFT) => NFT.timeRemaining > 0) ? (
              <DetailTimer
                timeRemaining={
                  NFTs.find((NFT) => NFT.timeRemaining > 0).timeRemaining
                }
                className="bg-white text-black"
              />
            ) : null}
          </div>

          <div className="scroll-large overflow-x-auto flex gap-8 lg:scroll-xlarge">
            {NFTs.length === 0 ? (
              <span className="text-lg md:text-xl">
                New NFTs are on the way—stay tuned!
              </span>
            ) : (
              NFTs.map((item) => (
                <div
                  key={item.nft_id}
                  className="shadow-medium rounded-sm "
                >
                  {item.sold_timestamp?.length > 0 ? (
                    <div className="flex gap-1.5 items-center bg-ourBlack text-white text-sm md:text-base py-3.5 px-4">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-base md:text-lg"
                      />
                      <span>Soldout</span>
                    </div>
                  ) : (
                    <div className="flex gap-1 items-center bg-mediumBeige text-ourBlack text-sm md:text-base py-3.5 px-4">
                      <div className="relative h-4 w-4 md:h-5 md:w-5">
                        <Image
                          src="/icons/nft_available_1440_768@2x.png"
                          layout="fill"
                          objectFit="contain"
                          alt="Available Icon"
                        />
                      </div>
                      <span>Available</span>
                    </div>
                  )}
                  <div className="bg-white ">
                    <div className=" p-3.5 flex flex-col gap-3.5 md:p-4 ">
                      <a
                        href={"/NFT/" + item.nft_id}
                        className="overflow-hidden"
                      >
                        <div className="relative h-[196px] w-[196px] duration-200 hover:scale-125 md:h-[240px] md:w-[240px] lg:h-[256px] lg:w-[256px]">
                          <Image
                            src={item.image}
                            layout="fill"
                            objectFit="contain"
                            alt="Rarement NFT Image"
                          />
                        </div>
                      </a>
                      <div className="truncate w-[196px] font-bold text-base md:text-lg md:w-[240px] lg:w-[256px] ">
                        {/* {item.id.toString().length < 2 ? (
                        <span>
                          #{"0" + item.id}. {item.name}
                        </span>
                      ) : (
                        <span>
                          #{item.id}. {item.name}
                        </span>
                      )} */}
                        {item.name}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                          <div className="font-bold text-base md:text-lg">
                            {item.price} ETH
                          </div>
                          <div
                            className="text-[#858585] text-sm"
                            style={{
                              visibility:
                                item.sold_timestamp?.length > 0
                                  ? "hidden"
                                  : "visible",
                            }}
                          >
                            (≈ {(exchangeRate * item.price).toFixed(4)} USD)
                          </div>
                        </div>
                        {item.sold_timestamp?.length > 0 ? (
                          <a
                            href={item.opensea}
                            target="_blank"
                            className="relative group w-11 h-11 duration-200"
                          >
                            <div className="relative w-full h-full group-hover:opacity-0">
                              <Image
                                src="/openSea/opensea_64_1440_768@2x_black.png"
                                layout="fill"
                                objectFit="contain"
                                alt="Open Sea Icon"
                              />
                            </div>
                            <div className="absolute opacity-0 top-0 left-0 w-11 h-11 group-hover:opacity-100">
                              <div className="relative w-full h-full">
                                <Image
                                  src="/openSea/opensea_64_1440_768@2x_white.png"
                                  layout="fill"
                                  objectFit="contain"
                                  alt="Open Sea Icon"
                                />
                              </div>
                            </div>
                          </a>
                        ) : null}
                      </div>
                    </div>
                    <div className="border-t flex justify-end p-3.5 md:p-4">
                      <div className="text-[#CEA671] text-sm font-bold md:text-base">
                        Edition {item.edition} of{" "}
                        {NFTs.filter((NFT) => NFT.name === item.name).length}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
