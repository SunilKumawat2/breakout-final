"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import InnerPageBanner from "@/components/InnerPageBanner";
import Image from "next/image";
import HmTextSec from "@/components/home/HmTextSec";
import LogoSec from "@/components/LogoSec";
const BlogSlider = dynamic(() => import("@/components/BlogSlider"));
import Link from "next/link";
// import bdayIllus from "@/images/bday-illus.svg";
import bdayIllus from "@/images/illus-home.svg";

import corpIllus from "@/images/corp-illus.svg";
const BirthdayGetInTouch = dynamic(() => import("@/components/BirthdayGetInTouch"));
const Videotestimonials = dynamic(() => import("@/components/Videotestimonials"));
const FaqSection = dynamic(() => import("@/components/FaqSection"));
const Packages = dynamic(() => import("@/components/Packages"));
const PartyExpertCon = dynamic(() => import("@/components/PartyExpertCon"));
const OurLocationSec = dynamic(() => import("@/components/OurLocationSec"));
const AddOnsSlider = dynamic(() => import("@/components/AddOnsSlider"));
const BreakoutXForm = dynamic(() => import("@/components/BreakoutXForm"));
import trophyIllus from "@/images/trophy-illus.svg";
import api from "@/helpers/api";
const GReviewSlider = dynamic(() => import("@/components/GReviewSlider"));
const TrustedSection = dynamic(() => import("@/components/TrustedSection"));
const PhotographicStyledImage = dynamic(() => import("@/components/PhotographicStyledImage"));
import WordByWordAnimation from "@/helpers/WordByWordAnimation";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalContext";
import Head from "next/head";

