import Image from "next/image";

export default function KorEpisode({ episode }) {
  const imageUrl = episode.kor_image.data.attributes.url;
  const width = episode.kor_image.data.attributes.width;
  const height = episode.kor_image.data.attributes.height;

  return (
    <div>
      <Image
        id="episode"
        alt="Rarement Webtoon Image"
        src={imageUrl}
        width={width}
        height={height}
        layout="responsive"
        objectFit="cover"
        placeholder="blur"
        blurDataURL={imageUrl}
        // loading="lazy"
        priority={true}
        quality={100}
      />
    </div>
  );
}
