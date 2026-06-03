"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect, useRef } from "react";
const InnerPageBanner = dynamic(() => import("@/components/InnerPageBanner"));
import Image from "next/image";
const HomeContact = dynamic(() => import("@/components/home/HomeContact"));
import Link from "next/link";
import mummyIllus from "@/images/mummy-illus.svg";
import corpIllus from "@/images/corp-illus.svg";
import movieIllus1 from "@/images/movie-illus1.svg";
import api from "@/helpers/api";
const TrustedSection = dynamic(() => import("@/components/TrustedSection"));
const TeamCard = dynamic(() => import("@/components/TeamCard"));
const StripGallery = dynamic(() => import("@/components/StripGallery"));
import card1 from "@/images/es-main-img.jpg";
import card2 from "@/images/pr-main-img.jpg";
import card3 from "@/images/cr-main-img.jpg";
import { motion } from "framer-motion";
import { useGlobalContext } from "@/context/GlobalContext";
import whArrow from "@/images/wh-arrow.svg";
import abImg1 from "@/images/gal1.png";
import abImg2 from "@/images/gal2.png";
import abImg3 from "@/images/gal3.png";
import abImg4 from "@/images/gal4.png";
import abImg5 from "@/images/gal5.png";
import abImg6 from "@/images/gal6.jpg";
import abImg7 from "@/images/gal7.jpg";
import abImg8 from "@/images/gal8.jpg";
import abImg9 from "@/images/gal9.JPG";
import abImg10 from "@/images/gal10.JPG";
import abImg11 from "@/images/gal11.jpg";
import abImg12 from "@/images/gal12.jpg";
import abImg13 from "@/images/gal13.jpg";
import abImg14 from "@/images/gal14.png";
import abImg15 from "@/images/gal15.png";

