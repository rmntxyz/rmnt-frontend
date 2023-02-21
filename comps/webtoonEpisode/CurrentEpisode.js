import Image from "next/image";

export default function CurrentEpisode({ episode }) {
  const imageUrl = episode.image.data.attributes.url;
  const width = episode.image.data.attributes.width;
  const height = episode.image.data.attributes.height;

  return (
    <div>
      <Image
        id="episode"
        alt="Rarement NFT Image"
        src={imageUrl}
        width={width}
        height={height}
        layout="responsive"
        objectFit="cover"
        placeholder="blur"
        blurDataURL={imageUrl}
      />
    </div>
  );
}
