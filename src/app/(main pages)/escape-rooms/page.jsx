"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";

import InnerPageBanner from "@/components/InnerPageBanner";
import HmTextSec from "@/components/home/HmTextSec";
import LogoSec from "@/components/LogoSec";
import EscapeRoomCard from "@/components/EscapeRoomCard";
import TrustedSection from "@/components/TrustedSection";
import HomeContact from "@/components/home/HomeContact";

import api from "@/app/helpers/api";

import enc from "@/images/enc.svg";
import illus3 from "@/images/illus3.svg";
import hmIllus from "@/images/bottom-illus.svg";
import SmoothScrolling from "@/components/SmoothScroll";
// Lazy loaded components
const VisitLocations = dynamic(() => import("@/components/VisitLocations"));
const BlogSlider = dynamic(() => import("@/components/BlogSlider"));
const Videotestimonials = dynamic(() => import("@/components/Videotestimonials"));
const GlobalReviewWidget = dynamic(() => import("@/components/GlobalReviewWidget"));
const FaqSection = dynamic(() => import("@/components/FaqSection"));

const page = () => {
  const [rooms, setRooms] = useState([]);
  const [escapeRooms, setEscapeRooms] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [archiveRes, roomsRes] = await Promise.all([
          api.get("/escaperoom-archive"),
          api.get("/escaperooms"),
        ]);

        setRooms(archiveRes.data.data);
        setEscapeRooms(roomsRes.data.data);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const bannerLinks = [
    {
      link: rooms?.bannersection?.cta_link1,
      title: rooms?.bannersection?.cta_label1,
      enc: (
        <>
          <Image src={enc} alt="enc" /> <span>Secure Payment Gateway</span>
        </>
      ),
    },
    {
      link: rooms?.bannersection?.cta_link2,
      title: rooms?.bannersection?.cta_label2,
    },
  ];

  useEffect(() => {
    const shouldScroll = sessionStorage.getItem("scrollToEscapeRooms");

    if (shouldScroll == "true") {
      // wait for DOM paint
      setTimeout(() => {
        const section = document.getElementById("escape-rooms-section");

        if (section) {
          section.scrollIntoView({
            behavior: "auto", // use "smooth" if you want animation
            block: "start",
          });
        }

        // remove key so it doesn't auto-scroll again
        sessionStorage.removeItem("scrollToEscapeRooms");
      }, 1000);
    }
  }, [escapeRooms]);

  useEffect(() => {
    const shouldScroll = sessionStorage.getItem("visit_location_key");

    if (shouldScroll == "true") {
      // wait for DOM paint
      setTimeout(() => {
        const section = document.getElementById("visit-location-section");

        if (section) {
          section.scrollIntoView({
            behavior: "auto", // use "smooth" if you want animation
            block: "start",
          });
        }

        // remove key so it doesn't auto-scroll again
        sessionStorage.removeItem("visit_location_key");
      }, 1000);
    }
  }, [escapeRooms]);


  return (
    <>
      <Head>
        <link
          rel="canonical"
          href="https://breakout.in/escape-rooms"
        />
      </Head>
      {
        loading ? (
          <div id="preloader">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            {!rooms?.bannersection ? (
              <SmoothScrolling />
            ) : (
              <InnerPageBanner
                banner={{ ...rooms?.bannersection, btns: bannerLinks }}
                bdayInner={true}
              />
            )}

            <div className="black-gr-div">
              {rooms?.iconsection?.description && (
                <HmTextSec className="sec-padding-top" text={rooms?.iconsection?.description} />
              )}
              {rooms?.iconsection && (
                <section className="sec-padding-top cinematic-sec">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12 text-center">
                        <h3
                          className="sec-head medium sm-head"
                          dangerouslySetInnerHTML={{
                            __html: rooms?.iconsection?.heading,
                          }}
                        />
                        <div className="row row-gap-25">
                          {rooms?.iconsection?.icons?.length > 0 &&
                            rooms?.iconsection?.icons.map((item, index) => (
                              <div className="col-lg-3 col-12" key={index}>
                                <div className="box-item">
                                  <div className="box-item-icon">
                                    {item?.image && (
                                      <Image
                                        src={item.image}
                                        width={100}
                                        height={100}
                                        alt="enc"
                                      />
                                    )}
                                  </div>
                                  <div className="box-item-content">
                                    <h4 className="sec-head medium-20 mb-0">
                                      {item?.heading}
                                    </h4>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
              {rooms?.iconsection && (
                <TrustedSection className="pb-0" removeHeading={true} data={rooms?.iconsection} />
              )}
              <LogoSec className="pb-0 pt-80" title="In the <span>News</span>" />
              <Image src={hmIllus} alt="illus3" className="illus-image" />
            </div>
            <div className="black-gr-div">
              <VisitLocations className="sec-padding-top" id="visit-location-section" />
              <section className="section-padding esc-sec pb-0" id="escape-rooms-section">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 text-center">
                      <h3 className="sec-head medium sm-head">
                        Escape <span>Rooms</span>
                      </h3>
                    </div>
                  </div>
                  <div className="row row-gap-25">
                    {escapeRooms &&
                      escapeRooms.map((room, index) => (
                        <div className="col-lg-4 col-12"
                          onClick={() => sessionStorage.setItem("scrollToEscapeRooms", true)} key={index}>
                          <EscapeRoomCard room={room} />
                        </div>
                      ))}
                  </div>
                </div>
              </section>
              <Image src={illus3} alt="illus3" className="illus-image" />
            </div>
            <div className="black-gr-div">
              <div className="sec-padding-top">
                {(rooms?.googlereviews || rooms?.googlereviews?.length > 0) && (
                  <GlobalReviewWidget
                    reviews={rooms?.googlereviews}
                    data={rooms?.imagesection}
                  />
                )}
              </div>

              {rooms?.videotestimonials && (
                <Videotestimonials data={rooms?.videotestimonials} />
              )}
              {rooms?.faqsection && <FaqSection className="section-padding" data={rooms?.faqsection} />}
              <BlogSlider className="py-0" />
              {rooms?.footersection && (
                <HomeContact textData={rooms?.footersection} page_type="escape_room" />
              )}
            </div>

            {/* <PeakExpSec /> */}
            {/* </div> */}
          </>
        )
      }

    </>
  );
};

export default page;
