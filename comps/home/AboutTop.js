import Image from "next/legacy/image";

export default function AboutTop() {
  return (
    <div className="max-w-[336px] py-14 mx-auto text-center flex flex-col gap-14">
      <div className="flex flex-col gap-3">
        <div className="font-bold text-2xl flex flex-col">
          <span>Introducing Rarement,</span>
          <span>the webtoon universe</span>
        </div>
        <div>
          We are building Rarement, a space for you to immerse in webtoon world
          and expand the possibilities together.
        </div>
      </div>
      <Image
        src="/about.png"
        width={336}
        height={336}
        placeholder="blur"
        blurDataURL="/aboutImage.png"
        alt="Rarement Image"
      />
      <div className="flex flex-col gap-3">
        <div className="font-bold text-2xl">Collect & Support Your Artist</div>
        <div>
          Showing your love for webtoon goes beyond just reading them with
          Rarement&#8212;collect avatars of the webtoon characters you love and
          enjoy other exclusive benefits that connect you closer to the webtoon.
        </div>
      </div>
    </div>
  );
}
