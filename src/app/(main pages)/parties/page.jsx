"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
const HmTextSec = dynamic(() => import("@/components/home/HmTextSec"));
const TrustedSection = dynamic(() => import("@/components/TrustedSection"));
const LogoSec = dynamic(() => import("@/components/LogoSec"));
const FaqSection = dynamic(() => import("@/components/FaqSection"));
const OurLocationSec = dynamic(() => import("@/components/OurLocationSec"));
const PartyGetInTouch = dynamic(() => import("@/components/PartyGetInTouch"));

import MovieIllus from "@/images/moview-illus.svg";
import IllusHome from "@/images/illus-home.svg";
import IllusPartyBottom from "@/images/illus-party-bottom.svg";
import whArrow from "@/images/wh-arrow.svg";

import api from "@/app/helpers/api";
import Head from "next/head";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [data, setData] = useState(null);
  const [cards, setCards] = useState([]);
  const [collapse, setCollapse] = useState(null);
  const [animationRefreshKey, setAnimationRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const locationRef = useRef(null);
  const [locationReady, setLocationReady] = useState(false);


  /* ========================= FETCH DATA ========================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // start loader

        const [partyRes, birthdayRes] = await Promise.all([
          api.get("/party-archive"),
          api.get("/birthday-listing"),
        ]);
        const partyData = partyRes?.data?.data;
        const birthdayListData = birthdayRes?.data?.data;
        setData(partyData);
        setCards([
          {
            title: "Birthdays",
            img: partyData?.bannersection?.birthdayimage || "",
            link: "/parties/birthday",
            subItems: [
              { title: "Birthday", link: "/parties/birthday" },
              ...(birthdayListData?.length
                ? birthdayListData.map((bd) => ({
                  title: bd.title,
                  link: `/parties/birthday/${bd.slug}`,
                }))
                : []),
            ],
          },
          {
            title: "Bachelor(ette)",
            img: partyData?.bannersection?.bachelorimage || "",
            link: "/parties/bachelor",
            subItems: [
              { title: "Bachelor(ette)", link: "/parties/bachelor" },
              { title: "Bachelor", link: "/parties/bachelor" },
            ],
          },
          {
            title: "Farewell",
            img: partyData?.bannersection?.farewellimage || "",
            link: "/parties/farewell",
            subItems: [
              { title: "Family Members", link: "/parties/farewell" },
              { title: "Classmates", link: "/parties/farewell" },
              { title: "Colleagues", link: "/parties/farewell" },
              { title: "Friends", link: "/parties/farewell" },
            ],
          },
        ]);

      } catch (error) {
        console.error("Error fetching party data:", error);
      } finally {
        setLoading(false); // stop loader
      }
    };

    fetchData();
  }, []);


  /* ========================= RESTORE DROPDOWN STATE ========================= */
  useEffect(() => {
    const savedCollapse = sessionStorage.getItem("home_dropdown");
    if (savedCollapse) {
      setCollapse(savedCollapse); // <-- NO JSON.parse here
    } else {
      setCollapse(null);
    }
  }, []);

  /* ========================= RESTORE SCROLL POSITION ========================= */
  useEffect(() => {
    const savedScroll = sessionStorage.getItem("home_scroll");
    if (savedScroll) {
      window.scrollTo(0, parseInt(savedScroll, 10));
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    }
  }, []);

  /* ========================= SAVE SCROLL POSITION ========================= */
  useEffect(() => {
    const saveScroll = () => {
      sessionStorage.setItem("home_scroll", window.scrollY.toString());
    };
    window.addEventListener("beforeunload", saveScroll);
    return () => window.removeEventListener("beforeunload", saveScroll);
  }, []);

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



  /* ========================= ANIMATION VARIANTS ========================= */
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

  /* ========================= DROPDOWN HANDLER ========================= */
  const handleDropdownToggle = (cardTitle) => {
    setCollapse((prev) => {
      const newState = prev === cardTitle ? null : cardTitle;
      if (newState) {
        sessionStorage.setItem("home_dropdown", newState);
      } else {
        sessionStorage.removeItem("home_dropdown");
      }
      return newState;
    });
    setAnimationRefreshKey((prev) => prev + 1);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 350);
  };

  useEffect(() => {
    const shouldScroll = sessionStorage.getItem("parties_hero_sections");

    if (shouldScroll == "true") {
      // wait for DOM paint
      setTimeout(() => {
        const section = document.getElementById("parties-hero-section");

        if (section) {
          section.scrollIntoView({
            behavior: "auto", // use "smooth" if you want animation
            block: "start",
          });
        }

        // remove key so it doesn't auto-scroll again
        sessionStorage.removeItem("parties_hero_sections");
      }, 1000);
    }
  }, [data]);

  return (
    <>
     <Head>
      <link
        rel="canonical"
        href="https://breakout.in/parties"
      />
    </Head>
      {
        loading ? (
          <div id="preloader">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            {/* ================= HEADER SECTION ================= */}
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
                      onClick={() => sessionStorage.setItem("parties_hero_sections", true)}
                      id="parties-hero-section"
                    >
                      {cards.map((card, index) => (
                        <motion.div
                          className="col-lg-4 col-12"
                          key={index}
                        >
                          <div className="hm-card">

                            {/* ✅ Image Click */}
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
                                  section: "home_cards_dropdown",
                                });
                              }}
                            >
                              {card?.img && (
                                <Image
                                  src={card.img}
                                  width={500}
                                  height={500}
                                  alt={card.title}
                                />
                              )}
                            </Link>

                            <div className="details">

                              {/* ✅ Title Click (Dropdown Open) */}
                              <h3
                                className="sec-head h3 des2"
                                onClick={() => {
                                  handleDropdownToggle(card.title);

                                  window.dataLayer = window.dataLayer || [];
                                  window.dataLayer.push({
                                    event: "dropdown_click",
                                    button_name: card.title,
                                    page: window.location.pathname,
                                    section: "home_cards_dropdown",
                                  });
                                }}
                              >
                                {card.title}
                              </h3>

                              {/* ✅ Sub Links */}
                              <ul className={collapse ? "active des2" : "des2"}>
                                {card?.subItems?.map((link, index) => (
                                  <li key={index}>
                                    <Link
                                      href={link.link}
                                      scroll={false}
                                      onClick={() => {
                                        window.dataLayer = window.dataLayer || [];
                                        window.dataLayer.push({
                                          event: "cta_click",
                                          button_name: link.title,
                                          destination: link.link,
                                          parent_card: card.title,
                                          page: window.location.pathname,
                                          section: "home_cards_dropdown",
                                        });
                                      }}
                                    >
                                      <span>{link.title}</span>
                                      <Image src={whArrow} alt={link.title} />
                                    </Link>
                                  </li>
                                ))}
                              </ul>

                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </header>
              )}

              {/* ================= TEXT SECTION ================= */}
              {data?.bannersection?.content && (
                <HmTextSec
                  home={true}
                  text={data?.bannersection?.content}
                  refreshKey={animationRefreshKey}
                />
              )}

              <Image src={MovieIllus} className="illus-image" alt="illus-home" />
            </div>

            {/* ================= MIDDLE SECTION ================= */}
            <div className="black-gr-div">
              {data?.countersection && <TrustedSection className="sec-padding-top pb-0" data={data?.countersection} />}
              <LogoSec className="pb-0 pt-80" />
              <Image
                src={IllusHome}
                className="illus-image"
                style={{ marginBottom: "-1px" }}
                alt="illus-home"
              />
            </div>

            {/* ================= FOOTER SECTION ================= */}
            <div className="black-gr-div">

              {/* LOCATION WRAPPER */}
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

              {data?.faqsection && (
                <FaqSection
                  className="section-padding pb-0"
                  data={data?.faqsection}
                />
              )}

              {data?.footersection && (
                <PartyGetInTouch
                  data={data?.footersection}
                  img={IllusPartyBottom}
                  type="birthday"
                />
              )}
            </div>

          </>
        )
      }

    </>
  );
}
