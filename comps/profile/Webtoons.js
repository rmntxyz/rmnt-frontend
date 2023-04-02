import Image from "next/image";

export default function Webtoons({ webtoons }) {
  let released;
  return (
    <div className="my-14 mx-8 max-w-[630px] md:mx-auto">
      <div className="text-2xl font-bold mb-4">Webtoons</div>
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
        {webtoons.map(
          (item, idx) => (
            (released =
              new Date().getTime() > item.attributes.released_timestamp * 1000),
            (
              <div key={idx} className="relative">
                <a
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
                </a>
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
