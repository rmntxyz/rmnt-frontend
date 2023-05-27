//define image vs video types
export const isImage = ["gif", "jpg", "jpeg", "png"];
export const isVideo = ["mpg", "mp2", "mpeg", "mpe", "mpv", "mp4"];

export const isImageType = (file) => {
  return isImage.includes(
    file.name.split(".")[file.name.split(".").length - 1]
  );
};

export const isVideoType = (file) => {
  return isVideo.includes(
    file.name.split(".")[file.name.split(".").length - 1]
  );
};

//Play video on mouse enter
export const handleMouseEnter = (e) => {
  const vid = e.target;
  vid.muted = true;
  vid.play();
};

//Stop video on mouse leave
export const handleMouseLeave = (e) => {
  const vid = e.target;
  // vid.muted = false;
  // vid.currentTime = 0;
  vid.pause();
};
