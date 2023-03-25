import { useEffect, useState } from "react";

export default function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [elementHeight, setElementHeight] = useState();
  const [viewportHeight, setViewportHeight] = useState();
  const handleScroll = () => {
    setScrollPosition(window.scrollY);
    setElementHeight(document.getElementById("scrollableElement").clientHeight);
    setViewportHeight(window.innerHeight);
  };
  const handleResize = () => {
    setScrollPosition(window.scrollY);
    setElementHeight(document.getElementById("scrollableElement").clientHeight);
    setViewportHeight(window.innerHeight);
  };
  useEffect(() => {
    setElementHeight(document.getElementById("scrollableElement").clientHeight);
    setViewportHeight(window.innerHeight);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return { scrollPosition, elementHeight, viewportHeight };
}
