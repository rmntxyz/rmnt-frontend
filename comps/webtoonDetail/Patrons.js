import Image from "next/image";

export default function Patrons({ uniqueUsers, webtoon }) {
  return (
    <div className="mt-7 flex flex-col">
      <div className="text-2xl font-bold">Patrons</div>
      <div className="mt-3">
        The order of the patrons' list is determined by time of support.
      </div>
      <div className="w-full h-px my-6 bg-white/10"></div>
      <div className="grid grid-cols-2 gap-8 font-bold">
        {uniqueUsers && uniqueUsers.length ? (
          uniqueUsers.map((user, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span
                className="py-1 px-2.5 bg-opaqueGray rounded"
                style={{ color: idx < 3 ? "#70EFCF" : "white" }}
              >
                {idx + 1}
              </span>
              <Image
                src={webtoon.attributes.cover_image.data.attributes.url}
                width={52}
                height={52}
                className="rounded-full"
              />
              <span className="truncate">{user.attributes.wallet_address}</span>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
