import Image from "next/image";

export default function AboutTop() {
  return (
    <div className="max-w-[336px] py-14 mx-auto text-center flex flex-col gap-14">
      <div className="flex flex-col gap-3">
        <div className="font-bold text-2xl">
          Introducing Rarement, the webtoon universe
        </div>
        <div>
          We built Rarement to provide a limitless space for webtoonists and
          their fans through the blockchain technology.
        </div>
      </div>
      <Image
        src="/레어먼트_홈피이미지001(1) 1@3x.png"
        width={336}
        height={336}
        alt="Rarement Image"
      />
      <div className="flex flex-col gap-3">
        <div className="font-bold text-2xl">Collect & Support Your Artist</div>
        <div>
          Fall in love with webtoon and collect avatars from webtoon characters
          you love. Enjoy webtoon and other exclusive benefits soon to be
          revealed.
        </div>
      </div>
    </div>
  );
}
