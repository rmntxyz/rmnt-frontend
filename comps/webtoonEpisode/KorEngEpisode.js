import Image from "next/image";

export default function KorEngEpisode({ props }) {
  return (
    <div>
      <Image
        id="episode"
        alt="Rarement Webtoon Image"
        src={props.imageUrl}
        width={props.width}
        height={props.height}
        layout="responsive"
        objectFit="cover"
        placeholder="blur"
        blurDataURL={props.imageUrl}
        // loading="lazy"
        priority={true}
        // quality={100}
        unoptimized
      />
    </div>
  );
}
