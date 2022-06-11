export default function Collectors({ collectors, users }) {
  return (
    <div>
      {collectors.length > 0 ? (
        <div className="text-xs mt-3.5 md:mt-4 md:text-sm">
          Collectors
          <div className="flex gap-3">
            <div className="w-1/2 grid grid-cols-5">
              {collectors.filter(
                (collector, index) => collectors.indexOf(collector) === index
              ).length > 5
                ? collectors
                    .filter(
                      (collector, index) =>
                        collectors.indexOf(collector) === index
                    )
                    .slice(0, 5)
                    .map((uniqueCollector) =>
                      users.find((user) => user.id === uniqueCollector)
                    )
                    .map((user) => (
                      <div
                        key={user.id}
                        className="group relative hover:cursor-pointer"
                      >
                        <img
                          src={user.profile_picture}
                          className="rounded-full border-2 border-white min-w-[28px] md:min-w-[36px] lg:min-w-[32px]"
                        ></img>
                        <div className="opacity-0 transition-opacity absolute text-[#555555] group-hover:opacity-100">
                          id: {user.id}
                        </div>
                      </div>
                    ))
                : collectors
                    .filter(
                      (collector, index) =>
                        collectors.indexOf(collector) === index
                    )
                    .map((uniqueCollector) =>
                      users.find((user) => user.id === uniqueCollector)
                    )
                    .map((user) => (
                      <div
                        key={user.id}
                        className="group relative hover:cursor-pointer"
                      >
                        <img
                          src={user.profile_picture}
                          className="rounded-full border-2 border-white min-w-[28px] md:min-w-[36px] lg:min-w-[32px]"
                        ></img>
                        <div className="opacity-0 transition-opacity absolute text-[#555555] group-hover:opacity-100">
                          id: {user.id}
                        </div>
                      </div>
                    ))}
            </div>
            {collectors.filter(
              (collector, index) => collectors.indexOf(collector) === index
            ).length > 5 ? (
              <button className="text-xs text-[#555555] hover:underline md:text-sm">
                view all
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
