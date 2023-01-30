import Image from "next/image";

export default function Cover({ webtoon }) {
  return (
    <div id="scrollableElement" className="relative">
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
      <div className="absolute bottom-0 h-2/5 w-full bg-gradient-to-t from-navBg"></div>
    </div>
  );
}
