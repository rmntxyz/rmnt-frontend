import { useEffect, useState } from "react";

export default function getScreenSize() {
  const [screenWidth, setScreenWidth] = useState();
  const [screenHeight, setScreenHeight] = useState();
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.outerWidth);
      setScreenHeight(window.outerHeight);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  });
  return { screenWidth, screenHeight };
}
