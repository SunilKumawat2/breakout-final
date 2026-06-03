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

const Banner = ({ room, corporate = false }) => {
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

  return (
    <>
      <CommonModal show={show} handleClose={() => setShow(false)}>
        <div className="esc-modal-content">
          <h3 className="sec-head h3 yellow-text">{bannerData?.heading}</h3>
          <p
            className="para mt-4"
            dangerouslySetInnerHTML={{ __html: bannerData?.content || "" }}
          ></p>
          {bannerData?.cta_label && bannerData?.cta_link && (
            <Link href={bannerData?.cta_link} className="main-btn">
              <span>{bannerData?.cta_label}</span>
            </Link>
          )}
        </div>
      </CommonModal>
      <header className="esc-header pt-80 virtual-game-banner">
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
                      __html: bannerData.description?.replace(/\n/g, "<br />"),
                    }}
                  />

                  {!corporate && (
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
                          <Image src={successIcon} alt="mystery" />
                          <span>{bannerData.success_rate}%</span>
                        </div>
                        <p>Success Rate</p>
                      </li>
                      <li>
                        <div className="tp">
                          <Image src={teamIcon} alt="mystery" />
                          <span>{bannerData.capacity}</span>
                        </div>
                        <p>Capacity</p>
                      </li>
                    </ul>
                    <button
                      className="main-btn"
                      onClick={(e) => {
                        e.preventDefault();

                        const el = document.getElementById("book-now");
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                    >
                      <span>Book Now</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {!corporate && bannerData?.important_note && (
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
