import { useEffect, useState } from "react";

export default function DetailTimer({ timeRemaining }) {
  const [endTime, setEndTime] = useState(new Date().getTime() + timeRemaining);

  const calculateTimeLeft = () => {
    let timeLeft = [];
    let remaining = endTime - new Date().getTime();
    if (remaining > 0) {
      return (timeLeft = [
        {
          unit: "d",
          number: Math.floor(remaining / (1000 * 60 * 60 * 24)),
        },
        {
          unit: "h",
          number: Math.floor((remaining / (1000 * 60 * 60)) % 24),
        },
        {
          unit: "m",
          number: Math.floor((remaining / 1000 / 60) % 60),
        },
        {
          unit: "s",
          number: Math.floor((remaining / 1000) % 60),
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
    <div>
      {timeLeft ? (
        <div className="flex flex-col  gap-1.5 md:flex-row md:gap-4">
          <div className="text-[19px] md:text-[32px]">Drop begins in</div>
          <div className="flex font-bold text-sm md:text-xl">
            {timeLeft.map(({ unit, number }) => (
              <div key={unit} className="relative flex flex-row">
                <div
                  className={`flex flex-col mr-2 md:mr-3 ${
                    unit === "s" && "mr-0 md:mr-0"
                  }`}
                >
                  <div className="w-9 h-7 flex justify-center items-center bg-white rounded md:h-12 md:w-16">
                    <div suppressHydrationWarning={true}>
                      {number}
                      {unit}
                    </div>
                  </div>
                </div>
                <div
                  className={`absolute top-1 right-0.5 md:right-0.5 md:top-2 ${
                    (unit === "d") | (unit === "s") && "text-transparent"
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
