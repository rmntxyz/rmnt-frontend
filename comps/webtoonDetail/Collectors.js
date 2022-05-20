export default function Collectors({ collectors }) {
  return (
    <div
      className={`${
        collectors && collectors.length
          ? "bg-white text-ourBlack"
          : "bg-darkGray text-white"
      }  border-2 border-mediumGray flex flex-col p-6 md:p-8`}
    >
      <div className="font-bold mb-3 md:text-2xl md:mb-4">Collectors</div>
      <div className="text-sm mb-6 md:text-lg md:mb-8">
        By purchasing a limited edition NFT of the webtoon series, collectors
        can leave a comment.
      </div>
      <div
        className={`${
          collectors && collectors.length && "grid grid-cols-3 gap-x-5 gap-y-3 sm:grid-cols-5"
        }`}
      >
        {collectors && collectors.length ? (
          collectors.map((collector, idx) => (
            <img
              key={idx}
              src={collector.profile}
              className="rounded-full col-span-1"
            />
          ))
        ) : (
          <div>
            <div className="h-px w-full bg-[#3A3A3A]"></div>
          <div className="mt-6 font-bold md:text-xl md:mt-8">:) Be the special backer!</div>
          </div>
        )}
      </div>
    </div>
  );
}