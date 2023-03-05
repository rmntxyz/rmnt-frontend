import Image from "next/image";

export default function KorEngEpisode({ props }) {
  const imageRatio = props.height / props.width;
  return (
    <div>
      <Image
        id="episode"
        alt="Rarement Webtoon Image"
        src={props.imageUrl}
        width={768}
        height={768 * imageRatio}
        layout="responsive"
        objectFit="cover"
        placeholder="blur"
        blurDataURL={props.imageUrl}
        // loading="lazy"
        // priority={true}
        // quality={100}
        unoptimized
      />
    </div>
  );
}
