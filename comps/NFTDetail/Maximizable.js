import Image from "next/image";
import { useState } from "react";

export default function Maximizable({ currentNFT, loading }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const handleFullscreen = () => {
    getOrExitFullscreen();
    setIsFullscreen(!isFullscreen)
  }
  const getOrExitFullscreen = () => {
    if (isFullscreen === false) {
      if (document.getElementById("maximizableElement").requestFullscreen) {
        document.getElementById("maximizableElement").requestFullscreen();
      } else if (
        document.getElementById("maximizableElement").mozRequestFullScreen
      ) {
        document.getElementById("maximizableElement").mozRequestFullScreen(); // Firefox
      } else if (
        document.getElementById("maximizableElement").webkitRequestFullscreen
      ) {
        document.getElementById("maximizableElement").webkitRequestFullscreen(); // Chrome and Safari
      }
    }
    if (isFullscreen === true) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
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
