import { useEffect, useState } from "react";

export default function ListTimer({ targetTime }) {
  const calculateTimeLeft = () => {
    const difference = new Date(targetTime).getTime() - new Date().getTime();
    let timeLeft = [];
    if (difference > 0) {
      return (timeLeft = [
        {
          unit: "d",
          number: Math.floor(difference / (1000 * 60 * 60 * 24)),
        },
        {
          unit: "h",
          number: Math.floor((difference / (1000 * 60 * 60)) % 24),
        },
        {
          unit: "m",
          number: Math.floor((difference / 1000 / 60) % 60),
        },
        {
          unit: "s",
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
    <div>
      {timeLeft ? (
        <div>
          <div className="flex font-bold">
            {timeLeft.map(({ unit, number }) => (
              <div key={unit} className="relative flex flex-row">
                <div className={`flex flex-col mr-2 md:mr-3 ${(unit==="s") && "mr-0 md:mr-0"}` }>
                  <div className="w-9 h-5 flex justify-center items-center bg-lightBeige rounded md:h-6">
                    <div suppressHydrationWarning={true}>{number}{unit}</div>
                  </div>
                </div>
                <div
                  className={`absolute -top-0.5 right-0.5 md:right-1 ${
                    (unit === "d") | (unit === "s") &&
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
