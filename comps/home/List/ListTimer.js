import { useEffect, useState } from "react";

export default function ListTimer({ timeRemaining }) {
  //Fetch the time remaining from the server and set the drop time on the client side
  const [endTime, setEndTime] = useState(new Date().getTime() + timeRemaining);

  //Use the client-side drop time to build the countdown timer
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
        <div>
          <div className="flex font-bold text-xs md:text-[13px]">
            {timeLeft.map(({ unit, number }) => (
              <div key={unit} className="relative flex flex-row">
                <div
                  className={`flex flex-col ${
                    unit === "s" ? "mr-0" : "mr-2 md:mr-3"
                  }`}
                >
                  <div className="w-8 h-5 flex justify-center items-center bg-lightBeige rounded md:h-6">
                    <div>
                      <span suppressHydrationWarning={true}>
                        {number.toString().length < 2 ? "0" + number : number}
                      </span>
                      <span>{unit}</span>
                    </div>
                  </div>
                </div>
                <div
                  className={`absolute top-0.5 right-0.5 md:right-1 ${
                    (unit === "d") | (unit === "s") && "hidden"
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
