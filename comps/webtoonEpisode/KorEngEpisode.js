import Image from "next/image";

export default function KorEngEpisode({ data }) {
  return (
    <div id="episode">
      {data.map((item) => {
        return (
          <Image
            alt="Rarement Webtoon Image"
            src={item.attributes.url}
            width={768}
            height={768 * (item.attributes.height / item.attributes.width)}
            layout="responsive"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={item.attributes.url}
            // loading="lazy"
            // unoptimized
          />
        );
      })}
    </div>
  );
}
