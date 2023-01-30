import { useEffect, useState } from "react";

export default function getScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [elementHeight, setElementHeight] = useState();
  const [viewportHeight, setViewportHeight] = useState();
  const handleScroll = () => {
    setScrollPosition(window.scrollY);
    setElementHeight(document.getElementById("scrollableElement").clientHeight);
    setViewportHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return { scrollPosition, elementHeight, viewportHeight };
}
