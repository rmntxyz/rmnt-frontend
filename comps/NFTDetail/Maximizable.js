import Image from "next/image";
import { useState } from "react";

export default function Maximizable({ currentNFT, loading }) {
  //Enable maximization of the selected NFT
  const [isFullscreen, setIsFullscreen] = useState(false);
  const handleFullscreen = () => {
    getOrExitFullscreen();
    setIsFullscreen(!isFullscreen);
  };
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
      } relative transition-opacity h-[402px]`}
    >
      <Image
        id="maximizableElement"
        alt="Rarement NFT Image"
        src={
          "https://rmnt.herokuapp.com" +
          currentNFT.attributes.image.data[0].attributes.url
        }
        placeholder="blur"
        blurDataURL={`/_next/image?url=${currentNFT.attributes.image.data[0].attributes.url}&w=16&q=1`}
        layout="fill"
        objectFit="contain"
        // onLoadingComplete={({ naturalWidth, naturalHeight }) => {
        //   console.log(naturalHeight, naturalWidth);
        // }}
      />
    </div>
  );
}
