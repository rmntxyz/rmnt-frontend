import { useEffect, useState } from "react";

export default function getScreenSize() {
  const [screenWidth, setScreenWidth] = useState();
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.outerWidth);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  });
  return screenWidth;
}
