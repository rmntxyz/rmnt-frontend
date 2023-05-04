import Link from "next/link";
import { useRouter } from "next/router";

export default function Toggle() {
  //Enable navigation between Eng and Kor
  const {
    query: { episodeNumber, webtoonId, language },
  } = useRouter();

  return (
    <div
      className={`rounded-full gradientBorder inline-flex items-center px-1.5 py-3 cursor-pointer text-base`}
    >
      <Link
        shallow
        href={`/webtoons/${webtoonId}/episode/${episodeNumber}/eng`}
      >
        <span
          className={`rounded-full px-4 py-2 ${
            language === "kor"
              ? "bg-transparent text-white/50"
              : "bg-white text-navBg"
          }`}
        >
          Eng
        </span>
      </Link>
      <Link
        shallow
        href={`/webtoons/${webtoonId}/episode/${episodeNumber}/kor`}
      >
        <span
          className={`rounded-full px-4 py-2 ${
            language === "kor"
              ? "bg-white text-navBg"
              : "bg-transparent text-white/50"
          }`}
        >
          Kor
        </span>
      </Link>
    </div>
  );
}