const page = () => {
  const page_type = "corporate";
  const [corporate, setCorporate] = useState([]);
  console.log("corporate_corporate_corporate", corporate)
  const [brandLogos, setBrandLogos] = useState(null);
  const [loading, setLoading] = useState(true);
  const { gettncs } = useGlobalContext();
  console.log("sjkdfhjsdhfhsdfhsdf_gettncs", gettncs)
  const corporateTnc = gettncs?.find(
    (item) => item.reference == "corporate"
  );

  console.log("Birthday T&C:", corporateTnc);

  // useEffect(() => {
  //   const fetchCorporate = async () => {
  //     const response = await api.get("corporate-unwind-archive");
  //     setCorporate(response.data.data);
  //   };
  //   fetchCorporate();
  //   const fetchBrandLogos = async () => {
  //     const response = await api.get("logos/brands");
  //     setBrandLogos(response.data.data);
  //   };
  //   fetchBrandLogos();
  // }, []);

  useEffect(() => {
    const fetchCorporate = async () => {
      try {
        setLoading(true);

        // Call both APIs in parallel
        const [corporateRes, brandRes] = await Promise.all([
          api.get("corporate-unwind-archive"),
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

  const headingTemplate =
    corporate?.contentsection?.heading ||
    "Unwind, Collaborate, and Elevate: <span>Corporate Retreats</span>";
  const router = useRouter();

  // const animatedHeading = WordByWordAnimation(headingTemplate);

  return (
    <>
      <Head>
      <link
        rel="canonical"
        href="https://breakout.in/corporate/unwind"
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
                        {/* <h3
                    className="sec-head"
                    dangerouslySetInnerHTML={{
                      __html: corporate?.contentsection?.heading,
                    }}
                  >
                    {animatedHeading}
                   
                  </h3> */}
                        <WordByWordAnimation className="sec-head mb-0" headingTemplate={headingTemplate} />
                      </div>
                    </div>
                  </div>
                </section>
              )}
              {corporate && corporate?.googlereviews && (
                <div className="pt-80">
                  <GReviewSlider commonStars={false} data={corporate?.googlereviews} />
                </div>
              )}
              {corporate?.contentsection?.content && (
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
                          onClick={() =>
                            router.push("/founder-message/corporate-page")
                          }
                          style={{ cursor: "pointer" }}
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
                className="pb-0 pt-80"
                title="Brands <span>Hosted</span>"
                link={false}
                logos={brandLogos}
              />

              <PartyExpertCon className="pt-80" data="corporate_unwind" />

              <Image src={bdayIllus} className={"illus-image"} alt="bday" />
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
                          <Link
                            // href={bd?.game_link}
                            href={bd?.game_link}
                            // target="_blank"
                            className="col-lg-4 col-6"
                            key={index}
                            onClick={() => {
                              window.dataLayer = window.dataLayer || [];
                              window.dataLayer.push({
                                event: "cta_click",
                                button_name: bd?.heading?.replace(/<[^>]*>/g, ""), // clean HTML
                                destination: "external_game_link",
                                link_url: bd?.game_link,
                                page: window.location.pathname,
                                section: "game_cards",
                              });
                                sessionStorage.setItem("page_type", page_type);
                            }}
                          >
                            <div>
                              <div className="location-card">
                                <div className="location-card-img">
                                  {bd.image && (
                                    <Image
                                      src={bd.image}
                                      width={800}
                                      height={800}
                                      alt={bd.heading}
                                    />
                                  )}
                                </div>

                                <div className="location-card-content">
                                  <h3
                                    dangerouslySetInnerHTML={{ __html: bd.heading }}
                                  />
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                </section>
              )}
              {corporate && corporate?.addonssection && (
                <AddOnsSlider className="pt-80" data={corporate?.addonssection} />
              )}
              {corporate && corporate?.packagesection && (
                <Packages className="pb-0" packages={corporate?.packagesection} 
                data={corporateTnc} category="corporate-package" pagecategory="corporate"/>
              )}
              {/* <BreakoutXForm className="pb-0"/> */}
              <div id="breakout-form">
                <BreakoutXForm className="pb-0" />
              </div>

              <Image src={corpIllus} alt="illus3" className="illus-image" />
            </div>
            <div className="black-gr-div">
              {corporate && corporate?.whyussection && (
                <section className="why-us sec-padding-top">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12 text-center">
                        <h3
                          className="sec-head medium sm-head"
                          dangerouslySetInnerHTML={{
                            __html: corporate?.whyussection?.heading,
                          }}
                        />
                      </div>
                    </div>
                    <div className="why-choose-grid grid-5">
                      {corporate?.whyussection?.images &&
                        corporate?.whyussection?.images?.length > 0 &&
                        corporate?.whyussection?.images?.map((item, index) => (
                          <div className="why-card" key={index}>
                            {item.image && (
                              <Image
                                src={item.image}
                                width={100}
                                height={100}
                                alt={item.heading}
                              />
                            )}
                            <h3 dangerouslySetInnerHTML={{ __html: item.heading }} />
                          </div>
                        ))}
                    </div>
                  </div>
                </section>
              )}

              {corporate && corporate?.comparesection && (
                <section className="section-padding compare-section pb-0">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12 text-center">
                        <h3
                          className="sec-head medium sm-head"
                          dangerouslySetInnerHTML={{
                            __html: corporate?.comparesection?.heading,
                          }}
                        />
                      </div>
                    </div>
                    <div className="row row-gap-25">
                      <div className="col-lg-6 col-6">
                        <div className="vs-col">
                          <div className="vs-col-card">
                            <h3>
                              {corporate?.comparesection?.left_heading ||
                                "Any Other Place"}
                            </h3>
                          </div>
                          <div className="vs-col-card">
                            <ul>
                              {corporate?.comparesection?.content &&
                                corporate?.comparesection?.content.map(
                                  (item, idx) => <li key={idx}>{item.left_point}</li>
                                )}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-6">
                        <div className="vs-col break">
                          <div className="vs-col-card">
                            <h3>
                              {corporate?.comparesection?.right_heading ||
                                "At Breakout"}
                            </h3>
                          </div>
                          <div className="vs-col-card">
                            <ul>
                              {corporate?.comparesection?.content &&
                                corporate?.comparesection?.content.map(
                                  (item, idx) => (
                                    <li key={idx}>
                                      {item.right_image && (
                                        <Image
                                          src={item.right_image}
                                          alt="compare-right-img"
                                          width={40}
                                          height={40}
                                          style={{
                                            marginRight: 12,
                                            verticalAlign: "middle",
                                          }}
                                        />
                                      )}
                                      <span>{item.right_point}</span>
                                    </li>
                                  )
                                )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* <PartyExpertCon /> */}

              {corporate && corporate?.imagesection && (
                <>
                  <section className="section-padding capture-sec pb-0">
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
                <Videotestimonials data={corporate?.videotestimonials} />
              )}
              <Image src={corpIllus} className={"illus-image"} alt="bday" />
            </div>
            <div className="black-gr-div">
              <OurLocationSec className="sec-padding-top" title="About Our <span>Our Location</span>" />
              {corporate && corporate?.faqsection && (
                <FaqSection className="pb-0 section-padding" data={corporate?.faqsection} />
              )}

              <BlogSlider className="pb-0" />
              <LogoSec className="pt-80 pb-0" title="In the <span>News</span>" />

              <BirthdayGetInTouch
                img={trophyIllus}
                privacyLine={true}
                noTextBottom={true}
                textData={corporate?.footersection}
                page_type="corporate"
              />
            </div>
          </>
        )
      }

    </>
  );
};

export default page;
