import Image from "next/image";
import Link from "next/link";
import useDate from "../../utils/useDate";

export default function WebtoonTab({ webtoon, episodes }) {
  let released;
  let releasedAt;
  return (
    <div className="mx-8 mt-8 mb-20 flex flex-col gap-8">
      <div className="relative w-fit">
        <span className="text-3xl font-bold">{webtoon.attributes.title}</span>
        <div className="bg-mintGreen/20 absolute h-1/2 w-full bottom-0"></div>
      </div>
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
        {episodes.map(
          (item, idx) => (
            (releasedAt = useDate(item.attributes.released_timestamp)),
            (released =
              new Date().getTime() > item.attributes.released_timestamp * 1000),
            (
              <div key={idx} className="pb-8">
                <div className="relative">
                  <Link
                    href={
                      "/webtoons/" +
                      webtoon.attributes.webtoon_id +
                      "/episode/" +
                      item.attributes.episode_number +
                      "/eng"
                    }
                    aria-label="View Rarement Webtoon Episode"
                  >
                    <Image
                      src={item.attributes.thumbnail.data.attributes.url}
                      width={768}
                      height={768}
                      placeholder="blur"
                      blurDataURL={
                        item.attributes.thumbnail.data.attributes.url
                      }
                      alt="Rarement Webtoon Cover Image"
                      className="rounded relative"
                    />
                  </Link>
                  {released ? null : (
                    <div className="absolute bg-navBg/50 w-full h-full top-0 z-10"></div>
                  )}
                </div>
                {released ? (
                  <div className="mt-[18px] flex items-center gap-1.5">
                    <div className="w-fit font-bold text-sm px-2 py-0.5 bg-opaqueGray rounded-xl">
                      Ep.{item.attributes.episode_number}
                    </div>
                    <div>
                      {releasedAt.month}/{releasedAt.date}/{releasedAt.year}
                    </div>
                  </div>
                ) : (
                  <div className="gradientBorder mt-[18px] w-fit font-bold text-sm px-2 py-0.5 rounded-xl">
                    D-
                    {releasedAt.daysFromNow >= 1
                      ? releasedAt.daysFromNow
                      : "Day"}
                  </div>
                )}
              </div>
            )
          )
        )}
      </div>
      {episodes.length === 0 && (
        <div className="text-lg mb-8">
          Hold up&#8212;the first episode is right around the corner.
        </div>
      )}
    </div>
  );
}
