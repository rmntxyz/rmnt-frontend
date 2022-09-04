import Image from "next/image";
import { useEffect, useState } from "react";
import { isImage } from "../../utils/mediaType";
import Maximizable from "./Maximizable";

export default function Viewer({
  currentWebtoon,
  currentWebtoonNFTs,
  currentNFT,
  router,
}) {
  //Reduce opacity for the image being loaded
  const [loading, setLoading] = useState(false);
  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  };

  //Get screen size to change object fit on mobile
  const [screenWidth, setScreenWidth] = useState();
  useEffect(() => {
    setScreenWidth(window.outerWidth);
  });

  //Get scroll position on NFT list
  const [scrollPositon, setScrollPosition] = useState();
  const [scrollableWidth, setScrollableWidth] = useState();
  const handleScroll = () => {
    const scroll = document.getElementById("scrollableElement").scrollLeft;
    const width =
      document.getElementById("scrollableElement").scrollWidth -
      document.getElementById("scrollableElement").clientWidth;
    setScrollPosition(scroll);
    setScrollableWidth(width);
  };
  useEffect(() => {
    document
      .getElementById("scrollableElement")
      .addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document
        .getElementById("scrollableElement")
        .removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container mx-auto my-12 max-w-[85%] overflow-hidden md:max-w-none md:mt-20">
      <div className="relative mx-auto md:block lg:w-[931px]">
        <div className="flex flex-col scroll">
          <div>
            <Maximizable currentNFT={currentNFT} loading={loading} />
            <a
              href={"/webtoons/" + currentWebtoon.id}
              className="flex items-center max-w-[931px] mt-4"
            >
              <div className="mx-auto flex items-center max-w-full">
                <div className="truncate font-extrabold uppercase text-sm md:text-2xl">
                  {currentWebtoon.attributes.title}
                </div>
                <div className="w-1 aspect-square bg-lightGray rounded-full mx-4"></div>
                <div className="whitespace-nowrap font-extrabold text-xs md:text-lg">
                  vol {currentWebtoon.attributes.volume}
                </div>
              </div>
            </a>
          </div>
          {currentWebtoonNFTs.length > 1 ? (
            <div className="mx-auto max-w-full mt-[22px] md:mt-6 md:max-w-[931px]">
              <div
                className="absolute z-10 bottom-8 -left-1 bg-gradient-to-r from-white w-10 h-28 md:h-36 "
                style={{
                  opacity:
                    scrollPositon === 0 || scrollPositon === undefined ? 0 : 1,
                }}
              ></div>
              <div
                id="scrollableElement"
                className="flex overflow-x-auto pb-3 gap-x-2 md:gap-x-5"
              >
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
                    className="w-[64px] h-[82px] md:w-[78px] md:h-[105.2px]"
                    aria-label="Select NFT"
                  >
                    <Image
                      alt="Rarement NFT Preview"
                      width={78}
                      height={78}
                      src={
                        isImage.includes(
                          item.attributes.image.data[0].attributes.url.split(
                            "."
                          )[
                            item.attributes.image.data[0].attributes.url.split(
                              "."
                            ).length - 1
                          ]
                        )
                          ? item.attributes.image.data[0].attributes.url
                          : item.attributes.thumbnail.data.attributes.url
                      }
                      layout="responsive"
                      objectFit={screenWidth < 768 ? "cover" : "contain"}
                      className={`${
                        item.id !== currentNFT.id ? "opacity-40" : "opacity-100"
                      } transition-opacity`}
                    />
                    <div className="w-[64px] md:w-[78px]">
                      <div className="truncate mx-auto text-xs md:text-base">
                        {/* {(idx + 1).toString().length < 2 ? (
                          <span>#{"0" + (idx + 1)}</span>
                        ) : (
                          <span>#{idx + 1}</span>
                        )} */}
                        {item.attributes.name}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div
                className="absolute bottom-8 -right-1 w-10 bg-gradient-to-l from-white h-28 md:h-36"
                style={{
                  opacity:
                    scrollPositon !== undefined &&
                    scrollPositon === scrollableWidth
                      ? 0
                      : 1,
                }}
              ></div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
