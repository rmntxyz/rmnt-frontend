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
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return { scrollPosition, elementHeight, viewportHeight };
}
