import Image from "next/image";

const aboutData = [
  {
    src: "/Screen Shot 2022-07-07 at 3.38.png",
    title: "Introducing the Webtoonists",
    desc: [
      "Most Webtoonists active on Instagram have full-time jobs, the average Joes and Janes around us. But that does not mean their talents are also ordinary. ",
      "RMNT has carefully curated this group of amazing webtoonists for you to fall in love with - join their unique world of creations and help them dream bigger and achieve even greater things!",
    ],
  },
  {
    src: "/Screen Shot 2022-07-23 at 1.28.png",
    title: "Own the rare moment",
    desc: [
      "The webtoonists introduce webtoon-inspired artworks through RMNT NFT.",
      "Webtoon fans (aka YOU!) mint the unique artwork, owning the rare moment from webtoons and also becoming a patron & early investors of the webtoons and the webtoonists.",
      "Stay “tooned” for more features RMNT plans to introduce for NFT holders!",
    ],
  },
];

export default function About({ users }) {
  return (
    <div>
      <div className="py-20 px-8 bg-lightBeige flex items-center justify-center md:py-36">
        <div className="container mx-auto grid grid-cols-1 justify-items-stretch gap-16 md:px-6 lg:px-12 xl:max-w-[1280px] 2xl:max-w-[1380px]">
          {aboutData.map((item) => (
            <div className="flex flex-col max-w-[916px] justify-self-end odd:justify-self-start gap-8 md:grid md:grid-cols-2 md:gap-[52px]">
              <div className="p-5 border-2 border-ourBlack bg-white rounded-md">
                <Image
                  alt="Rarement Webtoone Page Image"
                  src={item.src}
                  width={402}
                  height={402}
                  layout="responsive"
                />
              </div>
              <div className="flex flex-col gap-4 justify-center">
                <div className="font-extrabold text-2xl md:text-[32px]">
                  {item.title}
                </div>
                {item.desc.map((descItem) => (
                  <ul
                    className={`flex flex-col gap-4 text-justify list-disc ${
                      item.desc.length === 2 && "list-none"
                    }`}
                  >
                    <li>{descItem}</li>
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="py-20 px-8 bg-mediumBeige flex items-center justify-center md:py-36">
        <div className="container mx-auto grid grid-cols-1 justify-items-stretch gap-16 md:px-6 lg:px-12 xl:max-w-[1280px] 2xl:max-w-[1380px]">
          <div>Build a webtoon community TOGETHER!</div>
        </div>
      </div> */}
    </div>
  );
}

// const aboutData = [
//   {
//     title: "Merge with webtoon",
//     desc: "RMNT is taking the traditional cartoon experience to the next level by engaging more directly with the webtoon and the artists. On top of reading webtoon right from the RMNT site, soon NFT holders will be able to leave comments directly on the webtoon and vote on some of the key decisions the artist needs help with. ",
//   },
//   {
//     title: "Own the rare moment",
//     desc: "Each webtoon series will host carefully selected art NFTs that are more than just jpeg files. It could be owning your favorite scene of the webtoon or collecting your favorite character—it is like making a scrapbook full of pages cut out from comic books and magazines, instead now you are showing it off to the world. ",
//   },
//   {
//     title: "Build a community together",
//     desc: "This is where artists and fans can openly engage on anything and everything related to webtoons—including but not limited to AMAs, live drawing shows, on/offline events, fan arts, and more! The opportunities are limitless—if the community wants it, it will happen. ",
//   },
// ];

// export default function About() {
//   return (
//     <div className="py-20 px-8 bg-lightBeige flex items-center justify-center md:py-36">
//       <div className="container md:px-6 lg:px-12">
//         <div className="mx-auto flex flex-col lg:flex-row">
//           <div className="pb-6 text-darkBeige text-[21px] font-extrabold md:text-[32px] md:pb-16 lg:pr-20 lg:w-1/2 lg:flex lg:justify-end">
//             <span> What is RMNT?</span>
//           </div>
//           <div className="lg:w-1/2">
//             {aboutData.map((item, idx) => (
//               <div key={idx} className="pb-11 md:pb-14">
//                 <div className="font-bold text-[17px] text-darkBeige md:text-lg">
//                   {item.title}
//                 </div>
//                 <div className="text-sm text-ourBlack md:text-base">
//                   {item.desc}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="w-full h-px bg-darkBeige"></div>
//         <div className="flex pt-6 md:pt-12">
//           <div className="lg:w-1/2"></div>
//           <div className="w-full flex flex-col items-start md:flex-row md:items-center md:justify-between lg:w-1/2">
//             <div className="my-2 text-xl font-extrabold text-ourBlack md:text-2xl">
//               Wanna join the team?
//             </div>
//             <a
//               href="/"
//               className="px-6 py-2 my-2 text-sm font-bold border-2 border-ourBlack text-ourBlack leading-tight rounded-3xl duration-200 md:text-base hover:bg-ourBlack hover:text-white"
//             >
//               Apply!
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
