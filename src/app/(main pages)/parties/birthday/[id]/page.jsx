"use client";
import React, { useEffect, useState } from "react";
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
import PeakExpSec from "@/components/PeakExpSec";
import VisitLocations from "@/components/VisitLocations";
import BlogSlider from "@/components/BlogSlider";
import HomeContact from "@/components/home/HomeContact";
import ReserveASlot from "@/components/ReserveASlot";
import locIcon from "@/images/loc-icon.svg";
import fdImg1 from "@/images/fd-img1.png";
import Link from "next/link";
import wh from "@/images/wh.svg";
import locPlace from "@/images/loc-place.svg";
import BirthdayBanner from "@/components/BirthdayBanner";
import bdayIllus from "@/images/bday-illus.svg";
import illus3402 from "@/images/illus3402.svg"

import whicon from "@/images/wh-icon.svg";
import phicon from "@/images/phone.svg";
import mailicon from "@/images/mail-icon.svg";

import bdayImg1 from "@/images/kid1.jpg";
import bdayImg2 from "@/images/kid2.jpg";
import bdayImg3 from "@/images/kid3.jpg";
import bdayImg4 from "@/images/kid4.jpg";
import bdayImg5 from "@/images/kid5.jpg";
import bdayImg6 from "@/images/kid6.jpg";
import bdayImg7 from "@/images/kid7.jpg";
import partyillus from "@/images/party-illus.svg";
import BirthdayGetInTouch from "@/components/BirthdayGetInTouch";
import PartySlider from "@/components/PartySlider";
import ReadyToGoPlans from "@/components/ReadyToGoPlans";
import Videotestimonials from "@/components/Videotestimonials";
import FaqSection from "@/components/FaqSection";

import nightIllus from "@/images/night-illus.svg";

import bdayBanner from "@/images/kid-banner.jpg";

import theme1 from "@/images/theme1.jpg";
import theme2 from "@/images/theme2.jpg";
import theme3 from "@/images/theme3.jpg";
import theme4 from "@/images/theme4.jpg";

import Packages from "@/components/Packages";

import PartyExpertCon from "@/components/PartyExpertCon";

import movieIllus from "@/images/movie-illus.svg";
import OurLocationSec from "@/components/OurLocationSec";
import coupleIllus from "@/images/couple-illus.svg";
import loveIllus from "@/images/love-illus.svg";
import { useParams } from "next/navigation";
import api from "@/helpers/api";
import TrustedSection from "@/components/TrustedSection";
import GReviewSlider from "@/components/GReviewSlider";
import PhotographicStyledImage from "@/components/PhotographicStyledImage";
import PartyGetInTouch from "@/components/PartyGetInTouch";
import WordByWordAnimation from "@/helpers/WordByWordAnimation";
import { useRouter, usePathname } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalContext";
import test_api from "@/helpers/api/test_api";
import Head from "next/head";

