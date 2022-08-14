import Image from "next/image";
import { useState } from "react";
import {
  handleMouseEnter,
  handleMouseLeave,
  isImage,
} from "../../utils/mediaType";
import Maximizable from "./Maximizable";

export default function Viewer({
  currentWebtoon,
  currentWebtoonNFTs,
  currentNFT,
  router,
}) {
  //Add blur to the image being loaded
  const [loading, setLoading] = useState(false);
  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto my-12 max-w-[85%] overflow-hidden md:max-w-none md:mt-20">
      <div className="flex gap-5 scroll-large overflow-x-auto md:hidden">
        {currentWebtoonNFTs.map((item, idx) => (
          <button
            id={item.id}
            aria-label="Select NFT"
            onClick={(e) => {
              // Enable routing to the selected NFT page without page reload
              router.push(
                {
                  query: { id: item.id },
                },
                undefined,
                {
                  scroll: false,
                }
              );
            }}
            key={idx}
            className="border bg-white rounded-sm shadow-lg p-3.5"
          >
            {isImage.includes(
              item.attributes.image.data[0].attributes.url.split(".")[
                item.attributes.image.data[0].attributes.url.split(".").length -
                  1
              ]
            ) ? (
              <Image
                alt="Rarement NFT Image"
                width={236}
                height={236}
                src={item.attributes.image.data[0].attributes.url}
                objectFit="contain"
                placeholder="blur"
                blurDataURL={`/_next/image?url=${item.attributes.image.data[0].attributes.url}&w=16&q=1`}
                className={`${
                  item.id !== currentNFT.id ? "opacity-40" : "opacity-100"
                } transition-opacity`}
              />
            ) : (
              <video
                controls
                playsInline={true}
                alt="Rarement NFT Video"
                autoPlay={false}
                poster={item.attributes.thumbnail.data.attributes.url}
                src={item.attributes.image.data[0].attributes.url}
                className={`h-[236px] ${
                  item.id !== currentNFT.id ? "opacity-40" : "opacity-100"
                } transition-opacity`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              ></video>
            )}
            <a
              href={"/webtoons/" + currentWebtoon.id}
              className="flex items-center mt-1 w-[236px] "
            >
              <div className="flex items-center bg-[#F3F3F3] py-1 px-2 rounded-sm max-w-full">
                <div className="truncate text-sm font-extrabold uppercase">
                  {currentWebtoon.attributes.title}
                </div>
                <div className="w-1 aspect-square mx-2 bg-lightGray rounded-full"></div>
                <div className="whitespace-nowrap text-xs font-extrabold">
                  vol {currentWebtoon.attributes.volume}
                </div>
              </div>
            </a>
          </button>
        ))}
      </div>
      <div className="hidden relative mx-auto w-[931px] md:block">
        <div className="flex flex-col scroll">
          <div className="mx-auto">
            <Maximizable currentNFT={currentNFT} loading={loading} />
            <a
              href={"/webtoons/" + currentWebtoon.id}
              className="flex items-center max-w-[931px] mt-4"
            >
              <div className="mx-auto flex items-center max-w-full">
                <div className="truncate text-2xl font-extrabold uppercase">
                  {currentWebtoon.attributes.title}
                </div>
                <div className="w-1 aspect-square bg-lightGray rounded-full mx-4"></div>
                <div className="whitespace-nowrap text-lg font-extrabold">
                  vol {currentWebtoon.attributes.volume}
                </div>
              </div>
            </a>
          </div>
          {currentWebtoonNFTs.length > 1 ? (
            <div className="mx-auto max-w-[931px] mt-6">
              <div className="flex overflow-x-auto gap-x-5 pb-3">
                {currentWebtoonNFTs.map((item, idx) => (
                  <button
                    onClick={(e) => {
                      //Add blur effect while switching images
                      handleLoading();
                      router.push(
                        {
                          query: { id: item.id },
                        },
                        undefined,
                        {
                          scroll: false,
                        }
                      );
                    }}
                    key={idx}
                    className="w-[78px] h-[105.2px]"
                    aria-label="Select NFT"
                  >
                    {isImage.includes(
                      item.attributes.image.data[0].attributes.url.split(".")[
                        item.attributes.image.data[0].attributes.url.split(".")
                          .length - 1
                      ]
                    ) ? (
                      <Image
                        alt="Rarement NFT Preview"
                        width={78}
                        height={78}
                        src={item.attributes.image.data[0].attributes.url}
                        layout="responsive"
                        objectFit="contain"
                        className={`${
                          item.id !== currentNFT.id
                            ? "opacity-40"
                            : "opacity-100"
                        } transition-opacity`}
                      />
                    ) : (
                      <video
                        alt="Rarement NFT Video"
                        src={item.attributes.image.data[0].attributes.url}
                        className={`h-[78px] ${
                          item.id !== currentNFT.id
                            ? "opacity-40"
                            : "opacity-100"
                        } transition-opacity`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      ></video>
                    )}

                    <div className=" w-[78px]">
                      <div className="truncate mx-auto">
                        {item.attributes.name}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="absolute bottom-8 -right-1 h-36 w-10 bg-gradient-to-l from-white"></div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
