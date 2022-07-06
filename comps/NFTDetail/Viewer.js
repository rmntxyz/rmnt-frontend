import Image from "next/image";
import { useState } from "react";
import Maximizable from "./Maximizable";

export default function Viewer({ NFT, currentNFT, router }) {
  const [loading, setLoading] = useState(false);
  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  return (
    <div className="container mx-auto mt-12 max-w-[85%] md:mt-20">
      <div className="flex gap-5 scroll overflow-x-auto md:hidden">
        {NFT.webtoon.NFTs.map((item, idx) => (
          <button
            onClick={(e) => {
              // handleLoading();
              router.push(
                {
                  query: { id: item.id },
                },
                undefined,
                {
                  shallow: true,
                  scroll: false,
                }
              );
            }}
            key={idx}
            className="border bg-white rounded-sm drop-shadow-medium p-3.5"
          >
            <Image
              width={236}
              height={236}
              src={item.image_address}
              objectFit="contain"
              className={`${
                item.id !== currentNFT.id ? "opacity-40" : "opacity-100"
              } transition-opacity`}
            />
            <a
              href={"/webtoons/" + NFT.webtoon.id}
              className="flex items-center w-[236px]"
            >
              <div className="truncate text-sm font-extrabold uppercase">
                {NFT.webtoon.title}
              </div>
              <div className="w-1 aspect-square mx-2 bg-lightGray rounded-full"></div>
              <div className="whitespace-nowrap text-xs font-extrabold">
                vol {NFT.webtoon.volume}
              </div>
            </a>
          </button>
        ))}
      </div>
      <div className="hidden relative mx-auto w-[600px] md:block xl:w-[630px]">
        <div className="flex flex-col scroll">
          <div
            className={`mx-auto mb-14 border bg-white rounded-sm drop-shadow-medium p-5 `}
          >
            <Maximizable currentNFT={currentNFT} loading={loading} />
            <a
              href={"/webtoons/" + NFT.webtoon.id}
              className="flex items-center mt-3 w-[560px] xl:w-[590px]"
            >
              <div className="truncate text-2xl font-extrabold uppercase">
                {NFT.webtoon.title}
              </div>
              <div className="w-1 aspect-square bg-lightGray rounded-full mx-4"></div>
              <div className="whitespace-nowrap text-lg font-extrabold">
                vol {NFT.webtoon.volume}
              </div>
            </a>
          </div>
          {NFT.webtoon.NFTs.length > 1 ? (
            <div className="mx-auto max-w-[600px] xl:max-w-[610px]">
              <div className="flex overflow-x-auto gap-x-5 pb-3">
                {NFT.webtoon.NFTs.map((item, idx) => (
                  <button
                    onClick={(e) => {
                      handleLoading();
                      setTimeout(() => {
                        router.push(
                          {
                            query: { id: item.id },
                          },
                          undefined,
                          {
                            shallow: true,
                            scroll: false,
                          }
                        );
                      }, 100);
                    }}
                    key={idx}
                    className="w-[96px]"
                  >
                    <Image
                      width={96}
                      height={96}
                      src={item.image_address}
                      objectFit="contain"
                      className={`${
                        item.id !== currentNFT.id ? "opacity-40" : "opacity-100"
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
