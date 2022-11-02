import Image from "next/image";

export default function AboutBottom({ artists }) {
  return (
    <div className="py-20 px-8 bg-mediumBeige flex items-center justify-center md:py-36">
      <div className="container mx-auto grid grid-cols-1 justify-items-center text-center max-w-[799px] gap-12 md:gap-16  md:px-6 lg:px-12">
        <div className="stroke text-white text-3xl font-extrabold md:text-5xl">
          Build a webtoon community TOGETHER!
        </div>
        <div className="bg-darkGray h-0.5 w-24 sm:w-36"></div>
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 ">
            {artists.map((artist, idx) =>
              artist.attributes.profile_image.data ? (
                <a
                  href={"/artists/" + artist.id}
                  key={idx}
                  className="relative rounded-full overflow-hidden border-ourBlack border-2 w-16 h-16 md:w-[74px] md:h-[74px]"
                >
                  <Image
                    src={artist.attributes.profile_image.data.attributes.url}
                    layout="fill"
                    objectFit="contain"
                    alt="Rarement Artist Profile Image"
                    className="rounded-full"
                  />
                </a>
              ) : null
            )}
          </div>
          <div className="text-base mt-12 md:mt-9 md:text-lg">
            Rarement’s mission is to build a webtoon community where webtoonists
            and fans can own the moment they collectively built together.
            <br></br> This will be done via active discussions and participation
            opportunities in Discord, Rarement DAO, on/off-line events, and more
            to come.
          </div>
          <div className="text-xl font-bold mt-12 md:mt-9 md:text-2xl">
            Interested in joining Rarement as a webtoonist? Then{" "}
            <button className="inline-block bg-white font-extrabold text-base rounded-full border-ourBlack border-[1px] px-7 py-1.5 md:px-8 md:py-2.5 hover:text-white hover:bg-ourBlack">
              Apply
            </button>{" "}
            to join the waitlist, and we will contact you!
          </div>
        </div>
      </div>
    </div>
  );
}
