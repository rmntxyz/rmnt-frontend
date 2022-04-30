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
    <div className="py-20 px-14 bg-lightBeige flex items-center justify-center md:py-36">
      <div className="container">
        <div className="flex flex-col md:flex-row">
          <div className="pb-6 text-darkBeige text-2xl font-extrabold md:w-1/2 md:text-6xl md:pr-8">
            What is RMNT?
          </div>
          <div className="md:w-1/2">
            {aboutData.map((item, index) => (
              <div>
                <div key={index} className="pb-6 md:pb-14">
                  <div className="font-bold text-base md:text-2xl">
                    {item.title}
                  </div>
                  <div className="text-sm md:text-lg">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-px bg-darkBeige"></div>
        <div className="flex pt-3 md:pt-12">
          <div className="md:w-1/2"></div>
          <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between md:w-1/2">
            <div className="my-2 text-xl font-extrabold text-darkBeige md:text-3xl">
              Wanna join the team?
            </div>
            <button className="inline-block px-6 py-2 my-2 text-sm font-bold bg-darkBeige text-white leading-tight rounded-3xl transition duration-150 ease-in-out md:text-base hover:drop-shadow-rmnt">
              Apply!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
