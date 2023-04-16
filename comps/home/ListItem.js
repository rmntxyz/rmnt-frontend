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
          width={idx === 0 ? 566 : 300}
          height={idx === 0 ? 566 : 300}
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
            idx === 0 ? "p-4 gap-4" : "p-3 gap-3"
          }`}
        >
          <div className={`${idx === 0 ? "w-[23%]" : "w-[32%]"}`}>
            <PolyFrameImage
              href={item.attributes.avatarGIF.data.attributes.url}
              idx={item.attributes.avatarGIF.data.id}
            />
          </div>
          <div
            className={`flex flex-col -translate-y-[5%] ${
              idx === 0 ? "w-[75%] gap-3 text-lg" : "w-[68%] gap-2 text-sm"
            }`}
          >
            <div className="flex gap-1.5 items-center">
              <div className="relative" style={{ height: idx === 0 ? 44 : 33 }}>
                <Image
                  src={
                    item.attributes.artist_id.data.attributes.profile_image.data
                      .attributes.url
                  }
                  width={idx === 0 ? 33 : 22}
                  height={idx === 0 ? 33 : 22}
                  alt="Rarement Artist Profile Image"
                  className="rounded-full"
                />
                <div className="absolute bottom-0 w-full h-px bg-white/50 rounded-sm"></div>
              </div>
              <div
                className="relative w-full"
                style={{ height: idx === 0 ? 44 : 33 }}
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
