import Image from "next/image";
import Link from "next/link";

export default function Artists({ artists }) {
  const artistNumber = artists.length;
  return (
    <div className="artists bg-opaqueGray">
      <div className="w-fit flex items-center gap-14 mx-auto">
        <div className="w-24 h-0.5 gradientBorder-straightLeft hidden sm:block"></div>
        <div className="grid grid-cols-3 gap-2 mx-auto max-w-[292px] py-12">
          {artists.map((artist, idx) =>
            artist.attributes.profile_image.data ? (
              <Link
                key={idx}
                href={"/artists/" + artist.attributes.first_name}
                className="gradientBorder-3 w-[92px] h-[92px] rounded-full p-1.5"
              >
                <Image
                  src={artist.attributes.profile_image.data.attributes.url}
                  width={80}
                  height={80}
                  alt="Rarement Artist Profile Image"
                  className="rounded-full"
                />
              </Link>
            ) : null
          )}
          {artistNumber < 6 && artistNumber % 3 !== 0 ? (
            <div className="relative">
              <div className="gradientBorder-3 w-[92px] h-[92px] rounded-full p-1.5 flex items-center justify-center opacity-20">
                <div className="w-20 h-20 rounded-full bg-white flex justify-center items-center"></div>
              </div>
              <span className="absolute max-w-[46px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center">
                Who's next?
              </span>
            </div>
          ) : null}
        </div>
        <div className="w-24 h-0.5 gradientBorder-straightRight hidden sm:block"></div>
      </div>
    </div>
  );
}
