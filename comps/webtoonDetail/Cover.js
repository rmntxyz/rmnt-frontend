import Image from "next/image";

export default function Cover({ webtoon }) {
  return (
    <div id="cover" className="relative overflow-hidden">
      <Image
        src={webtoon.attributes.cover_image.data.attributes.url}
        width={630}
        height={630}
        placeholder="blur"
        blurDataURL={webtoon.attributes.cover_image.data.attributes.url}
        alt="Rarement Webtoon Cover Image"
        priority={true}
      />
      <div className="absolute -bottom-1 -left-10 h-2/5 w-[110%] bg-gradient-to-t from-navBg"></div>
    </div>
  );
}
