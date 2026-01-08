const MediaRendererController = {
  enterFullscreen: (imageRef) => {
    if (imageRef.current) {
      imageRef.current.classList.add("fullscreen");
      document.body.style.overflow = "hidden";
    }
  },

  exitFullscreen: (imageRef) => {
    if (imageRef.current) {
      imageRef.current.classList.remove("fullscreen");
      document.body.style.overflow = "";
    }
  },

  handleImageDownload: (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "image";
    link.click();
  },
};

export default MediaRendererController;
