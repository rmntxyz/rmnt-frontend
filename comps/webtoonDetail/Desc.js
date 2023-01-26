import Image from "next/image";
import { useState } from "react";
import ProjectTab from "./ProjectTab";
import WebtoonTab from "./WebtoonTab";

export default function Desc({ webtoon, users, NFTs, exchangeRate, episodes }) {
  //Enable navigation between Project, Webtoon, Collection tabs
  const [openTab, setOpenTab] = useState(1);
  return (
    <div>
      <div className="relative">
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
      <div>
        <ul className="relative flex gap-4 md:gap-6 2xl:max-w-[90%]">
          <li className="ml-4">
            <button
              className={`text-lg md:text-2xl py-4 px-[18px] md:px-6
                  ${openTab === 1 ? "font-bold" : "text-white/50"}`}
              onClick={(e) => {
                setOpenTab(1);
              }}
              aria-label="View Project"
            >
              Project
            </button>
            <div
              className={`w-full h-[3px] bg-white rounded-sm  ${
                openTab === 1 ? "visible" : "invisible"
              }`}
            ></div>
          </li>
          <li>
            <button
              className={`text-lg md:text-2xl py-4 px-[18px] md:px-6
               ${openTab === 2 ? "font-bold" : "text-white/50"}`}
              onClick={(e) => {
                setOpenTab(2);
              }}
              aria-label="View Webtoon"
            >
              Webtoon
            </button>
            <div
              className={`w-full h-[3px] bg-white rounded-sm  ${
                openTab === 2 ? "visible" : "invisible"
              }`}
            ></div>
          </li>
          <li>
            <button
              className={`text-lg md:text-2xl py-4 px-[18px] md:px-6
               ${openTab === 3 ? "font-bold" : "text-white/50"}`}
              onClick={(e) => {
                setOpenTab(3);
              }}
              aria-label="View Collectibles"
            >
              Collectibles
            </button>
            <div
              className={`w-full h-[3px] bg-white rounded-sm  ${
                openTab === 3 ? "visible" : "invisible"
              }`}
            ></div>
          </li>
          <div className="absolute bottom-0 w-full h-px bg-black/10"></div>
        </ul>
        <div>
          <div className={openTab === 1 ? "block" : "hidden"}>
            <ProjectTab item={webtoon} user={users} />
          </div>
          <div className={openTab === 2 ? "block" : "hidden"}>
            <WebtoonTab episodes={episodes} webtoon={webtoon} />
          </div>
        </div>
      </div>
    </div>
  );
}
