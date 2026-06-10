"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import singleBlog from "@/images/single-blog.svg";
import gmail from "@/images/gmail.svg";
import linkedin from "@/images/linkedin.svg";
const VisitLocations = dynamic(() => import("@/components/VisitLocations"));
const FaqSection = dynamic(() => import("@/components/FaqSection"));
const PartyGetInTouch = dynamic(() => import("@/components/PartyGetInTouch"));
const PartyExpertCon = dynamic(() => import("@/components/PartyExpertCon"));
const BirthdayBanner = dynamic(() => import("@/components/BirthdayBanner"));
import api from "@/helpers/api";
import swiperPrev from "@/images/chev-left.svg";
import swiperNext from "@/images/chev-right.svg";
import linkIcon from "@/images/link-icon.svg";
import whatsappIcon from "@/images/whatsapp-icon.svg";
import instaIcon from "@/images/insta-icon.svg";
import xIcon from "@/images/x-ixon.svg";
import { Accordion } from "react-bootstrap";
import arrow from "@/images/acc-plus.svg";
import minus from "@/images/acc-minus.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalContext";
import Link from "next/link";
import HomeContact from "@/components/home/HomeContact";

const SigngleBlog = ({ blogData }) => {
  const { getinclusions } = useGlobalContext();
  const [activeAccordion, setActiveAccordion] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const InclusionprevRef = useRef(null);
  const InclusionnextRef = useRef(null);
  const router = useRouter();
  const [MoreBlogs, setMoreBlogs] = useState(null)
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const relatedToFirst = blogData?.related_to?.[0]?.trim()?.toLowerCase();
  console.log("blogData_blogData", blogData)
  let pageType = "";
console.log("pageType",pageType)
  if (relatedToFirst == "things to do") {
    pageType = "escape room";
  } else if (
    relatedToFirst == "corporate"
  ) {
    pageType = "corporate";
  } else if (
    [
      "parties",
      "birthdays",
      "farewells",
      "bachelor(ette)",
      "couples",
      "birthday",
      "Birthdays",
      "Bachelor(ette)",
      "Couples",
      "Corporate",
      "Escape Rooms",
      "Farewells",
      "Parties",
      "Things to do"
    ].includes(relatedToFirst)
  ) {
    pageType = "birthday";
  }
  console.log("pageType", pageType)
  // Fetch venues
  useEffect(() => {
    fetchMoreBlogs();
  }, [blogData?.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blogData?.id]);

  useEffect(() => {
    if (blogData?.decoration_options?.length > 0) {
      const lastIndex = blogData.decoration_options.length - 1;
      setActiveAccordion(String(lastIndex));
    }
  }, [blogData?.decoration_options]);

  const fetchMoreBlogs = async () => {
    if (!blogData?.id) return; // safety check
    setLoading(true);
    try {
      const response = await api.get(`/blogs/${blogData.id}/related`);
      setMoreBlogs(response?.data?.data || []);
    } catch (err) {
      console.error("Error fetching venue cards:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  // Share functionality
  const handleShare = (platform) => {
    const currentUrl = window.location.href;
    const title = blogData?.heading || "Check out this blog post";
    const text =
      blogData?.description || "Interesting read! Have a look.";

    let shareUrl = "";

    switch (platform) {
      case "copy":
        navigator.clipboard.writeText(currentUrl).then(() => {
          alert("Link copied to clipboard!");
        });
        return;

      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(
          `${title} - ${currentUrl}`
        )}`;
        break;

      case "instagram":
        // Instagram sharing is limited; fallback to copying
        shareUrl = `https://www.instagram.com/?url=${encodeURIComponent(currentUrl)}`;
        break;

      case "twitter": // X
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title
        )}&url=${encodeURIComponent(currentUrl)}`;
        break;

      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          currentUrl
        )}`;
        break;

      case "gmail":
        shareUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(
          title
        )}&body=${encodeURIComponent(`${text}\n\n${currentUrl}`)}`;
        break;
      default:
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      {blogData && <BirthdayBanner data={blogData?.banner} />}

      <div className="blog-top">
        <div className="container">
          <div className="blog-top-inner flex-wrap row-gap-25">
            <p className="sec-head medium-20 mb-0 d-flex align-items-center gap-2 mb-0">
              Last updated on{" "}
              {blogData?.post_date &&
                new Date(blogData.post_date)
                  .toLocaleDateString("en-GB")
                  .replace(/\//g, "-")}
            </p>
            <div className="sec-head medium-20 d-flex align-items-center gap-3 mb-0">
              Share blog
              <ul className="bl-soc-list">
                <li>
                  <button onClick={() => handleShare("copy")}>
                    <Image
                      src={linkIcon}
                      alt="copy link"
                      width={35}
                      height={35}
                      loading="lazy"
                    />
                  </button>
                </li>
                <li>
                  <button onClick={() => handleShare("whatsapp")}>
                    <Image
                      src={whatsappIcon}
                      alt="share on whatsapp"
                      width={35}
                      height={35}
                      loading="lazy"
                    />
                  </button>
                </li>
                <li>
                  <button onClick={() => handleShare("instagram")}>
                    <Image
                      src={instaIcon}
                      alt="share on instagram"
                      width={35}
                      height={35}
                      loading="lazy"
                    />
                  </button>
                </li>
                <li>
                  <button onClick={() => handleShare("twitter")}>
                    <Image
                      src={xIcon}
                      alt="share on twitter"
                      width={35}
                      height={35}
                      loading="lazy"
                    />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* <section className="">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: blogData?.content }}
              />
            </div>
          </div>
        </div>
      </section> */}
      {blogData?.description_text && (
        // <HmTextSec text={blogData?.description_text} />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 col-12">
              <div
                className="big-text bullet-list"
                dangerouslySetInnerHTML={{ __html: blogData?.description_text }}
              />
            </div>
          </div>
        </div>
      )}
      <br />
      {blogData?.at_a_glance_summary && (
        // <HmTextSec className="mb-4 section-padding pb-0" text={blogData?.at_a_glance_summary} />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 col-12">
              <div
                className="big-text bullet-list"
                dangerouslySetInnerHTML={{ __html: blogData?.at_a_glance_summary }}
              />
            </div>
          </div>
        </div>
      )}
      {/* <PartyExpertCon className="pt-80" data="party_bachelor" /> */}


      {blogData?.additional_content && (
        <div className="sec-padding-top pb-0">
          {/* // <HmTextSec className="mb-4 section-padding pb-0" text={blogData?.additional_content} /> */}
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-12 col-12">
                <div
                  className="big-text bullet-list"
                  dangerouslySetInnerHTML={{ __html: blogData?.additional_content }}
                />
              </div>
            </div>
          </div>
        </div>
      )}


      {
        blogData?.decoration_options?.length > 0 && (
          <Accordion
            className="b-venue-cards-accordion mt-5 acc container"
            activeKey={activeAccordion}
            onSelect={(key) => setActiveAccordion(key)}
          >
            {blogData.decoration_options.map((item, index) => (
              <Accordion.Item eventKey={String(index)} key={index}>

                {/* ✅ HEADER (Heading here) */}
                <Accordion.Header>
                  {item?.heading}
                  <Image src={arrow} className="acc-arrow" alt="" loading="lazy" />
                  <Image src={minus} className="acc-minus" alt="" loading="lazy" />
                </Accordion.Header>
                <Accordion.Body>
                  <div className="bullet-list"
                    dangerouslySetInnerHTML={{
                      __html: item?.content_description,
                    }}
                  />
                </Accordion.Body>

              </Accordion.Item>
            ))}
          </Accordion>
        )
      }
      <br />
      {/* <div className="container">
        <div className="video-outer">

      <video
          className="w-100"
          src="https://breakout.bvmwebsolutions.com/uploads/videos/connect-founders-video102_bac2d099-247a-4b36-af8c-d740fabffeab.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        </div>

      </div> */}
      {/* <OurLocationSec title="Visit a <span>Location</span>" /> */}
      <section className="found-sec sec-padding-top pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="blog-content bullet-list"
                dangerouslySetInnerHTML={{ __html: blogData?.conclusion_text }}
              />
            </div>
          </div>
          <div className="sec-head medium-20 text-center pt-80">
            <h3 className="mb-40">
              Found it useful? <span>Spread the word</span>
            </h3>
            <ul className="bl-soc-list justify-content-center">

              <li>
                <button onClick={() => handleShare("whatsapp")}>
                  <Image
                    src={whatsappIcon}
                    alt="share on whatsapp"
                    width={65}
                    height={65}
                    loading="lazy"
                  />
                </button>
              </li>
              <li>
                <button onClick={() => handleShare("instagram")}>
                  <Image
                    src={instaIcon}
                    alt="share on instagram"
                    width={65}
                    height={65}
                    loading="lazy"
                  />
                </button>
              </li>
              <li>
                <button onClick={() => handleShare("twitter")}>
                  <Image
                    src={xIcon}
                    alt="share on twitter"
                    width={65}
                    height={65}
                    loading="lazy"
                  />
                </button>
              </li>
              <li>
                <button onClick={() => handleShare("linkedin")}>
                  <Image
                    src={linkedin}
                    alt="copy link"
                    width={65}
                    height={65}
                    loading="lazy"
                  />
                </button>
              </li>
              <li>
                <button onClick={() => handleShare("gmail")}>
                  <Image
                    src={gmail}
                    alt="copy link"
                    width={65}
                    height={65}
                    loading="lazy"
                  />
                </button>
              </li>
              <li>
                <button onClick={() => handleShare("copy")}>
                  <Image
                    src={linkIcon}
                    alt="copy link"
                    width={65}
                    height={65}
                    loading="lazy"
                  />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <PartyExpertCon
        className="pt-80"
        data={
          pageType == "Corporate"
            ? "corporate"
            : [
              "parties",
              "birthdays",
              "farewells",
              "bachelor(ette)",
              "couples",
              "birthday",
              "Birthdays",
              "Bachelor(ette)",
              "Couples",
              "Farewells",
              "Parties",
            ].includes(relatedToFirst)
              ? "birthday"
              : null
        }
      />

      <div className="blog-slider-sec">
        <section className="pt-80 bday-sec">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h3
                  className="sec-head medium sm-head"
                  dangerouslySetInnerHTML={{
                    __html:

                      "More <span>Inclusions</span>",
                  }}
                />
              </div>
            </div>
            {/* <div className="row row-gap-25">
              {
                getinclusions?.map((getinclusions_result, index) => {
                  return (

                    <Link
                      key={index + 1}
                      href={`/resources/blogs/${getinclusions_result?.redireted_to?.slug}`}
                      className="col-lg-3 col-6"
                      target="_blank"
                      onClick={() => {
                        window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({
                          event: "cta_click",
                          button_name: getinclusions_result?.title?.replace(/<[^>]*>/g, ""), // clean HTML
                          destination: "external_party_inclusion",
                          link_url: getinclusions_result?.link,
                          page: window.location.pathname,
                          section: "party_inclusions",
                        });
                      }}
                    >
                      <div className="location-card">
                        <div className="location-card-img">

                          <Image
                            src={getinclusions_result?.image}
                            width={700}
                            height={700}
                            alt={"bd.heading"}
                          />

                        </div>

                        <div className="location-card-content bullet-list">
                          <h3
                            dangerouslySetInnerHTML={{ __html: getinclusions_result?.title }}
                          />
                        </div>
                      </div>
                    </Link>

                  )
                })
              }
            </div> */}
            <div className="blog-slider">
              <Swiper
                modules={[Pagination, Navigation]}
                pagination={{ clickable: true }}
                loop={true}
                slidesPerView={1}
                spaceBetween={20}
                navigation={{
                  prevEl: InclusionprevRef.current,
                  nextEl: InclusionnextRef.current,
                }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = InclusionprevRef.current;
                  swiper.params.navigation.nextEl = InclusionnextRef.current;
                }}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  640: { slidesPerView: 2 },
                  992: { slidesPerView: 3 },
                  1400: { slidesPerView: 4 },
                }}
              >
                {getinclusions?.map((getinclusions_result, index) => (
                  <SwiperSlide key={index}>
                    <Link
                      href={`/resources/blogs/${getinclusions_result?.redireted_to?.slug}`}
                      target="_blank"
                      onClick={() => {
                        window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({
                          event: "cta_click",
                          button_name: getinclusions_result?.title?.replace(/<[^>]*>/g, ""),
                          destination: "external_party_inclusion",
                          link_url: getinclusions_result?.link,
                          page: window.location.pathname,
                          section: "party_inclusions",
                        });
                      }}
                    >
                      <div className="location-card">
                        <div className="location-card-img">
                          <Image
                            src={getinclusions_result?.image}
                            width={700}
                            height={700}
                            alt="inclusion"
                            loading="lazy"
                          />
                        </div>

                        <div className="location-card-content bullet-list">
                          <h3
                            dangerouslySetInnerHTML={{
                              __html: getinclusions_result?.title,
                            }}
                          />
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div ref={InclusionprevRef} className="swiper-button-prev custom-prev go-plan">
                <Image src={swiperPrev} alt="prev" loading="lazy" />
              </div>

              <div ref={InclusionnextRef} className="swiper-button-next custom-next go-plan">
                <Image src={swiperNext} alt="next" loading="lazy" />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="black-gr-div">
        <VisitLocations className="sec-padding-top"
          title="Visit <span>a Location</span>" page_name="home" />
        {blogData?.faqs && (
          <FaqSection
            className="section-padding pb-0"
            data={blogData?.faqs}
          />
        )}

        {/* <PartyGetInTouch
          // data="{data?.footersection}"
          // img={bdayblogIllus}
          noImage={true}
          noTextBottom={false}
          privacyLine={true}
        /> */}


        <HomeContact page_name="home" page_type={pageType}
          noTextBottom={false} noImage={true} />

        <section className={`blog-slider-sec section-padding pb-0 arrows-diff`}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="esc-content text-center position-relative">
                  <h2 className="sec-head sm-head medium">
                    Read <span>More Blogs</span>
                  </h2>
                </div>
                <div className="blog-slider">
                  <Swiper
                    modules={[Pagination, Navigation]}
                    pagination={{ clickable: true }}
                    loop={true}
                    slidesPerView={1}
                    spaceBetween={20}
                    navigation={{
                      prevEl: prevRef.current,
                      nextEl: nextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                      swiper.params.navigation.prevEl = prevRef.current;
                      swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    breakpoints={{
                      0: { slidesPerView: 1 },
                      640: { slidesPerView: 2 },
                      992: { slidesPerView: 3 },
                      1400: { slidesPerView: 4 },
                    }}
                    className="blog-swiper"
                  >
                    {MoreBlogs?.map((item, index) => (
                      <SwiperSlide key={item?.id || index}>
                        <div
                          className={`blog-card click-anim-card ${active == index ? "active" : ""
                            }`}
                          onMouseEnter={() => setActive(index)}
                          onMouseLeave={() => setActive(null)}
                          onClick={() =>
                            router.push(
                              `/blogs/${item?.slug}`,
                              { scroll: true }
                            )
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <div className="blog-card-img">
                            <Image
                              src={item?.featured_image}
                              width={500}
                              height={500}
                              alt="blog"
                              loading="lazy"
                            />
                          </div>

                          <div className="blog-card-content">
                            <h3
                              dangerouslySetInnerHTML={{ __html: item?.title }}
                            ></h3>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div ref={prevRef} className="swiper-button-prev custom-prev go-plan">
                    <Image src={swiperPrev} alt="prev" loading="lazy" />
                  </div>

                  <div ref={nextRef} className="swiper-button-next custom-next go-plan">
                    <Image src={swiperNext} alt="next" loading="lazy" />
                  </div>

                </div>
              </div>
            </div>
          </div>

        </section>
        <Image src={singleBlog} className="illus-image" alt="hm-illus" loading="lazy" />
      </div>

    </>
  );
};

export default SigngleBlog;
