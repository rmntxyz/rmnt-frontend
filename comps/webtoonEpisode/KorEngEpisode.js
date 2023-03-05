import Image from "next/image";

export default function KorEngEpisode({ data }) {
  let imageUrl;
  let imageWidth;
  let imageHeight;
  let imageRatio;
  return (
    <div id="episode">
      {data.map((item) => {
        imageUrl = item.attributes.url;
        imageWidth = item.attributes.width;
        imageHeight = item.attributes.height;
        imageRatio = imageHeight / imageWidth;
        return (
          <Image
            alt="Rarement Webtoon Image"
            src={imageUrl}
            width={768}
            height={768 * imageRatio}
            layout="responsive"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={imageUrl}
            loading="lazy"
            // unoptimized
          />
        );
      })}
    </div>
  );
}
