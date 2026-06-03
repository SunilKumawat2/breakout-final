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
import { CommonModal } from "@/components/CommonModal";
import { useState } from "react";

const Banner = ({ room, className = "",corporate = false }) => {
  const [show, setShow] = useState(false);

  // Default values if room data is not available
  const bannerData = room?.bannersection || {
    heading: "Murder Mystery",
    description:
      "As top detectives in town, can you crack the mysterious locked door case of Shoaib Sheikh in Alexandria, Egypt? \nOr will the killer evade justice",
    image: bannerImg,
    success_rate: "60",
    age_group: "9+",
    character: "Detective",
    min_team: "2",
    scare_factor: "3",
    duration: "1 hour",
    cta_label: "Book Now",
    cta_link: "/",
    important_note: "Adults must accompany kids aged 10 and under.",
  };

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
          {/* <Link onClick={() => setShow(false)} href="" className="main-btn">
            <span >Book Now</span>
          </Link> */}
          <Link href={"#book-now"} onClick={() => setShow(false)} className="main-btn">
            <span >Book Now</span>
          </Link>
        </div>
      </CommonModal>
      <header className={`esc-header sec-padding-top ${className}`}>
        <div className="container">
          <div className="row align-items-center row-gap-25">
            <div className="col-lg-5 col-12 text-center">
              <div className="esc-banner-img">
                <Image
                  src={bannerData?.image}
                  alt="banner"
                  className="w-100 h-auto"
                  width={1000}
                  height={1000}
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
                <p
                  className="  para mt-3"
                  dangerouslySetInnerHTML={{ __html: description || "" }}
                ></p>
                {!corporate && popupDescription && (
                  <span
                    className=""
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      fontStyle: "italic",
                      color: "#f0a300",
                      fontWeight: "bold",
                    }}
                    onClick={() => setShow(true)}
                  >
                    Read full Description
                  </span>
                )}
                {!corporate && (
                  <>
                    <ul className="mystery-ic-grid">
                      <li>
                        <div className="tp">
                          <Image src={successIcon} alt="mystery" />
                          <span>{bannerData.success_rate}%</span>
                        </div>
                        <p>Success Rate</p>
                      </li>
                      <li>
                        <div className="tp">
                          <Image src={ageIcon} alt="mystery" />
                          <span>{bannerData.age_group}</span>
                        </div>
                        <p>Age Group</p>
                      </li>
                      <li>
                        <div className="tp">
                          <Image src={detectiveIcon} alt="mystery" />
                          <span>{bannerData.character}</span>
                        </div>
                        <p>Character</p>
                      </li>
                      <li>
                        <div className="tp">
                          <Image src={teamIcon} alt="mystery" />
                          <span>{bannerData.min_team}</span>
                        </div>
                        <p>Minimum Team</p>
                      </li>
                      <li>
                        <div className="tp">
                          <Image src={scareIcon} alt="mystery" />
                          <span>{bannerData.scare_factor}/3</span>
                        </div>
                        <p>Scare Factor</p>
                      </li>
                      <li>
                        <div className="tp">
                          <Image src={durationIcon} alt="mystery" />
                          <span>{bannerData.duration}</span>
                        </div>
                        <p>Game Duration</p>
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
        {!corporate && (
          <div className="container">
            <div className="imp-note-wrap">
              <p>
                <span>Important Note:</span>
                {bannerData.important_note}
              </p>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Banner;
