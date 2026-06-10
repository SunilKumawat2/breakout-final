"use client";
import React, { useEffect, useState, useRef } from "react";
import InnerPageBanner from "@/components/InnerPageBanner";
import Image from "next/image";
import HmTextSec from "@/components/home/HmTextSec";
import LogoSec from "@/components/LogoSec";
import BlogSlider from "@/components/BlogSlider";
import Link from "next/link";
import bdayIllus from "@/images/bday-illus.svg";
import PartyGetInTouch from "@/components/PartyGetInTouch";
import ReadyToGoPlans from "@/components/ReadyToGoPlans";
import Videotestimonials from "@/components/Videotestimonials";
import FaqSection from "@/components/FaqSection";
import nightIllus from "@/images/night-illus.svg";
import Packages from "@/components/Packages";
import PartyExpertCon from "@/components/PartyExpertCon";
import OurLocationSec from "@/components/OurLocationSec";
import loveIllus from "@/images/love-illus.svg";
import api from "@/helpers/api";
import TrustedSection from "@/components/TrustedSection";
import GReviewSlider from "@/components/GReviewSlider";
import PhotographicStyledImage from "@/components/PhotographicStyledImage";
import farewellIllus from "@/images/farewell_illus.png";
import WordByWordAnimation from "@/helpers/WordByWordAnimation";
import { useGlobalContext } from "@/context/GlobalContext";
import Head from "next/head";

