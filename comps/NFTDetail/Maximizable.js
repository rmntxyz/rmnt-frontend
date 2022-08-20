import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import { isImage } from "../../utils/mediaType";

export default function Maximizable({ currentNFT, loading }) {
  const NFTUrl = currentNFT.attributes.image.data[0].attributes.url;
  //Enable maximization of the selected NFT
  const [isFullscreen, setIsFullscreen] = useState(false);
  console.log(isFullscreen);
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
      document.addEventListener("fullscreenchange", exitHandler);
      document.addEventListener("webkitfullscreenchange", exitHandler);
      document.addEventListener("mozfullscreenchange", exitHandler);
      document.addEventListener("MSFullscreenChange", exitHandler);

      function exitHandler() {
        if (
          !document.fullscreenElement &&
          !document.webkitIsFullScreen &&
          !document.mozFullScreen &&
          !document.msFullscreenElement
        ) {
          setIsFullscreen(false);
        }
      }
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
      } relative group transition-opacity h-[402px] w-[931px]`}
    >
      {isImage.includes(NFTUrl.split(".")[NFTUrl.split(".").length - 1]) ? (
        <div>
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
          <FontAwesomeIcon
            onClick={(e) => handleFullscreen()}
            icon={faPlusCircle}
            size="2x"
            className={`absolute hidden right-1/2 bottom-7 text-lightGray group-hover:block hover:cursor-zoom-in ${
              isFullscreen && "invisible"
            }`}
          />
        </div>
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
