import Image from "next/image";
import { useState } from "react";

export default function Maximizable({ currentNFT, loading }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const handleFullscreen = () => {
    if (isFullscreen === false) {
      if (document.getElementById("maximizableElement").requestFullscreen) {
        document.getElementById("maximizableElement").requestFullscreen();
        setIsFullscreen(true);
      } else if (
        document.getElementById("maximizableElement").mozRequestFullScreen
      ) {
        document.getElementById("maximizableElement").mozRequestFullScreen();
        setIsFullscreen(true); // Firefox
      } else if (
        document.getElementById("maximizableElement").webkitRequestFullscreen
      ) {
        document.getElementById("maximizableElement").webkitRequestFullscreen();
        setIsFullscreen(true); // Chrome and Safari
      }
    }
    if (isFullscreen === true) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
        setIsFullscreen(false);
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
        setIsFullscreen(false);
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
        setIsFullscreen(false);
      }
    }
  };
  return (
    <div
      onClick={(e) => handleFullscreen()}
      className={` ${
        isFullscreen ? "hover:cursor-pointer" : "hover:cursor-zoom-in"
      } ${
        loading ? "opacity-0" : "opacity-100"
      } relative transition-opacity h-[560px] xl:h-[590px]`}
    >
      <Image
        id="maximizableElement"
        src={currentNFT.image_address}
        placeholder="blur"
        blurDataURL={currentNFT.image_address}
        layout="fill"
        objectFit="contain"
        // onLoadingComplete={({ naturalWidth, naturalHeight }) => {
        //   console.log(naturalHeight, naturalWidth);
        // }}
      />
    </div>
  );
}
