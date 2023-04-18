import Image from "next/image";
import Link from "next/link";
import { PolyFrameImage } from "../../utils/PolyFrameImage";
import useRarementData from "../../utils/useRarementData";

export default function ListItem({ item, idx, rarementABI }) {
  //Fetch rarement data
  const rarement = item.attributes.rarement?.data?.attributes;

  const { totalSupply, rarementInfo, isLoading } = useRarementData(
    rarement?.contractAddress,
    rarement?.chainId,
    rarementABI
  );

  //Find if the webtoon is released
  const released = rarement && Date.now() > rarement.startTime * 1000;

  return (
    <div className="relative">
      <Link href={"/webtoons/" + item.attributes.webtoon_id}>
        <Image
          src={item.attributes.cover_image.data.attributes.url}
          width={566}
          height={566}
          placeholder="blur"
          blurDataURL={item.attributes.cover_image.data.attributes.url}
          className="rounded-2xl"
          alt="Rarement Webtoon Cover Image"
          loading={idx === 0 ? "eager" : "lazy"}
        />
      </Link>
      {released ? (
        <div
          className={`absolute flex h-fit bottom-0 z-10 items-center w-full rounded-bl-2xl rounded-br-2xl bg-black/50 ${
            idx === 0 ? "p-3 gap-3 sm:p-4 sm:gap-4" : "p-3 gap-3"
          }`}
        >
          <div className={`${idx === 0 ? "w-[32%] sm:w-[23%]" : "w-[32%]"}`}>
            {/* <PolyFrameImage
              href={item.attributes.avatarGIF.data.attributes.url}
              idx={item.attributes.avatarGIF.data.id}
            /> */}
          </div>
          <div
            className={`flex flex-col -translate-y-[5%] ${
              idx === 0
                ? "w-[68%] gap-2 text-sm sm:w-[75%] sm:gap-3 sm:text-lg"
                : "w-[68%] gap-2 text-sm"
            }`}
          >
            <div className="flex gap-1.5 items-center">
              <div
                className={`relative min-w-fit ${
                  idx === 0 ? "h-[33px] sm:h-[44px]" : "h-[33px]"
                }`}
              >
                <Image
                  src={
                    item.attributes.artist_id.data.attributes.profile_image.data
                      .attributes.url
                  }
                  width={33}
                  height={33}
                  alt="Rarement Artist Profile Image"
                  className={`rounded-full aspect-square ${
                    idx === 0
                      ? "w-[22px] h-[22px] sm:w-[33px] sm:h-[33px] sm:aspect-square"
                      : "w-[22px] h-[22px]"
                  }}`}
                />
                <div className="absolute bottom-0 w-full h-px bg-white/50 rounded-sm"></div>
              </div>
              <div
                className={`relative w-full ${
                  idx === 0 ? "h-[33px] sm:h-[44px]" : "h-[33px]"
                }`}
              >
                <Link
                  href={
                    "/artists/" +
                    item.attributes.artist_id.data.attributes.first_name
                  }
                  className="hover:underline"
                >
                  <span>Created by </span>
                  <span className="font-bold truncate">
                    {item.attributes.artist_id.data.attributes.first_name}
                  </span>
                </Link>
                <div className="absolute bottom-0 w-full h-px bg-white/50 rounded-sm"></div>
              </div>
            </div>
            {isLoading ? (
              <div className="animate-pulse  bg-lightGray/50 rounded-full items-center w-1/2 h-7"></div>
            ) : (
              <div className="flex gap-1.5 items-center">
                <span>Collected</span>
                <div className="flex items-center font-bold">
                  <span>{totalSupply}</span>
                  <span>/{rarementInfo?.maxSupply}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="absolute bg-navBg/50 w-full h-full top-0 z-10 flex items-center justify-center text-white/100 text-3xl font-bold">
          Coming soon
        </div>
      )}
    </div>
  );
}
