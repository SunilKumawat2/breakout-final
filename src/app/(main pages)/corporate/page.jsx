"use client";
import dynamic from "next/dynamic";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
const LogoSec = dynamic(() => import("@/components/LogoSec"));
const HmTextSec = dynamic(() => import("@/components/home/HmTextSec"));
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
// const TrustedSection = dynamic(() => import("@/components/TrustedSection"));
import TrustedSection from "@/components/TrustedSection"
import IllusHome from "@/images/illus-home.svg";
const FaqSection = dynamic(() => import("@/components/FaqSection"));
import starIcon from "@/images/star-icon.svg";
import PartyIcon from "@/images/party-icon.svg";
import handshake from "@/images/handshake.svg";

import MovieIllus from "@/images/moview-illus.svg";
const OurLocationSec = dynamic(() => import("@/components/OurLocationSec"));
import api from "@/app/helpers/api";

import { useEffect, useState } from "react";
import illus4 from "@/images/illus-party-bottom.svg";
const BirthdayGetInTouch = dynamic(() => import("@/components/BirthdayGetInTouch"));
import Head from "next/head";

export default function Home() {
  const [data, setData] = useState(null);
  const [cards, setCards] = useState([]);
  const [brandLogos, setBrandLogos] = useState(null);
  const [loading, setLoading] = useState(true);
  const locationRef = useRef(null);
  const [locationReady, setLocationReady] = useState(false);
  const lookingForOptions = [
    { value: "Koramangala", label: "Koramangala" },
    { value: "J P Nagar", label: "J P Nagar" },
    { value: "Whitefield", label: "Whitefield" },
  ];

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        const [corporateRes, logoRes] =
          await Promise.all([
            api.get("/corporate-archive"),
            api.get("logos/brands"),
          ]);
  
        if (ignore) return;
        const corporateData =
          corporateRes?.data?.data || {};
        setData(corporateData);
        setBrandLogos(
          logoRes?.data?.data || []
        );
  
        setCards([
          {
            title: "Unwind",
            img:
              corporateData?.bannersection
                ?.unwindimage || "",
            link: "/corporate/unwind",
          },
          {
            title: "Retreats",
            img:
              corporateData?.bannersection
                ?.retreatsimage || "",
            link: "/corporate/retreat",
          },
          {
            title: "Connect",
            img:
              corporateData?.bannersection
                ?.connectimage || "",
            link:
              "/corporate/connect-l-n-d",
          },
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };
  
    fetchData();
  
    return () => {
      ignore = true;
    };
  }, []);


  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.2, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const TiltCard = ({ children }) => {
    const defaultOptions = {
      reverse: false,
      max: 17.5,
      perspective: 1000,
      scale: 1,
      speed: 1000,
      transition: true,
      axis: null,
      reset: true,
      easing: "cubic-bezier(.03,.98,.52,.99)",
      glare: true,
      maxGlare: 0.5,
    };

    return <Tilt options={defaultOptions}>{children}</Tilt>;
  };

  const trustedData = [
    {
      title: " Joyful reviews",
      icon: starIcon,
      number: "10.5k +",
    },
    {
      title: "Parties Hosted",
      icon: PartyIcon,
      number: "1657 +",
    },
    {
      title: "Companies Served",
      icon: handshake,
      number: "850 +",
    },
  ];

  useEffect(() => {
    if (loading) return; // ⛔ wait until page content renders
    const element = locationRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setLocationReady(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [loading]); // 👈 depend only on loading

  return (
    <>
    <Head>
      <link
        rel="canonical"
        href="https://breakout.in/corporate"
      />
    </Head>
      {
        loading ? (
          <div id="preloader">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            <div className="black-gr-div">
              {data?.bannersection && (
                <header className="hm-header section-padding">
                  <div className="container">
                    <motion.div
                      className="row"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                    >
                      <div className="col-lg-12 col-12 text-center">
                        {/* <Revolvingtext text="Set Your" /> */}
                        <h1
                          className="sec-head text-center"
                          dangerouslySetInnerHTML={{
                            __html: data?.bannersection?.heading,
                          }}
                        />
                        <p
                          className="para big mb-40"
                          dangerouslySetInnerHTML={{
                            __html: data?.bannersection?.description,
                          }}
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      className="row row-gap-25"
                      variants={staggerContainer}
                      initial="initial"
                      animate="animate"
                    >
                      {cards.map((card, index) => (
                        <motion.div
                          className="col-lg-4 col-12"
                          key={index}
                          variants={fadeInUp}
                        >
                          {/* <TiltCard> */}
                          <div className="hm-card">
                            {/* Image Click */}
                            <Link
                              href={card?.link}
                              className="hm-card-img"
                              onClick={() => {
                                window.dataLayer = window.dataLayer || [];
                                window.dataLayer.push({
                                  event: "cta_click",
                                  button_name: `${card.title} - Image`,
                                  destination: card?.link,
                                  page: window.location.pathname,
                                  section: "home_cards",
                                });
                              }}
                            >
                              {card?.img && card?.img !== "" && (
                                <Image
                                  src={card?.img}
                                  width={500}
                                  height={500}
                                  alt={card.title}
                                />
                              )}
                            </Link>

                            {/* Button Click */}
                            <Link
                              href={card.link}
                              className="main-btn wide"
                              onClick={() => {
                                window.dataLayer = window.dataLayer || [];
                                window.dataLayer.push({
                                  event: "cta_click",
                                  button_name: `${card.title} - Button`,
                                  destination: card?.link,
                                  page: window.location.pathname,
                                  section: "home_cards",
                                });
                              }}
                            >
                              <span>{card.title}</span>
                            </Link>
                          </div>
                          {/* </TiltCard> */}
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </header>
              )}
              {data?.bannersection?.content && (
                <HmTextSec home={true} text={data?.bannersection?.content} />
              )}
              {/* {data?.bannersection?.note && (
          <div className="container pb-5">
            <div className="row justify-content-center">
              <div className="col-lg-12 col-12">
                <div className="cus-card">
                  <p
                    className="para mb-0"
                    style={{ fontStyle: "italic", cursor: "pointer" }}
                  >
                    <span>{data?.bannersection?.note}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )} */}
              {data?.bannersection?.note && (
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-12 col-12">
                      <div className="cus-card">
                        <p
                          className="para mb-0"
                          style={{ fontStyle: "italic" }}
                          dangerouslySetInnerHTML={{
                            __html: data?.bannersection?.note.replace(
                              /<a /g,
                              '<a target="_blank" rel="noopener noreferrer" '
                            ),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <Image src={MovieIllus} className="illus-image" alt="illus-home" />
            </div>
            <div className="black-gr-div">
              {data?.countersection && <TrustedSection className="sec-padding-top pb-0" data={data?.countersection} />}
              <LogoSec className="pt-80 pb-0"
                // title={"<span>Brands</span> Hosted"}
                title={"<span>Brands</span> Hosted"}
                logos={brandLogos}
                link={false}
              />
              <Image
                src={IllusHome}
                className="illus-image"
                style={{ marginBottom: "-1px" }}
                alt="illus-home"
              />
            </div>
            <div className="black-gr-div">
              <div
                ref={locationRef}
                style={{ minHeight: "400px" }}  // 👈 important
              >
                {locationReady && (
                  <OurLocationSec
                    className="sec-padding-top"
                    title="Choose a <span>Location</span>"
                  />
                )}
              </div>
              {data?.faqsection && <FaqSection className="section-padding pb-0"
                data={data?.faqsection} />}
              <LogoSec className="pt-80 pb-0"
                title={"<span>In the</span> News"}
                logo={data?.brandLogo}
                link={true}
              />
              {data?.footersection && (
                <BirthdayGetInTouch
                  className="p"
                  img={illus4}
                  textData={data?.footersection}
                  noTextBottom={true}
                  atOptions={lookingForOptions}
                  privacyLine={true}
                  page_type="corporate"
                />
              )}


            </div>
          </>
        )
      }

    </>
  );
}
