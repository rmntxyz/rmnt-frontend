import Image from "next/image";

export default function Artists({ artists }) {
  return (
    <div className="artists bg-opaqueGray">
      <div className="w-fit flex items-center gap-14 mx-auto">
        <div className="w-24 h-0.5 gradientBorder-straightLeft hidden sm:block"></div>
        <div className="grid grid-cols-3 gap-2 mx-auto max-w-[292px] py-12">
          {artists.map((artist, idx) =>
            artist.attributes.profile_image.data ? (
              <a
                key={idx}
                className="gradientBorder-3 w-[92px] h-[92px] rounded-full p-1.5"
              >
                <Image
                  src={artist.attributes.profile_image.data.attributes.url}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              </a>
            ) : null
          )}
        </div>{" "}
        <div className="w-24 h-0.5 gradientBorder-straightRight hidden sm:block"></div>
      </div>
    </div>
  );
}
