import { useEffect, useState } from "react";

export default function Timer({ nft }) {
  const undropped = nft.filter((item) => item.dropped === false);
  const lastUndropped = undropped[undropped.length - 1];
  const targetTime = lastUndropped.targetTime;

  const calculateTimeLeft = () => {
    const difference = new Date(targetTime).getTime() - new Date().getTime();
    let timeLeft = [];
    if (difference > 0) {
      return (timeLeft = [
        {
          unit: "Days",
          shortUnit: "Days",
          number: Math.floor(difference / (1000 * 60 * 60 * 24)),
        },
        {
          unit: "Hours",
          shortUnit: "Hr",
          number: Math.floor((difference / (1000 * 60 * 60)) % 24),
        },
        {
          unit: "Minutes",
          shortUnit: "Min",
          number: Math.floor((difference / 1000 / 60) % 60),
        },
        {
          unit: "Seconds",
          shortUnit: "Sec",
          number: Math.floor((difference / 1000) % 60),
        },
      ]);
    } else return null;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="flex flex-col justify-start mt-6 text-sm md:text-lg md:mt-8">
      {timeLeft ? (
        <div>
          <div>Drop begins in </div>
          <div className="flex items-center font-bold text-xl md:text-3xl">
            {timeLeft.map(({ unit, shortUnit, number }) => (
              <div key={unit} className="relative flex flex-row">
                <div className="flex flex-col items-center my-1 mr-3 md:mr-4 md:my-1.5">
                  <div className="w-12 h-14 flex items-center justify-center bg-lightBeige rounded md:w-16 md:h-20">
                    <div suppressHydrationWarning={true}>{number}</div>
                  </div>
                  <div className="invisible font-normal text-neutral-500 text-sm md:visible">
                    {unit}
                  </div>
                  <div className="absolute inset-x-auto bottom-0 text-xs font-normal text-neutral-500 md:invisible">
                    {shortUnit}
                  </div>
                </div>
                <div
                  className={`absolute inset-y-4 right-0.5 md:inset-y-6 md:right-1 ${
                    (unit === "Days") | (unit === "Seconds") &&
                    "text-transparent"
                  }`}
                >
                  :
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}