const page = () => {
  const { id } = useParams();
  const [party, setParty] = useState(null);
  console.log("brithday_party", id)
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const { gettncs } = useGlobalContext();

  const birthdayTnc = gettncs?.find(
    (item) => item.reference == "birthdays"
  );

  console.log("Birthday T&C:", birthdayTnc);

  useEffect(() => {
    if (!id) return; // prevent API call if id not available

    const fetchParty = async () => {
      try {
        setLoading(true);
        const response = await api.get(`birthday-inner/${id}`);
        setParty(response?.data?.data || null);
      } catch (err) {
        console.error("Birthday Inner API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchParty();
  }, [id]);

  const coupleOffering = [
    {
      title: "Anniversary",
      image: null,
    },
    {
      title: "Birthday",
      image: null,
    },
    {
      title: "Special Day",
      image: null,
    },
  ];

  const headingTemplate =
    party?.countersection?.heading ||
    "Unwind, Collaborate, and Elevate: <span>Corporate Retreats</span>";

  return (
    <>
     <Head>
      <link
        rel="canonical"
        href={`https://breakout.in/birthday/${id}`}
      />
    </Head>
      {
        loading ? (
          <div id="preloader">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            {party && party?.bannersection && (
              <InnerPageBanner banner={party?.bannersection} bdayInner={true} />
            )}

            <div className="black-gr-div">
              {party && party?.countersection && (
                <section className="pt-80 pb-0">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12 text-center">
                        {/* <h3
                    className="sec-head"
                    dangerouslySetInnerHTML={{
                      __html: party?.countersection?.heading,
                    }}
                  ></h3> */}
                        <WordByWordAnimation headingTemplate={headingTemplate} />
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {party && party?.countersection && (
                <HmTextSec className="pt-80" text={party?.countersection?.content} />
              )}
              {party && party?.countersection && id != "family-friends" && (
                <div className="container">
                  <div className="bday-text-wrap">
                    <p
                      className="underline-big-text"
                      onClick={() => router.push("/founder-message/birthday-party")}
                      style={{ cursor: "pointer" }}
                      dangerouslySetInnerHTML={{
                        __html: party?.countersection?.note,
                      }}
                    ></p>
                  </div>
                </div>
              )}

              {party && party?.countersection && (
                <TrustedSection className="pb-0" data={party?.countersection}
                  removeHeading={true} />
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

              {/* {pathname === "/parties/birthday/couple" && (
          <section className="section-padding bday-sec">
            <div className="container">
              <div className="row mt-5 row-gap-25">
                {coupleOffering.map((bd, index) => (
                  <div className="col-lg-4 col-12" key={index}>
                    <div className="location-card">
                      <div className="location-card-img">
                        {bd.image && <Image src={bd.image} alt={bd.title} />}
                      </div>
                      <div className="location-card-content">
                        <h3>{bd.title}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )} */}

              <Image src={bdayIllus} className={"illus-image"} alt="bday" />
            </div>

            <div className="black-gr-div">

              <>
                {party && party?.partyinclusions && party?.partyinclusions?.heading && (
                  <section className="pt-80 bday-sec">
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
                            <Link
                              href={bd.link}
                              key={index}
                              className="col-lg-4 col-md-6"
                              target="_blank"
                              onClick={() => {
                                window.dataLayer = window.dataLayer || [];
                                window.dataLayer.push({
                                  event: "cta_click",
                                  button_name: bd?.heading?.replace(/<[^>]*>/g, ""), // clean HTML
                                  destination: "external_party_inclusion",
                                  link_url: bd?.link,
                                  page: window.location.pathname,
                                  section: "party_inclusions",
                                });
                              }}
                            >
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
                          ))}
                      </div>
                    </div>
                  </section>
                )}</>

              {
                (id == "kids" || id == "toddlers" || id == "love") && (
                  <>
                    {party && party?.imagecardsection && (
                      <section className="sec-padding-top bday-sec">
                        <div className="container">
                          <div className="row">
                            <div className="col-lg-12 text-center">
                              <h3
                                className="sec-head medium sm-head"
                                dangerouslySetInnerHTML={{
                                  __html:
                                    party?.imagecardsection?.heading ||
                                    "Your Party <span>Inclusions</span>",
                                }}
                              />
                            </div>
                          </div>
                          <div className="row row-gap-25 justify-content-center">


                            {party?.imagecardsection?.images &&
                              party?.imagecardsection?.images?.length > 0 &&
                              party?.imagecardsection?.images?.map((bd, index) => (
                                <div className="col-lg-3 col-md-6" key={index}>
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
                  </>
                )
              }

              {party &&
                party?.packagesection &&
                party?.packagesection?.pricing?.columns?.length > 0 && (
                  <Packages
                  className="pb-0"
                  packages={party?.packagesection}
                  category={id == "love" ? "couple-package" : "birthday-party"}
                  data={birthdayTnc}
                />
                )}
              {party && party?.googlereviews && (
                <div className="pt-80">
                  <GReviewSlider commonStars={false} data={party?.googlereviews} />
                </div>
              )}

              <Image src={illus3402} alt="illus3" className="illus-image" />
            </div>
            <div className="black-gr-div">
              <PartyExpertCon className="sec-padding-top" data="birthday_party_subpage" />
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
              <OurLocationSec className="section-padding pb-0" title="About Our <span>Our Location</span>" />
              <Image src={movieIllus} className={"illus-image"} alt="bday" />
            </div>
            <div className="black-gr-div">
              {party && party?.faqsection &&
                <FaqSection className="sec-padding-top" data={party?.faqsection} />}
              <BlogSlider className="pb-0" />
              <LogoSec className="pt-80 pb-0" />
              {party && party?.footersection && (
                <PartyGetInTouch
                  img={nightIllus}
                  // noTextBottom={true}
                  textData={party?.footersection}
                  data={party?.footersection}
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
