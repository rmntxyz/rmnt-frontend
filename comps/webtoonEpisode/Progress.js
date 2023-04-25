import { useEffect, useRef, useState } from "react";

export default function Progress() {
  const barRef = useRef();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    window.onscroll = function () {
      useProgress();
    };
    function useProgress() {
      var winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      var height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      var scrolled = (winScroll / height) * 100;
      setProgress(scrolled + "%");
    }
  });

  return (
    <div className="fixed top-0 z-50 w-full h-0.5 bg-navBg">
      <div
        ref={barRef}
        className="h-full bg-white"
        style={{ width: progress }}
      ></div>
    </div>
  );
}
