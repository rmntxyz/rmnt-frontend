import { Parallax } from "react-scroll-parallax";

export default function Circle({ speed, children }) {
  return (
    <Parallax
      speed={speed}
      className={"absolute top-0 w-full h-full"}
    >
      {children}
    </Parallax>
  );
}
