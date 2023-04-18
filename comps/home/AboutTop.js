import Image from "next/legacy/image";

export default function AboutTop() {
  return (
    <div className="relative max-w-[336px] py-14 mx-auto text-center flex flex-col gap-14">
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
        src="/레어먼트_홈피이미지001(1) 1@3x.png"
        width={336}
        height={336}
        placeholder="blur"
        blurDataURL="/레어먼트_홈피이미지001(1) 1@3x.png"
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
      <div className="absolute top-[13%] left-1/2 w-[137%] aspect-square rounded-full bg-mintGreen/[.13] blur-[137px]"></div>
      <div className="absolute bottom-[6%] -left-[58%] w-[75%] aspect-square rounded-full bg-mintGreen/[.06] blur-[77px]"></div>
    </div>
  );
}
