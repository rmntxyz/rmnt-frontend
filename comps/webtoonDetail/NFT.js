import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DetailTimer from "./DetailTimer";

export default function NFT({ NFTs, timeRemaining, exchangeRate }) {

  return (
    <div className="bg-lightBeige py-12 md:py-20">
      <div className="ml-8 md:ml-20 lg:ml-24 2xl:ml-52 3xl:ml-80">
        <div className="flex flex-col gap-8 md:gap-14">
          <div className="flex items-start gap-4 md:gap-7 md:items-center">
            <div className="font-bold text-[22px] md:text-[40px]">NFT</div>
            {timeRemaining ? (
              <DetailTimer
                timeRemaining={timeRemaining}
                className="bg-white text-black"
              />
            ) : null}
          </div>

          <div className="scroll overflow-x-auto flex gap-8">
            {NFTs.map((item) => (
              <div key={item.id} className="drop-shadow-medium rounded-sm ">
                {item.sold ? (
                  <div className="flex gap-1.5 items-center bg-ourBlack text-white text-sm md:text-base py-3.5 px-4">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-base md:text-lg"
                    />
                    <span>Soldout</span>
                  </div>
                ) : (
                  <div className="flex gap-1 items-center bg-mediumBeige text-ourBlack text-sm md:text-base py-3.5 px-4">
                    <img
                      src="/nft_available_1440_768@2x.png"
                      className="w-4 md:w-5"
                    />
                    <span>Available</span>
                  </div>
                )}
                <div className="bg-white ">
                  <div className=" p-3.5 flex flex-col gap-3.5 md:p-4 ">
                    <a href={"/NFT/" + item.id} className="overflow-hidden">
                      <img
                        src={item.image_address}
                        width={304}
                        height={304}
                        className="max-w-[220px] duration-200 hover:scale-125 md:max-w-[304px] lg:max-w-[288px]"
                      />
                    </a>
                    <div className="font-bold text-lg md:text-xl">
                      {item.id.toString().length < 2 ? (
                        <span>
                          #{"0" + item.id}. {item.name}
                        </span>
                      ) : (
                        <span>
                          #{item.id}. {item.name}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <div className="text-[#858585] text-base md:text-lg">
                          (≈ {(exchangeRate * item.price).toFixed(4)} USD)
                        </div>
                        <div className="font-bold text-lg md:text-xl">
                          {item.price} ETH
                        </div>
                      </div>
                      {item.sold ? (
                        <a
                          href={item.opensea}
                          target="_blank"
                          className="relative group bg-ourBlack rounded-full border border-ourBlack w-11 h-11 p-2 duration-200 hover:bg-white "
                        >
                          <img
                            src="/openSea/openSea_white.png"
                            className="group-hover:opacity-0"
                          />
                          <img
                            src="/openSea/openSea_black.png"
                            className="absolute opacity-0 top-1.5 left-2 group-hover:opacity-100"
                          />
                        </a>
                      ) : null}
                    </div>
                  </div>
                  <div className="border-t flex justify-end p-3.5 md:p-4">
                    <div className="text-[#CEA671] text-base font-bold md:text-lg">
                      Edition {item.edition} of {item.total_editions}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
