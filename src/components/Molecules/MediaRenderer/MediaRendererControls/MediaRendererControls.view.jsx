import React from "react";
import styles from "./MediaRendererControls.module.css";
import DynamicIcon from "../../DynamicIcons/DynamicIcons.controller";
import { UIElements } from "@/outscal-commons-frontend/Hooks/useAnalyticsClickEvent";

const MediaRendererControls = ({
  handleFullscreen,
  fullscreen,
  borderRadius = "8px",
}) => {
  return (
    <div
      className={`${styles.controlGrid} ${
        fullscreen ? styles.fullscreenControlGrid : ""
      }`}
      onClick={handleFullscreen}
      style={{ borderRadius: borderRadius || "8px" }}
    >
      <button
        className={styles.controlButton}
        onClick={handleFullscreen}
        aria-label={fullscreen ? "Collapse Image" : "Expand Image"}
        data-analytics={[
          UIElements.LINK,
          fullscreen ? "collapse_image" : "expand_image",
        ]}
      >
        <DynamicIcon icon={fullscreen ? "FaCompress" : "FaExpand"} size={14} />
      </button>
    </div>
  );
};

export default MediaRendererControls;
