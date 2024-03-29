import Image from "next/image";
import Link from "next/link";

export default function Webtoons({ webtoons }) {
  let released;
  return (
    <div className="mt-14 mb-20 mx-8 max-w-[630px] md:mx-auto">
      <div className="text-2xl font-bold mb-4">Webtoons</div>
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
        {webtoons.map(
          (item, idx) => (
            (released =
              item.attributes.rarement?.data?.attributes &&
              Date.now() >
                item.attributes.rarement.data.attributes.startTime * 1000),
            (
              <div key={idx} className="relative">
                <Link
                  href={
                    "/webtoons/" + item.attributes.webtoon_id + "/webtoon#main"
                  }
                >
                  <Image
                    src={item.attributes.cover_image.data.attributes.url}
                    width={768}
                    height={768}
                    placeholder="blur"
                    blurDataURL={
                      item.attributes.cover_image.data.attributes.url
                    }
                    alt="Rarement Webtoon Cover Image"
                    className="rounded"
                  />
                </Link>
                {released ? null : (
                  <div className="absolute bg-navBg/50 w-full h-full top-0 z-10 flex items-center justify-center text-white/100 text-xl font-bold">
                    Coming soon
                  </div>
                )}
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}
