import Image from "next/image";

export default function WebtoonTab({ webtoon, episodes }) {
  return (
    <div className="mx-8 my-8 flex flex-col gap-8">
      <div className="relative w-fit">
        <span className="text-3xl font-bold">{webtoon.attributes.title}</span>
        <div className="bg-mintGreen/20 absolute h-1/2 w-full bottom-0"></div>
      </div>
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
        {episodes.map((item, idx) => (
          <a
            key={idx}
            href={
              "/webtoons/" +
              webtoon.attributes.webtoon_id +
              "/episode/" +
              item.attributes.episode_number
            }
            className="pb-8"
          >
            <Image
              src={webtoon.attributes.cover_image.data.attributes.url}
              width={768}
              height={768}
              placeholder="blur"
              blurDataURL={webtoon.attributes.cover_image.data.attributes.url}
              layout="responsive"
              objectFit="cover"
              alt="Rarement Webtoon Cover Image"
              className="rounded"
            />
            <div className="w-fit font-bold text-sm mt-[18px] px-2 py-0.5 bg-opaqueGray rounded-xl">
              Ep.{item.attributes.episode_number}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
