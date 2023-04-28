import Image from "next/image";

export default function KorEngEpisode({ data }) {
  return (
    <div id="scrollableElement">
      {data.map((item, idx) => {
        return (
          <Image
            key={idx}
            alt="Rarement Webtoon Image"
            src={item.attributes.url}
            width={768}
            height={768 * (item.attributes.height / item.attributes.width)}
            placeholder="blur"
            blurDataURL={item.attributes.url}
            priority={idx === 0 ? true : false}
            loading={idx === 0 ? "eager" : "lazy"}
            // unoptimized
          />
        );
      })}
    </div>
  );
}
