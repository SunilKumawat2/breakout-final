"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
const HomeContact = dynamic(() => import("@/components/home/HomeContact"))
const BirthdayBanner = dynamic(() => import("@/components/BirthdayBanner"))
const FaqSection = dynamic(() => import("@/components/FaqSection"))
const PartyExpertCon = dynamic(() => import("@/components/PartyExpertCon"))
const BirthdayVenueWidget = dynamic(() => import("@/components/BirthdayVenueWidget"))
const FullSliderSec = dynamic(() => import("@/components/FullSliderSec"))
import swiperPrev from "@/images/chev-left.svg";
import swiperNext from "@/images/chev-right.svg";
import { useRouter } from "next/navigation";
import api from "@/helpers/api";
import linkIcon from "@/images/link-icon.svg";
import whatsappIcon from "@/images/whatsapp-icon.svg";
import instaIcon from "@/images/insta-icon.svg";
import xIcon from "@/images/x-ixon.svg";
import gmail from "@/images/gmail.svg";
import linkedin from "@/images/linkedin.svg";
import toolIllus from "@/images/tool-illus.svg";
import bdayblogIllus from "@/images/bdayblog-illus.svg";
import singleBlog from "@/images/single-blog.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const BirthdayBlog = ({ blogData, id = "" }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const router = useRouter();
  const [MoreBlogs, setMoreBlogs] = useState(null)
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedResourceId, setSelectedResourceId] = useState(null);

  const relatedToFirst =
    blogData?.related_to?.[0]?.trim()?.toLowerCase();

  let pageType = "";

  if (relatedToFirst === "things to do") {
    pageType = "escape room";
  } else if (
    relatedToFirst === "corporate"
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
      <div className="black-gr-div">
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
          // <HmTextSec text={blogData?.at_a_glance_summary} />
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
        <br />
        {blogData?.additional_content && (
          // <HmTextSec text={blogData?.additional_content} />
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
        )}
      
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

        {blogData && (
          <FullSliderSec
            className="sec-padding-top"
            data={blogData?.resources}
            blog_id={blogData?.id}
            hasCardLinks={true}
            showModal={showModal}  // ✅ ADD THIS
            setShowModal={setShowModal}
            selectedResourceId={selectedResourceId}
            setSelectedResourceId={setSelectedResourceId}
          />
        )}

        <Image src={toolIllus} className="illus-image" alt="tool-illus" loading="lazy" />
      </div>
      {
        blogData && (
          <BirthdayVenueWidget className="pt-80 sec-padding-top pb-0"
            blogData={blogData} page_type={pageType} />
        )
      }

      {/* <div className="pt-80">
        <GReviewSlider commonStars={false} />
      </div> */}
      {/* <OurLocationSec
        className="sec-padding-top"
        // title={`About Our Breakout®  <span>${blogData?.title} Location</span>`}
        slug="koramangala"
      /> */}

      {blogData?.faqsection && <FaqSection className="pt-80" data={blogData?.faqsection} />}

      {blogData?.footersection && (
        // <PartyGetInTouch data={blogData?.footersection} noImage={true} />
        <HomeContact page_name="home" page_type={pageType}
          textData={blogData?.footersection} noImage={false} />
      )}


      <div className="black-gr-div">
        <section className="found-sec pt-80">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div
                  className="blog-content bullet-list "

                  dangerouslySetInnerHTML={{ __html: blogData?.conclusion_text }}
                />
              </div>
            </div>

            <div className="sec-head mb-0 text-center pt-80">
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
        <Image src={bdayblogIllus} className="illus-image" alt="hm-illus" loading="lazy" />
      </div>
      <div className="black-gr-div">
        {blogData?.faqs?.length > 0 && (
          <FaqSection
            className="sec-padding-top pb-0"
            data={blogData?.faqs}
          />
        )}

        {/* <PartyGetInTouch
          // data="{data?.footersection}"
          // img={bdayblogIllus}
          noImage={true}
          noTextBottom={false}
          privacyLine={true}
          page_type={pageType}
        /> */}
        <HomeContact className={`${blogData?.faqs?.length > 0 ? "" :"sec-padding-top"}`} page_type={pageType}
          noImage={true} noTextBottom={false}/>
        {MoreBlogs?.length > 0 && (
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
                            <div className="blog-card-content bullet-list">

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
        )}

        <Image src={singleBlog} className="illus-image" alt="hm-illus" loading="lazy" />
      </div>
    </>
  );
};

export default BirthdayBlog;
