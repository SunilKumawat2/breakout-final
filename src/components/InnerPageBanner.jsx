"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import locIcon from "@/images/loc-icon.svg";
import { CommonModal } from "./CommonModal";
// import escape_traler from "../../public/videos/The_Breakout_Escape_Room_Experience_720P.mp4";

const InnerPageBanner = ({ banner, bdayInner }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [isTrailerMuted, setIsTrailerMuted] = useState(true);
  const trailerVideoRef = useRef(null);
  const trailerBtnRef = useRef(null);

  const renderImageOrVideo = (image) => {
    if (typeof image == "string" && image) {
      if (
        image.includes(".mp4") ||
        image.includes(".webm") ||
        image.includes(".mov") ||
        image.includes(".avi") ||
        image.includes(".mkv")
      ) {
        return <video src={image} autoPlay muted loop playsInline />;
      } else {
        return (
          <Image src={image} width={1920} height={1080} alt="banner-image" />
        );
      }
    }
    return null;
  };
  return (
    <header className="inner-page-banner">
      {/* {JSON.stringify(banner.image)} */}
      {banner.image && (
        <div className="inner-page-banner-img">
          {renderImageOrVideo(banner.image)}
          {/* {banner?.image && (
            <Image
              src={banner.image}
              width={1920}
              height={1080}
              alt="banner-image"
            />
          )} */}
        </div>
      )}
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="inner-page-banner-content">
              {banner.heading && (
                <h1
                  className="sec-head mb-3"
                  dangerouslySetInnerHTML={{ __html: banner.heading || "" }}
                />
              )}
              {banner.description && !bdayInner ? (
                <h3 className="sec-head medium-20 mb-3">
                  <Image src={locIcon} alt="loc-icon" />
                  {banner.description || ""}
                </h3>
              ) : (
                <h3
                  className="sec-head medium-20 mb-3"
                  dangerouslySetInnerHTML={{ __html: banner.description || "" }}
                />
              )}
              {banner.subTitle && (
                <h3
                  className="sec-head medium mb-3"
                  dangerouslySetInnerHTML={{ __html: banner.subTitle || "" }}
                />
              )}
              {banner.para && (
                <p
                  className="sec-head book-20"
                  dangerouslySetInnerHTML={{ __html: banner.para || "" }}
                />
              )}
              <div className="btn-group">
                {banner?.btns?.map((btn, index) => {
                  const isWatchTrailer = btn.title === "Watch Trailer";

                  return (
                    <div className="btn-group-item" key={index}>
                      {isWatchTrailer ? (
                        <button
                          ref={trailerBtnRef}
                          type="button"
                          className={`main-btn ${(index + 1) % 2 === 0 && "dark-btn yellow-text"
                            }`}
                          onClick={() => {
                            setVideoUrl(btn.link);
                            setShowTrailer((prev) => !prev);
                          }}
                        >
                          <span>{btn.title}</span>
                        </button>
                      ) : (
                        <Link
                          href={btn.link}
                          className={`main-btn ${(index + 1) % 2 === 0 && "dark-btn yellow-text"
                            }`}
                        >
                          <span>{btn.title}</span>
                        </Link>
                      )}
                    </div>
                  );
                })}

              </div>


              {banner.btns?.map((btn, index) => (
                <div key={index}>
                  {btn.enc && (
                    <div className="btn-group-item-enc">{btn.enc}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* <CommonModal show={showTrailer} handleClose={() => setShowTrailer(false)}>
        <div className="video-wrapper">
       
          <video
            className="w-100 h-auto"
            // autoPlay
            // muted
            // loop
            // playsInline
            controls
          >
            <source src="/videos/The_Breakout_Escape_Room_Experience_720P.mp4" type="video/mp4" />
          </video>
        </div>
      </CommonModal> */}

      <CommonModal
        className="p-0"
        show={showTrailer}
        handleClose={() => {
          setShowTrailer(false);
          if (trailerVideoRef.current) {
            trailerVideoRef.current.pause();
            trailerVideoRef.current.currentTime = 0;
          }
        }}
      >
        <div className="video-wrapper w-100 mw-100" style={{ overflow: "hidden", borderRadius: "20px" }}>
          <video
            ref={trailerVideoRef}
            className="w-100 h-auto"
            playsInline
            loop
            // controls
            autoPlay
          >
            <source
              src="http://breakout.bvmwebsolutions.com/uploads/videos/thebreakoutescaperoomexperience720p_67840d84-573c-439f-ad90-af2a799bc3c7.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </CommonModal>

    </header>
  );
};

export default InnerPageBanner;
