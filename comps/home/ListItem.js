import Image from "next/image";
import Line from "../../utils/Line";
import { PolyFrameImage } from "../../utils/PolyFrameImage";

export default function ListItem({ item }) {
  const allAvatars = item.attributes.avatars?.data.length;
  const availableAvatars = item.attributes.avatars?.data.filter(
    (avatar) => !avatar.attributes.owned_by.data
  ).length;
  // const NFTs = item.attributes.webtoon_pages.data
  //   .map((webtoon_page) => webtoon_page.attributes.nfts?.data)
  //   .flat(1)
  //   .filter((NFT) => !!NFT)
  //   .sort((a, b) => a.id - b.id)
  //   .sort((a, b) => b.attributes.drop_timestamp - a.attributes.drop_timestamp);
  // const avatarUrl = NFTs[0].attributes.image.data[0].attributes.url;
  return (
    <div className="relative">
      <a href={"/webtoons/" + item.attributes.webtoon_id}>
        <Image
          src={item.attributes.cover_image.data.attributes.url}
          width={704}
          height={704}
          layout="responsive"
          placeholder="blur"
          blurDataURL={item.attributes.cover_image.data.attributes.url}
          className="rounded-2xl"
          alt="Rarement Webtoon Cover Image"
        />
      </a>
      <div className="absolute p-4 h-fit bottom-0 z-10 flex items-center w-full gap-4 rounded-bl-2xl rounded-br-2xl bg-black/50">
        <div className="w-1/5">
          <PolyFrameImage
            href={item.attributes.avatarGIF.data.attributes.url}
            idx={item.attributes.avatarGIF.data.id}
          />
        </div>
        <div className="w-4/5 flex flex-col gap-3 text-lg">
          <div className="flex gap-1.5 items-center">
            <Image
              src={
                item.attributes.artist_id.data.attributes.profile_image.data
                  .attributes.url
              }
              width={33}
              height={33}
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
          <div>
            <span className="font-bold">Availability {availableAvatars}</span>
            <span>/{allAvatars}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
