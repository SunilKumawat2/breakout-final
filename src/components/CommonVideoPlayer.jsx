"use client";

import React, { useRef } from "react";

const CommonVideoPlayer = ({
  src,
  poster,
  controls = true,
  autoPlay = false,
  loop = false,
  muted = false,
  className = "",
  style = {},
  ...props
}) => {
  const videoRef = useRef(null);

  return (
    <div className={`common-video-player ${className}`} style={style}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls={controls}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        style={{ width: "100%", borderRadius: "12px", ...style }}
        {...props}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default CommonVideoPlayer;
