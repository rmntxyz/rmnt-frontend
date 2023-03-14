import Image from "next/image";

export default function Webtoons({ webtoons }) {
  return (
    <div className="my-14 mx-8 max-w-[630px] md:mx-auto">
      <div className="text-2xl font-bold mb-4">Webtoons</div>
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
        {webtoons.map((item, idx) => (
          <a
            key={idx}
            href={"/webtoons/" + item.attributes.webtoon_id + "/webtoon#main"}
          >
            <Image
              src={item.attributes.cover_image.data.attributes.url}
              width={768}
              height={768}
              placeholder="blur"
              blurDataURL={item.attributes.cover_image.data.attributes.url}
              alt="Rarement Webtoon Cover Image"
              className="rounded"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
