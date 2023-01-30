import Image from "next/image";

export default function Episode({ episode }) {
  const imageUrl = episode.page_image.data.attributes.url;
  const width = episode.page_image.data.attributes.width;
  const height = episode.page_image.data.attributes.height;

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
