import Image from "next/image";

export default function EngEpisode({ episode }) {
  const imageUrl = episode.eng_image.data.attributes.url;
  const width = episode.eng_image.data.attributes.width;
  const height = episode.eng_image.data.attributes.height;

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
