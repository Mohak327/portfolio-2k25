import React, { useState, useEffect, useRef } from "react";
import { supportedMediaExtensions } from "./MediaRenderer.model";
import Image from "next/image";
import styles from "./MediaRenderer.module.css";
import MediaRendererControls from "./MediaRendererControls/MediaRendererControls.view";
import MediaRendererController from "./MediaRenderer.controller";
import ConditionLinkView from "@/components/Molecules/ConditionLink/ConditionLink.view";

const MediaRenderer = ({
  image = {},
  height,
  width,
  styleOverride = {},
  alt = "",
  imgQuality = 70,
  borderRadius = "8px",
  enlargeImageOnClick = false,
  imageLink = "",
  videoref = null,
}) => {
  const [fullscreen, setFullscreen] = useState(false);
  const imageRef = useRef(null);
  const aspectRatio = width / height;

  const isVideo = supportedMediaExtensions.video?.some((ext) =>
    image?.url?.toLowerCase().endsWith(`.${ext}`)
  );
  const isImage = supportedMediaExtensions.image?.some((ext) =>
    image?.url?.toLowerCase().endsWith(`.${ext}`)
  );

  const handleFullscreenToggle = () => {
    if (fullscreen) {
      MediaRendererController.exitFullscreen(imageRef);
      setFullscreen(false);
      // const { image, ...restQuery } = router.query;
      // router.push({ query: restQuery }, undefined, { shallow: true });
    } else {
      MediaRendererController.enterFullscreen(imageRef);
      setFullscreen(true);
      // router.push({ query: { ...router.query, image: url } }, undefined, {
      //   shallow: true,
      // });
    }
  };

  // useEffect(() => {
  //   if (!router?.query?.image) {
  //     MediaRendererController.exitFullscreen(imageRef);
  //     setFullscreen(false);
  //   }
  // }, [router.query.image]);

  return isVideo ? (
    <video
      ref={videoref}
      src={image?.url}
      controls
      style={{ maxWidth: "100%", height: "auto", ...styleOverride }}
      preload="metadata"
      playsInline
    />
  ) : isImage ? (
    <div style={{ position: "relative", maxWidth: "100%" }}>
      <ConditionLinkView link={imageLink} analytics="image-click">
        <Image
          onClick={enlargeImageOnClick ? handleFullscreenToggle : () => {}}
          src={image?.url}
          alt={alt}
          width={width}
          height={height}
          quality={imgQuality}
          sizes="100vw"
          style={{
            maxWidth: "100%",
            height: "auto",
            aspectRatio,
            ...styleOverride,
          }}
          ref={imageRef}
          className={`${styles.image} ${fullscreen ? styles.fullscreen : ""} 
    ${enlargeImageOnClick || imageLink ? styles.pointer : ""}`}
        />
      </ConditionLinkView>
      {enlargeImageOnClick && (
        <MediaRendererControls
          handleFullscreen={(e) => {
            e.stopPropagation();
            handleFullscreenToggle();
          }}
          borderRadius={borderRadius}
          fullscreen={fullscreen}
        />
      )}
    </div>
  ) : null;
};

export default MediaRenderer;
