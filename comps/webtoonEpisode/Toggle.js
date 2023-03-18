import Link from "next/link";
import { useRouter } from "next/router";

export default function Toggle() {
  //Enable navigation between Eng and Kor
  const {
    query: { episodeNumber, webtoonId, language },
  } = useRouter();

  return (
    <div className="rounded-full gradientBorder inline-flex items-center p-1.5 cursor-pointer text-base">
      <Link
        shallow
        href={`/webtoons/${webtoonId}/episode/${episodeNumber}/eng`}
      >
        <span
          className={`rounded-full px-[18px] py-[6.5px] ${
            language === "kor"
              ? "bg-transparent text-white/50"
              : "bg-white text-navBg"
          }`}
          // onClick={handlekorClick}
        >
          Eng
        </span>
      </Link>
      <Link
        shallow
        href={`/webtoons/${webtoonId}/episode/${episodeNumber}/kor`}
      >
        <span
          className={`rounded-full px-[18px] py-[6.5px] ${
            language === "kor"
              ? "bg-white text-navBg"
              : "bg-transparent text-white/50"
          }`}
          // onClick={handleKorClick}
        >
          Kor
        </span>
      </Link>
    </div>
  );
}
