"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import homeIllus from "@/images/illus-home.svg";
import corpIllus from "@/images/corp-illus.svg";
const LogoSec = dynamic(() => import("@/components/LogoSec"));
const InnerPageBanner = dynamic(() => import("@/components/InnerPageBanner"));
const HmTextSec = dynamic(() => import("@/components/home/HmTextSec"));
const VisitLocations = dynamic(() => import("@/components/VisitLocations"));
const BirthdayGetInTouch = dynamic(() => import("@/components/BirthdayGetInTouch"));
const Videotestimonials = dynamic(() => import("@/components/Videotestimonials"));
const FaqSection = dynamic(() => import("@/components/FaqSection"));
const PartyExpertCon = dynamic(() => import("@/components/PartyExpertCon"));
import peopleIllus from "@/images/people-illus.svg";
import trophyIllus from "@/images/trophy-illus.svg";
import api from "@/helpers/api";
const GReviewSlider = dynamic(() => import("@/components/GReviewSlider"));
const TrustedSection = dynamic(() => import("@/components/TrustedSection"));
const PhotographicStyledImage = dynamic(() => import("@/components/PhotographicStyledImage"));
import WordByWordAnimation from "@/helpers/WordByWordAnimation";
import Head from "next/head";

const page = () => {
  const page_type = "corporate";
  const [corporate, setCorporate] = useState(null);
  const [brandLogos, setBrandLogos] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchCorporate = async () => {
      try {
        setLoading(true);

        // Call both APIs together (faster)
        const [corporateRes, brandRes] = await Promise.all([
          api.get("corporate-retreat-archive"),
          api.get("logos/brands"),
        ]);

        setCorporate(corporateRes?.data?.data || []);
        setBrandLogos(brandRes?.data?.data || []);
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCorporate();
  }, []);

  const atOptions = [
    { value: "The Hub (Our Office)", label: "The Hub (Our Office)" },
    { value: "The Getaway (At a Resort)", label: "The Getaway (At a Resort)" },
    { value: "The Grandeur (In a Hotel)", label: "The Grandeur (In a Hotel)" },
  ];

  const headingTemplate =
    corporate?.contentsection?.heading ||
    "Unwind, Collaborate, and Elevate: <span>Corporate Retreats</span>";

  // const animatedHeading = WordByWordAnimation(headingTemplate);

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href="https://breakout.in/corporate/retreat"
        />
      </Head>
      {
        loading ? (
          <div id="preloader">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            {corporate && corporate?.bannersection && (
              <InnerPageBanner banner={corporate?.bannersection} bdayInner={true} />
            )}

            <div className="black-gr-div">
              {corporate && corporate?.contentsection && (
                <section className="pt-80">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12 text-center">
                        {/* <h3 className="sec-head">{animatedHeading}</h3> */}
                        <WordByWordAnimation className="sec-head mb-0" headingTemplate={headingTemplate} />
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {corporate &&
                corporate?.googlereviews &&
                corporate?.googlereviews?.length > 0 && (
                  <div className="pt-80">
                    <GReviewSlider
                      commonStars={false}
                      data={corporate?.googlereviews}
                    />
                  </div>

                )}

              {corporate && corporate?.contentsection && (
                <HmTextSec className="pt-80" text={corporate?.contentsection?.content} />
              )}
              <section>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 ">
                      <div className="bday-text-wrap">
                        <p
                          className="underline-big-text"
                          dangerouslySetInnerHTML={{
                            __html: corporate?.contentsection?.note,
                          }}
                        />
                      </div>
                      <p
                        className="sec-head medium-20 pt-80"
                        dangerouslySetInnerHTML={{
                          __html: corporate?.contentsection?.footer,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {corporate && corporate?.countersection && (
                <TrustedSection className="pb-0" data={corporate?.countersection} />
              )}

              {/* 
        <section className="section-padding bday-count-sec pb-0">
          <div className="container">
            <div className="row row-gap-25">
              {[...Array(4)].map((_, index) => (
                <div className="col-lg-3 col-6" key={index}>
                  <CounterBox key={index} bday={false} />
                </div>
              ))}
            </div>
          </div>
        </section> */}

              <LogoSec
                className="pt-80 pb-0"
                title="Brands <span>Hosted</span>"
                link={false}
                logos={brandLogos}
              />

              <PartyExpertCon className="pt-80" data="corporate" />

              <Image src={homeIllus} className={"illus-image"} alt="bday"  loading="lazy"/>
            </div>

            <div className="black-gr-div">
              {corporate && corporate?.imagecardsection && (
                <section className="sec-padding-top bday-sec">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12 text-center">
                        <h3
                          className="sec-head medium sm-head"
                          dangerouslySetInnerHTML={{
                            __html: corporate?.imagecardsection?.heading,
                          }}
                        />
                      </div>
                    </div>
                    <div className="row row-gap-25">
                      {corporate?.imagecardsection?.images &&
                        corporate?.imagecardsection?.images?.length > 0 &&
                        corporate?.imagecardsection?.images?.map((bd, index) => (
                          <div className="col-lg-4 col-12" key={index}>
                            <Link
                              href="#book-now"
                              className="location-card"
                              onClick={() => {
                                window.dataLayer = window.dataLayer || [];
                                window.dataLayer.push({
                                  event: "cta_click",
                                  button_name: bd?.heading?.replace(/<[^>]*>/g, ""), // clean HTML
                                  destination: "#book-now",
                                  page: window.location.pathname,
                                  section: "book_now_scroll",
                                });
                              }}
                            >
                              <div className="location-card-img">
                                {bd.image && (
                                  <Image
                                    src={bd.image}
                                    width={800}
                                    height={800}
                                    alt={bd.heading}
                                     loading="lazy"
                                  />
                                )}
                              </div>

                              <div className="location-card-content">
                                <h3
                                  dangerouslySetInnerHTML={{ __html: bd.heading }}
                                />
                              </div>
                            </Link>
                          </div>
                        ))}
                    </div>
                  </div>
                </section>
              )}
              {corporate && corporate?.choicessection && (
                <section className="section-padding bday-sec">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12 text-center">
                        <h3
                          className="sec-head medium sm-head"
                          dangerouslySetInnerHTML={{
                            __html: corporate?.choicessection?.heading,
                          }}
                        />
                      </div>
                    </div>
                    <div className="row row-gap-25">
                      {corporate?.choicessection?.images &&
                        corporate?.choicessection?.images?.length > 0 &&
                        corporate?.choicessection?.images?.map((bd, index) => (
                          <div className="col-lg-4 col-12" key={index}>
                            {
                              bd?.heading != "Escape Rooms" && (
                                <Link
                                  // href={`${bd?.game_link}`}
                                  href={bd?.game_link}
                                  // target="_blank"
                                  onClick={() => {
                                    window.dataLayer = window.dataLayer || [];
                                    window.dataLayer.push({
                                      event: "cta_click",
                                      button_name: bd?.heading?.replace(/<[^>]*>/g, ""), // clean HTML
                                      destination: `escape-rooms/${bd?.slug}`,
                                      page: window.location.pathname,
                                      section: "escape_rooms_cards",
                                    });
                                    sessionStorage.setItem("page_type", page_type);
                                  }}
                                >
                                  <div className="location-card">
                                    <div className="location-card-img">
                                      {bd.image && (
                                        <Image
                                          src={bd.image}
                                          width={800}
                                          height={800}
                                          alt={bd.heading}
                                           loading="lazy"
                                        />
                                      )}
                                    </div>

                                    <div className="location-card-content">
                                      <h3
                                        dangerouslySetInnerHTML={{ __html: bd.heading }}
                                      />
                                    </div>
                                  </div>
                                </Link>
                              )
                            }
                            {
                              bd?.heading == "Escape Rooms" && (
                                <Link
                                  href="/escape-rooms"
                                  onClick={() => {
                                    window.dataLayer = window.dataLayer || [];
                                    window.dataLayer.push({
                                      event: "cta_click",
                                      button_name: bd?.heading?.replace(/<[^>]*>/g, ""), // clean HTML
                                      destination: "/escape-rooms",
                                      page: window.location.pathname,
                                      section: "escape_rooms_main_card",
                                    });
                                  }}
                                >
                                  <div className="location-card">
                                    <div className="location-card-img">
                                      {bd.image && (
                                        <Image
                                          src={bd.image}
                                          width={800}
                                          height={800}
                                          alt={bd.heading}
                                           loading="lazy"
                                        />
                                      )}
                                    </div>

                                    <div className="location-card-content">
                                      <h3
                                        dangerouslySetInnerHTML={{ __html: bd.heading }}
                                      />
                                    </div>
                                  </div>
                                </Link>
                              )
                            }
                          </div>
                        ))}
                    </div>
                  </div>
                </section>
              )}
              {corporate &&
                corporate?.readytotransformyourteamsection &&
                corporate?.readytotransformyourteamsection?.heading && (
                  <section className="">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12 ">
                          <h3
                            className="sec-head medium text-center sm-head"
                            dangerouslySetInnerHTML={{
                              __html:
                                corporate?.readytotransformyourteamsection?.heading ||
                                "",
                            }}
                          />
                          <p
                            className="sec-head medium-20"
                            dangerouslySetInnerHTML={{
                              __html:
                                corporate?.readytotransformyourteamsection
                                  ?.description || "",
                            }}
                          ></p>
                        </div>
                      </div>
                    </div>
                  </section>
                )}
              {/* <HomeContact noTextBottom={false} privacyLine={false} noImage={true} /> */}
              <BirthdayGetInTouch
                className="pt-80 pb-0"
                noImage={true}
                privacyLine={true}
                atOptions={atOptions}
                page_type="corporate"
              />

              <Image src={corpIllus} alt="illus3" className="illus-image"  loading="lazy" />
            </div>
            <div className="black-gr-div">
              {corporate && corporate?.whychooseussection && (
                <section className="whychoose sec-padding-top">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12 text-center">
                        <h3
                          className="sec-head medium sm-head"
                          dangerouslySetInnerHTML={{
                            __html: corporate?.whychooseussection?.heading,
                          }}
                        />
                      </div>
                    </div>
                    <div className="why-choose-grid grid-5">
                      {corporate?.whychooseussection?.images &&
                        corporate?.whychooseussection?.images?.length > 0 &&
                        corporate?.whychooseussection?.images?.map((item, index) => (
                          <div className="why-card" key={index}>
                            {item.image && (
                              <Image
                                src={item.image}
                                width={100}
                                height={100}
                                alt={item.heading}
                                 loading="lazy"
                              />
                            )}
                            <h3 dangerouslySetInnerHTML={{ __html: item.heading }} />
                          </div>
                        ))}
                    </div>
                  </div>
                </section>
              )}

              {corporate && corporate?.imagesection && (
                <>
                  <section className="section-padding pb-0">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12 text-center">
                          <h3
                            className="sec-head sm-head medium"
                            dangerouslySetInnerHTML={{
                              __html: "<span>Sneak peek </span>into Our Programs",
                            }}
                          ></h3>
                        </div>
                      </div>
                      <div className="row">
                        <div className="photographic-styled-image-container">
                          {corporate?.imagesection?.image1 && (
                            <PhotographicStyledImage
                              image={corporate?.imagesection?.image1}
                            />
                          )}
                          {corporate?.imagesection?.image2 && (
                            <PhotographicStyledImage
                              image={corporate?.imagesection?.image2}
                            />
                          )}
                          {corporate?.imagesection?.image3 && (
                            <PhotographicStyledImage
                              image={corporate?.imagesection?.image3}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              )}

              {corporate && corporate?.videotestimonials && (
                <Videotestimonials className="pb-0" data={corporate?.videotestimonials} />
              )}

              <Image src={peopleIllus} className={"illus-image"} alt="bday"  loading="lazy" />
            </div>
            <div className="black-gr-div">
              {corporate && corporate?.faqsection && (
                <FaqSection className="sec-padding-top" data={corporate?.faqsection} />
              )}

              <VisitLocations className="section-padding corp-retreat"
                title="Select Your <span>Preferred Location</span>"
                desc="Still considering hosting an experience at one of Breakout® experiential centers?"
                isVirtual={false}
              />

              {corporate && corporate?.footersection && (
                <section className="">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12 text-center">
                        <h3
                          className="sec-head medium sm-head"
                          dangerouslySetInnerHTML={{
                            __html: corporate?.footersection?.heading,
                          }}
                        />
                        <div
                          className="para medium-20 mt-3"
                          dangerouslySetInnerHTML={{
                            __html: corporate?.footersection?.content,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              )}
              <Image src={trophyIllus} className={"illus-image"} alt="bday"  loading="lazy" />
            </div>
          </>
        )
      }

    </>
  );
};

export default page;
