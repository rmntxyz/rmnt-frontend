import Image from "next/image";
import Line from "../../../utils/Line";
import { PolyFrameImage } from "../../../utils/PolyFrameImage";
import Character from "./Character";
import dynamic from 'next/dynamic'

const DynamicCollectability = dynamic(() => import('./Collectability'), {
  ssr: false,
})

export default function Avatar(props) {
  const { avatar, rarementABI, exchangeRate, webtoon } = props;

  return (
    <div className="mt-7 flex flex-col gap-4">
      <div className="text-2xl font-bold">Avatar</div>
      <div className="flex flex-col gap-8 items-center sm:flex-row">
        <div className="w-full aspect-square">
          <PolyFrameImage
            href={webtoon.attributes.avatarGIF.data.attributes.url}
            idx="gif"
          />
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-px">
            <div className="flex gap-1.5 items-center">
              <Image
                src={
                  webtoon.attributes.artist_id.data.attributes.profile_image
                    .data.attributes.url
                }
                width={24}
                height={24}
                alt="Rarement Artist Profile Image"
                className="rounded-full"
              />
              <a
                href={
                  "/artists/" +
                  webtoon.attributes.artist_id.data.attributes.first_name
                }
                className="hover:underline"
              >
                <span>Created by </span>
                <span className="font-bold">
                  {webtoon.attributes.artist_id.data.attributes.first_name}
                </span>
              </a>
            </div>
          </div>
          <Line />
          <div className="characters flex gap-2">
            {webtoon.attributes.characters?.data.map((item, idx) => (
              <Character item={item} key={idx} />
            ))}
          </div>
          <DynamicCollectability {...props} />
        </div>
      </div>
    </div>
  );
}
