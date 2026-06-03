"use client";
import React, { useState, useEffect } from "react";
import InnerPageBanner from "@/components/InnerPageBanner";
import Image from "next/image";
import enc from "@/images/enc.svg";
import mBox from "@/images/m-box.png";
import HmTextSec from "@/components/home/HmTextSec";
import icon1 from "@/images/icon1.svg";
import icon2 from "@/images/icon2.svg";
import icon3 from "@/images/icon3.svg";
import icon4 from "@/images/icon4.svg";
import illus3 from "@/images/illus3.svg";
import hmIllus from "@/images/bottom-illus.svg";
import LogoSec from "@/components/LogoSec";
import EscapeRoomCard from "@/components/EscapeRoomCard";
import CounterBox from "@/components/CounterBox";
import VisitLocations from "@/components/VisitLocations";
import PeakExpSec from "@/components/PeakExpSec";
import BlogSlider from "@/components/BlogSlider";
import HomeContact from "@/components/home/HomeContact";
import locIcon from "@/images/loc-icon.svg";
import ReserveASlot from "@/components/ReserveASlot";
import fdImg1 from "@/images/fd-img1.png";
import Link from "next/link";
import wh from "@/images/wh.svg";
import { useParams } from "next/navigation";

import api from "@/helpers/api";

import OurLocationSec from "@/components/OurLocationSec";
import GReviewSlider from "@/components/GReviewSlider";
import Videotestimonials from "@/components/Videotestimonials";
import FaqSection from "@/components/FaqSection";
import HmTextlocationkoramangala from "@/components/home/HmTextSecLocationkoramangala";

