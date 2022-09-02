// import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import { isImage } from "../../utils/mediaType";

export default function Maximizable({ currentNFT, loading }) {
  const NFTUrl = currentNFT.attributes.image.data[0].attributes.url;
  //Enable maximization of the selected NFT
  const [isFullscreen, setIsFullscreen] = useState(false);
  useEffect(() => {
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
  });
  const handleFullscreen = () => {
    getOrExitFullscreen();
    setIsFullscreen(!isFullscreen);
  };

  const getOrExitFullscreen = () => {
    if (!document.fullscreenElement) {
      if (document.getElementById("maximizableElement").requestFullscreen) {
        document.getElementById("maximizableElement").requestFullscreen();
        // setIsFullscreen(true);
      } else if (
        document.getElementById("maximizableElement").mozRequestFullScreen
      ) {
        document.getElementById("maximizableElement").mozRequestFullScreen(); // Firefox
        // setIsFullscreen(true);
      } else if (
        document.getElementById("maximizableElement").webkitRequestFullscreen
      ) {
        document.getElementById("maximizableElement").webkitRequestFullscreen(); // Chrome and Safari
        // setIsFullscreen(true);
      }
    }
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        // setIsFullscreen(false);
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
        // setIsFullscreen(false);
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
        // setIsFullscreen(false);
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
        // setIsFullscreen(false);
      }
    }
  };

  // //Get screen size to disable autoplay on mobile
  // const [screenWidth, setScreenWidth] = useState();
  // useEffect(() => setScreenWidth(window.outerWidth));

  //Add blur to the image being loaded
  // const [blur, setBlur] = useState(true);
  // const handleBlur = () => {
  //   setBlur(false);
  // };
  return (
    <div
      onClick={(e) => handleFullscreen()}
      className={`${
        isFullscreen ? "hover:cursor-pointer" : "hover:cursor-zoom-in"
      } 
       relative group transition-opacity mx-auto h-[236px] w-full md:h-[402px] md:w-[90%] lg:w-[931px]`}
      style={{ opacity: loading ? 0 : 100 }}
    >
      {isImage.includes(NFTUrl.split(".")[NFTUrl.split(".").length - 1]) ? (
        <Image
          id="maximizableElement"
          alt="Rarement NFT Image"
          src={NFTUrl}
          // width={931}
          // height={402}
          layout="fill"
          objectFit="contain"
          placeholder="blur"
          blurDataURL={NFTUrl}
          // style={{
          //   filter: blur ? "blur(20px)" : "none",
          //   transition: blur ? "none" : "filter 0.3s ease-out",
          // }}
          // onLoadingComplete={handleBlur}
        />
      ) : (
        <video
          controls
          // autoPlay={screenWidth < 768 ? false : true}
          autoPlay={true}
          poster={currentNFT.attributes.thumbnail.data.attributes.url}
          playsInline={true}
          id="maximizableElement"
          alt="Rarement NFT Video"
          src={NFTUrl}
          loop={true}
          className="mx-auto max-h-[236px] md:max-h-[402px] "
        ></video>
      )}
    </div>
  );
}
