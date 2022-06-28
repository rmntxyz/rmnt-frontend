import Image from "next/image";

export default function Viewer({
  NFT,
  currentNFT,
  router,
  loading,
  handleLoading,
}) {
  return (
    <div className="container mx-auto mt-12 max-w-[85%] md:mt-20">
      <div className="flex gap-5 scroll overflow-x-auto md:hidden">
        {NFT.webtoon.NFTs.map((item, idx) => (
          <button
            onClick={(e) => {
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
              layout="fixed"
            />
            <div className="flex items-center w-[236px]">
              <div className="truncate text-sm font-extrabold uppercase">
                {NFT.webtoon.title}
              </div>
              <div className="w-1 aspect-square mx-2 bg-lightGray rounded-full"></div>
              <div className="whitespace-nowrap text-xs font-extrabold">
                vol {NFT.webtoon.volume}
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="hidden relative mx-auto w-[600px] md:block xl:w-[630px]">
        <div className="flex flex-col scroll">
          <div
            className={`mx-auto mb-14 border bg-white rounded-sm drop-shadow-medium p-5`}
          >
            <Image
              width={590}
              height={590}
              src={currentNFT.image_address}
              placeholder="blur"
              blurDataURL={currentNFT.image_address}
              // onLoadingComplete={handleLoading}
              layout="responsive"
              className={`${loading ? "opacity-10" : "opacity-100"}`}
            />
            <div className="flex items-center w-[560px] xl:w-[590px]">
              <div className="truncate text-2xl font-extrabold uppercase">
                {NFT.webtoon.title}
              </div>
              <div className="w-1 aspect-square bg-lightGray rounded-full mx-4"></div>
              <div className="whitespace-nowrap text-lg font-extrabold">
                vol {NFT.webtoon.volume}
              </div>
            </div>
          </div>
          {NFT.webtoon.NFTs.length > 1 ? (
            <div className="mx-auto max-w-[570px] xl:max-w-[610px]">
              <div className="flex overflow-x-auto gap-x-5 pb-3">
                {NFT.webtoon.NFTs.map((item, idx) => (
                  <button
                    onClick={(e) => {
                      handleLoading();
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
                    className="w-[96px]"
                  >
                    <Image
                      width={96}
                      height={96}
                      src={item.image_address}
                      layout="fixed"
                    />
                    <div className="truncate">{item.name}</div>
                  </button>
                ))}
              </div>
              <div className="absolute bottom-8 -right-1 h-36 w-24 bg-gradient-to-l from-white xl:w-10"></div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