const page = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  console.log("sjdfhjsghdfjsdf", openFaqIndex)
  const banner = {
    title:
      'Escape Room in <br className="d-none d-lg-block" /> <span>Koramangala</span>',
    location: "Near Sony World Signal, Koramangala",
    btns: [
      {
        title: "Book Now",
        link: "/escape-rooms",
        enc: (
          <>
            <Image src={enc} alt="enc" /> <span>Secure Payment Gateway</span>
          </>
        ),
      },
    ],
  };

  const hmText =
    'At Breakout® Koramangala, <br className="d-none d-lg-block" /> Dive into <span>8 cinematic escape rooms</span> at our Xtreme & Ultra facilities. <br className="d-none d-lg-block" /> Celebrate special moments & team outings with <br className="d-none d-lg-block" /> <span>2 exclusive event spaces.</span> <br className="d-none d-lg-block" /> Satisfy your cravings at our <span>live food counter</span>, & <br className="d-none d-lg-block" /> enjoy hassle-free parking. <br className="d-none d-lg-block" /> Come, unwind, and experience <span>the perfect escape you deserve!</span>';

  const boxItems = [
    {
      icon: icon1,
      title: "Realistic Setup",
    },
    {
      icon: icon2,
      title: "Clues Intertwine",
    },
    {
      icon: icon3,
      title: "Storyline Emerges",
    },
    {
      icon: icon4,
      title: "Feel The Hero",
    },
  ];

  const { id } = useParams();

  const [location, setLocation] = useState(null);
  console.log("setLocation_setLocation", location)
  useEffect(() => {
    const fetchLocation = async () => {
      const res = await api.get(`/escaperoom-location/${id}`);
      console.log("banner section", res.data.data);
      const bnData = res?.data?.data?.bannersection
        ? {
          image: null,
          btns: [
            {
              title: "Book Now",
              link: "#book-now",
              enc: (
                <>
                  <Image src={enc} alt="enc" />{" "}
                  <span>Secure Payment Gateway</span>
                </>
              ),
            },
          ],
          ...res.data.data.bannersection,
        }
        : null;

      const mergedData = { ...res.data.data, bannersection: bnData };
      console.log("mergedData", mergedData?.faqsection);
      setLocation(mergedData);
    };
    fetchLocation();
  }, [id]);

  // useEffect(() => {
  //   window.scrollTo(0, 0)
  // }, [])


  useEffect(() => {
    const shouldScroll = sessionStorage.getItem("scrollToEscapeRooms");
    const shouldScroll_Ultra = sessionStorage.getItem("scrollToEscapeRooms_ultra");
    console.log("sjkdfhjksdhfshf_shouldScroll", shouldScroll)
    console.log("sjkdfhjksdhfshf_shouldScroll_123", shouldScroll_Ultra)
    if (shouldScroll === "true" && location?.escaperooms?.extreme?.length > 0) {
      // wait for DOM paint
      setTimeout(() => {
        const section = document.getElementById("escape-rooms");

        if (section) {
          section.scrollIntoView({
            behavior: "auto", // use "smooth" if you want animation
            block: "start",
          });
        }

        // remove key so it doesn't auto-scroll again
        sessionStorage.removeItem("scrollToEscapeRooms");
      }, 500);
    }
    else if (shouldScroll_Ultra === "true" && location?.escaperooms?.extreme?.length > 0) {
      // wait for DOM paint
      setTimeout(() => {
        const section = document.getElementById("escape-rooms-ultra");

        if (section) {
          section.scrollIntoView({
            behavior: "auto", // use "smooth" if you want animation
            block: "start",
          });
        }

        // remove key so it doesn't auto-scroll again
        sessionStorage.removeItem("scrollToEscapeRooms_ultra");
      }, 500);
    }
  }, [location]);


  useEffect(() => {
    const shouldScroll = sessionStorage.getItem("location_know_more");
  
    if (shouldScroll === "true" && location?.imagecardssection?.card?.length > 0) {
      // wait for DOM paint
      setTimeout(() => {
        const section = document.getElementById("loction-know-more-section");
  
        if (section) {
          section.scrollIntoView({
            behavior: "auto", // use "smooth" if you want animation
            block: "start",
          });
        }
  
        // remove key so it doesn't auto-scroll again
        sessionStorage.removeItem("location_know_more");
      }, 500);
    }
  }, [location]);


  return (
    <>
      {location && location?.bannersection && (
        <InnerPageBanner banner={location?.bannersection} />
      )}

      <div className="black-gr-div">
        {location && location?.textsection?.description != "" && (
          <HmTextlocationkoramangala text={location?.textsection?.description} />
        )}
        {location && location?.escaperooms?.extreme?.length > 0 && (
          <section className="esc-sec" id="escape-rooms">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <h3 className="sec-head medium sm-head">
                    Escape Room at {location?.title} &nbsp;
                    {location?.title == "Koramangala" && <span>Extreme</span>}
                  </h3>
                </div>
              </div>
              <div className="row row-gap-25">
                {location?.escaperooms?.extreme?.map((item, index) => (
                  <div className="col-lg-4 col-12" key={index}>
                    <EscapeRoomCard room={item} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {location && location?.escaperooms?.ultra?.length > 0 && (
          <>
            <section id="escape-rooms-ultra" className="section-padding esc-sec pb-0">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 text-center">
                    <h3 className="sec-head medium sm-head">
                      Escape Room at {location?.title} &nbsp;
                      {location?.title == "Koramangala" && <span>Ultra</span>}
                    </h3>
                  </div>
                </div>
                <div className="row row-gap-25">
                  {location?.escaperooms?.ultra?.map((item, index) => (
                    <div className="col-lg-4 col-12" key={index}>
                      <EscapeRoomCard room={item} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
        <Image src={hmIllus} alt="illus3" className="illus-image" />
      </div>

      <div className="black-gr-div">
        <div className="sec-padding-top">
          {location && location?.googlereviews && (
            <GReviewSlider commonStars={false} data={location?.googlereviews} />
          )}
        </div>

        {/* <section className="section-padding namecard-sec">
          <div className="container">
            <div className="row row-gap-25">
              {[...Array(3)].map((_, index) => (
                <div className="col-lg-4 col-12" key={index}>
                  <div className="namecard-box">
                    <div className="top-box">
                      <div className="pf">
                       
                      </div>
                      <h3 className="sec-head medium-20">Xoxo xox xo</h3>
                    </div>
                    <p className="para">
                      Xoxo xox xo Xoxo xox xo Xoxo xox xo Xoxo xox xo Xoxo xox
                      xo...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}
        {location && location?.pricingsection && (
          <ReserveASlot room={location?.pricingsection} onCheckEligibility={() => {
            // Student discount wala FAQ (index 3)
            setOpenFaqIndex(3);
          }} />
        )}
        {location && location?.imagecardssection?.card?.length > 0 && (
          <section className="overlay-sec">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="overlay-box">
                    <div className="overlay-box-row">
                      {/* {location?.imagecardssection?.card?.map((item, index) => (
                        <div className="col-overlay-box" key={index}>
                          <div className="overlay-box-item">
                            <div className="ovr-img">
                              {item?.image && (
                                <Image
                                  src={item?.image}
                                  alt="fd-img1"
                                  className="w-100 h-auto"
                                  width={1000}
                                  height={1000}
                                />
                              )}
                            </div>
                            <h3
                              className="sec-head h3"
                              dangerouslySetInnerHTML={{
                                __html: item?.heading,
                              }}
                            />
                            <p
                              className="para"
                              dangerouslySetInnerHTML={{
                                __html: item?.description,
                              }}
                            />
                            <Link href={item?.cta_link} className="link-btn">
                              <span onClick={()=>sessionStorage.setItem("location_know_more",true)}>{item?.cta_label}</span>
                            </Link>
                          </div>
                        </div>
                      ))} */}
                      {location?.imagecardssection?.card?.map((item, index) => (
                        <div className="col-overlay-box" id="loction-know-more-section" key={index}>
                          <div className="overlay-box-item">
                            <div className="ovr-img">
                              {item?.image && (
                                <Image
                                  src={item?.image}
                                  alt="fd-img1"
                                  className="w-100 h-auto"
                                  width={1000}
                                  height={1000}
                                />
                              )}
                            </div>

                            <h3
                              className="sec-head h3"
                              dangerouslySetInnerHTML={{ __html: item?.heading }}
                            />

                            <p
                              className="para"
                              dangerouslySetInnerHTML={{ __html: item?.description }}
                            />

                            <Link
                              href={item?.cta_link}
                              // href={"/parties"}
                              className="link-btn"
                              onClick={() =>
                                sessionStorage.setItem("location_know_more", "true")
                              }
                            >
                              <span>{item?.cta_label}</span>
                            </Link>
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        <Image src={hmIllus} alt="illus3" className="illus-image" />
      </div>

      <div className="black-gr-div">

        {/* <OurLocationSec
          className="sec-padding-top"
          title={`About Our Breakout®  <span>${location?.title} Location</span>`}
          slug={location?.slug}
          locationTitle={location?.title}
        // slug={location?.locationdetails}
        /> */}
         <OurLocationSec
          className="sec-padding-top"
          title={`About Our Breakout®  <span>${location?.title} Location</span>`}
          slug={location?.slug}
        />
        <div className="col-lg-12 col-12 pt-80">
          {location && location?.googlereviews && (
            <GReviewSlider commonStars={false} data={location?.googlereviews} />
          )}
        </div>
        {location && location?.videotestimonials && (
          <Videotestimonials className="pt-80" data={location?.videotestimonials} />
        )}

        <VisitLocations className="section-padding" title="Escape Rooms In <span>Bangalore</span>" />
        {location && location?.faqsection && (
          <FaqSection
            title="FAQs for <span>Your Adventure</span>"
            data={location?.faqsection}
            openIndex={openFaqIndex}
            onFaqChange={(index) => {
              // Same FAQ again → close
              setOpenFaqIndex((prev) => (prev === index ? null : index));
            }}
          />
        )}
        {/* <FaqSection title="FAQs for <span>Your Adventure</span>" /> */}
        <BlogSlider className="pb-0" title="Read <span>Blogs</span>" />
        <HomeContact textData={location?.footersection} />
      </div>
    </>
  );
};

export default page;
