export default function Collectors({ collectors }) {
  return (
    <div
      className={`${
        collectors && collectors.length
          ? "bg-white text-ourBlack"
          : "bg-ourBlack text-white"
      }`}
    >
      <div>Collectors</div>
      <div>
        By purchasing a limited edition NFT of the webtoon series, collectors
        can leave a comment.
      </div>
      <div
        className={`${
          collectors && collectors.length && "grid grid-cols-3 md:grid-cols-5"
        }`}
      >
        {collectors && collectors.length ? (
          collectors.map((collector, idx) => (
            <img
              key={idx}
              src={collector.profile}
              className="rounded-full w-8 h-8 md:w-10 md:h-10"
            />
          ))
        ) : (
          <div>:) Be the special backer!</div>
        )}
      </div>
    </div>
  );
}