const page = () => {
  const [party, setParty] = useState(null);
  const { gettncs } = useGlobalContext();

  const birthdayTnc = gettncs?.find(
    (item) => item.reference == "birthdays"
  );

  console.log("Birthday T&C:", birthdayTnc);
  useEffect(() => {
    const fetchParty = async () => {
      const response = await api.get(`party/farewell-archive`);
      setParty(response.data.data);
    };
    fetchParty();
  }, []);

  // --- REWRITE: Fix word by word animation for heading ---

  // Use a more robust approach with React state and effect, and avoid direct DOM manipulation.
  // We'll use a state to hold the current phrase and the current word index, and animate via setTimeout.

  // Extract phrases from the <span>...</span> in the heading itself, split by '|', and animate them

  // Get the heading template from API if available, else fallback to default
  const headingTemplate =
    party?.countersection?.heading ||
    "Make ‘your love’ feel<br /><span>special! | Farewell | One-of-a-kind? | Memories | Memories Last Forever</span>";

  // const animatedHeading = WordByWordAnimation(headingTemplate);

  return (
    <>
     <Head>
      <link
        rel="canonical"
        href="https://breakout.in/parties/farewell"
      />
    </Head>
      {party && party?.bannersection && (
        <InnerPageBanner banner={party?.bannersection} bdayInner={true} />
      )}

      <div className="black-gr-div">
        {party && party?.countersection && (
          <section className="section-padding pb-0">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  {/* <h3
                    className="sec-head"
                    style={{ minHeight: 60 }}
                    dangerouslySetInnerHTML={{ __html: animatedHeading }}
                  /> */}
                  {/* <h3 className="sec-head" style={{ minHeight: 60 }}>
                    {animatedHeading}
                  </h3> */}
                  <WordByWordAnimation headingTemplate={headingTemplate} />
                </div>
              </div>
            </div>
          </section>
        )}
        {party && party?.countersection && (
          <HmTextSec text={party?.countersection?.content} />
        )}
        {/* {party && party?.countersection && (
          <div className="container">
            <div className="bday-text-wrap">
              <p
                className="underline-big-text"
                dangerouslySetInnerHTML={{
                  __html: party?.countersection?.note,
                }}
              ></p>
            </div>
          </div>
        )} */}

        {party && party?.countersection && (
          <TrustedSection className="" data={party?.countersection} removeHeading={true} />
        )}

        {/* <section className="section-padding bday-count-sec pb-0">
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

        {party && party?.imagecardsection && (
          <section className="bday-sec">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <h3
                    className="sec-head medium sm-head"
                    dangerouslySetInnerHTML={{
                      __html:
                        party?.imagecardsection?.heading || "Is it party for a",
                    }}
                  />
                </div>
              </div>
              <div className="row row-gap-25 justify-content-center">
                <div className="col-lg-8 col-12">
                  <div className="row row-gap-25">
                    {party?.imagecardsection?.images &&
                      party?.imagecardsection?.images?.length > 0 &&
                      party?.imagecardsection?.images?.map((item, index) => (
                        <div className="col-lg-6 col-12" key={index}>
                          <Link href={`${item?.link}`} target="_blank">
                          <div className="location-card">
                            <div className="location-card-img">
                              {item.image && (
                                <Image
                                  src={item.image}
                                  width={500}
                                  height={500}
                                  alt={item.heading}
                                />
                              )}
                            </div>
                            <div className="location-card-content">
                              <h3
                                dangerouslySetInnerHTML={{
                                  __html: item.heading,
                                }}
                              />
                            </div>
                          </div>
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <Image src={farewellIllus} className={"illus-image"} alt="bday" />
      </div>

      <div className="black-gr-div">
        {party && party?.partyinclusions && (
          <section className="sec-padding-top bday-sec">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <h3
                    className="sec-head medium sm-head"
                    dangerouslySetInnerHTML={{
                      __html:
                        party?.partyinclusions?.heading ||
                        "Your Party <span>Inclusions</span>",
                    }}
                  />
                </div>
              </div>
              <div className="row row-gap-25">
                {party?.partyinclusions?.images &&
                  party?.partyinclusions?.images?.length > 0 &&
                  party?.partyinclusions?.images?.map((bd, index) => (
                    <div className="col-lg-4 col-12" key={index}>
                         <Link href={`${bd?.link}`} target="_blank">
                      <div className="location-card">
                        <div className="location-card-img">
                          {bd.image && (
                            <Image
                              src={bd.image}
                              width={700}
                              height={700}
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
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        )}

        <section className="section-padding bday-sec d-none">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h3
                  className="sec-head medium sm-head"
                  dangerouslySetInnerHTML={{
                    __html: "Add a <span>Theme Décor</span>",
                  }}
                />
              </div>
            </div>
            <div className="row mt-5 row-gap-25">
              {[...Array(4)].map((_, index) => (
                <div className="col-lg-3 col-12" key={index}>
                  <div className="location-card">
                    <div className="location-card-img">
                      {/* {bd.image && (
                            <Image
                              src={bd.image}
                              width={50}
                              height={50}
                              alt={bd.heading}
                            />
                          )} */}
                    </div>
                    <div className="location-card-content">
                      <h3 dangerouslySetInnerHTML={{ __html: "Classic" }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {party?.packagesection?.pricing?.columns?.length > 0 &&
          (() => {
            sessionStorage.setItem("category", "farewell");

            return (
              <Packages
                className="pb-0"
                packages={party?.packagesection}
                data={birthdayTnc}
                category="farewell-package"
              />
            );
          })()}

        {party && party?.googlereviews && (
          <div className="pt-80">
            <GReviewSlider commonStars={false} data={party?.googlereviews} />
          </div>
        )}

        <Image src={bdayIllus} alt="illus3" className="illus-image" />
      </div>
      <div className="black-gr-div">
        <PartyExpertCon className="sec-padding-top" data="birthday" />
        {party && party?.slidersection && (
          <ReadyToGoPlans data={party?.slidersection} />
        )}
        {party && party?.imagesection && (
          <>
            <section className="capture-sec">
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
                    {party?.imagesection?.image1 && (
                      <PhotographicStyledImage
                        image={party?.imagesection?.image1}
                      />
                    )}
                    {party?.imagesection?.image2 && (
                      <PhotographicStyledImage
                        image={party?.imagesection?.image2}
                      />
                    )}
                    {party?.imagesection?.image3 && (
                      <PhotographicStyledImage
                        image={party?.imagesection?.image3}
                      />
                    )}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
        {party && party?.videotestimonials && (
          <Videotestimonials data={party?.videotestimonials} />
        )}
        <Image src={loveIllus} className={"illus-image"} alt="bday" />
      </div>
      <div className="black-gr-div">
        {/* {JSON.stringify(party?.slug)} */}
        <OurLocationSec className="sec-padding-top" title="About Our <span>Our Location</span>" />
        {party && party?.faqsection && <FaqSection className="section-padding pb-0" data={party?.faqsection} />}
        <BlogSlider />
        <LogoSec className="py-0" />
        {party && party?.footersection && (
          <PartyGetInTouch
            img={nightIllus}
            noTextBottom={true}
            privacyLine={true}
            data={party?.footersection}
            type="birthday"
          />
        )}
        {/* {party && party?.footersection && (
          <BirthdayGetInTouch
            img={nightIllus}
            noTextBottom={true}
            textData={party?.footersection}
          />
        )} */}
      </div>
    </>
  );
};

export default page;
