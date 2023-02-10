export default function Benefits() {
  const content = [
    {
      title: "Own Avatar",
      desc: "Own a unique character from your favorite webtoon as your avatar. This is transferrable and resalable via blockchain.",
    },
    {
      title: "Collectible Giveaways",
      desc: "When the last episode is released, you will be in the raffle to receive an additional collectible item from the webtoon.",
    },
    {
      title: "Exclusive Community",
      desc: "You can access Rarement’s discord available only for creators and super fans.",
    },
    {
      title: "License",
      desc: "Avatar’s image that you own can be used commercially as long as the artwork is not modified. (see details)",
    },
    {
      title: "DAO membership",
      desc: "Participate in DAO projects to support webtoons and the webtoonists",
    },
  ];

  return (
    <div className="mt-7 flex flex-col gap-4">
      <div className="text-2xl font-bold">Benefits</div>
      <div className="grid grid-cols-2">
        {content.map((item, idx) => (
          <div
            key={idx}
            className={`h-fit ${
              idx % 2 === 0
                ? "mb-11 mr-2.5 gradientBorder-right"
                : "mt-11 ml-2.5 gradientBorder-left"
            } last:opacity-20`}
          >
            <div className="m-1.5 p-4 gradientBorder-2 flex flex-col gap-2 items-center justify-center text-center">
              <div className="font-bold">{item.title}</div>
              <div className="text-sm">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
