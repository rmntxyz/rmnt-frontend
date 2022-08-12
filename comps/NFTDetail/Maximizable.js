import Image from "next/image";
import { useEffect, useState } from "react";
import { isImage } from "../../utils/mediaType";

export default function Maximizable({ currentNFT, loading }) {
  const NFTUrl = currentNFT.attributes.image.data[0].attributes.url;
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

  //Get screen size to disable autoplay on mobile
  const [screenWidth, setScreenWidth] = useState();
  useEffect(() => setScreenWidth(window.outerWidth));

  //Add blur to the image being loaded
  const [blur, setBlur] = useState(true);
  const handleBlur = () => {
    setBlur(false);
  };
  return (
    <div
      onClick={(e) => handleFullscreen()}
      className={`${
        isFullscreen ? "hover:cursor-pointer" : "hover:cursor-zoom-in"
      } ${
        loading ? "opacity-0" : "opacity-100"
      } relative transition-opacity h-[402px] w-[931px]`}
    >
      {isImage.includes(NFTUrl.split(".")[NFTUrl.split(".").length - 1]) ? (
        <Image
          id="maximizableElement"
          alt="Rarement NFT Image"
          src={NFTUrl}
          layout="fill"
          objectFit="contain"
          style={{
            filter: blur ? "blur(20px)" : "none",
            transition: blur ? "none" : "filter 0.3s ease-out",
          }}
          onLoadingComplete={handleBlur}
        />
      ) : (
        <video
          controls
          autoPlay={screenWidth < 768 ? false : true}
          id="maximizableElement"
          alt="Rarement NFT Video"
          src={NFTUrl}
          loop={true}
          className="max-h-[402px] mx-auto"
        ></video>
      )}
    </div>
  );
}
