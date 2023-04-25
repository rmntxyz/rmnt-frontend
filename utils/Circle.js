import { Parallax } from "react-scroll-parallax";

export default function Circle({ css, speed }) {
  return (
    <Parallax
      speed={speed}
      className={"absolute aspect-square rounded-full " + css}
    >
      <div></div>
    </Parallax>
  );
}
