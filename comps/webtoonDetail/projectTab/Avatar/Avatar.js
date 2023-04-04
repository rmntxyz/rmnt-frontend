import Image from "next/image";
import Line from "../../../../utils/Line";
import { PolyFrameImage } from "../../../../utils/PolyFrameImage";
import Character from "./Character";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

const DynamicCollectability = dynamic(() => import("./Collectability"), {
  ssr: false,
});

export default function Avatar(props) {
  const { avatar, rarementABI, exchangeRate, webtoon } = props;

  return (
    <div className="mt-7 flex flex-col gap-4">
      <div className="text-2xl font-bold">Avatar</div>
      <div className="flex flex-col gap-8 items-center sm:flex-row">
        <div className="w-full aspect-square sm:w-[105%]">
          {webtoon.attributes.avatarGIF.data ? (
            <PolyFrameImage
              href={webtoon.attributes.avatarGIF.data?.attributes.url}
              idx="gif"
            />
          ) : (
            <div className="relative">
              <svg viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
                <path
                  id="path"
                  d="M168 0.5C174.351 0.5 179.5 5.64873 179.5 12V143.569C179.5 147.262 177.726 150.731 174.731 152.893L140.888 177.324C138.929 178.739 136.574 179.5 134.157 179.5H12C5.64874 179.5 0.5 174.351 0.5 168V12C0.5 5.64872 5.64873 0.5 12 0.5H168Z"
                  stroke="url(#gradient)"
                  strokeOpacity="0.2"
                  fill="rgba(255, 255, 255, 0.04)"
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="19.8"
                    y1="16.9438"
                    x2="122.153"
                    y2="210.577"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#70EFCF" />
                    <stop offset="1" stopColor="#CEA671" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-6xl font-bold opacity-80">
                <FontAwesomeIcon icon={faCircleQuestion} />
              </div>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col gap-4">
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
          <div className="characters py-2 flex gap-2">
            {webtoon.attributes.characters?.data.map((item, idx) => (
              <Character item={item} key={idx} />
            ))}
          </div>
          <div>
            {!avatar ? (
              <span>Don't miss out&#8212;new avatars are en route!</span>
            ) : (
              <DynamicCollectability {...props} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
