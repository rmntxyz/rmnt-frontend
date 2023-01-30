import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import hideOnScroll from "../../utils/hideOrPaint";
import { SmallLogo } from "../../utils/svgs";

export default function Nav({ episode, webtoon }) {
  //Use router to enable navigation
  const router = useRouter();

  return (
    <nav
      id="navbar"
      className="fixed z-10 w-full bg-navBg h-20 pl-8 text-2xl font-bold flex justify-between items-center duration-200"
    >
      <FontAwesomeIcon
        icon={faArrowLeft}
        onClick={() => router.back()}
        className="cursor-pointer"
      />
      <div className="flex gap-6">
        <span className="text-lg py-1 px-3.5 rounded-3xl bg-mainBg drop-shadow-[4px_5px_10px_rgba(0, 0, 0, 0.1)]">
          Ep.{episode.page_number}
        </span>
        <a href={"/webtoons/" + webtoon.id}>
          <span>{webtoon.attributes.title}</span>
        </a>
      </div>
      <Link href="/" passHref>
        <a>
          <SmallLogo />
        </a>
      </Link>
    </nav>
  );
}
