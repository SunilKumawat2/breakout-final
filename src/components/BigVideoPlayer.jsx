"use client";

import React, { useRef, useState, useEffect } from "react";
import playIcon from "@/images/play.svg";
import pauseIcon from "@/images/pause-btn.svg";
import Image from "next/image";

const BigVideoPlayer = ({ room, video }) => {
  const videoRef = useRef(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoSrc, setVideoSrc] = useState(video);

  useEffect(() => {
    setVideoSrc(video);
    setVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [video]);

  // Sync play/pause state with video element
  useEffect(() => {
    if (!videoRef.current) return;
    if (videoPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [videoPlaying]);

  // If user uses native controls, update our state
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const handlePlay = () => setVideoPlaying(true);
    const handlePause = () => setVideoPlaying(false);
    vid.addEventListener("play", handlePlay);
    vid.addEventListener("pause", handlePause);
    return () => {
      vid.removeEventListener("play", handlePlay);
      vid.removeEventListener("pause", handlePause);
    };
  }, [videoRef.current]);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (videoPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  return (
    <div className="big-video-player">
      <div className="video-poster">
        {video && (
          <video
            ref={videoRef}
            src={videoSrc}
            width="100%"
            height="auto"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "400px",
              objectFit: "cover",
            }}
            controls
            playsInline
            preload="metadata"
            tabIndex={0}
            className="video-preview"
          />
        )}
      </div>
      <div className="btm-bar">
        <span
          style={{
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
          }}
          onClick={handlePlayPause}
        >
          {videoPlaying ? (
            <Image src={pauseIcon} alt="pause" style={{ marginRight: 8 }} />
          ) : (
            <Image src={playIcon} alt="play" style={{ marginRight: 8 }} />
          )}
          Watch Trailer
        </span>
      </div>
    </div>
  );
};

export default BigVideoPlayer;
