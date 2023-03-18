export default function Benefits({ benefits }) {
  return (
    <div className="mt-7 flex flex-col gap-4">
      <div className="text-2xl font-bold">Benefits</div>
      <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-0">
        {benefits.map((item, idx) => (
          <div
            key={idx}
            className={`h-fit ${
              idx % 2 === 0
                ? "gradientBorder-right sm:mb-11 sm:mr-2.5"
                : "gradientBorder-left sm:mt-11 sm:ml-2.5"
            } ${item.attributes.active ? "opacity-100" : "opacity-20"}`}
          >
            <div className="m-1.5 p-4 gradientBorder-2 flex flex-col gap-2 items-center justify-center text-center">
              <div className="font-bold">{item.attributes.name}</div>
              <div className="text-sm">{item.attributes.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