const AboutPage = () => {
  const [corporate, setCorporate] = useState(null);

  const [brandLogos, setBrandLogos] = useState(null);
  const [collapse, setCollapse] = useState("desktop");
  const { escaperoomLocations, loading, errors } = useGlobalContext();
  const [isFounderMuted, setIsFounderMuted] = useState(true);
  const founderVideoRef = useRef(null);
  const [abImages, setAbImages] = useState([
    abImg1,
    abImg2,
    abImg3,
    abImg4,
    abImg5,
    abImg6,
    abImg7,
    abImg8,
    abImg9,
    abImg10,
    abImg11,
    abImg12,
    abImg13,
    abImg14,
    abImg15
  ]);

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

  const handleCollapse = (key) => {
    if (typeof window !== "undefined" && window.innerWidth <= 767) {
      setCollapse((prev) => (prev === key ? "desktop" : key));
    }
  };
  useEffect(() => {
    const fetchCorporate = async () => {
      const response = await api.get("about-us-page");
      setCorporate(response.data.data);
    };
    fetchCorporate();
    const fetchBrandLogos = async () => {
      const response = await api.get("logos/brands");
      setBrandLogos(response.data.data);
    };
    fetchBrandLogos();
  }, []);


  return (
    <>
      {corporate && corporate?.bannersection && (
        <InnerPageBanner banner={corporate?.bannersection} bdayInner={true} />
      )}

      <div className="black-gr-div">
        <section className="pt-80 vision-mission-sec">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-12">
                <div className="vis-img">
                  <div className="founder-video-wrapper">
                    <video
                      ref={founderVideoRef}
                      className="w-100 h-auto"
                      autoPlay
                      loop
                      controls
                      playsInline
                      muted={isFounderMuted}
                    >
                      <source src="http://breakout.bvmwebsolutions.com/uploads/videos/founder-video_d715cdbf-543a-4531-a3c7-ff1d8e8b71ad.mp4"
                       type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-12">
                <div className="vis-con ms-4">
                  <div className="text-box mb-40">
                    <h3
                      className="sec-head sm-head medium yellow-text mb-3"
                      dangerouslySetInnerHTML={{
                        __html: corporate?.visionsection?.heading1,
                      }}
                    />
                    <p
                      dangerouslySetInnerHTML={{
                        __html: corporate?.visionsection?.description1,
                      }}
                    />
                  </div>
                  <div className="text-box mb-40">
                    <h3
                      className="sec-head sm-head medium yellow-text mb-3"
                      dangerouslySetInnerHTML={{
                        __html: corporate?.visionsection?.heading2,
                      }}
                    />
                    <p
                      dangerouslySetInnerHTML={{
                        __html: corporate?.visionsection?.description2,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {corporate && corporate?.countersection && (
          <TrustedSection data={corporate?.countersection} />
        )}
        {corporate && corporate?.contentsection && (
          <section className="content-sec">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 ">
                  <h3
                    className="sec-head medium sm-head text-center"
                    dangerouslySetInnerHTML={{
                      __html: corporate?.contentsection?.heading,
                    }}
                  />
                  <p
                    className="para mt-4"
                    dangerouslySetInnerHTML={{
                      __html: corporate?.contentsection?.description,
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        <Image src={movieIllus1} className={"illus-image"} alt="bday" loading="lazy"/>
      </div>

      <div className="black-gr-div">
        <section className="movement-sec sec-padding-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h3 className="sec-head medium sm-head" dangerouslySetInnerHTML={{
                  __html: corporate?.cardssection?.heading,
                }}>
                </h3>
              </div>
            </div>
            <div className="row row-gap-25">
              {
                corporate?.cardssection?.cards?.map((about_card_fun_result, id) => {
                  return (
                    <div className="col-lg-4 col-12" key={id}>
                      <div className="ab-card">
                        <Image
                          src={about_card_fun_result?.image}
                          alt="icon1"
                          width={100}
                          height={100}
                          loading="lazy"
                        />
                        <h3 className="para" dangerouslySetInnerHTML={{
                          __html: about_card_fun_result?.heading,
                        }}>
                        </h3>
                        <p className="para" dangerouslySetInnerHTML={{
                          __html: about_card_fun_result?.description,
                        }}>
                        </p>
                      </div>
                    </div>

                  )
                })
              }
            </div>
          </div>
        </section>
        {corporate && corporate?.ourstorysection && (
          <section className="section-padding our-story-sec">
            <div className="container">
              <div className="row">
                <div className="col-lg-5 col-12">
                  <div className="vis-img h-100">
                    {corporate?.ourstorysection?.image && (
                      <Image
                        src={corporate?.ourstorysection?.image}
                        alt="vis-img"
                        width={800}
                        height={600}
                        className="w-100 h-100"
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>
                <div className="col-lg-7 col-12">
                  <div className="vis-con ms-4">
                    <h3
                      className="sec-head  medium"
                      dangerouslySetInnerHTML={{
                        __html: corporate?.ourstorysection?.heading,
                      }}
                    />
                    <p
                      dangerouslySetInnerHTML={{
                        __html: corporate?.ourstorysection?.description,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {corporate && corporate?.ourfounderssection && (
          <section className="founder-sec">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <h3
                    className="sec-head medium sm-head"
                    dangerouslySetInnerHTML={{
                      __html: corporate?.ourfounderssection?.heading,
                    }}
                  />
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-12">
                  <TeamCard
                    type="founder"
                    data={corporate?.ourfounderssection}
                  />
                </div>
              </div>
            </div>
          </section>
        )}
        {corporate && corporate?.ourleaderssection && (
          <section className="leader-sec pt-80 pb-0">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-12 text-center">
                  <h3
                    className="sec-head medium sm-head"
                    dangerouslySetInnerHTML={{
                      __html: corporate?.ourleaderssection?.heading,
                    }}
                  />
                </div>
                <div className="col-lg-12">
                  <div className="row">
                    {corporate?.ourleaderssection?.ourleaders?.length > 0 &&
                      corporate?.ourleaderssection?.ourleaders?.map(
                        (item, index) => (
                          <div className="col-lg-6 col-12" key={index}>
                            <TeamCard type="leader" data={item} />
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>

            </div>
          </section>
        )}
        {corporate && corporate?.ouradvisorssection && (
          <section className="pt-80 pb-0 advisor-sec">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-12 text-center">
                  <h3
                    className="sec-head medium sm-head"
                    dangerouslySetInnerHTML={{
                      __html: corporate?.ouradvisorssection?.heading,
                    }}
                  />
                </div>
                <div className="col-lg-12">
                  <div className="row">
                    {corporate?.ouradvisorssection?.ouradvisors?.length > 0 &&
                      corporate?.ouradvisorssection?.ouradvisors?.map(
                        (item, index) => (
                          <div className="col-12" key={index}>
                            <TeamCard type="advisor" data={item} />
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>

            </div>
          </section>
        )}
        <Image
          src={mummyIllus}
          alt="partyillus"
          className="illus-image"
          style={{ marginBottom: "-1px" }}
          loading="lazy"
        />
      </div>
      <div className="black-gr-div">
        <header className="hm-header section-padding pb-0">
          <div className="container">
            <motion.div
              className="row"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            >
              <div className="col-lg-12 col-12 text-center mb-40">
                {/* <Revolvingtext text="Set Your" /> */}
                <h2 className="sec-head sm medium text-center mb-3">
                  <span>Experience the Moment</span> with Breakout®!
                </h2>
                <p className="para big">
                  Break free from the ordinary and{" "}
                  <span>dive into the legendery.</span>
                </p>
              </div>
            </motion.div>
            <motion.div
              className="row row-gap-25"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div className="col-lg-4 col-12" variants={fadeInUp}>
                <div className="hm-card">
                  <div className="hm-card-img">
                    <Image src={card1} alt={"Escape Room"} loading="lazy"/>
                  </div>
                  <div className="details">
                    <h3
                      className="sec-head h3"
                      onClick={() => handleCollapse("escape-room")}
                    >
                      {"Escape Room"}
                    </h3>
                    <ul className={collapse === "escape-room" ? "active" : ""}>
                      {escaperoomLocations &&
                        escaperoomLocations?.map((link, index) => (
                          <li key={index}>
                            <Link href={`/${link.slug}`}>
                              <span>{link.title}</span>
                              <Image src={whArrow} alt={link.title} loading="lazy"/>
                            </Link>
                          </li>
                        ))}
                      <li>
                        <Link href={`/virtual`}>
                          <span>Virtual Rooms</span>
                          <Image src={whArrow} alt={"Virtual Rooms"} loading="lazy"/>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
              <motion.div className="col-lg-4 col-12" variants={fadeInUp}>
                <div className="hm-card">
                  <div className="hm-card-img">
                    <Image src={card2} alt={""} loading="lazy"/>
                  </div>
                  <div className="details">
                    <h3
                      className="sec-head h3"
                      onClick={() => handleCollapse("parties")}
                    >
                      {"Parties"}
                    </h3>
                    <ul className={collapse === "parties" ? "active" : ""}>
                      <li>
                        <Link href={`/parties/birthday`}>
                          <span>Birthday</span>
                          <Image src={whArrow} alt={"Birthday"} loading="lazy"/>
                        </Link>
                      </li>
                      <li>
                        <Link href={`/parties/bachelor`}>
                          <span>Bachelor(ette)</span>
                          <Image src={whArrow} alt={"Bachelor(ette)"} loading="lazy"/>
                        </Link>
                      </li>
                      <li>
                        <Link href={`/parties/farewell`}>
                          <span>Farewell</span>
                          <Image src={whArrow} alt={"Farewell"} loading="lazy"/>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
              <motion.div className="col-lg-4 col-12" variants={fadeInUp}>
                <div className="hm-card">
                  <div className="hm-card-img">
                    <Image src={card3} alt={""} loading="lazy"/>
                  </div>
                  <div className="details">
                    <h3
                      className="sec-head h3"
                      onClick={() => handleCollapse("corporate")}
                    >
                      {"Corporate"}
                    </h3>
                    <ul className={collapse === "corporate" ? "active" : ""}>
                      <li>
                        <Link href={`/corporate/unwind`}>
                          <span>Unwind</span>
                          <Image src={whArrow} alt={"Unwind"} loading="lazy"/>
                        </Link>
                      </li>
                      <li>
                        <Link href={`/corporate/retreat`}>
                          <span>Retreat</span>
                          <Image src={whArrow} alt={"Retreat"} loading="lazy"/>
                        </Link>
                      </li>
                      <li>
                        <Link href={`/corporate/connect-l-n-d`}>
                          <span>Connect L&D</span>
                          <Image src={whArrow} alt={"Connect L&D"} loading="lazy"/>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </header>

        <section className="section-padding gallery-sec pb-0">
          <StripGallery images={abImages} />
        </section>

        <HomeContact noTextBottom={false} privacyLine={false} noImage={true} />

        <section className="overlay-sec pt-80">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="sec-head medium">Breakout® and  <span>Affiliates</span></h2>
              </div>
              <div className="col-12">
                <div className="overlay-box">
                  <div className="row main-row">
                    <div className="col-12" >
                      <div className="overlay-box-item mb-40">
                        <h3 className="sec-head mb-3 h3">
                          1. M/s. Breakfree Cafe
                        </h3>
                        <p>
                          <strong>Address :- </strong>unit 304, No.7, Prime Square, 3rd floor, Block 4, Whitefield Main Rd, Bengaluru, Karnataka 560066
                        </p>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="overlay-box-item mb-40">
                        <h3 className="sec-head mb-3 h3">
                          2. M/s. Escape Ventures
                        </h3>
                        <p>
                          <strong>Address :- </strong>unit 306, No.7, Prime Square, 3rd floor, Block 4, Whitefield Main Rd, Bengaluru, Karnataka 560066
                        </p>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="overlay-box-item mb-40">
                        <h3 className="sec-head mb-3 h3">
                          3. M/s. Breakfree Ventures
                        </h3>
                        <p>
                          <strong>Address :- </strong>unit, 305, No.7, Prime Square, 3rd floor, Block 4, Whitefield Main Rd, Bengaluru, Karnataka 560066
                        </p>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="overlay-box-item mb-40">
                        <h3 className="sec-head mb-3 h3">
                          4. M/s. Free Thinker Experience
                        </h3>
                        <p>
                          <strong>Address :- </strong>27, NMR Building, 1st floor, Intermediate Ring Road, 100 Feet Rd, Koramangala, Bengaluru, Karnataka 560047
                        </p>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="overlay-box-item mb-40">
                        <h3 className="sec-head mb-3 h3">
                          5. M/s. Free Thinker Services
                        </h3>
                        <p>
                          <strong>Address :- </strong>2nd Floor, No. 13, 6th Cross, 100 Feet Road, Srinivagilu, Bangalore - 560 047
                        </p>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="overlay-box-item mb-40">
                        <h3 className="sec-head mb-3 h3">
                          6. M/s. Breakout Ventures
                        </h3>
                        <p>
                          <strong>Address :- </strong>2nd Floor, No 8, 24th Main Rd, 5th Phase, Ayodya Nagar, J P Nagar Phase 5, J. P. Nagar, Bengaluru, Karnataka 560078
                        </p>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="overlay-box-item mb-40">
                        <h3 className="sec-head mb-3 h3">
                          7. M/s. The Escapist Registered and Managed by its Karta Mothi G. Venkatesan HUF
                        </h3>
                        <p>
                          <strong>Address :- </strong>27, NMR Building, 2nd floor, Intermediate Ring Road, 100 Feet Rd, Koramangala, Bengaluru, Karnataka 560047
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Image src={corpIllus} alt="illus3" className="illus-image" loading="lazy"/>
      </div>
    </>
  );
};

export default AboutPage;
