"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import HmTextSec from "@/components/home/HmTextSec";
import CounterBox from "@/components/CounterBox";

const BlogSlider = dynamic(() => import("@/components/BlogSlider"));
const Videotestimonials = dynamic(() => import("@/components/Videotestimonials"));
const FaqSection = dynamic(() => import("@/components/FaqSection"));
const LogoSec = dynamic(() => import("@/components/LogoSec"));
const OurLocationSec = dynamic(() => import("@/components/OurLocationSec"));
const PartyGetInTouch = dynamic(() => import("@/components/PartyGetInTouch"));
const ReadyToGoPlans = dynamic(() => import("@/components/ReadyToGoPlans"));
const PartyInclutions = dynamic(() => import("@/components/PartyInclutions"));
const GReviewSlider = dynamic(() => import("@/components/GReviewSlider"));
const PhotographicStyledImage = dynamic(() => import("@/components/PhotographicStyledImage"));
import Link from "next/link";
import BirthdayBanner from "@/components/BirthdayBanner";
import bdayIllus from "@/images/bday-illus.svg";
import BirthdayGetInTouch from "@/components/BirthdayGetInTouch";
import nightIllus from "@/images/night-illus.svg";
import PartyExpertCon from "@/components/PartyExpertCon";
import movieIllus from "@/images/movie-illus.svg";
import TrustedSection from "@/components/TrustedSection";
import star from "@/images/star.svg";
import happy from "@/images/happy.svg";
import api from "@/app/helpers/api";
import Head from "next/head";


const page = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [birthdayList, setBirthdayList] = useState(null);
  
  useEffect(() => {
    const shouldScroll = sessionStorage.getItem("brithday_party_birthday_of_my");

    if (shouldScroll === "true" && data) {
      // wait for DOM paint
      setTimeout(() => {
        const section = document.getElementById("brithday-party-birthday-of-my-section");

        if (section) {
          section.scrollIntoView({
            behavior: "auto", // use "smooth" if you want animation
            block: "start",
          });
        }

        // remove key so it doesn't auto-scroll again
        sessionStorage.removeItem("brithday_party_birthday_of_my");
      }, 1000);
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Run both APIs in parallel
        const [archiveRes, listRes] = await Promise.all([
          api.get("/birthday-archive"),
          api.get("/birthday-listing"),
        ]);

        setData(archiveRes?.data?.data || []);
        setBirthdayList(listRes?.data?.data || []);
      } catch (err) {
        console.error("Birthday API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>
    <Head>
      <link
        rel="canonical"
        href="https://breakout.in/birthday"
      />
    </Head>
      {
        loading ? (
          <div id="preloader">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            {data?.bannersection && (
              <BirthdayBanner hasBannerStars={true} data={data?.bannersection} />
            )}

            <div className="black-gr-div">
              {data?.bannersection?.content && (
                <HmTextSec className="pt-80" text={data?.bannersection?.content} />
              )}
              {data?.bannersection?.note && (
                <div className="container">
                  <div className="bday-text-wrap" >
                    <p
                      className="underline-big-text yellow-text"
                      dangerouslySetInnerHTML={{ __html: data?.bannersection?.note }}
                    />
                  </div>
                </div>
              )}
              {data?.countersection && <TrustedSection className="pb-0" data={data?.countersection} />}
              <PartyExpertCon className="pt-80" data="birthday" />
              <Image src={bdayIllus} className={"illus-image"} alt="bday" />
            </div>
            <section className="pt-80 bday-sec" id="brithday-party-birthday-of-my-section">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 text-center">
                    <h3 className="sec-head medium sm-head">
                      It’s a <span>birthday of my…</span>
                    </h3>
                  </div>
                </div>
                <div className="row row-gap-25">
                  {birthdayList?.length > 0 &&
                    birthdayList?.map((bd, index) => (
                      <div
                        className="col-lg-4 col-12"
                        key={index}
                        onClick={() =>
                          sessionStorage.setItem("brithday_party_birthday_of_my", true)
                        }
                      >
                        <Link
                          href={`/parties/birthday/${bd.slug}`}
                          className="location-card"
                          onClick={() => {
                            window.dataLayer = window.dataLayer || [];
                            window.dataLayer.push({
                              event: "cta_click",
                              button_name: bd?.title,
                              destination: `/parties/birthday/${bd.slug}`,
                              page: window.location.pathname,
                              section: "birthday_cards",
                            });
                          }}
                        >
                          <div className="location-card-img">
                            {bd.image && (
                              <Image
                                src={bd.image}
                                alt={bd.title}
                                width={500}
                                height={500}
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
            <div className="black-gr-div">
              {/* <BirthdayGetInTouch privacyLine={true} /> */}

              {/* <PartyGetInTouch noImage={true} privacyLine={true} /> */}

              {data?.partyinclusions && (
                <section
                  className="section-padding bday-sec pb-0"
                  style={{ overflow: "hidden" }}
                >
                  <div className="blog-slider-sec">
                    <div className="row">
                      <div className="col-lg-12 text-center">
                        <h3
                          className="sec-head medium sm-head"
                          dangerouslySetInnerHTML={{
                            __html: data?.partyinclusions?.heading,
                          }}
                        ></h3>
                      </div>
                    </div>

                    <PartyInclutions data={data?.partyinclusions} />
                  </div>
                </section>
              )}

              <Image src={bdayIllus} alt="illus3" className="illus-image" />
            </div>
            <div className="black-gr-div">
              {/* <PartyExpertCon /> */}
              {data?.slidersection && <ReadyToGoPlans
                className="sec-padding-top pb-0" data={data?.slidersection} />}
              {data?.googlereviews && (
                <div className="pt-80">
                  <GReviewSlider commonStars={false} data={data?.googlereviews} />
                </div>
              )}
              {data?.imagesection && (
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
                          {data?.imagesection?.image1 && (
                            <PhotographicStyledImage
                              image={data?.imagesection?.image1}
                            />
                          )}
                          {data?.imagesection?.image2 && (
                            <PhotographicStyledImage
                              image={data?.imagesection?.image2}
                            />
                          )}
                          {data?.imagesection?.image3 && (
                            <PhotographicStyledImage
                              image={data?.imagesection?.image3}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              )}
              {data?.videotestimonials && (
                <Videotestimonials className="pt-0" data={data?.videotestimonials} />
              )}

              <Image src={movieIllus} className={"illus-image"} alt="bday" />
            </div>
            <div className="black-gr-div">
              {data?.faqsection && <FaqSection className="pt-80" data={data?.faqsection} />}
              <OurLocationSec className="sec-padding-top" title="About Our <span>Our Location</span>" />
              <BlogSlider className="pb-0" />
              <LogoSec className="pt-80 pb-0" title={"In the <span>News</span>"} />
              {data?.footersection && (
                <PartyGetInTouch
                  img={nightIllus}
                  data={data?.footersection}
                  // noTextBottom={true}
                  privacyLine={true}
                  type="birthday"
                />
              )}
            </div>
          </>
        )
      }

    </>
  );
};

export default page;
