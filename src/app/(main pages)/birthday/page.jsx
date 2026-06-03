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
import locPlace from "@/images/loc-place.svg";
import BirthdayBanner from "@/components/BirthdayBanner";
import bdayIllus from "@/images/bday-illus.svg";

import bdayImg1 from "@/images/bday1.jpg";
import bdayImg2 from "@/images/bday2.jpg";
import bdayImg3 from "@/images/bday3.jpg";
import bdayImg4 from "@/images/bday4.jpg";
import bdayImg5 from "@/images/bday5.jpg";
import bdayImg6 from "@/images/bday6.jpg";

import partyillus from "@/images/party-illus.svg";
import BirthdayGetInTouch from "@/components/BirthdayGetInTouch";
import PartySlider from "@/components/PartySlider";
import ReadyToGoPlans from "@/components/ReadyToGoPlans";
import Videotestimonials from "@/components/Videotestimonials";
import FaqSection from "@/components/FaqSection";

import nightIllus from "@/images/night-illus.svg";

import bdayBanner from "@/images/bday-banner1.jpg";
import PartyExpertCon from "@/components/PartyExpertCon";

import api from "@/helpers/api";
import TrustedSection from "@/components/TrustedSection";
import GReviewSlider from "@/components/GReviewSlider";
import PhotographicStyledImage from "@/components/PhotographicStyledImage";
import PartyGetInTouch from "@/components/PartyGetInTouch";

const page = () => {
  const [birthdayData, setBirthdayData] = useState(null);
  const [birthdays, setBirthdays] = useState([]);
  useEffect(() => {
    const fetchBirthdayData = async () => {
      try {
        const response = await api.get("/birthday-archive");
        setBirthdayData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBirthdayData();
    const fetchBirthdays = async () => {
      try {
        const response = await api.get("/birthday-listing");
        setBirthdays(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBirthdays();
  }, []);

  const hmText =
    "At our one-of-a-kind birthday parties, your <span>loved one…Enjoys surprises</span>, gets crazy, has fun, creates memories.In short, they <span>feel truly special</span>– and so do you.Let’s make this <span>birthday</span> unforgettable—together!";

  const bdays = [
    {
      image: bdayImg1,
      title: "1 Year Old",
    },
    {
      image: bdayImg2,
      title: "Kid",
    },
    {
      image: bdayImg3,
      title: "Tweens",
    },
    {
      image: bdayImg4,
      title: "Teen",
    },
    {
      image: bdayImg5,
      title: "Friend / Parent",
    },
    {
      image: bdayImg6,
      title: "Love",
    },
  ];

  return (
    <>
      {birthdayData && birthdayData?.bannersection && (
        <BirthdayBanner
          data={birthdayData?.bannersection}
          title="Breakout® Celebrations"
          subTitle="The Birthday Capital of India!"
          img={bdayBanner}
        />
      )}

      <div className="black-gr-div">
        {/* <section className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h3 className="sec-head">
                  Want to make your kids birthday <span>special?</span>
                </h3>
              </div>
            </div>
          </div>
        </section> */}

        <HmTextSec text={hmText} />
        <div className="container">
          <div className="bday-text-wrap">
            <p className="underline-big-text">
              Why Birthdays Matter: A Message from Our Founder You Won’t Want to
              Miss!
            </p>
          </div>
        </div>

        <TrustedSection />

        {/* <section className="section-padding bday-count-sec">
          <div className="container">
            <div className="row row-gap-25">
              {[...Array(4)].map((_, index) => (
                <div className="col-lg-3 col-6" key={index}>
                  <CounterBox key={index} bday={true} />
                </div>
              ))}
            </div>
          </div>
        </section> */}
        {/* <ReserveASlot /> */}
        <PartyExpertCon className="pt-80" data="birthday" />

        <Image src={bdayIllus} className={"w-100 h-auto"} alt="bday" />
      </div>

      <div className="black-gr-div">
        <section className="section-padding bday-sec">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h3 className="sec-head medium sm-head">
                  It’s a <span>birthday of my…</span>
                </h3>
              </div>
            </div>
            <div className="row mt-5 row-gap-25">
              {birthdays.length > 0 &&
                birthdays.map((bd, index) => (
                  <div className="col-lg-4 col-12" key={index}>
                    <Link
                      href={`/parties/birthday/${bd.slug}`}
                      className="location-card"
                      onClick={() => {
                        window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({
                          event: "cta_click",
                          button_name: bd.title,
                          destination: `/parties/birthday/${bd.slug}`,
                          page: window.location.pathname,
                          section: "birthday_locations",
                        });
                      }}
                    >
                      <div className="location-card-img">
                        {bd.image && (
                          <Image
                            src={bd.image}
                            width={500}
                            height={500}
                            alt={bd.title}
                          />
                        )}
                      </div>

                      <div className="location-card-content">
                        <h3>{bd.title}</h3>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <PartyGetInTouch />
        {/* <BirthdayGetInTouch /> */}
        {birthdayData && birthdayData?.partyinclusions && (
          <PartySlider data={birthdayData?.partyinclusions} />
        )}

        <Image src={partyillus} alt="illus3" className="illus-3 w-100 h-auto" />
      </div>
      <div className="black-gr-div">
        {birthdayData && birthdayData?.readytoplan && (
          <ReadyToGoPlans data={birthdayData?.readytoplan} />
        )}
        <GReviewSlider />

        {birthdayData && birthdayData?.imagesection && (
          <>
            <section className="section-padding">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 text-center">
                    <h3
                      className="sec-head sm-head medium"
                      dangerouslySetInnerHTML={{
                        __html: "<span>Capturing</span> Happiness",
                      }}
                    ></h3>
                  </div>
                </div>
                <div className="row">
                  <div className="photographic-styled-image-container">
                    {birthdayData?.imagesection?.image1 && (
                      <PhotographicStyledImage
                        image={birthdayData?.imagesection?.image1}
                      />
                    )}
                    {birthdayData?.imagesection?.image2 && (
                      <PhotographicStyledImage
                        image={birthdayData?.imagesection?.image2}
                      />
                    )}
                    {birthdayData?.imagesection?.image3 && (
                      <PhotographicStyledImage
                        image={birthdayData?.imagesection?.image3}
                      />
                    )}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* <section className="section-padding namecard-sec pt-0">
          <div className="container">
            <div className="row row-gap-25">
              {[...Array(3)].map((_, index) => (
                <div className="col-lg-4 col-12" key={index}>
                  <div className="namecard-box">
                    <div className="top-box">
                      <div className="pf">
                        <Image src={mBox} alt="m-box" className='w-100 h-auto' />
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
        {birthdayData && birthdayData?.videotestimonials && (
          <Videotestimonials data={birthdayData?.videotestimonials} />
        )}
        {/* <Videotestimonials /> */}
        <Image src={illus3} className={"w-100 h-auto"} alt="bday" />
      </div>
      <div className="black-gr-div">
        <FaqSection />
        <BlogSlider />
        <LogoSec />
        <PartyGetInTouch
          img={nightIllus}
          noTextBottom={true}
          textData={birthdayData?.footersection}
        />
        {/* <BirthdayGetInTouch
          img={nightIllus}
          noTextBottom={true}
          textData={birthdayData?.footersection}
        /> */}
      </div>
    </>
  );
};

export default page;
