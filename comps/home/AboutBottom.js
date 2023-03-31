export default function AboutBottom() {
  return (
    <div className="relative max-w-[336px] py-14 mx-auto text-center flex flex-col gap-3">
      <div className="text-3xl text-mintGreen font-bold">
        Build a webtoon community TOGETHER!
      </div>
      <div className="text-lg">
        <span>
          Rarement's mission is to build a community of webtoon lovers, where
          the creators and the fans can collectively build a new webtoon
          community.
        </span>
        {/* {" "}<span className="text-mintGreen">
          Join us in building the new webtoon community!
        </span> */}
      </div>
      <div className="absolute -top-[12%] -left-[15%] w-[75%] aspect-square bg-mintGreen/[.17] blur-[137px]"></div>
    </div>
  );
}
