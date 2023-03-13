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
    setImageHeight(document.getElementById("episode")?.clientHeight);
    setClicked(false);
  };
  const handleClick = () => {
    setClicked(!clicked);
  };

  useEffect(() => {
    setCurrentPos(window.scrollY);
    setViewportHeight(window.innerHeight);
    setImageHeight(document.getElementById("episode")?.clientHeight);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });
    let navTop = document.getElementById("navbar")?.style.top;
    let navOpacity = document.getElementById("navbar")?.style.opacity;
    let buttonOpacity = document.getElementById("buttons")?.style.opacity;
    let buttonPointer = document.getElementById("buttons")?.style.pointerEvents;
    let scrollTopOpacity =
      document.getElementById("scrollToTop")?.style.opacity;
    let scrollTopPointer =
      document.getElementById("scrollToTop")?.style.pointerEvents;

    if (
      prevPos > currentPos ||
      //80 equals the navbar height
      currentPos + viewportHeight > imageHeight + 80 ||
      clicked === true
    ) {
      navTop = "0";
      navOpacity = "1";
      buttonOpacity = "1";
      buttonPointer = "auto";
    } else {
      navTop = "-80px";
      navOpacity = "0";
      buttonOpacity = "0";
      buttonPointer = "none";
    }
    if (viewportHeight > imageHeight) {
      scrollTopOpacity = "0";
      scrollTopPointer = "none";
    } else {
      scrollTopOpacity = "1";
      scrollTopPointer = "auto";
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClick);
    };
  });
  // return {viewportHeight, imageHeight}
}
