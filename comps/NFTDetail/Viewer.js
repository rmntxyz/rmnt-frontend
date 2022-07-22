import Image from "next/image";
import { useState } from "react";
import Maximizable from "./Maximizable";

export default function Viewer({ NFT, currentNFT, router }) {
  //Add blur to the image being loaded
  const [loading, setLoading] = useState(false);
  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  return (
    <div className="container mx-auto mt-12 max-w-[85%] md:max-w-none md:mt-20">
      <div className="flex gap-5 scroll-large overflow-x-auto md:hidden">
        {NFT.webtoon.NFTs.map((item, idx) => (
          <button
            aria-label="Select NFT"
            onClick={(e) => {
              // Enable routing to the selected NFT page without page reload
              router.push(
                {
                  query: { nft_id: item.nft_id },
                },
                undefined,
                {
                  scroll: false,
                }
              );
            }}
            key={idx}
            className="border bg-white rounded-sm drop-shadow-medium p-3.5"
          >
            <Image
              alt="Rarement NFT Image"
              width={236}
              height={236}
              src={item.image}
              objectFit="contain"
              placeholder="blur"
              blurDataURL={`/_next/image?url=${currentNFT.image}&w=16&q=1`}
              className={`${
                item.nft_id !== currentNFT.nft_id ? "opacity-40" : "opacity-100"
              } transition-opacity`}
            />
            <a
              href={"/webtoons/" + NFT.webtoon.webtoon_id}
              className="flex items-center mt-1 w-[236px] "
            >
              <div className="flex items-center bg-[#F3F3F3] py-1 px-2 rounded-sm">
                <div className="truncate text-sm font-extrabold uppercase">
                  {NFT.webtoon.title}
                </div>
                <div className="w-1 aspect-square mx-2 bg-lightGray rounded-full"></div>
                <div className="whitespace-nowrap text-xs font-extrabold">
                  vol {NFT.webtoon.volume}
                </div>
              </div>
            </a>
          </button>
        ))}
      </div>
      <div className="hidden relative mx-auto w-[442px] md:block">
        <div className="flex flex-col scroll">
          <div
            className={`mx-auto mb-14 border bg-white rounded-sm drop-shadow-medium p-5 `}
          >
            <Maximizable currentNFT={currentNFT} loading={loading} />
            <a
              href={"/webtoons/" + NFT.webtoon.webtoon_id}
              className="flex items-center mt-4 w-[402px]"
            >
              <div className="flex items-center bg-[#F3F3F3] py-2 px-4 rounded-sm">
                <div className="truncate text-2xl font-extrabold uppercase">
                  {NFT.webtoon.title}
                </div>
                <div className="w-1 aspect-square bg-lightGray rounded-full mx-4"></div>
                <div className="whitespace-nowrap text-lg font-extrabold">
                  vol {NFT.webtoon.volume}
                </div>
              </div>
            </a>
          </div>
          {NFT.webtoon.NFTs.length > 1 ? (
            <div className="mx-auto max-w-[442px]">
              <div className="flex overflow-x-auto gap-x-5 pb-3">
                {NFT.webtoon.NFTs.map((item, idx) => (
                  <button
                    onClick={(e) => {
                      //Add blur effect while switching images
                      handleLoading();
                      router.push(
                        {
                          query: { nft_id: item.nft_id },
                        },
                        undefined,
                        {
                          scroll: false,
                        }
                      );
                    }}
                    key={idx}
                    className="w-[96px]"
                    aria-label="Select NFT"
                  >
                    <Image
                      alt="Rarement NFT Preview Button"
                      width={96}
                      height={96}
                      src={item.image}
                      layout="responsive"
                      objectFit="contain"
                      className={`${
                        item.nft_id !== currentNFT.nft_id
                          ? "opacity-40"
                          : "opacity-100"
                      } transition-opacity`}
                    />
                    <div className="truncate">{item.name}</div>
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
