
const aboutData = [
  {
    title: "Merge with webtoon",
    desc: "RMNT is taking the traditional cartoon experience to the next level by engaging more directly with the webtoon and the artists. On top of reading webtoon right from the RMNT site, soon NFT holders will be able to leave comments directly on the webtoon and vote on some of the key decisions the artist needs help with. ",
  },
  {
    title: "Own the rare moment",
    desc: "Each webtoon series will host carefully selected art NFTs that are more than just jpeg files. It could be owning your favorite scene of the webtoon or collecting your favorite character—it is like making a scrapbook full of pages cut out from comic books and magazines, instead now you are showing it off to the world. ",
  },
  {
    title: "Build a community together",
    desc: "This is where artists and fans can openly engage on anything and everything related to webtoons—including but not limited to AMAs, live drawing shows, on/offline events, fan arts, and more! The opportunities are limitless—if the community wants it, it will happen. ",
  },
];

export default function About() {
  return (
    <div className="py-20 px-8 bg-lightBeige flex items-center justify-center sm:py-36">
      <div className="container sm:px-6">
        <div className="flex flex-col lg:flex-row">
          <div className="pb-6 text-darkBeige text-2xl font-extrabold sm:text-6xl sm:pb-16 lg:pr-8  lg:w-1/2">
            What is RMNT?
          </div>
          <div className="lg:w-1/2">
            {aboutData.map((item, index) => (
              <div>
                <div key={index} className="pb-11 sm:pb-14">
                  <div className="font-bold text-base text-darkBeige sm:text-2xl">
                    {item.title}
                  </div>
                  <div className="text-sm text-ourBlack sm:text-lg">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-px bg-darkBeige"></div>
        <div className="flex pt-6 sm:pt-12">
          <div className="lg:w-1/2"></div>
          <div className="w-full flex flex-col items-start sm:flex-row sm:items-center sm:justify-between lg:w-1/2">
            <div className="my-2 text-xl font-extrabold text-ourBlack sm:text-3xl">
              Wanna join the team?
            </div>
            <button className="inline-block px-6 py-2 my-2 text-sm font-bold border-2 border-ourBlack text-ourBlack leading-tight rounded-3xl transition duration-150 ease-in-out sm:text-base hover:bg-ourBlack hover:text-white">
              Apply!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
