import Image from "next/image";
import Line from "../../utils/Line";
import { PolyFrameImage } from "../../utils/PolyFrameImage";
import useCollectibility from "../../utils/useCollectibility";
import { Loading } from "../../utils/svgs";

export default function ListItem({ item, idx, rarementABI }) {
  //Find available avatars
  const currTime = Math.floor(Date.now() / 1000);
  const availableAvatars = item.attributes.avatars.data
    .filter((avatar) => !!avatar.attributes.rarement.data)
    .filter(
      (avatar) => avatar.attributes.rarement.data.attributes.endTime > currTime
    )
    .sort(
      (a, b) =>
        a.attributes.rarement.data.attributes.startTime -
        b.attributes.rarement.data.attributes.startTime
    );

  //Use the first avatar from all available avatars
  const avatar = availableAvatars[0];
  const rarement = avatar?.attributes.rarement?.data.attributes;

  //Declare variables to be used for the first avatar
  let totalSupply;
  let maxSupply;
  let isLoading;

  //Find if the webtoon is released
  const released =
    new Date().getTime() > item.attributes.released_timestamp * 1000;

  return (
    <div className="relative">
      <a href={"/webtoons/" + item.attributes.webtoon_id}>
        <Image
          src={item.attributes.cover_image.data.attributes.url}
          width={704}
          height={704}
          placeholder="blur"
          blurDataURL={item.attributes.cover_image.data.attributes.url}
          className="rounded-2xl"
          alt="Rarement Webtoon Cover Image"
        />
      </a>
      <div
        className={`absolute h-fit bottom-0 z-10 items-center w-full grounded-bl-2xl rounded-br-2xl bg-black/50 ${
          idx === 0 ? "p-4 gap-4" : "p-3 gap-3"
        }`}
        style={{ display: released ? "flex" : "none" }}
      >
        <div className={`${idx === 0 ? "w-1/5" : "w-1/4"}`}>
          <PolyFrameImage
            href={item.attributes.avatarGIF.data.attributes.url}
            idx={item.attributes.avatarGIF.data.id}
          />
        </div>
        <div
          className={`flex flex-col ${
            idx === 0 ? "w-4/5 gap-3 text-lg" : "w-3/4 gap-2 text-sm"
          }`}
        >
          <div className="flex gap-1.5 items-center">
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
            <a
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
            </a>
          </div>
          <Line />
          {rarement
            ? (({ totalSupply, maxSupply, isLoading } = useCollectibility(
                rarement,
                rarementABI
              )),
              (
                <div className="flex gap-1.5 items-center">
                  <span
                    className={`${
                      isLoading
                        ? "animate-pulse text-transparent bg-lightGray/50 rounded-full h-3 sm:h-4"
                        : "font-bold"
                    }`}
                  >
                    Availability
                  </span>
                  <div
                    className={`flex items-center ${
                      isLoading
                        ? "animate-pulse text-transparent bg-lightGray/50 rounded-full h-3 sm:h-4"
                        : ""
                    }`}
                  >
                    <span className="font-bold">{maxSupply - totalSupply}</span>
                    <span>/{maxSupply}</span>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
      {released ? null : (
        <div className="absolute bg-navBg/50 w-full h-full top-0 z-10 flex items-center justify-center text-white/100 text-3xl font-bold">
          Coming soon
        </div>
      )}
    </div>
  );
}
