import { faCheckCircle, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { isImage } from "../../utils/mediaType";

export default function CollectiblesTab({ NFTs, exchangeRate }) {
  let NFTUrl = "";
  // const upcomingDropRemaining = Math.min(
  //   ...NFTs.filter(
  //     (NFT) => NFT.attributes.drop_timestamp - new Date().getTime() / 1000 > 0
  //   ).map((NFT) => NFT.attributes.drop_timestamp - new Date().getTime() / 1000)
  // );
  return (
    // <div className="bg-lightBeige py-12 md:py-20">
    //   <div className="mx-8 md:mx-28 2xl:container 2xl:mx-auto">
    /* <div className="flex flex-col gap-8 md:gap-14"> */
    /* <div className="flex items-start gap-4 md:gap-7 md:items-center">
            <div className="font-bold text-[22px] md:text-[40px]">NFT</div>
            {upcomingDropRemaining > 0 && upcomingDropRemaining !== Infinity ? (
              <DetailTimer
                timeRemaining={upcomingDropRemaining * 1000}
                className="bg-white text-black"
              />
            ) : null}
          </div> */

    <div className="mx-8 my-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
      {NFTs.length === 0 ? (
        <span className="text-lg">New NFTs are on the way—stay tuned!</span>
      ) : (
        NFTs.map(
          (item) => (
            (NFTUrl = item.attributes.image.data[0].attributes.url),
            (
              <div key={item.attributes.nft_id} className="box">
                <div className="innerBox"></div>
                <div className="flex flex-col gap-3">
                  <div className="relative aspect-square">
                    <Image
                      src={
                        isImage.includes(
                          NFTUrl.split(".")[NFTUrl.split(".").length - 1]
                        )
                          ? NFTUrl
                          : item.attributes.thumbnail.data.attributes.url
                      }
                      layout="fill"
                      objectFit="contain"
                      alt="Rarement NFT Image"
                      placeholder="blur"
                      blurDataURL={
                        isImage.includes(
                          NFTUrl.split(".")[NFTUrl.split(".").length - 1]
                        )
                          ? NFTUrl
                          : item.attributes.thumbnail.data.attributes.url
                      }
                      className="scale-[98.5%] rounded-tl-lg rounded-tr-lg"
                    />{" "}
                    {isImage.includes(
                      NFTUrl.split(".")[NFTUrl.split(".").length - 1]
                    ) ? null : (
                      <FontAwesomeIcon
                        icon={faVideo}
                        className="absolute top-3 left-3 text-white bg-opaqueGray p-1 rounded-md"
                      />
                    )}
                    {item.attributes.sold_timestamp?.toString().length > 0 ? (
                      <a
                        href={item.attributes.opensea}
                        target="_blank"
                        className="absolute bottom-2 right-2 px-2 py-2.5 bg-mintGreen rounded-md border border-navBg"
                      >
                        <svg
                          width="28"
                          height="26"
                          viewBox="0 0 28 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M27.99 16.4575V17.9069C27.99 17.9901 27.9391 18.064 27.8652 18.0964C27.4121 18.2906 25.8609 19.0026 25.216 19.8995C23.5701 22.1904 22.3126 25.466 19.5015 25.466H7.77445C3.61812 25.466 0.25 22.0864 0.25 17.9161V17.782C0.25 17.6711 0.340135 17.5809 0.451105 17.5809H6.98852C7.11795 17.5809 7.21272 17.7011 7.2012 17.8282C7.15494 18.2536 7.23355 18.6882 7.43466 19.0835C7.82301 19.8718 8.62747 20.3642 9.49665 20.3642H12.733V17.8375H9.53364C9.36952 17.8375 9.27246 17.6479 9.36723 17.5139C9.40188 17.4607 9.44121 17.4052 9.48279 17.3428C9.78564 16.9129 10.2179 16.2448 10.6479 15.4842C10.9415 14.9711 11.2258 14.4232 11.4546 13.873C11.5009 13.7736 11.5378 13.6719 11.5748 13.5725C11.6373 13.3968 11.702 13.2327 11.7482 13.0685C11.7945 12.9298 11.8314 12.7842 11.8684 12.6478C11.9771 12.1808 12.0233 11.6861 12.0233 11.173C12.0233 10.9719 12.0141 10.7615 11.9956 10.5604C11.9863 10.3408 11.9586 10.1211 11.9308 9.90154C11.9123 9.70736 11.8777 9.51548 11.8407 9.31438C11.7945 9.0208 11.7297 8.72956 11.6557 8.43593L11.6303 8.32501C11.5748 8.12386 11.5286 7.93202 11.4639 7.73092C11.2813 7.09979 11.0709 6.48491 10.849 5.90932C10.7681 5.68045 10.6756 5.46085 10.5831 5.24125C10.4468 4.91068 10.308 4.61017 10.1809 4.32581C10.1162 4.19635 10.0607 4.07845 10.0052 3.95825C9.94282 3.82186 9.87811 3.68546 9.81336 3.55604C9.76714 3.45664 9.71395 3.36416 9.67696 3.27169L9.28168 2.5412C9.2262 2.4418 9.31867 2.3239 9.4273 2.35396L11.9008 3.02432H11.9077C11.9123 3.02432 11.9147 3.02666 11.917 3.02666L12.2429 3.1168L12.6012 3.21854L12.733 3.25549V1.78529C12.733 1.07559 13.3017 0.5 14.0044 0.5C14.3558 0.5 14.6748 0.643325 14.9037 0.876785C15.1325 1.11029 15.2758 1.42929 15.2758 1.78529V3.96752L15.5394 4.04146C15.5602 4.04843 15.581 4.05766 15.5995 4.07152C15.6642 4.12007 15.7566 4.19171 15.8745 4.2796C15.967 4.35353 16.0664 4.44371 16.1866 4.53619C16.4247 4.72802 16.7091 4.97539 17.0211 5.25974C17.1043 5.33138 17.1853 5.40536 17.2592 5.47934C17.6615 5.85383 18.1123 6.29303 18.5422 6.77849C18.6624 6.91489 18.7803 7.05358 18.9005 7.1992C19.0207 7.34716 19.1479 7.49278 19.2588 7.63844C19.4045 7.83262 19.5617 8.03372 19.6981 8.2441C19.7628 8.3435 19.8367 8.4452 19.8992 8.54461C20.0748 8.81042 20.2297 9.08555 20.3777 9.36064C20.4401 9.48776 20.5048 9.62645 20.5603 9.76285C20.7244 10.1304 20.8539 10.5049 20.9371 10.8794C20.9625 10.9603 20.981 11.0481 20.9903 11.1268V11.1452C21.018 11.2562 21.0273 11.3741 21.0365 11.4943C21.0735 11.878 21.055 12.2617 20.9718 12.6478C20.9371 12.812 20.8909 12.9668 20.8354 13.131C20.7799 13.2881 20.7244 13.4523 20.6528 13.6072C20.5141 13.9285 20.3499 14.2498 20.1558 14.5503C20.0933 14.6613 20.0194 14.7792 19.9454 14.8901C19.8645 15.008 19.7813 15.119 19.7073 15.2276C19.6056 15.3663 19.497 15.512 19.386 15.6414C19.2866 15.7778 19.1849 15.9142 19.0739 16.0344C18.919 16.217 18.7711 16.3904 18.6162 16.5569C18.5237 16.6655 18.4243 16.7765 18.3226 16.8759C18.2232 16.9868 18.1215 17.0862 18.029 17.1787C17.8742 17.3336 17.7447 17.4538 17.636 17.5532L17.3818 17.7867C17.3448 17.819 17.2962 17.8375 17.2454 17.8375H15.2758V20.3642H17.7539C18.3087 20.3642 18.8358 20.1677 19.2612 19.807C19.4068 19.6799 20.0425 19.1297 20.7938 18.2998C20.8192 18.2721 20.8516 18.2513 20.8886 18.2421L27.7334 16.2633C27.8606 16.2263 27.99 16.3234 27.99 16.4575Z"
                            fill="#1D1D1D"
                          />
                        </svg>
                      </a>
                    ) : null}
                  </div>
                  <div className="px-4 flex flex-col gap-3 mb-7 z-10">
                    <div className="truncate font-bold">
                      {/* {item.id.toString().length < 2 ? (
                        <span>
                          #{"0" + item.id}. {item.name}
                        </span>
                      ) : (
                        <span>
                          #{item.id}. {item.name}
                        </span>
                      )} */}
                      {item.attributes.name}
                    </div>
                    <div className="w-full h-px bg-white/10"></div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-1">
                        <svg
                          width="13"
                          height="19"
                          viewBox="0 0 13 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.48876 12.8914L12.0738 9.65178L5.44263 6.24341L6.48876 12.8914Z"
                            fill="#CCFFF2"
                          />
                          <path
                            d="M0.920654 9.66869L6.50567 12.9083V6.93524L0.920654 9.66869Z"
                            fill="#CCFFF2"
                          />
                          <path
                            d="M6.4887 0.574097L0.903687 9.66872L8.20976 6.41221L6.4887 0.574097Z"
                            fill="#70EFCF"
                          />
                          <path
                            d="M6.48877 0.574097V7.1715L12.0738 9.66872L6.48877 0.574097Z"
                            fill="#1EA280"
                          />
                          <path
                            d="M6.48879 18.4259L7.21434 14.3426L0.920654 10.698L6.48879 18.4259Z"
                            fill="#70EFCF"
                          />
                          <path
                            d="M6.48877 13.9376V18.4259L12.0738 10.698L6.48877 13.9376Z"
                            fill="#1EA280"
                          />
                        </svg>

                        <div className="font-bold text-sm">
                          {parseFloat(item.attributes.price_in_wei) /
                            Math.pow(10, 18)}{" "}
                          ETH
                        </div>
                        <div
                          className="text-white/50 text-sm"
                          style={{
                            visibility:
                              item.attributes.sold_timestamp?.toString()
                                .length > 0
                                ? "hidden"
                                : "visible",
                          }}
                        >
                          (≈{" "}
                          {(
                            (exchangeRate *
                              parseFloat(item.attributes.price_in_wei)) /
                            Math.pow(10, 18)
                          ).toFixed(3)}{" "}
                          USD)
                        </div>
                      </div>
                      <div className="ml-4">
                        {item.attributes.sold_timestamp?.toString().length >
                        0 ? (
                          <span className="text-sm text-white/50 ml-1">
                            (Soldout)
                          </span>
                        ) : (
                          <div>
                            <span className="font-bold"></span>
                            <span>/{item.attributes.quantity}</span>
                            <span className="text-sm text-white/50 ml-1">
                              (Available)
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )
        )
      )}
    </div>

    /* </div> */
    //   </div>
    // </div>
  );
}
