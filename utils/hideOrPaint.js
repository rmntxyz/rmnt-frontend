import { useEffect, useState } from "react";

export default function hideOrPaint() {
  const [prevPos, setPrevPos] = useState(120);
  const [currentPos, setCurrentPos] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [clicked, setClicked] = useState(false);
  const handleScroll = () => {
    setCurrentPos(window.scrollY);
    setViewportHeight(window.innerHeight);
    setImageHeight(document.getElementById("episode").clientHeight);
    setClicked(false);
  };
  const handleClick = () => {
    setClicked(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });
    if (
      prevPos > currentPos ||
      //80 equals the navbar height
      currentPos + viewportHeight > imageHeight + 80 ||
      clicked === true
    ) {
      document.getElementById("navbar").style.top = "0";
      document.getElementById("navbar").style.opacity = "1";
      document.getElementById("buttons").style.opacity = "1";
    } else {
      document.getElementById("navbar").style.top = "-80px";
      document.getElementById("navbar").style.opacity = "0";
      document.getElementById("buttons").style.opacity = "0";
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClick);
    };
  });
}
