"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import bannerImg from "@/images/mn.jpg";
import successIcon from "@/images/success.svg";
import ageIcon from "@/images/age.svg";
import detectiveIcon from "@/images/detective.svg";
import teamIcon from "@/images/team.svg";
import scareIcon from "@/images/scare.svg";
import durationIcon from "@/images/duration.svg";
import challengeIcon from "@/images/challange.svg";
import competitiveIcon from "@/images/competetive.svg";
import immersiveIcon from "@/images/immersive.svg";
import virtualIcon from "@/images/virtual.svg";
import duraIcon from "@/images/dura.svg";

import { CommonModal } from "@/components/CommonModal";
import { useState } from "react";

const Banner = ({ room, className = "", corporate = false }) => {
  const [show, setShow] = useState(false);

  // Default values if room data is not available
  const bannerData = room?.bannersection || {};
  console.log("bannerData_bannerData", bannerData)
  const descriptionParts = (bannerData?.description || "").split("|");
  const description = descriptionParts[0] || "";
  const popupDescription = descriptionParts.slice(1).join(" ") || "";

  return (
    <>
      <CommonModal show={show} handleClose={() => setShow(false)}>
        <div className="esc-modal-content">
          <h3 className="sec-head h3 yellow-text">{bannerData.heading}</h3>
          <p
            className="para mt-4"
            dangerouslySetInnerHTML={{ __html: popupDescription || "" }}
          ></p>
          <div onClick={() => setShow(false)}>

            <Link href={bannerData.cta_link} className="main-btn">
              <span>{bannerData.cta_label}</span>
            </Link>
          </div>
        </div>
      </CommonModal>
      <header className={`esc-header sec-padding-top ${className}`}>
        <div className="container">
          <div className="row row-gap-25">
            <div className="col-lg-5 col-12 text-center">
              <div className="esc-banner-img">
                <Image
                  src={bannerData?.image}
                  alt="banner"
                  className="w-100 h-auto"
                  width={500}
                  height={500}
                />
              </div>
            </div>
            <div className="col-lg-7 col-12">
              <div className="esc-banner-content">
                {corporate ? (
                  <>
                    <h1 className="sec-head yellow-text">{room.title}</h1>
                    <p className="sec-head medium-20 mt-3">
                      <span>{bannerData.heading}</span>
                    </p>
                  </>
                ) : (

                  <h1 className="sec-head yellow-text">{bannerData.heading}</h1>
                )}
                <div className="para mt-3">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: description?.replace(/\n/g, "<br />"),
                    }}
                  />

                  {!corporate && popupDescription && (
                    <span
                      style={{
                        cursor: "pointer",
                        textDecoration: "underline",
                        fontStyle: "italic",
                      }}
                      onClick={() => setShow(true)}
                    >
                      Read full Description
                    </span>
                  )}
                </div>
                {!corporate && (
                  <>
                    <ul className="mystery-ic-grid">
                      <li>
                        <div className="tp">
                          <Image src={challengeIcon} alt="mystery" />
                          <span>{bannerData.challenge_level}</span>
                        </div>
                        <p>Challenge Level</p>
                      </li>
                      <li>
                        <div className="tp">
                          <Image src={competitiveIcon} alt="mystery" />
                          <span>{bannerData.competitive_activity}</span>
                        </div>
                        <p>Competitive Activity</p>
                      </li>
                      <li>
                        <div className="tp">
                          <Image src={immersiveIcon} alt="mystery" />
                          <span>{bannerData.immersive_rating}</span>
                        </div>
                        <p>Immersive Rating</p>
                      </li>
                      <li>
                        <div className="tp">
                          <Image src={teamIcon} alt="mystery" />
                          <span>{bannerData.capacity}</span>
                        </div>
                        <p>
                          Capacity
                          <span style={{ fontSize: "12px", display: "block" }}>
                            Varies based on location
                          </span>
                        </p>
                      </li>
                      <li>
                        <div className="tp">
                          <Image src={duraIcon} alt="mystery" />
                          <span>{bannerData.duration}</span>
                        </div>
                        <p>Duration</p>
                      </li>
                      <li>
                        <div className="tp">
                          <Image src={virtualIcon} alt="mystery" />
                          <span>{bannerData.virtual_compatibility}</span>
                        </div>
                        <p>Virtual Compatibility</p>
                      </li>
                    </ul>
                    <Link href={"#book-now"} className="main-btn">
                      <span>{"Book Now"}</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* {!corporate && (
          <div className="container">
            <div className="imp-note-wrap">
              <p>
                <span>Important Note:</span>
                {bannerData.important_note}
              </p>
            </div>
          </div>
        )} */}
      </header>
    </>
  );
};

export default Banner;
