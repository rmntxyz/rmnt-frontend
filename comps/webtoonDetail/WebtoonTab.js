import Image from "next/image";

export default function WebtoonTab({ webtoon, episodes }) {
  return (
    <div>
      <div>{webtoon.attributes.title}</div>
      <div className="grid grid-cols-3 gap-3.5">
        {episodes.map((item, idx) => (
          <a key={idx} href={"/webtoons/episode/" + item.id}>
            <Image
              src={webtoon.attributes.cover_image.data.attributes.url}
              width={768}
              height={768}
              placeholder="blur"
              blurDataURL={webtoon.attributes.cover_image.data.attributes.url}
              layout="responsive"
              objectFit="cover"
              alt="Rarement Webtoon Cover Image"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
